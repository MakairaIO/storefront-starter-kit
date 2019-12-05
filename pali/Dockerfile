FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN npm ci && \
    npm run clean && \
    npm run build

CMD npm run start

EXPOSE 3000
