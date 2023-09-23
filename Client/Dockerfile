FROM node:18-alpine AS base

WORKDIR /app

FROM base AS development

COPY [ "package.json","yarn.lock*" , "./" ]

RUN yarn install

CMD ["yarn", "start"]
