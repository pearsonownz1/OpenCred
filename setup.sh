#!/bin/bash

# Update system packages
apt-get update
apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install nginx
apt-get install -y nginx

# Install PM2 globally
npm install -g pm2

# Create application directory
mkdir -p /var/www/openeval
cd /var/www/openeval

# Create Nginx configuration
cat > /etc/nginx/sites-available/openeval << 'EOL'
server {
    listen 80;
    server_name openeval.co www.openeval.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Enable the site
ln -s /etc/nginx/sites-available/openeval /etc/nginx/sites-enabled/

# Remove default Nginx site
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Install Certbot for SSL
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d openeval.co -d www.openeval.co

echo "Setup completed!" 