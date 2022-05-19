import { RouteDataFunc } from 'solid-app-router'
import topicsAll from '../graphql/q/topics-all'
import { createQuery } from 'solid-urql'

export const AllTopicsData: RouteDataFunc = (args) => {
    const [qdata, qstate] = createQuery({ query: topicsAll })

    return {
        get topics() {
            return qdata()?.topicsBySlugs
        },
        get topicsLoading() {
            return qstate().fetching
        },
        get by() {
            return args.params.by
        }
    }
}
