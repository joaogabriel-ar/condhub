# Use an official Node runtime as the base image
FROM node:20.15.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript@4.5.4

# Install nodemon globally (assuming it's needed for your development server)
RUN npm install -g nodemon

# Copy the rest of the application code
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY nodemon.json ./nodemon.json

# Expose the port your app runs on
EXPOSE 8007

# Command to run your app using nodemon
CMD ["nodemon", "dist/server.js"]
