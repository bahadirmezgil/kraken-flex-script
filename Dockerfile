FROM node:18-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm ci --fund=false --audit=false --omit=dev --ignore-scripts

COPY . .

RUN npm run build

FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm ci --fund=false --audit=false --omit=dev --ignore-scripts

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/index.js" ]