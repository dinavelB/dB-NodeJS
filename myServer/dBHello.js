const fs = require('fs');
const path = require('path')
const myHttps = require('https');
const { resolveNaptr } = require('dns');


function dBServer(){
    let mimetypes = {
        "html" : "text/html",
        "css" : "text/css"
    }

    let serverOpts = {
        pfx: fs.readFileSync('ssl/cer.pfx'),
        passphrase: "dB020606"
    }

    const server = myHttps.createServer(serverOpts, (request, response) =>{
        let filename;
        if(request.url === '/'){
            filename = "/homepage.html"
        } else {
            filename = request.url
        }

        const folderpath = path.join(__dirname, "../myWebsite", filename);
        
        fs.readFile(folderpath, (error, data) =>{
            if(error){
                console.log("error: ", error)
                response.writeHead(404, {'Content-type' :  "text/plain"});
                return response.end('File not Found')               
            }

            const extractfile = path.extname(folderpath).slice(1)
            const mimeTypes = mimetypes[extractfile] || "application octet-stream"

            response.writeHead(200, {"content-type" : mimeTypes})
            response.end(data)
        })
    })

    server.listen(8080, 'localhost', ()=>{s
        console.log("the server started at server 8080")
    })
}