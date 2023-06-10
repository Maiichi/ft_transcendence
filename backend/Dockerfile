#BASE STAGE
FROM node:18-alpine AS base

WORKDIR /app

#DEV STAGE
FROM base AS development

COPY .env ./.env

COPY [ "package.json","yarn.lock*" , "./" ]

RUN yarn install --frozen-lockfile

COPY ./prisma ./prisma

CMD ["sh", "run.sh" ]
# CMD tail -f /dev/null


# PROD STAGE
# FROM base AS prod

# RUN yarn install --frozen-lockfile --production

# RUN apk add openssl

# COPY . .

# RUN yarn add global @nestjs/cli

# RUN yarn build

# CMD [ "yarn", "start:prod" ]