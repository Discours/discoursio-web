export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: Date
}

export type Like = {
  __typename?: 'Like'
  author: Scalars['Int']
  id: Scalars['Int']
  shout?: Maybe<Scalars['Int']>
  user?: Maybe<Scalars['Int']>
  value: Scalars['Int']
}

export type Message = {
  __typename?: 'Message'
  author: Scalars['Int']
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  replyTo?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type MessageInput = {
  body: Scalars['String']
  replyTo?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createMessage: CreateMessagePayload
  updateMessage: CreateMessagePayload
  deleteMessage: ResultPayload
  confirmEmail: Token
  invalidateAllTokens: Scalars['Boolean']
  invalidateTokenById: Scalars['Boolean']
  requestEmailConfirmation: User
  requestPasswordReset: Scalars['Boolean']
  resetPassword: Token
  signIn: Token
  registerUser: User
  createShout: Message
  deleteShout: Message
  rateShout: Scalars['Boolean']
  rateUser: Scalars['Boolean']
  updateOnlineStatus: Scalars['Boolean']
  updateUsername: User
}

export type MutationCreateMessageArgs = {
  input: MessageInput
}

export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput
}

export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int']
}

export type MutationConfirmEmailArgs = {
  token: Scalars['String']
}

export type MutationInvalidateTokenByIdArgs = {
  id: Scalars['Int']
}

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']
}

export type MutationResetPasswordArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type MutationRegisterUserArgs = {
  input: RegisterUserInput
}

export type MutationCreateShoutArgs = {
  body: Scalars['String']
  replyTo?: Maybe<Array<Maybe<Scalars['Int']>>>
  title?: Maybe<Scalars['String']>
  versionOf?: Maybe<Array<Maybe<Scalars['Int']>>>
  visibleForRoles?: Maybe<Array<Maybe<Scalars['Int']>>>
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type MutationDeleteShoutArgs = {
  shoutId: Scalars['Int']
}

export type MutationRateShoutArgs = {
  value: Scalars['Int']
}

export type MutationRateUserArgs = {
  value: Scalars['Int']
}

export type MutationUpdateUsernameArgs = {
  username: Scalars['String']
}

export type Proposal = {
  __typename?: 'Proposal'
  body: Scalars['String']
  shout: Scalars['Int']
  range?: Maybe<Scalars['String']>
  author: Scalars['Int']
  createdAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  signIn: SignInPayload
  signOut: ResultPayload
  getCurrentUser: User
  getTokens: Array<Token>
  isUsernameFree: Scalars['Boolean']
  getOnline: Array<User>
  getUserById: User
  getUserRating: Scalars['Int']
  getShoutRating: Scalars['Int']
  getMessages: Array<Message>
  getAllTopics: Array<Topic>
  shoutsByAuthor: Array<Maybe<Shout>>
  shoutsByReplyTo: Array<Maybe<Shout>>
  shoutsByTags: Array<Maybe<Shout>>
  shoutsByTime: Array<Maybe<Shout>>
  topAuthors: Array<Maybe<User>>
  topShouts: Array<Maybe<Shout>>
}

export type QuerySignInArgs = {
  id: Scalars['Int']
  password: Scalars['String']
}

export type QueryIsUsernameFreeArgs = {
  username: Scalars['String']
}

export type QueryGetUserByIdArgs = {
  id: Scalars['Int']
}

export type QueryGetUserRatingArgs = {
  shout?: Maybe<Scalars['Int']>
}

export type QueryGetMessagesArgs = {
  count?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type QueryGetShoutRatingArgs = {
  shout?: Maybe<Scalars['Int']>
}

export type QueryShoutsByAuthorArgs = {
  author?: Maybe<Scalars['Int']>
}

export type QueryShoutsByReplyToArgs = {
  shout?: Maybe<Scalars['Int']>
}

export type QueryShoutsByTagsArgs = {
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryShoutsByTimeArgs = {
  time?: Maybe<Scalars['DateTime']>
}

export type ResultPayload = {
  __typename?: 'ResultPayload'
  status: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type Role = {
  __typename?: 'Role'
  name: Scalars['String']
  desc: Maybe<Scalars['String']>
}

export type Shout = {
  __typename?: 'Shout'
  id: Scalars['Int']
  slug: Maybe<Scalars['String']>
  author: Scalars['Int']
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  rating?: Maybe<Scalars['Int']>
  published?: Scalars['DateTime']
  replyTo?: Maybe<Scalars['Int']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  versionOf?: Maybe<Scalars['Int']>
  visibleForRoles?: Maybe<Array<Maybe<Scalars['String']>>>
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type Subscription = {
  __typename?: 'Subscription'
  messageCreated: Message
  messageDeleted: Message
  onlineUpdated: Array<User>
  shoutUpdated: Shout
  userUpdated: User
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
  slug: Scalars['String']
  value: Scalars['String']
  parents?: Maybe<Array<Maybe<Scalars['String']>>>
  children?: Maybe<Array<Maybe<Scalars['String']>>>
  createdAt: Scalars['DateTime']
  createdBy: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  muted?: Maybe<Scalars['Boolean']>
  rating?: Maybe<Scalars['Int']>
  roles: Array<Role>
  updatedAt: Scalars['DateTime']
  username?: Maybe<Scalars['String']>
  userpic?: Maybe<Scalars['String']>
  userpicId?: Maybe<Scalars['String']>
  wasOnlineAt?: Maybe<Scalars['DateTime']>
}

export type CreateMessagePayload = {
  __typename?: 'createMessagePayload'
  status: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
  message?: Maybe<Message>
}

export type RegisterUserInput = {
  email: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
}

export type SignInPayload = {
  __typename?: 'signInPayload'
  status: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
}

export type UpdateMessageInput = {
  id: Scalars['Int']
  body: Scalars['String']
}
