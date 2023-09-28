const express = require('express')
const app = express()
const port = process.env.port || 3000
const expressHadlebars = require('express-handlebars')

app.get ('/', (request,response) => {
    response.type('text/plain') 
    response.send('Miami Travel');
    response.send('Miami Travel')
    })
app.get('/about', (request, response) => {
    response.type('text/plain')
    response.send ('About Miami Travel'); })
app.get('/nightlife', (request,response)=>{
    res.type('text/plain')
    res.send('miami at night')
    
})
    

app.use( (request,response) => {
    response.type('text/plain')
    response.status(404)
    res.send('404 - not found')
})

app.use ((error, request, resonse, next) => {
    console.log('Server started http://localhost:${port}')
    console.log('To close pres Ctrl-C')
})
app.get('/about',(req,res)=>{
    res.render('about')
 })
 //This generates an error because the parameter names don't match
 // res should be response.. Leave this alone for now 
 app.get('/nightlife',(request,response)=>{
    res.type('text/plain')
    res.send('Miami at Night')
 })
 
 
 //Error handling ->  app.use() basic express route
 app.use((req,res) => {
    res.status(404)
    res.render('404')
 })
 
 //Server Error 500
 app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500')
 })
 