import type { Shout } from './codegen'

// UI/UX semantic needs

export const editorAccept = (shoutId: number): boolean => {
  console.log(
    'gql: editor`s acception of the all proposals for shout ' +
      shoutId.toString()
  )
  
  return true
}
