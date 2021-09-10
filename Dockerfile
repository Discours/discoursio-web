from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn
run yarn build
run apk update
run apk --no-cache add -q nginx
run adduser --disabled-password -g 'nginx www-user' -h /home/www/ www-user
run mkdir /run/nginx
copy nginx.conf /etc/nginx/conf.d/default.conf
expose 80
cmd nginx -g "daemon off;"