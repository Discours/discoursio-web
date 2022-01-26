import './styles/global.css'
import './styles/admonition.css'
import './styles/code.css'
import type { ClientTheme } from '@vitebook/client'
import defaultTheme from '@vitebook/theme-default'
import Layout from './layout/Layout.svelte'
import NotFound from './layout/404.svelte'

const Theme: ClientTheme = {
  ...defaultTheme,
  Layout,
  NotFound
}

export default Theme;
