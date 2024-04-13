const systemFunctions = require('./systemFunctions');

class ExecutionContext {
	constructor(parent = null) {
		this.parent = parent;
		this.variables = {};
		this.functions = {};

		if (parent === null) {
			this.initSystemFunctions();
		}
	}

	assignVariable(name, value) {
		if (name in this.variables) {
			this.variables[name] = value;
		} else if (this.parent !== null) {
			this.parent.assignVariable(name, value);
		} else {
			throw new Error(`Variable ${name} not defined`);
		}
	}

	defineVariable(name, value) {
		if (name in this.variables) {
			throw new Error(`Variable ${name} already defined`);
		}
		this.variables[name] = value;
	}

	defineFunction(name, node) {
		if (name in this.functions) {
			throw new Error(`Function ${name} already defined`);
		}
		this.functions[name] = node;
	}

	getVariable(name) {
		if (name in this.variables) {
			return this.variables[name];
		} else if (this.parent !== null) {
			return this.parent.getVariable(name);
		}

		throw new Error(`Variable ${name} not defined`);
	}

	getFunction(name) {
		if (name in this.functions) {
			return this.functions[name];
		} else if (this.parent !== null) {
			return this.parent.getFunction(name);
		}

		throw new Error(`Function ${name} not defined`);
	}

	initSystemFunctions() {
		Object.entries(systemFunctions).forEach(([name, func]) => {
			this.defineFunction(name, func);
		});
	}
}

module.exports = ExecutionContext;