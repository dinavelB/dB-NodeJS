const http = require('http') //require means, no top level await, wrap iton async.

//this creates a server and hast methood objs ike req for request and res for response.
//res() and req()

async function myServer(){
    return new Promise((resolve) =>{
        //create first a server that has request and response and use it later.
        //this is synchronous
        const server = http.createServer((request, response) =>{
            response.end("This is my first server") // systsem receives a request then returns this message (response)
        })
        //this part is the asynchrounous 
         server.listen(8080, () =>{
            console.log("Server created successfully")
            resolve(server)
        })
    })
}

(async ()=>{
    await myServer()
})()