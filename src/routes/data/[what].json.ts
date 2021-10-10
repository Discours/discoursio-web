/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_SHOUT } from '../../graphql/queries'
import { topics, shouts } from '../../stores/zine'

const api = getStore(graphql)
const ttt = getStore(topics)
const sss = getStore(shouts)

export async function get({ params, locals }) {
  console.debug(locals)
  const { what } = params
  if (what in ttt) return ttt[what]
  // TODO: return await api.request(GET_SHOUT, { variables: { slug: what } })
  return sss[what]
}

export async function put(request) {
  console.log('put', request)
  // TODO: post the shout on discours
}
