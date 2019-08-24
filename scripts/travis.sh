#!/bin/bash

set -e

if [ -n "$TRAVIS_TAG" -o "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "Not building for a non branch push - building without deploying."
  npm run docs
  exit 0
fi

echo -e "Building for a branch push - building and deploying."

REPO=$(git config remote.origin.url)
SHA=$(git rev-parse --verify HEAD)

npm test

TARGET_BRANCH="gh-pages"
git clone $REPO out -b $TARGET_BRANCH

rm -rf docs

npm run docs

# mv -f docs/* out
rsync -a docs/ out/

cd out
git add --all .
git config user.name "PiyushBot"
git config user.email "${CM}"
git commit -m "Docs build: ${SHA}" || true
git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH