from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn
run yarn sb:install
expose 6006
cmd ["yarn", "sb:start"]