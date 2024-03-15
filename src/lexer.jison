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

%start program

%% /* language grammar in BNF format */

program
	: statement_list
	| statement_list EOF
    ;

statement_list
    : statement
    | statement_list statement
    ;

statement
    : variable_declaration
    | assignment_statement
    | if_statement
    | while_loop
    | for_loop
    | function_definition
	| return_statement
    | expression_statement
    ;

variable_declaration
    : VAR IDENTIFIER ASSIGN expression SEMI
    ;

assignment_statement
    : IDENTIFIER ASSIGN expression SEMI
    ;

return_statement
    : RETURN expression SEMI
    ;

expression_statement
    : expression SEMI
    ;

if_statement
    : IF LPAREN expression RPAREN block
    | IF LPAREN expression RPAREN block ELSE block
    | IF LPAREN expression RPAREN block ELSE if_statement
    ;

while_loop
    : WHILE LPAREN expression RPAREN block
    ;

for_loop
    : FOR LPAREN expression_statement expression_statement expression RPAREN block
    | FOR LPAREN variable_declaration expression_statement expression RPAREN block
    ;

function_definition
    : FUNCTION IDENTIFIER LPAREN parameters RPAREN block
    ;

parameters
    : IDENTIFIER
    | parameters COMMA IDENTIFIER
    ;

block
    : LBRACE statement_list RBRACE
    ;

expression
    : logical_expression
    ;

logical_expression
    : logical_expression AND equality_expression
    | logical_expression OR equality_expression
    | equality_expression
    ;

equality_expression
    : equality_expression EQUAL relational_expression
    | equality_expression NOTEQUAL relational_expression
    | relational_expression
    ;

relational_expression
    : relational_expression LESSTHAN additive_expression
    | relational_expression LESSTHANEQUAL additive_expression
    | relational_expression GREATERTHAN additive_expression
    | relational_expression GREATERTHANEQUAL additive_expression
    | additive_expression
    ;

additive_expression
    : additive_expression ADD term
    | additive_expression SUBTRACT term
    | term
    ;

term
    : term MULT factor
    | term DIV factor
    | term MOD factor
    | factor
    ;

factor
    : LPAREN expression RPAREN
    | NUMBER
    | STRING_LITERAL
    | function_call
    | IDENTIFIER
    | array_access
    | increment_expression
    | decrement_expression
    ;

increment_expression
    : IDENTIFIER INCREMENT
    ;

decrement_expression
    : IDENTIFIER DECREMENT
    ;

function_call
    : IDENTIFIER LPAREN arguments RPAREN
    | IDENTIFIER LPAREN RPAREN // Functions with no arguments
    ;

arguments
    : expression
    | arguments COMMA expression
    ;

array_access
    : IDENTIFIER LBRACKET expression RBRACKET
    ;