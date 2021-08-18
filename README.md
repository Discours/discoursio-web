### First - clone the repo

```sh
git clone git@github.com:Discours/discoursio-web
git submodule init
git submodule update
```

### Then - Redis

```sh
brew install redis
redis-server
```

### Start hacking

```sh
pnpm i
pnpm gen
pnpm dev
```
