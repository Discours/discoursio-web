/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { SHOUTS_BY_TIME, SHOUTS_BY_TOPIC, SHOUTS_BY_AUTHOR, SHOUTS_BY_COMMUNITY, SHOUTS_BY_RATING } from '../../graphql/queries'

const api = getStore(graphql)

// FIXME: limit is always 100

export async function get({ params }) {
  await api
  const { community, topic, author, top } = params
  if (topic) {
    return await api.request(SHOUTS_BY_TOPIC, { topic })
  } else if (author) {
    return await api.request(SHOUTS_BY_AUTHOR, { author })
  } else if (community) {
    return await api.request(SHOUTS_BY_COMMUNITY, { community })
  } else if (top) {
    return await api.request(SHOUTS_BY_RATING, { limit: 100 })
  } else {
    return await api.request(SHOUTS_BY_TIME, { limit: 100 })
  }
}
