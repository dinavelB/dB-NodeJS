//const { rejects } = require('assert')
//const fs = require('fs') //this is a core module declared by require method
//fs for file system it provides crud, create, read, update, delete.
//good for file handling related tasks

/*
fs.readFile('list.txt', 'utf-8', (error) =>{
    if(error){
        throw error
    }
})
*/

async function readTFile(){
    //Important Note: wrap the callback to promise.
    const promise = new Promise((resolve, reject) =>{
        //file system module
        const fs = require('fs');
        //path module
        const path = require('path');

        //determine the path file 
        const filePath = path.join(__dirname, '../Documentation/docs.txt');

        fs.readFile(filePath, 'utf-8', (error, data) =>{
            if(error) reject(error)
                else resolve(data)
        })
    })

    return promise;
}

(async () =>{

    try{
        const file = await readTFile();
        console.log(file)
    } catch(error){
        console.log('error at', error)
    }
})();


