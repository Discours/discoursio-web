import { gql } from 'solid-urql'

export default gql`
    query ForgetQuery($email: String!) {
        forget(email: $email) {
            error
        }
    }
`
