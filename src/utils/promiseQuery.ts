import { Client, TypedDocumentNode } from "solid-urql"

export const usePromiseQuery = (client: Client) => {
  const promiseQuery = (query: TypedDocumentNode<any, object>, variables?: any) => 
    (!variables ? client?.query(query) : client?.query(query, { ...variables })).toPromise()
  const promiseMutation = (mutation: TypedDocumentNode<any, object>, variables?: any) => 
    (!variables ? client?.mutation(mutation) : client?.mutation(mutation, { ...variables })).toPromise()
  return [promiseQuery, promiseMutation]
}
