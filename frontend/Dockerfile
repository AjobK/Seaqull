# This pulls an image from the docker hub. The alpine variant makes the image as compact as possible
# 'as build' gives this image an alias, named build, which makes it possible to use the image at a later stage
FROM node:alpine as build

# This sets the pwd (present working directory) when the container
# starts up and starts executing the commands under this one
WORKDIR /app

# Make sure image is up to date
RUN apk update
RUN apk add --upgrade apk-tools
RUN apk upgrade --available

# These packages are required for node-gyp
RUN apk add --no-cache make gcc g++ python2 python3

# Copy all non-ignored files and folders (see .dockerignore file for ignored files and folders)
COPY . ./

# Install all modules specified in package.json, this step takes a while, please be patient
RUN npm i

# Build the app
RUN npm run build

# Create another image with nginx to provide the content
FROM nginx:alpine

# Use a folder from the previously generated image
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port for serving content
EXPOSE 80
