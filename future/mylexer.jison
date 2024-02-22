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

statement
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
    ;