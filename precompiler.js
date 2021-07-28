/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve } from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const shouts = require('./public/shouts.json')
let shoutRoutes =  [ ...Object.keys(shouts) ]
shoutRoutes = shoutRoutes.map(s => {
  // console.log(s)
  const p = s? '/a/' + s : ''
  return p
})
const routes = [ ...[
  //'/', // home
  '/login', // auth
  '/create', // edit
  //'/o/:org', // TODO: each org index page
  //'/a/:shout',  // /a/<shout>/index.html 
  '/search',
  '/forum'
], ...shoutRoutes]
console.debug(routes)

require('svelte/register')
console.log('prerender: svelte compiler is registered')
// const App = require('./src/App.svelte')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const run = process && process.argv[1] === fileURLToPath(import.meta.url)

const handle = async () => {
  const shouts = {}
  const cwd = resolve('..')
  const contentPath = resolve(cwd, 'content')
  const publicPath = resolve(cwd, 'public')
  // const indexContent = fs.readFileSync(resolve(publicPath, 'index.html'))
/*
  const prerenderShout = (path, shout={}, org='discours.io') => {
    const { css, head, html } = App.render({ shout, org })
    fs.writeFileSync(
      resolve(publicPath, path + '/index.html'),
      indexContent
        .replace('</head', `${head}</head>`)
        .replace('<body></body>', `<body>${html}<style>${css}</style></body>`)
    )
  }
*/
  // NOTE! File structure convention
  // content/<org>/<any-folders>/<article-slug>.md
  console.log('precompiler: generate data.json from `content` folder\n')

  walk(contentPath)
    .on('file', async (root, stats, next) => {
      // process parts of name
      let name, ext, lng = ''
      const nameparts = stats.name.split('.')
      if (nameparts.length === 3) [name, lng, ext] = nameparts
      if (nameparts.length === 2) [name, ext] = nameparts

      if (ext === 'md') {
        // process path
        const pathparts = root.replace(contentPath, '').split('/')
        pathparts.shift() // removes first empty
        const org = pathparts.shift()
        const slug = pathparts.join('/').replace(ext, '')
        // split frontmatter
        const { content, data } = matter(fs.readFileSync(`${root}/${stats.name}`))
        let shout = { org, ...data, slug, body: content, language: lng}
        shouts[slug] = shout
        console.log(`* ${org}/${slug||name} (${!lng?'ru':lng})`)
        fs.writeFileSync(
          resolve(publicPath, `shouts${lng && ('.' + lng)}.json`),
          JSON.stringify(shouts, false, 2)
        )

        // ----- prerender with svelte ------ (doesn't work yet)
        // FIXME
        // if(org === process.env.ORG) prerenderShout('/a/' + slug)
      }
      next()
    })
    /*
    .on('directory', async (root, stats, next) => {
      const pathparts = root.replace(contentPath, '').split('/')
      pathparts.shift() // removes first empty
      let org = pathparts.shift()
      const slug = pathparts.join('')
      !org && (org = stats.name)
      console.log(`.. ${org}${slug?'/'+slug:''}`)
      // orgs[org] = { org, slug }
      next()
    })
    */
    .on('end', () => {
      console.log('\nprecompiler: data json stored')

      // import('svelte/register')
      // const App = import('./src/App.svelte')
      console.log('precompiler: [todo] indexes for static routing')
      // TODO: generate static routing indexes

      //
      // const indexPath = resolve(cwd, 'public/index.html')
      // const indexContent = fs.readFileSync(indexPath)
      // projects.values()
      // orgs.values()
      shouts.values().forEach()
    })
}

export default handle

if (run) {
  handle()

}
