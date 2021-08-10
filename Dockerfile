from yarn:latest
run 'yarn'
run 'yarn sb:install'
expose 6006
cmd ['yarn', 'sb:start']