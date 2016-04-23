#!/bin/bash

API_JSON=$(printf '{"tag_name": "%s","target_commitish": "master","name": "%s","body": "Release of version %s","draft": false,"prerelease": false}' $CIRCLE_TAG $CIRCLE_TAG $CIRCLE_TAG)
curl --data "$API_JSON" https://api.github.com/repos/zerojuan/electron-circleci-boilerplate/releases?access_token=$GITHUB_AUTH
