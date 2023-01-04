#!/bin/bash
set -e

rm -f /myapp/tmp/pids/server.pid

# bin/setup
bundle exec pumactl start