/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { walk } from 'walk'
import { resolve } from 'path'
import matter from 'gray-matter'
import fs from 'fs'

// require( 'svelte/register' )
// const App = require('./src/App.svelte')

const defaultLng = 'ru'

const process = async () => {
  let shouts = {}
  let projects = {}
  let orgs = {}
  
  const cwd = resolve('.')
  const contentPath = resolve(cwd, 'content')
  const srcPath = resolve(cwd, 'src')

  // NOTE! File structure convention
  // content/<org>/<project>/<article-slug>.md
  console.log('\n [ generating data.json from `content` folder ]\n')
  walk(contentPath)
    .on('file', async (root, stats, next) => {
      let [sub, lng, ext] = stats.name.split('.')
      if(ext === 'md') {
        if(!sub) {
          sub = lng
          lng = defaultLng
        }
        let pathparts = root.replace(contentPath,'').split('/')
        pathparts.shift() // removes first empty
        const [org, project] = pathparts
        const { content, data } = matter(fs.readFileSync(`${root}/${stats.name}`))
        if(stats.name.split('.')[0] === 'index') {
          if(project) projects[project] = { org, name: project, content, data }
          else orgs[org] = { name: org, content, data }
          console.log(`* ${project || org} *`)
        } else {
          const name = stats.name.replace('.md', '').replace('.'+lng, '')
          shouts[name] = { name, project, org, content, data }
          console.log(`* ${name}`)
        }
        fs.writeFileSync(
          resolve(srcPath, `data${lng===defaultLng?'':'.'+lng}.json`), 
          JSON.stringify({ shouts, orgs, projects }, false, 2)
          )
      }
      next()
    })
    .on('directory', async (root, stats, next) => {
      let pathparts = root.replace(contentPath,'').split('/')
      pathparts.shift() // removes first empty
      let [org] = pathparts
      let project = ''
      if(!org) {
        org = stats.name
        console.log(`> ${org}`)
        orgs[org] = { name: org }
      } else {
        project = stats.name
        console.log(`# ${project}`)
        projects[project] = { org, name: project }
      }
      next()
    })
    .on('end', () => {
      console.log('\n [ data.json stored ]\n')
      console.log(' [ generating indexes for static routing ]')
      console.log('\nTODO: implement this with Svelte compiler\n')
      
      // const publicPath = resolve(cwd, 'public')
      // const indexPath = resolve(cwd, 'public/index.html')
      // const indexContent = fs.readFileSync(indexPath)
      // projects.values()
      // orgs.values()
      /* shouts.values().forEach(page => {
        const { css, head, html } = App.render(page)
        const shoutPath = (page.project ? page.project + '/' : '') + page.shout
        fs.writeFileSync(
          resolve(publicPath, '/a/' + shoutPath + '/index.html'),
          indexContent
            .replace('</head', `${head}</head>`)
            .replace('<body></body>', `<body>${html}<style>${css}</style></body>`)
        )
      })
      */
    })
}



export default process
