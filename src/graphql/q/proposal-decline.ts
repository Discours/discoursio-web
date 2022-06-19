import { gql } from 'solid-urql'

export default gql`
    mutation ProposalDeclineMutation($proposal: Int!) {
        declineProposal(id: $proposal) {
            error
        }
    }
`
