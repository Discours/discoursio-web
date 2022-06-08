import { createApp } from 'solid-utils'
import { MetaProvider } from 'solid-meta'

import { App } from './App'

createApp(App).use(MetaProvider).mount('body')
