#!/bin/bash
# So hard, I am so sad. --From Pun
# this will create a new folder called protos in the backend folder and copy the generated files to the protos folder)
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
 --ts_proto_out=../ \
 --ts_proto_opt=outputServices=grpc-js \
 --ts_proto_opt=esModuleInterop=true \
 -I=src/ src/**/*.proto

cp ../protos/report.ts ./src/protos

cp ../google ./src -r