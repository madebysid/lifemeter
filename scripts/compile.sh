#!/bin/bash

spin()
{
  spinner="⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
  while :
  do
    for i in `seq 0 7`
    do
      echo -en "\010\010\010\010\010\010\010\010\010"
      echo -n "${spinner:$i:1} Working"
      sleep 0.03
    done
  done
}

# Start a progress spinner
clear
spin &
SPIN_PID=$!
trap "kill -9 $SPIN_PID" `seq 0 15`

# Compile TypeScript
tsc

# Copy additional resources
cp -r src/assets build

# Generate the package.json file for the app
cp app.json build
mv build/app.json build/package.json

# All done
clear
echo "✔ Finished"