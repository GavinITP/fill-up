FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

COPY ../../mail-service /app/src/

EXPOSE 5000

CMD ["npm", "run", "dev"]