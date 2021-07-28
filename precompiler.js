/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve, join } from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from "module"
// import { prerender } from './prerender.js'

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
  
  let indexContent = fs.readFileSync(resolve(publicPath, 'index.html')).toString()

  // NOTE! File structure convention
  // content/<org>/<any-folders>/<article-slug>.md
  console.log('precompiler: generate json from `content` folder')

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
        const pathparts = root.replace(contentPath, '').split('/')
        pathparts.shift() // removes first empty
        const org = pathparts.shift()
        const slug = pathparts.join('/').replace(ext, '')
        // split frontmatter
        const { content, data } = matter(fs.readFileSync(`${root}/${stats.name}`))
        let shout = { org, ...data, slug, body: content, language: lng}
        !shouts[lng] && (shouts[lng] = {})
        shouts[lng][slug] = shout
        // console.log(`* ${org}/${slug||name} (${!lng?'ru':lng})`)
        fs.writeFileSync(
          resolve(publicPath, `shouts${lng==='ru'?'':'.'+lng}.json`),
          JSON.stringify(shouts[lng], false, 2)
        )
        // FIXME: prerender with svelte App.render
      }
      next()
    })
    .on('end', async () => {
      const shouts = require('./public/shouts'+(lang==='ru'?'':'.'+lang)+'.json')
      console.log('precompiler: data stored')
      console.log('precompiler: org ' + ORG)
      console.log('precompiler: lang ' + lang)
      Object.keys(shouts).forEach((skey) => {
        const apath = join(publicPath, '/a/' + skey)
        const shout = shouts[skey]
        if (shout.org === ORG) {
          console.log('precompiler: /a/'+skey)
          try { 
            fs.mkdir(apath, {recursive: true}, () => {
              try {
                fs.writeFileSync(
                  apath + '/index.html',
                  indexContent
                    .replace('lang="en">', `lang="${lang}">`)
                    .replace('<title>discours.io', `<title>discours.io${(shout && shout.title)?(' : ' +shout.title):''}`)
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
        '/login',
        '/create',
        '/search',
        '/forum'
      ]
      //await prerender({ staticDir: publicPath, routes }) // FIXME: loosing titles
      
      routes.forEach((sroute) => {
        const apath = join(publicPath, sroute)
        console.log('precompiler: ' + sroute)
        try { 
          fs.mkdir(apath, {recursive: true}, () => {
            try {
              fs.writeFileSync(
                apath + '/index.html',
                indexContent.replace('<title>discours.io', `<title>discours.io${sroute?sroute:''}`)
              )
            } catch(e) { console.error(e) }
          })
        } catch(e) { console.error(e) }
      })
      
    })
}

export default handle

process && process.argv[1] === fileURLToPath(import.meta.url) && handle()