/* eslint-disable dot-notation */
/* eslint-disable padding-line-between-statements */
import { createQuery, useClient } from 'solid-urql'
import checkEmail from './graphql/q/sign-check'
import login from './graphql/q/sign-in'
import logout from './graphql/q/sign-out'
import register from './graphql/q/sign-up'
import profileUpdate from './graphql/q/my-profile-update'
import getSession from './graphql/q/my-session'
import topicsAll from './graphql/q/topics-all'
import articleCreate from './graphql/q/article-create'
import articleBySlug from './graphql/q/article-by-slug'
import articleUpdate from './graphql/q/article-update'
import articleDestroy from './graphql/q/article-destroy'
import topRecent from './graphql/q/top-recent'
import topOverall from './graphql/q/top-overall'
import topMonth from './graphql/q/top-month'
import topViewed from './graphql/q/top-viewed'
import myCandidates from './graphql/q/my-candidates'
import mySubscribed from './graphql/q/my-subscribed'
import myReviewed from './graphql/q/my-reviewed'
import myCommented from './graphql/q/my-commented'
import authorArticles from './graphql/q/author-articles'
import topicArticles from './graphql/q/topic-articles'
import commentCreate from './graphql/q/comment-create'
import commentDestroy from './graphql/q/comment-destroy'
import articleComments from './graphql/q/article-comments'
import authorRoles from './graphql/q/author-roles'
import authorBySlug from './graphql/q/author-by-slug'

export default function createAgent(store) {
  const [state, actions] = store
  const client = useClient()
  const api = async (q, params = null) => {
    let headers = {}
    if (params || state.token) headers['Content-Type'] = 'application/json'
    if (state.token) headers['Auth'] = state.token // TODO: test
    client.fetchOptions = { headers }
    let query = q.default
    if (params) {
      query = {
        query: q.default,
        variables: params
      }
    }
    return await client.query(query)
  }

  const Auth = {
    login: (email, password) => api(login, { email, password }),
    logout: () => api(logout),
    checkEmail: (email) => api(checkEmail, { email }),
    register: (username, email, password) => api(register, { username, email, password }),
    getSession: (token) => api(getSession, { token }),
    update: (data) => api(profileUpdate, { ...data }) // TODO: debug me
  }

  const Topic = {
    getAll: () => api(topicsAll)
  }

  const Article = {
    // crud
    create: (a) => api(articleCreate, { ...a }),
    read: (slug) => api(articleBySlug, { slug }),
    update: (a) => api(articleUpdate, { ...a }), // TODO: backend article edit api
    destroy: (slug) => api(articleDestroy, { slug }),
    // TODO
    // like: (slug) => api('article-like', { slug }),
    // unlike: (slug) => api('article-unlike', { slug }),
    // mainpage
    topRecent: (page = 1, size = 10) => api(topRecent, { page, size }),
    topOverall: (page = 1, size = 10) => api(topOverall, { page, size }),
    topMonth: (page = 1, size = 10) => api(topMonth, { page, size }),
    topViewed: (page = 1, size = 10) => api(topViewed, { page, size }),
    // feeds
    candidates: (page = 1, size = 10) => api(myCandidates, { page, size }),
    subscribed: (page = 1, size = 10) => api(mySubscribed, { page, size }),
    reviewed: (page = 1, size = 10) => api(myReviewed, { page, size }),
    commented: (page = 1, size = 10) => api(myCommented, { page, size }),
    byAuthor: (slug, page = 1, size = 10) => api(authorArticles, { slug, page, size }),
    byTopic: (slug, page = 1, size = 10) => api(topicArticles, { slug, page, size })
  }

  const Comment = {
    create: (comment) => api(commentCreate, { ...comment }),
    delete: (comment) => api(commentDestroy, { comment }),
    forArticle: (slug) => api(articleComments, { slug })
  }

  const Author = {
    roles: (slug) => api(authorRoles, { slug }), // NOTE: all the roles are public
    get: (slug) => api(authorBySlug, { slug }),
    // TODO:  follow: (slug) => api(authorFollow, { slug }),
    // unfollow: (slug) => api('author-unfollow', { slug })
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
