FROM node

MAINTAINER Jason Jones

RUN useradd --user-group --create-home --shell /bin/false angular
ENV HOME=/home/angular

COPY . $HOME/
RUN chown -R angular:angular $HOME/

USER angular
WORKDIR $HOME/
RUN npm install

CMD ["npm", "run", "serve"]