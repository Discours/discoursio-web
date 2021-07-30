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

export const signIn = (email: string, password: string): void => {
  console.log('gql: user is attempting to sign in')
  const res = client.query(
    gql`
      mutation SignInQuery($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          result
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
            result
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
