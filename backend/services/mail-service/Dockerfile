FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm build

EXPOSE 25 465 587 2525

CMD ["npm", "run", "dev"]