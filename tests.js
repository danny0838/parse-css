"use strict";
(function (global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS/Node.js
    exports.TESTS = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // browser global
    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    global.TESTS = factory();
  }
}(this, function () {

const r = String.raw;

return [
  // preprocess()
  {
    parser: "",
    css: `\u{20000},\u{0},\uD800,\uDFFF`,
    expected: [
      {TYPE: "IDENT", value: "\u{20000}"},
      {TYPE: "COMMA"},
      {TYPE: "IDENT", value: "\uFFFD"},
      {TYPE: "COMMA"},
      {TYPE: "IDENT", value: "\uFFFD"},
      {TYPE: "COMMA"},
      {TYPE: "IDENT", value: "\uFFFD"},
      {TYPE: "EOF"},
    ]
  },

  // tokenize()

  // -- SingleCharacterTokens
  {
    parser: "",
    css: "(",
    expected: [{TYPE: "OPEN-PAREN"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ")",
    expected: [{TYPE: "CLOSE-PAREN"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "[",
    expected: [{TYPE: "OPEN-SQUARE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "]",
    expected: [{TYPE: "CLOSE-SQUARE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ",",
    expected: [{TYPE: "COMMA"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ":",
    expected: [{TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ";",
    expected: [{TYPE: "SEMICOLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ")[",
    expected: [{TYPE: "CLOSE-PAREN"}, {TYPE: "OPEN-SQUARE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "[)",
    expected: [{TYPE: "OPEN-SQUARE"}, {TYPE: "CLOSE-PAREN"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "{}",
    expected: [{TYPE: "OPEN-CURLY"}, {TYPE: "CLOSE-CURLY"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ",,",
    expected: [{TYPE: "COMMA"}, {TYPE: "COMMA"}, {TYPE: "EOF"}],
  },

  // -- MultipleCharacterTokens
  {
    parser: "",
    css: "~=",
    expected: [{TYPE: "DELIM", value: '~'}, {TYPE: "DELIM", value: '='}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "|=",
    expected: [{TYPE: "DELIM", value: '|'}, {TYPE: "DELIM", value: '='}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "^=",
    expected: [{TYPE: "DELIM", value: '^'}, {TYPE: "DELIM", value: '='}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "$=",
    expected: [{TYPE: "DELIM", value: '$'}, {TYPE: "DELIM", value: '='}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "*=",
    expected: [{TYPE: "DELIM", value: '*'}, {TYPE: "DELIM", value: '='}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "||",
    expected: [{TYPE: "DELIM", value: '|'}, {TYPE: "DELIM", value: '|'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "|||",
    expected: [{TYPE: "DELIM", value: '|'}, {TYPE: "DELIM", value: '|'}, {TYPE: "DELIM", value: '|'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "<!--",
    expected: [{TYPE: "CDO"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "<!---",
    expected: [{TYPE: "CDO"}, {TYPE: "DELIM", value: '-'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-->",
    expected: [{TYPE: "CDC"}, {TYPE: "EOF"}],
  },

  // -- DelimiterToken
  {
    parser: "",
    css: "^",
    expected: [{TYPE: "DELIM", value: '^'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "*",
    expected: [{TYPE: "DELIM", value: '*'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "%",
    expected: [{TYPE: "DELIM", value: '%'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "~",
    expected: [{TYPE: "DELIM", value: '~'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "&",
    expected: [{TYPE: "DELIM", value: '&'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "|",
    expected: [{TYPE: "DELIM", value: '|'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\x7f",
    expected: [{TYPE: "DELIM", value: '\x7f'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\x01",
    expected: [{TYPE: "DELIM", value: '\x01'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "~-",
    expected: [{TYPE: "DELIM", value: '~'}, {TYPE: "DELIM", value: '-'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "^|",
    expected: [{TYPE: "DELIM", value: '^'}, {TYPE: "DELIM", value: '|'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "$~",
    expected: [{TYPE: "DELIM", value: '$'}, {TYPE: "DELIM", value: '~'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "*^",
    expected: [{TYPE: "DELIM", value: '*'}, {TYPE: "DELIM", value: '^'}, {TYPE: "EOF"}],
  },

  // -- WhitespaceTokens
  {
    parser: "",
    css: "   ",
    expected: [{TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\n\rS",
    expected: [{TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "S"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "   *",
    expected: [{TYPE: "WHITESPACE"}, {TYPE: "DELIM", value: '*'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\r\n\f\t2",
    expected: [{TYPE: "WHITESPACE"}, {TYPE: "NUMBER", value: 2, type: "integer"}, {TYPE: "EOF"}],
  },

  // -- Escapes
  {
    parser: "",
    css: "hel\\6Co",
    expected: [{TYPE: "IDENT", value: "hello"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\26 B",
    expected: [{TYPE: "IDENT", value: "&B"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'hel\\6c o'",
    expected: [{TYPE: "STRING", value: "hello"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'spac\\65\r\ns'",
    expected: [{TYPE: "STRING", value: "spaces"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "spac\\65\r\ns",
    expected: [{TYPE: "IDENT", value: "spaces"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "spac\\65\n\rs",
    expected: [{TYPE: "IDENT", value: "space"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "s"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "sp\\61\tc\\65\fs",
    expected: [{TYPE: "IDENT", value: "spaces"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "hel\\6c  o",
    expected: [{TYPE: "IDENT", value: "hell"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "o"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "test\\\n",
    expected: [{TYPE: "IDENT", value: "test"}, {TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "test\\D799",
    expected: [{TYPE: "IDENT", value: "test\uD799"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\E000",
    expected: [{TYPE: "IDENT", value: "\uE000"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "te\\s\\t",
    expected: [{TYPE: "IDENT", value: "test"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "spaces\\ in\\\tident",
    expected: [{TYPE: "IDENT", value: "spaces in\tident"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\.\\,\\:\\!",
    expected: [{TYPE: "IDENT", value: ".,:!"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\\r",
    expected: [{TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\\f",
    expected: [{TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\\r\n",
    expected: [{TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "null\\\0",
    expected: [{TYPE: "IDENT", value: "null\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "null\\\0\0",
    expected: [{TYPE: "IDENT", value: "null\uFFFD\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "null\\0",
    expected: [{TYPE: "IDENT", value: "null\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "null\\0000",
    expected: [{TYPE: "IDENT", value: "null\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "large\\110000",
    expected: [{TYPE: "IDENT", value: "large\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "large\\23456a",
    expected: [{TYPE: "IDENT", value: "large\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "surrogate\\D800",
    expected: [{TYPE: "IDENT", value: "surrogate\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "surrogate\\0DABC",
    expected: [{TYPE: "IDENT", value: "surrogate\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\00DFFFsurrogate",
    expected: [{TYPE: "IDENT", value: "\uFFFDsurrogate"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\10fFfF",
    expected: [{TYPE: "IDENT", value: "\u{10ffff}"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\10fFfF0",
    expected: [{TYPE: "IDENT", value: "\u{10ffff}0"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\\10000000",
    expected: [{TYPE: "IDENT", value: "\u{100000}00"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "eof\\",
    expected: [{TYPE: "IDENT", value: "eof\uFFFD"}, {TYPE: "EOF"}],
  },

  // -- IdentToken
  {
    parser: "",
    css: "simple-ident",
    expected: [{TYPE: "IDENT", value: "simple-ident"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "testing123",
    expected: [{TYPE: "IDENT", value: "testing123"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "hello!",
    expected: [{TYPE: "IDENT", value: "hello"}, {TYPE: "DELIM", value: '!'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "world\x05",
    expected: [{TYPE: "IDENT", value: "world"}, {TYPE: "DELIM", value: '\x05'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "_under score",
    expected: [{TYPE: "IDENT", value: "_under"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "score"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-_underscore",
    expected: [{TYPE: "IDENT", value: "-_underscore"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-text",
    expected: [{TYPE: "IDENT", value: "-text"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-\\6d",
    expected: [{TYPE: "IDENT", value: "-m"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "--abc",
    expected: [{TYPE: "IDENT", value: "--abc"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "--",
    expected: [{TYPE: "IDENT", value: "--"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "--11",
    expected: [{TYPE: "IDENT", value: "--11"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "---",
    expected: [{TYPE: "IDENT", value: "---"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\u2003",  // em-space
    expected: [{TYPE: "DELIM", value: "\u2003"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\u{A0}",  // non-breaking space
    expected: [{TYPE: "DELIM", value: "\u{A0}"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\u1234",
    expected: [{TYPE: "IDENT", value: "\u1234"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\u{12345}",
    expected: [{TYPE: "IDENT", value: "\u{12345}"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\0",
    expected: [{TYPE: "IDENT", value: "\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "ab\0c",
    expected: [{TYPE: "IDENT", value: "ab\uFFFDc"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "ab\0c",
    expected: [{TYPE: "IDENT", value: "ab\uFFFDc"}, {TYPE: "EOF"}],
  },

  // -- FunctionToken
  {
    parser: "",
    css: "scale(2)",
    expected: [{TYPE: "FUNCTION", value: "scale"}, {TYPE: "NUMBER", value: 2, type: "integer"}, {TYPE: "CLOSE-PAREN"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "foo-bar\\ baz(",
    expected: [{TYPE: "FUNCTION", value: "foo-bar baz"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "fun\\(ction(",
    expected: [{TYPE: "FUNCTION", value: "fun(ction"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-foo(",
    expected: [{TYPE: "FUNCTION", value: "-foo"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(\"foo.gif\"",
    expected: [{TYPE: "FUNCTION", value: "url"}, {TYPE: "STRING", value: "foo.gif"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "foo(  \'bar.gif\'",
    expected: [{TYPE: "FUNCTION", value: "foo"}, {TYPE: "WHITESPACE"}, {TYPE: "STRING", value: "bar.gif"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(  \'bar.gif\'",
    expected: [{TYPE: "FUNCTION", value: "url"}, {TYPE: "WHITESPACE"}, {TYPE: "STRING", value: "bar.gif"}, {TYPE: "EOF"}],
  },

  // -- AtKeywordToken
  {
    parser: "",
    css: "@at-keyword",
    expected: [{TYPE: "AT-KEYWORD", value: "at-keyword"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@testing123",
    expected: [{TYPE: "AT-KEYWORD", value: "testing123"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@hello!",
    expected: [{TYPE: "AT-KEYWORD", value: "hello"}, {TYPE: "DELIM", value: '!'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@-text",
    expected: [{TYPE: "AT-KEYWORD", value: "-text"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@--abc",
    expected: [{TYPE: "AT-KEYWORD", value: "--abc"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@--",
    expected: [{TYPE: "AT-KEYWORD", value: "--"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@--11",
    expected: [{TYPE: "AT-KEYWORD", value: "--11"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@---",
    expected: [{TYPE: "AT-KEYWORD", value: "---"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@\\ ",
    expected: [{TYPE: "AT-KEYWORD", value: " "}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@-\\ ",
    expected: [{TYPE: "AT-KEYWORD", value: "- "}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@@",
    expected: [{TYPE: "DELIM", value: '@'}, {TYPE: "DELIM", value: '@'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@2",
    expected: [{TYPE: "DELIM", value: '@'}, {TYPE: "NUMBER", value: 2, type: "integer"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "@-1",
    expected: [{TYPE: "DELIM", value: '@'}, {TYPE: "NUMBER", value: -1, type: "integer", sign: "-"}, {TYPE: "EOF"}],
  },

  // -- UrlToken
  {
    parser: "",
    css: "url(foo.gif)",
    expected: [{TYPE: "URL", value: "foo.gif"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "urL(https://example.com/cats.png)",
    expected: [{TYPE: "URL", value: "https://example.com/cats.png"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "uRl(what-a.crazy^URL~this\\ is!)",
    expected: [{TYPE: "URL", value: "what-a.crazy^URL~this is!"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "uRL(123#test)",
    expected: [{TYPE: "URL", value: "123#test"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "Url(escapes\\ \\\"\\'\\)\\()",
    expected: [{TYPE: "URL", value: "escapes \"')("}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "UrL(   whitespace   )",
    expected: [{TYPE: "URL", value: "whitespace"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "URl( whitespace-eof ",
    expected: [{TYPE: "URL", value: "whitespace-eof"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "URL(eof",
    expected: [{TYPE: "URL", value: "eof"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(not/*a*/comment)",
    expected: [{TYPE: "URL", value: "not/*a*/comment"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "urL()",
    expected: [{TYPE: "URL", value: ""}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "uRl(white space),",
    expected: [{TYPE: "BADURL"}, {TYPE: "COMMA"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "Url(b(ad),",
    expected: [{TYPE: "BADURL"}, {TYPE: "COMMA"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "uRl(ba'd):",
    expected: [{TYPE: "BADURL"}, {TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "urL(b\"ad):",
    expected: [{TYPE: "BADURL"}, {TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "uRl(b\"ad):",
    expected: [{TYPE: "BADURL"}, {TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "Url(b\\\rad):",
    expected: [{TYPE: "BADURL"}, {TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(b\\\nad):",
    expected: [{TYPE: "BADURL"}, {TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(/*'bad')*/",
    expected: [{TYPE: "BADURL"}, {TYPE: "DELIM", value: '*'}, {TYPE: "DELIM", value: '/'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(ba'd\\))",
    expected: [{TYPE: "BADURL"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "url(ba'd\\\\))",
    expected: [{TYPE: "BADURL"}, {TYPE: "CLOSE-PAREN"}, {TYPE: "EOF"}],
  },

  // -- StringToken
  {
    parser: "",
    css: "'text'",
    expected: [{TYPE: "STRING", value: "text"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"text\"",
    expected: [{TYPE: "STRING", value: "text"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'testing, 123!'",
    expected: [{TYPE: "STRING", value: "testing, 123!"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'es\\'ca\\\"pe'",
    expected: [{TYPE: "STRING", value: "es'ca\"pe"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'\"quotes\"'",
    expected: [{TYPE: "STRING", value: "\"quotes\""}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"'quotes'\"",
    expected: [{TYPE: "STRING", value: "'quotes'"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"mismatch'",
    expected: [{TYPE: "STRING", value: "mismatch'"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'text\x05\t\x13'",
    expected: [{TYPE: "STRING", value: "text\x05\t\x13"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"end on eof",
    expected: [{TYPE: "STRING", value: "end on eof"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'esca\\\nped'",
    expected: [{TYPE: "STRING", value: "escaped"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"esc\\\faped\"",
    expected: [{TYPE: "STRING", value: "escaped"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'new\\\rline'",
    expected: [{TYPE: "STRING", value: "newline"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "\"new\\\r\nline\"",
    expected: [{TYPE: "STRING", value: "newline"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'bad\nstring",
    expected: [{TYPE: "BADSTRING"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "string"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'bad\rstring",
    expected: [{TYPE: "BADSTRING"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "string"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'bad\r\nstring",
    expected: [{TYPE: "BADSTRING"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "string"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'bad\fstring",
    expected: [{TYPE: "BADSTRING"}, {TYPE: "WHITESPACE"}, {TYPE: "IDENT", value: "string"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'\0'",
    expected: [{TYPE: "STRING", value: "\uFFFD"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'hel\0lo'",
    expected: [{TYPE: "STRING", value: "hel\uFFFDlo"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "'h\\65l\0lo'",
    expected: [{TYPE: "STRING", value: "hel\uFFFDlo"}, {TYPE: "EOF"}],
  },

  // -- HashToken
  {
    parser: "",
    css: "#id-selector",
    expected: [{TYPE: "HASH", value: "id-selector", type: "id"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#FF7700",
    expected: [{TYPE: "HASH", value: "FF7700", type: "id"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#3377FF",
    expected: [{TYPE: "HASH", value: "3377FF", type: "unrestricted"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#\\ ",
    expected: [{TYPE: "HASH", value: " ", type: "id"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "# ",
    expected: [{TYPE: "DELIM", value: '#'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#\\\n",
    expected: [{TYPE: "DELIM", value: '#'}, {TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#\\\r\n",
    expected: [{TYPE: "DELIM", value: '#'}, {TYPE: "DELIM", value: '\\'}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "#!",
    expected: [{TYPE: "DELIM", value: '#'}, {TYPE: "DELIM", value: '!'}, {TYPE: "EOF"}],
  },

  // -- NumberToken
  {
    parser: "",
    css: "10",
    expected: [{TYPE: "NUMBER", value: 10, type: "integer"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "12.0",
    expected: [{TYPE: "NUMBER", value: 12, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+45.6",
    expected: [{TYPE: "NUMBER", value: 45.6, type: "number", sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-7",
    expected: [{TYPE: "NUMBER", value: -7, type: "integer", sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "010",
    expected: [{TYPE: "NUMBER", value: 10, type: "integer"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "10e0",
    expected: [{TYPE: "NUMBER", value: 10, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "12e3",
    expected: [{TYPE: "NUMBER", value: 12000, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "3e+1",
    expected: [{TYPE: "NUMBER", value: 30, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "12E-1",
    expected: [{TYPE: "NUMBER", value: 1.2, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ".7",
    expected: [{TYPE: "NUMBER", value: 0.7, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-.3",
    expected: [{TYPE: "NUMBER", value: -0.3, type: "number", sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+637.54e-2",
    expected: [{TYPE: "NUMBER", value: 6.3754, type: "number", sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-12.34E+2",
    expected: [{TYPE: "NUMBER", value: -1234, type: "number", sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+ 5",
    expected: [{TYPE: "DELIM", value: '+'}, {TYPE: "WHITESPACE"}, {TYPE: "NUMBER", value: 5, type: "integer"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-+12",
    expected: [{TYPE: "DELIM", value: '-'}, {TYPE: "NUMBER", value: 12, type: "integer", sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+-21",
    expected: [{TYPE: "DELIM", value: '+'}, {TYPE: "NUMBER", value: -21, type: "integer", sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "++22",
    expected: [{TYPE: "DELIM", value: '+'}, {TYPE: "NUMBER", value: 22, type: "integer", sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "13.",
    expected: [{TYPE: "NUMBER", value: 13, type: "integer"}, {TYPE: "DELIM", value: '.'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "1.e2",
    expected: [{TYPE: "NUMBER", value: 1, type: "integer"}, {TYPE: "DELIM", value: '.'}, {TYPE: "IDENT", value: "e2"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "2e3.5",
    expected: [{TYPE: "NUMBER", value: 2000, type: "number"}, {TYPE: "NUMBER", value: 0.5, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "2e3.",
    expected: [{TYPE: "NUMBER", value: 2000, type: "number"}, {TYPE: "DELIM", value: '.'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "1000000000000000000000000",
    expected: [{TYPE: "NUMBER", value: 1e24, type: "integer"}, {TYPE: "EOF"}],
  },

  // -- DimensionToken
  {
    parser: "",
    css: "10px",
    expected: [{TYPE: "DIMENSION", value: 10, type: "integer", unit: "px"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "12.0em",
    expected: [{TYPE: "DIMENSION", value: 12, type: "number", unit: "em"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-12.0em",
    expected: [{TYPE: "DIMENSION", value: -12, type: "number", unit: "em", sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+45.6__qem",
    expected: [{TYPE: "DIMENSION", value: 45.6, type: "number", unit: "__qem", sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5e",
    expected: [{TYPE: "DIMENSION", value: 5, type: "integer", unit: "e"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5px-2px",
    expected: [{TYPE: "DIMENSION", value: 5, type: "integer", unit: "px-2px"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5e-",
    expected: [{TYPE: "DIMENSION", value: 5, type: "integer", unit: "e-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5\\ ",
    expected: [{TYPE: "DIMENSION", value: 5, type: "integer", unit: " "}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "40\\70\\78",
    expected: [{TYPE: "DIMENSION", value: 40, type: "integer", unit: "px"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "4e3e2",
    expected: [{TYPE: "DIMENSION", value: 4000, type: "number", unit: "e2"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "0x10px",
    expected: [{TYPE: "DIMENSION", value: 0, type: "integer", unit: "x10px"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "4unit ",
    expected: [{TYPE: "DIMENSION", value: 4, type: "integer", unit: "unit"}, {TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5e+",
    expected: [{TYPE: "DIMENSION", value: 5, type: "integer", unit: "e"}, {TYPE: "DELIM", value: '+'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "2e.5",
    expected: [{TYPE: "DIMENSION", value: 2, type: "integer", unit: "e"}, {TYPE: "NUMBER", value: 0.5, type: "number"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "2e+.5",
    expected: [{TYPE: "DIMENSION", value: 2, type: "integer", unit: "e"}, {TYPE: "NUMBER", value: 0.5, type: "number", sign: "+"}, {TYPE: "EOF"}],
  },

  // -- PercentageToken
  {
    parser: "",
    css: "10%",
    expected: [{TYPE: "PERCENTAGE", value: 10}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "+12.0%",
    expected: [{TYPE: "PERCENTAGE", value: 12, sign: "+"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "-48.99%",
    expected: [{TYPE: "PERCENTAGE", value: -48.99, sign: "-"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "6e-1%",
    expected: [{TYPE: "PERCENTAGE", value: 0.6}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "5%%",
    expected: [{TYPE: "PERCENTAGE", value: 5}, {TYPE: "DELIM", value: '%'}, {TYPE: "EOF"}],
  },

  // -- UnicodeRangeToken
  {
    parser: "",
    css: "u+012345-123456",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 12345, type: "integer", sign: "+"},
      {TYPE: "NUMBER", value: -123456, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "U+1234-2345",
    expected: [
      {TYPE: "IDENT", value: "U"},
      {TYPE: "NUMBER", value: 1234, type: "integer", sign: "+"},
      {TYPE: "NUMBER", value: -2345, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+222-111",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 222, type: "integer", sign: "+"},
      {TYPE: "NUMBER", value: -111, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "U+CafE-d00D",
    expected: [
      {TYPE: "IDENT", value: "U"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "CafE-d00D"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "U+2??",
    expected: [
      {TYPE: "IDENT", value: "U"},
      {TYPE: "NUMBER", value: 2, type: "integer", sign: "+"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "U+ab12??",
    expected: [
      {TYPE: "IDENT", value: "U"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "ab12"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+??????",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+??",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+222+111",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 222, type: "integer", sign: "+"},
      {TYPE: "NUMBER", value: 111, type: "integer", sign: "+"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+12345678",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 12345678, type: "integer", sign: "+"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+123-12345678",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 123, type: "integer", sign: "+"},
      {TYPE: "NUMBER", value: -12345678, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+cake",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "cake"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+1234-gggg",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DIMENSION", value: 1234, type: "integer", unit: "-gggg", sign: "+"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "U+ab12???",
    expected: [
      {TYPE: "IDENT", value: "U"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "ab12"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+a1?-123",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "a1"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "NUMBER", value: -123, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+1??4",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "NUMBER", value: 1, type: "integer", sign: "+"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "DELIM", value: "?"},
      {TYPE: "NUMBER", value: 4, type: "integer"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+z",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "IDENT", value: "z"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "EOF"},
    ],
  },
  {
    parser: "",
    css: "u+-543",
    expected: [
      {TYPE: "IDENT", value: "u"},
      {TYPE: "DELIM", value: "+"},
      {TYPE: "NUMBER", value: -543, type: "integer", sign: "-"},
      {TYPE: "EOF"},
    ],
  },

  // -- CommentToken
  {
    parser: "",
    css: "/*comment*/a",
    expected: [{TYPE: "IDENT", value: "a"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "/**\\2f**//",
    expected: [{TYPE: "DELIM", value: '/'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "/**y*a*y**/ ",
    expected: [{TYPE: "WHITESPACE"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ",/* \n :) \n */)",
    expected: [{TYPE: "COMMA"}, {TYPE: "CLOSE-PAREN"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ":/*/*/",
    expected: [{TYPE: "COLON"}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: "/**/*",
    expected: [{TYPE: "DELIM", value: '*'}, {TYPE: "EOF"}],
  },
  {
    parser: "",
    css: ";/******",
    expected: [{TYPE: "SEMICOLON"}, {TYPE: "EOF"}],
  },

  // parseAStylesheet()
  {
    "parser": "parseAStylesheet",
    "css": "",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": []
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "foo",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": []
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "foo 4",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": []
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "@foo",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [],
          "declarations": null,
          "rules": null
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "@foo bar; \t/* comment */",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "bar"
            }
          ],
          "declarations": null,
          "rules": null
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": " /**/ @foo bar{[(4",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "bar"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "@foo { bar",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "@foo [ bar",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "BLOCK",
              "name": "[",
              "value": [
                {
                  "TYPE": "WHITESPACE"
                },
                {
                  "TYPE": "IDENT",
                  "value": "bar"
                }
              ]
            }
          ],
          "declarations": null,
          "rules": null
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": " /**/ div > p { color: #aaa;  } /**/ ",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "div"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "DELIM",
              "value": ">"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "p"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "HASH",
                  "value": "aaa",
                  "type": "id"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": " /**/ { color: #aaa  ",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "HASH",
                  "value": "aaa",
                  "type": "id"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": " /* CDO/CDC are ignored between rules */ <!-- --> {",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": " <!-- --> a<!---->{",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "a"
            },
            {
              "TYPE": "CDO"
            },
            {
              "TYPE": "CDC"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "div { color: #aaa; } p{}",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "div"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "HASH",
                  "value": "aaa",
                  "type": "id"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        },
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "p"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "div {} -->",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "div"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "{}a",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": "{}@a",
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [],
          "declarations": [],
          "rules": []
        },
        {
          "TYPE": "AT-RULE",
          "name": "a",
          "prelude": [],
          "declarations": null,
          "rules": null
        }
      ]
    }
  },
  {
    css: `foo {
        bar: baz;
    }`,
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "foo"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "bar",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "baz"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    }
  },
  {
    css: 'foo { bar: rgb(255, 0, 127); }',
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "foo"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "bar",
              "value": [
                {
                  "TYPE": "FUNCTION",
                  "name": "rgb",
                  "value": [
                    {
                      "TYPE": "NUMBER",
                      "value": 255,
                      "type": "integer",
                    },
                    {
                      "TYPE": "COMMA"
                    },
                    {
                      "TYPE": "WHITESPACE"
                    },
                    {
                      "TYPE": "NUMBER",
                      "value": 0,
                      "type": "integer",
                    },
                    {
                      "TYPE": "COMMA"
                    },
                    {
                      "TYPE": "WHITESPACE"
                    },
                    {
                      "TYPE": "NUMBER",
                      "value": 127,
                      "type": "integer",
                    }
                  ]
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    }
  },
  {
    css: '#foo {}',
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "HASH",
              "value": "foo",
              "type": "id"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    css: '@media{ }',
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [],
          "declarations": [],
          "rules": []
        }
      ]
    }
  },
  {
    css: '.foo {color: red; @media { foo: bar } color: green }',
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "DELIM",
              "value": "."
            },
            {
              "TYPE": "IDENT",
              "value": "foo"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "red"
                }
              ],
              "important": false
            },
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "green"
                }
              ],
              "important": false
            }
          ],
          "rules": [
            {
              "TYPE": "AT-RULE",
              "name": "media",
              "prelude": [
                {
                  "TYPE": "WHITESPACE"
                }
              ],
              "declarations": [
                {
                  "TYPE": "DECLARATION",
                  "name": "foo",
                  "value": [
                    {
                      "TYPE": "IDENT",
                      "value": "bar"
                    }
                  ],
                  "important": false
                }
              ],
              "rules": []
            }
          ]
        }
      ]
    }
  },
  {
    css: 'foo{div:hover; color:red{};}',
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "foo"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "div",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "hover"
                }
              ],
              "important": false
            }
          ],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "color"
                },
                {
                  "TYPE": "COLON"
                },
                {
                  "TYPE": "IDENT",
                  "value": "red"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        }
      ]
    }
  },
  {
    css: `@foo;;foo {}`,
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "AT-RULE",
          "name": "foo",
          "prelude": [],
          "declarations": null,
          "rules": null
        }
      ]
    }
  },
  {
    css: `foo{@foo;;foo {}}`,
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "foo"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "AT-RULE",
              "name": "foo",
              "prelude": [],
              "declarations": null,
              "rules": null
            },
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "foo"
                },
                {
                  "TYPE": "WHITESPACE"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        }
      ]
    }
  },
  {
    css: `foo { --div:hover{}}`,
    expected: {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "foo"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "--div",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "hover"
                },
                {
                  "TYPE": "BLOCK",
                  "name": "{",
                  "value": []
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    }
  },
  {
    "parser": "parseAStylesheet",
    "css": `p { color: red; } @media print { p { color: green; } }`,
    "expected": {
      "TYPE": "STYLESHEET",
      "rules": [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "p"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "red"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        },
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "print"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "p"
                },
                {
                  "TYPE": "WHITESPACE"
                },
              ],
              "declarations": [
                {
                  "TYPE": "DECLARATION",
                  "name": "color",
                  "value": [
                    {
                      "TYPE": "IDENT",
                      "value": "green"
                    }
                  ],
                  "important": false
                }
              ],
              "rules": []
            }
          ]
        }
      ]
    }
  },

  // parseAStylesheetsContents()
  {
    "parser": "parseAStylesheetsContents",
    "css": "",
    "expected": []
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "foo",
    "expected": []
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "foo 4",
    "expected": []
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "@foo",
    "expected": [
      {
        "TYPE": "AT-RULE",
        "name": "foo",
        "prelude": [],
        "declarations": null,
        "rules": null
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "@foo bar; \t/* comment */",
    "expected": [
      {
        "TYPE": "AT-RULE",
        "name": "foo",
        "prelude": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "bar"
          }
        ],
        "declarations": null,
        "rules": null
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": " /**/ @foo bar{[(4",
    "expected": [
      {
        "TYPE": "AT-RULE",
        "name": "foo",
        "prelude": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "bar"
          }
        ],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "@foo { bar",
    "expected": [
      {
        "TYPE": "AT-RULE",
        "name": "foo",
        "prelude": [
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "@foo [ bar",
    "expected": [
      {
        "TYPE": "AT-RULE",
        "name": "foo",
        "prelude": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "BLOCK",
            "name": "[",
            "value": [
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "IDENT",
                "value": "bar"
              }
            ]
          }
        ],
        "declarations": null,
        "rules": null
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": " /**/ div > p { color: #aaa;  } /**/ ",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "div"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "DELIM",
            "value": ">"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "p"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [
          {
            "TYPE": "DECLARATION",
            "name": "color",
            "value": [
              {
                "TYPE": "HASH",
                "value": "aaa",
                "type": "id"
              }
            ],
            "important": false
          }
        ],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": " /**/ { color: #aaa  ",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [],
        "declarations": [
          {
            "TYPE": "DECLARATION",
            "name": "color",
            "value": [
              {
                "TYPE": "HASH",
                "value": "aaa",
                "type": "id"
              }
            ],
            "important": false
          }
        ],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": " /* CDO/CDC are ignored between rules */ <!-- --> {",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": " <!-- --> a<!---->{",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "a"
          },
          {
            "TYPE": "CDO"
          },
          {
            "TYPE": "CDC"
          }
        ],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "div { color: #aaa; } p{}",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "div"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [
          {
            "TYPE": "DECLARATION",
            "name": "color",
            "value": [
              {
                "TYPE": "HASH",
                "value": "aaa",
                "type": "id"
              }
            ],
            "important": false
          }
        ],
        "rules": []
      },
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "p"
          }
        ],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "div {} -->",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "div"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "{}a",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [],
        "declarations": [],
        "rules": []
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": "{}@a",
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [],
        "declarations": [],
        "rules": []
      },
      {
        "TYPE": "AT-RULE",
        "name": "a",
        "prelude": [],
        "declarations": null,
        "rules": null
      }
    ]
  },
  {
    "parser": "parseAStylesheetsContents",
    "css": `p { color: red; } @media print { p { color: green; } }`,
    "expected": [
      {
        "TYPE": "QUALIFIED-RULE",
        "prelude": [
          {
            "TYPE": "IDENT",
            "value": "p"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [
          {
            "TYPE": "DECLARATION",
            "name": "color",
            "value": [
              {
                "TYPE": "IDENT",
                "value": "red"
              }
            ],
            "important": false
          }
        ],
        "rules": []
      },
      {
        "TYPE": "AT-RULE",
        "name": "media",
        "prelude": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "print"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ],
        "declarations": [],
        "rules": [
          {
            "TYPE": "QUALIFIED-RULE",
            "prelude": [
              {
                "TYPE": "IDENT",
                "value": "p"
              },
              {
                "TYPE": "WHITESPACE"
              },
            ],
            "declarations": [
              {
                "TYPE": "DECLARATION",
                "name": "color",
                "value": [
                  {
                    "TYPE": "IDENT",
                    "value": "green"
                  }
                ],
                "important": false
              }
            ],
            "rules": []
          }
        ]
      }
    ]
  },

  // parseABlocksContents()
  {
    "parser": "parseABlocksContents",
    "css": ";; /**/ ; ;",
    "expected": [
      [],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "a:b; c:d 42!important;\n",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        },
        {
          "TYPE": "DECLARATION",
          "name": "c",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "d"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "NUMBER",
              "value": 42,
              "type": "integer"
            }
          ],
          "important": true
        }
      ],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "z;a:b",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "z:x!;a:b",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "z",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "x"
            },
            {
              "TYPE": "DELIM",
              "value": "!"
            }
          ],
          "important": false
        },
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "a:b; c+:d",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "@import 'foo.css'; a:b; @import 'bar.css'",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      [
        {
          "TYPE": "AT-RULE",
          "name": "import",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "STRING",
              "value": "foo.css"
            }
          ],
          "declarations": null,
          "rules": null
        },
        {
          "TYPE": "AT-RULE",
          "name": "import",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "STRING",
              "value": "bar.css"
            }
          ],
          "declarations": null,
          "rules": null
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "@media screen { div{;}} a:b;; @media print{div{",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      [
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "screen"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "div"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        },
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "print"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "div"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "@ media screen { div{;}} a:b;; @media print{div{",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "a",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "important": false
        }
      ],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "DELIM",
              "value": "@"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "media"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "screen"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "div"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        },
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "print"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "div"
                }
              ],
              "declarations": [],
              "rules": []
            }
          ]
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "z:x;a b{c:d;;e:f}",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "z",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "x"
            }
          ],
          "important": false
        }
      ],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "a"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "c",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "d"
                }
              ],
              "important": false
            },
            {
              "TYPE": "DECLARATION",
              "name": "e",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "f"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "a {c:1}",
    "expected": [
      [],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "a"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "c",
              "value": [
                {
                  "TYPE": "NUMBER",
                  "value": 1,
                  "type": "integer"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "a:hover {c:1}",
    "expected": [
      [],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "a"
            },
            {
              "TYPE": "COLON"
            },
            {
              "TYPE": "IDENT",
              "value": "hover"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "c",
              "value": [
                {
                  "TYPE": "NUMBER",
                  "value": 1,
                  "type": "integer"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "z:x;a b{c:d}e:f",
    "expected": [
      [
        {
          "TYPE": "DECLARATION",
          "name": "z",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "x"
            }
          ],
          "important": false
        },
        {
          "TYPE": "DECLARATION",
          "name": "e",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "f"
            }
          ],
          "important": false
        }
      ],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "a"
            },
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "b"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "c",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "d"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        }
      ]
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": "",
    "expected": [
      [],
      []
    ]
  },
  {
    "parser": "parseABlocksContents",
    "css": `p { color: red; } @media print { p { color: green; } }`,
    "expected": [
      [],
      [
        {
          "TYPE": "QUALIFIED-RULE",
          "prelude": [
            {
              "TYPE": "IDENT",
              "value": "p"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [
            {
              "TYPE": "DECLARATION",
              "name": "color",
              "value": [
                {
                  "TYPE": "IDENT",
                  "value": "red"
                }
              ],
              "important": false
            }
          ],
          "rules": []
        },
        {
          "TYPE": "AT-RULE",
          "name": "media",
          "prelude": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "print"
            },
            {
              "TYPE": "WHITESPACE"
            }
          ],
          "declarations": [],
          "rules": [
            {
              "TYPE": "QUALIFIED-RULE",
              "prelude": [
                {
                  "TYPE": "IDENT",
                  "value": "p"
                },
                {
                  "TYPE": "WHITESPACE"
                },
              ],
              "declarations": [
                {
                  "TYPE": "DECLARATION",
                  "name": "color",
                  "value": [
                    {
                      "TYPE": "IDENT",
                      "value": "green"
                    }
                  ],
                  "important": false
                }
              ],
              "rules": []
            }
          ]
        }
      ]
    ]
  },

  // parseARule()
  {
    "parser": "parseARule",
    "css": "",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseARule",
    "css": "foo",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseARule",
    "css": "foo 4",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseARule",
    "css": "@foo",
    "expected": {
      "TYPE": "AT-RULE",
      "name": "foo",
      "prelude": [],
      "declarations": null,
      "rules": null
    }
  },
  {
    "parser": "parseARule",
    "css": "@foo bar; \t/* comment */",
    "expected": {
      "TYPE": "AT-RULE",
      "name": "foo",
      "prelude": [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "bar"
        }
      ],
      "declarations": null,
      "rules": null
    }
  },
  {
    "parser": "parseARule",
    "css": " /**/ @foo bar{[(4",
    "expected": {
      "TYPE": "AT-RULE",
      "name": "foo",
      "prelude": [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "bar"
        }
      ],
      "declarations": [],
      "rules": []
    }
  },
  {
    "parser": "parseARule",
    "css": "@foo { bar",
    "expected": {
      "TYPE": "AT-RULE",
      "name": "foo",
      "prelude": [
        {
          "TYPE": "WHITESPACE"
        }
      ],
      "declarations": [],
      "rules": []
    }
  },
  {
    "parser": "parseARule",
    "css": "@foo [ bar",
    "expected": {
      "TYPE": "AT-RULE",
      "name": "foo",
      "prelude": [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "BLOCK",
          "name": "[",
          "value": [
            {
              "TYPE": "WHITESPACE"
            },
            {
              "TYPE": "IDENT",
              "value": "bar"
            }
          ]
        }
      ],
      "declarations": null,
      "rules": null
    }
  },
  {
    "parser": "parseARule",
    "css": " /**/ div > p { color: #aaa;  } /**/ ",
    "expected": {
      "TYPE": "QUALIFIED-RULE",
      "prelude": [
        {
          "TYPE": "IDENT",
          "value": "div"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "DELIM",
          "value": ">"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "p"
        },
        {
          "TYPE": "WHITESPACE"
        }
      ],
      "declarations": [
        {
          "TYPE": "DECLARATION",
          "name": "color",
          "value": [
            {
              "TYPE": "HASH",
              "value": "aaa",
              "type": "id"
            }
          ],
          "important": false
        }
      ],
      "rules": []
    }
  },
  {
    "parser": "parseARule",
    "css": " /**/ { color: #aaa  ",
    "expected": {
      "TYPE": "QUALIFIED-RULE",
      "prelude": [],
      "declarations": [
        {
          "TYPE": "DECLARATION",
          "name": "color",
          "value": [
            {
              "TYPE": "HASH",
              "value": "aaa",
              "type": "id"
            }
          ],
          "important": false
        }
      ],
      "rules": []
    }
  },
  {
    "parser": "parseARule",
    "css": " /* CDO/CDC are not special */ <!-- --> {",
    "expected": {
      "TYPE": "QUALIFIED-RULE",
      "prelude": [
        {
          "TYPE": "CDO"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "CDC"
        },
        {
          "TYPE": "WHITESPACE"
        }
      ],
      "declarations": [],
      "rules": []
    }
  },
  {
    "parser": "parseARule",
    "css": "div { color: #aaa; } p{}",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseARule",
    "css": "div {} -->",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseARule",
    "css": "{}a",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },

  // parseADeclaration()
  {
    "parser": "parseADeclaration",
    "css": "",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "  /**/\n",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": " ;",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "@foo:",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "#foo:",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": ".foo:",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo*:",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo.. 9000",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo :",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "\n/**/ foo: ",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:;",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": " /**/ foo /**/ :",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:;bar:;",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: 9000  !Important",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "NUMBER",
          "value": 9000,
          "type": "integer"
        }
      ],
      "important": true
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: 9000  ! /**/\t IMPORTant /**/\f",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "NUMBER",
          "value": 9000,
          "type": "integer"
        }
      ],
      "important": true
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: 9000  /* Dotted capital I */!İmportant",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "NUMBER",
          "value": 9000,
          "type": "integer"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "DELIM",
          "value": "!"
        },
        {
          "TYPE": "IDENT",
          "value": "İmportant"
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: 9000  !important!",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "NUMBER",
          "value": 9000,
          "type": "integer"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "DELIM",
          "value": "!"
        },
        {
          "TYPE": "IDENT",
          "value": "important"
        },
        {
          "TYPE": "DELIM",
          "value": "!"
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: 9000  important",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "NUMBER",
          "value": 9000,
          "type": "integer"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "important"
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:important",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "IDENT",
          "value": "important"
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:{}",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "BLOCK",
          "name": "{",
          "value": []
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo: {}",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "BLOCK",
          "name": "{",
          "value": []
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:{} ",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "foo",
      "value": [
        {
          "TYPE": "BLOCK",
          "name": "{",
          "value": []
        }
      ],
      "important": false
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:bar{}",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:{}bar",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "foo:{}{}",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "-foo:bar{}",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseADeclaration",
    "css": "--foo:bar{}",
    "expected": {
      "TYPE": "DECLARATION",
      "name": "--foo",
      "value": [
        {
          "TYPE": "IDENT",
          "value": "bar"
        },
        {
          "TYPE": "BLOCK",
          "name": "{",
          "value":  []
        }
      ],
      "important": false
    }
  },

  // parseAComponentValue()
  {
    "parser": "parseAComponentValue",
    "css": "",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": " ",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": "/**/",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": "  /**/\t/* a */\n\n",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": ".",
    "expected": {
      "TYPE": "DELIM",
      "value": "."
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": "a",
    "expected": {
      "TYPE": "IDENT",
      "value": "a"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": "/**/ 4px",
    "expected": {
      "TYPE": "DIMENSION",
      "value": 4,
      "type": "integer",
      "unit": "px"
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": "rgba(100%, 0%, 50%, .5)",
    "expected": {
      "TYPE": "FUNCTION",
      "name": "rgba",
      "value": [
        {
          "TYPE": "PERCENTAGE",
          "value": 100
        },
        {
          "TYPE": "COMMA"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "PERCENTAGE",
          "value": 0
        },
        {
          "TYPE": "COMMA"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "PERCENTAGE",
          "value": 50
        },
        {
          "TYPE": "COMMA"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "NUMBER",
          "value": 0.5,
          "type": "number"
        }
      ]
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": " /**/ { foo: bar; @baz [)",
    "expected": {
      "TYPE": "BLOCK",
      "name": "{",
      "value": [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "foo"
        },
        {
          "TYPE": "COLON"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "bar"
        },
        {
          "TYPE": "SEMICOLON"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "AT-KEYWORD",
          "value": "baz"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "BLOCK",
          "name": "[",
          "value": [
            {
              "TYPE": "CLOSE-PAREN"
            }
          ]
        }
      ]
    }
  },
  {
    "parser": "parseAComponentValue",
    "css": ".foo",
    "expectedThrow": {
      "name": "SyntaxError"
    }
  },

  // parseAListOfComponentValues()
  {
    "parser": "parseAListOfComponentValues",
    "css": "",
    "expected": []
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "/*/*///** /* **/*//* ",
    "expected": [
      {
        "TYPE": "DELIM",
        "value": "/"
      },
      {
        "TYPE": "DELIM",
        "value": "*"
      },
      {
        "TYPE": "DELIM",
        "value": "/"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "red",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "red"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "  \t\t\r\n\nRed ",
    "expected": [
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "Red"
      },
      {
        "TYPE": "WHITESPACE"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "red/* CDC */-->",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "CDC"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "red-->/* Not CDC */",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "red--"
      },
      {
        "TYPE": "DELIM",
        "value": ">"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "\\- red0 -red --red -\\-red\\ blue 0red -0red \x00red _Red .red rêd r\\êd \x7f\x80\x81",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "red0"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "-red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "--red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "--red blue"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "red",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "\uFFFDred"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "_Red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "rêd"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "rêd"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "\x7f"
      },
      {
        "TYPE": "DELIM",
        "value": "\x80"
      },
      {
        "TYPE": "DELIM",
        "value": "\x81"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "\\30red \\00030 red \\30\r\nred \\0000000red \\1100000red \\red \\r ed \\.red \\ red \\\nred \\376\\37 6\\000376\\0000376\\",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "0red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "0red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "0red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "\uFFFD0red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "\uFFFD0red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "r"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "ed"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": ".red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": " red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "\\"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "\u{0376}76\u{0376}76\uFFFD"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "rgba0('a' rgba1(a b rgba2(rgba3('b",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "rgba0",
        "value": [
          {
            "TYPE": "STRING",
            "value": "a"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "FUNCTION",
            "name": "rgba1",
            "value": [
              {
                "TYPE": "IDENT",
                "value": "a"
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "IDENT",
                "value": "b"
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "FUNCTION",
                "name": "rgba2",
                "value": [
                  {
                    "TYPE": "FUNCTION",
                    "name": "rgba3",
                    "value": [
                      {
                        "TYPE": "STRING",
                        "value": "b"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "rgba0() -rgba() --rgba() -\\-rgba() 0rgba() -0rgba() _rgba() .rgba() rgbâ() \\30rgba() rgba () @rgba() #rgba()",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "rgba0",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "-rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "--rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "--rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "rgba"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "rgba",
        "sign": "-"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "_rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "FUNCTION",
        "name": "rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "rgbâ",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "0rgba",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "rgba"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "rgba"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": []
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "rgba",
        "type": "id"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": []
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "@media0 @-Media @--media @-\\-media @0media @-0media @_media @.media @medİa @\\30 media\\",
    "expected": [
      {
        "TYPE": "AT-KEYWORD",
        "value": "media0"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "-Media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "--media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "--media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "@"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "@"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "media",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "_media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "@"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "IDENT",
        "value": "media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "medİa"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "AT-KEYWORD",
        "value": "0media\uFFFD"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "#red0 #-Red #--red #-\\-red #0red #-0red #_Red #.red #rêd #êrd #\\.red\\",
    "expected": [
      {
        "TYPE": "HASH",
        "value": "red0",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "-Red",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "--red",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "--red",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "0red",
        "type": "unrestricted"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "-0red",
        "type": "unrestricted"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "_Red",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "#"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "rêd",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": "êrd",
        "type": "id"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "HASH",
        "value": ".red\uFFFD",
        "type": "id"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "p[example=\"\\\nfoo(int x) {\\\n   this.x = x;\\\n}\\\n\"]",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "p"
      },
      {
        "TYPE": "BLOCK",
        "name": "[",
        "value": [
          {
            "TYPE": "IDENT",
            "value": "example"
          },
          {
            "TYPE": "DELIM",
            "value": "="
          },
          {
            "TYPE": "STRING",
            "value": "foo(int x) {   this.x = x;}"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "'' 'Lorem \"îpsum\"' 'a\\\nb' 'a\nb 'eof",
    "expected": [
      {
        "TYPE": "STRING",
        "value": ""
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "Lorem \"îpsum\""
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "ab"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADSTRING"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "eof"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "\"\" \"Lorem 'îpsum'\" \"a\\\nb\" \"a\nb \"eof",
    "expected": [
      {
        "TYPE": "STRING",
        "value": ""
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "Lorem 'îpsum'"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "ab"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADSTRING"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "eof"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "\"Lo\\rem \\130 ps\\u m\" '\\376\\37 6\\000376\\0000376\\",
    "expected": [
      {
        "TYPE": "STRING",
        "value": "Lorem İpsu m"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "STRING",
        "value": "\u{0376}76\u{0376}76"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url( '') url('Lorem \"îpsum\"'\n) url('a\\\nb' ) url('a\nb) url('eof",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "STRING",
            "value": ""
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "Lorem \"îpsum\""
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "ab"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "BADSTRING"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "b"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "eof"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url(",
    "expected": [
      {
        "TYPE": "URL",
        "value": ""
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url( \t",
    "expected": [
      {
        "TYPE": "URL",
        "value": ""
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url(\"\") url(\"Lorem 'îpsum'\"\n) url(\"a\\\nb\" ) url(\"a\nb) url(\"eof",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": ""
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "Lorem 'îpsum'"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "ab"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "BADSTRING"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "b"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "eof"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url(\"Lo\\rem \\130 ps\\u m\") url('\\376\\37 6\\000376\\0000376\\",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "Lorem İpsu m"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "\u{0376}76\u{0376}76"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "URL(foo) Url(foo) ûrl(foo) url (foo) url\\ (foo) url(\t 'foo' ",
    "expected": [
      {
        "TYPE": "URL",
        "value": "foo"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "foo"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "ûrl",
        "value": [
          {
            "TYPE": "IDENT",
            "value": "foo"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "url"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BLOCK",
        "name": "(",
        "value": [
          {
            "TYPE": "IDENT",
            "value": "foo"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url ",
        "value": [
          {
            "TYPE": "IDENT",
            "value": "foo"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "STRING",
            "value": "foo"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url('a' b) url('c' d)",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "a"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "b"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "STRING",
            "value": "c"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "d"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url('a\nb) url('c\n",
    "expected": [
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "BADSTRING"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "b"
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "FUNCTION",
        "name": "url",
        "value": [
          {
            "TYPE": "BADSTRING"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url() url( \t) url(\n Foô\\030\n!\n) url(\na\nb\n) url(a\\ b) url(a(b) url(a\\(b) url(a'b) url(a\\'b) url(a\"b) url(a\\\"b) url(a\nb) url(a\\\nb) url(a\\a b) url(a\\",
    "expected": [
      {
        "TYPE": "URL",
        "value": ""
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": ""
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "Foô0!"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a(b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a'b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a\"b"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a\nb"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "URL",
        "value": "a\uFFFD"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url(\x00!#$%&*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~\x80\x81 ¡¢",
    "expected": [
      {
        "TYPE": "URL",
        "value": "\uFFFD!#$%&*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~\x80\x81 ¡¢"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "url(\x01) url(\x02) url(\x03) url(\x04) url(\x05) url(\x06) url(\x07) url(\x08) url(\x0b) url(\x0e) url(\x0f) url(\x10) url(\x11) url(\x12) url(\x13) url(\x14) url(\x15) url(\x16) url(\x17) url(\x18) url(\x19) url(\x1a) url(\x1b) url(\x1c) url(\x1d) url(\x1e) url(\x1f) url(\x7f)",
    "expected": [
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BADURL"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12 +34 -45 .67 +.89 -.01 2.3 +45.0 -0.67",
    "expected": [
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 34,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -45,
        "type": "integer",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 0.67,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 0.89,
        "type": "number",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -0.01,
        "type": "number",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 2.3,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 45,
        "type": "number",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -0.67,
        "type": "number",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12e2 +34e+1 -45E-0 .68e+3 +.79e-1 -.01E2 2.3E+1 +45.0e6 -0.67e0",
    "expected": [
      {
        "TYPE": "NUMBER",
        "value": 1200,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 340,
        "type": "number",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -45,
        "type": "number",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 680,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 0.079,
        "type": "number",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -1,
        "type": "number",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 23,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 45000000,
        "type": "number",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": -0.67,
        "type": "number",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "3. /* Decimal point must have following digits */",
    "expected": [
      {
        "TYPE": "NUMBER",
        "value": 3,
        "type": "integer"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "WHITESPACE"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "3\\65-2 /* Scientific notation E can not be escaped */",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 3,
        "type": "integer",
        "unit": "e-2"
      },
      {
        "TYPE": "WHITESPACE"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "3e-2.1 /* Integer exponents only */",
    "expected": [
      {
        "TYPE": "NUMBER",
        "value": 0.03,
        "type": "number"
      },
      {
        "TYPE": "NUMBER",
        "value": 0.1,
        "type": "number"
      },
      {
        "TYPE": "WHITESPACE"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12% +34% -45% .67% +.89% -.01% 2.3% +45.0% -0.67%",
    "expected": [
      {
        "TYPE": "PERCENTAGE",
        "value": 12
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 34,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -45,
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 0.67
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 0.89,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -0.01,
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 2.3
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 45,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -0.67,
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12e2% +34e+1% -45E-0% .68e+3% +.79e-1% -.01E2% 2.3E+1% +45.0e6% -0.67e0%",
    "expected": [
      {
        "TYPE": "PERCENTAGE",
        "value": 1200
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 340,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -45,
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 680
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 0.079,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -1,
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 23
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": 45000000,
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "PERCENTAGE",
        "value": -0.67,
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12\\% /* Percent sign can not be escaped */",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "%"
      },
      {
        "TYPE": "WHITESPACE"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12px +34px -45px .67px +.89px -.01px 2.3px +45.0px -0.67px",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 34,
        "type": "integer",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -45,
        "type": "integer",
        "unit": "px",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0.67,
        "type": "number",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0.89,
        "type": "number",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -0.01,
        "type": "number",
        "unit": "px",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 2.3,
        "type": "number",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 45,
        "type": "number",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -0.67,
        "type": "number",
        "unit": "px",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12e2px +34e+1px -45E-0px .68e+3px +.79e-1px -.01E2px 2.3E+1px +45.0e6px -0.67e0px",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 1200,
        "type": "number",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 340,
        "type": "number",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -45,
        "type": "number",
        "unit": "px",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 680,
        "type": "number",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0.079,
        "type": "number",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -1,
        "type": "number",
        "unit": "px",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 23,
        "type": "number",
        "unit": "px"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 45000000,
        "type": "number",
        "unit": "px",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": -0.67,
        "type": "number",
        "unit": "px",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "12red0 12.0-red 12--red 12-\\-red 120red 12-0red 12\x00red 12_Red 12.red 12rêd",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "red0"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "number",
        "unit": "-red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "--red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "--red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 120,
        "type": "integer",
        "unit": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer"
      },
      {
        "TYPE": "DIMENSION",
        "value": 0,
        "type": "integer",
        "unit": "red",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "\uFFFDred"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "_Red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer"
      },
      {
        "TYPE": "DELIM",
        "value": "."
      },
      {
        "TYPE": "IDENT",
        "value": "red"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DIMENSION",
        "value": 12,
        "type": "integer",
        "unit": "rêd"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+1 U+10 U+100 U+1000 U+10000 U+100000 U+1000000",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000000,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+? u+1? U+10? U+100? U+1000? U+10000? U+100000?",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+?? U+1?? U+10?? U+100?? U+1000?? U+10000??",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+??? U+1??? U+10??? U+100??? U+1000???",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+???? U+1???? U+10???? U+100????",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+????? U+1????? U+10?????",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+?????? U+1??????",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "u+1-2 U+100000-2 U+1000000-2 U+10-200000",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "NUMBER",
        "value": -2,
        "type": "integer",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 100000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "NUMBER",
        "value": -2,
        "type": "integer",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1000000,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "NUMBER",
        "value": -2,
        "type": "integer",
        "sign": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 10,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "NUMBER",
        "value": -200000,
        "type": "integer",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "ù+12 Ü+12 u +12 U+ 12 U+12 - 20 U+1?2 U+1?-50",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "ù"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "Ü"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "u"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 12,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "-"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "NUMBER",
        "value": 20,
        "type": "integer"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "NUMBER",
        "value": 2,
        "type": "integer"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "U"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      },
      {
        "TYPE": "DELIM",
        "value": "?"
      },
      {
        "TYPE": "NUMBER",
        "value": -50,
        "type": "integer",
        "sign": "-"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "3n+1",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 3,
        "type": "integer",
        "unit": "n"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "+3n+1",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": 3,
        "type": "integer",
        "unit": "n",
        "sign": "+"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "-3n+1",
    "expected": [
      {
        "TYPE": "DIMENSION",
        "value": -3,
        "type": "integer",
        "unit": "n",
        "sign": "-"
      },
      {
        "TYPE": "NUMBER",
        "value": 1,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "n+2",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "n"
      },
      {
        "TYPE": "NUMBER",
        "value": 2,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "+n+2",
    "expected": [
      {
        "TYPE": "DELIM",
        "value": "+"
      },
      {
        "TYPE": "IDENT",
        "value": "n"
      },
      {
        "TYPE": "NUMBER",
        "value": 2,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "-n+2",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "-n"
      },
      {
        "TYPE": "NUMBER",
        "value": 2,
        "type": "integer",
        "sign": "+"
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "~=|=^=$=*=||<!------> |/**/| ~/**/=",
    "expected": [
      {
        "TYPE": "DELIM",
        "value": "~"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      },
      {
        "TYPE": "DELIM",
        "value": "|"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      },
      {
        "TYPE": "DELIM",
        "value": "^"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      },
      {
        "TYPE": "DELIM",
        "value": "$"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      },
      {
        "TYPE": "DELIM",
        "value": "*"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      },
      {
        "TYPE": "DELIM",
        "value": "|"
      },
      {
        "TYPE": "DELIM",
        "value": "|"
      },
      {
        "TYPE": "CDO"
      },
      {
        "TYPE": "IDENT",
        "value": "----"
      },
      {
        "TYPE": "DELIM",
        "value": ">"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "|"
      },
      {
        "TYPE": "DELIM",
        "value": "|"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "DELIM",
        "value": "~"
      },
      {
        "TYPE": "DELIM",
        "value": "="
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "a:not([href^=http\\:],  [href ^=\t'https\\:'\n]) { color: rgba(0%, 100%, 50%); }",
    "expected": [
      {
        "TYPE": "IDENT",
        "value": "a"
      },
      {
        "TYPE": "COLON"
      },
      {
        "TYPE": "FUNCTION",
        "name": "not",
        "value": [
          {
            "TYPE": "BLOCK",
            "name": "[",
            "value": [
              {
                "TYPE": "IDENT",
                "value": "href"
              },
              {
                "TYPE": "DELIM",
                "value": "^"
              },
              {
                "TYPE": "DELIM",
                "value": "="
              },
              {
                "TYPE": "IDENT",
                "value": "http:"
              }
            ]
          },
          {
            "TYPE": "COMMA"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "BLOCK",
            "name": "[",
            "value": [
              {
                "TYPE": "IDENT",
                "value": "href"
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "DELIM",
                "value": "^"
              },
              {
                "TYPE": "DELIM",
                "value": "="
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "STRING",
                "value": "https:"
              },
              {
                "TYPE": "WHITESPACE"
              }
            ]
          }
        ]
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BLOCK",
        "name": "{",
        "value": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "IDENT",
            "value": "color"
          },
          {
            "TYPE": "COLON"
          },
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "FUNCTION",
            "name": "rgba",
            "value": [
              {
                "TYPE": "PERCENTAGE",
                "value": 0
              },
              {
                "TYPE": "COMMA"
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "PERCENTAGE",
                "value": 100
              },
              {
                "TYPE": "COMMA"
              },
              {
                "TYPE": "WHITESPACE"
              },
              {
                "TYPE": "PERCENTAGE",
                "value": 50
              }
            ]
          },
          {
            "TYPE": "SEMICOLON"
          },
          {
            "TYPE": "WHITESPACE"
          }
        ]
      }
    ]
  },
  {
    "parser": "parseAListOfComponentValues",
    "css": "@media print { (foo]{bar) }baz",
    "expected": [
      {
        "TYPE": "AT-KEYWORD",
        "value": "media"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "IDENT",
        "value": "print"
      },
      {
        "TYPE": "WHITESPACE"
      },
      {
        "TYPE": "BLOCK",
        "name": "{",
        "value": [
          {
            "TYPE": "WHITESPACE"
          },
          {
            "TYPE": "BLOCK",
            "name": "(",
            "value": [
              {
                "TYPE": "IDENT",
                "value": "foo"
              },
              {
                "TYPE": "CLOSE-SQUARE"
              },
              {
                "TYPE": "BLOCK",
                "name": "{",
                "value": [
                  {
                    "TYPE": "IDENT",
                    "value": "bar"
                  },
                  {
                    "TYPE": "CLOSE-PAREN"
                  },
                  {
                    "TYPE": "WHITESPACE"
                  }
                ]
              },
              {
                "TYPE": "IDENT",
                "value": "baz"
              }
            ]
          }
        ]
      }
    ]
  },

  // parseACommaSeparatedListOfComponentValues()
  {
    "parser": "parseACommaSeparatedListOfComponentValues",
    "css": "",
    "expected": []
  },
  {
    "parser": "parseACommaSeparatedListOfComponentValues",
    "css": "foo ,bar, baz",
    "expected": [
      [
        {
          "TYPE": "IDENT",
          "value": "foo"
        },
        {
          "TYPE": "WHITESPACE"
        }
      ],
      [
        {
          "TYPE": "IDENT",
          "value": "bar"
        }
      ],
      [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "baz"
        }
      ]
    ]
  },
  {
    "parser": "parseACommaSeparatedListOfComponentValues",
    "css": "foo bar, baz qua",
    "expected": [
      [
        {
          "TYPE": "IDENT",
          "value": "foo"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "bar"
        }
      ],
      [
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "baz"
        },
        {
          "TYPE": "WHITESPACE"
        },
        {
          "TYPE": "IDENT",
          "value": "qua"
        }
      ]
    ]
  },
  {
    "parser": "parseACommaSeparatedListOfComponentValues",
    "css": "foo{}}",
    "expected": [
      [
        {
          "TYPE": "IDENT",
          "value": "foo"
        },
        {
          "TYPE": "BLOCK",
          "name": "{",
          "value": []
        },
        {
          "TYPE": "CLOSE-CURLY"
        }
      ]
    ]
  },
  {
    "parser": "parseACommaSeparatedListOfComponentValues",
    "css": "var(--abc,--def)",
    "expected": [
      [
        {
          "TYPE": "FUNCTION",
          "name": "var",
          "value": [
            {
              "TYPE": "IDENT",
              "value": "--abc"
            },
            {
              "TYPE": "COMMA"
            },
            {
              "TYPE": "IDENT",
              "value": "--def"
            }
          ]
        }
      ]
    ]
  },

  // toSource()

  // -- WHITESPACE
  {
    parser: "",
    css: " ",
    expectedToSource: " "
  },
  {
    parser: "",
    css: "\n",
    expectedToSource: " "
  },
  {
    parser: "",
    css: " \t\r\n\f ",
    expectedToSource: " "
  },

  // -- CDO
  {
    parser: "",
    css: "<!--",
    expectedToSource: "<!--"
  },

  // -- CDC
  {
    parser: "",
    css: "-->",
    expectedToSource: "-->"
  },

  // -- COLON
  {
    parser: "",
    css: ":",
    expectedToSource: ":"
  },

  // -- SEMICOLON
  {
    parser: "",
    css: ";",
    expectedToSource: ";"
  },

  // -- COMMA
  {
    parser: "",
    css: ",",
    expectedToSource: ","
  },

  // -- OPEN-CURLY
  {
    parser: "",
    css: "{",
    expectedToSource: "{"
  },

  // -- CLOSE-CURLY
  {
    parser: "",
    css: "}",
    expectedToSource: "}"
  },

  // -- OPEN-SQUARE
  {
    parser: "",
    css: "[",
    expectedToSource: "["
  },

  // -- CLOSE-SQUARE
  {
    parser: "",
    css: "]",
    expectedToSource: "]"
  },

  // -- OPEN-PAREN
  {
    parser: "",
    css: "(",
    expectedToSource: "("
  },

  // -- CLOSE-PAREN
  {
    parser: "",
    css: ")",
    expectedToSource: ")"
  },

  // -- DELIM
  {
    parser: "",
    css: "#",
    expectedToSource: "#"
  },
  {
    parser: "",
    css: ".",
    expectedToSource: "."
  },
  {
    parser: "",
    css: "@",
    expectedToSource: "@"
  },
  {
    parser: "",
    css: "*",
    expectedToSource: "*"
  },
  {
    parser: "",
    css: "+",
    expectedToSource: "+"
  },
  {
    parser: "",
    css: "|",
    expectedToSource: "|"
  },
  {
    parser: "",
    css: "\\\n",
    expectedToSource: "\\\n "
  },
  {
    parser: "",
    css: "\\\n ",
    expectedToSource: "\\\n "
  },

  // -- IDENT
  {
    parser: "",
    css: "foo_bar",
    expectedToSource: "foo_bar"
  },
  {
    parser: "",
    css: "foo-bar",
    expectedToSource: "foo-bar"
  },
  {
    parser: "",
    css: "-foo-bar",
    expectedToSource: "-foo-bar"
  },
  {
    parser: "",
    css: "--foo-bar",
    expectedToSource: "--foo-bar"
  },
  {
    parser: "",
    css: "\u4E00\u{20000}\u{10FFFF}",
    expectedToSource: "\u4E00\u{20000}\u{10FFFF}"
  },
  {
    parser: "",
    css: r`\31-foo`,
    expectedToSource: r`\31 -foo`
  },
  {
    parser: "",
    css: r`\39-foo`,
    expectedToSource: r`\39 -foo`
  },
  {
    parser: "",
    css: r`\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~`,
    expectedToSource: r`\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^_\`\{\|\}\~`
  },
  {
    parser: "",
    css: r`\1\2\3\4\5\6\7\8\9\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F`,
    expectedToSource: r`\1 \2 \3 \4 \5 \6 \7 \8 \9 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f `
  },
  {
    parser: "",
    css: r`\2000 \3000`,
    expectedToSource: `\\\u2000\\\u3000`
  },

  // -- HASH
  {
    parser: "",
    css: "#foo-bar",
    expectedToSource: "#foo-bar"
  },
  {
    parser: "",
    css: "#-foo-bar",
    expectedToSource: "#-foo-bar"
  },
  {
    parser: "",
    css: "#--foo-bar",
    expectedToSource: "#--foo-bar"
  },
  {
    parser: "",
    css: "\u4E00\u{20000}\u{10FFFF}",
    expectedToSource: "\u4E00\u{20000}\u{10FFFF}"
  },
  {
    parser: "",
    css: r`#\31-foo`,
    expectedToSource: r`#\31 -foo`
  },
  {
    parser: "",
    css: r`#\39-foo`,
    expectedToSource: r`#\39 -foo`
  },
  {
    parser: "",
    css: r`#\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~`,
    expectedToSource: r`#\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^_\`\{\|\}\~`
  },
  {
    parser: "",
    css: r`#\1\2\3\4\5\6\7\8\9\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F`,
    expectedToSource: r`#\1 \2 \3 \4 \5 \6 \7 \8 \9 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f `
  },
  {
    parser: "",
    css: r`#\2000 \3000`,
    expectedToSource: `#\\\u2000\\\u3000`
  },
  {
    parser: "",
    css: "#123-foo",
    expectedToSource: "#123-foo"
  },

  // -- STRING ("")
  {
    parser: "",
    css: '"foo bar"',
    expectedToSource: '"foo bar"'
  },
  {
    parser: "",
    css: '" !#$%&()*+,./:;<=>?@[]^_`{|}~"',
    expectedToSource: '" !#$%&()*+,./:;<=>?@[]^_`{|}~"'
  },
  {
    parser: "",
    css: '"\t"',
    expectedToSource: '"\t"'
  },
  {
    parser: "",
    css: '"\u2000\u3000"',
    expectedToSource: '"\u2000\u3000"'
  },
  {
    parser: "",
    css: `"'"`,
    expectedToSource: r`"'"`
  },
  {
    parser: "",
    css: r`"\""`,
    expectedToSource: r`"\""`
  },
  {
    parser: "",
    css: r`"\\"`,
    expectedToSource: r`"\\"`
  },
  {
    parser: "",
    css: r`"\1\2\3\4\5\6\7\8\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F"`,
    expectedToSource: r`"\1 \2 \3 \4 \5 \6 \7 \8 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f "`
  },
  {
    parser: "",
    css: '"abc',
    expectedToSource: '"abc"'
  },

  // -- STRING ('')
  {
    parser: "",
    css: "'foo bar'",
    expectedToSource: '"foo bar"'
  },
  {
    parser: "",
    css: "' !#$%&()*+,./:;<=>?@[]^_`{|}~'",
    expectedToSource: '" !#$%&()*+,./:;<=>?@[]^_`{|}~"'
  },
  {
    parser: "",
    css: "'\t'",
    expectedToSource: '"\t"'
  },
  {
    parser: "",
    css: "'\u2000\u3000'",
    expectedToSource: '"\u2000\u3000"'
  },
  {
    parser: "",
    css: `'"'`,
    expectedToSource: r`"\""`
  },
  {
    parser: "",
    css: r`'\''`,
    expectedToSource: r`"'"`
  },
  {
    parser: "",
    css: r`'\\'`,
    expectedToSource: r`"\\"`
  },
  {
    parser: "",
    css: r`'\1\2\3\4\5\6\7\8\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F'`,
    expectedToSource: r`"\1 \2 \3 \4 \5 \6 \7 \8 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f "`
  },
  {
    parser: "",
    css: "'abc",
    expectedToSource: '"abc"'
  },

  // -- BADSTRING
  {
    parser: "",
    css: '"\n',
    expectedToSource: '"\n '
  },
  {
    parser: "",
    css: '"\n ',
    expectedToSource: '"\n '
  },
  {
    parser: "",
    css: '"foo\n',
    expectedToSource: '"\n '
  },

  // -- URL
  {
    parser: "",
    css: "url(foo-bar)",
    expectedToSource: 'url("foo-bar")'
  },
  {
    parser: "",
    css: "url(!#$%&*+,./:;<=>?@[]^_`{|}~)",
    expectedToSource: 'url("!#$%&*+,./:;<=>?@[]^_`{|}~")'
  },
  {
    parser: "",
    css: r`url(\9)`,
    expectedToSource: 'url("\t")'
  },
  {
    parser: "",
    css: "url(\u2000\u3000)",
    expectedToSource: 'url("\u2000\u3000")'
  },
  {
    parser: "",
    css: r`url(\1\2\3\4\5\6\7\8\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F)`,
    expectedToSource: r`url("\1 \2 \3 \4 \5 \6 \7 \8 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f ")`
  },

  // -- BADURL
  {
    parser: "",
    css: "url(bad url)",
    expectedToSource: "url(BAD URL)"
  },
  {
    parser: "",
    css: "url(foo'bar)",
    expectedToSource: "url(BAD URL)"
  },

  // -- FUNCTION
  {
    parser: "",
    css: "foo_bar(",
    expectedToSource: "foo_bar("
  },
  {
    parser: "",
    css: "foo-bar(",
    expectedToSource: "foo-bar("
  },
  {
    parser: "",
    css: "-foo-bar(",
    expectedToSource: "-foo-bar("
  },
  {
    parser: "",
    css: "--foo-bar(",
    expectedToSource: "--foo-bar("
  },
  {
    parser: "",
    css: "\u4E00\u{20000}\u{10FFFF}(",
    expectedToSource: "\u4E00\u{20000}\u{10FFFF}("
  },
  {
    parser: "",
    css: r`\31-foo(`,
    expectedToSource: r`\31 -foo(`
  },
  {
    parser: "",
    css: r`\39-foo(`,
    expectedToSource: r`\39 -foo(`
  },
  {
    parser: "",
    css: r`\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~(`,
    expectedToSource: r`\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^_\`\{\|\}\~(`
  },
  {
    parser: "",
    css: r`\1\2\3\4\5\6\7\8\9\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F(`,
    expectedToSource: r`\1 \2 \3 \4 \5 \6 \7 \8 \9 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f (`
  },
  {
    parser: "",
    css: r`\2000 \3000(`,
    expectedToSource: `\\\u2000\\\u3000(`
  },

  // -- AT-KEYWORD
  {
    parser: "",
    css: "@foo_bar",
    expectedToSource: "@foo_bar"
  },
  {
    parser: "",
    css: "@foo-bar",
    expectedToSource: "@foo-bar"
  },
  {
    parser: "",
    css: "@-foo-bar",
    expectedToSource: "@-foo-bar"
  },
  {
    parser: "",
    css: "@--foo-bar",
    expectedToSource: "@--foo-bar"
  },
  {
    parser: "",
    css: "@\u4E00\u{20000}\u{10FFFF}",
    expectedToSource: "@\u4E00\u{20000}\u{10FFFF}"
  },
  {
    parser: "",
    css: r`@\31-foo`,
    expectedToSource: r`@\31 -foo`
  },
  {
    parser: "",
    css: r`@\39-foo`,
    expectedToSource: r`@\39 -foo`
  },
  {
    parser: "",
    css: r`@\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~`,
    expectedToSource: r`@\ \!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^_\`\{\|\}\~`
  },
  {
    parser: "",
    css: r`@\1\2\3\4\5\6\7\8\9\A\B\C\D\E\F\10\11\12\13\14\15\16\17\18\19\1A\1B\1C\1D\1E\1F\7F`,
    expectedToSource: r`@\1 \2 \3 \4 \5 \6 \7 \8 \9 \a \b \c \d \e \f \10 \11 \12 \13 \14 \15 \16 \17 \18 \19 \1a \1b \1c \1d \1e \1f \7f `
  },
  {
    parser: "",
    css: r`@\2000 \3000`,
    expectedToSource: `@\\\u2000\\\u3000`
  },

  // -- NUMBER
  {
    parser: "",
    css: "123",
    expectedToSource: "123"
  },
  {
    parser: "",
    css: "+123",
    expectedToSource: "+123"
  },
  {
    parser: "",
    css: "-123",
    expectedToSource: "-123"
  },
  {
    parser: "",
    css: "0",
    expectedToSource: "0"
  },
  {
    parser: "",
    css: "+0",
    expectedToSource: "+0"
  },
  {
    parser: "",
    css: "-0",
    expectedToSource: "-0"
  },
  {
    parser: "",
    css: "1.5",
    expectedToSource: "1.5"
  },
  {
    parser: "",
    css: "+1.5",
    expectedToSource: "+1.5"
  },
  {
    parser: "",
    css: "-1.5",
    expectedToSource: "-1.5"
  },
  {
    parser: "",
    css: "1.3e12",
    expectedToSource: "1300000000000"
  },
  {
    parser: "",
    css: "+1.3e12",
    expectedToSource: "+1300000000000"
  },
  {
    parser: "",
    css: "-1.3e12",
    expectedToSource: "-1300000000000"
  },
  {
    parser: "",
    css: "1.3e-12",
    expectedToSource: "1.3e-12"
  },
  {
    parser: "",
    css: "+1.3e-12",
    expectedToSource: "+1.3e-12"
  },
  {
    parser: "",
    css: "-1.3e-12",
    expectedToSource: "-1.3e-12"
  },

  // -- PERCENTAGE
  {
    parser: "",
    css: "123%",
    expectedToSource: "123%"
  },
  {
    parser: "",
    css: "+123%",
    expectedToSource: "+123%"
  },
  {
    parser: "",
    css: "-123%",
    expectedToSource: "-123%"
  },
  {
    parser: "",
    css: "0%",
    expectedToSource: "0%"
  },
  {
    parser: "",
    css: "+0%",
    expectedToSource: "+0%"
  },
  {
    parser: "",
    css: "-0%",
    expectedToSource: "-0%"
  },
  {
    parser: "",
    css: "1.5%",
    expectedToSource: "1.5%"
  },
  {
    parser: "",
    css: "+1.5%",
    expectedToSource: "+1.5%"
  },
  {
    parser: "",
    css: "-1.5%",
    expectedToSource: "-1.5%"
  },

  // -- DIMENSION
  {
    parser: "",
    css: "123px",
    expectedToSource: "123px"
  },
  {
    parser: "",
    css: "+123px",
    expectedToSource: "+123px"
  },
  {
    parser: "",
    css: "-123px",
    expectedToSource: "-123px"
  },
  {
    parser: "",
    css: "0px",
    expectedToSource: "0px"
  },
  {
    parser: "",
    css: "+0px",
    expectedToSource: "+0px"
  },
  {
    parser: "",
    css: "-0px",
    expectedToSource: "-0px"
  },
  {
    parser: "",
    css: "1.5px",
    expectedToSource: "1.5px"
  },
  {
    parser: "",
    css: "+1.5px",
    expectedToSource: "+1.5px"
  },
  {
    parser: "",
    css: "-1.5px",
    expectedToSource: "-1.5px"
  },
  {
    parser: "",
    css: "123-px",
    expectedToSource: "123-px"
  },
  {
    parser: "",
    css: r`123\65 5`,
    expectedToSource: r`123\65 5`
  },
  {
    parser: "",
    css: r`123\65-5`,
    expectedToSource: r`123\65 -5`
  },

  // -- STYLESHEET
  {
    parser: "parseAStylesheet",
    css: `@import "myfile.css";p{color:red}@media print{p{color:green}}`,
    expectedToSource: `\
@import "myfile.css";
p {
  color: red;
}
@media print {
  p {
    color: green;
  }
}`
  },

  // -- AT-RULE
  {
    parser: "parseARule",
    css: "@import 'myfile.css'",
    expectedToSource: '@import "myfile.css";'
  },
  {
    parser: "parseARule",
    css: "@media all{}",
    expectedToSource: `@media all { }`
  },
  {
    parser: "parseARule",
    css: "@media all{p{}}",
    expectedToSource: `@media all {
  p { }
}`
  },
  {
    parser: "parseARule",
    css: "@media all{@media print{}}",
    expectedToSource: `@media all {
  @media print { }
}`
  },
  {
    parser: "parseARule",
    css: "@font-face{font-family:monospace;src:url(myfile.woff)}",
    expectedToSource: `\
@font-face {
  font-family: monospace;
  src: url("myfile.woff");
}`
  },
  {
    parser: "parseARule",
    css: "@media all{@media print{div{color:yellow}}p{color:red}}",
    expectedToSource: `\
@media all {
  @media print {
    div {
      color: yellow;
    }
  }
  p {
    color: red;
  }
}`
  },
  {
    parser: "parseARule",
    css: "@media all { @media print { div { color: yellow; } } p { color: red; } }",
    expectedToSource: `\
@media all {
  @media print {
    div {
      color: yellow;
    }
  }
  p {
    color: red;
  }
}`
  },

  // -- QUALIFIED-RULE
  {
    parser: "parseARule",
    css: "div{}",
    expectedToSource: `div { }`
  },
  {
    parser: "parseARule",
    css: "div{color:green}",
    expectedToSource: `\
div {
  color: green;
}`
  },
  {
    parser: "parseARule",
    css: "div{p{color:red}}",
    expectedToSource: `\
div {
  p {
    color: red;
  }
}`
  },
  {
    parser: "parseARule",
    css: "div{p{color:red}color:green;background:blue;div{color:yellow}}",
    expectedToSource: `\
div {
  color: green;
  background: blue;
  p {
    color: red;
  }
  div {
    color: yellow;
  }
}`
  },
  {
    parser: "parseARule",
    css: "div { p { color: red; } color: green; background: blue; div { color: yellow } }",
    expectedToSource: `\
div {
  color: green;
  background: blue;
  p {
    color: red;
  }
  div {
    color: yellow;
  }
}`
  },

  // -- DECLARATION
  {
    parser: "parseADeclaration",
    css: "font-family:1.2em/1.5 monospace",
    expectedToSource: "font-family: 1.2em/1.5 monospace;"
  },
  {
    parser: "parseADeclaration",
    css: "font-family  :  1.2em/1.5  monospace ; ",
    expectedToSource: "font-family: 1.2em/1.5 monospace;"
  },
  {
    parser: "parseADeclaration",
    css: "font-family:1.2em/1.5 monospace!IMPORTANT",
    expectedToSource: "font-family: 1.2em/1.5 monospace !important;"
  },
  {
    parser: "parseADeclaration",
    css: "font-family  :  1.2em/1.5  monospace  ! IMPORTant; ",
    expectedToSource: "font-family: 1.2em/1.5 monospace !important;"
  },

  // -- BLOCK
  {
    parser: "parseAComponentValue",
    css: "{p{color:red;} display: block; font-family: 1.2em/1.5 monospace}",
    expectedToSource: "{p{color:red;} display: block; font-family: 1.2em/1.5 monospace}"
  },
  {
    parser: "parseAComponentValue",
    css: '[myattr="myvalue"]',
    expectedToSource: '[myattr="myvalue"]'
  },
  {
    parser: "parseAComponentValue",
    css: "(not (color: #fff))",
    expectedToSource: "(not (color: #fff))"
  },

  // -- FUNCTION
  {
    parser: "parseAComponentValue",
    css: "var(--foo, var(--bar, 1.2em/1.5 monospace))",
    expectedToSource: "var(--foo, var(--bar, 1.2em/1.5 monospace))"
  }
];

}));
