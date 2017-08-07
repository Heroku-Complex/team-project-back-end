#!/bin/bash

API="http://localhost:4741"
URL_PATH="/orders"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "order": {
      "date_placed": "'"${NAME}"'",
      "products": "'"${PRODUCTS}"'",
      "isOpen": "'"${ISOPEN}"'",
      "user_id": "'"${USER_ID}"'"
    }
  }'

echo
