FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node/world-explorer

COPY --chown=node:node . .
RUN npm ci
RUN npm run build:api \
    && npm prune --production

# --- MINIFY

FROM node:16-alpine as minified

ENV NODE_ENV production

WORKDIR /home/node/world-explorer
RUN mkdir tmp

COPY --from=builder --chown=node:node /home/node/world-explorer/package*.json ./
COPY --from=builder --chown=node:node /home/node/world-explorer/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/world-explorer/dist/apps/api ./dist/apps/api

CMD ["npm", "run", "start:prod"]