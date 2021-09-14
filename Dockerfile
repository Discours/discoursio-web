from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn
run yarn build
run npm run build

expose 3000

cmd npm run preview -- --host 0.0.0.0