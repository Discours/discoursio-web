import { gql } from 'solid-urql'
import type { User } from '../types.gen'
// WARNING: need Auth header

export default gql`
  mutation ProfileUpdateMutation($user: Partial<User>!) {
    profileUpdate(user: $user) {
      error
      token
      user {
        name
        slug
        userpic
        bio
        # links
      }
    }
  }
`
