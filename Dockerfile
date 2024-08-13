# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json .

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 5000

# Starting our application
CMD ["npm", "start"]