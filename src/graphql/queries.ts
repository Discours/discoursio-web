/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Proposal } from './codegen'
import { get } from 'svelte/store'
import { proposals } from '../stores/editor'
// import { session } from '../stores/auth'
import { gql } from '@apollo/client'
import { query, mutation } from 'svelte-apollo'

// UI/UX semantic needs

export const editorAccept = (shoutId: number): boolean => {
  console.log(
    'gql: editor`s acception of the all proposals for shout ' +
      shoutId.toString()
  )
  const accepted: Proposal[] = get(proposals).filter(
    (p: Proposal) => p.shout === shoutId
  )
  console.debug(accepted)
  // TODO: implement a mutation with all the accepted proposals updating the shout
  // linked proposals in collaborative editor
  return true
}

export const isEmailFree = (email: string) => {
  console.log('gql: check if email is already taken')
  const q = query(
    gql`
      query isEmailFreeQuery(email: $email) {
        isEmailFree(email: $email)
      }
    `,
    {
      variables: { email },
    }
  )
  console.debug(q)
  return q
}

export const signIn = (email: string, password: string) => {
  console.log('gql: user is attempting to sign in')
  // console.debug(client)
  const q = query(
    gql`
      query SignInQuery($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          error
          token
          user {
            username
          }
        }
      }
    `,
    { variables: { email, password } }
  )
  console.debug(q)
  return q
}

export const signUp = (email: string, password: string) => {
  console.log('gql: user is attempting to sign up')
  return mutation(
    gql`
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
  )
}

export const signOut = () => {
  console.log('gql: signing out the current user')
  const q = query(
    gql`
      query SignOut {
        signOut {
          error
          user {
            username
          }
        }
      }
    `
  )

  console.debug(q)
  return q
}

export const getSession = () => {
  console.log('gql: getting the current user')
  const q = query(
    gql`
      query GetCurrentUser {
        getCurrentUser {
          error
          user {
            username
          }
        }
      }
    `
  )
  console.debug(q)
  return q
}
