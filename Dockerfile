from node:alpine
workdir /usr/app
copy ./ /usr/app
run yarn install
run yarn build
run apk update
run apk --no-cache add -q git nginx python3 py3-pip
run ln -sf python3 /usr/bin/python
run python3 -m ensurepip
run pip3 install --no-cache --upgrade pipenv
run cd api && pipenv install && cd ..
run yarn global add pm2
run cd api && pm2 start 'pipenv run python server.py' && cd ..
run adduser -g 'nginx www user' -h /home/www/ www-user
copy nginx.conf /etc/nginx/conf.d/default.conf
expose 80
cmd ["service nginx start"]