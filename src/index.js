var readline = require('readline');
var parser = require('./parser.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'ethanet > '
});

rl.prompt();

rl.on('line', (line) => {
	try {
		var output = parser.parse(line);
		console.log(JSON.stringify(output, null, 2));
	} catch (e) {
		console.error('Parse error:', e.message);
	}
	rl.prompt();
}).on('close', () => {
	console.log('Exiting ethanet console.');
	process.exit(0);
});
