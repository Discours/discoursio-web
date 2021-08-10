import client from 'undefined'
import type {} from '@apollo/client'
import { readable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import gql from 'graphql-tag'
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

export type AuthResult = {
  __typename?: 'AuthResult'
  error?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
  user?: Maybe<User>
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
  registerUser: AuthResult
  createShout: ShoutResult
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

export type MutationRegisterUserArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationCreateShoutArgs = {
  input: ShoutInput
}

export type MutationDeleteShoutArgs = {
  slug: Scalars['String']
}

export type MutationRateShoutArgs = {
  slug: Scalars['String']
  value: Scalars['Int']
}

export type MutationUpdateProfileArgs = {
  profile: ProfileInput
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
  getUserById: UserResult
  getMessages: Array<Message>
  topAuthors: Array<Maybe<User>>
  topShouts: Array<Maybe<Shout>>
}

export type QueryIsEmailFreeArgs = {
  email: Scalars['String']
}

export type QuerySignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type QueryGetUserByIdArgs = {
  id: Scalars['Int']
}

export type QueryGetMessagesArgs = {
  count?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type Result = {
  __typename?: 'Result'
  error?: Maybe<Scalars['String']>
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
  replyTo?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
  versionOf?: Maybe<Scalars['String']>
  visibleForRoles?: Maybe<Array<Maybe<Scalars['String']>>>
  visibleForUsers?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type ShoutInput = {
  org: Scalars['String']
  slug: Scalars['String']
  body: Scalars['String']
  replyTo?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  topics?: Maybe<Array<Maybe<Scalars['String']>>>
  title?: Maybe<Scalars['String']>
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

export type UserResult = {
  __typename?: 'UserResult'
  error?: Maybe<Scalars['String']>
  user?: Maybe<User>
}
