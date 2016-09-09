#!/bin/bash
set -e

files=`git diff --name-only HEAD^`

for file in $files; do
  if [[ $file =~ ^answers\/([0-9]+)\/.*\.js$ ]] ; then
    cp $file ./answer.js
    node tests/${BASH_REMATCH[1]}.js
  fi
done

exit 0
