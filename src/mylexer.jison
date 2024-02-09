/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"ethan"               return 'MUTABLE'
"ETHAN"               return 'IMMUTABLE'
"="                   return 'ASSIGN'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return 'MULT'
"/"                   return 'DIV'
"-"                   return 'SUBTRACT'
"+"                   return 'ADD'
"("                   return 'LPAREN'
")"                   return 'RPAREN'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start expressions

%% /* language grammar */

expressions
    : // No actual parsing rules, just waiting for EOF
      EOF
        { console.log('End of file reached.'); }
    ;