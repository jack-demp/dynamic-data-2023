//setup or server
const http = require('http')
const port = process.env.PORT || 3000
//define the port the app will be access from (80,8080,8888 are default to teh tomain/)
const server = http.createServer((request,response) => {
// Get the url
const path = request.url;

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