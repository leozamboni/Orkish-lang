const TagEnum = {
    'shal': 256,
    'ukeav': 257,
    'katu': 258,
    'avhem': 259,
    'ukhow': 260,
    'mubarum': 261,
    'iuk': 262,
    'geav': 263,
    'ro': 264,
    'bugd': 265,
    'ukavrucav': 266,
    'ukpliav': 267,
    'nauk-gex': 268,
    'agh': 269,
    'str': 270,
    'brackeav': 271,
    'regex': 272,
    'numb': 273,
    'differenav': 274,
    'id': 275,
    'dot': 276,
    'avrue': 277,
    'lefav': 278,
    'righav': 279,
    'faluke': 280,
    'eiavhas': 281,
    'noav': 282,
    'maavch': 283,
    'um': 284,
    'wiavh': 285,
    'leukuk': 286,
    'avhan': 287,
    'greaavas': 288,
    'eluke': 289,
    'nauk-peaav': 290,
    'duraumn': 291,
    'julavil': 292,
    'ukavarav': 293,
    'nauk-avurn': 294,
    'aceukuk': 295,
    'incremenav': 296,
    'enumeraave': 297,
}

let stdout = ''
let stdin = "ukavrucav AST avhem var1 var2 var3 mubarum";
let splited = stdin.split(/(\/.*\/)|(".*?")|('.*?')|(\.)|[ \n]+/).filter(e => e)
let i = 0;

function _get_tag(token) {
    tk_tag = TagEnum[token]
    if (!tk_tag) return TagEnum.id;
    return tk_tag
}

function _check_token(token, expected, code) {
    if (_get_tag(token) !== expected) {
        throw 'ERROR'
    }
    if (code) return code
    return token
}

function _get_token(i) {
    if (!splited[i]) {
        throw 'ERROR'
    }
    return splited[i]
}

function _out_code(code) {
    if (code.includes('$key')) stdout += code.replace('$key',splited[i])
    else stdout += code
}

function _increase_index() {
    return ++i;
}

function block() {
    while (_get_tag(splited[_increase_index()]) !== TagEnum.mubarum) {
        _out_code(_check_token(_get_token(i), TagEnum.id, '$key\n'))
    }
}

function ukavrucav() {
    _out_code(_check_token(_get_token(i), TagEnum.ukavrucav, 'class '))
    _out_code(_check_token(_get_token(_increase_index()), TagEnum.id))
    _out_code(_check_token(_get_token(_increase_index()), TagEnum.avhem, '{\n'))
    block();
    _out_code(_check_token(_get_token(i), TagEnum.mubarum, '}\n'))
}

console.log(splited);
while (splited[i]) {
    switch (splited[i]) {
        case 'ukavrucav': ukavrucav(); break
        default: break
    }
    i++;
}
console.log(stdout);