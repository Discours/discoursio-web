import { MDXProvider } from 'solid-jsx'
import { Tooltip } from 'src/components/Article/Tooltip'
import { Vimeo, YouTube } from 'solid-social'
import SolidMarkdown from 'solid-markdown'
export default (props: any) => {
  return (
    <MDXProvider components={{ Tooltip, Vimeo, YouTube }}>
      <SolidMarkdown>{props.children}</SolidMarkdown>
    </MDXProvider>
  )
}