const fs = require('fs')
const path = require('path')
const url = require('url')
const queryString = require('querystring')
const https = require('https')
const { queryObjects } = require('v8')

function myServer(routes = {}){
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
    let options = {
        pfx: fs.readFileSync(path.join(__dirname, '../cert.pfx')),
        passphrase: "dB020606"
    }

    const server = https.createServer(options, (request, response) =>{
        //get the url
        let parsedURL = url.parse(request.url)
        let file = parsedURL.pathname

        //get the file
        file = file === '/' ? '/homepage.html' : file
        const folderPath = path.join(__dirname, '../myWebsite', file)

        //custom routing for get requests
        /*if(routes[file]){
            routes[file](request, response, queryString.parse(parsedURL.query))
            return
        }
            */

        //for POST
        if(routes[file]){
            if(request.method === "POST"){
                let body = ''
                //the body is temp holder, the chunk are the datas being passed, 
                request.on('data', chunk => body += chunk) //store the chunks to the body
                request.on('end', ()=>{ //process the data
                    let queryData;
                    try{
                        queryData = JSON.parse(body || '{}')
                    }catch(error){
                        queryData = {}
                    }
                    
                    routes[file](request, response, queryData)
                })
                return; //end the code si the static will not receive post requesting
        }else{  
            routes[file](request, response, queryString.parse(parsedURL.query))
            return
        }
    }

        fs.readFile(folderPath, (error, data) =>{
            if(error){
                console.log("Error at: ", error)
                response.writeHead(404, {"content-type" : "text/html"})
                return response.end("File not Found")
            }

            
            const extractfile = path.extname(folderPath).slice(1)
            const mimetype = mimetypes[extractfile] || "application/octet-stream"

            response.writeHead(200, {"Content-Type" : mimetype})
            response.end(data)
        })
    })
    server.listen(8080, ()=>{
        console.log("Server is starting at 8080")
    })
}

module.exports = myServer