install:
	npm install

run:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

lint:
	npm run eslint .

test:
	npm test

publish:
	npm publish

.PHONY: test