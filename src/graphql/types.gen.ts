import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
  info?: Maybe<CurrentUserInfo>
  token?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type Community = {
  __typename?: 'Community'
  createdAt: Scalars['DateTime']
  createdBy: User
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

export type CurrentUserInfo = {
  __typename?: 'CurrentUserInfo'
  authors: Array<Maybe<Scalars['String']>>
  communities: Array<Maybe<Scalars['String']>>
  inbox?: Maybe<Scalars['Int']>
  reactions: Array<Maybe<Scalars['String']>>
  topics: Array<Maybe<Scalars['String']>>
}

export enum FollowingEntity {
  Author = 'AUTHOR',
  Community = 'COMMUNITY',
  Reactions = 'REACTIONS',
  Topic = 'TOPIC'
}

export type Mutation = {
  __typename?: 'Mutation'
  confirmEmail: AuthResult
  createCommunity: Community
  createReaction: ReactionResult
  createShout: ShoutResult
  createTopic: TopicResult
  deleteCommunity: Result
  deleteReaction: Result
  deleteShout: Result
  follow: Result
  inviteAuthor: Result
  rateReaction: Result
  rateShout: Result
  rateUser: Result
  registerUser: AuthResult
  removeAuthor: Result
  requestPasswordUpdate: Result
  unfollow: Result
  updateCommunity: Community
  updatePassword: Result
  updateProfile: Result
  updateReaction: ReactionResult
  updateShout: ShoutResult
  updateTopic: TopicResult
  viewShout: Result
}

export type MutationConfirmEmailArgs = {
  token: Scalars['String']
}

export type MutationCreateCommunityArgs = {
  community: CommunityInput
}

export type MutationCreateReactionArgs = {
  input: ReactionInput
}

export type MutationCreateShoutArgs = {
  input: ShoutInput
}

export type MutationCreateTopicArgs = {
  input: TopicInput
}

export type MutationDeleteCommunityArgs = {
  slug: Scalars['String']
}

export type MutationDeleteReactionArgs = {
  id: Scalars['Int']
}

export type MutationDeleteShoutArgs = {
  slug: Scalars['String']
}

export type MutationFollowArgs = {
  slug: Scalars['String']
  what: FollowingEntity
}

export type MutationInviteAuthorArgs = {
  author: Scalars['String']
  shout: Scalars['String']
}

export type MutationRateReactionArgs = {
  id: Scalars['Int']
  value: Scalars['Int']
}

export type MutationRateShoutArgs = {
  slug: Scalars['String']
  value: Scalars['Int']
}

export type MutationRateUserArgs = {
  slug: Scalars['String']
  value: Scalars['Int']
}

export type MutationRegisterUserArgs = {
  email: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export type MutationRemoveAuthorArgs = {
  author: Scalars['String']
  shout: Scalars['String']
}

export type MutationRequestPasswordUpdateArgs = {
  email: Scalars['String']
}

export type MutationUnfollowArgs = {
  slug: Scalars['String']
  what: FollowingEntity
}

export type MutationUpdateCommunityArgs = {
  community: CommunityInput
}

export type MutationUpdatePasswordArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type MutationUpdateProfileArgs = {
  profile: ProfileInput
}

export type MutationUpdateReactionArgs = {
  body: Scalars['String']
  id: Scalars['Int']
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

export type Query = {
  __typename?: 'Query'
  forget: Result
  getCommunities: Array<Maybe<Community>>
  getCommunity: Community
  getCurrentUser: UserResult
  getShoutBySlug: Shout
  getShoutReactions: Array<Maybe<Reaction>>
  getUserRoles: Array<Maybe<Role>>
  getUsersBySlugs: Array<Maybe<User>>
  inviteAuthor: Result
  isEmailUsed: Scalars['Boolean']
  myShoutCandidates: ShoutsResult
  reactionsAll: Array<Maybe<Reaction>>
  recentAll: Array<Maybe<Shout>>
  recentPublished: Array<Maybe<Shout>>
  recentReacted: Array<Maybe<Shout>>
  removeAuthor: Result
  requestPasswordReset: Result
  shoutsByAuthors: Array<Maybe<Shout>>
  shoutsByCommunities: Array<Maybe<Shout>>
  shoutsByTopics: Array<Maybe<Shout>>
  shoutsForFeed: Array<Maybe<Shout>>
  shoutsRatedByUser: ShoutsResult
  shoutsReactedByUser: ShoutsResult
  shoutsReviewed: Array<Maybe<Shout>>
  signIn: AuthResult
  signOut: Result
  topMonth: Array<Maybe<Shout>>
  topOverall: Array<Maybe<Shout>>
  topViewed: Array<Maybe<Shout>>
  topicsAll: Array<Maybe<Topic>>
  topicsByAuthor: Array<Maybe<Topic>>
  topicsByCommunity: Array<Maybe<Topic>>
  updatePassword: Result
  userFollowedAuthors: Array<Maybe<User>>
  userFollowedCommunities: Array<Maybe<Community>>
  userFollowedTopics: Array<Maybe<Topic>>
  userFollowers: Array<Maybe<User>>
  userReactions: Array<Maybe<Reaction>>
}

export type QueryForgetArgs = {
  email: Scalars['String']
}

export type QueryGetCommunityArgs = {
  slug?: InputMaybe<Scalars['String']>
}

export type QueryGetShoutBySlugArgs = {
  slug: Scalars['String']
}

export type QueryGetShoutReactionsArgs = {
  slug: Scalars['String']
}

export type QueryGetUserRolesArgs = {
  slug: Scalars['String']
}

export type QueryGetUsersBySlugsArgs = {
  slugs: Array<InputMaybe<Scalars['String']>>
}

export type QueryInviteAuthorArgs = {
  author: Scalars['String']
  slug: Scalars['String']
}

export type QueryIsEmailUsedArgs = {
  email: Scalars['String']
}

export type QueryMyShoutCandidatesArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryReactionsAllArgs = {
  page?: InputMaybe<Scalars['Int']>
  size?: InputMaybe<Scalars['Int']>
}

export type QueryRecentAllArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryRecentPublishedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryRecentReactedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryRemoveAuthorArgs = {
  author: Scalars['String']
  slug: Scalars['String']
}

export type QueryRequestPasswordResetArgs = {
  email: Scalars['String']
}

export type QueryShoutsByAuthorsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slugs: Array<InputMaybe<Scalars['String']>>
}

export type QueryShoutsByCommunitiesArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slugs: Array<InputMaybe<Scalars['String']>>
}

export type QueryShoutsByTopicsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slugs: Array<InputMaybe<Scalars['String']>>
}

export type QueryShoutsForFeedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsRatedByUserArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsReactedByUserArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsReviewedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
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

export type QueryTopicsAllArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryTopicsByAuthorArgs = {
  author: Scalars['String']
}

export type QueryTopicsByCommunityArgs = {
  community: Scalars['String']
}

export type QueryUpdatePasswordArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type QueryUserFollowedAuthorsArgs = {
  slug: Scalars['String']
}

export type QueryUserFollowedCommunitiesArgs = {
  slug: Scalars['String']
}

export type QueryUserFollowedTopicsArgs = {
  slug: Scalars['String']
}

export type QueryUserFollowersArgs = {
  slug: Scalars['String']
}

export type QueryUserReactionsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slug: Scalars['String']
}

export type Rating = {
  __typename?: 'Rating'
  rater: Scalars['String']
  value: Scalars['Int']
}

export type Reaction = {
  __typename?: 'Reaction'
  body?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  createdBy: User
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<User>
  id: Scalars['Int']
  kind: ReactionKind
  old_id?: Maybe<Scalars['String']>
  old_thread?: Maybe<Scalars['String']>
  range?: Maybe<Scalars['String']>
  replyTo?: Maybe<Reaction>
  shout: Shout
  updatedAt?: Maybe<Scalars['DateTime']>
  views?: Maybe<Scalars['Int']>
}

export type ReactionInput = {
  body?: InputMaybe<Scalars['String']>
  kind: Scalars['Int']
  range?: InputMaybe<Scalars['String']>
  replyTo?: InputMaybe<Scalars['Int']>
  shout: Scalars['String']
}

export enum ReactionKind {
  Accept = 'ACCEPT',
  Agree = 'AGREE',
  AskProof = 'ASK_PROOF',
  Comment = 'COMMENT',
  Decline = 'DECLINE',
  Disagree = 'DISAGREE',
  Proof = 'PROOF',
  ProofAgainst = 'PROOF_AGAINST',
  Propose = 'PROPOSE',
  Qoute = 'QOUTE',
  Question = 'QUESTION'
}

export type ReactionResult = {
  __typename?: 'ReactionResult'
  error?: Maybe<Scalars['String']>
  reaction?: Maybe<Reaction>
}

export enum ReactionStatus {
  Changed = 'CHANGED',
  Deleted = 'DELETED',
  Explained = 'EXPLAINED',
  New = 'NEW',
  Updated = 'UPDATED'
}

export type ReactionUpdatedResult = {
  __typename?: 'ReactionUpdatedResult'
  error?: Maybe<Scalars['String']>
  reaction?: Maybe<Reaction>
  status?: Maybe<ReactionStatus>
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
  community: Scalars['String']
  desc?: Maybe<Scalars['String']>
  id: Scalars['Int']
  name: Scalars['String']
  permissions: Array<Permission>
}

export type Shout = {
  __typename?: 'Shout'
  authors: Array<User>
  body: Scalars['String']
  community?: Maybe<Scalars['String']>
  cover?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedBy?: Maybe<User>
  draft?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  layout?: Maybe<Scalars['String']>
  mainTopic?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedBy?: Maybe<User>
  slug: Scalars['String']
  stat?: Maybe<ShoutStat>
  subtitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  topics?: Maybe<Array<Maybe<Topic>>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
  versionOf?: Maybe<Shout>
  visibleFor?: Maybe<Array<Maybe<User>>>
}

export type ShoutInput = {
  body: Scalars['String']
  community: Scalars['String']
  mainTopic?: InputMaybe<Scalars['String']>
  slug: Scalars['String']
  subtitle?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  topic_slugs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  versionOf?: InputMaybe<Scalars['String']>
  visibleForRoles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  visibleForUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
}

export type ShoutResult = {
  __typename?: 'ShoutResult'
  error?: Maybe<Scalars['String']>
  shout?: Maybe<Shout>
}

export type ShoutStat = {
  __typename?: 'ShoutStat'
  reacted: Scalars['Int']
  views: Scalars['Int']
}

export type ShoutsResult = {
  __typename?: 'ShoutsResult'
  error?: Maybe<Scalars['String']>
  shouts?: Maybe<Array<Maybe<Shout>>>
}

export type Subscription = {
  __typename?: 'Subscription'
  onlineUpdated: Array<User>
  reactionUpdated: ReactionUpdatedResult
  shoutUpdated: Shout
  userUpdated: User
}

export type SubscriptionReactionUpdatedArgs = {
  shout: Scalars['String']
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
  community: Community
  oid?: Maybe<Scalars['String']>
  parents?: Maybe<Array<Maybe<Scalars['String']>>>
  pic?: Maybe<Scalars['String']>
  slug: Scalars['String']
  stat?: Maybe<TopicStat>
  title?: Maybe<Scalars['String']>
}

export type TopicInput = {
  body?: InputMaybe<Scalars['String']>
  children?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  community: Scalars['String']
  parents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
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
  followers: Scalars['Int']
  shouts: Scalars['Int']
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
  oid?: Maybe<Scalars['String']>
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
  info?: Maybe<CurrentUserInfo>
  user?: Maybe<User>
}

import { IntrospectionQuery } from 'graphql'
export default {
  __schema: {
    queryType: {
      name: 'Query'
    },
    mutationType: {
      name: 'Mutation'
    },
    subscriptionType: {
      name: 'Subscription'
    },
    types: [
      {
        kind: 'OBJECT',
        name: 'AuthResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'info',
            type: {
              kind: 'OBJECT',
              name: 'CurrentUserInfo',
              ofType: null
            },
            args: []
          },
          {
            name: 'token',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'user',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Community',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'createdBy',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'desc',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'pic',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'slug',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentUserInfo',
        fields: [
          {
            name: 'authors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          },
          {
            name: 'communities',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          },
          {
            name: 'inbox',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'reactions',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          },
          {
            name: 'topics',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Mutation',
        fields: [
          {
            name: 'confirmEmail',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'token',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'createCommunity',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Community',
                ofType: null
              }
            },
            args: [
              {
                name: 'community',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'createReaction',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ReactionResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'input',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'createShout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ShoutResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'input',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'createTopic',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TopicResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'input',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'deleteCommunity',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'deleteReaction',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'deleteShout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'follow',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'what',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'inviteAuthor',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'author',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'shout',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'rateReaction',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'value',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'rateShout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'value',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'rateUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'value',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'registerUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'password',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'removeAuthor',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'author',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'shout',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'requestPasswordUpdate',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'unfollow',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'what',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updateCommunity',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Community',
                ofType: null
              }
            },
            args: [
              {
                name: 'community',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updatePassword',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'password',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'token',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updateProfile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'profile',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updateReaction',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ReactionResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'body',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'id',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updateShout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ShoutResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'input',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updateTopic',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TopicResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'input',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'viewShout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Notification',
        fields: [
          {
            name: 'kind',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'template',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'variables',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Operation',
        fields: [
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Permission',
        fields: [
          {
            name: 'operation_id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'resource_id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: 'forget',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'getCommunities',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Community',
                  ofType: null
                }
              }
            },
            args: []
          },
          {
            name: 'getCommunity',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Community',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'getCurrentUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'UserResult',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'getShoutBySlug',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Shout',
                ofType: null
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'getShoutReactions',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Reaction',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'getUserRoles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Role',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'getUsersBySlugs',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'User',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slugs',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'inviteAuthor',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'author',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'isEmailUsed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'myShoutCandidates',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ShoutsResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'reactionsAll',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Reaction',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'recentAll',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'recentPublished',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'recentReacted',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'removeAuthor',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'author',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'requestPasswordReset',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsByAuthors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slugs',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsByCommunities',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slugs',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsByTopics',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slugs',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsForFeed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsRatedByUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ShoutsResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsReactedByUser',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ShoutsResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'shoutsReviewed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'signIn',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'email',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'password',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'signOut',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'topMonth',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'topOverall',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'topViewed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Shout',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'topicsAll',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Topic',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'topicsByAuthor',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Topic',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'author',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'topicsByCommunity',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Topic',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'community',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'updatePassword',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Result',
                ofType: null
              }
            },
            args: [
              {
                name: 'password',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'token',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userFollowedAuthors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'User',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userFollowedCommunities',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Community',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userFollowedTopics',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Topic',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userFollowers',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'User',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userReactions',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Reaction',
                  ofType: null
                }
              }
            },
            args: [
              {
                name: 'page',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'size',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'slug',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Rating',
        fields: [
          {
            name: 'rater',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Reaction',
        fields: [
          {
            name: 'body',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'createdBy',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'deletedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'deletedBy',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'kind',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'old_id',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'old_thread',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'range',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'replyTo',
            type: {
              kind: 'OBJECT',
              name: 'Reaction',
              ofType: null
            },
            args: []
          },
          {
            name: 'shout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Shout',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'updatedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'views',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ReactionResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'reaction',
            type: {
              kind: 'OBJECT',
              name: 'Reaction',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ReactionUpdatedResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'reaction',
            type: {
              kind: 'OBJECT',
              name: 'Reaction',
              ofType: null
            },
            args: []
          },
          {
            name: 'status',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Resource',
        fields: [
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Result',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Role',
        fields: [
          {
            name: 'community',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'desc',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'permissions',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Permission',
                    ofType: null
                  }
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Shout',
        fields: [
          {
            name: 'authors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'User',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'body',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'community',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'cover',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'deletedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'deletedBy',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          },
          {
            name: 'draft',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'layout',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'mainTopic',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'publishedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'publishedBy',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          },
          {
            name: 'slug',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'stat',
            type: {
              kind: 'OBJECT',
              name: 'ShoutStat',
              ofType: null
            },
            args: []
          },
          {
            name: 'subtitle',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'title',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'topics',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Topic',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'updatedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'updatedBy',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          },
          {
            name: 'versionOf',
            type: {
              kind: 'OBJECT',
              name: 'Shout',
              ofType: null
            },
            args: []
          },
          {
            name: 'visibleFor',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ShoutResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'shout',
            type: {
              kind: 'OBJECT',
              name: 'Shout',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ShoutStat',
        fields: [
          {
            name: 'reacted',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'views',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ShoutsResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'shouts',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Shout',
                ofType: null
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Subscription',
        fields: [
          {
            name: 'onlineUpdated',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'User',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'reactionUpdated',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ReactionUpdatedResult',
                ofType: null
              }
            },
            args: [
              {
                name: 'shout',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'shoutUpdated',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Shout',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'userUpdated',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Token',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'expiresAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'ownerId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'usedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'Topic',
        fields: [
          {
            name: 'body',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'children',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'community',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Community',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'oid',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'parents',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'pic',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'slug',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'stat',
            type: {
              kind: 'OBJECT',
              name: 'TopicStat',
              ofType: null
            },
            args: []
          },
          {
            name: 'title',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TopicResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'topic',
            type: {
              kind: 'OBJECT',
              name: 'Topic',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TopicStat',
        fields: [
          {
            name: 'authors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'followers',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'shouts',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'views',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'User',
        fields: [
          {
            name: 'bio',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'communities',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'email',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'emailConfirmed',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'links',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'muted',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'name',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'notifications',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'oauth',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'oid',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'password',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'ratings',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Rating',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'slug',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'updatedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'username',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'userpic',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'wasOnlineAt',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'UserNotification',
        fields: [
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'kind',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'user',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'values',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'UserResult',
        fields: [
          {
            name: 'error',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'info',
            type: {
              kind: 'OBJECT',
              name: 'CurrentUserInfo',
              ofType: null
            },
            args: []
          },
          {
            name: 'user',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'SCALAR',
        name: 'Any'
      }
    ],
    directives: []
  }
} as unknown as IntrospectionQuery
