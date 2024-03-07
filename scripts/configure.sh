#!/bin/bash
# configure.sh

LOG_FILE="/var/log/cicd.log"

# Example configuration steps
echo "Configuring server..." >> $LOG_FILE

echo pwd >> $LOG_FILE

# build prod and copy to /var/www/html/code-deploy-tester
# cd /home/ec2-user/code-deploy-tester
# npm install
# npm run build
# cp -r /home/ec2-user/code-deploy-tester/build/* /var/www/html/code-deploy-tester

# Add configuration commands here
echo "Configuration completed." >> $LOG_FILE
