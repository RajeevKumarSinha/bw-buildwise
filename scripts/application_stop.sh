#!/bin/bash
echo "Stopping any existing node servers"
pid=$(pgrep node)
if [ -n "$pid" ]; then
    echo "Killing Node.js processes with PID: $pid"
    sudo kill $pid
else
    echo "No Node.js processes found"
fi
