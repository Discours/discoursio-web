import { gql } from 'solid-urql'

export default gql`
    mutation CommunityUpdateMutation($community: Community!) {
        updateCommunity(community: $community) {
            _id: slug
            slug
            desc
            name
            pic
            createdAt
            createdBy
        }
    }
`
