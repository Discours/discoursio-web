import { gql } from 'graphql-request'

// email
export const IS_EMAIL_FREE = gql`
	query isEmailFreeQuery($email: String!) {
		isEmailFree(email: $email)
	}
`

// email password
export const SIGN_IN = gql`
	query SignInQuery($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			error
			token
			user {
				name
				slug
				userpic
			}
		}
	}
`
//  email password
export const SIGN_UP = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		registerUser(email: $email, password: $password) {
			error
			token
			user {
				name
				slug
				userpic
				bio
				links
			}
		}
	}
`

// uses Auth header
export const SIGN_OUT = gql`
	query {
		signOut {
			error
			result
		}
	}
`
// uses Auth header
export const GET_ME = gql`
	query {
		getCurrentUser {
			error
			user {
				name
				slug
				bio
				userpic
				links
			}
		}
	}
`

// TODO: joined with comments, topics, ratings and authors
export const GET_SHOUT = gql`
	query getShoutBySlug($slug: String!) {
		getShoutBySlug(slug: $slug) {
			title
			subtitle
			layout
			cover
			community
			body
			authors {
				name
				slug
				userpic
			}
			topics {
				slug
				title
				body
				pic
			}
			replyTo
			versionOf
			createdAt
			updatedAt
			published
			publishedAt
			views
			rating
			ratings
			comments
		}
	}
` // TODO: fix views as sum for all days by shout_id

export const GET_AUTHOR = gql`
	query getUserBySlug($slug: String!) {
		getUserBySlug(slug: $slug) {
			slug
			name
			bio
			roles
			userpic
			communities
			links
			createdAt
			wasOnlineAt
			ratings
		}
	}
`

export const GET_COMMUNITIES = gql`
	query {
		getCommunities() {
			slug
			pic
			value
			desc
			parents
			children
			createdAt
			createdBy
		}
	}
`

export const RECENT_SHOUTS = gql`
	query ($limit: Int) {
		recents(limit: $limit) {
			title
			subtitle
			layout
			cover
			authors {
				name
				slug
				userpic
			}
			community
			topics {
				slug
				title
				body
				pic
			}
			publishedAt
			views
			rating
		}
	}
`

export const TOP_OVERALL = gql`
	query ($limit: Int) {
		topOverall(limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const TOP_MONTH = gql`
	query ($limit: Int) {
		topMonth(limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const SHOUTS_BY_COMMUNITY = gql`
	query shoutsByCommunity($community: String!, $limit: Int) {
		shoutsByCommunity(community: $community, limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const SHOUTS_BY_AUTHOR = gql`
	query shoutsByAuthor($author: Int!, $limit: Int) {
		shoutsByAuthor(author: $author, limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const SHOUTS_BY_TOPIC = gql`
	query shoutsByTopic($topic: String!, $limit: Int) {
		shoutsByTopic(topic: $topic, limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const SHOUTS_BY_RATING = gql`
	query topicsByRating($limit: Int) {
		topShoutsByRating(limit: $limit) {
			title
			subtitle
			layout
			cover
			community
			topics {
				slug
				title
				body
				pic
			}
			authors {
				name
				slug
				userpic
			}
			publishedAt
			views
			rating
		}
	}
`

export const TOPICS_BY_SLUGS = gql`
	query topicsBySlugs($slugs: [String]!) {
		topicsBySlugs(slugs: $slugs) {
			title
			body
			slug
			pic
			parents
			children
			community
		}
	}
`
export const TOPICS_BY_COMMUNITY = gql`
	query topicsByCommunity($community: String!) {
		topicsByCommunity(community: $community) {
			title
			body
			slug
			pic
			parents
			children
			community
		}
	}
`

export const TOPICS_BY_AUTHOR = gql`
	query topicsByAuthor($author: String!) {
		topicsByAuthor(author: $author) {
			title
			body
			slug
			pic
			parents
			children
			community
		}
	}
`
