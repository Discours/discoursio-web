/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_AUTHOR } from '../../graphql/queries'
import { communities } from '../../stores/zine'

const api = getStore(graphql)
const coms = getStore(communities)

export async function get({ params, locals }) {
  console.debug(locals)
  const { who } = params
  if (who in coms) return coms[who]
  else return await api.request(GET_AUTHOR, { variables: { slug: who } })
}
