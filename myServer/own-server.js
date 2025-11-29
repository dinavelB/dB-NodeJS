const fs  = require('fs');
const path = require('path');
const https = require('https');

function serverFunction(){
    //let the server know what kind of files its getting
    let mimetypes = {
        "css" : "text/css",
        "html" : "text/html"
    }
    //server options, features
    let serverOptions = {
        pfx: fs.readFileSync("ssl/cert.pfx"),
        passphrase: "dB020606"
    }
    return new Promise((resolve, reject) =>{
        const server = https.createServer(serverOptions, (request, response) =>{

        let filename;
        if(request.url === "/"){
            filename = "/homepage.html"
        } else {
            filename = request.url
        }

        let folderPath = path.join(__dirname, "../myWebsite", filename)

        fs.readFile(folderPath, (error, content)=>{
            if(error){
                console.log("Error at" + error);
                response.writeHead(404, {"Content-Type" : "text/plain"});
                return reject(response.end("File not found."), error)
            }
        //extract the folder files to use in mimetype, use path.extname
            const extractFile = path.extname(folderPath).slice(1);
            //store the new mimetype that has the extractfile
            const mimeType = mimetypes[extractFile] || "application/octet-stream"
            let writehead  = response.writeHead(200, {"Content-Type" : mimeType})
            return resolve(writehead, response.end(content))

        })
    })

    })

    server.listen(8080, "localhost", ()=>{
        console.log("Server has started at port 8080")
    })
}