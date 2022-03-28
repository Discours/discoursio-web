import { createClient } from 'solid-urql'
import { clientOptions, authClient } from './graphql/client'
import articleBySlug from './graphql/q/article-by-slug'
import articleCreate from './graphql/q/article-create'
import articleDestroy from './graphql/q/article-destroy'
import articleUpdate from './graphql/q/article-update'
import authorArticles from './graphql/q/author-articles'
import authorBySlug from './graphql/q/author-by-slug'
import authorRoles from './graphql/q/author-roles'
import commentCreate from './graphql/q/comment-create'
import commentDestroy from './graphql/q/comment-destroy'
import commentUpdate from './graphql/q/comment-update'
import myCandidates from './graphql/q/my-candidates'
import myProfileUpdate from './graphql/q/my-profile-update'
import myReviewed from './graphql/q/my-reviewed'
import mySession from './graphql/q/my-session'
import mySubscribed from './graphql/q/my-subscribed'
import signCheck from './graphql/q/sign-check'
import signIn from './graphql/q/sign-in'
import signOut from './graphql/q/sign-out'
import signUp from './graphql/q/sign-up'
import topMonth from './graphql/q/top-month'
import topOverall from './graphql/q/top-overall'
import topRecent from './graphql/q/top-recent'
import topViewed from './graphql/q/top-viewed'
import topicArticles from './graphql/q/topic-articles'
import topicsAll from './graphql/q/topics-all'

const client = createClient(clientOptions)

export default function createAgent(store) {
  const [state, actions] = store

  const Auth = {
    login: (email, password) => client.query(signIn, { email, password }),
    logout: () => client.query(signOut),
    checkEmail: (email) => client.query(signCheck, { email }),
    register: (username, email, password) => client.query(signUp, { username, email, password }),
    getSession: (token) => client.query(mySession, { token }),
    update: (data) => client.query(myProfileUpdate, { ...data }) // TODO: debug me
  }

  const Topic = {
    getAll: () => client.query(topicsAll)
  }

  const Article = {
    // one
    create: (a) => client.query(articleCreate, { ...a }),
    update: (a) => client.query(articleUpdate, { ...a }), // TODO: backend article edit api
    destroy: (slug) => client.query(articleDestroy, { slug }),
    bySlug: (slug) => client.query(articleBySlug, { slug }),
    // mainpage
    recents: (page = 1, size = 10) => client.query(topRecent, { page, size }),
    topOverall: (page = 1, size = 10) => client.query(topOverall, { page, size }),
    topMonth: (page = 1, size = 10) => client.query(topMonth, { page, size }),
    topViewed: (page = 1, size = 10) => client.query(topViewed, { page, size }),
    // feeds
    candidates: (page = 1, size = 10) => client.query(myCandidates, { page, size }),
    subscribed: (page = 1, size = 10) => client.query(mySubscribed, { page, size }),
    reviewed: (page = 1, size = 10) => client.query(myReviewed, { page, size }),
    byAuthor: (slug, page = 1, size = 10) => client.query(authorArticles, { page, size }),
    byTopic: (slug, page = 1, size = 10) => client.query(topicArticles, { page, size }),
  }

  const Comment = {
    create: (comment) => client.query(commentCreate, { ...comment }),
    delete: (comment) => client.query(commentDestroy, { comment }),
    update: (comment) => client.query(commentUpdate, { ...comment })
  }

  const Author = {
    roles: (slug) => client.query(authorRoles, { slug }), // NOTE: all the roles are public
    get: (slug) => client.query(authorBySlug, { slug }),
    // follow: (slug) => client.query(authorFollow, { slug }),
    // unfollow: (slug) => client.query(authorUnfollow, { slug })
  }

  const Chat = {
    // messages: (chat) => api('chat-messages', { chat }),
    // all: () => api('chats-all'),
    // createMessage: (message) => api('message-create', { message }),
    // updateMessage: (message) => api('message-update', { message }),
    // deleteMessage: (message) => api('message-delete', { message })
  }

  return {
    Article,
    Author,
    Auth,
    Comment,
    Topic
  }
}
