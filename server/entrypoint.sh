#!/bin/sh

# Run DB migrations
npx prisma db push

# Run web server
node dist/server.js