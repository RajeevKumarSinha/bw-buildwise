#!/bin/bash
echo "Executing before install script..."
# Install Node.js
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

# Install project dependencies
cd /var/www/your-backend
npm install
