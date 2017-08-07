#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "product": {
      "name": "'"${NAME}"'",
      "category": "'"${CATEGORY}"'",
      "price": "'"${PRICE}"'",
      "description": "'"${DESCRIPTION}"'",
      "img_url": "'"${IMG_URL}"'",
      "rating": "'"${RATING}"'"
    }
  }'

echo
