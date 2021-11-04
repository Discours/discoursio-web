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

### Start backend

```sh
cd api
poetry run python server.py
```

### Start frontend

```sh
cd ../
pnpm i
pnpm dev
```

### Finally nginx

```sh
nginx -p . -e errors.log -c nginx.dev.conf
```
