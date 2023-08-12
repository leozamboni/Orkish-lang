class Stmt {
  static assign() { }
}
class Lugburz {
  files: Files;
  lexer: Lexer;
  constructor() {
    this.files = new Files()
    this.files.stdin = "let a = \"abc asd as d\";"
    this.lexer = new Lexer(this)
  }
}
class Files {
  stdout: string;
  stderr: string;
  stdin: string;
  constructor() {
    this.stdout = ""
    this.stderr = ""
    this.stdin = ""
  }
}
class ScannerMeta {
  line: number;
  constructor() {
    this.line = 1;
  }
}
class Scanner {
  meta: ScannerMeta;
  splited: string[];
  constructor(files: Files) {
    this.splited = files.stdin.split(/[ ]+/)
    this.meta = new ScannerMeta()
  }
  scan(i: number) {
    if (this.splited[i] === '\n')
      this.meta.line++
    return this.splited[i]
  }
}
class Lexer extends Scanner {
  constructor(compiler: Lugburz) {
    super(compiler.files)
  }
  lex(i: number) {
    return this.scan(i)
  }
}
enum Tag {
  assign = 256,
  numb,
  str,
}
class Token {
  key: string;
  constructor(k) {
    this.key = k;
  }
}
class Word extends Token {
  tag: Tag;
  constructor(k, t) {
    super(k);
    this.tag = t;
  }
}
class Numb extends Token {
  tag: Tag;
  constructor(k) {
    super(k);
    this.tag = Tag.numb;
  }
}
class Str extends Token {
  tag: Tag;
  constructor(k) {
    super(k);
    this.tag = Tag.str;
  }
}

new Lugburz();