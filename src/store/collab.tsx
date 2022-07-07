
import { createContext, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Client, OperationResult } from 'solid-urql'
import { useStore } from './index'
import proposalCreateQuery from '../graphql/q/proposal-create'
import proposalUpdateQuery from '../graphql/q/proposal-update'
import proposalDestroyQuery from '../graphql/q/proposal-destroy'
import inviteAuthorQuery from '../graphql/q/collab-invite'
import removeAuthorQuery from '../graphql/q/collab-remove'
import { usePromiseQuery } from '../utils/promiseQuery'
import { Proposal } from '../graphql/types.gen'

interface CollabStore {
  readonly loading: boolean
}

const CollabContext = createContext()
const CollabProvider = CollabContext.Provider

export default (props: { client: Client, children: any }) => {
  const [ , promiseMutation ] = usePromiseQuery(props.client)
  const [ , actions ] = useStore()
  const [ loading, setLoading ] = createSignal(false)
  const collabStore = createStore<CollabStore>({
    get loading() {
      return loading()
    },

  })
  const collabActions = {

    // invite co-author
    inviteAuthor: (author: string, shout: string) => {
      promiseMutation(inviteAuthorQuery, { shout, author })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.debug(value)

            // TODO: implement invite success
          }
          setLoading(false)
        })
    },

    // remove co-author
    removeAuthor: (author: string, shout: string) => {
      promiseMutation(removeAuthorQuery, { shout, author })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: implement remove success
          }
          setLoading(false)
        })
    },

    addProposal: (slug: string, proposal: Proposal) => {
      setLoading(true)
      promiseMutation(proposalCreateQuery, { slug, proposal })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent proposals dataset here
          }
          setLoading(false)
        })
    },
    updateProposal: (slug: string, proposal: Proposal) => {
      setLoading(true)
      promiseMutation(proposalUpdateQuery, { slug, proposal })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent proposals dataset here
          }
          setLoading(false)
        })
    },
    deleteProposal: (slug: string, proposalId: string) => {
      setLoading(true)
      promiseMutation(proposalDestroyQuery, { slug, proposalId })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent proposals dataset here
          }
          setLoading(false)
        })
    },
  }

  return <CollabProvider value={[collabStore as unknown as CollabStore, collabActions]} children={props.children} />
}

export function useCollab() {
  return useContext(CollabContext)
}
