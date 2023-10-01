#!/bin/bash

# reads the setup.properties as variables
while IFS='=' read -r key value
do
    if [ -n "$key" ]; then
        declare "$key=$value"
    fi
done < setup.properties

# update dependencies
sudo apt update

# install cURL
sudo apt install -y curl

# setup NodeSource-Repository
curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -

# install Node.js and npm
sudo apt install -y nodejs

# validate setup
node -v
npm -v
