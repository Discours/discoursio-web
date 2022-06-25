import { gql } from 'solid-urql'

export default gql`
    mutation ProposalCreateMutation($proposal: Proposal!) {
        updateProposal(proposal: $proposal) {
            id
            body
            shout
            range
            createdAt
            createdBy
            acceptedBy
            declinedBy
            updatedBy
            updatedAt
            disabledAt
            acceptedAt
            declinedAt
        }
    }
`
