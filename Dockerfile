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
run ls api
run pipenv install -r api/requirements.txt
run yarn global add pm2
run pm2 start 'pipenv run python api/server.py'
run adduser -g 'nginx www user' -h /home/www/ www-user
copy nginx.conf /etc/nginx/conf.d/default.conf
expose 80
cmd ["service nginx start"]