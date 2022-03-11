import Editor from '~/components/Editor'
import TopicSelector from '~/components/Topic/TopicSelector'

export default () => {
  const body = ''

  return (
    <article>
      <TopicSelector />
      <Editor body={body} collab={true} />
    </article>
  )
}
