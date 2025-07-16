const { addContact, deleteContact, listContacts, searchContacts } = require('../services/contactService');

function handleCommand(command, args, filePath) {
    try {
        switch (command) {
            case 'add': {
                if (args.length < 3) {
                    console.log('Error: Missing arguments for add command');
                    printUsage();
                    return;
                }
                const [name, email, phone] = args;
                printLoadingMsg();
                let fileWasMissing = false;
                try {
                    addContact({ name, email, phone }, filePath);
                } catch (e) {
                    if (e.message === 'File not found') {
                        fileWasMissing = true;
                        console.log('File not found - creating new contact list');
                        addContact({ name, email, phone }, filePath); // Try again with new file
                    } else if (e.message.startsWith('Error:')) {
                        console.log(e.message);
                        return;
                    } else {
                        throw e;
                    }
                }
                const contacts = listContacts(filePath);
                if (!fileWasMissing) {
                    console.log(`Loaded ${contacts.length - 1} contacts`);
                }
                console.log(`Contact added: ${name}`);
                console.log('Contacts saved to contacts.json');
                break;
            }
            case 'list': {
                printLoadingMsg();
                const contacts = listContacts(filePath);
                console.log(`Loaded ${contacts.length} contacts\n`);
                if (contacts.length === 0) {
                    console.log('No contacts found.');
                } else {
                    console.log('=== All Contacts ===');
                    contacts.forEach((c, i) => {
                        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
                    });
                }
                break;
            }
            case 'search': {
                if (args.length < 1) {
                    console.log('Error: Missing query for search command');
                    printUsage();
                    return;
                }
                printLoadingMsg();
                const { results, count } = searchContacts(args[0], filePath);
                console.log(`Loaded ${count} contacts\n`);
                console.log(`=== Search Results for "${args[0]}" ===`);
                if (results.length === 0) {
                    console.log(`No contacts found matching "${args[0]}"`);
                } else {
                    results.forEach((c, i) => {
                        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
                    });
                }
                break;
            }
            case 'delete': {
                if (args.length < 1) {
                    console.log('Error: Missing email for delete command');
                    printUsage();
                    return;
                }
                printLoadingMsg();
                let contacts;
                try {
                    contacts = listContacts(filePath);
                    console.log(`Loaded ${contacts.length} contacts`);
                } catch (e) {
                    if (e.message === 'File not found') {
                        console.log('File not found');
                        return;
                    } else {
                        throw e;
                    }
                }
                try {
                    const { deleted } = deleteContact(args[0], filePath);
                    console.log(`Contact deleted: ${deleted.name}`);
                    console.log('Contacts saved to contacts.json');
                } catch (e) {
                    console.log(e.message);
                }
                break;
            }
            case 'help':
                printUsage();
                break;
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
function printLoadingMsg(){
    console.log('Loading contacts from contacts.json...');
}
function printUsage(short = false) {
    if (short) {
        console.log("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
        return;
    }
    console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  search "query"              - Search contacts by name or email
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"
`);
}

module.exports = { handleCommand, printUsage };
