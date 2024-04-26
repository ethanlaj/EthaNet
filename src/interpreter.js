const ExecutionContext = require('./executionContext');
const Operator = require('./operator');
const ControlFlow = require('./controlFlow');
const { IdentifierNode } = require('./nodes');

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
			console.log(node.args);
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
			const result = this.visit(func.body);
			this.scope = this.scope.parent;
			return result;
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

		for (let statement of node.statements) {
			const result = this.visit(statement);
			if (result?.type === "continue" || result?.type === "break") {
				this.scope = this.scope.parent;
				return result;
			}

			if (result?.type === "return") {
				this.scope = this.scope.parent;
				return result.value;
			}
		}

		this.scope = this.scope.parent;
	}

	visitIfStatementNode(node) {
		if (this.visit(node.condition)) {
			this.visit(node.consequent);
		} else if (node.alternate) {
			this.visit(node.alternate);
		}
	}

	visitWhileLoopNode(node) {
		while (true) {
			const conditionResult = this.visit(node.condition);
			if (!conditionResult) break;

			const bodyResult = this.visit(node.body);
			if (bodyResult === ControlFlow.Break) {
				break;
			} else if (bodyResult === ControlFlow.Continue) {
				continue;
			}
		}
	}

	visitForLoopNode(node) {
		this.visit(node.initializer);

		while (true) {
			const conditionResult = this.visit(node.condition);
			if (!conditionResult) break;

			const bodyResult = this.visit(node.body);
			if (bodyResult === ControlFlow.Break) {
				break;
			}

			this.visit(node.update);

			if (bodyResult === ControlFlow.Continue) {
				continue;
			}
		}
	}

	visitArrayAccessNode(node) {
		const array = this.scope.getVariable(node.identifier);

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