import { gql } from 'graphql-request'

// email
export const IS_EMAIL_FREE = gql`
	query isEmailFreeQuery($email: String!) {
		isEmailFree(email: $email) {
			error
		}
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
				# links
			}
		}
	}
`

// uses Auth header
export const SIGN_OUT = gql`
	query SignOutQuery {
		signOut {
			error
		}
	}
`
// uses Auth header
export const GET_ME = gql`
	query GetCurrentUserQuery {
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
export const GET_COMMENTS = gql`
	query GetShoutComments($shout: Int!) {
		getShoutComments(shout_id: $shout) {
			id
			body
			createdAt
			author {
				name
				slug
				userpic
			}
			updatedAt
			replyTo
			ratings {
				value
				rater_id
			}
		}
	}
`

// TODO: joined with comments, topics, ratings and authors
export const GET_SHOUT = gql`
	query GetShoutBySlugQuery($slug: String!) {
		getShoutBySlug(slug: $slug) {
			id
			title
			subtitle
			layout
			cover
			community
			body
			authors {
				id
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
			createdAt
			updatedAt
			publishedAt
			views
			ratings {
				value
				rater_id
			}
			# comments
		}
	}
` // TODO: fix views as sum for all days by shout_id

export const GET_AUTHOR = gql`
	query GetUserBySlugQuery($slugs: [String]!) {
		getUsersBySlugs(slugs: $slugs) {
			user {
				slug
				name
				bio
				userpic
				communities
				links
				createdAt
				wasOnlineAt
				ratings {
					rater_id
					value
				}
			}
		}
	}
`

export const GET_ROLES = gql`
	query GetUserRolesBySlug($slug: String!) {
		getUserRoles(slug: $slug) {
			id
			name
			community
			desc
			permissions
		}
	}
`

export const MY_ROLES = gql`
	query {
		userRoles() {
			id
			name
			community
			desc
			permissions
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

export const GET_COMMUNITY = gql`
	query {
		getCommunity($slug: String) {
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
	query RecentShoutsQuery($limit: Int) {
		recents(limit: $limit) {
			title
			subtitle
			slug
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
	query TopOverallShoutsQuery($limit: Int) {
		topOverall(limit: $limit) {
			title
			subtitle
			slug
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
	query TopMonthShoutsQuery($limit: Int) {
		topMonth(limit: $limit) {
			title
			subtitle
			layout
			slug
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
	query ShoutsByCommunityQuery($community: String!, $limit: Int!) {
		shoutsByCommunity(community: $community, limit: $limit) {
			title
			subtitle
			layout
			slug
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
	query ShoutsByAuthorQuery($author: String!, $limit: Int!) {
		shoutsByAuthor(author: $author, limit: $limit) {
			title
			subtitle
			layout
			slug
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
	query ShoutsByTopicQuery($topic: String!, $limit: Int!) {
		shoutsByTopic(topic: $topic, limit: $limit) {
			title
			subtitle
			layout
			slug
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

export const AUTHORS_BY_SLUGS = gql`
	query AuthorsBySlugsQuery($slugs: [String]!) {
		authorsBySlugs(slugs: $slugs) {
			name
			slug
			userpic
			bio
			links
		}
	}
`

export const TOPICS_BY_SLUGS = gql`
	query TopicsBySlugsQuery($slugs: [String]!) {
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
	query TopicsByCommunityQuery($community: String!) {
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

export const TOPICS_ALL = gql`
	query TopicsAll() {
		topicsAll() {
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
	query TopicsByAuthorQuery($author: String!) {
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
