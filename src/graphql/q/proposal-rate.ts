import { gql } from 'solid-urql'

export default gql`
    mutation ProposalRateMutation($proposal: Int!) {
        rateProposal(id: $proposal) {
            error
        }
    }
`
