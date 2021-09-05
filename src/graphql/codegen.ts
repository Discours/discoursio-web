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
  id: Scalars['Int']
  author: Scalars['Int']
  body: Scalars['String']
  replyTo: Scalars['Int']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  shout: Scalars['Int']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  rating?: Maybe<Scalars['Int']>
  ratigns?: Maybe<Array<Maybe<Rating>>>
  views?: Maybe<Scalars['Int']>
  old_id?: Maybe<Scalars['String']>
}

export type Community = {
  __typename?: 'Community'
  slug: Scalars['String']
  name: Scalars['String']
  desc?: Maybe<Scalars['String']>
  pic: Scalars['String']
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
  createMessage: MessageResult
  updateMessage: MessageResult
  deleteMessage: Result
  confirmEmail: AuthResult
  requestPasswordReset: Scalars['Boolean']
  confirmPasswordReset: Scalars['Boolean']
  registerUser: AuthResult
  createShout: ShoutResult
  updateShout: ShoutResult
  deleteShout: Result
  rateShout: Result
  updateProfile: Result
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

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']
}

export type MutationConfirmPasswordResetArgs = {
  token: Scalars['String']
}

export type MutationRegisterUserArgs = {
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type MutationCreateShoutArgs = {
  input: ShoutInput
}

export type MutationUpdateShoutArgs = {
  id: Scalars['Int']
  input: ShoutInput
}

export type MutationDeleteShoutArgs = {
  id: Scalars['Int']
}

export type MutationRateShoutArgs = {
  id: Scalars['Int']
  value: Scalars['Int']
}

export type MutationUpdateProfileArgs = {
  profile: ProfileInput
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
  body: Scalars['String']
  shout: Scalars['Int']
  range?: Maybe<Scalars['String']>
  author: Scalars['Int']
  createdAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  isEmailFree: Result
  signIn: AuthResult
  signOut: Result
  getCurrentUser: UserResult
  getUserBySlug: UserResult
  getMessages: Array<Message>
  getShoutBySlug: Shout
  topShoutsByView: Array<Maybe<Shout>>
  topShoutsByRating: Array<Maybe<Shout>>
  favoritesShouts: Array<Maybe<Shout>>
  topAuthors: Array<Maybe<User>>
}

export type QueryIsEmailFreeArgs = {
  email: Scalars['String']
}

export type QuerySignInArgs = {
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type QueryGetUserBySlugArgs = {
  slug: Scalars['String']
}

export type QueryGetMessagesArgs = {
  count?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type QueryGetShoutBySlugArgs = {
  slug: Scalars['String']
}

export type QueryTopShoutsByViewArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryTopShoutsByRatingArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryFavoritesShoutsArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryTopAuthorsArgs = {
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
  id: Scalars['Int']
  name: Scalars['String']
  community: Scalars['Int']
  desc?: Maybe<Scalars['String']>
  permissions: Array<Scalars['Int']>
}

export type Shout = {
  __typename?: 'Shout'
  id: Scalars['Int']
  slug: Scalars['String']
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  authors: Array<User>
  comments?: Maybe<Array<Maybe<Comment>>>
  ratigns?: Maybe<Array<Maybe<Rating>>>
  visibleFor?: Maybe<Array<Maybe<User>>>
  community?: Maybe<Community>
  cover?: Maybe<Scalars['String']>
  layout?: Maybe<Scalars['String']>
  rating?: Maybe<Scalars['Int']>
  views?: Maybe<Scalars['Int']>
  replyTo?: Maybe<Shout>
  versionOf?: Maybe<Shout>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<Scalars['Int']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<Scalars['Int']>
  publishedBy?: Maybe<Scalars['Int']>
  publishedAt?: Maybe<Scalars['DateTime']>
  old_id?: Maybe<Scalars['String']>
}

export type ShoutInput = {
  slug: Scalars['String']
  body: Scalars['String']
  replyTo?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['Int']>>>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
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
  desc?: Maybe<Scalars['String']>
  parents?: Maybe<Array<Maybe<Scalars['String']>>>
  children?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['Int']
  username: Scalars['String']
  createdAt: Scalars['DateTime']
  slug: Scalars['String']
  viewname?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  oauth?: Maybe<Scalars['String']>
  userpic?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<Scalars['String']>>>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  muted?: Maybe<Scalars['Boolean']>
  roles?: Maybe<Array<Maybe<Role>>>
  updatedAt?: Maybe<Scalars['DateTime']>
  wasOnlineAt?: Maybe<Scalars['DateTime']>
  rating?: Maybe<Scalars['Int']>
  ratings?: Maybe<Array<Maybe<Rating>>>
  bio?: Maybe<Scalars['String']>
  notifications?: Maybe<Array<Maybe<Scalars['Int']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  communities?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type UserNotification = {
  __typename?: 'UserNotification'
  id: Scalars['Int']
  user: Scalars['Int']
  kind: Scalars['String']
  values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type UserResult = {
  __typename?: 'UserResult'
  error?: Maybe<Scalars['String']>
  user?: Maybe<User>
}
