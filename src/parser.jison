%{
    const { 
        Operator,
        ProgramNode,
        VariableDeclarationNode, 
        BinaryExpressionNode, 
        FunctionDeclarationNode, 
        LiteralNode, 
        IdentifierNode, 
        BlockStatementNode,
        IfStatementNode,
        WhileLoopNode,
        ForLoopNode,
        FunctionCallNode,
        ArrayAccessNode,
        AssignmentStatementNode,
        ReturnStatementNode,
        ExpressionStatementNode,
        UnaryExpressionNode,
        ContinueStatementNode,
        BreakStatementNode,
        ArrayLiteralNode
    } = require('./nodes');
%}

/* lexical grammar */
%lex
%%

\"(\\.|[^"\\])*\"               return 'STRING_LITERAL';
\'(\\.|[^'\\])*\'               return 'STRING_LITERAL';
\s+                             /* skip whitespace */
"//".*							/* skip comments */
"ethan"                         return 'VAR'
"laj"                           return 'FUNCTION'
"for"                           return 'FOR'
"while"                         return 'WHILE'
"break"                         return 'BREAK'
"continue"                      return 'CONTINUE'
"return"                        return 'RETURN'
"if"                            return 'IF'
"else"                          return 'ELSE'
"{"                             return 'LBRACE'
"}"                             return 'RBRACE'
"=="                            return 'EQUAL'
"!="                            return 'NOTEQUAL'
"<="                            return 'LESSTHANEQUAL'
"<"                             return 'LESSTHAN'
">="                            return 'GREATERTHANEQUAL'
">"                             return 'GREATERTHAN'
"&&"                            return 'AND'
"||"                            return 'OR'
"!"                             return 'NOT'
"yes"                           return 'TRUE'
"no"                            return 'FALSE'
"null"                          return 'NULL'
"undefined"                     return 'UNDEFINED'
([a-z]|_)([a-zA-Z]|[0-9])*      return 'IDENTIFIER'
"="                             return 'ASSIGN'
[0-9]+("."[0-9]+)?\b            return 'NUMBER'
"*"                             return 'MULT'
"/"                             return 'DIV'
"%"                             return 'MOD'
"--"                            return 'DECREMENT'
"-"                             return 'SUBTRACT'
"++"                            return 'INCREMENT'
"-+"                            /* Ignore */
"+-"                            /* Ignore */
"+"                             return 'ADD'
"("                             return 'LPAREN'
")"                             return 'RPAREN'
"["                             return 'LBRACKET'
"]"                             return 'RBRACKET'
","                             return 'COMMA'
";"                             return 'SEMI'
<<EOF>>                         return 'EOF'
.                               return 'INVALID'

/lex

%start start

%% /* language grammar in BNF format */

start
    : program
        {return $1;}
    ;

program
	: statement_list
        {$$ = new ProgramNode($1);}
	| statement_list EOF
        {$$ = new ProgramNode($1);}
    ;

statement_list
    : statement
        {$$ = [$1];}
    | statement_list statement
        {$$ = $1.concat([$2]);}
    ;

statement
    : variable_declaration
        {$$ = $1;}
    | assignment_statement
        {$$ = $1;}
    | if_statement
        {$$ = $1;}
    | while_loop
        {$$ = $1;}
    | for_loop
        {$$ = $1;}
    | function_definition
        {$$ = $1;}
	| return_statement
        {$$ = $1;}
    | expression_statement
        {$$ = $1;}
    | continue_statement
        {$$ = $1;}
    | break_statement
        {$$ = $1;}
    ;

array_elements
    : /* empty */
        {$$ = [];}
    | expression_list
        {$$ = $1;}
    ;

expression_list
    : expression
        {$$ = [$1];}
    | expression_list COMMA expression
        {$$ = $1.concat([$3]);}
    ;

continue_statement
    : CONTINUE SEMI
        {$$ = new ContinueStatementNode();}
    ;

break_statement
    : BREAK SEMI
        {$$ = new BreakStatementNode();}
    ;

variable_declaration
    : VAR IDENTIFIER ASSIGN expression SEMI
        {$$ = new VariableDeclarationNode($2, $4);}
    ;

assignment_statement
    : IDENTIFIER ASSIGN expression SEMI
        {$$ = new AssignmentStatementNode($1, $3);}
    ;

return_statement
    : RETURN expression SEMI
        {$$ = new ReturnStatementNode($2);}
    ;

expression_statement
    : expression SEMI
        {$$ = new ExpressionStatementNode($1);}
    ;

if_statement
    : IF LPAREN expression RPAREN block
        {$$ = new IfStatementNode($3, $5, null);}
    | IF LPAREN expression RPAREN block ELSE block
        {$$ = new IfStatementNode($3, $5, $7);}
    | IF LPAREN expression RPAREN block ELSE if_statement
        {$$ = new IfStatementNode($3, $5, $7);}
    ;

while_loop
    : WHILE LPAREN expression RPAREN block
        {$$ = new WhileLoopNode($3, $5);}
    ;

for_loop
    : FOR LPAREN expression_statement expression_statement expression RPAREN block
        {$$ = new ForLoopNode($3, $4, $5, $7);}
    | FOR LPAREN variable_declaration expression_statement expression RPAREN block
        {$$ = new ForLoopNode($3, $4, $5, $7);}
    ;

function_definition
    : FUNCTION IDENTIFIER LPAREN parameters RPAREN block
        {$$ = new FunctionDeclarationNode($2, $4, $6);}
    ;

parameters
    : IDENTIFIER
        {$$ = [$1];}
    | parameters COMMA IDENTIFIER
        {$$ = $1.concat([$3]);}
    ;

block
    : LBRACE statement_list RBRACE
        {$$ = new BlockStatementNode($2);}
    ;

expression
    : logical_expression
        {$$ = $1;}
    | array_expression
        {$$ = $1;}
    ;

array_expression
    : LBRACKET array_elements RBRACKET
        {$$ = new ArrayLiteralNode($2);}
    ;

logical_expression
    : logical_expression AND equality_expression
        {$$ = new BinaryExpressionNode($1, Operator.And, $3);}
    | logical_expression OR equality_expression
        {$$ = new BinaryExpressionNode($1, Operator.Or, $3);}
    | equality_expression
        {$$ = $1;}
    ;

equality_expression
    : equality_expression EQUAL relational_expression
        {$$ = new BinaryExpressionNode($1, Operator.Equal, $3);}
    | equality_expression NOTEQUAL relational_expression
        {$$ = new BinaryExpressionNode($1, Operator.NotEqual, $3);}
    | relational_expression
        {$$ = $1;}
    ;

relational_expression
    : relational_expression LESSTHAN additive_expression
        {$$ = new BinaryExpressionNode($1, Operator.LessThan, $3);}
    | relational_expression LESSTHANEQUAL additive_expression
        {$$ = new BinaryExpressionNode($1, Operator.LessThanOrEqual, $3);}
    | relational_expression GREATERTHAN additive_expression
        {$$ = new BinaryExpressionNode($1, Operator.GreaterThan, $3);}
    | relational_expression GREATERTHANEQUAL additive_expression
        {$$ = new BinaryExpressionNode($1, Operator.GreaterThanOrEqual, $3);}
    | additive_expression
        {$$ = $1;}
    ;

additive_expression
    : additive_expression ADD term
        {$$ = new BinaryExpressionNode($1, Operator.Plus, $3);}
    | additive_expression SUBTRACT term
        {$$ = new BinaryExpressionNode($1, Operator.Minus, $3);}
    | term
        {$$ = $1;}
    ;

term
    : term MULT factor
        {$$ = new BinaryExpressionNode($1, Operator.Multiply, $3);}
    | term DIV factor
        {$$ = new BinaryExpressionNode($1, Operator.Divide, $3);}
    | term MOD factor
        {$$ = new BinaryExpressionNode($1, Operator.Modulus, $3);}
    | factor
        {$$ = $1;}
    ;

factor
    : LPAREN expression RPAREN
        {$$ = $2;}
    | NUMBER
        {$$ = new LiteralNode(Number($1));}
    | STRING_LITERAL
        {$$ = new LiteralNode($1);}
    | TRUE
        {$$ = new LiteralNode(true);}
    | FALSE
        {$$ = new LiteralNode(false);}
    | NOT factor
        {$$ = new UnaryExpressionNode(Operator.Not, $2);}
    | SUBTRACT factor
        {$$ = new UnaryExpressionNode(Operator.Minus, $2);}
    | function_call
        {$$ = $1;}
    | IDENTIFIER
        {$$ = new IdentifierNode($1);}
    | array_access
        {$$ = $1;}
    | increment_expression
        {$$ = $1;}
    | decrement_expression
        {$$ = $1;}
    ;

increment_expression
    : IDENTIFIER INCREMENT
        {$$ = new UnaryExpressionNode(Operator.Increment, new IdentifierNode($1));}
    ;

decrement_expression
    : IDENTIFIER DECREMENT
        {$$ = new UnaryExpressionNode(Operator.Decrement, new IdentifierNode($1));}
    ;

function_call
    : IDENTIFIER LPAREN arguments RPAREN
        {$$ = new FunctionCallNode($1, $3);}
    | IDENTIFIER LPAREN RPAREN
        {$$ = new FunctionCallNode($1, []);}
    ;

arguments
    : expression
        {$$ = [$1];}
    | arguments COMMA expression
        {$$ = $1.concat([$3]);}
    ;

array_access
    : IDENTIFIER LBRACKET expression RBRACKET
        {$$ = new ArrayAccessNode($1, $3);}
    ;