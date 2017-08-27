#!/bin/bash

API="http://localhost:4741"
URL_PATH="/toggle-admin"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "update": {
      "id": "'"${OTHERID}"'"
    }
  }'

echo
      # "token": "'"${OTHERTOKEN}"'"
