#!/bin/bash

# Give permission for everything in the buildwise-app directory
sudo chmod -R 777 /home/ec2-user/bw-buildwise

# Navigate into our working directory where we have all our GitHub files
cd /home/ec2-user/buildwise-app

# Add npm and node to the path
git pull origin main

# Install Node modules
npm install

echo "Current Directory: $(pwd)"

# Check if the server is already running with PM2
if pm2 pid server.js >/dev/null; then
    # Server is running, restart it
    pm2 restart server.js
else
    # Server is not running, start it
    pm2 start server.js

fi

# Save the PM2 process list for persistence across reboots
pm2 save
