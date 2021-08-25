#! /bin/bash

SITE_PATH='/var/wanyijizi'

cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master

