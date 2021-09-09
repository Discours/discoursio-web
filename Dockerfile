from node:alpine
workdir /usr/app
copy ./ /usr/app
run npm install -g pnpm
run pnpm i
run pnpm ssr
run apk update
run apk --no-cache add -q nginx
run adduser --disabled-password -g 'nginx www-user' -h /home/www/ www-user
run mkdir /run/nginx
copy nginx.conf /etc/nginx/conf.d/default.conf
expose 80
cmd nginx -g "daemon off;"