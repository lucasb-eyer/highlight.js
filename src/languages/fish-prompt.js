/*
Language: Fish commandline prompt.
Author: lucas <lucasb.eyer.be@gmail.com>
Category: common
*/

function(hljs) {
  var FIRSTWORD_COMMAND = {className: 'keyword', end: /\s*\S+/};

  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d_]+/},
      {begin: /\$[\w\d_]+\[-?\d+\]/},  /* List indexing */
      {begin: /\$[\w\d_]+\[-?\d+\.\.-?\d+\]/},  /* List slicing */
      {begin: /\$\{(.*?)\}/},  /* Curly braces around name. */
    ]
  };

  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
    ]
  };

  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/,
  };

  var SUBST_OPEN = {
    className: 'subst',
    begin: /\(/,
    starts: FIRSTWORD_COMMAND,
  };
  var SUBST_CLOSE = {
    className: 'subst',
    begin: /\)/,
  };
  var SEP = {
    className: 'subst',
    begin: /;/,
    starts: FIRSTWORD_COMMAND,
  };

  var PROMPTS = [
    {begin: /^>\s+/},  /* from the official documentation. */
    {begin: /^.*><\(\(\(">\s+/},  /* WHATEVER><((("> */
  ];

  return {
    lexemes: /-?[a-z_\.]+/,
    keywords: {
      keyword:
        'if then else elif fi for break continue while in do done exit return set '+
        'declare case esac export exec function',
      literal:
        'true false',
      built_in:
        'alias and begin bg bind block break breakpoint builtin case cd command'+
        'commandline complete contains continue count dirh dirs echo else emit'+
        'end eval exec exit fg fish fish_config fish_indent fish_pager'+
        'fish_prompt fish_right_prompt fish_update_completions fishd for'+
        'funced funcsave function functions help history if isatty jobs math'+
        'mimedb nextd not open or popd prevd psub pushd pwd random read return'+
        'set set_color source status switch test trap type ulimit umask vared'+
        'while',
      special:
        'BROWSER CDPATH PATH umask _ argv history HOME PWD status USER'+
        'LANG LC_ALL LC_COLLATE LC_CTYPE LC_MESSAGES LC_MONETARY LC_NUMERIC LC_TIME'+
        'fish_greeting fish_user_paths',
    },
    contains: [
      {
        variants: PROMPTS,
        returnBegin: true,
        starts: {
          end: '$',
          contains: [
            {className: 'title', variants: PROMPTS, starts: FIRSTWORD_COMMAND},
            hljs.HASH_COMMENT_MODE,
            hljs.NUMBER_MODE,
            VAR,
            QUOTE_STRING,
            APOS_STRING,
            SUBST_OPEN,
            SUBST_CLOSE,
            SEP,
          ]
        },
        relevance: 20,
      },
    ],
  };
}
