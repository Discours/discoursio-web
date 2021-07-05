# Development techstack

- svelte - reactive compiler, an awesome idea of https://github.com/Rich-Harris
- esbuild - fast typescript compiler, omg it is so fast! thank you, https://github.com/evanw
- svelte-pathfinder - store-based router, by Russian Svelte community activist https://github.com/PaulMaly
- i18next - localization, reimplementing https://github.com/sveltejs/kit/issues/553#issuecomment-816310156

No runtime dependencies was used in package.json

# How to develop


Start GraphQL server

```sh
cd discours-backend-next
pipenv shell
python server.py
```

Start Yjs server

```sh
cd discoursio-web
pnpm serve
```

Compile and run web frontend 

```sh
pnpm i
pnpm dev
```
