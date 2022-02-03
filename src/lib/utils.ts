export const capitalize = (s, firstonly = false) => {
  s = s.trim()
  const r = firstonly
    ? s.charAt(0).toUpperCase() + s.slice(1)
    : s
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
  // console.debug(r)
  return r
}

export const plural = (amount, w1, w2, w5) => {
  try {
    const a = amount.toString()
    const x = parseInt(a.charAt(a.length - 1))
    const xx = parseInt(a.charAt(a.length - 2) + a.charAt(a.length - 1))
    if (xx > 5 && xx < 20) return w5
    if (x === 1) return w1
    if (x > 1 && x < 5) return w2
  } catch (e) {
    console.error(e)
  }
  return w5
}

export const shuffle = (items) => {
  const cached = items.slice(0)
  let temp,
    i = cached.length,
    rand
  while (--i) {
    rand = Math.floor(i * Math.random())
    temp = cached[rand]
    cached[rand] = cached[i]
    cached[i] = temp
  }
  return cached
}

export const encodeGetParams = (p) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&')
