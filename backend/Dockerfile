# #BASE STAGE
FROM node:18-alpine AS base

WORKDIR /app

# #DEV STAGE
FROM base AS development
# ARG DB_ENV=dev

COPY .env ./.env

COPY [ "package.json","yarn.lock*" , "./" ]

RUN yarn install --frozen-lockfile



# prisma engine requires openssl in order to work properly (ex: npx prisma generate)
# RUN apt-get update && apt-get -y install openssl && apt-get install -y procps

COPY ./prisma ./prisma

# RUN yarn prisma migrate dev

# RUN yarn prisma generate

# CMD [ "yarn", "start:dev" ]
ENTRYPOINT [ "./run.sh" ]
# CMD tail -f /dev/null


# PROD STAGE
# FROM base AS prod

# RUN yarn install --frozen-lockfile --production

# RUN apk add openssl

# COPY . .

# RUN yarn add global @nestjs/cli

# RUN yarn build

# CMD [ "yarn", "start:prod" ]