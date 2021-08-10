FROM node:latest
run 'npm i -g pnpm'
run 'pnpm sb:install'
expose 6006
cmd ['pnpm', 'sb:start']