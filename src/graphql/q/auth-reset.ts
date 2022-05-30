import { gql } from 'solid-urql'

export default gql`
  query ResetQuery($code: String!) {
    reset(code: $code) {
      error
    }
  }
`
