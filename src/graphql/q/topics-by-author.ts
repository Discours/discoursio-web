import { gql } from 'solid-urql'

export default gql`
  query TopicsByAuthorQuery ($slug: String!) {
    topicsByAuthor(author: $slug) {
      title
      body
      slug
      pic
      parents
      children
      community
      stat {
        _id: views
        shouts
        authors
        views
        subscriptions
      }
    }
  }
`