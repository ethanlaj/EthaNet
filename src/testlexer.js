const readline = require('readline');
const mylexer = require('./mylexer.js');
const fs = require('fs');

const fileStream = fs.createReadStream('input.txt', 'utf8');

const rl = readline.createInterface({
	input: fileStream,
	output: process.stdout,
	prompt: 'ethanet > '
});

rl.prompt();

rl.on('line', (line) => {
	try {
		// Use the parser's parse function directly with the input line
		const result = mylexer.parse(line);
		console.log("Parsed result:", result);
	} catch (error) {
		// Catch and log any parsing errors
		console.error("Parsing error:", error.message);
	}
	rl.prompt();
}).on('close', () => {
	console.log('Exiting ethanet console.');
	process.exit(0);
});
