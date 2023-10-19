# Use an official Node.js runtime as a parent image
FROM node:lts-alpine
# ENV NODE_ENV=production

# install simple http server for serving static content
RUN npm install -g http-server

# Set the working directory to /app
WORKDIR /app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../

# Copy the package.json and package-lock.json files to the container for installing dependencies
COPY package*.json ./
# COPY package*.json /app

# Install global dependencies
# RUN npm install -g npm-run-all2

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .


# Build the Vue.js application
RUN npm run build

# Expose port 4090
EXPOSE 4090
# RUN chown -R node /usr/src/app
# USER node
# Start the app
# CMD [ "npm", "run", "serve" ]
# CMD ["npm", "start"]

CMD [ "http-server", "dist" ]







