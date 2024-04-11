const ExecutionContext = require('./executionContext');
const Operator = require('./operator');

class Interpreter {
	constructor(context = null) {
		this.scope = context || new ExecutionContext();
	}

	visit(node) {
		return node.accept(this);
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
		const argument = this.visit(node.argument);

		switch (operator) {
			case Operator.Minus:
				return -argument;
			case Operator.Not:
				return !argument;
			case Operator.Increment:
				return argument++;
			case Operator.Decrement:
				return argument--;
			default:
				throw new Error(`Unrecognized operator ${operator}`);
		}
	}

	visitFunctionDeclarationNode(node) {
		this.scope.defineFunction(node.name, node);
	}

	visitFunctionCallNode(node) {
		const func = this.scope.getFunction(node.callee);
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

	visitLiteralNode(node) {
		return node.value;
	}

	visitIdentifierNode(node) {
		return this.scope.getVariable(node.name);
	}

	visitBlockStatementNode(node) {
		const newScope = new ExecutionContext(this.scope);
		this.scope = newScope;

		node.statements.forEach(statement => this.visit(statement));

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

	}

	visitForLoopNode(node) {

	}

	visitArrayAccessNode(node) {

	}

	visitArrayLiteralNode(node) {

	}

	visitReturnStatementNode(node) {

	}

	visitExpressionStatementNode(node) {
		return this.visit(node.expression);
	}

	visitContinueStatementNode(node) {

	}

	visitBreakStatementNode(node) {

	}

	visitAssignmentStatementNode(node) {
		const value = this.visit(node.right);
		this.scope.assignVariable(node.left, value);
	}
}

module.exports = Interpreter;