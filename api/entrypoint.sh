#!/bin/bash
set -e

rm -f /backend/emp/pids/server.pid

exec "$@"
