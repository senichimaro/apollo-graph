# Support System
FROM node:17-alpine

# Work Dir
WORKDIR /client

# Image Actions
COPY package.json .

# Buildtime Command Executions
RUN npm install

# Image Actions
COPY . .

# Container Ports Exposure
EXPOSE 3000

# Runtime Command Execution
CMD ["npm","run","dev"]
