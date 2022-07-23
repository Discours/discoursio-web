import remarkMdx from 'remark-mdx'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
// import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
// import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import SolidMarkdown from 'solid-markdown'

export default (props: any) =>
  <SolidMarkdown
    remarkPlugins={[remarkMdx, remarkGfm]}
    rehypePlugins={[rehypeSanitize, rehypeFormat]}
  >{props.children}</SolidMarkdown>
