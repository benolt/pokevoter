FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9083

RUN npm run build

CMD ["npm", "start"]
