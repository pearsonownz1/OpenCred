#!/bin/bash

# Build locally first
echo "Building locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "Local build failed"
    exit 1
fi

# Check if dist directory exists and has files
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "dist directory is empty or doesn't exist after build"
    exit 1
fi

# Deploy to server
echo "Deploying to server..."
ssh root@157.245.136.6 "mkdir -p /var/www/opencred/dist"
scp -r dist/* root@157.245.136.6:/var/www/opencred/dist/

if [ $? -ne 0 ]; then
    echo "Failed to copy files to server"
    exit 1
fi

# Restart the application
echo "Restarting application..."
ssh root@157.245.136.6 "cd /var/www/opencred && pm2 restart openeval || pm2 start server.js --name openeval"

echo "Deployment completed!" 