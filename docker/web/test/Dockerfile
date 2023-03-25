FROM node:18.12.1-alpine

WORKDIR /app

COPY ./app/package.json ./app/yarn.lock /app/

COPY ./app /app

RUN rm -rf ./.next ./node_modules

RUN yarn install

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=300 \
    CMD node ./healthcheck.js

CMD ["sh", "-c", "yarn build && yarn start"]
