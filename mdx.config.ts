import { type Options as MdxOptions } from '@mdx-js/rollup';
import remarkGfm, { type Options as RemarkGfmOptions } from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkLint from 'remark-lint';
import remarkToC, { type Options as RemarkToCOptions } from 'remark-toc';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'

const remarkGfmOptions: RemarkGfmOptions = {
  singleTilde: true,
  tablePipeAlign: true,
  stringLength: (str: string) => str.length,
};

const remarkToCOptions: RemarkToCOptions = {
  tight: true,
  ordered: false,
  prefix: '',
  skip: undefined,
  parents: undefined,
  maxDepth: 2,
};

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
  properties: { className: ['anchor'] },
}

export default {
  jsx: true,
  useDynamicImport: true,
  jsxImportSource: 'solid-jsx', // readme https://github.com/high1/solid-jsx
  providerImportSource: 'solid-mdx',
  development: process.env.NODE_ENV === 'development',
  remarkRehypeOptions: { allowDangerousHtml: true },
  remarkPlugins: [
    remarkMdx,
    remarkLint,
    remarkGemoji,
    [remarkToC, remarkToCOptions],
    [remarkGfm, remarkGfmOptions],
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  ],
  outputFormat: 'program',
  recmaPlugins: []
} as MdxOptions