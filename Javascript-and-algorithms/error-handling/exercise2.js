const fs = require('fs');

function readFileWithErrorHandling(fileName, callback) {

    fs.stat(fileName, (err, data) => {
        if (err) {
            return callback(`File not found: ${fileName}`);
        }

        if (data.isDirectory()) {
            return callback(`Error: ${fileName} is a directory, not a file`);
        }

        fs.readFile(fileName, (err, data) => {
            if (err) {
                return callback(`Error reading file: ${err.message}`);
            }
            return callback(`File read successfully. Size: ${data.length} bytes`);
        });
    });
}


readFileWithErrorHandling('existing.txt', (result) => {
    console.log(result);
});
readFileWithErrorHandling('notfound.txt', (result) => {
    console.log(result);
});
readFileWithErrorHandling('.', (result) => {
    console.log(result);
});
