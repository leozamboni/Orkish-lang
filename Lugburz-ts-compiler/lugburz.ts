enum Tag {
  shal = 256, ukeav, katu, avhem, ukhow, mubarum, iuk, geav, ro,
  bugd, ukavrucav, ukpliav, 'nauk-gex', agh, str, brackeav, regex, numb,
  differenav, id, dot, avrue, lefav, righav, faluke, eiavhas, noav,
  maavch, um, wiavh, leukuk, avhan, greaavas, eluke, 'nauk-peaav', duraumn,
  julavil, ukavarav, 'nauk-avurn', 
}
interface ASTNode {
  tag?: Tag | Tag[],
  js_code?: string | ((tag?: Tag) => string),
  left?: ASTNode,
  right?: ASTNode,
  ternary?: ASTNode,
  quaternary?: ASTNode,
  quinary?: ASTNode,
  senary?: ASTNode,
  septenary?: ASTNode,
  octonary?: ASTNode,
  expr?: boolean,
  block?: boolean,
  var_block?: boolean,
  inline_obj_acess?: boolean,
  end_without_token?: boolean,
}
const AST: { [tag: string]: ASTNode } = {
  [Tag['nauk-avurn']]: {
    tag: Tag['nauk-avurn'],
    js_code: "return ",
    left: {
      expr: true,
    }
  },
  [Tag.duraumn]: {
    tag: Tag.duraumn,
    js_code: "for ",
    left: {
      tag: Tag.shal,
      js_code: "(let ",
      left: {
        tag: Tag.id,
        js_code: "$key",
        left: {
          tag: Tag.ukeav,
          js_code: " = ",
          left: {
            tag: Tag.numb,
            js_code: "$key;",
            left: {
              tag: Tag.julavil,
              js_code: " i < ",
              left: {
                tag: Tag.numb,
                js_code: "$key; i++)",
                left: {
                  tag: Tag.avhem,
                  js_code: " {\n",
                  left: {
                    block: true,
                    left: {
                      tag: Tag.mubarum,
                      js_code: "\n}\n",
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  [Tag['nauk-peaav']]: {
    tag: Tag['nauk-peaav'],
    js_code: "while(",
    left: {
      expr: true,
      left: {
        tag: Tag.avhem,
        js_code: ") {\n",
        left: {
          block: true,
          left: {
            tag: Tag.mubarum,
            js_code: "\n}\n",
          }
        }
      }
    }
  },
  [Tag.shal]: {
    tag: Tag.shal,
    js_code: "let ",
    left: {
      tag: Tag.id,
      js_code: "$key",
      left: {
        tag: Tag.ukeav,
        js_code: " = ",
        left: {
          tag: [Tag.numb, Tag.str, Tag.id],
          js_code: "$key",
          left: {
            tag: Tag.dot,
            js_code: ";\n",
          },
          right: {
            tag: Tag.ukpliav,
            js_code: ".split(",
            left: {
              tag: Tag["nauk-gex"],
              js_code: "new RegExp(",
              left: {
                tag: Tag.regex,
                js_code: "$key))",
                left: {
                  tag: Tag.mubarum,
                  end_without_token: true,
                  js_code: ";\n",
                }
              }
            },
          },
        },
        right: {
          tag: Tag.agh,
          js_code: "; ",
          left: {
            expr: true,
          }
        },
        ternary: {
          tag: Tag.mubarum,
          end_without_token: true,
          js_code: "; ",
        }
      },
      right: {
        tag: Tag.dot,
        js_code: "; ",
      }
    }
  },
  [Tag.ukhow]: {
    tag: Tag.ukhow,
    js_code: "process.stdout.write(",
    left: {
      tag: [Tag.numb, Tag.str, Tag.id],
      js_code: "$key)",
      left: {
        tag: Tag.dot,
        js_code: ';\n',
      },
      right: {
        tag: Tag.agh,
        js_code: "; ",
        left: {
          expr: true
        }
      },
      ternary: {
        tag: [Tag.mubarum, Tag.eluke],
        end_without_token: true,
        js_code: "; ",
      }
    }
  },
  [Tag.katu]: {
    tag: Tag.katu,
    js_code: "function ",
    left: {
      tag: Tag.iuk,
      left: {
        tag: Tag.id,
        js_code: "$key() ",
        left: {
          tag: Tag.avhem,
          js_code: "{\n",
          left: {
            block: true,
            left: {
              tag: Tag.mubarum,
              js_code: '\n}\n'
            }
          }
        }
      }
    }
  },
  [Tag.bugd]: {
    tag: Tag.bugd,
    left: {
      tag: Tag.id,
      js_code: "$key()",
      left: {
        tag: Tag.dot,
        js_code: ';\n',
      },
      right: {
        tag: Tag.mubarum,
        js_code: ';',
        end_without_token: true,
      }
    },
  },
  [Tag.ukavrucav]: {
    tag: Tag.ukavrucav,
    js_code: "class ",
    left: {
      tag: Tag.id,
      js_code: "$key ",
      left: {
        tag: Tag.avhem,
        js_code: '{\n',
        left: {
          var_block: true,
          left: {
            tag: Tag.mubarum,
            js_code: '}\n',
          }
        }
      }
    }
  },
  [Tag.ro]: {
    tag: Tag.ro,
    left: {
      tag: Tag.id,
      js_code: "$key",
      left: {
        inline_obj_acess: true,
        left: {
          tag: Tag.ukeav,
          js_code: " = ",
          left: {
            tag: [Tag.numb, Tag.str, Tag.id],
            js_code: "$key",
            left: {
              tag: Tag.dot,
              js_code: ';\n',
            },
          },
        },
        right: {
          tag: Tag.dot,
          js_code: ';\n',
        }
      }
    }
  },
  [Tag.str]: {
    tag: Tag.str,
    js_code: "$key",
    left: {
      tag: Tag.ukpliav,
      js_code: ".split(",
      left: {
        tag: Tag["nauk-gex"],
        js_code: "new RegExp(",
        left: {
          tag: Tag.regex,
          js_code: "$key))",
          left: {
            tag: Tag.dot,
            js_code: ";\n",
          }
        }
      }
    }
  },
  [Tag.id]: {
    tag: Tag.id,
    js_code: "$key",
    left: {
      tag: Tag.ukpliav,
      js_code: ".split(",
      left: {
        tag: Tag["nauk-gex"],
        js_code: "new RegExp(",
        left: {
          tag: Tag.regex,
          js_code: "$key))",
          left: {
            tag: Tag.mubarum,
            end_without_token: true,
            js_code: ";\n",
          }
        }
      },
    },
    right: {
      tag: Tag.ukeav,
      js_code: " = ",
      left: {
        tag: [Tag.numb, Tag.str, Tag.id],
        js_code: "$key",
        left: {
          tag: Tag.dot,
          js_code: ";\n",
        },
        right: {
          tag: Tag.ukpliav,
          js_code: ".split(",
          left: {
            tag: Tag["nauk-gex"],
            js_code: "new RegExp(",
            left: {
              tag: Tag.regex,
              js_code: "$key))",
              left: {
                tag: Tag.mubarum,
                end_without_token: true,
                js_code: ";\n",
              }
            }
          },
        },
      },
      right: {
        tag: Tag.agh,
        js_code: "; ",
        left: {
          expr: true,
        }
      },
      ternary: {
        tag: Tag.mubarum,
        end_without_token: true,
        js_code: "; ",
      }
    },
    ternary: {
      tag: Tag.dot,
      js_code: ';\n',
    }
  },
  [Tag.avrue]: {
    tag: Tag.avrue,
    js_code: 'true',
    left: {
      tag: [Tag.agh, Tag.eiavhas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.agh: return " && "
          case Tag.eiavhas: return " || "
        }
        return ''
      },
      left: {
        expr: true,
      }
    },
    right: {
      tag: Tag.dot,
      js_code: ";\n",
    },
    ternary: {
      tag: Tag.lefav,
      js_code: "(",
      left: {
        tag: Tag.brackeav,
      }
    },
    quaternary: {
      tag: Tag.righav,
      js_code: ")",
      left: {
        tag: Tag.brackeav,
      }
    },
    quinary: {
      tag: Tag.differenav,
      js_code: " !== ",
      left: {
        tag: Tag.ro,
        left: {
          expr: true,
        }
      }
    },
    senary: {
      tag: Tag.maavch,
      js_code: " === ",
      left: {
        tag: Tag.wiavh,
        left: {
          expr: true,
        }
      }
    },
    septenary: {
      tag: [Tag.leukuk, Tag.greaavas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.leukuk: return " < "
          case Tag.greaavas: return " > "
        }
        return ''
      },
      left: {
        tag: Tag.avhan,
        left: {
          expr: true,
        }
      }
    },
    octonary: {
      tag: Tag.avhem,
      end_without_token: true,
    }
  },
  [Tag.numb]: {
    tag: Tag.numb,
    js_code: '$key',
    left: {
      tag: [Tag.agh, Tag.eiavhas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.agh: return " && "
          case Tag.eiavhas: return " || "
        }
        return ''
      },
      left: {
        expr: true,
      }
    },
    right: {
      tag: Tag.dot,
      js_code: ";\n",
    },
    ternary: {
      tag: Tag.lefav,
      js_code: "(",
      left: {
        tag: Tag.brackeav,
      }
    },
    quaternary: {
      tag: Tag.righav,
      js_code: ")",
      left: {
        tag: Tag.brackeav,
      }
    },
    quinary: {
      tag: Tag.differenav,
      js_code: " !== ",
      left: {
        tag: Tag.ro,
        left: {
          expr: true,
        }
      }
    },
    senary: {
      tag: Tag.maavch,
      js_code: " === ",
      left: {
        tag: Tag.wiavh,
        left: {
          expr: true,
        }
      }
    },
    septenary: {
      tag: [Tag.leukuk, Tag.greaavas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.leukuk: return "<"
          case Tag.greaavas: return ">"
        }
        return ''
      },
      left: {
        tag: Tag.avhan,
        left: {
          tag: Tag.eiavhas,
          left: {
            tag: Tag.maavch,
            js_code: '=',
            left: {
              tag: Tag.wiavh,
              left: {
                expr: true,
              }
            }
          }
        },
        right: {
          expr: true,
        }
      }
    },

  },
  [Tag.faluke]: {
    tag: Tag.faluke,
    js_code: 'false',
    left: {
      tag: [Tag.agh, Tag.eiavhas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.agh: return " && "
          case Tag.eiavhas: return " || "
        }
        return ''
      },
      left: {
        expr: true,
      }
    },
    right: {
      tag: Tag.dot,
      js_code: ";\n",
    },
    ternary: {
      tag: Tag.lefav,
      js_code: "(",
      left: {
        tag: Tag.brackeav,
      }
    },
    quaternary: {
      tag: Tag.righav,
      js_code: ") ",
      left: {
        tag: Tag.brackeav,
      }
    },
    quinary: {
      tag: Tag.differenav,
      js_code: " !== ",
      left: {
        tag: Tag.ro,
        left: {
          expr: true,
        }
      }
    },
    senary: {
      tag: Tag.maavch,
      js_code: " === ",
      left: {
        tag: Tag.wiavh,
        left: {
          expr: true,
        }
      }
    },
    septenary: {
      tag: [Tag.leukuk, Tag.greaavas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.leukuk: return " < "
          case Tag.greaavas: return " > "
        }
        return ''
      },
      left: {
        tag: Tag.avhan,
        left: {
          expr: true,
        }
      }
    },
    octonary: {
      tag: Tag.avhem,
      end_without_token: true,
    }
  },
  [Tag.lefav]: {
    tag: Tag.lefav,
    js_code: '(',
    left: {
      tag: Tag.brackeav,
      left: {
        expr: true,
      },
      right: {
        tag: Tag.righav,
        js_code: ') ',
        left: {
          tag: Tag.brackeav,
        }
      }
    },
  },
  [Tag.noav]: {
    tag: Tag.noav,
    js_code: '!',
    left: {
      tag: [Tag.id, Tag.faluke, Tag.avrue],
      js_code: (tag) => {
        switch (tag) {
          case Tag.faluke: return "false"
          case Tag.avrue: return "true"
        }
        return '$key'
      },
      left: {
        tag: Tag.dot,
        js_code: ';\n'
      },
      right: {
        tag: Tag.righav,
        js_code: ") ",
        left: {
          tag: Tag.brackeav,
        }
      }
    },
    right: {
      tag: [Tag.agh, Tag.eiavhas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.agh: return " && "
          case Tag.eiavhas: return " || "
        }
        return ''
      },
      left: {
        expr: true,
      }
    },
    ternary: {
      tag: Tag.differenav,
      js_code: " !== ",
      left: {
        tag: Tag.ro,
        left: {
          expr: true,
        }
      }
    },
    quaternary: {
      tag: Tag.maavch,
      js_code: " === ",
      left: {
        tag: Tag.wiavh,
        left: {
          expr: true,
        }
      }
    },
    septenary: {
      tag: [Tag.leukuk, Tag.greaavas],
      js_code: (tag) => {
        switch (tag) {
          case Tag.leukuk: return " < "
          case Tag.greaavas: return " > "
        }
        return ''
      },
      left: {
        tag: Tag.avhan,
        left: {
          expr: true,
        }
      }
    }
  },
  [Tag.um]: {
    tag: Tag.um,
    js_code: 'if ',
    left: {
      tag: Tag.lefav,
      js_code: '(',
      left: {
        tag: Tag.brackeav,
        left: {
          expr: true,
          right: {
            tag: Tag.avhem,
            js_code: '{\n',
            left: {
              block: true,
              left: {
                tag: Tag.mubarum,
                js_code: '\n}\n'
              },
              right: {
                tag: Tag.eluke,
                js_code: '\n} else',
                left: {
                  tag: Tag.avhem,
                  js_code: ' {\n',
                  left: {
                    block: true,
                    left: {
                      tag: Tag.mubarum,
                      js_code: '\n}\n'
                    },
                  }
                }
              },
            },
          },
        },
      },
    },
  }
}
const AST_BLOCK = AST
const AST_EXPR = Object.fromEntries(
  Object.entries(AST)
    .filter(([key, value]) =>
      ['shal', 'bugd', 'ukhow', 'avrue', 'faluke', 'noav', 'lefav', 'numb', 'bugd', 'id'].includes(Tag[key])));
const AST_CLASS_BLOCK = Object.fromEntries(
  Object.entries(AST)
    .filter(([key, value]) =>
      ['shal'].includes(Tag[key])));
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
  constructor(k) {
    super(k, Tag.numb);
  }
}
class Str extends Token {
  constructor(k) {
    super(k, Tag.str);
  }
}
class Regex extends Token {
  constructor(k) {
    super(k, Tag.regex);
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
      .split(/(\/.*\/+)|(".*?")|[ \n]+|(\.)/)
      .filter(e => e)
    const i = this.splited.findIndex(e => e === 'ukavarav')
    if (i >= 0)
      this.splited = this.splited.slice(i + 1, this.splited.length)
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
    if (parseInt(result))
      return new Numb(result)
    if (result === '.')
      return new Word(result, Tag.dot)
    if (result[0] === "/")
      return new Regex(result)
    if (result[0] === "\"")
      return new Str(result)
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
  private syntax_error_status: number;
  private syntax_error_token: Token
  private syntax_block_level: number;
  constructor(compiler: Compiler) {
    super(compiler)
    this.stdout = ''
  }
  public gen() {
    this.syntax_error_status = 0
    this.syntax_block_level = 0
    this.curr_token = this.parse()
    if (this.curr_token) {
      this.eval_ast(AST[this.curr_token.tag])
      if (this.syntax_error_status > 0) {
        throw 'SYNTAX ERROR ' + this.syntax_error_token.key
      }
      this.lex_i--;
    }
  }
  private eval_ast(tree: ASTNode | undefined) {
    if (!tree || this.syntax_error_status < 0) return
    if (tree.inline_obj_acess) {
      while (this.curr_token?.tag === Tag.geav) {
        this.code('.')
        this.curr_token = this.lex()
        if (this.curr_token?.tag === Tag.id)
          this.code('$key')
        else
          break
        this.curr_token = this.lex()
      }
    } else if (tree.var_block) {
      while (this.curr_token?.tag === Tag.id) {
        this.code('$key;\n')
        this.curr_token = this.lex()
      }
    } else if (tree.block) {
      if (this.curr_token)
        this.eval_ast(AST_BLOCK[this.curr_token.tag])
      if (this.syntax_error_status > 0)
        throw 'SYNTAX ERROR ' + this.syntax_error_token.key + ' SHOULD BE ' + tree.tag
      else
        this.syntax_error_status = 0
    }
    else if (tree.expr) {
      if (this.curr_token)
        this.eval_ast(AST_EXPR[this.curr_token.tag])
      if (this.syntax_error_status > 0)
        throw 'SYNTAX ERROR ' + this.syntax_error_token.key + ' SHOULD BE ' + tree.js_code
      else
        this.syntax_error_status = 0
    }
    else if (Array.isArray(tree.tag)) {
      if (this.curr_token && tree.tag.includes(this.curr_token.tag)) {
        if (tree.tag.includes(Tag.avhem))
          this.syntax_block_level++
        if (tree.js_code)
          this.code(tree.js_code)
        if (this.syntax_block_level && tree.end_without_token)
          this.syntax_block_level--
        else
          this.curr_token = this.lex()
      }
      else {
        if (this.syntax_error_status === 0)
          this.syntax_error_status = 1
        if (this.curr_token)
          this.syntax_error_token = this.curr_token
        return
      }
    } else {
      if (this.curr_token && tree.tag === this.curr_token.tag) {
        if (tree.tag === Tag.avhem)
          this.syntax_block_level++
        if (tree.js_code)
          this.code(tree.js_code)
        if (this.syntax_block_level && tree.end_without_token)
          this.syntax_block_level--
        else
          this.curr_token = this.lex()
      }
      else {
        if (this.syntax_error_status === 0)
          this.syntax_error_status = 1
        if (this.curr_token)
          this.syntax_error_token = this.curr_token
        return
      }
    }
    if (!tree.ternary
      && !tree.left
      && !tree.right
      && !tree.quaternary
      && !tree.quinary
      && !tree.senary
      && !tree.septenary
      && !tree.octonary)
      this.syntax_error_status = -1
    this.eval_ast(tree?.left)
    this.eval_ast(tree?.right)
    this.eval_ast(tree?.ternary)
    this.eval_ast(tree?.quaternary)
    this.eval_ast(tree?.quinary)
    this.eval_ast(tree?.senary)
    this.eval_ast(tree?.septenary)
    this.eval_ast(tree?.octonary)
  }
  private code(code: string | ((tag?: Tag) => string)) {
    let str = ''
    if (typeof code === 'string')
      str = code
    else
      str = code(this.curr_token?.tag)
    if (str.includes('$key'))
      this.stdout += str.replace('$key', this.curr_token?.key ?? '')
    else
      this.stdout += str
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
    this.compiler.compile(process.argv[2].replace(/(\\r\\n|\\n|\\r)/gm, " "))
    console.log(this.compiler.files.stdout)
  }
}

new Lugburz();