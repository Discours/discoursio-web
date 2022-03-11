import { createResource } from 'solid-js'

export default function createTopics(agent) {
  const [topics] = createResource(
    'topics',
    () => agent.Topic.getAll().then((ttt) => ttt.map((t) => t.toLowerCase())),
    { initialValue: [] }
  )

  return topics
}
