#!/bin/sh
npx prisma migrate deploy && node dist/server.js
