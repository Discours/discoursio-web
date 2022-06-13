// import gql from 'graphql-tag'
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
  createdBy: Scalars['String']
  id: Scalars['Int']
  value: Scalars['Int']
}

export type CommentResult = {
  __typename?: 'CommentResult'
  comment?: Maybe<Comment>
  error?: Maybe<Scalars['String']>
}

export enum CommentStatus {
  Deleted = 'DELETED',
  New = 'NEW',
  Updated = 'UPDATED',
  UpdatedRating = 'UPDATED_RATING'
}

export type CommentUpdatedResult = {
  __typename?: 'CommentUpdatedResult'
  comment?: Maybe<Comment>
  error?: Maybe<Scalars['String']>
  status?: Maybe<CommentStatus>
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

export type CurrentUserInfo = {
  __typename?: 'CurrentUserInfo'
  totalUnreadMessages?: Maybe<Scalars['Int']>
  userSubscribedAuthors: Array<Maybe<User>>
  userSubscribedTopics: Array<Maybe<Scalars['String']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  authorSubscribe: Result
  authorUnsubscribe: Result
  confirmEmail: AuthResult
  createComment: CommentResult
  createCommunity: Community
  createShout: ShoutResult
  createTopic: TopicResult
  deleteComment: Result
  deleteCommunity: Result
  deleteShout: Result
  rateComment: Result
  rateShout: Result
  rateUser: Result
  registerUser: AuthResult
  requestPasswordUpdate: Result
  topicSubscribe: Result
  topicUnsubscribe: Result
  updateComment: CommentResult
  updateCommunity: Community
  updatePassword: Result
  updateProfile: Result
  updateShout: ShoutResult
  updateTopic: TopicResult
  viewShout: Result
}

export type MutationAuthorSubscribeArgs = {
  slug: Scalars['String']
}

export type MutationAuthorUnsubscribeArgs = {
  slug: Scalars['String']
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

export type MutationDeleteShoutArgs = {
  slug: Scalars['String']
}

export type MutationRateCommentArgs = {
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
  getShoutBySlug: Shout
  getShoutComments: Array<Maybe<Comment>>
  getUserRoles: Array<Maybe<Role>>
  getUsersBySlugs: Array<Maybe<User>>
  isEmailFree: Scalars['Boolean']
  recentCommented: Array<Maybe<Shout>>
  recentPublished: Array<Maybe<Shout>>
  recentAll: Array<Maybe<Shout>>
  shoutsByAuthors: Array<Maybe<Shout>>
  shoutsByCommunities: Array<Maybe<Shout>>
  shoutsByTopics: Array<Maybe<Shout>>
  shoutsBySlugs: Array<Maybe<Shout>>
  shoutsCandidates: Array<Maybe<Shout>>
  shoutsCommentedByUser: Array<Maybe<Shout>>
  shoutsRatedByUser: ShoutsResult
  shoutsReviewed: Array<Maybe<Shout>>
  shoutsSubscribed: Array<Maybe<Shout>>
  signIn: AuthResult
  signOut: Result
  topMonth: Array<Maybe<Shout>>
  topOverall: Array<Maybe<Shout>>
  topViewed: Array<Maybe<Shout>>
  topicsByAuthor: Array<Maybe<Topic>>
  topicsByCommunity: Array<Maybe<Topic>>
  topicsBySlugs: Array<Maybe<Topic>>
  userComments: Array<Maybe<Comment>>
  userSubscribedTopics: Array<Maybe<Scalars['String']>>
  userSubscribers: Array<Maybe<User>>
  userSubscriptions: Array<Maybe<User>>
  userUnpublishedShouts: ShoutsResult
}

export type QueryGetCommunityArgs = {
  slug?: InputMaybe<Scalars['String']>
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

export type QueryRecentCommentedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
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

export type QueryShoutsCandidatesArgs = {
  size?: InputMaybe<Scalars['Int']>
}

export type QueryShoutsCommentedByUserArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slug: Scalars['String']
}

export type QueryShoutsRatedByUserArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsReviewedArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type QueryShoutsSubscribedArgs = {
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

export type QueryTopicsByAuthorArgs = {
  author: Scalars['String']
}

export type QueryTopicsByCommunityArgs = {
  community: Scalars['String']
}

export type QueryTopicsBySlugsArgs = {
  slugs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type QueryUserCommentsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
  slug: Scalars['String']
}

export type QueryUserSubscribedTopicsArgs = {
  slug: Scalars['String']
}

export type QueryUserSubscribersArgs = {
  slug: Scalars['String']
}

export type QueryUserSubscriptionsArgs = {
  slug: Scalars['String']
}

export type QueryUserUnpublishedShoutsArgs = {
  page: Scalars['Int']
  size: Scalars['Int']
}

export type Rating = {
  __typename?: 'Rating'
  rater: Scalars['String']
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
  ratings?: Maybe<Array<Maybe<Rating>>>
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

export type ShoutsResult = {
  __typename?: 'ShoutsResult'
  error?: Maybe<Scalars['String']>
  shouts?: Maybe<Array<Maybe<Shout>>>
}

export type Subscription = {
  __typename?: 'Subscription'
  commentUpdated: CommentUpdatedResult
  onlineUpdated: Array<User>
  shoutUpdated: Shout
  topicUpdated: Shout
  userUpdated: User
}

export type SubscriptionCommentUpdatedArgs = {
  shout: Scalars['String']
}

export type SubscriptionTopicUpdatedArgs = {
  user_slug: Scalars['String']
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
        name: 'Comment',
        fields: [
          {
            name: 'author',
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
            name: 'ratings',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'OBJECT',
                name: 'CommentRating',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'replyTo',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'shout',
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
            name: 'updatedBy',
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
        name: 'CommentRating',
        fields: [
          {
            name: 'comment_id',
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
                kind: 'SCALAR',
                name: 'Any'
              }
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
        name: 'CommentResult',
        fields: [
          {
            name: 'comment',
            type: {
              kind: 'OBJECT',
              name: 'Comment',
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
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CommentUpdatedResult',
        fields: [
          {
            name: 'comment',
            type: {
              kind: 'OBJECT',
              name: 'Comment',
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
        name: 'Community',
        fields: [
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
            name: 'totalUnreadMessages',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'userSubscribedAuthors',
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
            name: 'userSubscribedTopics',
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
            name: 'authorSubscribe',
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
            name: 'authorUnsubscribe',
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
            name: 'createComment',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CommentResult',
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
                name: 'replyTo',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
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
                name: 'desc',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'title',
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
            name: 'deleteComment',
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
            name: 'rateComment',
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
            name: 'topicSubscribe',
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
            name: 'topicUnsubscribe',
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
            name: 'updateComment',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CommentResult',
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
        name: 'Proposal',
        fields: [
          {
            name: 'author',
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
            name: 'range',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'shout',
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
            name: 'getShoutComments',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Comment',
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
            name: 'isEmailFree',
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
            name: 'recentCommented',
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
            name: 'recents',
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
            name: 'shoutsByAuthor',
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
            name: 'shoutsByCommunity',
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
                name: 'community',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
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
            name: 'shoutsByTopic',
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
                name: 'topic',
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
            name: 'shoutsCandidates',
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
                name: 'size',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'shoutsCommentedByUser',
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
            name: 'shoutsSubscribed',
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
            name: 'topicsBySlugs',
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
                name: 'slugs',
                type: {
                  kind: 'LIST',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'userComments',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Comment',
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
            name: 'userSubscribedTopics',
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
            name: 'userSubscribers',
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
            name: 'userSubscriptions',
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
            name: 'userUnpublishedShouts',
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
              kind: 'SCALAR',
              name: 'Any'
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
            name: 'tags',
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
              kind: 'SCALAR',
              name: 'Any'
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
            name: 'comments',
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
            name: 'ratings',
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
            name: 'commentUpdated',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CommentUpdatedResult',
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
            name: 'topicUpdated',
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
                name: 'user_slug',
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
                kind: 'SCALAR',
                name: 'Any'
              }
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
            name: 'title',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'topicStat',
            type: {
              kind: 'OBJECT',
              name: 'TopicStat',
              ofType: null
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
            name: 'subscriptions',
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
            name: 'old_id',
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
