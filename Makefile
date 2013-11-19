SRC = $(wildcard lib/*.js)
REPORTER = spec
COMPONENT = ./node_modules/.bin/component

build: components $(SRC)
	@$(COMPONENT) build --dev -o ./test

components: component.json
	@$(COMPONENT) install --dev

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) ./test/model.js ./test/statics.js

test-phantom: build
	@./node_modules/.bin/mocha-phantomjs ./test/index.html

test-cov: lib-cov
	@FENDJS_MODEL=1 $(MAKE) test REPORTER=html-cov > ./coverage.html
	@rm -rf ./lib-cov

test-coveralls: lib-cov
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@FENDJS_MODEL=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/.bin/coveralls
	@rm -rf ./lib-cov

lib-cov: $(SRC)
	@./node_modules/.bin/jscoverage ./lib ./lib-cov

clean:
	@rm -f ./test/build.js
	@rm -f ./coverage.html


.PHONY: test test-cov test-coveralls lib-cov clean
