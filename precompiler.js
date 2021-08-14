/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve, join, sep } from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from "module"
import { tossr } from 'tossr'

const require = createRequire(import.meta.url)

const ORG = 'discours.io' // default org
let lang = 'ru'         // default language

// require('svelte/register') // FIXME: cannot use import inside anyway
// console.log('prerender: svelte compiler is registered')
// const App = require('./src/App.svelte')

const handle = async () => {
  const shouts = {}
  const cwd = resolve('.')
  const contentPath = resolve(cwd, 'content')
  const publicPath = resolve(cwd, 'public')
  const srcPath = resolve(cwd, 'src')
  const indexPath = resolve(srcPath, 'index.html')
  const bundlePath = resolve(publicPath, 'bundle.js')
  let indexContent = fs.readFileSync(indexPath).toString()

  // NOTE! File structure convention
  // content/<org>/<any-folders>/<article-slug>.md
  console.log('precompiler: [src: `content`] [lang: '+ lang + '] [org: ' + ORG + ']')

  walk(contentPath)
    .on('file', async (root, stats, next) => {
      // process parts of name
      let ext, lng = ''
      const nameparts = stats.name.split('.')
      if (nameparts.length === 3) [ , lng, ext] = nameparts
      if (nameparts.length === 2) [ , ext] = nameparts
      if (lng === '') lng = lang // if no lang suffix then language is default
      if (ext === 'md') {
        // process path
        const pathparts = root.replace(contentPath, '').split(sep)
        pathparts.shift() // removes first empty
        const org = pathparts.shift()
        const slug = pathparts.join(sep).replace(ext, '')
        // split frontmatter
        const { content, data } = matter(fs.readFileSync(`${root}${sep}${stats.name}`))
        let shout = { ...data, slug, body: content, language: lng }
        !shouts[lng] && (shouts[lng] = {})
        if(org === ORG) {
          
          // NOTE: save only current org shouts

          shouts[lng][slug] = shout
          // console.log(`* ${org}/${slug||name} (${!lng?'ru':lng})`)
          fs.writeFileSync(
            resolve(publicPath, `shouts${lng==='ru'?'':'.'+lng}.json`),
            JSON.stringify(shouts[lng], false, 2)
          )
          // FIXME: prerender with svelte App.render
        }
      }
      next()
    })
    .on('end', async () => {
      console.log('precompiler: shouts.json created')
      const shouts = require(cwd + sep +'public' + sep + 'shouts'+(lang==='ru'?'':'.'+lang)+'.json')
      Object.keys(shouts).forEach((skey) => {
        const apath = skey === '' ? publicPath : join(publicPath, sep + 'a' + sep + skey)
        const shout = shouts[skey]
        if (ORG) {
          console.log('precompiler: ' + sep + (skey ? ('a' + sep + skey) : ''))
          try {
            fs.mkdir(apath, {recursive: true}, () => {
              try {
                fs.writeFileSync(
                  apath + sep + 'index.html',
                  indexContent
                    .replace('lang="en">', `lang="${lang}">`)
                    .replace('<title>discours.io', `<title>Дискурс${(shout && shout.title)?(' : ' +shout.title):''}`)
                    .replace('</head>', `\t<script>window.SHOUT = ${JSON.stringify(shout)}</script>\n\t</head>`)
                )
              } catch(e) { console.error(e) }
            })
        }
        catch(e) { console.error(e) }
        }
      })

      const routes = [
        //'/',            // index.html
        //'/a/:shout',    // /a/<shout-slug>/index.html 
        sep + 'login',
        sep + 'resetpassword',
        sep + 'create',
        sep + 'search',
        sep + 'forum'
      ]
      //await prerender({ staticDir: publicPath, routes }) // FIXME: loosing titles
      
      routes.forEach(async (sroute) => {
        if(fs.existsSync(bundlePath)) {
          const html = await tossr(indexContent, bundlePath, sroute)
          const apath = join(publicPath, sroute)
          console.log('precompiler: ' + sroute)
          try { 
            fs.mkdir(apath, {recursive: true}, () => {
              try {
                fs.writeFileSync(
                  apath + sep + 'index.html',
                  html
                )
              } catch(e) { console.error(e) }
            })
          } catch(e) { console.error(e) }
        }
      })
      
    })
}

export default handle

process && process.argv[1] === fileURLToPath(import.meta.url) && handle()