class Node {
	accept(visitor) {
		throw new Error("Method 'accept()' must be implemented.");
	}
}

class ProgramNode extends Node {
	constructor(statements) {
		super();
		this.statements = statements;
	}

	accept(visitor) {
		visitor.visitProgramNode(this);
	}
}

class VariableDeclarationNode extends Node {
	constructor(identifier, expression) {
		super();
		this.identifier = identifier;
		this.expression = expression;
	}

	accept(visitor) {
		visitor.visitVariableDeclarationNode(this);
	}
}

class BinaryExpressionNode extends Node {
	constructor(left, operator, right) {
		super();
		this.left = left;
		this.operator = operator;
		this.right = right;
	}

	accept(visitor) {
		visitor.visitBinaryExpressionNode(this);
	}
}

class UnaryExpressionNode extends Node {
	constructor(operator, argument) {
		super();
		this.operator = operator;
		this.argument = argument;
	}

	accept(visitor) {
		visitor.visitUnaryExpressionNode(this);
	}
}

class FunctionDeclarationNode extends Node {
	constructor(name, params, body) {
		super();
		this.name = name;
		this.params = params;
		this.body = body;
	}

	accept(visitor) {
		visitor.visitFunctionDeclarationNode(this);
	}
}

class LiteralNode extends Node {
	constructor(value) {
		super();
		this.value = value;
	}

	accept(visitor) {
		visitor.visitLiteralNode(this);
	}
}

class IdentifierNode extends Node {
	constructor(name) {
		super();
		this.name = name;
	}

	accept(visitor) {
		visitor.visitIdentifierNode(this);
	}
}

class BlockStatementNode extends Node {
	constructor(statements) {
		super();
		this.statements = statements;
	}

	accept(visitor) {
		visitor.visitBlockStatementNode(this);
	}
}

class IfStatementNode extends Node {
	constructor(condition, consequent, alternate) {
		super();
		this.condition = condition;
		this.consequent = consequent;
		this.alternate = alternate;
	}

	accept(visitor) {
		visitor.visitIfStatementNode(this);
	}
}

class WhileLoopNode extends Node {
	constructor(condition, body) {
		super();
		this.condition = condition;
		this.body = body;
	}

	accept(visitor) {
		visitor.visitWhileLoopNode(this);
	}
}

class ForLoopNode extends Node {
	constructor(initializer, condition, update, body) {
		super();
		this.initializer = initializer;
		this.condition = condition;
		this.update = update;
		this.body = body;
	}

	accept(visitor) {
		visitor.visitForLoopNode(this);
	}
}

class ArrayAccessNode extends Node {
	constructor(identifier, index) {
		super();
		this.identifier = identifier;
		this.index = index;
	}

	accept(visitor) {
		visitor.visitArrayAccessNode(this);
	}
}

class ReturnStatementNode extends Node {
	constructor(expression) {
		super();
		this.expression = expression;
	}

	accept(visitor) {
		visitor.visitReturnStatementNode(this);
	}
}

class ExpressionStatementNode extends Node {
	constructor(expression) {
		super();
		this.expression = expression;
	}

	accept(visitor) {
		visitor.visitExpressionStatementNode(this);
	}
}

const Operator = {
	Plus: '+',
	Minus: '-',
	Multiply: '*',
	Divide: '/',
	Modulus: '%',
	LessThan: '<',
	GreaterThan: '>',
	LessThanOrEqual: '<=',
	GreaterThanOrEqual: '>=',
	Equal: '==',
	NotEqual: '!=',
	And: '&&',
	Or: '||',
	Not: '!',
	Assignment: '=',
	Increment: '++',
	Decrement: '--',
	UnaryPlus: '+',
	UnaryMinus: '-',
};

class NodeVisitor {
	visitProgramNode(node) {
		console.log("Program:");
		node.statements.forEach(statement => statement.accept(this));
	};

	visitVariableDeclarationNode(node) {
		console.log(`VariableDeclaration: ${node.identifier}`);
		node.expression.accept(this);
	}

	visitBinaryExpressionNode(node) {
		console.log(`BinaryExpression: ${node.operator}`);
		node.left.accept(this);
		node.right.accept(this);
	}

	visitUnaryExpressionNode(node) {
		console.log(`UnaryExpression: ${node.operator}`);
		node.argument.accept(this);
	}

	visitFunctionDeclarationNode(node) {
		console.log(`FunctionDeclaration: ${node.name}`);
		node.params.forEach(param => param.accept(this));
		node.body.accept(this);
	}

	visitLiteralNode(node) {
		console.log(`Literal: ${node.value}`);
	}

	visitIdentifierNode(node) {
		console.log(`Identifier: ${node.name}`);
	}

	visitBlockStatementNode(node) {
		console.log("BlockStatement:");
		node.statements.forEach(statement => statement.accept(this));
	}

	visitIfStatementNode(node) {
		console.log("IfStatement:");
		console.log("Condition:");
		node.condition.accept(this);
		console.log("Consequent:");
		node.consequent.accept(this);
		if (node.alternate) {
			console.log("Alternate:");
			node.alternate.accept(this);
		}
	}

	visitWhileLoopNode(node) {
		console.log("WhileLoop:");
		console.log("Condition:");
		node.condition.accept(this);
		console.log("Body:");
		node.body.accept(this);
	}

	visitForLoopNode(node) {
		console.log("ForLoop:");
		console.log("Initializer:");
		node.initializer.accept(this);
		console.log("Condition:");
		node.condition.accept(this);
		console.log("Update:");
		node.update.accept(this);
		console.log("Body:");
		node.body.accept(this);
	}

	visitArrayAccessNode(node) {
		console.log(`ArrayAccess: ${node.identifier}`);
		console.log("Index:");
		node.index.accept(this);
	}

	visitReturnStatementNode(node) {
		console.log("ReturnStatement:");
		node.expression.accept(this);
	}

	visitExpressionStatementNode(node) {
		console.log("ExpressionStatement:");
		node.expression.accept(this);
	}
}

module.exports = {
	Operator,
	ProgramNode,
	VariableDeclarationNode,
	BinaryExpressionNode,
	FunctionDeclarationNode,
	LiteralNode,
	IdentifierNode,
	BlockStatementNode,
	NodeVisitor,
	IfStatementNode,
	WhileLoopNode,
	ForLoopNode,
	ArrayAccessNode,
	Node,
	ReturnStatementNode,
	ExpressionStatementNode,
	UnaryExpressionNode
};