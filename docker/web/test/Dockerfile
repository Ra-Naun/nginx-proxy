FROM node:18.12.1-alpine

WORKDIR /web

COPY ./web/package.json ./web/yarn.lock /web/

COPY ./web /web

RUN rm -rf ./.next ./node_modules

RUN yarn install

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=300 \
    CMD node ./healthcheck.js

CMD ["sh", "-c", "yarn build && yarn start"]
