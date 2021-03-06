import { gql } from 'solid-urql'

// WARNING: need Auth header

export default gql`
  query GetCurrentUserQuery {
    getCurrentUser {
      error
      user {
        _id: slug
        name
        slug
        bio
        userpic
        links
      }
      totalUnreadMessages
      userSubscribedTopics
      userSubscribedAuthors
      userSubscribedCommunities
    }
  }
`
