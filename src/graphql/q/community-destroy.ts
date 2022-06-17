import { gql } from 'solid-urql'

export default gql`
    mutation CommunityDestroyMutation($slug: String!) {
        deleteCommunity(slug: $slug) {
            error
        }
    }
`