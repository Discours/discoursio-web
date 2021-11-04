from node:alpine

EXPOSE 3000
run apk add git
workdir /usr/app
copy ./ /usr/app
run yarn
run yarn build
cmd yarn preview -- --host 0.0.0.0