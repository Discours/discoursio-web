from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn install
run yarn build
expose 80
expose 8080
cmd ["yarn start --host"]