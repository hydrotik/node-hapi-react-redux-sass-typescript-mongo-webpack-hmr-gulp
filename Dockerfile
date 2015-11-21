FROM node:7.10-alpine

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install app dependencies (Doing this first takes advantage of Docker's caching of layers)
RUN apk add --no-cache make gcc g++ python git
COPY package.json /opt/app/
COPY plugins/auth_plugin/package.json /opt/app/plugins/auth_plugin/
COPY plugins/navbobulator/package.json /opt/app/plugins/navbobulator/
RUN npm install


# Bundle app source
COPY . /opt/app
RUN cd plugins/auth_plugin && npm link && cd ../../
RUN cd plugins/navbobulator && npm link && cd ../../
RUN npm link auth_plugin navbobulator


EXPOSE 8000
EXPOSE 8001
EXPOSE 8008

CMD [ "npm", "start" ]
