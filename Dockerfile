# Use phusion/baseimage as base image. To make your builds
# reproducible, make sure you lock down to a specific version, not
# to `latest`! See
# https://github.com/phusion/baseimage-docker/blob/master/Changelog.md
# for a list of version numbers.
FROM phusion/baseimage:0.9.19

ENV MONGO_DATA_DIR /data/db

#WORKDIR /code
#ADD . /code
RUN mkdir -p /data/db

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# ...put your own build instructions here.
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
RUN source ~/.nvm/nvm.sh && nvm install 4.4.7 && npm install -g npm@3.10.5 && npm install -g typings@1.3.1 && npm install -g mocha
RUN curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-3.2.7.tgz
RUN tar -zxvf mongodb-linux-x86_64-ubuntu1604-3.2.7.tgz
RUN mkdir -p /opt/mongodb
RUN cp -R -n mongodb-linux-x86_64-ubuntu1604-3.2.7/* /opt/mongodb
ENV PATH /opt/mongodb/bin:$PATH
RUN apt-get -y update && apt-get -y install git && apt-get -y install python && apt-get -y install build-essential

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

