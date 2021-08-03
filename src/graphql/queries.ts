import type { Proposal } from './codegen'
import { get } from 'svelte/store'
import { proposals } from '../stores/editor'
// import { session } from '../stores/auth'
import { gql } from '@apollo/client'
import { client } from './client'

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

export const isEmailFree = (email: string): void => {
  console.log('gql: check if email is already taken')
  const res = client.query(
    gql`
    query isEmailFreeQuery(email: $email) {
      isEmailFree(email: "anton.rewin@gmail.com") {
        status
        error
      }
    }
  `,
    {
      variables: { email },
    }
  )
  console.log(res)
}

export const signIn = (email: string, password: string): void => {
  console.log('gql: user is attempting to sign in')
  const res = client.query(
    gql`
      query SignInQuery($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          status
          error
          token
          user {
            username
            userpic
          }
        }
      }
    `,
    { variables: { email, password } }
  )
  console.debug(res)
}

export const signUp = (email: string, password: string): void => {
  console.log('gql: user is attempting to sign up')
  client
    .mutate(
      gql`
        mutation RegisterMutation($email: String!, $password: String!) {
          registerUser(email: $email, password: $password) {
            status
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
    .then((res) => {
      console.debug(res)
      // TODO: set token and session
    })
    .catch(console.error)
}
