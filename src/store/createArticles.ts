import { createResource, createSignal } from 'solid-js'
const LIMIT = 10

export default function createArticles(agent, actions, state, setState) {
  const [articleSource, setArticleSource] = createSignal()
  const [articlesRes] = createResource(
    articleSource,
    (args, { value }) => {

      if (args[0] === 'articles') {
        console.log(args)

        return $req(args[1]).then((resp) => {
          // console.log(resp())
          console.log(resp)
          const { articles, articlesCount } = resp

          queueMicrotask(() => setState({ totalPagesCount: Math.ceil(articlesCount / LIMIT) }))
          console.log(articles)

          return articles.reduce((memo, article) => {
            memo[article.slug] = article

            return memo
          }, {})
        })
      }

      const article = state.articles[args[1]]

      if (article) return value

      return agent.Article.bySlug(args[1]).then((a) => ({ ...value, [args[1]]: a }))
    },
    { initialValue: {} }
  )

  function  $req(predicate) {
    if (predicate.topMonth) return agent.Article.topMonth(state.page, LIMIT)

    if (predicate.topOverall) return agent.Article.topOverall(state.page, LIMIT)

    if (predicate.topViewed) return agent.Article.topViewed(state.page, LIMIT)

    if (predicate.subscribed) return agent.Article.subscribed(state.page, LIMIT)

    if (predicate.reviewed) return agent.Article.reviewed(state.page, LIMIT)

    if (predicate.topic) return agent.Article.byTopic(predicate.topic, state.page, LIMIT)

    if (predicate.author) return agent.Article.byAuthor(predicate.author, state.page, LIMIT)

    return agent.Article.topRecent(state.page, LIMIT)
  }

  Object.assign(actions, {
    setPage: (page) => setState({ page }),
    loadArticles(predicate) {
      setArticleSource(['articles', predicate])
    },
    loadArticle(slug) {
      setArticleSource(['article', slug])
    },
    async makeFavorite(slug) {
      const article = state.articles[slug]

      if (article && !article.favorited) {
        setState('articles', slug, (s) => ({
          favorited: true,
          favoritesCount: s.favoritesCount + 1
        }))

        try {
          await agent.Article.like(slug)
        } catch (err) {
          setState('articles', slug, (s) => ({
            favorited: false,
            favoritesCount: s.favoritesCount - 1
          }))
          throw err
        }
      }
    },
    async unmakeFavorite(slug) {
      const article = state.articles[slug]

      if (article && article.favorited) {
        setState('articles', slug, (s) => ({
          favorited: false,
          favoritesCount: s.favoritesCount - 1
        }))

        try {
          await agent.Article.unlike(slug)
        } catch (err) {
          setState('articles', slug, (s) => ({
            favorited: true,
            favoritesCount: s.favoritesCount + 1
          }))
          throw err
        }
      }
    },
    async createArticle(newArticle) {
      const { article, errors } = await agent.Article.create(newArticle)

      if (errors) throw errors

      setState('articles', { [article.slug]: article })

      return article
    },
    async updateArticle(data) {
      const { article, errors } = await agent.Article.update(data)

      if (errors) throw errors

      setState('articles', { [article.slug]: article })

      return article
    },
    async deleteArticle(slug) {
      const article = state.articles[slug]

      setState('articles', { [slug]: undefined })

      try {
        await agent.Article.delete(slug)
      } catch (err) {
        setState('articles', { [slug]: article })
        throw err
      }
    }
  })

  return articlesRes
}
