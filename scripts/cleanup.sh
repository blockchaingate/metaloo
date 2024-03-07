#!/bin/bash
# cleanup.sh

LOG_FILE="/var/log/cicd.log"

echo "DNB Official script started." >> $LOG_FILE

# put currect date and  time in log file
current_date=$(date +"%Y-%m-%d")
current_time=$(date +"%H:%M:%S")
echo "DNB Official Cleanup started on $current_date at $current_time" >> $LOG_FILE


# put currect path in log file
echo "$(pwd)" >> $LOG_FILE

# Remove existing files
rm -rf /var/www/test.pay.cool*  >> $LOG_FILE
echo "DNB Official Cleanup completed." >> $LOG_FILE


# nvm
# . ~/.nvm/nvm.sh
# Load NVM
# NVM_DIR="/home/ubuntu/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

