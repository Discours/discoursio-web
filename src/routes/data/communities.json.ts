/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_COMMUNITIES } from '../../graphql/queries'

const api = getStore(graphql)

export async function get({ locals }) {
  console.debug(locals)
  return await api.request(GET_COMMUNITIES, {})
}
