
import SolidMarkdown from 'solid-markdown'
import { YouTube, Vimeo } from 'solid-social'
import Tooltip from './Tooltip'
import config from '../../../mdx.config'

export default (props: any) => {
  return (
    <SolidMarkdown
      rehypePlugins={config.rehypePlugins}
      remarkPlugins={config.remarkPlugins}
      components={{
        Tooltip,
        YouTube,
        Vimeo
      } as any}>
      {props.children}
    </SolidMarkdown>
  )
}