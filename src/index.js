var readline = require('readline');
var parser = require('./parser.js');
const Interpreter = require('./interpreter');
const ExecutionContext = require('./executionContext.js');

const interpreter = new Interpreter(new ExecutionContext());

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// 	prompt: 'ethanet > '
// });

// rl.prompt();

// rl.on('line', (line) => {
// 	try {
// 		var ast = parser.parse(line);
// 		var result = interpreter.visit(ast);
// 		console.log(result);
// 	} catch (e) {
// 		console.error('Error:', e);
// 	}
// 	rl.prompt();
// }).on('close', () => {
// 	console.log('Exiting ethanet console.');
// 	process.exit(0);
// });

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'test.ethan');

// Read the file content
fs.readFile(filePath, 'utf8', (err, source) => {
	if (err) {
		console.error('Error reading the file:', err);
		return;
	}

	try {
		// Parse the entire file content
		const ast = parser.parse(source);
		// Visit the AST and execute
		interpreter.visit(ast);
	} catch (e) {
		console.error('Error:', e);
	}
});