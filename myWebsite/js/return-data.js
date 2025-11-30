
const fs = require('fs')
const path = require('path')
const dBServer = require('../../myServer/dBServer')

function printData(){
    const routes = {
        '/submitreponse' : (req, res, queryData) =>{
            const helloPath = path.join(__dirname, '../../myWebsite/Hello.html')

            fs.readFile(helloPath, 'utf8', (error, data) =>{
                if(error){
                    console.log(error)
                    res.writeHead(404, {'Content-Type' : 'text/html'})
                    return res.end("File not found")
                }

                const page = data.replace('{{first-name}}', queryData.firstname || '')
                                .replace('{{last-name}}', queryData.lastname || '')

                res.writeHead(200, {"Content-Type" : "text/html"})
                res.end(page)
            })
        }
    }

    return routes;
}
dBServer(printData())