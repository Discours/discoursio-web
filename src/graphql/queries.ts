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
        viewname
        slug
        userpic
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
        viewname
        slug
        userpic
        bio
        links
      }
    }
  }
`

// uses Auth header
export const SIGN_OUT = gql`
  {
    signOut {
      error
      result
    }
  }
`
// uses Auth header
export const GET_ME = gql`
  {
    getCurrentUser {
      error
      user {
        viewname
        slug
        bio
        userpic
        links
      }
    }
  }
`

// TODO: joined with comments, topics, ratings and authors
export const GET_SHOUT = gql`
  query {
    getShoutBySlug(slug: $slug) {
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
      comments
    }
  }
` // TODO: fix views as sum for all days by shout_id

export const GET_AUTHOR = gql`
  query {
    getUserBySlug(slug: $slug) {
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
`
