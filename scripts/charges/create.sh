#!/bin/bash

# API="http://localhost:4741"
# URL_PATH="/charges"
#
# curl "${API}${URL_PATH}" \
#   --include \
#   --request POST \
#   --header "Content-Type: application/json" \
#   --header "Authorization: Token token=${TOKEN}" \
#   --data '{
#     "charge": {
#       "stripeToken": "tok_1AobzGK3WDkemAFRIdEQCIgS",
#       "amount": "500",
#       "currency": "usd",
#       "description": "Foo",
#       "_owner": "5989bf84d70fbb149bdeb27f"
#     }
#   }'

# echo
# API="http://localhost:4741"
# URL_PATH="/charges"
#
# curl "${API}${URL_PATH}" \
#   --include \
#   --request POST \
#   --header "Content-Type: application/json" \
#   --header "Authorization: Token token=${TOKEN}" \
#   --data '{
#     "charge": {
#       "stripeToken": "'"${STOKEN}"'",
#       "amount": "'"${AMOUNT}"'",
#       "currency": "'"${CUR}"'",
#       "description": "'"${DESCRP}"'",
#       "_owner": "'"${ID}"'"
#     }
#   }'
#
# echo

curl https://api.stripe.com/v1/charges \
   -u sk_test_SJ6aCNdbEfjzHEwiZNsJPJmF: \
   -d amount=1000 \
   -d currency=usd \
   -d description="Example charge" \
   -d source=tok_1AobzGK3WDkemAFRIdEQCIgS
