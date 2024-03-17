var parser = require('./parser.js');
var JSONFormatter = require('json-formatter-js');

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

		var parserOutput;
		try {
			parserOutput = parser.parse(line);
		} catch (e) {
			output.innerHTML = 'Parse error: ' + e.message;
			return;
		}

		console.log({ parserOutput })

		output.innerHTML = '';
		output.appendChild(new JSONFormatter(parserOutput, Infinity).render());
	}
})();