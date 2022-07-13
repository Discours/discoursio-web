import { createContext, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Client, useClient } from 'solid-urql'
import { Proposal } from '../graphql/types.gen'
import { RouteDataFuncArgs } from 'solid-app-router'
import { useAuth } from './auth'
import { usePromiseQuery } from '../utils/promiseQuery'
import proposalCreateQuery from '../graphql/q/proposal-create'
import proposalUpdateQuery from '../graphql/q/proposal-update'
import proposalDestroyQuery from '../graphql/q/proposal-destroy'
import inviteAuthorQuery from '../graphql/q/collab-invite'
import removeAuthorQuery from '../graphql/q/collab-remove'
import { handleUpdate, loading } from './_api'

export interface CollabState {
  readonly loading: boolean
}

// RouteDataFunc
export const CollabStateHandler = (props: RouteDataFuncArgs | any): any => {
  const [{ info }, {}] = useAuth()
  const collabState = {
    get loading() {
      return loading()
    }
  }
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
    addProposal: (slug: string, proposal: Proposal) => promiseMutation(proposalCreateQuery, { slug, proposal }).then(handleUpdate),
    updateProposal: (slug: string, proposal: Proposal) => promiseMutation(proposalUpdateQuery, { slug, proposal }).then(handleUpdate),
    deleteProposal: (proposal: Proposal) => promiseMutation(proposalDestroyQuery, { proposal }).then(handleUpdate),
  }

  return <CollabProvider value={createStore([collabState as CollabState, collabActions])} children={props.children} />
}

export function useCollab() {
  return useContext(CollabContext)
}
