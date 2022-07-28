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
  createCommunity: Result
  createReaction: Result
  createShout: Result
  createTopic: Result
  deleteCommunity: Result
  deleteReaction: Result
  deleteShout: Result
  destroyTopic: Result
  follow: Result
  inviteAuthor: Result
  rateReaction: Result
  rateUser: Result
  registerUser: AuthResult
  removeAuthor: Result
  requestPasswordUpdate: Result
  unfollow: Result
  updateCommunity: Result
  updatePassword: Result
  updateProfile: Result
  updateReaction: Result
  updateShout: Result
  updateTopic: Result
  viewReaction: Result
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

export type MutationDestroyTopicArgs = {
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

export type MutationViewReactionArgs = {
  reaction_id: Scalars['Int']
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
  authorsAll: Array<Maybe<User>>
  forget: AuthResult
  getCommunities: Array<Maybe<Community>>
  getCommunity: Community
  getCurrentUser: AuthResult
  getShoutBySlug: Shout
  getUserRoles: Array<Maybe<Role>>
  getUsersBySlugs: Array<Maybe<User>>
  inviteAuthor: Result
  isEmailUsed: Scalars['Boolean']
  myCandidates: Array<Maybe<Shout>>
  reactionsAll: Array<Maybe<Reaction>>
  reactionsByAuthor: Array<Maybe<Reaction>>
  reactionsByShout: Array<Maybe<Reaction>>
  recentAll: Array<Maybe<Shout>>
  recentPublished: Array<Maybe<Shout>>
  recentReacted: Array<Maybe<Shout>>
  removeAuthor?: Maybe<Result>
  requestPasswordReset: AuthResult
  shoutsByAuthors: Array<Maybe<Shout>>
  shoutsByCommunities: Array<Maybe<Shout>>
  shoutsByTopics: Array<Maybe<Shout>>
  shoutsForFeed: Array<Maybe<Shout>>
  signIn: AuthResult
  signOut: AuthResult
  topMonth: Array<Maybe<Shout>>
  topOverall: Array<Maybe<Shout>>
  topViewed: Array<Maybe<Shout>>
  topicsAll: Array<Maybe<Topic>>
  topicsByAuthor: Array<Maybe<Topic>>
  topicsByCommunity: Array<Maybe<Topic>>
  updatePassword: AuthResult
  userFollowedAuthors: Array<Maybe<User>>
  userFollowedCommunities: Array<Maybe<Community>>
  userFollowedTopics: Array<Maybe<Topic>>
  userFollowers: Array<Maybe<User>>
  userReactedShouts: Array<Maybe<Shout>>
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

export type QueryMyCandidatesArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryReactionsAllArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryReactionsByAuthorArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slug: Scalars['String']
}

export type QueryReactionsByShoutArgs = {
  slug: Scalars['String']
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

export type QueryUserReactedShoutsArgs = {
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
  stat?: Maybe<Stat>
  updatedAt?: Maybe<Scalars['DateTime']>
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
  Ask = 'ASK',
  Comment = 'COMMENT',
  Disagree = 'DISAGREE',
  Dislike = 'DISLIKE',
  Disproof = 'DISPROOF',
  Like = 'LIKE',
  Proof = 'PROOF',
  Propose = 'PROPOSE',
  Quote = 'QUOTE',
  Reject = 'REJECT'
}

export enum ReactionStatus {
  Changed = 'CHANGED',
  Deleted = 'DELETED',
  Explained = 'EXPLAINED',
  New = 'NEW',
  Updated = 'UPDATED'
}

export type ReactionUpdating = {
  __typename?: 'ReactionUpdating'
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
  author?: Maybe<User>
  authors?: Maybe<Array<Maybe<User>>>
  communities?: Maybe<Array<Maybe<Community>>>
  community?: Maybe<Community>
  error?: Maybe<Scalars['String']>
  reaction?: Maybe<Reaction>
  reactions?: Maybe<Array<Maybe<Reaction>>>
  shout?: Maybe<Shout>
  shouts?: Maybe<Array<Maybe<Shout>>>
  topic?: Maybe<Topic>
  topics?: Maybe<Array<Maybe<Topic>>>
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
  stat?: Maybe<Stat>
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

export type Stat = {
  __typename?: 'Stat'
  reacted: Scalars['Int']
  viewed: Scalars['Int']
}

export type Subscription = {
  __typename?: 'Subscription'
  onlineUpdated: Array<User>
  reactionUpdated: ReactionUpdating
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

export type TopicStat = {
  __typename?: 'TopicStat'
  authors: Scalars['Int']
  followers: Scalars['Int']
  shouts: Scalars['Int']
  viewed: Scalars['Int']
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
                name: 'Result',
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
                name: 'Result',
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
                name: 'Result',
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
                name: 'Result',
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
            name: 'destroyTopic',
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
                name: 'Result',
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
                name: 'Result',
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
                name: 'Result',
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
                name: 'Result',
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
            name: 'viewReaction',
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
                name: 'reaction_id',
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
            name: 'authorsAll',
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
            args: []
          },
          {
            name: 'forget',
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
                name: 'AuthResult',
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
            name: 'myCandidates',
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
            name: 'reactionsByAuthor',
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
          },
          {
            name: 'reactionsByShout',
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
              kind: 'OBJECT',
              name: 'Result',
              ofType: null
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
                name: 'AuthResult',
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
                name: 'AuthResult',
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
            name: 'userReactedShouts',
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
            name: 'stat',
            type: {
              kind: 'OBJECT',
              name: 'Stat',
              ofType: null
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
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ReactionUpdating',
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
            name: 'author',
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            },
            args: []
          },
          {
            name: 'authors',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'communities',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Community',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'community',
            type: {
              kind: 'OBJECT',
              name: 'Community',
              ofType: null
            },
            args: []
          },
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
            name: 'reactions',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'Reaction',
                ofType: null
              }
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
          },
          {
            name: 'topic',
            type: {
              kind: 'OBJECT',
              name: 'Topic',
              ofType: null
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
              name: 'Stat',
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
        name: 'Stat',
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
            name: 'viewed',
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
                name: 'ReactionUpdating',
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
            name: 'viewed',
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
        kind: 'SCALAR',
        name: 'Any'
      }
    ],
    directives: []
  }
} as unknown as IntrospectionQuery
