export type Maybe<T> = T | null
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
  deleted?: Maybe<Scalars['Boolean']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  old_id?: Maybe<Scalars['String']>
  ratigns?: Maybe<Array<Maybe<Rating>>>
  rating?: Maybe<Scalars['Int']>
  replyTo: Scalars['Int']
  shout: Scalars['Int']
  updatedAt?: Maybe<Scalars['DateTime']>
  views?: Maybe<Scalars['Int']>
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
  replyTo?: Maybe<Scalars['Int']>
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
  password?: Maybe<Scalars['String']>
}

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']
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
  email?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  userpic?: Maybe<Scalars['String']>
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
  favoritesShouts: Array<Maybe<Shout>>
  getCurrentUser: UserResult
  getMessages: Array<Message>
  getShoutBySlug: Shout
  getUserBySlug: UserResult
  isEmailFree: Result
  signIn: AuthResult
  signOut: Result
  topAuthors: Array<Maybe<User>>
  topShoutsByRating: Array<Maybe<Shout>>
  topShoutsByView: Array<Maybe<Shout>>
}

export type QueryFavoritesShoutsArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryGetMessagesArgs = {
  count?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
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

export type QuerySignInArgs = {
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type QueryTopAuthorsArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryTopShoutsByRatingArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryTopShoutsByViewArgs = {
  limit?: Maybe<Scalars['Int']>
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
  ratigns?: Maybe<Array<Maybe<Rating>>>
  rating?: Maybe<Scalars['Int']>
  replyTo?: Maybe<Shout>
  slug: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<Scalars['Int']>
  versionOf?: Maybe<Shout>
  views?: Maybe<Scalars['Int']>
  visibleFor?: Maybe<Array<Maybe<User>>>
}

export type ShoutInput = {
  body: Scalars['String']
  replyTo?: Maybe<Scalars['String']>
  slug: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  topics?: Maybe<Array<Maybe<Scalars['Int']>>>
  versionOf?: Maybe<Scalars['String']>
  visibleForRoles?: Maybe<Array<Maybe<Scalars['String']>>>
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
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
  body?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<Scalars['String']>>>
  createdAt: Scalars['DateTime']
  createdBy: Scalars['Int']
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
