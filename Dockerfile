FROM node:latest
run npm i
run npm sb:install
expose 6006
cmd ['npm', 'sb:start']