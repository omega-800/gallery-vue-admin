FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8090
EXPOSE 8040
EXPOSE 5173

CMD ["npm","run","dev"]
