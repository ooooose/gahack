#!/bin/bash
set -e

# 下３行はpushするときに有効にする。
# bundle exec rails db:create RAILS_ENV=production
# bundle exec rails db:migrate RAILS_ENV=production
# bundle exec rails db:seed RAILS_ENV=production

rm -f /myapp/tmp/pids/server.pid

exec "$@"