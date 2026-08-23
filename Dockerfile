# This file tells Railway how to build and run the app
# Railway auto-detects Next.js but this ensures correct behavior

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
