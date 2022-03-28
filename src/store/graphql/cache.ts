import { cacheExchange } from '@urql/exchange-graphcache'
import AUTHOR_ARTICLES from './q/author-articles'
import MY_PROFILE from './q/my-session'
import type { Shout } from './types.gen'

export const cache = cacheExchange({
  updates: {
    Mutation: {
      createNote: (_result, args, c) => {
        c.updateQuery({ query: AUTHOR_ARTICLES }, (data) => {
          data.getUserNotes.unshift(_result.createNote)

          return data
        })
      },
      updateNote: (_result, args, c) => {
        c.updateQuery({ query: AUTHOR_ARTICLES }, (data) => {
          const index = data.getUserNotes.findIndex(
            (note: Shout) => note.slug === (_result.updateNote as Shout)?.slug
          )

          if (index) data.getUserNotes[index] = _result.updateNote

          return data
        })
      },
      deleteNote: (_result, args, c) => {
        c.updateQuery({ query: AUTHOR_ARTICLES }, (data) => {
          data.getUserNotes = data.getUserNotes.filter((note: Shout) => note.slug !== _result.deleteNote)

          return data
        })
      },
      login: (_result, args, c) => {
        c.updateQuery({ query: MY_PROFILE }, (data) => {
          if (!data) {
            return {
              whoami: _result.login
            }
          }

          return data
        })
      },
      logout: (_result, args, c) => {
        c.updateQuery({ query: AUTHOR_ARTICLES }, (data) => {
          data.getUserNotes = []

          return data
        })
      }
    }
  }
})
