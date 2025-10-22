# Use node version 22 as our base image with alpine for a smaller image size
FROM node:22-alpine

# Go to the /app directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

# Copy source code
COPY . .

# Expose server port
EXPOSE 4000

# Start the backend
CMD ["node", "server.js"]