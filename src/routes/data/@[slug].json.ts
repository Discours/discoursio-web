import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_AUTHOR } from '../../graphql/queries'

const api = getStore(graphql)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
  await api
  return await api.request(GET_AUTHOR, { ...params })
}
