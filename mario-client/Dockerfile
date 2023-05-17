FROM node:18
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Permet de laisser le conteneur tourner
ENTRYPOINT ["tail", "-f", "/dev/null"]
