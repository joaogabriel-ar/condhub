# Use an official Node runtime as the base image
FROM node:20.15.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

COPY src src

# Install npm dependencies
RUN npm install


# Install TypeScript globally
RUN npm install -g typescript@4.5.4

COPY tsconfig.json ./tsconfig.json

RUN npm uninstall @types/lodash
RUN npm install @types/lodash@4.17.5

# Install nodemon globally (assuming it's needed for your development server)
RUN tsc

# Copy the rest of the application code
COPY dist dist

# Expose the port your app runs on
EXPOSE 8000

# Command to run your app using nodemon
#CMD ["npm","start"]
