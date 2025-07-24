const AutoCompleteTrie = require('./autoCompleteTrie');

const trie = new AutoCompleteTrie();

const SIG = { add: 1, find: 1, complete: 1, help: 0, exit: 0 };
const WORD_RE = /^[a-z]+$/i;

function validate(cmd, args) {
  if (!(cmd in SIG)) return `Unknown command "${cmd}"`;
  if (args.length !== SIG[cmd]) return `Expected ${SIG[cmd]} arg(s) for "${cmd}"`;
  if (SIG[cmd] === 1 && !WORD_RE.test(args[0])) return `Invalid word "${args[0]}" (letters only)`;
  return null;
}

function handleCommand(command, args) {
  const err = validate(command, args);
  if (err) { console.error(err); printUsage(true); return; }

  switch (command) {
    case 'add': {
      const word = args[0].toLowerCase();
      trie.addWord(word);
      console.log(`Added '${word}' to dictionary`);
      break;
    }
    case 'find': {
      const word = args[0].toLowerCase();
      console.log(trie.findWord(word) ? `'${word}' exists in dictionary` : `'${word}' not found in dictionary`);
      break;
    }
    case 'complete': {
      const p = args[0].toLowerCase();
      const list = trie.predictWords(p);
      console.log(
        list.length ? `Suggestions for '${p}': ${list.join(', ')}` : `No suggestions for '${p}'`);
      break;
    }
    case 'help':
      printUsage();
      break;

    case 'exit':
      console.log('Goodbye!');
      process.exit(0);
  }
}

function printUsage(short = false) {
  if (short) {
    console.log('Usage: node app.js <command> [arg]');
    return;
  }
  console.log(`
Commands:
  add <word>         - Add word to dictionary
  find <word>        - Check if word exists
  complete <prefix>  - Get completions
  help               - Show this message
  exit               - Quit program
`);
}

module.exports = { handleCommand, printUsage };
