import { Shout, Topic } from "../graphql/types.gen"

export const byShouts = (a: Topic, b: Topic) => {
    const x = a?.topicStat?.shouts as number
    const y = b?.topicStat?.shouts as number
    if (x > y) return -1
    if (x < y) return 1
    return 0
}


export const byRating = (a: Partial<Shout>, b: Partial<Shout>) => {
    const x = a?.stat?.ratings as number
    const y = b?.stat?.ratings as number
    if (x > y) return -1
    if (x < y) return 1
    return 0
}

export const byViews = (a: any, b: any) => {
    const x = (a?.topicStat || a?.stat)?.views as number
    const y = (b?.topicStat || b?.stat)?.views as number
    if (x > y) return -1
    if (x < y) return 1
    return 0
}