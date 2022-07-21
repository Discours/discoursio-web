export const byAuthors = (a: any, b: any) => {
  const x = (a?.stat || a?.stat)?.authors as number
  const y = (b?.stat || b?.stat)?.authors as number

  if (x > y) return -1

  if (x < y) return 1

  return 0
}

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

export const byReacted = (a: any, b: any) => {
  const x = new Date(a?.stat?.reacted)
  const y = new Date(b?.stat?.reacted)

  if (x > y) return -1

  if (x < y) return 1

  return 0
}

export const byShouts = (a: any, b: any) => {
  const x = a?.stat?.shouts as number
  const y = b?.stat?.shouts as number

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

export const byViewed = (a: any, b: any) => {
  const x = (a?.stat || a?.stat)?.viewed as number
  const y = (b?.stat || b?.stat)?.viewed as number

  if (x > y) return -1

  if (x < y) return 1

  return 0
}
