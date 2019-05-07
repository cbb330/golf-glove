#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'Supply a .csv file to target.'
    exit 1
fi

OUTFILE=$1

sqlite3 -header -csv GolfGlove.db "select * from frames;" > $OUTFILE

