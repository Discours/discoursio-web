import { gql } from '@apollo/client'
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
