import { batch, createEffect, createResource, createSignal } from 'solid-js'

export default function createAuth(agent, actions, state, setState) {
  const [loggedIn, setLoggedIn] = createSignal(false)
  const [currentUser, { mutate }] = createResource(loggedIn, agent.Auth.current)

  Object.assign(actions, {
    pullUser: () => setLoggedIn(true),

    async login(email, password) {
      const { user, errors } = await agent.Auth.login(email, password)

      if (errors) throw errors

      actions.setToken(user.token)
      setLoggedIn(true)
    },

    async getSession(token) {
      actions.setToken(token)
      const { user, errors } = await agent.Auth.getSession(token)

      if (errors) throw errors

      actions.setToken(user.token)
      actions.setSession(user)
      setLoggedIn(true)
    },

    async checkEmail(email) {
      const { errors } = await agent.Auth.checkEmail(email)

      if (errors) throw errors
    },

    async register(username, email, password) {
      const { user, errors } = await agent.Auth.register(username, email, password)

      if (errors) throw errors

      actions.setToken(user.token)
      actions.setSession(user)
      setLoggedIn(true)
    },

    logout() {
      batch(() => {
        setState({ token: undefined, session: undefined })
        mutate(undefined)
      })
    },

    async updateUser(newUser) {
      const { user, errors } = await agent.Auth.save(newUser)

      if (errors) throw errors

      mutate(user)
    }
  })
  createEffect(() => {
    const r = state.token ? localStorage.setItem('token', state.token) : localStorage.removeItem('token')

    return r
  })
  actions.setToken = (token) => setState({ token })
  actions.setSession = (session) => setState({ session })

  return currentUser
}
