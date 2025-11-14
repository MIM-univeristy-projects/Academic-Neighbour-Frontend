FROM node:latest
RUN npm install -g bun
ENV PATH="/root/.bun/bin:$PATH"
ENV CHROME_BIN="/usr/bin/chromium"

RUN bun install -g @angular/cli
RUN sudo apt-get update && sudo apt-get install -y chromium chromium-driver