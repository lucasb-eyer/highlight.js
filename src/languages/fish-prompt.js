/*
Language: Fish commandline prompt.
Author: lucas <lucasb.eyer.be@gmail.com>
Category: common
*/

function(hljs) {
  var FIRSTWORD_COMMAND = {className: 'keyword', end: /\s*\S+/};

  var NEWLINE = {
      begin: /\n/,
      starts: FIRSTWORD_COMMAND,
  };

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
    begin: /[;|]/,
    starts: FIRSTWORD_COMMAND,
  };

  var REDIR = {
    className: 'subst',
    begin: /[<^>]\S+\b/,
    contains: [VAR],
  };

  var PROMPTS = [
    {begin: /^>\s+/},  /* from the official documentation. */
    {begin: /^.*><\(\(\(">\s+/},  /* WHATEVER><((("> */
  ];

  return {
    lexemes: /-?[a-z_\.]+/,
    keywords: {
      keyword:
        'and begin break case continue else end for function if in not or '+
        'return set switch test while',
      literal:
        'true false',
      built_in:
        'abbr alias argparse bg bind block breakpoint builtin '+
        'cd cdh command commandline complete contains count dirh '+
        'dirs disown echo emit eval exec exit fg fish '+
        'fish_breakpoint_prompt fish_config fish_indent fish_key_reader '+
        'fish_mode_prompt fish_opt fish_prompt fish_right_prompt '+
        'fish_update_completions fish_vi_mode funced funcsave '+
        'functions help history isatty jobs math nextd open popd '+
        'prevd printf prompt_pwd psub pushd pwd random read realpath '+
        'set_color source status string suspend trap '+
        'type ulimit umask vared wait',
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
          end: '\0',  // Continue across newlines (not sure if that's the right way!)
          contains: [
            {className: 'title', variants: PROMPTS, starts: FIRSTWORD_COMMAND},
            NEWLINE,
            hljs.HASH_COMMENT_MODE,
            hljs.NUMBER_MODE,
            VAR,
            QUOTE_STRING,
            APOS_STRING,
            SUBST_OPEN,
            SUBST_CLOSE,
            SEP,
            REDIR,
          ]
        },
        relevance: 20,
      },
    ],
  };
}
