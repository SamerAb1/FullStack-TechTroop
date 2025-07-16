const { readContacts, saveContacts } = require('../utils/fileUtils');
const { validateContact } = require('../utils/validation');

function addContact(contact, filePath) { 
    let contacts;

    try{
         contacts = readContacts(filePath);
    }catch(e){
         if (e.message === 'File not found') {
            contacts = [];
        }else {
            throw e;
        }
    }
    const validation = validateContact(contact, contacts);
    if (!validation.valid) {
        throw new Error(validation.error);
    }
    contacts.push(contact);
    try{
            saveContacts(filePath,contacts);
    }catch(e){
            throw new Error('Error: could not save contacts');
    }
}

function deleteContact(email, filePath) { 
    let contacts;

    try{
         contacts = readContacts(filePath);
    }catch(e){
            throw e;
    }
     let index = contacts.findIndex(
            c => c.email && c.email.toLowerCase() === email.toLowerCase()
        );
        if (index === -1) {
            throw new Error(`Error: No contact found with email: ${email}`);
        }
        const deleted = contacts.splice(index, 1)[0];
        try{
            saveContacts(filePath,contacts);
            
        }catch(e){
            throw new Error('Error: could not save contacts');
        }
        return {deleted, count: contacts.length};
}

function listContacts(filePath) { 
    let contacts;
    try{
        contacts = readContacts(filePath);
    }catch(e){
        throw e;
    }
    return contacts;
}

function searchContacts(query, filePath) { 
    let contacts;
    try{
        contacts = readContacts(filePath);
    }catch(e){
        throw e;
    }   
    const q = query.toLowerCase();
    const results = contacts.filter(c =>
            c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
    return {results, count: contacts.length}
}

module.exports = { addContact, deleteContact, listContacts, searchContacts };
