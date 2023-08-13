enum Tag {
  shal = 256,
  ukeav,
  katu,
  avhem,
  prinav,
  mubarum,
  iuk,
  bugd,
  agh,
  str,
  numb,
  id,
  dot,
}
type _NodeBinary = 'EXPR' | 'BLOCK'
class _Node {
  tag: Tag | Tag[];
  left: _Node | null;
  right: _Node | null;
  js_code: string;
  binary?: _NodeBinary;
  constructor(t, js, l, r, b?) {
    this.tag = t
    this.js_code = js
    this.left = l
    this.right = r
    this.binary = b
  }
}
const AST: { [tag: string]: _Node } = {
  shal: new _Node(
    Tag.shal, "let ",
    new _Node(
      Tag.id, "$key",
      new _Node(
        Tag.ukeav, " = ",
        new _Node(
          [Tag.numb, Tag.str, Tag.id], "$key",
          new _Node(
            Tag.dot, ';\n',
            null,
            null),
          new _Node(
            Tag.agh, "; ",
            new _Node(
              undefined, '',
              null,
              null,
              'EXPR'),
            null)),
        null),
      null),
    null),
  prinav: new _Node(
    Tag.prinav, "process.stdout.write(",
    new _Node(
      [Tag.numb, Tag.str, Tag.id], "$key)",
      new _Node(
        Tag.dot, ';\n',
        null,
        null),
      null),
    null),
  katu: new _Node(
    Tag.katu, "function ",
    new _Node(Tag.iuk, "",
      new _Node(
        Tag.id, "$key() ",
        new _Node(
          Tag.avhem, "{\n",
          new _Node(
            undefined, '',
            new _Node(
              Tag.mubarum, '\n}\n',
              null,
              null,
            ),
            null,
            'BLOCK'),
          null),
        null),
      null),
    null),
  bugd: new _Node(
    Tag.bugd, "",
    new _Node(
      Tag.id, "$key()",
      new _Node(
        Tag.dot, ';\n',
        null,
        null),
      null),
    null),
}
const BLOCK = AST
const EXPR = Object.fromEntries(
  Object.entries(AST)
    .filter(([key, value]) =>
      ['shal', 'bugd', 'prinav'].includes(key)));
class Token {
  key: string;
  tag: Tag
  constructor(k, t) {
    this.key = k;
    this.tag = t
  }
}
class Word extends Token {
  constructor(k, t) {
    super(k, t);
  }
}
class Numb extends Token {
  constructor(k, t) {
    super(k, t);
  }
}
class Str extends Token {
  constructor(k, t) {
    super(k, t);
  }
}
class Files {
  public stdout: string;
  public stderr: string;
  public stdin: string;
  constructor() {
    this.stdout = ""
    this.stderr = ""
    this.stdin = ""
  }
}
class Scanner {
  splited: string[];
  constructor(files: Files) {
    this.splited = files.stdin
      .split(/(".*?")|[ \n]+|(\.)/)
      .filter(e => e)
    console.log(this.splited)
  }
  public scan(i: number) {
    return this.splited[i]
  }
}
class LexerMeta {
  public line: number;
  constructor() {
    this.line = 1;
  }
}
class Lexer extends Scanner {
  public meta: LexerMeta;
  public lex_i: number;
  constructor(compiler: Compiler) {
    super(compiler.files)
    this.meta = new LexerMeta()
    this.lex_i = 0;
  }
  public lex() {
    const result = this.scan(this.lex_i)
    if (!result) return
    if (result === '\n')
      this.meta.line++
    this.lex_i++;
    if (result === '.')
      return new Word(result, Tag.dot)
    if (result[0] === "\"")
      return new Str(result, Tag.str)
    if (Tag[result])
      return new Word(result, Tag[result])
    return new Word(result, Tag.id)
  }
}
class Parser extends Lexer {
  constructor(compiler: Compiler) {
    super(compiler)
  }
  public parse() {
    return this.lex()
  }
}
class CodeGen extends Parser {
  public stdout: string;
  private curr_token: Token | undefined;
  private syntax_error: Token | undefined
  constructor(compiler: Compiler) {
    super(compiler)
    this.stdout = ''
  }
  public gen() {
    this.curr_token = this.parse()
    if (this.curr_token) {
      this.eval_ast(AST[this.curr_token.key])
      if (this.syntax_error) {
        console.log(this.stdout)
        throw 'SYNTAX ERROR ' + this.syntax_error.key
      }
      this.lex_i--;
    }
  }
  private eval_ast(tree: _Node | null) {
    if (!tree) return
    if (tree.binary) {
      if (this.curr_token) {
        switch (tree.binary) {
          case 'EXPR':
            this.eval_ast(EXPR[this.curr_token.key])
            break;
          case 'BLOCK':
            this.eval_ast(BLOCK[this.curr_token.key])
            break;
        }
      }
    }
    else if (Array.isArray(tree.tag)) {
      if (this.curr_token && tree.tag.includes(this.curr_token.tag)) {
        this.syntax_error = undefined
        this.stdout += this.gen_code(tree.js_code)
        this.curr_token = this.lex()
      }
      else {
        this.syntax_error = this.curr_token
      }
    } else {
      if (this.curr_token && tree.tag === this.curr_token.tag) {
        this.syntax_error = undefined
        this.stdout += this.gen_code(tree.js_code)
        this.curr_token = this.lex()
      }
      else {
        this.syntax_error = this.curr_token
      }
    }
    this.eval_ast(tree.left)
    this.eval_ast(tree.right)
  }
  private gen_code(code: string) {
    if (code.includes('$key'))
      return code.replace('$key', this.curr_token?.key ?? '')
    return code
  }
}
class Compiler {
  public files: Files;
  private code_gen: CodeGen;
  constructor() {
    this.files = new Files()
  }
  public compile(stdin: string) {
    this.files.stdin = stdin
    this.code_gen = new CodeGen(this)
    while (this.code_gen.lex_i < this.code_gen.splited.length - 1) {
      this.code_gen.gen()
    }
    this.files.stdout = this.code_gen.stdout
  }
}
class Lugburz {
  private compiler: Compiler;
  constructor() {
    this.compiler = new Compiler();
    this.compiler.compile(`
shal hello ukeav "hello world".

prinav hello.

katu iuk Procedure avhem
shal procedure ukeav "procedure" agh prinav procedure mubarum

bugd Procedure.
    `)
    console.log(this.compiler.files.stdout)
  }
}

new Lugburz();