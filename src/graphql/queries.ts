import type { Shout } from './codegen'

interface Filters {
  category?: string // optional tag to filter
  project?: string
  author?: string // optional username filter
  org?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getShoutsFiltered = (filters: Filters): Array<Shout> => {
  console.log('gql: get shouts filtered by ')
  console.debug(filters)
  // TODO: filtered query logix
  return []
}
