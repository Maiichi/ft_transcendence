#!/bin/sh

yarn prisma generate

yarn prisma migrate dev

# yarn prisma migrate deploy

yarn start:dev