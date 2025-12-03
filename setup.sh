#!/bin/bash

echo "Setting up Respct Backend with Docker..."

# Create necessary directories
mkdir -p logs backups

# Set proper permissions
chmod 755 ./
chmod 644 .env.example
chmod 600 .env
chmod +x setup.sh

# Install dependencies
npm install

# Build Docker images
docker-compose build

echo "Setup completed!"
echo ""
echo "To start development environment:"
echo "  npm run docker:dev"
echo ""
echo "To view logs:"
echo "  npm run docker:logs"
echo ""
echo "To stop:"
echo "  npm run docker:down"