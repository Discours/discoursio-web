import { gql } from 'solid-urql'

export default gql`
    mutation ProposalAcceptMutation($proposal: Int!) {
        acceptProposal(id: $proposal) {
            error
        }
    }
`
