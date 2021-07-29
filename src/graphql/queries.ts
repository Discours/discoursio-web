import type { Proposal } from './codegen'
import { get } from 'svelte/store'
import { proposals } from '../stores/editor'

// UI/UX semantic needs

export const editorAccept = (shoutId: number): boolean => {
  console.log(
    'gql: editor`s acception of the all proposals for shout ' +
      shoutId.toString()
  )
  const accepted: Proposal[] = get(proposals).filter(
    (p: Proposal) => p.shout === shoutId
  )
  console.debug(accepted)
  // TODO: implement a mutation with all the accepted proposals updating the shout
  // linked proposals in collaborative editor
  return true
}
