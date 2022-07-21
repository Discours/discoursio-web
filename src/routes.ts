import { lazy } from 'solid-js'
import { RouteDefinition } from 'solid-app-router'
import { ZineStateHandler } from './context/zine'
import { CollabStateHandler } from './context/collab'
import { InboxStateHandler } from './context/inbox'


export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: ZineStateHandler
  },
  {
    path: '/about/projects',
    component: lazy(() => import('./pages/about/projects.mdx'))
  },
  {
    path: '/about/manifest',
    component: lazy(() => import('./pages/about/manifest.mdx'))
  },
  {
    path: '/about/guide',
    component: lazy(() => import('./pages/about/guide'))
  },
  {
    path: '/about/help',
    component: lazy(() => import('./pages/about/help'))
  },
  {
    path: '/about/partners',
    component: lazy(() => import('./pages/about/partners.mdx'))
  },
  {
    path: '/about/terms-of-use',
    component: lazy(() => import('./pages/about/terms-of-use'))
  },
  {
    path: '/about/thanks',
    component: lazy(() => import('./pages/about/thanks'))
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
    path: ['/:slug', '/expo/image/:topic/:slug', '/:layout/:topic/:slug'],
    component: lazy(() => import('./pages/Article')),
    data: ZineStateHandler
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404'))
  }
]
