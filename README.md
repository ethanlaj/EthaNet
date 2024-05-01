# Ethanet

Welcome to the Ethanet programming language repository. Ethanet is designed to be a simple with some unique features compared to other languages. It was named after the creator, Ethan Lajeunesse.

## Try Ethanet

[Ethanet Web Interface](https://ethanet.ethanlaj.dev)

## Local Development Instructions

1. Clone the repository
1. Run `npm install` to install dependencies
1. In the `src` directory, update the `test.ethan` file with your Ethanet code.
1. Run `npm run dev` from the root directory to run the interpreter.
1. Updates to files in the `src` directory will trigger a re-run of the interpreter.

## Example

The syntax of Ethanet is similar to JavaScript. Here is an example of a simple recursive function to calculate the factorial of a number:

```
// Use the `laj` keyword to define a function
laj factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Use the `ethan` keyword to define a variable
ethan result = factorial(5);
print("The factorial of 5 is " + result);
```

## Language Features

Visit the [Language Features Wiki](https://github.com/ethanlaj/EthaNet/wiki#:~:text=Home-,Language%20Features).

## Language Syntax

Visit the [Language Syntax Guide](https://github.com/ethanlaj/EthaNet/wiki/Language-Syntax-Guide).

## Lexer and Parser with Jison

In the lexical analysis and parsing stages, Ethanet employs Jison, a lexical analyzer and parser generator written in JavaScript. Leveraging regular expressions, Jison effectively tokenizes Ethanet's source code. During parsing, it constructs an Abstract Syntax Tree (AST), which organizes the tokens into a tree structure that represents the hierarchical syntax of the code. This integration ensures a seamless transition from code tokenization to syntax analysis in the compiler process.

For more information, see:

-   [Lexer Generator Wiki](https://github.com/ethanlaj/EthaNet/wiki/Lexer-Generator)
-   [Parser Generator Wiki](https://github.com/ethanlaj/EthaNet/wiki/Parser-Generator)

## Repository Structure

-   `src/`: Contains the source code of Ethanet's interpreter.
-   `web/`: Includes the web interface for Ethanet, which allows users to write and run Ethanet programs in their web browser.
-   `docs/`: Includes necessary documents, such as class presentation slides and project reports.
-   `examples/`: Features example programs written in Ethanet to demonstrate its capabilities.

## License

Ethanet is open-sourced under the MIT license.
