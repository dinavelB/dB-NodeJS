    const fileSystem = require('fs')
    const path = require('path');

    const https = require('https')

    function myServer(){

        //create mime first
        //mimetypes lets the server know what file is it getting.
        let mimetypes = {
            "css" : "text/css",
            "html" : "text/html"
        }

        //then ssl
        //options are used by servers.
        //my created pesonlized ssl, check for Home/important-commands folder to see how to create ssl
        let options = {
            pfx: fileSystem.readFileSync("ssl/cert.pfx"),
            passphrase: "dB020606"
        }

        //passed the options here since https requires ssl
        const server = https.createServer(options, (request, response) =>{
            //if its empty use homepage.html or else
                //name pf the file the server sends
            let filePath = request.url === '/' ? '/homepage.html' : request.url;

            //get the path of the website files eg.html, css etc
            //file are here the html, css, and etc
            //it will find the files
            const websitePath = path.join(__dirname, '../myWebsite', filePath)

            fileSystem.readFile(websitePath, (error, content)=>{
                if(error){
                    console.log("error: " + error)
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end("File not found"); //server response to client
                return;
                } 

                const ext = path.extname(websitePath).slice(1); //extension name gets the file, ".html", then slices it turns into "html"
                const mimeType = mimetypes[ext] || 'application/octet-stream';

                //server tells the browser what its receiving
                response.writeHead(200, { 'Content-Type': mimeType });
                response.end(content);
            })
        })
        //shuld be outside of request handler
        server.listen('8443', 'localhost', ()=>{
                console.log('HTTPS server started on https://localhost:8443')
            })
    }
    myServer()