const ControlFlow = {
	Break: { type: "break" },
	Continue: { type: "continue" },
	Return: (value) => ({ type: "return", value })
};

module.exports = ControlFlow;