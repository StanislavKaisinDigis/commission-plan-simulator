
FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build  # Replace with your build command if different

EXPOSE 3001

CMD [ "node", "dist/server.js" ]  
