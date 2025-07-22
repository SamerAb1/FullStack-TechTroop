const { handleCommand, printUsage } = require('./commandHandler');

const [, , command, ...args] = process.argv;

if (!command) {
  console.log('Error: No command provided');
  printUsage(true);
  process.exit(1);
}

handleCommand(command, args);
