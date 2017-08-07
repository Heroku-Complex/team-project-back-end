#!/bin/sh

API="http://localhost:4741"
URL_PATH="/products"
ID="59887fbc58fa7b1e22d29176"
TOKEN="CApACUQ4T+5if5vY0pkgMvGVHpv/vsmRk8eYgfEIALA=--xYlRvqihTAopLnv80UB608EJg6hvJhIb1Lunzb5yuLE="

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
