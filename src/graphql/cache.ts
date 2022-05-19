import { cacheExchange } from '@urql/exchange-graphcache'
import authorArticles from './q/articles-for-author'
import userSession from './q/auth-session'
import type { Shout } from './types.gen'

// FIXME: this is dummy code

export const cache = cacheExchange({
  updates: {
    Mutation: {
      createNote: (_result, _args, c) => {
        c.updateQuery({ query: authorArticles }, (data) => {
          data.getUserNotes.unshift(_result.createNote)

          return data
        })
      },
      updateNote: (_result, _args, c) => {
        c.updateQuery({ query: authorArticles }, (data) => {
          const index = data.getUserNotes.findIndex(
            (note: Shout) => note.slug === (_result.updateNote as Shout)?.slug
          )

          if (index) data.getUserNotes[index] = _result.updateNote

          return data
        })
      },
      deleteNote: (_result, _args, c) => {
        c.updateQuery({ query: authorArticles }, (data) => {
          data.getUserNotes = data.getUserNotes.filter((note: Shout) => note.slug !== _result.deleteNote)

          return data
        })
      },
      login: (_result, _args, c) => {
        c.updateQuery({ query: userSession }, (data) => {
          if (!data) {
            return {
              whoami: _result.login
            }
          }

          return data
        })
      },
      logout: (_result, _args, c) => {
        c.updateQuery({ query: authorArticles }, (data) => {
          data.getUserNotes = []

          return data
        })
      }
    }
  }
})
