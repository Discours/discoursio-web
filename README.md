# Development techstack

- svelte - reactive compiler, an awesome idea of https://github.com/Rich-Harris
- esbuild - fast typescript compiler, omg it is so fast! thank you,
  https://github.com/evanw
- i18next - localization, reimplementing
  https://github.com/sveltejs/kit/issues/553#issuecomment-816310156

No runtime dependencies was used in package.json

# First start backend

Start Redis

```sh
brew install redis
redis-server
```

Start GraphQL server

```sh
cd ../discours-backend-next
pipenv run python server.py
```

# Then update types

Run and get src/graphql/codegen.ts

```sh
pnpm graphql-codegen
```

# Start hacking

Compile and run web frontend

```sh
pnpm i
pnpm dev
```

### To change default organization and language

Edit `precompiler.js` for your needs

### Storybook

```sh
pnpm sb:install
pnpm sb:start
```
