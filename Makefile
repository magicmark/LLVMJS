node_modules: export GYP_DEFINES = "LLVM_CONFIG=/usr/local/opt/llvm-4.0/bin/llvm-config-4.0"
node_modules: package.json
	yarn

build: node_modules
	./node_modules/.bin/flow status
	./node_modules/.bin/babel src -d lib

compile: build
	node lib/index.js helloworld.js
	llc-4.0 helloworld.bc
	gcc helloworld.s bindings.c -o helloworld
