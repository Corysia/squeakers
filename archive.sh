#!/usr/bin/env sh

PROJECT_NAME=$(cat package.json | grep name | awk -F '"' '{print $4}')
# abort on errors
set -e
# navigate up one directory
cd ../
# clean up any old archives
rm -f "$PROJECT_NAME".tar.gz "$PROJECT_NAME".tar
# create a tarball of the project excluding the dist, node_modules, and .git directories
tar --exclude="$PROJECT_NAME/dist" --exclude="$PROJECT_NAME/node_modules" --exclude="$PROJECT_NAME/.git" --exclude="$PROJECT_NAME/.vscode" --exclude="$PROJECT_NAME/.DS_Store" -czf "$PROJECT_NAME".tar.gz "$PROJECT_NAME"
# move the tarball into the project directory
mv "$PROJECT_NAME".tar.gz "$PROJECT_NAME"
cd -