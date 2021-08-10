from node:latest
run 'npm i'
run 'npm sb:install'
expose 80
expose 6006
workdir /app
copy ./* /.
cmd ['npm', 'run', 'sb:start']