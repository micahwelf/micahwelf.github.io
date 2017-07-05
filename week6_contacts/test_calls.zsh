#!/usr/bin/env zsh

curl -X GET http://localhost:3002/contacts
curl -X GET http://localhost:3002/contacts/_id
curl -X POST http://localhost:3002/contacts/_id
curl -X PUT http://localhost:3002/contacts/_id
curl -X GET http://localhost:3002/contacts/_id
#  // curl -X GET http://localhost:3002/contacts/_id
