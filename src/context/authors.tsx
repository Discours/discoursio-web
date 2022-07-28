import { RouteDataFuncArgs } from "solid-app-router"
import { useClient, Client } from "solid-urql"
import { usePromiseQuery } from "src/utils/promiseQuery"
import { cache, handleUpdate } from "./_api"
import authorsAll from "../graphql/q/authors-all"
import { onMount } from "solid-js"
import { User } from "src/graphql/types.gen"

export interface AuthorsState {
    readonly authors: { [slug:string]: Partial<User> },
    readonly args: { [key:string]: string }
}

// RouteDataFunc as state initiliazer
export const AuthorsStateHandler = (props: RouteDataFuncArgs | any): any => {
    const client: Client = !!props.client ? props.client : useClient()
    const [promiseQuery,] = usePromiseQuery(client)
    onMount(() => promiseQuery(authorsAll).then(handleUpdate))
    return { 
        get authors() {
            return cache()['authors'] || {}
        },
        get args() {
            return props.params
        }
    } as AuthorsState
}