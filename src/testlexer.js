var fs = require('fs');
var readline = require('readline');
var JisonLex = require('jison-lex');

var grammar = fs.readFileSync('lexer.jisonlex', 'utf8');
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