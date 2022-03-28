import { createResource } from 'solid-js'

export default function createComments(agent, actions, state, setState) {
  const [comments, { mutate, refetch }] = createResource(
    () => state.articleSlug,
    agent.Comment.forArticle,
    { initialValue: [] }
  )

  Object.assign(actions, {
    loadComments(articleSlug, reload) {
      if (reload) return refetch()

      setState({ articleSlug })
    },
    async createComment(comment) {
      const { errors } = await agent.Comment.create(state.articleSlug, comment)

      if (errors) throw errors
    },
    async deleteComment(id) {
      mutate(comments().filter((c) => c.id !== id))

      try {
        await agent.Comment.delete(state.articleSlug, id)
      } catch (err) {
        actions.forArticle(state.articleSlug)
        throw err
      }
    }
  })

  return comments
}
