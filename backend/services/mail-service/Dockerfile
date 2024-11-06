FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm build

CMD ["npm", "run", "dev"]