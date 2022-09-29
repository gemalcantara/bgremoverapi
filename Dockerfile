#
# Ubuntu Node.js Dockerfile
#
# https://github.com/dockerfile/ubuntu/blob/master/Dockerfile
# https://docs.docker.com/examples/nodejs_web_app/
#

# Pull base image.
FROM ubuntu:20.04

# Install Node.js
RUN apt-get update && apt-get install
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
# RUN apt-get install -y build-essential
RUN apt clean && apt autoclean
RUN apt update
# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN apt-get install -y ffmpeg python3\.6
RUN apt-get install -y python3-pip
RUN pip install --upgrade pip
RUN pip install backgroundremover
# Install app dependencies
# RUN cd /src; npm install

# Binds to port 3000
COPY . .
EXPOSE 3000


#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["npm", "start"]
