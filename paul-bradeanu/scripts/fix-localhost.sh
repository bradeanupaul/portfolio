#!/bin/bash
set -e
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$HOME/.nvm/versions/node/v24.15.0/bin:$PATH"
echo "Stopping hung Next servers on 3000-3005..."
for p in 3000 3001 3002 3003 3004 3005; do
  pids=$(lsof -tiTCP:$p -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "  kill $p: $pids"
    kill -9 $pids 2>/dev/null || true
  fi
done
sleep 1
ROOT="/Users/paulbradeanu/Desktop/portfolio"
rm -f "$ROOT"/paul-bradeanu/.next/dev/lock
rm -f "$ROOT"/bellanotte/.next/dev/lock
rm -f "$ROOT"/veltra/.next/dev/lock
rm -f "$ROOT"/vantaink/.next/dev/lock
rm -f "$ROOT"/aureliaestates/.next/dev/lock
rm -f "$ROOT"/elanskin/.next/dev/lock
cd "$ROOT/paul-bradeanu"
echo "Starting portfolio + demos..."
exec npm run dev
