FROM node:20.15-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install ci
RUN npm i typescript

COPY . .

RUN npm run build

FROM node:20.15-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma ./prisma
COPY ./entrypoint.sh /entrypoint.sh

RUN npx prisma generate
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
