/* eslint-disable @typescript-eslint/no-var-requires */
const sveltePre = require('svelte-preprocess')
const { typescript } = require('svelte-preprocess-esbuild')
const { mdsvex } = require('mdsvex')

const { scss, globalStyle } = sveltePre

module.exports = {
    extensions: [".svelte", ".md"],
    preprocess: [
        mdsvex(),
        typescript(),
        scss(),
        globalStyle(),
    ]
}
