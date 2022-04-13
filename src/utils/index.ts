export const reflow = () => document.body.clientWidth

export const preventSmoothScrollOnTabbing = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return

    document.documentElement.style.scrollBehavior = ''

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth'
    })
  })
}

export const capitalize = (s: string, firstonly = false) => {
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

export const plural = (amount: number, w1: string, w2: string, w5: string) => {
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

export const shuffle = (items: string[]) => {
  const cached = items.slice(0)
  let temp
  let i = cached.length
  let rand

  while (--i) {
    rand = Math.floor(i * Math.random())
    temp = cached[rand]
    cached[rand] = cached[i]
    cached[i] = temp
  }

  return cached
}

export const encodeGetParams = (p: string[]) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&')

export const snake2camel = (s: string) =>
  s
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()
