import { gql } from 'solid-urql'

export default gql`
  query TopicsAllQuery {
    topicsBySlugs {
      _id: slug
      title
      body
      slug
      pic
      parents
      children
      community
      topicStat {
        _id: views
        shouts
        authors
        views
        subscriptions
      }
    }
  }
`
