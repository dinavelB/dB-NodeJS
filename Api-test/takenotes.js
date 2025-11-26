const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pathfile = path.join(__dirname, "../Documentation/Notes.txt");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function takeNotes(userInputs){
    //uses promise so it can return: note!! asynchronous callbacks cant return a value, unless using a promise, so use promise.
    if(userInputs === "" || !userInputs.trim()){ 
        throw ("Must be have an input")
    }

    //error no entity (enoent); file doesnt exist at the path(pathfile)
    //error.code or code method are use to identify the error on modules node js
    return new Promise((resolve, reject) =>{
        fs.readFile(pathfile, 'utf8', (error, data) =>{

        if(error && error.code != "ENOENT"){ //if its error and error.code not enoent 
            return reject("Error writing the file")
        }
            //appendFile has only an error parameter
            const prefix  = data && !data.endsWith("\n") ? "\n" : "";
            fs.appendFile(pathfile, prefix + userInputs + "\n", "utf8", (error) =>{
                if(error) return reject(error);

                fs.readFile(pathfile, "utf8", (error, success) =>{
                    if(error) return reject(error);

                    //do not console.log a resolve method, it will return undefined, treat resolve and reject as signals
                    //console.log("here are the files:\n")
                    //resolve & reject takes one arg only. 
                    //just return reject or resolve and dont add anything else like console.log etc.
                    resolve(success)
                })
            })
        })
    })
}

function seeFile(){
    return new Promise((resolve, reject) =>{
        fs.readFile(pathfile, "utf8", (error, data)=>{

        if(error) return reject(error);

        resolve(data)
        })
    })
}

async function main(){
    console.log("Type 1 for adding a notes, 2 for to see the lists");
        //the async keyword isnt affecting the param userinput.
        // i mean its not making it a promise, the async is just declared in our callback so
        //we can use await in this block.
    rl.once("line", async userinput =>{
        const choice = Number(userinput.trim());

            if(choice === 1){
                console.log("Enter the notes: ")
                rl.on("line", async userNotes =>{
                    try{
                       const file = await takeNotes(userNotes)
                       console.log("Here are the notes:\n", file)
                       rl.close()
                    } catch(error){
                        console.log("error: ", error)
                    }
                })
            } else{
                const file = await seeFile()
                console.log("Here are the files:\n", file)
            }
    })
}

main();