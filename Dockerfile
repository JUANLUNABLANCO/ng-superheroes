# STAGE 1
# Use an official Node.js runtime as a parent image
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# construimos la app
RUN npm run build --prod

# ver cosas del contenedor
RUN ls -alt


# STAGE 2
# nginx
FROM nginx:1.17.1-alpine

COPY --from=build /usr/src/app/dist/superheroes-app /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose a port
EXPOSE 80