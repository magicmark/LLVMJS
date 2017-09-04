# Nodes

the functions in here are mostly taken from the llvm tutorial:
https://llvm.org/docs/tutorial/LangImpl07.html

todo: clean these up

## thoughts:
These functions being suffixed with "AST" is confusing to me.
They don't really have anything to do with the source code (flow) AST.
(They are building blocks that call the llvm helper methods to generate llvm code into the current context).

Possibly rename these "blocks"? or whatever the correct term is here?
