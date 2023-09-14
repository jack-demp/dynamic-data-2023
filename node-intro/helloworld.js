//setup or server
const http = require('http')
const port = process.env.PORT || 3000
//define the port the app will be access from (80,8080,8888 are default to teh tomain/)
const server = http.createServer((request,response) => {
    response.writeHead(200 , {"Content-Type" : "Text/Plain"})
    response.end("Hello World")
})

server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop"))