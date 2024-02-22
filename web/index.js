(function () {
	document.addEventListener("DOMContentLoaded", init);

	function init() {
		const sendBtn = document.getElementById('send');
		sendBtn.addEventListener('click', send);
	}

	function send() {
		const input = document.getElementById('input');
		const output = document.getElementById('output');

		const line = input.value;
		console.log(line)
		lexer.setInput(line);

		let result = '';
		while (true) {
			let token = lexer.lex();
			if (token === 1) {
				break;
			}

			result += `Token: ${token}, Value: ${lexer.yytext}<br>`;
		}

		output.innerHTML = result;
	}
})();