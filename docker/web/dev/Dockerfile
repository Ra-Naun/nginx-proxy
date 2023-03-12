FROM node:18.12.1-alpine
WORKDIR /web

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=20 \
  CMD node ./healthcheck.js


# RUN yarn install

CMD ["sh", "-c", "yarn install && yarn dev"]
