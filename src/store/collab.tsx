
import { createContext, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Client, OperationResult } from 'solid-urql'
import { useStore } from './index'
import proposalCreateQuery from '../graphql/q/proposal-create'
import proposalUpdateQuery from '../graphql/q/proposal-update'
import proposalDestroyQuery from '../graphql/q/proposal-destroy'
import { usePromiseQuery } from '../utils/promiseQuery'
import { Proposal } from '../graphql/types.gen'

interface CollabStore {

}

const CollabContext = createContext()
const CollabProvider = CollabContext.Provider

export default (props: { client: Client, children: any }) => {
    const [ promiseQuery, promiseMutation ] = usePromiseQuery(props.client)
    const [ commonStore, commonActions ] = useStore()
    const [ loading, setLoading ] = createSignal(false)
    const collabStore = createStore<CollabStore>({

    })
    const collabActions = {

        inviteAuthor: (author: string, draft: string) => { }, // TODO: invite co-author
        removeAuthor: (author: string, draft: string) => { }, // TODO: remove co-author

        addProposal: (slug: string, proposal: Proposal) => {
            setLoading(true)
            promiseMutation(proposalCreateQuery, { slug, proposal })
                .then((proposalCreateResult: OperationResult) => {
                    const { data, error } = proposalCreateResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
                        // TODO: update recent proposals dataset here
                    }
                    setLoading(false)
                })
        },
        updateProposal: (slug: string, proposal: Proposal) => {
            setLoading(true)
            promiseMutation(proposalUpdateQuery, { slug, proposal })
                .then((proposalUpdateResult: OperationResult) => {
                    const { data, error } = proposalUpdateResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
                        // TODO: update recent proposals dataset here
                    }
                    setLoading(false)
                })
        },
        deleteProposal: (slug: string, proposalId: string) => {
            setLoading(true)
            promiseMutation(proposalDestroyQuery, { slug, proposalId })
                .then((proposalDestroyResult: OperationResult) => {
                    const { data, error } = proposalDestroyResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
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


