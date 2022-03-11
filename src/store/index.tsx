import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import createAgent from './api'
import createArticles from './articles'
import createAuth from './auth'
import createTopics from './topics'
import createComments from './comments'
import createAuthor from './author'
import { isServer } from 'solid-js/web'

export const StoreContext = createContext()
export const useStore = () => useContext(StoreContext)
export const Provider = (props) => {
  let articles
  let comments
  let topics
  let author
  let currentUser
  const notifications = []
  const errors = []

  const [state, setState] = createStore({
    get articles() {
      return articles()
    },
    get comments() {
      return comments()
    },
    get topics() {
      return topics()
    },
    get author() {
      return author()
    },
    get currentUser() {
      return currentUser()
    },
    page: 0,
    totalPagesCount: 0,
    token: !isServer && localStorage.getItem('token'),
    appName: 'discours',
    notifications,
    errors
  })
  const actions = {
    notify: (text) => notifications.push(text),
    warn: (text) => errors.push(text)
  }
  const store = [state, actions]
  const agent = createAgent(store)

  articles = createArticles(agent, actions, state, setState)
  comments = createComments(agent, actions, state, setState)
  topics = createTopics(agent)
  author = createAuthor(agent, actions, state, setState)
  currentUser = createAuth(agent, actions, state, setState)

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}
