import { gql } from 'solid-urql'

export default gql`
  query TopicsAllQuery {
    topicsBySlugs {
      title
      body
      slug
      pic
      parents
      children
      community
      topicStat {
        shouts
        authors
        views
        subscriptions
      }
    }
  }
`
