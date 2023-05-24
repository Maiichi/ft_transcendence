#!/bin/sh

yarn prisma migrate dev

yarn prisma generate

yarn prisma migrate deploy

yarn start:dev