const preprocess = require('svelte-preprocess')

module.exports = {
  "stories": [
    "./stories/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf"
  ],
  "svelteOptions": {
    preprocess
  }
}