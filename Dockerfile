FROM node:19-alpine

WORKDIR /app/express-ts-rest

COPY . /app/express-ts-rest

RUN npm install

RUN npm run build

CMD ["node", "dist/app.js"]