from node:alpine

EXPOSE 3000
run apk add git
workdir /usr/app
copy ./ /usr/app
run npm i -g npm
run npm install
run npm run build
cmd npm run preview -- --host 0.0.0.0