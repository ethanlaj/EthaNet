var parser = require('./copiedFromSrc/parser.js');
const Interpreter = require('./copiedFromSrc/interpreter');
const ExecutionContext = require('./copiedFromSrc/executionContext.js');

(function () {
	document.addEventListener("DOMContentLoaded", init);

	function init() {
		const sendBtn = document.getElementById('send');
		sendBtn.addEventListener('click', send);
	}

	function send() {
		const input = document.getElementById('input');
		const output = document.getElementById('output');

		const source = input.value;

		const interpreter = new Interpreter(new ExecutionContext());

		// Override console.log temporarily
		const originalConsoleLog = console.log;
		let logContent = '';

		console.log = function (...messages) {
			logContent += messages.join(' ') + '<br>';
		};

		try {
			const ast = parser.parse(source);
			interpreter.visit(ast);

			output.innerHTML = '';
			output.innerHTML = logContent;
		} catch (e) {
			output.innerHTML = 'Error: ' + e.message;
			return;
		} finally {
			console.log = originalConsoleLog;
		}
	}
})();