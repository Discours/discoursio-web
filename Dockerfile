from node:alpine

EXPOSE 3000

workdir /usr/app
copy ./ /usr/app
run yarn
run yarn build
run npm run build

cmd npm run preview -- --host 0.0.0.0