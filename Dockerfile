FROM node:16.13.2 as base

ARG BUILD_DATE
ARG BUILD_VERSION
ARG PORT

LABEL maintainer="test@test.com" \
    org.label-schema.name="general_server" \
    org.label-schema.description="General server using an enterprise level architecture" \
    org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.version=$BUILD_VERSION

ENV NODE_ENV=production
ENV PORT=$PORT

EXPOSE $PORT
RUN apt-get update -qq && apt-get install -qy \
    curl \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm config list && \
    npm ci && \
    npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
ADD https://github.com/krallin/tini/releases/download/v0.19.0/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["node", "dist/clusters.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm config list
RUN npm install --only=development && \
    npm cache clean --force
COPY . .
RUN npm run build
RUN mkdir /app/logs && \
    chmod 777 -R /app/logs
USER node

FROM dev as test
ENV NODE_ENV=test
RUN npm run test:unit

FROM test as pre-prod
USER root
RUN rm -rf .dist/tests && rm -rf ./node_modules
USER node

FROM base as prod
COPY --from=pre-prod /app /app
HEALTHCHECK CMD curl -f http://127.0.0.1/ || exit 1
RUN apt-get autoclean && apt-get clean && apt-get autoremove -y
USER node

### PRODUCTION ###

# FROM node:16.13.2-alpine as base

# ARG BUILD_DATE
# ARG BUILD_VERSION
# ARG PORT

# LABEL maintainer="test@test.com" \
#     org.label-schema.name="general_server" \
#     org.label-schema.description="General server using an enterprise level architecture" \
#     org.label-schema.build-date=$BUILD_DATE \
#     org.label-schema.version=$BUILD_VERSION

# ENV NODE_ENV=production
# ENV PORT=$PORT

# EXPOSE $PORT
# RUN apk --no-cache add \
#     curl \
#     gcc \
#     g++ \
#     openblas-dev \
# WORKDIR /app
# ADD https://github.com/krallin/tini/releases/download/v0.19.0/tini /tini
# RUN chmod +x /tini
# COPY package*.json ./
# RUN npm config list && \
#     npm ci && \
#     npm cache clean --force
# ENV PATH /app/node_modules/.bin:$PATH
# ENTRYPOINT ["/tini", "--"]
# CMD ["node", "dist/clusters.js"]

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm config list
# RUN npm install --only=development && \
#     npm cache clean --force
# COPY . .
# RUN npm run build
# RUN mkdir /app/logs && \
#     chmod 777 -R /app/logs
# USER node

# FROM dev as test
# ENV NODE_ENV=test
# RUN npm run test:unit

# FROM test as pre-prod
# RUN rm -rf .dist/tests && rm -rf ./node_modules

# FROM base as prod
# COPY --from=pre-prod /app /app
# HEALTHCHECK CMD curl -f http://127.0.0.1/ || exit 1
# USER node
