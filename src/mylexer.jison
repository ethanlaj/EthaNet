/* lexical grammar */
%lex
%%

\s+                             /* skip whitespace */
"ethan"                         return 'VAR'
([a-z]|_)([a-z]|[A-Z]|[0-9])*   return 'IDENTIFIER'
"="                             return 'ASSIGN'
[0-9]+("."[0-9]+)?\b            return 'NUMBER'
"*"                             return 'MULT'
"/"                             return 'DIV'
"--"                            return 'DECREMENT'
"-"                             return 'SUBTRACT'
"++"                            return 'INCREMENT'
"+"                             return 'ADD'
"("                             return 'LPAREN'
")"                             return 'RPAREN'
";"                             return 'SEMI'
<<EOF>>                         return 'EOF'
.                               return 'INVALID'

/lex

%left 'ADD' 'SUB'
%left 'MULT' 'DIV'

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
    | NUMBER
        { $$ = Number($1); }
    ;