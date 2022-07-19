import { gql } from 'solid-urql'

export default gql`
  query TopicsAllQuery {
    topicsAll {
      _id: slug
      title
      body
      slug
      pic
      parents
      children
      # community
      stat {
        _id: views
        shouts
        authors
        views
        followers
      }
    }
  }
`
