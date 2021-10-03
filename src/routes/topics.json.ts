/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_TOPICS } from '../graphql/queries'

const api = getStore(graphql)

export async function get({ params, locals }) {
  console.debug(locals)
  const { community } = params
  return await api.request(GET_TOPICS, { variables: { community } })
}
