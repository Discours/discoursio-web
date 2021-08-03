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
  DateTime: any
}

export type ApiError = ErrorInterface & {
  __typename?: 'ApiError'
  message: Scalars['String']
}

export type ErrorInterface = {
  message: Scalars['String']
}

export type Like = {
  __typename?: 'Like'
  author: Scalars['Int']
  id: Scalars['Int']
  value: Scalars['Int']
  shout?: Maybe<Scalars['Int']>
  user?: Maybe<Scalars['Int']>
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

export type Mutation = {
  __typename?: 'Mutation'
  createMessage: ResultPayload
  updateMessage: ResultPayload
  deleteMessage: ResultPayload
  confirmEmail: ResultPayload
  registerUser: RegisterUserResult
  createShout: ResultPayload
  deleteShout: ResultPayload
  rateShout: ResultPayload
}

export type MutationCreateMessageArgs = {
  body: Scalars['String']
  replyTo?: Maybe<Scalars['Int']>
}

export type MutationUpdateMessageArgs = {
  id: Scalars['Int']
  body: Scalars['String']
}

export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int']
}

export type MutationConfirmEmailArgs = {
  token: Scalars['String']
}

export type MutationRegisterUserArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationDeleteShoutArgs = {
  shoutId: Scalars['Int']
}

export type MutationRateShoutArgs = {
  value: Scalars['Int']
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
  isEmailFree: ResultPayload
  signIn: SignInResult
  signOut: ResultPayload
  getCurrentUser: ResultPayload
  getMessages: Array<Message>
}

export type QueryIsEmailFreeArgs = {
  email: Scalars['String']
}

export type QuerySignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type QueryGetMessagesArgs = {
  count?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type RegisterUserOk = {
  __typename?: 'RegisterUserOk'
  token?: Maybe<Scalars['String']>
  user: User
}

export type RegisterUserResult = ApiError | RegisterUserOk

export type ResultPayload = {
  __typename?: 'ResultPayload'
  status: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
  user?: Maybe<User>
  message?: Maybe<Message>
  shout?: Maybe<Shout>
}

export type Role = {
  __typename?: 'Role'
  id: Scalars['Int']
  name: Scalars['String']
  org: Scalars['String']
  level: Scalars['Int']
  desc?: Maybe<Scalars['String']>
}

export type Shout = {
  __typename?: 'Shout'
  id: Scalars['Int']
  org: Scalars['String']
  slug: Scalars['String']
  author: Scalars['Int']
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  rating?: Maybe<Scalars['Int']>
  published?: Maybe<Scalars['DateTime']>
  replyTo?: Maybe<Scalars['Int']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  versionOf?: Maybe<Scalars['Int']>
  visibleForRoles?: Maybe<Array<Maybe<Scalars['String']>>>
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type SignInOk = {
  __typename?: 'SignInOk'
  token: Scalars['String']
  user: User
}

export type SignInResult = ApiError | SignInOk

export type Subscription = {
  __typename?: 'Subscription'
  messageCreated: Message
  messageUpdated: Message
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
  createdBy: Scalars['Int']
  createdAt: Scalars['DateTime']
  value?: Maybe<Scalars['String']>
  parents?: Maybe<Array<Maybe<Scalars['String']>>>
  children?: Maybe<Array<Maybe<Scalars['String']>>>
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
  wasOnlineAt?: Maybe<Scalars['DateTime']>
}
