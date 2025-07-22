const AutoCompleteTrie = require('./autoCompleteTrie');

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
    try {
        switch (command) {
            case 'add': {
                if(trie.addWord(args[0])) {console.log(`Added '${args[0]} to dictionary'`);}
                break;
            }
            case 'find': {
                if(trie.find(args[0])) {console.log(`'${args[0]}' exists in dictionary`);}
                else{console.log(`'${args[0]}' not found in dictionary`);}
                break;
            }
            case 'complete': {
                const list = trie.predictWords(args[0]);
                if(list){console.log(`Suggestion for '${args[0]}: ${list.join(', ')}`);}
                break;
            }
            case 'help':{
                printUsage();
                break;
            }
            case 'exit':{
                console.log("Goodbye!");
                process.exit(1);
            }
            default:
                console.log(`Error: Unknown command '${command}'`);
                printUsage(true);
        }
    } catch (e) {
        if (e.message === 'File not found') {
            if (command === 'add') {
                console.log('File not found - creating new contact list');
            } else {
                console.log('File not found');
            }
        } else {
            console.log(e.message);
        }
    }
}

function printUsage(short = false) {
    if (short) {
        console.log("Usage: node app.js [add|find|complete|help|exit] [arguments]");
        return;
    }
    console.log(`
Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program

`);
}

module.exports = { handleCommand, printUsage };
