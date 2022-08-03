import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Client, useClient } from 'solid-urql'
import { Reaction } from '../graphql/types.gen'
import { RouteDataFuncArgs } from 'solid-app-router'
// import { useAuth } from './auth'
import { usePromiseQuery } from '../utils/promiseQuery'
import reactionCreateQuery from '../graphql/q/reaction-create'
import reactionUpdateQuery from '../graphql/q/reaction-update'
import reactionDestroyQuery from '../graphql/q/reaction-destroy'
import inviteAuthorQuery from '../graphql/q/collab-invite'
import removeAuthorQuery from '../graphql/q/collab-remove'
import { handleUpdate, loading } from './_api'

export interface CollabState {
  readonly loading: boolean
}

// RouteDataFunc
export const CollabStateHandler = (props: RouteDataFuncArgs | any): any => {
  console.debug(props)
  // const [{ info }, {}] = useAuth()
  const [collabState, _setCollabState] = createStore({
    get loading() {
      return loading()
    }
  })
  return collabState as CollabState
}

const CollabContext = createContext()
const CollabProvider = CollabContext.Provider

export const CollabStateProvider = (props: any): any => {
  const client: Client = !!props.client ? props.client : useClient()
  const [, promiseMutation] = usePromiseQuery(client)
  const collabState = CollabStateHandler(props)
  const collabActions = {
    inviteAuthor: (author: string, shout: string) => promiseMutation(inviteAuthorQuery, { shout, author }).then(handleUpdate),
    removeAuthor: (author: string, shout: string) => promiseMutation(removeAuthorQuery, { shout, author }).then(handleUpdate),
    addProposal: (proposal: Reaction) => promiseMutation(reactionCreateQuery, { ...proposal }).then(handleUpdate),
    updateProposal: (proposal: Partial<Reaction>) => promiseMutation(reactionUpdateQuery, { ...proposal }).then(handleUpdate),
    deleteProposal: (reaction_id: number) => promiseMutation(reactionDestroyQuery, { reaction_id }).then(handleUpdate),
  }

  return <CollabProvider value={[collabState, collabActions as any]} children={props.children} />
}

export function useCollab() {
  return useContext(CollabContext)
}
