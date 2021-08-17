// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = (urls, test, callback) => {
    let remaining = urls.length
  
    function maybeCallback () {
      remaining = --remaining
      if (remaining < 1) {
        callback()
      }
    }
  
    if (!test()) {
      urls.forEach(({ type, url, options = { async: true, defer: true }}) => {
        const isScript = type === 'script'
        const tag = document.createElement(isScript ? 'script': 'link')
        if (isScript) {
            tag.setAttribute('src', url)
            tag.setAttribute('async', options.async.toString())
            tag.setAttribute('defer', options.defer.toString())
        } else {
            tag.setAttribute('rel', 'stylesheet')
            tag.setAttribute('href', url)
        }
        tag.onload = maybeCallback
        document.body.appendChild(tag)
      })
    } else {
      callback()
    }
  }
  
  export default handler