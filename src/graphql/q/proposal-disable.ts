import { gql } from 'solid-urql'

export default gql`
    mutation ProposalDisableMutation($proposal: Int!) {
        disableProposal(id: $proposal) {
            error
        }
    }
`
