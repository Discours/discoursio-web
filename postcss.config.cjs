// const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
// const purgecss = require('@fullhuman/postcss-purgecss')

let plugins = [
        // tailwindcss(),
        autoprefixer({}),
        // purgecss({
            // FIXME: content: ['./src/**/*.svelte', './src/**/*.scss'], 
            // defaultExtractor: (o) => o.match( /[\w-/:]+(?<!:)/g ) || [] 
        // })
    ]

if(process.env.NODE_ENV !== 'development') plugins.push(cssnano({ preset: 'default' }))

module.exports = { plugins }
