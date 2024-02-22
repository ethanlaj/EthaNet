var fs = require('fs');
var readline = require('readline');
var path = require('path');
var JisonLex = require('jison-lex');

var grammarPath = path.join(__dirname, 'lexer.jisonlex');
var grammar = fs.readFileSync(grammarPath, 'utf8');
var lexer = new JisonLex(grammar);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'ethanet > '
});

rl.prompt();

rl.on('line', (line) => {
	lexer.setInput(line);

	let token;
	while (true) {
		token = lexer.lex();
		if (token === 1) {
			break;
		}

		console.log({ token, value: lexer.yytext });
	}

	rl.prompt();
}).on('close', () => {
	console.log('Exiting ethanet console.');
	process.exit(0);
});