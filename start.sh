#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "==========================================="
echo "  Homophone Quiz - single-window launcher"
echo "==========================================="
echo

if [ ! -d node_modules ]; then
  echo "Installing root dependencies..."
  npm install
fi
if [ ! -d server/node_modules ]; then
  echo "Installing server dependencies..."
  npm install --prefix server
fi
if [ ! -d client/node_modules ]; then
  echo "Installing client dependencies..."
  npm install --prefix client
fi

echo
echo "Starting backend + frontend (Ctrl+C stops both)."
echo "  Frontend : http://localhost:3000"
echo "  Backend  : http://localhost:5050"
echo

exec npm start
