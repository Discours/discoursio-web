import { gql } from 'solid-urql'

export default gql`
    mutation ProposalDestroyMutation($proposal: Int!) {
        deleteProposal(id: $proposal) {
            error
        }
    }
`
