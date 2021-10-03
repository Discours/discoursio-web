/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_SHOUTS, GET_SHOUTS_BY_RATING } from '../graphql/queries'

const api = getStore(graphql)

// FIXME: limit is always 100

export async function get({ params, locals }) {
  console.debug(locals)
  const { community, topic, author, byRating } = params
  if (byRating) {
    return await api.request(GET_SHOUTS_BY_RATING, {
      variables: { community, topic, author },
    })
  } else {
    return await api.request(GET_SHOUTS, {
      variables: { community, topic, author },
    })
  }
}
