#!/bin/sh

yarn prisma generate

yarn prisma migrate dev

yarn prisma studio &

yarn start:dev