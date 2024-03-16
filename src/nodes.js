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
		throw new Error("Method 'visitProgramNode()' must be implemented.");
	};

	visitVariableDeclarationNode(node) {
		throw new Error("Method 'visitVariableDeclarationNode()' must be implemented.");
	}

	visitFunctionDeclarationNode(node) {
		throw new Error("Method 'visitFunctionDeclarationNode()' must be implemented.");
	}

	visitBinaryExpressionNode(node) {
		throw new Error("Method 'visitBinaryExpressionNode()' must be implemented.");
	}

	visitUnaryExpressionNode(node) {
		throw new Error("Method 'visitUnaryExpressionNode()' must be implemented.");
	}

	visitLiteralNode(node) {
		throw new Error("Method 'visitLiteralNode()' must be implemented.");
	}

	visitIdentifierNode(node) {
		throw new Error("Method 'visitIdentifierNode()' must be implemented.");
	}

	visitBlockStatementNode(node) {
		throw new Error("Method 'visitBlockStatementNode()' must be implemented.");
	}

	visitIfStatementNode(node) {
		throw new Error("Method 'visitIfStatementNode()' must be implemented.");
	}

	visitWhileLoopNode(node) {
		throw new Error("Method 'visitWhileLoopNode()' must be implemented.");
	}

	visitForLoopNode(node) {
		throw new Error("Method 'visitForLoopNode()' must be implemented.");
	}

	visitArrayAccessNode(node) {
		throw new Error("Method 'visitArrayAccessNode()' must be implemented.");
	}

	visitReturnStatementNode(node) {
		throw new Error("Method 'visitReturnStatementNode()' must be implemented.");
	}

	visitExpressionStatementNode(node) {
		throw new Error("Method 'visitExpressionStatementNode()' must be implemented.");
	}

	visitUnaryExpressionNode(node) {
		throw new Error("Method 'visitUnaryExpressionNode()' must be implemented.");
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