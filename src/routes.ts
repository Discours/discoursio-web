import { lazy } from 'solid-js'
import { RouteDefinition } from 'solid-app-router'
import { ZineStateHandler } from './context/zine'
import { CollabStateHandler } from './context/collab'
import { InboxStateHandler } from './context/inbox'
import { AboutStateHandler } from './pages/about/index'


export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: ZineStateHandler
  },
  {
    path: ['/:slug', '/expo/image/:topic/:slug', '/:layout/:topic/:slug'],
    component: lazy(() => import('./pages/Article')),
    data: ZineStateHandler
  },
  {
    path: ['/author/:slug', '/a/:slug'],
    component: lazy(() => import('./pages/Author')),
    data: ZineStateHandler
  },
  {
    path: ['/topic/:slug', '/t/:slug'],
    component: lazy(() => import('./pages/Topic')),
    data: ZineStateHandler
  },
  {
    path: '/feed',
    component: lazy(() => import('./pages/Feed')),
    data: ZineStateHandler
  },
  {
    path: '/topics',
    component: lazy(() => import('./pages/AllTopics')),
    data: ZineStateHandler
  },
  {
    path: '/feed/settings',
    component: lazy(() => import('./pages/FeedSettings'))
  },
  {
    path: '/create',
    component: lazy(() => import('./pages/Create')),
    data: CollabStateHandler
  },
  {
    path: '/search',
    component: lazy(() => import('./pages/Search')),
    data: ZineStateHandler // experimental
  },
  {
    path: '/community',
    component: lazy(() => import('./pages/Community')),
    data: ZineStateHandler
  },
  {
    path: '/inbox',
    component: lazy(() => import('./pages/Inbox')),
    data: InboxStateHandler
  },

  {
    path: '/about/:slug',
    component: lazy(() => {
      let r
      const p = "/pages/about/[slug]"
      try { r = import(p)||import(p+".mdx")}
      catch (e) { r = import(p+".mdx") }
      return r
    }),
    data: AboutStateHandler
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404'))
  }
]
