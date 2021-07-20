import { promises } from 'fs'
import { join, normalize } from 'path'

import Prerenderer from '@prerenderer/prerenderer'
import Puppeteer from '@prerenderer/renderer-puppeteer'

const { writeFile, access, mkdir } = promises

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (options = {}) => ({
  name: 'prerender',
  
  // TODO: esbuild plugin format

  //setup(build) => {
  //  build.on()
  //}
  writeBundle() {
    try {
      prerender(options)
    } catch (e) {
      console.error(e)
    }
  }
})

async function existsAsync(dir) {
  let status

  await access(dir)
    .then(() => (status = true))
    .catch(() => (status = false))

  return status
}

async function mkdirAsync(dir) {
  await mkdir(dir).catch(e => console.log(e))
}

async function writeFileAsync(file, source) {
  return await writeFile(file, source).catch(e => console.error(e))
}

async function prerender(options) {
  const { staticDir, routes, puppeteer = {}, ...config } = options

  if (!staticDir) throw Error('prerender: staticDir must be of type string')

  if (!routes || routes.length === 0)
    throw Error('prerender: routes must be of type string[]')

  const renderer = new Puppeteer(puppeteer)
  const prerenderer = new Prerenderer({ renderer, staticDir, ...config })

  await prerenderer.initialize()

  const rendered = await prerenderer.renderRoutes(routes)

  for (const { route, html } of rendered) {
    try {
      const outDir = join(staticDir, route)
      const file = normalize(`${outDir}/index.html`)
      const dirExists = await existsAsync(outDir)

      if (!dirExists) await mkdirAsync(outDir)

      console.info(`Rendering route "${route}"...`)

      await writeFileAsync(file, html)
    } catch (e) {
      console.error(e)
    }
  }

  prerenderer.destroy()
}