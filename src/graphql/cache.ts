import { cacheExchange, CacheExchangeOpts } from '@urql/exchange-graphcache'
// import authorsForArticles from './q/articles-for-authors'

// TODO: implement smart caching logix

export const cache = cacheExchange({
  resolvers: {},
  // shouldResolveFields: false,
  updates: {
    Mutation: {
      /*
       createArticle: (_result, _args, c) => {
        c.updateQuery({ query: authorsForArticles, variables: { slugs, page, size } }, (data) => {
          data.getUserNotes.unshift(_result.createNote)

          return data
        })
      },
      updateNote: (_result, _args, c) => {
        c.updateQuery({ query: authorsForArticles, variables: { slugs, page, size  } }, (data) => {
          const index = data.getUserNotes.findIndex(
            (note: Shout) => note.slug === (_result.updateNote as Shout)?.slug
          )

          if (index) data.getUserNotes[index] = _result.updateNote

          return data
        })
      },
      deleteNote: (_result, _args, c) => {
        c.updateQuery({ query: authorsForArticles, variables: { slugs, page, size } }, (data) => {
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
        c.updateQuery({ query: authorsForArticles }, (data) => {
          data.getUserNotes = []

          return data
        })
      }
      */
    }
  }
} as Partial<CacheExchangeOpts>)
