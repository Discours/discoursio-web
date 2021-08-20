/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve, sep } from 'path'
import matter from 'gray-matter'
import fs from 'fs'
import { fileURLToPath } from 'url'

const cwd = resolve('.')
const contentPath = resolve(cwd, 'content')
// const srcPath = resolve(cwd, 'src')
const staticPath = resolve(cwd, 'static')
const shouts = {}

const handle = async (callback) => {
  // NOTE! File structure convention
  // content/<org>/<any-folders>/<article-slug>.md
  walk(contentPath)
    // creates shouts.json
    .on('file', async (root, stats, next) => {
      const [fname, ext] = stats.name.split('.')
      const dirname = root
        .replace(contentPath, '')
        .replace(stats.name, '')
        .split(sep)
        .pop()
      if (ext === 'md') {
        const slug = fname === 'index' ? dirname : fname

        // split frontmatter
        const { content, data } = matter(
          fs.readFileSync(`${root}${sep}${stats.name}`)
        )
        let shout = { ...data, body: content, slug }
        shouts[slug] = shout
        fs.writeFileSync(
          resolve(staticPath, `shouts.json`),
          JSON.stringify(shouts, false, 2)
        )
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
