from node:alpine
workdir /usr/app
copy ./ /usr/app
run npm i
run npm sb:install
expose 6006
cmd ['npm', 'run sb:start']