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

clear
spin &
SPIN_PID=$!
trap "kill -9 $SPIN_PID" `seq 0 15`

tsc
cp src/index.html dist

echo -en "\010\010\010\010\010\010\010\010\010"
echo "✔ Finished"