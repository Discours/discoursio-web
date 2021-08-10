from node:alpine
workdir /usr/app
copy ./ /usr/app
run npm i
run npm run sb:install
expose 6006
run npm run sb:start