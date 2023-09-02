                            Ul mordor orkiukh compilas

ukavarav enumeraave TagEnum avhem 'shal' ukeav 256 'ukeav' 'katu' 'avhem' 'ukhow' 'mubarum' 'iuk' 
'geav' 'ro' 'bugd' 'ukavrucav' 'ukpliav' 'nauk-gex' 'agh' 'str' 'brackeav' 'regex' 'numb' 
'differenav' 'id' 'dot' 'avrue' 'lefav' 'righav' 'faluke' 'eiavhas' 'noav' 'maavch' 'um' 'wiavh' 
'leukuk' 'avhan' 'greaavas' 'eluke' 'nauk-peaav' 'duraumn' 'julavil' 'ukavarav' 'nauk-avurn' 'aceukuk' 
'incremenav' 'enumeraave' mubarum

shal stdout ukeav "". shal stdin ukeav "ukavrucav AST avhem var1 var2 var3 mubarum". shal 
splited ukeav stdin ukpliav nauk-gex /(\/.*\/)|(".*?")|('.*?')|(\.)|[ \n]+/ filavas nauk-move 
juldefinun. shal i ukeav 0.

katu iuk _get_tag lefav brackeav token righav brackeav avhem shal tk_tag ukeav TagEnum aceukuk 
token avhen um lefav brackeav noav tk_tag righav brackeav avhem nauk-avurn TagEnum geav id eluke 
avhem nauk-avurn tk_tag mubarum concluukion

katu iuk _check_token lefav brackeav token expected code righav brackeav avhem um lefav brackeav 
bugd _get_tag lefav brackeav token righav brackeav differenav ro expected righav brackeav avhem 
avhrow "ERROR" eluke avhem um lefav brackeav code righav brackeav avhem nauk-avurn code 
eluke avhem nauk-avurn token mubarum mubarum concluukion

katu iuk _get_token lefav brackeav i righav brackeav avhem um lefav brackeav splited aceukuk
i righav brackeav avhem nauk-avurn splited aceukuk i eluke avhem avhrow "ERROR" mubarum concluukion

katu iuk _out_code lefav brackeav code righav brackeav avhem um lefav brackeav code includeuk "key" 
righav brackeav avhem stdout incremenav code nauk-place "key" splited aceukuk i eluke avhem stdout 
incremenav code mubarum concluukion

katu iuk _increase_index avhem nauk-avurn incremenav i concluukion

katu iuk block avhem nauk-peaav lefav brackeav bugd _get_tag lefav brackeav splited aceukuk bugd 
_increase_index righav brackeav differenav ro TagEnum aceukuk 'mubarum' righav brackeav avhem bugd 
_out_code lefav brackeav bugd _check_token righav brackeav mubarum concluukion

