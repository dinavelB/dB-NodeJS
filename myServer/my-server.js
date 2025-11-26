const fs = require('fs')
const path = require('path')

const https = require('https')

function server(){
    //set the mimetypes
    let mimetypes = {
        "css" : "text/css",
        "html" : "text/html"
    }

    //set the ssl
    let options = {
        pfx: fs.readFileSync("ssl/cert.pfx"),
        passphrase: "dB020606"
    }

    //dont forget to pass the ssl.
    const myserver = https.createServer(options, (request, reponse)=>{
        //filename
        let filename = request.url == "/" ? "/homepage.html" : request.url
        //find the file in the folder.
        let websiteFolder = path.join(__dirname, '../myWebsite', filename) ///get the filename

        //pass the website folder
        fs.readFile(websiteFolder, (error, content)=>{
            if(error){
                console.log("Error" + error)
                reponse.writeHead(400, {'Content Type' : 'text/plain'}) //obj after the code, writehead always has a content type
                reponse.end(error)
                return;
            }

            //extract the file from the folder
            const extractfile = path.extname(websiteFolder).slice(1);
            const mimeType = mimetypes[extractfile] || "application octect-stream"

            reponse.writeHead(200, {"Content-Type" : mimeType})
            response.end(content);
        })
    })

    server.listen(8443, 'localhost', ()=>{
        console.log("Server has started")
    })
}