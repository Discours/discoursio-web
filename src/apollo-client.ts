import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getOperationAST } from 'graphql'

const cache = new InMemoryCache({
  addTypename: true,
})

const wsLink = new WebSocketLink({
  uri: 'wss://' + process.env.GRAPHQL_URL,
  options: {
    lazy: true,
    reconnect: true,
  },
})

const httpLink = new HttpLink({
  uri: 'https://' + process.env.GRAPHQL_URL,
})

const link = ApolloLink.split(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (op: any) => {
    // check if it is a subscription
    const operationAST = getOperationAST(op.query, op.operationName)
    return !!operationAST && operationAST.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export default new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
})
