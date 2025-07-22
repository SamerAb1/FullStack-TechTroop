const { handleCommand, printUsage } = require('./commandHandler');

console.log('=== AutoComplete Trie Console ===');
console.log("Type 'help' for commands\n");

const [, , command, ...args] = process.argv;



if (!command) {
  console.log('Error: No command provided');
  printUsage(true);
  process.exit(1);
}

handleCommand(command, args);
