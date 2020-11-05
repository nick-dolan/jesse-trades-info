FROM node:12.19.0 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm i

FROM node:12.19.0 as release

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

COPY . /usr/src/app

RUN npm run build

CMD [ "npm", "start" ]
