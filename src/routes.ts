import { lazy } from 'solid-js'
import { RouteDefinition } from 'solid-app-router'

import { ArticleData } from './pages/Article.data'
import { AuthorData } from './pages/Author.data'
import { TopicData } from './pages/Topic.data'
import { HomeData } from './pages/Home.data'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: HomeData
  },
  {
    path: '/:slug',
    component: lazy(() => import('./pages/Article')),
    data: ArticleData
  },
  {
    path: '/author/:slug',
    component: lazy(() => import('./pages/Author')),
    data: AuthorData
  },
  /*
  {
    path: '/feed',
    component: lazy(() => import('./pages/Feed')),
    data: () => ({
      subscribed: SubscribedData,
      reviewed: ReviewedData,
      commented: CommentedData,
      candidates: CandidatesData
    })
  },
  */
  {
    path: '/create',
    component: lazy(() => import('./pages/Create'))
    // TODO: data: EditorData,
  },
  {
    path: '/topics',
    component: lazy(() => import('./pages/AllTopics'))
    // TODO: data: AllTopicsData,
  },
  {
    path: '/@:slug',
    component: lazy(() => import('./pages/Author')),
    data: AuthorData
  },
  {
    path: '/topic/:slug',
    component: lazy(() => import('./pages/Topic')),
    data: TopicData
  },
  {
    path: '/about/manifest',
    component: lazy(() => import('./pages/about/manifest.mdx'))
  },
  {
    path: '/about/dogma',
    component: lazy(() => import('./pages/about/dogma.mdx'))
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
    path: '/about/projects',
    component: lazy(() => import('./pages/about/projects.mdx'))
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
    path: '/*all',
    component: lazy(() => import('./pages/404'))
  }
]
