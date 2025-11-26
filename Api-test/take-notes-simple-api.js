    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../Documentation/Notes.txt');
    const readline = require('readline')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //this is an event dont use promise, promise are only resolve once, not multiple.
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
                console.log("Error writing  file:", err);
                return;
            }

            // Read and print updated content
            fs.readFile(filePath, 'utf8', (err, updatedData) => {
                if (err) console.log("Error reading file:", err);
                else console.log("Updated file content:\n", updatedData);
            });
        });
    })
    }

    //cant use async alone that has no promise if you are running an asynchronous callback, because it cant return itself
    async function readFile(){
        return new Promise((resolve, reject) =>{
            //asynchronous callback
            fs.readFile(filePath, 'utf-8', (error, content) =>{
                if(error) return reject(error)
                    else return resolve(content)
            })
        })
    }

    async function main(){
        console.log("type 1 to add a note, type 2 to see the note")
        /*
        const answer = Number(rl.on('line', input =>{
            return answer;
        })) this is wrong .on doesnt return a value.
            */

           //rl.once and on means if the user types and the enter key is press run this code.
           //its like an eventlistener
           //remember, we use async to auto promise when its returning a value, or to use awaits
        rl.once('line', async (input) =>{   
            const userResponse = Number(input.trim());

            if(userResponse === 1){
                rl.on('line', inputs =>{
                    writeMyFile(inputs)
                })
            } else if(userResponse === 2){
                try{
                    const file = await readFile();
                    console.log("Current notes: \n", file)
                    rl.close()
                } catch(err){
                    console.log("Error at: ", err)
                }
            } else{
                console.log("Invalid input")
                return
            }
        })

    }
    
main()