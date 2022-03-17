import { client } from './graphql/client'

export default function createAgent(store) {
  const [state, actions] = store

  const api = async (qname, params = {}) => {
    const q = await import(`./graphql/q/${qname}.ts`)
    const headers = {}

    if (params) headers['Content-Type'] = 'application/json'

    // eslint-disable-next-line dot-notation
    if (state.token) headers['Auth'] = state.token // TODO: test

    client.fetchOptions = { headers }

    return await client.query(q, params) // TODO: unpack json here?
  }

  const Auth = {
    login: (email, password) => api('sign-in', { email, password }),
    logout: () => api('sign-out'),
    checkEmail: (email) => api('sign-check', { email }),
    register: (username, email, password) => api('sign-up', { username, email, password }),
    getSession: (token) => api('my-session', { token }),
    update: (data) => api('profile-update', { ...data }) // TODO: debug me
  }

  const Topic = {
    getAll: () => api('topics-all')
  }

  const Article = {
    // one
    create: (a) => api('article-create', { ...a }),
    update: (a) => api('article-update', { ...a }), // TODO: backend article edit api
    destroy: (slug) => api('article-destroy', { slug }),
    bySlug: (slug) => api('article-by-slug', { slug }),
    // like
    like: (slug) => api('article-like', { slug }),
    unlike: (slug) => api('article-unlike', { slug }),
    // mainpage
    recents: (page = 1, size = 10) => api('top-recent', { page, size }),
    topOverall: (page = 1, size = 10) => api('top-overall', { page, size }),
    topMonth: (page = 1, size = 10) => api('top-month', { page, size }),
    topViewed: (page = 1, size = 10) => api('top-viewed', { page, size }),
    // feeds
    candidates: (page = 1, size = 10) => api('my-candidates', { page, size }),
    subscribed: (page = 1, size = 10) => api('my-subscribed', { page, size }),
    reviewed: (page = 1, size = 10) => api('my-reviewed', { page, size }),
    byAuthor: (slug, page = 1, size = 10) => api('author-articles', { slug, page, size }),
    byTopic: (slug, page = 1, size = 10) => api('topic-articles', { slug, page, size })
  }

  const Comment = {
    create: (comment) => api('comment-new', { ...comment }),
    delete: (comment) => api('comment-destroy', { comment }),
    forArticle: (slug) => api('article-comments', { slug })
  }

  const Author = {
    roles: (slug) => api('author-roles', { slug }), // NOTE: all the roles are public
    get: (slug) => api('author-by-slug', { slug }),
    follow: (slug) => api('author-follow', { slug }),
    unfollow: (slug) => api('author-unfollow', { slug })
  }

  const Chat = {
    messages: (chat) => api('chat-messages', { chat }),
    all: () => api('chats-all'),
    createMessage: (message) => api('message-create', { message }),
    updateMessage: (message) => api('message-update', { message }),
    deleteMessage: (message) => api('message-delete', { message })
  }

  return {
    Article,
    Author,
    Auth,
    Comment,
    Topic
  }
}
