FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev || npm install --omit=dev

COPY dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
