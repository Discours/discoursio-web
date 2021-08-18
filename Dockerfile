from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn install
run yarn build
run apk update
run apk --no-cache add -q git nginx python pip
run rm -rf api
run git clone git@github.com:Discours/discours-backend-next.git api
run adduser -g 'Nginx www user' -h /home/www/ wwwcbz
copy nginx.conf /etc/nginx/conf.d/default.conf
expose 80
cmd ["service nginx start"]