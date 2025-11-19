    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../Documentation/Notes.txt');
    const readline = require('readline')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //this is an event dont use promise, promise are only resolve once, not multiple.
    //event===multiple
    async function writeMyFile(userInput){

        //this is terminal module embed on node js, this is no question prompt, just accepting inputs
           if(!userInput.trim()){
                console.log("Error")
                return;
           }
            
         // Read the last character of the file to check if newline is needed
        fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err && err.code !== 'ENOENT') {
                        console.log("Error reading file:", err);
                        return;
                    }

        // Ensure the file ends with a newline before appending
        const prefix = data && !data.endsWith('\n') ? '\n' : ''; //shorthand if and else operator
        fs.appendFile(filePath, prefix + userInput + '\n', 'utf8', (err) => {
            if (err) {
                console.log("Error writing file:", err);
                return;
            }

            // Read and print updated content
            fs.readFile(filePath, 'utf8', (err, updatedData) => {
                if (err) console.log("Error reading file:", err);
                else console.log("Updated file content:\n", updatedData);
            });
        });
    });

    }

    console.log("Enter the notes: ")
    //this is the scanner version of nodeJS
    rl.on('line', (input) =>{
        writeMyFile(input)
    })