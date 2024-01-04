#!/bin/bash

# Give permission for everything in the buildwise-app directory
sudo chmod -R 777 /home/ec2-user/bw-buildwise

# Navigate into our working directory where we have all our GitHub files
cd /home/ec2-user/bw-buildwise

# Add npm and node to the path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

git pull origin main

# Install Node modules
npm install

# Install PM2 globally
npm install -g pm2

# Check if the server is already running with PM2
if pm2 pid server.js >/dev/null; then
    # Server is running, restart it
    pm2 restart server.js
else
    # Server is not running, start it
    pm2 start server.js --output app.out.log --error app.err.log --merge-logs
fi

# Save the PM2 process list for persistence across reboots
pm2 save
