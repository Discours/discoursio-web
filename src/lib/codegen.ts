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
  DateTime: any
}

export type AuthResult = {
  __typename?: 'AuthResult'
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type ChatRoom = {
  __typename?: 'ChatRoom'
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  notes?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

export type ChatRoomResult = {
  __typename?: 'ChatRoomResult'
  messages: Array<Maybe<Message>>
  room: ChatRoom
}

export type Comment = {
  __typename?: 'Comment'
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  old_id?: Maybe<Scalars['String']>
  old_thread?: Maybe<Scalars['String']>
  ratings?: Maybe<Array<Maybe<CommentRating>>>
  replyTo?: Maybe<Scalars['Int']>
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

export type CommentResult = {
  __typename?: 'CommentResult'
  comment?: Maybe<Comment>
  error?: Maybe<Scalars['String']>
}

export type Community = {
  __typename?: 'Community'
  desc?: Maybe<Scalars['String']>
  name: Scalars['String']
  pic: Scalars['String']
  slug: Scalars['String']
}

export type CommunityInput = {
  desc?: InputMaybe<Scalars['String']>
  pic?: InputMaybe<Scalars['String']>
  title: Scalars['String']
}

export type Message = {
  __typename?: 'Message'
  author: Scalars['Int']
  body: Scalars['String']
  chatRoom: Scalars['Int']
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

export enum MessageStatus {
  Deleted = 'DELETED',
  New = 'NEW',
  Updated = 'UPDATED'
}

export type MessageWithStatus = {
  __typename?: 'MessageWithStatus'
  message: Message
  status: MessageStatus
}

export type Mutation = {
  __typename?: 'Mutation'
  confirmEmail: AuthResult
  createComment: CommentResult
  createCommunity: Community
  createMessage: MessageResult
  createShout: ShoutResult
  createTopic: TopicResult
  deleteComment: Result
  deleteCommunity: Result
  deleteMessage: Result
  deleteShout: Result
  getRoom: ChatRoomResult
  rateComment: Result
  rateShout: Result
  registerUser: AuthResult
  requestPasswordUpdate: Result
  topicSubscribe: Result
  topicUnsubscribe: Result
  updateComment: CommentResult
  updateCommunity: Community
  updateMessage: MessageResult
  updatePassword: Result
  updateProfile: Result
  updateShout: ShoutResult
  updateTopic: TopicResult
  viewShout: Result
}

export type MutationConfirmEmailArgs = {
  token: Scalars['String']
}

export type MutationCreateCommentArgs = {
  body: Scalars['String']
  replyTo?: InputMaybe<Scalars['Int']>
  shout: Scalars['String']
}

export type MutationCreateCommunityArgs = {
  desc: Scalars['String']
  title: Scalars['String']
}

export type MutationCreateMessageArgs = {
  body: Scalars['String']
  replyTo?: InputMaybe<Scalars['Int']>
}

export type MutationCreateShoutArgs = {
  input: ShoutInput
}

export type MutationCreateTopicArgs = {
  input: TopicInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['Int']
}

export type MutationDeleteCommunityArgs = {
  id: Scalars['Int']
}

export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int']
}

export type MutationDeleteShoutArgs = {
  slug: Scalars['String']
}

export type MutationGetRoomArgs = {
  chatRoom: Scalars['Int']
}

export type MutationRateCommentArgs = {
  id: Scalars['Int']
  value: Scalars['Int']
}

export type MutationRateShoutArgs = {
  slug: Scalars['String']
  value: Scalars['Int']
}

export type MutationRegisterUserArgs = {
  email: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export type MutationRequestPasswordUpdateArgs = {
  email: Scalars['String']
}

export type MutationTopicSubscribeArgs = {
  slug: Scalars['String']
}

export type MutationTopicUnsubscribeArgs = {
  slug: Scalars['String']
}

export type MutationUpdateCommentArgs = {
  body: Scalars['String']
  id: Scalars['Int']
}

export type MutationUpdateCommunityArgs = {
  community: CommunityInput
}

export type MutationUpdateMessageArgs = {
  body: Scalars['String']
  id: Scalars['Int']
}

export type MutationUpdatePasswordArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type MutationUpdateProfileArgs = {
  profile: ProfileInput
}

export type MutationUpdateShoutArgs = {
  input: ShoutInput
}

export type MutationUpdateTopicArgs = {
  input: TopicInput
}

export type MutationViewShoutArgs = {
  slug: Scalars['String']
}

export type Notification = {
  __typename?: 'Notification'
  kind: Scalars['String']
  template: Scalars['String']
  variables?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Operation = {
  __typename?: 'Operation'
  id: Scalars['Int']
  name: Scalars['String']
}

export type Permission = {
  __typename?: 'Permission'
  operation_id: Scalars['Int']
  resource_id: Scalars['Int']
}

export type ProfileInput = {
  bio?: InputMaybe<Scalars['String']>
  links?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  name?: InputMaybe<Scalars['String']>
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
  getCommunities: Array<Maybe<Community>>
  getCommunity: Community
  getCurrentUser: UserResult
  getMessages: Array<Message>
  getShoutBySlug: Shout
  getShoutComments: Array<Maybe<Comment>>
  getUserRoles: Array<Maybe<Role>>
  getUsersBySlugs: Array<Maybe<User>>
  isEmailFree: Result
  recents: Array<Maybe<Shout>>
  shoutsByAuthor: Array<Maybe<Shout>>
  shoutsByCommunity: Array<Maybe<Shout>>
  shoutsByTopic: Array<Maybe<Shout>>
  signIn: AuthResult
  signOut: Result
  topMonth: Array<Maybe<Shout>>
  topOverall: Array<Maybe<Shout>>
  topViewed: Array<Maybe<Shout>>
  topicsByAuthor: Array<Maybe<Topic>>
  topicsByCommunity: Array<Maybe<Topic>>
  topicsBySlugs: Array<Maybe<Topic>>
}

export type QueryGetCommunityArgs = {
  slug?: InputMaybe<Scalars['String']>
}

export type QueryGetMessagesArgs = {
  count?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
}

export type QueryGetShoutBySlugArgs = {
  slug: Scalars['String']
}

export type QueryGetShoutCommentsArgs = {
  slug: Scalars['String']
}

export type QueryGetUserRolesArgs = {
  slug: Scalars['String']
}

export type QueryGetUsersBySlugsArgs = {
  slugs: Array<InputMaybe<Scalars['String']>>
}

export type QueryIsEmailFreeArgs = {
  email: Scalars['String']
}

export type QueryRecentsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsByAuthorArgs = {
  author: Scalars['String']
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsByCommunityArgs = {
  community: Scalars['String']
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsByTopicArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  topic: Scalars['String']
}

export type QuerySignInArgs = {
  email: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export type QueryTopMonthArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryTopOverallArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryTopViewedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryTopicsByAuthorArgs = {
  author: Scalars['String']
}

export type QueryTopicsByCommunityArgs = {
  community: Scalars['String']
}

export type QueryTopicsBySlugsArgs = {
  slugs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type Rating = {
  __typename?: 'Rating'
  rater: Scalars['Int']
  value: Scalars['Int']
}

export type Resource = {
  __typename?: 'Resource'
  id: Scalars['Int']
  name: Scalars['String']
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
  permissions: Array<Permission>
}

export type Shout = {
  __typename?: 'Shout'
  authors: Array<User>
  body: Scalars['String']
  community?: Maybe<Scalars['Int']>
  cover?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  layout?: Maybe<Scalars['String']>
  mainTopic?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedBy?: Maybe<Scalars['Int']>
  ratings?: Maybe<Array<Maybe<ShoutRating>>>
  slug: Scalars['String']
  stat?: Maybe<ShoutStat>
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  topics?: Maybe<Array<Maybe<Topic>>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<Scalars['Int']>
  versionOf?: Maybe<Shout>
  visibleFor?: Maybe<Array<Maybe<User>>>
}

export type ShoutInput = {
  body: Scalars['String']
  community: Scalars['Int']
  mainTopic?: InputMaybe<Scalars['String']>
  slug: Scalars['String']
  subtitle?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  topic_slugs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  versionOf?: InputMaybe<Scalars['String']>
  visibleForRoles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  visibleForUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
}

export type ShoutRating = {
  __typename?: 'ShoutRating'
  rater: Scalars['String']
  value: Scalars['Int']
}

export type ShoutResult = {
  __typename?: 'ShoutResult'
  error?: Maybe<Scalars['String']>
  shout?: Maybe<Shout>
}

export type ShoutStat = {
  __typename?: 'ShoutStat'
  comments: Scalars['Int']
  ratings: Scalars['Int']
  views: Scalars['Int']
}

export type Subscription = {
  __typename?: 'Subscription'
  chatUpdated: ChatRoomResult
  messageChanged: MessageWithStatus
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
  children?: Maybe<Array<Maybe<Scalars['String']>>>
  community: Scalars['String']
  parents?: Maybe<Array<Maybe<Scalars['String']>>>
  pic?: Maybe<Scalars['String']>
  slug: Scalars['String']
  title?: Maybe<Scalars['String']>
  topicStat?: Maybe<TopicStat>
}

export type TopicInput = {
  body?: InputMaybe<Scalars['String']>
  children?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  community: Scalars['String']
  pic?: InputMaybe<Scalars['String']>
  slug: Scalars['String']
  title?: InputMaybe<Scalars['String']>
}

export type TopicResult = {
  __typename?: 'TopicResult'
  error?: Maybe<Scalars['String']>
  topic?: Maybe<Topic>
}

export type TopicStat = {
  __typename?: 'TopicStat'
  authors: Scalars['Int']
  shouts: Scalars['Int']
  subscriptions: Scalars['Int']
  views: Scalars['Int']
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
  ratings?: Maybe<Array<Maybe<Rating>>>
  slug: Scalars['String']
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
  return { client, withWrapper }
}
export type Sdk = ReturnType<typeof getSdk>
