install:
	npm install

install-flow-typed:
	npm run flow-typed install

run:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

lint:
	npm run eslint .

check-types:
	npm run flow

test:
	npm test

watch:
	npm test -- --watch

publish:
	npm publish

.PHONY: test