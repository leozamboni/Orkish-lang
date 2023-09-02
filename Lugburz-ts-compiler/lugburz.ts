enum Tag {
  shal = 256, ukeav, katu, avhem, ukhow, mubarum, iuk, geav, ro,
  bugd, ukavrucav, ukpliav, 'nauk-gex', agh, brackeav,
  differenav, '.', avrue, lefav, righav, faluke, eiavhas, noav,
  maavch, um, wiavh, leukuk, avhan, greaavas, eluke, 'nauk-peaav', duraumn,
  julavil, ukavarav, 'nauk-avurn', aceukuk, incremenav, enumeraave, conukav,
  filavas, 'nauk-move', juldefinun, avhen, avhrow, concluukion, includeuk,
  'nauk-place',
}
enum InternTag { id = 0, regex, numb, str }
type TypeTag = Tag | InternTag
const ValidExprToken: TypeTag[] = [InternTag.id, InternTag.numb, InternTag.str];
const ValidEndToken: TypeTag[] = [Tag.mubarum, Tag.concluukion];
interface ASTNode {
  tag?: TypeTag | TypeTag[],
  js_code?: string | ((tag?: Tag | InternTag) => string),
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
  obj_block?: boolean,
  inline_obj_acess?: boolean,
  end_without_token?: boolean,
  procedure_args?: boolean,
}
const AST: { [tag: number]: ASTNode } = {
  [Tag.avhrow]: {
    tag: Tag.avhrow,
    js_code: "throw ",
    left: {
      tag: ValidExprToken,
      js_code: "$key;",
    }
  },
  [Tag.conukav]: {
    tag: Tag.conukav,
    js_code: "const ",
    left: {
      tag: InternTag.id,
      js_code: "$key =",
      left: {
        tag: Tag.avhem,
        js_code: '{\n',
        left: {
          obj_block: true,
          left: {
            tag: ValidEndToken,
            js_code: '}\n',
          }
        }
      }
    }
  },
  [Tag.enumeraave]: {
    tag: Tag.enumeraave,
    js_code: "const ",
    left: {
      tag: InternTag.id,
      js_code: "$key =",
      left: {
        tag: Tag.avhem,
        js_code: '{\n',
        left: {
          obj_block: true,
          left: {
            tag: ValidEndToken,
            js_code: '}\n',
          }
        }
      }
    }
  },
  [Tag['nauk-avurn']]: {
    tag: Tag['nauk-avurn'],
    js_code: "return ",
    left: {
      expr: true,
    },
  },
  [Tag.duraumn]: {
    tag: Tag.duraumn,
    js_code: "for ",
    left: {
      tag: Tag.shal,
      js_code: "(let ",
      left: {
        tag: InternTag.id,
        js_code: "$key",
        left: {
          tag: Tag.ukeav,
          js_code: " = ",
          left: {
            tag: InternTag.numb,
            js_code: "$key;",
            left: {
              tag: Tag.julavil,
              js_code: " i < ",
              left: {
                tag: InternTag.numb,
                js_code: "$key; i++)",
                left: {
                  tag: Tag.avhem,
                  js_code: " {\n",
                  left: {
                    block: true,
                    left: {
                      tag: ValidEndToken,
                      js_code: " }\n",
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
    js_code: "while",
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
                tag: ValidEndToken,
                js_code: '\n}\n',
              },
            },
          },
        },
      },
    },
  },
  // [Tag['nauk-peaav']]: {
  //   tag: Tag['nauk-peaav'],
  //   js_code: "while(",
  //   left: {
  //     expr: true,
  //     left: {
  //       tag: Tag.avhem,
  //       js_code: ") {\n",
  //       left: {
  //         block: true,
  //         left: {
  //           tag: ValidEndToken,
  //           js_code: " }\n",
  //         }
  //       }
  //     }
  //   }
  // },
  [Tag.shal]: {
    tag: Tag.shal,
    js_code: "let ",
    left: {
      tag: InternTag.id,
      js_code: "$key",
      left: {
        tag: [Tag.ukeav, Tag.incremenav],
        js_code: (tag) => {
          switch (tag) {
            case Tag.ukeav: return " = "
            case Tag.incremenav: return " += "
          }
          return '$key'
        },
        left: {
          tag: ValidExprToken,
          js_code: "$key",
          left: {
            tag: Tag['.'],
            js_code: ";\n",
          },
          right: {
            tag: Tag.ukpliav,
            js_code: ".split(",
            left: {
              tag: Tag["nauk-gex"],
              js_code: "new RegExp(",
              left: {
                tag: InternTag.regex,
                js_code: "$key))",
                left: {
                  tag: ValidEndToken,
                  end_without_token: true,
                  js_code: ";\n",
                },
                right: {
                  tag: Tag.filavas,
                  left: {
                    tag: Tag["nauk-move"],
                    left: {
                      tag: Tag.juldefinun,
                      js_code: '.filter(e => e)',
                      left: {
                        tag: Tag['.'],
                        end_without_token: true,
                        js_code: ";\n",
                      },
                    }
                  }
                }
              }
            },
          },
          ternary: {
            tag: Tag.aceukuk,
            js_code: '[',
            left: {
              tag: ValidExprToken,
              js_code: '$key',
              left: {
                tag: Tag['.'],
                js_code: '];\n',
              },
              right: {
                tag: ValidEndToken,
                end_without_token: true,
                js_code: "]; ",
              },
              ternary: {
                tag: Tag.avhen,
                js_code: "]; ",
                left: {
                  block: true,
                }
              },
            }
          },
        },
        right: {
          tag: Tag.avhen,
          js_code: "; ",
          left: {
            expr: true,
          }
        },
        ternary: {
          tag: ValidEndToken,
          end_without_token: true,
          js_code: "; ",
        },
        quaternary: {
          tag: Tag.bugd,
          left: {
            tag: InternTag.id,
            js_code: "$key()",
            left: {
              tag: Tag['.'],
              js_code: ";\n",
            },
          }
        },
        quinary: {
          tag: [Tag.faluke, Tag.avrue],
          js_code: (tag) => {
            switch (tag) {
              case Tag.faluke: return "false"
              case Tag.avrue: return "true"
            }
            return '$key'
          },
          left: {
            tag: Tag['.'],
            js_code: ';\n',
          },
        }
      },
      right: {
        tag: Tag['.'],
        js_code: "; ",
      }
    }
  },
  [Tag.ukhow]: {
    tag: Tag.ukhow,
    js_code: "process.stdout.write(",
    left: {
      tag: ValidExprToken,
      js_code: "$key)",
      left: {
        tag: Tag['.'],
        js_code: ';\n',
      },
      right: {
        tag: Tag.avhen,
        js_code: "; ",
        left: {
          block: true
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
        tag: InternTag.id,
        js_code: "$key",
        left: {
          tag: Tag.avhem,
          js_code: "() {\n",
          left: {
            block: true,
            left: {
              tag: ValidEndToken,
              js_code: '\n}\n'
            }
          }
        }
      }
    },
    right: {
      tag: Tag.lefav,
      js_code: '(',
      left: {
        tag: Tag.brackeav,
        left: {
          procedure_args: true,
          left: {
            tag: Tag.righav,
            js_code: ")",
            left: {
              tag: Tag.brackeav,
              left: {
                tag: Tag.avhem,
                js_code: ' {\n',
                left: {
                  block: true,
                  left: {
                    tag: ValidEndToken,
                    js_code: '\n}\n'
                  },
                },
              },
            }
          },
        },
      },
    },
  },
  [Tag.bugd]: {
    tag: Tag.bugd,
    left: {
      tag: InternTag.id,
      js_code: "$key",
      left: {
        tag: Tag['.'],
        js_code: '();\n',
      },
      right: {
        tag: ValidEndToken,
        js_code: '();',
        end_without_token: true,
      },
      ternary: {
        tag: Tag.avhen,
        js_code: "(); ",
        left: {
          block: true,
        }
      },
      quaternary: {
        tag: Tag.lefav,
        js_code: "(",
        left: {
          tag: Tag.brackeav,
          left: {
            procedure_args: true,
            left: {
              tag: Tag.righav,
              js_code: ")",
              left: {
                tag: Tag.brackeav,
                left: {
                  tag: Tag.righav,
                  js_code: ")",
                  left: {
                    tag: Tag.brackeav,
                  }
                },
                right: {
                  tag: Tag.differenav,
                  js_code: " !== ",
                  left: {
                    tag: Tag.ro,
                    left: {
                      expr: true,
                    }
                  }
                },
                ternary: {
                  tag: ValidEndToken,
                  end_without_token: true,
                }
              },
            }
          }
        }
      },
      quinary: {
        tag: Tag.righav,
        js_code: "())",
        left: {
          tag: Tag.brackeav,
        }
      }
    },
  },
  [Tag.ukavrucav]: {
    tag: Tag.ukavrucav,
    js_code: "class ",
    left: {
      tag: InternTag.id,
      js_code: "$key ",
      left: {
        tag: Tag.avhem,
        js_code: '{\n',
        left: {
          var_block: true,
          left: {
            tag: ValidEndToken,
            js_code: '}\n',
          }
        }
      }
    }
  },
  [Tag.ro]: {
    tag: Tag.ro,
    left: {
      tag: InternTag.id,
      js_code: "$key",
      left: {
        inline_obj_acess: true,
        left: {
          tag: Tag.ukeav,
          js_code: " = ",
          left: {
            tag: ValidExprToken,
            js_code: "$key",
            left: {
              tag: Tag['.'],
              js_code: ';\n',
            },
          },
        },
        right: {
          tag: Tag['.'],
          js_code: ';\n',
        }
      }
    }
  },
  [InternTag.str]: {
    tag: InternTag.str,
    js_code: "$key",
    left: {
      tag: Tag.ukpliav,
      js_code: ".split(",
      left: {
        tag: Tag["nauk-gex"],
        js_code: "new RegExp(",
        left: {
          tag: InternTag.regex,
          js_code: "$key))",
          left: {
            tag: Tag['.'],
            js_code: ";\n",
          }
        }
      }
    }
  },
  [InternTag.id]: {
    tag: InternTag.id,
    js_code: "$key",
    left: {
      tag: Tag.ukpliav,
      js_code: ".split(",
      left: {
        tag: Tag["nauk-gex"],
        js_code: "new RegExp(",
        left: {
          tag: InternTag.regex,
          js_code: "$key))",
          left: {
            tag: ValidEndToken,
            end_without_token: true,
            js_code: ";\n",
          }
        }
      },
    },
    right: {
      tag: [Tag.ukeav, Tag.incremenav],
      js_code: (tag) => {
        switch (tag) {
          case Tag.ukeav: return " = "
          case Tag.incremenav: return " += "
        }
        return '$key'
      },
      left: {
        tag: ValidExprToken,
        js_code: "$key",
        left: {
          tag: Tag['.'],
          js_code: ";\n",
        },
        right: {
          tag: Tag.ukpliav,
          js_code: ".split(",
          left: {
            tag: Tag["nauk-gex"],
            js_code: "new RegExp(",
            left: {
              tag: InternTag.regex,
              js_code: "$key))",
              left: {
                tag: ValidEndToken,
                end_without_token: true,
                js_code: ";\n",
              }
            }
          },
        },
        ternary: {
          tag: Tag['nauk-place'],
          js_code: ".replace(",
          left: {
            tag: ValidExprToken,
            js_code: "$key,",
            left: {
              expr: true,
              js_code: ")",
            }
          }
        }
      },
      right: {
        tag: Tag.avhen,
        js_code: "; ",
        left: {
          block: true,
        }
      },
      ternary: {
        tag: ValidEndToken,
        end_without_token: true,
        js_code: "; ",
      },
    },
    ternary: {
      tag: Tag['.'],
      js_code: ';\n',
    },
    quaternary: {
      tag: Tag.aceukuk,
      js_code: '[',
      left: {
        tag: ValidExprToken,
        js_code: '$key',
        left: {
          tag: Tag['.'],
          js_code: '];\n',
        },
        right: {
          tag: ValidEndToken,
          js_code: '];',
        },
        ternary: {
          tag: Tag.eluke,
          end_without_token: true,
          js_code: ']',
        }
      }
    },
    quinary: {
      tag: Tag.includeuk,
      js_code: ".includes",
      left: {
        tag: ValidExprToken,
        js_code: "($key)",
        left: {
          tag: Tag.righav,
          js_code: ") ",
          left: {
            tag: Tag.brackeav,
          }
        },
      }
    },
    senary: {
      tag: Tag.righav,
      js_code: ") ",
      left: {
        tag: Tag.brackeav,
      }
    },
    septenary: {
      tag: [Tag.avhem, Tag.mubarum],
      js_code: ';',
      end_without_token: true,
    },
    octonary: {
      inline_obj_acess: true,
    },
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
      tag: Tag['.'],
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
  [InternTag.numb]: {
    tag: InternTag.numb,
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
      tag: Tag['.'],
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
      tag: Tag['.'],
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
      tag: ValidExprToken,
      js_code: (tag) => {
        switch (tag) {
          case Tag.faluke: return "false"
          case Tag.avrue: return "true"
        }
        return '$key'
      },
      left: {
        tag: Tag['.'],
        js_code: ';\n'
      },
      right: {
        tag: Tag.righav,
        js_code: ") ",
        left: {
          tag: Tag.brackeav,
        }
      },
      ternary: {
        tag: Tag.aceukuk,
        js_code: '[',
        left: {
          tag: ValidExprToken,
          js_code: '$key',
          left: {
            tag: Tag.righav,
            js_code: "]) ",
            left: {
              tag: Tag.brackeav,
            }
          },
        }
      },
      quaternary: {
        inline_obj_acess: true,
        left: {
          tag: Tag.righav,
          js_code: ") ",
          left: {
            tag: Tag.brackeav,
          }
        },
      },

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
                tag: ValidEndToken,
                js_code: '\n}\n',
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
                      tag: ValidEndToken,
                      js_code: '\n}'
                    },
                  }
                }
              },
              ternary: {
                tag: ValidEndToken,
                // end_without_token: true,
                js_code: '\n}\n',
              },
            },
          },
        },
      },
    },
  },
  [Tag.incremenav]: {
    tag: Tag.incremenav,
    js_code: '++',
    left: {
      expr: true,
    }
  }
}
const AST_BLOCK = AST
const AST_EXPR = Object.fromEntries(
  Object.entries(AST)
    .filter(([key, value]) =>
      [Tag.shal, Tag.bugd, Tag.ukhow, Tag.avrue, Tag.faluke, Tag.noav, Tag.lefav, Tag.incremenav,
      InternTag.numb, Tag.bugd, InternTag.id].includes(Number(key))));
const AST_CLASS_BLOCK = Object.fromEntries(
  Object.entries(AST)
    .filter(([key, value]) =>
      [Tag.shal].includes(Number(key))));
class Token {
  key: string;
  tag: TypeTag;
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
    super(k, InternTag.numb);
  }
}
class Str extends Token {
  constructor(k) {
    super(k, InternTag.str);
  }
}
class Regex extends Token {
  constructor(k) {
    super(k, InternTag.regex);
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
      .split(/(\/.*\/)|(".*?")|('.*?')|(\.)|[ \n]+/)
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
    // if (result === '.')
    //   return new Word(result, Tag['.'])
    if (result[0] === "/")
      return new Regex(result)
    if (result[0] === "\"" || result[0] === "'")
      return new Str(result)
    if (Tag[result])
      return new Word(result, Tag[result])
    return new Word(result, InternTag.id)
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
        console.log(this.stdout);

        throw 'SYNTAX ERROR ' + this.syntax_error_token.key
      }
      this.lex_i--;
    }
  }
  private eval_ast(tree: ASTNode | undefined) {
    if (!tree || this.syntax_error_status < 0) return
    if (tree.procedure_args) {
      // while (this.curr_token?.tag === InternTag.id) {
      //   this.code('$key')
      //   this.curr_token = this.lex()
      //   if (this.curr_token?.tag === InternTag.id)
      //     this.code(',')
      // }
      let open = 0
      while (true) {
        let apply = false
        if (this.curr_token?.tag === Tag.bugd) {
          this.curr_token = this.lex()
          apply = true
        }
        this.code('$key')
        if (apply) {
          this.code('()')
          apply = false
        }
        this.curr_token = this.lex()
        if (this.curr_token?.tag === InternTag.id)
          this.code(',')
        if (this.curr_token?.tag === Tag.aceukuk) {
          this.code('[')
          this.curr_token = this.lex()
          let apply = false
          if (this.curr_token?.tag === Tag.bugd) {
            this.curr_token = this.lex()
            apply = true
          }
          this.code('$key')
          if (apply) {
            this.code('()')
            apply = false
          }
          this.curr_token = this.lex()
          this.code(']')
        }
          
        if (this.curr_token?.tag === Tag.lefav) {
          open++;
          this.code('(')
        }
        if (this.curr_token?.tag === Tag.righav) {
          if (open === 0) break
          this.code(')')
          open--;
        }
      }
    }
    else if (tree.inline_obj_acess) {
      while (this.curr_token?.tag === Tag.geav) {
        this.code('.')
        this.curr_token = this.lex()
        if (this.curr_token?.tag === InternTag.id)
          this.code('$key')
        else
          break
        this.curr_token = this.lex()
      }
      if (this.curr_token?.tag !== Tag.righav)
        this.code(';')
    } else if (tree.obj_block) {
      let _enum_val = 0
      while (this.curr_token?.tag && [InternTag.id, InternTag.str].includes(this.curr_token.tag as number)) {
        this.code('$key')
        this.curr_token = this.lex()
        if (this.curr_token?.tag === Tag.ukeav) {
          this.code(': ')
          this.curr_token = this.lex()
          _enum_val = Number(this.curr_token?.key)
          this.code('$key')
          this.curr_token = this.lex()
        } else {
          this.code(': ' + _enum_val)
        }
        _enum_val++;
        this.code(',\n')
      }
    } else if (tree.var_block) {
      while (this.curr_token?.tag && [InternTag.id, InternTag.str].includes(this.curr_token.tag as number)) {
        this.code('$key')
        this.curr_token = this.lex()
        if (this.curr_token?.tag === Tag.ukeav) {
          this.code(' = ')
          this.curr_token = this.lex()
          this.code('$key')
          this.curr_token = this.lex()
        }
        this.code(';\n')
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
      if (tree.js_code)
        this.code(tree.js_code)
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
  private code(code: string | ((tag?: TypeTag) => string)) {
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
    let aux = process.argv[2].replace(/\\n]/, '@newline_regex@]').replace(/(\\r\\n)|(\\n)|(\\r)/gm, " ").replace(/\@newline_regex\@]/g, '\\n]')
    this.compiler.compile(aux)
    console.log(this.compiler.files.stdout)
  }
}

new Lugburz();