FROM node:lts
ENV PORT=3000

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

WORKDIR /app/dist
CMD [ "node", "main.js" ]