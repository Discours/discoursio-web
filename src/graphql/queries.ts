import { gql } from 'graphql-request'

// email
export const IS_EMAIL_FREE = gql`
  query isEmailFreeQuery($email: String!) {
    isEmailFree(email: $email)
  }
`

// email password
export const SIGN_IN = gql`
  query {
    signIn(email: $email, password: $password) {
      error
      token
      user {
        username
      }
    }
  }
`
//  email password
export const SIGN_UP = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      error
      token
      user {
        username
      }
    }
  }
`

// uses Auth header
export const SIGN_OUT = gql`
  {
    signOut {
      error
      user {
        username
      }
    }
  }
`
// uses Auth header
export const GET_ME = gql`
  {
    getCurrentUser {
      error
      user {
        username
      }
    }
  }
`

export const GET_SHOUT = gql`
  query {
    getShout(slug: $slug ) {
      error
      shout {
        title
        subtitle
        layout
        cover
        community
        body
        authors
        topics
        replyTo
        versionOf
        createdAt
        updatedAt
        published
        publishedAt
        views
        rating
        ratings
      }
    }
  }
` // TODO: fix views as sum for all days by shout_id

export const GET_AUTHOR = gql`
  query {
    getAuthor(slug: $slug ) {
      error
      user {
        slug
        viewname
        bio
        roles
        userpic
        communities
        links
        createdAt
        wasOnlineAt
        ratings
      }
    }
  }
`