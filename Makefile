.PHONY: project
project:
	make build

.PHONY: install
install:
	npm install --prefer-offline --no-audit

.PHONY: test
test:
	./node_modules/.bin/jest --runInBand --passWithNoTests

.PHONY: build
build:
	make tsc
	make docs


.PHONY: docs
docs:
	./node_modules/.bin/docco src/**/*.ts -o docs
	./node_modules/.bin/typedoc --mode modules --out docs/typedoc ./src/**/*.ts

.PHONY: tsc
tsc:
	./node_modules/.bin/tsc --resolveJsonModule -p ./tsconfig.json --outDir ./dist/esm
	./node_modules/.bin/tsc --resolveJsonModule -p ./tsconfig.json --module commonjs --outDir ./dist/cjs

