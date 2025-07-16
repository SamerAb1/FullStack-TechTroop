const path = require('path');
const { handleCommand, printUsage } = require('./commands/commandHandler');

const filePath = path.join(__dirname, 'contacts.json');

const [, , command, ...args] = process.argv;

// If no command, print usage and exit
if (!command) {
    console.log('Error: No command provided');
    printUsage(true);
    process.exit(1);
}

// Pass the command, arguments, and file path to the handler
handleCommand(command, args, filePath);