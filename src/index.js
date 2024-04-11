var readline = require('readline');
var parser = require('./parser.js');
const Interpreter = require('./interpreter');

const interpreter = new Interpreter();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'ethanet > '
});

rl.prompt();

rl.on('line', (line) => {
	try {
		var ast = parser.parse(line);
		var result = interpreter.visit(ast);
		console.log(result);
	} catch (e) {
		console.error('Parse error:', e.message);
	}
	rl.prompt();
}).on('close', () => {
	console.log('Exiting ethanet console.');
	process.exit(0);
});
