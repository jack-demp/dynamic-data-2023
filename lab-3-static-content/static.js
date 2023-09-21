//setup or server
const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000
//define the port the app will be access from (80,8080,8888 are default to teh tomain/)
const server = http.createServer((request,response) => {
// Get the url
const path = request.url;

response.end("<div><p>We can technically write a bunch of html here.<br>But that is not <strong>efficient!!</strong></p></div>")

if( (path == "") || (path == "/")){
    response.writeHead(200 , { "Content-Type" : "Text/Plain" })
    response.end("Home Page")
}else if (path == "/about"){
    response.writeHead(200 , { "Content-Type" : "Text/Plain" })
    response.end("About us")
}else if (path == "/contact"){
    response.writeHead(200 , { "Content-Type" : "Text/html" })
    response.end("Contact us")
}else {
    response.writeHead(404 , { "Content-Type" : "Text/Plain" })
    response.end("Not Found")
}

})

server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop"))

fs.readFile(pathToFile, callBackFunction)//Callbacks are functions that get executed after another function has finished.


fs.readFile('/public/home.html' , (errors, content) => {
    //errors go first in case that there are any errors(i.e file doesn’t exist)
    //content will contain the contents of the file if everything worked!
    //we can then do something like response.end(content) 
})

fs.readFile('/public/home.html' , (errors, content) => {
    //errors go first. If there are any errors, we can stop everything else from running.
    //content will contain the html contents of the file.
    //we can then do something like response.end(content) if everything worked!
    if(errors){
        response.writeHead(500,{'Content-type':'text/plain'})
        return response.end('500 - Internal Error')
    }
    response.writeHead(200,{"Content-Type" : "text/html"})
    response.end(content)