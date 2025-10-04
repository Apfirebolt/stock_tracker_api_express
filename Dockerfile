# Use a stable Node.js LTS image as the base image (e.g., node:20)
FROM node:23

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application using the correct, clean Exec Form syntax
# Note: This runs 'nodemon main.js' as defined in your package.json
CMD ["npm", "run", "server"]
