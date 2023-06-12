FROM node:18-alpine AS base

WORKDIR /app

FROM base AS development

COPY [ "package.json","yarn.lock*" , "./" ]

COPY . .

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
