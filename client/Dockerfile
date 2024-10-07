# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will use
EXPOSE 3000

# Run the command to start the application when the container launches
CMD ["npm", "start"]