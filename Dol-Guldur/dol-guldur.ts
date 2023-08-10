class Stmt {
  static assign() {}
}
class Scanner {}
class Lexer {
  static line;
}
enum Tag {
  assign = 256,
  numb,
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
