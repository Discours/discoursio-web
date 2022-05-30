export const byCreated = (a: any, b: any) => {
  const x = new Date(a?.createdAt)
  const y = new Date(b?.createdAt)
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

export const byLength = (a: any[], b: any[]) => {
  const x = a.length
  const y = b.length
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

export const byComments = (a: any, b: any) => {
  const x = new Date(a?.stat?.comments)
  const y = new Date(b?.stat?.comments)
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

export const byShouts = (a: any, b: any) => {
  const x = (a?.topicStat || a?.stat)?.shouts as number
  const y = (b?.topicStat || b?.stat)?.shouts as number
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

export const byRating = (a: any, b: any) => {
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
