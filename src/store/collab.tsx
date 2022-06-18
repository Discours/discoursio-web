
import { createContext, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Client, OperationResult } from 'solid-urql'
import { useStore } from './index'
import suggestionCreateQuery from '../graphql/q/suggestion-create'
import suggestionUpdateQuery from '../graphql/q/suggestion-update'
import suggestionDestroyQuery from '../graphql/q/suggestion-destroy'
import { usePromiseQuery } from '../utils/promiseQuery'
import { Suggestion } from '../graphql/types.gen'

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

        addSuggestion: (slug: string, suggestion: Suggestion) => {
            setLoading(true)
            promiseMutation(suggestionCreateQuery, { slug, suggestion })
                .then((suggestionCreateResult: OperationResult) => {
                    const { data, error } = suggestionCreateResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
                        // TODO: update recent suggestions dataset here
                    }
                    setLoading(false)
                })
        },
        updateSuggestion: (slug: string, suggestion: Suggestion) => {
            setLoading(true)
            promiseMutation(suggestionUpdateQuery, { slug, suggestion })
                .then((suggestionUpdateResult: OperationResult) => {
                    const { data, error } = suggestionUpdateResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
                        // TODO: update recent suggestions dataset here
                    }
                    setLoading(false)
                })
        },
        deleteSuggestion: (slug: string, suggestionId: string) => {
            setLoading(true)
            promiseMutation(suggestionDestroyQuery, { slug, suggestionId })
                .then((suggestionDestroyResult: OperationResult) => {
                    const { data, error } = suggestionDestroyResult
                    if (error) commonActions.warn({ body: error.message, kind: 'warn' })
                    else {
                        console.debug(data)
                        // TODO: update recent suggestions dataset here
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


