/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_SHOUT } from '../../graphql/queries'

const api = getStore(graphql)

export async function get({ params }) {
  if (api) {
    return await api.request(GET_SHOUT, { variables: params })
  } else return {}
}

export async function put(request) {
  console.log('put', request)
  // TODO: post the shout on discours
}
