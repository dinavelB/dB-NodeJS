const fs = require('fs');
const path = require('path')
const myHttps = require('https');
const { resolveNaptr } = require('dns');
const url = require('url')

function dBServer(){
    let mimetypes = {
        "html" : "text/html",
        "css" : "text/css",
        "js": "text/javascript",
        "json": "application/json",
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "ico": "image/x-icon"
    }

    let serverOpts = {
        pfx: fs.readFileSync(path.join(__dirname, '../cert.pfx')),
        passphrase: "dB020606"
    }
    
    const server = myHttps.createServer(serverOpts, (request, response) =>{
        let parsedUrl = url.parse(request.url)//gets url's or body depends on the method
        let filename = parsedUrl.pathname

        filename = filename === '/' ? '/homepage.html' : filename //for static

        
        const folderpath = path.join(__dirname, "../myWebsite", filename);
        
        fs.readFile(folderpath, (error, data) =>{
            if(error){
                console.log("error: ", error)
                response.writeHead(404, {'Content-type' :  "text/plain"});
                return response.end('File not Found')               
            }

            const extractfile = path.extname(folderpath).slice(1)
            const mimeType = mimetypes[extractfile] || "application octet-stream"

            response.writeHead(200, {"Content-Type" : mimeType})
            response.end(data)
        })
    })

    server.listen(8280, ()=>{
        console.log("the server started at server 8280")
    })
}
dBServer()