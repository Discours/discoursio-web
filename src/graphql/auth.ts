import { errorExchange, makeOperation } from '@urql/core'
import { AuthConfig, authExchange } from '@urql/exchange-auth'
import { GraphQLError } from 'graphql'

// WARNING! this code is not used in client.ts

const logout = () => {
  localStorage.setItem('token', '')
  localStorage.setItem('refreshToken', '')
}

const willAuthError = (a: any) => {
  const { operation, authState } = a

  // Detect our login mutation and let this operation through:
  return !authState && !(
    operation.kind === 'mutation' &&
      // Here we find any mutation definition with the "login" field
      operation.query.definitions.some(
        (definition: { kind: string; selectionSet: { selections: any[] } }) => {
          return (
            definition.kind === 'OperationDefinition' &&
            definition.selectionSet.selections.some((node) => {
              // The field name is just an example, since signup may also be an exception
              return node.kind === 'Field' && node.name.value === 'login'
            })
          )
        }
      )
  )
}

const didAuthError = (r: any) =>
  r?.error?.graphQLErrors?.some(
    (e: GraphQLError) => (e as any).response?.status === 401 || e.extensions?.code === 'FORBIDDEN'
  )

const addAuthToOperation = (a: any) => {
  const { authState, operation } = a

  if (!authState || !authState.token) {
    return operation
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token
      }
    }
  })
}

const getAuth = async (a: any) => {
  const { authState, mutate } = a

  if (!authState) {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    if (token && refreshToken) {
      return { token, refreshToken }
    }

    return null
  }
  // TODO: refreshToken query
  /*
    const result = await mutate(refreshSession, { token: authState!.refreshToken })

    if (result.data?.refreshLogin) {
        localStorage.setItem('token', result.data.refreshLogin.token)
        localStorage.setItem('refreshToken', result.data.refreshLogin.refreshToken)

        return {
            token: result.data.refreshLogin.token,
            refreshToken: result.data.refreshLogin.refreshToken,
        }
    }
    */

  // This is where auth has gone wrong and we need to clean up and redirect to a login page
  localStorage.clear()
  logout()

  return null
}

export default [
  errorExchange({
    onError: (error: { graphQLErrors: any[] }) => {
      const isAuthError = error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN')

      if (isAuthError) logout()
    }
  }),
  authExchange({
    addAuthToOperation,
    getAuth,
    didAuthError,
    willAuthError
  } as AuthConfig<any>)
]
