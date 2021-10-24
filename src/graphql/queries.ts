import { gql } from 'graphql-request'

// email
export const IS_EMAIL_FREE = gql`
  query isEmailFreeQuery($email: String!) {
    isEmailFree(email: $email)
  }
`

// email password
export const SIGN_IN = gql`
  query SignInQuery($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      error
      token
      user {
        name
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
        name
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
        name
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
      name
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

export const GET_TOPICS = gql`
  query {
    getTopics(community: $community) {
      slug
      name
      desc
      pic
    }
  }
`

export const GET_COMMUNITIES = gql`
  query {
    getCommunities() {
      slug
      pic
      value
      desc
      parents
      children
      createdAt
      createdBy
    }
  }
`

export const GET_SHOUTS = gql`
  query {
    getShouts(community: $community, topic: $topic, author: $author) {
      title
      subtitle
      layout
      cover
      community
      authors
      topics
      replyTo
      published
      publishedAt
      views
      rating
      ratings
      comments
    }
  }
`

export const TOP_SHOUTS_BY_RATING = gql`
    topShoutsByRating(limit: $limit) {
      title
      subtitle
      layout
      cover
      community
      topics
      publishedAt
      views
      rating
  	}
  }
`
