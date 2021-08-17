from node:alpine
run apk --no-cache add git openssh-client \
                && adduser -D -u 1000 non-privileged \
                && mkdir /git \
                && chown -R 1000:1000 /git
workdir /usr/app
copy ./ /usr/app
ENTRYPOINT [ "sh", "-c" ]

CMD [ "git clone " ]
run yarn
run yarn build
expose 80
expose 
cmd ["yarn", "sb:start"]