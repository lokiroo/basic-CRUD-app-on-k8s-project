# Use Node image to build the app
FROM node:16 as builder

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your code and build the production app
COPY . .
RUN npm run build

# Use Nginx to serve the static build
FROM nginx:alpine

# Copy built app from builder to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Remove default nginx config and add custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]