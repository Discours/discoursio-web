import type { GraphQLClient } from 'graphql-request'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	DateTime: string
}

export type AuthResult = {
	__typename?: 'AuthResult'
	error?: Maybe<Scalars['String']>
	token?: Maybe<Scalars['String']>
	user?: Maybe<User>
}

export type Comment = {
	__typename?: 'Comment'
	author: Scalars['Int']
	body: Scalars['String']
	createdAt: Scalars['DateTime']
	deletedAt?: Maybe<Scalars['DateTime']>
	deletedBy?: Maybe<Scalars['Int']>
	id: Scalars['Int']
	old_id?: Maybe<Scalars['String']>
	old_thread?: Maybe<Scalars['String']>
	ratings?: Maybe<Array<Maybe<CommentRating>>>
	rating?: Maybe<Scalars['Int']>
	replyTo: Scalars['Int']
	shout: Scalars['Int']
	updatedAt?: Maybe<Scalars['DateTime']>
	updatedBy?: Maybe<Scalars['Int']>
	views?: Maybe<Scalars['Int']>
}

export type CommentRating = {
	__typename?: 'CommentRating'
	comment_id: Scalars['Int']
	createdAt: Scalars['DateTime']
	createdBy: Scalars['Int']
	id: Scalars['Int']
	value: Scalars['Int']
}

export type Community = {
	__typename?: 'Community'
	desc?: Maybe<Scalars['String']>
	name: Scalars['String']
	pic: Scalars['String']
	slug: Scalars['String']
}

export type Message = {
	__typename?: 'Message'
	author: Scalars['Int']
	body: Scalars['String']
	createdAt: Scalars['DateTime']
	id: Scalars['Int']
	replyTo?: Maybe<Scalars['Int']>
	updatedAt: Scalars['DateTime']
	visibleForUsers: Array<Maybe<Scalars['Int']>>
}

export type MessageResult = {
	__typename?: 'MessageResult'
	error?: Maybe<Scalars['String']>
	message?: Maybe<Message>
}

export type Mutation = {
	__typename?: 'Mutation'
	confirmEmail: AuthResult
	confirmPasswordReset: Scalars['Boolean']
	createMessage: MessageResult
	createShout: ShoutResult
	deleteMessage: Result
	deleteShout: Result
	rateShout: Result
	registerUser: AuthResult
	requestPasswordReset: Scalars['Boolean']
	topicSubscribe: Result
	topicUnsubscribe: Result
	updateMessage: MessageResult
	updateProfile: Result
	updateShout: ShoutResult
	viewShout: Result
}

export type MutationConfirmEmailArgs = {
	token: Scalars['String']
}

export type MutationConfirmPasswordResetArgs = {
	token: Scalars['String']
}

export type MutationCreateMessageArgs = {
	body: Scalars['String']
	replyTo?: InputMaybe<Scalars['Int']>
}

export type MutationCreateShoutArgs = {
	input: ShoutInput
}

export type MutationDeleteMessageArgs = {
	messageId: Scalars['Int']
}

export type MutationDeleteShoutArgs = {
	id: Scalars['Int']
}

export type MutationRateShoutArgs = {
	shout_id: Scalars['Int']
	value: Scalars['Int']
}

export type MutationRegisterUserArgs = {
	email: Scalars['String']
	password?: InputMaybe<Scalars['String']>
}

export type MutationRequestPasswordResetArgs = {
	email: Scalars['String']
}

export type MutationTopicSubscribeArgs = {
	slug: Scalars['String']
}

export type MutationTopicUnsubscribeArgs = {
	slug: Scalars['String']
}

export type MutationUpdateMessageArgs = {
	body: Scalars['String']
	id: Scalars['Int']
}

export type MutationUpdateProfileArgs = {
	profile: ProfileInput
}

export type MutationUpdateShoutArgs = {
	id: Scalars['Int']
	input: ShoutInput
}

export type MutationViewShoutArgs = {
	shout_id: Scalars['Int']
}

export type Notification = {
	__typename?: 'Notification'
	kind: Scalars['String']
	template: Scalars['String']
	variables?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ProfileInput = {
	email?: InputMaybe<Scalars['String']>
	username?: InputMaybe<Scalars['String']>
	userpic?: InputMaybe<Scalars['String']>
}

export type Proposal = {
	__typename?: 'Proposal'
	author: Scalars['Int']
	body: Scalars['String']
	createdAt: Scalars['DateTime']
	range?: Maybe<Scalars['String']>
	shout: Scalars['Int']
}

export type Query = {
	__typename?: 'Query'
	getCurrentUser: UserResult
	getMessages: Array<Message>
	getShoutBySlug: Shout
	getUserBySlug: UserResult
	isEmailFree: Result
	recents: Array<Maybe<Shout>>
	shoutsByAuthor: Array<Maybe<Shout>>
	shoutsByCommunity: Array<Maybe<Shout>>
	shoutsByTopic: Array<Maybe<Shout>>
	signIn: AuthResult
	signOut: Result
	topAuthors: Array<Maybe<User>>
	topMonth: Array<Maybe<Shout>>
	topOverall: Array<Maybe<Shout>>
	topViewed: Array<Maybe<Shout>>
	topicsByAuthor: Array<Maybe<Topic>>
	topicsByCommunity: Array<Maybe<Topic>>
	topicsBySlugs: Array<Maybe<Topic>>
}

export type QueryGetMessagesArgs = {
	count?: InputMaybe<Scalars['Int']>
	page?: InputMaybe<Scalars['Int']>
}

export type QueryGetShoutBySlugArgs = {
	slug: Scalars['String']
}

export type QueryGetUserBySlugArgs = {
	slug: Scalars['String']
}

export type QueryIsEmailFreeArgs = {
	email: Scalars['String']
}

export type QueryRecentsArgs = {
	limit?: InputMaybe<Scalars['Int']>
}

export type QueryShoutsByAuthorArgs = {
	author: Scalars['String']
	limit: Scalars['Int']
}

export type QueryShoutsByCommunityArgs = {
	community: Scalars['String']
	limit: Scalars['Int']
}

export type QueryShoutsByTopicArgs = {
	limit: Scalars['Int']
	topic: Scalars['String']
}

export type QuerySignInArgs = {
	email: Scalars['String']
	password?: InputMaybe<Scalars['String']>
}

export type QueryTopAuthorsArgs = {
	limit?: InputMaybe<Scalars['Int']>
}

export type QueryTopMonthArgs = {
	limit?: InputMaybe<Scalars['Int']>
}

export type QueryTopOverallArgs = {
	limit?: InputMaybe<Scalars['Int']>
}

export type QueryTopViewedArgs = {
	limit?: InputMaybe<Scalars['Int']>
}

export type QueryTopicsByAuthorArgs = {
	author: Scalars['String']
}

export type QueryTopicsByCommunityArgs = {
	community: Scalars['String']
}

export type QueryTopicsBySlugsArgs = {
	slugs: Array<InputMaybe<Scalars['String']>>
}

export type Rating = {
	__typename?: 'Rating'
	createdBy: Scalars['Int']
	value: Scalars['Int']
}

export type Result = {
	__typename?: 'Result'
	error?: Maybe<Scalars['String']>
}

export type Role = {
	__typename?: 'Role'
	community: Scalars['Int']
	desc?: Maybe<Scalars['String']>
	id: Scalars['Int']
	name: Scalars['String']
	permissions: Array<Scalars['Int']>
}

export type Shout = {
	__typename?: 'Shout'
	authors: Array<User>
	body: Scalars['String']
	comments?: Maybe<Array<Maybe<Comment>>>
	community?: Maybe<Scalars['Int']>
	cover?: Maybe<Scalars['String']>
	createdAt: Scalars['DateTime']
	deletedAt?: Maybe<Scalars['DateTime']>
	deletedBy?: Maybe<Scalars['Int']>
	id: Scalars['Int']
	layout?: Maybe<Scalars['String']>
	old_id?: Maybe<Scalars['String']>
	publishedAt?: Maybe<Scalars['DateTime']>
	publishedBy?: Maybe<Scalars['Int']>
	ratings?: Maybe<Array<Maybe<Rating>>>
	rating?: Maybe<Scalars['Int']>
	slug: Scalars['String']
	subtitle?: Maybe<Scalars['String']>
	tags?: Maybe<Array<Maybe<Scalars['String']>>>
	title?: Maybe<Scalars['String']>
	topics?: Maybe<Array<Maybe<Topic>>>
	updatedAt?: Maybe<Scalars['DateTime']>
	updatedBy?: Maybe<Scalars['Int']>
	versionOf?: Maybe<Shout>
	views?: Maybe<Scalars['Int']>
	visibleFor?: Maybe<Array<Maybe<User>>>
}

export type ShoutInput = {
	body: Scalars['String']
	slug: Scalars['String']
	subtitle?: InputMaybe<Scalars['String']>
	title?: InputMaybe<Scalars['String']>
	topic_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
	versionOf?: InputMaybe<Scalars['String']>
	visibleForRoles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
	visibleForUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
}

export type ShoutResult = {
	__typename?: 'ShoutResult'
	error?: Maybe<Scalars['String']>
	shout?: Maybe<Shout>
}

export type Subscription = {
	__typename?: 'Subscription'
	messageCreated: Message
	messageDeleted: Message
	messageUpdated: Message
	onlineUpdated: Array<User>
	shoutUpdated: Shout
	topicUpdated: Shout
	userUpdated: User
}

export type SubscriptionTopicUpdatedArgs = {
	user_id: Scalars['Int']
}

export type Token = {
	__typename?: 'Token'
	createdAt: Scalars['DateTime']
	expiresAt?: Maybe<Scalars['DateTime']>
	id: Scalars['Int']
	ownerId: Scalars['Int']
	usedAt?: Maybe<Scalars['DateTime']>
	value: Scalars['String']
}

export type Topic = {
	__typename?: 'Topic'
	body?: Maybe<Scalars['String']>
	cat_id?: Maybe<Scalars['String']>
	children?: Maybe<Array<Maybe<Scalars['String']>>>
	parents?: Maybe<Array<Maybe<Scalars['String']>>>
	pic?: Maybe<Scalars['String']>
	slug: Scalars['String']
	title?: Maybe<Scalars['String']>
}

export type User = {
	__typename?: 'User'
	bio?: Maybe<Scalars['String']>
	communities?: Maybe<Array<Maybe<Scalars['Int']>>>
	createdAt: Scalars['DateTime']
	email?: Maybe<Scalars['String']>
	emailConfirmed?: Maybe<Scalars['Boolean']>
	id: Scalars['Int']
	links?: Maybe<Array<Maybe<Scalars['String']>>>
	muted?: Maybe<Scalars['Boolean']>
	name?: Maybe<Scalars['String']>
	notifications?: Maybe<Array<Maybe<Scalars['Int']>>>
	oauth?: Maybe<Scalars['String']>
	old_id?: Maybe<Scalars['String']>
	password?: Maybe<Scalars['String']>
	rating?: Maybe<Scalars['Int']>
	ratings?: Maybe<Array<Maybe<Rating>>>
	roles?: Maybe<Array<Maybe<Role>>>
	slug: Scalars['String']
	topics?: Maybe<Array<Maybe<Scalars['String']>>>
	updatedAt?: Maybe<Scalars['DateTime']>
	username: Scalars['String']
	userpic?: Maybe<Scalars['String']>
	wasOnlineAt?: Maybe<Scalars['DateTime']>
}

export type UserNotification = {
	__typename?: 'UserNotification'
	id: Scalars['Int']
	kind: Scalars['String']
	user: Scalars['Int']
	values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type UserResult = {
	__typename?: 'UserResult'
	error?: Maybe<Scalars['String']>
	user?: Maybe<User>
}

export type SdkFunctionWrapper = <T>(
	action: (requestHeaders?: Record<string, string>) => Promise<T>,
	operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
	client: GraphQLClient,
	withWrapper: SdkFunctionWrapper = defaultWrapper
) {
	return {}
}
export type Sdk = ReturnType<typeof getSdk>
