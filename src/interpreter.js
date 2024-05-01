const ExecutionContext = require('./executionContext');
const Operator = require('./operator');
const ControlFlow = require('./controlFlow');
const { IdentifierNode, ArrayAccessNode } = require('./nodes');

class Interpreter {
	constructor(context = null) {
		this.scope = context || new ExecutionContext();
	}

	visit(node) {
		return node?.accept(this);
	}

	visitProgramNode(node) {
		let result = null;

		for (const statement of node.statements) {
			result = this.visit(statement);
			if (result?.type === "return") {
				return result.value;
			}
		}

		return result;
	}

	visitVariableDeclarationNode(node) {
		const identifier = node.identifier;
		const value = this.visit(node.expression);

		this.scope.defineVariable(identifier, value);
	}

	visitBinaryExpressionNode(node) {
		const left = this.visit(node.left);
		const right = this.visit(node.right);

		if (node.left instanceof IdentifierNode) {
			const variableName = node.left.name;

			// Put operators here that absolutely require a variable on the left

			switch (node.operator) {
				case Operator.AddEqual:
					return this.scope.assignVariable(variableName, left + right);
				case Operator.SubtractEqual:
					return this.scope.assignVariable(variableName, left - right);
				case Operator.MultiplyEqual:
					return this.scope.assignVariable(variableName, left * right);
				case Operator.DivideEqual:
					return this.scope.assignVariable(variableName, left / right);
				case Operator.ModulusEqual:
					return this.scope.assignVariable(variableName, left % right);
				default:
					// Continue with next switch block
					// Could be comparing two variables
					break;
			}
		}


		switch (node.operator) {
			case Operator.Plus:
				return left + right;
			case Operator.Minus:
				return left - right;
			case Operator.Multiply:
				return left * right;
			case Operator.Divide:
				return left / right;
			case Operator.And:
				return left && right;
			case Operator.Or:
				return left || right;
			case Operator.Equal:
				return left === right;
			case Operator.NotEqual:
				return left !== right;
			case Operator.ApproxEqual:
				const sigFig = Math.pow(10, Math.floor(Math.log10(Math.abs(left))) - 1);
				return Math.abs(left - right) <= sigFig;
			case Operator.LessThan:
				return left < right;
			case Operator.LessThanOrEqual:
				return left <= right;
			case Operator.GreaterThan:
				return left > right;
			case Operator.GreaterThanOrEqual:
				return left >= right;
			case Operator.Modulus:
				return left % right;
			default:
				throw new Error(`Unrecognized operator ${node.operator}`);
		}
	}

	visitUnaryExpressionNode(node) {
		const operator = node.operator;

		// Handle increment and decrement operators
		if (node.argument instanceof IdentifierNode) {
			const variable = this.scope.getVariable(node.argument.name);

			if (operator === Operator.Increment) {
				return this.scope.assignVariable(node.argument.name, variable + 1);
			} else if (operator === Operator.Decrement) {
				return this.scope.assignVariable(node.argument.name, variable - 1);
			}
		}

		const argument = this.visit(node.argument);

		switch (operator) {
			case Operator.Minus:
				return -argument;
			case Operator.Not:
				return !argument;
			default:
				throw new Error(`Unrecognized operator ${operator}`);
		}
	}

	visitFunctionDeclarationNode(node) {
		this.scope.defineFunction(node.name, node);
	}

	visitFunctionCallNode(node) {
		const func = this.scope.getFunction(node.callee);

		if (typeof func === 'function') {
			return func(...node.args.map(arg => this.visit(arg)));
		} else {
			const newScope = new ExecutionContext(this.scope);

			for (let i = 0; i < node.args.length; i++) {
				const arg = node.args[i];
				const param = func.params[i];
				const value = this.visit(arg);
				newScope.defineVariable(param, value);
			}

			this.scope = newScope;
			try {
				const result = this.visit(func.body);
				if (result?.type === 'return') {
					return result.value;
				}
			} finally {
				this.scope = this.scope.parent;
			}
		}
	}

	visitLiteralNode(node) {
		return node.value;
	}

	visitIdentifierNode(node) {
		return this.scope.getVariable(node.name);
	}

	visitBlockStatementNode(node) {
		const newScope = new ExecutionContext(this.scope);
		this.scope = newScope;

		try {
			for (let statement of node.statements) {
				const result = this.visit(statement);
				if (result?.type === "continue" || result?.type === "break" || result?.type === "return") {
					return result;
				}
			}
		} finally {
			this.scope = this.scope.parent;
		}
	}

	visitIfStatementNode(node) {
		if (this.visit(node.condition)) {
			return this.visit(node.consequent);
		} else if (node.alternate) {
			return this.visit(node.alternate);
		}
	}

	visitWhileLoopNode(node) {
		loop:
		while (true) {
			const conditionResult = this.visit(node.condition);
			if (!conditionResult) break loop;

			const bodyResult = this.visit(node.body);
			switch (bodyResult?.type) {
				case 'break':
					break loop;
				case 'continue':
					continue loop;
				case 'return':
					return bodyResult;
			}
		}
	}

	visitForLoopNode(node) {
		this.visit(node.initializer);

		loop:
		while (true) {
			const conditionResult = this.visit(node.condition);
			if (!conditionResult) break;

			const bodyResult = this.visit(node.body);
			switch (bodyResult?.type) {
				case 'break':
					break loop;
				case 'continue':
					this.visit(node.update);
					continue loop;
				case 'return':
					return bodyResult;
			}

			this.visit(node.update);
		}
	}

	visitArrayAccessNode(node) {
		let array;
		if (node.identifier instanceof ArrayAccessNode) {
			array = this.visit(node.identifier);
		} else {
			array = this.scope.getVariable(node.identifier);
		}

		if (!Array.isArray(array)) {
			throw new Error(`${node.identifier} is not an array`);
		}
		const index = this.visit(node.index);

		return array[index];
	}

	visitArrayLiteralNode(node) {
		return node.elements.map(element => this.visit(element));
	}

	visitReturnStatementNode(node) {
		return ControlFlow.Return(this.visit(node.expression));
	}

	visitExpressionStatementNode(node) {
		return this.visit(node.expression);
	}

	visitContinueStatementNode(node) {
		return ControlFlow.Continue;
	}

	visitBreakStatementNode(node) {
		return ControlFlow.Break;
	}

	visitAssignmentStatementNode(node) {
		const value = this.visit(node.right);
		this.scope.assignVariable(node.left, value);
	}
}

module.exports = Interpreter;