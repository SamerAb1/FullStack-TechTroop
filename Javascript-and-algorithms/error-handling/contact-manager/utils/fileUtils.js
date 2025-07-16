const fs = require('fs');

function readContacts(filePath) { 
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const contacts = JSON.parse(data);
        if (!Array.isArray(contacts)) throw new Error('Invalid file format');
        return contacts;
    } catch (e) {
        if (e.code === 'ENOENT') throw new Error('File not found');
        throw new Error('Corrupted contacts file');
    }
}

function saveContacts(filePath, contacts) { 
    try {
        fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');
    } catch (e) {
        throw new Error('Error writing file');
    }
}

module.exports = { readContacts, saveContacts };
