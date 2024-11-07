# First stage: Copy files from the whole project
FROM node:21-alpine AS build

WORKDIR /project

# Copy the entire project directory into the build stage
COPY . .

# Second stage: App build stage
FROM node:21-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /project/water-station-service /app
COPY --from=build /project/mail-service/src/PublisherService.ts /app/src/PublisherService.ts

RUN npm install


EXPOSE 5000
CMD ["npm", "run", "dev"]