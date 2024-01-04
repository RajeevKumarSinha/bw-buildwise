#!/bin/bash

# Check if NVM is installed
if [ -f ~/.nvm/nvm.sh ]; then
  echo "NVM is already installed"
else
  # Download and install NVM
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  source ~/.nvm/nvm.sh
fi

# Check if Node.js is installed
if command -v node &>/dev/null; then
  echo "Node.js is already installed"
else
  # Install the latest version of Node.js using NVM
  nvm install node

  # Install PM2 globally
  npm install -g pm2
fi

# Check if the working directory exists
DIR="/home/ec2-user/bw-buildwise"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir "${DIR}"
  cd home/ec2-user
  git clone -b main https://github.com/RajeevKumarSinha/bw-buildwise.git
fi
