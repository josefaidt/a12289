#!/usr/bin/env sh

# ensure dependencies are up to date
pnpm install --frozen-lockfile
# ensure amplify resources can build properly
amplify build
# run api gql-compile ('build' should do this, see https://github.com/aws-amplify/amplify-category-api/issues/1246)
amplify api gql-compile