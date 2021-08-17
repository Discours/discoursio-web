/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve, sep } from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import { fileURLToPath } from 'url'

const ORG = 'discours.io' // default org
let lang = 'ru' // default language
const cwd = resolve('.')
const contentPath = resolve(cwd, 'content')
// const srcPath = resolve(cwd, 'src')
const staticPath = resolve(cwd, 'static')
const shouts = {}

const handle = async (callback) => {
  // NOTE! File structure convention
  // content/<org>/<any-folders>/<article-slug>.md
  console.log(
    'precompiler: handling `content` [lang: ' + lang + '] [org: ' + ORG + ']'
  )

  walk(contentPath)
    // creates shouts.json
    .on('file', async (root, stats, next) => {
      // process parts of name
      let ext,
        lng = ''
      const nameparts = stats.name.split('.')
      if (nameparts.length === 3) [, lng, ext] = nameparts
      if (nameparts.length === 2) [, ext] = nameparts
      if (lng === '') lng = lang // if no lang suffix then language is default
      if (ext === 'md') {
        // process path
        const pathparts = root.replace(contentPath, '').split(sep)
        pathparts.shift() // removes first empty
        const org = pathparts.shift()
        const slug = pathparts.join(sep).replace(ext, '')

        // split frontmatter
        const { content, data } = matter(
          fs.readFileSync(`${root}${sep}${stats.name}`)
        )
        let shout = { ...data, slug, body: content, language: lng }
        !shouts[lng] && (shouts[lng] = {})
        if (org === ORG) {
          // NOTE: save only current org shouts

          shouts[lng][slug] = shout
          fs.writeFileSync(
            resolve(staticPath, `shouts${lng === 'ru' ? '' : '.' + lng}.json`),
            JSON.stringify(shouts[lng], false, 2)
          )
        }
      }
      next()
    })

    // creates index.html's
    .on('end', () => {
      console.log('precompiler: shouts.json created')
      callback && callback()
    })
}

export default handle

process && process.argv[1] === fileURLToPath(import.meta.url) && handle()
