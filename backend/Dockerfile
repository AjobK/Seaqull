# This pulls an image from the docker hub. The alpine variant makes the image as compact as possible
FROM node:alpine

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

# Overwrite ormconfig for docker
COPY ./ormconfig.docker.json ./ormconfig.json

# Install all modules specified in package.json, this step takes a while, please be patient
RUN npm i

# Start server
CMD npm run seed:run && npm run start:prod
