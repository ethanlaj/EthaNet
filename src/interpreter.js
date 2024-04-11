const ExecutionContext = require('./executionContext');
const Operator = require('./operator');

class Interpreter {
	constructor() {
		this.globalScope = new ExecutionContext();
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
	}

	visitFunctionDeclarationNode(node) {
	}

	visitFunctionCallNode(node) {
	}

	visitLiteralNode(node) {
		return node.value;
	}

	visitIdentifierNode(node) {

	}

	visitBlockStatementNode(node) {

	}

	visitIfStatementNode(node) {

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
	}
}

module.exports = Interpreter;