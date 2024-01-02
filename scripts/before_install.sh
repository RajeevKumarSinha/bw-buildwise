#!/bin/bash
echo "Executing before install script..."

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

# Create the deployment directory if it doesn't exist
mkdir -p /var/www/your-backend

# Change directory to the deployment path
cd /var/www/your-backend || exit 1

# Install project dependencies
npm install

# Continue with other deployment steps if needed
# ...
