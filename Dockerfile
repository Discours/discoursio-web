from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn
run yarn build
expose 80
cmd ["yarn start --host"]