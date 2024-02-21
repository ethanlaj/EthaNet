/* lexical grammar */
%lex
%%

\"(\\.|[^"\\])*\"               return 'STRING_LITERAL';
\'(\\.|[^'\\])*\'               return 'STRING_LITERAL';
\s+                             /* skip whitespace */
//.*                            /* skip single-line comments */
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
"<"                             return 'LESSTHAN'
"<="                            return 'LESSTHANEQUAL'
">"                             return 'GREATERTHAN'
">="                            return 'GREATERTHANEQUAL'
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




//%left 'ADD' 'SUB'
//%left 'MULT' 'DIV'

%start expressions

%% /* language grammar */

expressions
    : STRING_LITERAL
        { console.log("STRING_LITERAL:" + $1); }
    | VAR
        { console.log("VAR:" + $1); }
    | FUNCTION
        { console.log("FUNCTION:" + $1); }
    | FOR
        { console.log("FOR:" + $1); }
    | WHILE
        { console.log("WHILE:" + $1); }
    | BREAK
        { console.log("BREAK:" + $1); }
    | CONTINUE
        { console.log("CONTINUE:" + $1); }
    | RETURN
        { console.log("RETURN:" + $1); }
    | IF
        { console.log("IF:" + $1); }
    | ELSE
        { console.log("ELSE:" + $1); }
    | LBRACE
        { console.log("LBRACE:" + $1); }
    | RBRACE
        { console.log("RBRACE:" + $1); }
    | EQUAL
        { console.log("EQUAL:" + $1); }
    | NOTEQUAL
        { console.log("NOTEQUAL:" + $1); }
    | LESSTHAN
        { console.log("LESSTHAN:" + $1); }
    | LESSTHANEQUAL
        { console.log("LESSTHANEQUAL:" + $1); }
    | GREATERTHAN
        { console.log("GREATERTHAN:" + $1); }
    | GREATERTHANEQUAL
        { console.log("GREATERTHANEQUAL:" + $1); }
    | AND
        { console.log("AND:" + $1); }
    | OR
        { console.log("OR:" + $1); }
    | NOT
        { console.log("NOT:" + $1); }
    | TRUE
        { console.log("TRUE:" + $1); }
    | FALSE
        { console.log("FALSE:" + $1); }
    | NULL
        { console.log("NULL:" + $1); }
    | UNDEFINED
        { console.log("UNDEFINED:" + $1); }
    | IDENTIFIER
        { console.log("IDENTIFIER:" + $1); }
    | ASSIGN
        { console.log("ASSIGN:" + $1); }
    | NUMBER
        { console.log("NUMBER:" + $1); }
    | MULT
        { console.log("MULT:" + $1); }
    | DIV
        { console.log("DIV:" + $1); }
    | DECREMENT
        { console.log("DECREMENT:" + $1); }
    | SUBTRACT
        { console.log("SUBTRACT:" + $1); }
    | INCREMENT
        { console.log("INCREMENT:" + $1); }
    | ADD
        { console.log("ADD:" + $1); }
    | LPAREN
        { console.log("LPAREN:" + $1); }
    | RPAREN
        { console.log("RPAREN:" + $1); }
    | LBRACKET
        { console.log("LBRACKET:" + $1); }
    | RBRACKET
        { console.log("RBRACKET:" + $1); }
    | COMMA
        { console.log("COMMA:" + $1); }
    | SEMI
        { console.log("SEMI:" + $1); }
    | EOF
        { console.log("EOF:" + $1); }
    | INVALID
        { console.log("INVALID:" + $1); }
    ;

/*statement
    : VAR IDENTIFIER ASSIGN e SEMI
        { $$ = {type: 'assignment', identifier: $2, value: $4}; }
    | e SEMI
        { $$ = $1; }
    ;

expressions
    : statement EOF
        { return $1; }
    ;

e
    : e ADD e
        { $$ = $1+$3; }
    | e SUB e
        { $$ = $1-$3; }
    | e MULT e
        { $$ = $1*$3; }
    | e DIV e
        { $$ = $1/$3; }
    | IDENTIFIER INCREMENT
        { $$ = {type: 'increment', identifier: $1}; }
    | IDENTIFIER DECREMENT
        { $$ = {type: 'decrement', identifier: $1}; }
    | NUMBER
        { $$ = Number($1); }
    ;*/