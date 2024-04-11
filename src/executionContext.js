class ExecutionContext {
	constructor(parent = null) {
		this.parent = parent;
		this.variables = {};
	}

	defineVariable(name, value) {
		this.variables[name] = value;
	}

	getVariable(name) {
		if (name in this.variables) {
			return this.variables[name];
		} else if (this.parent !== null) {
			return this.parent.getVariable(name);
		}

		throw new Error(`Variable ${name} not defined`);
	}
}

module.exports = ExecutionContext;