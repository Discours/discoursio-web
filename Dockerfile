from node:lts
run 'yarn'
run 'yarn sb:install'
expose 6006
workdir /app
copy ./* /.
cmd ['yarn', 'sb:start']