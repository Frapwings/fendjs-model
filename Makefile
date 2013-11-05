SRC = $(wildcard lib/*.js)
COMPONENT = ./node_modules/.bin/component

build: components $(SRC)
	@$(COMPONENT) build --dev

components:
	@$(COMPONENT) install --dev

test:
	@node test/server

clean:
	@rm -fr build components

.PHONY: clean test
