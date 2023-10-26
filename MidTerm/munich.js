const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

// Static files or folders are specified before any route
app.use(express.static(__dirname + '/public'));

// Configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/',
}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sports', (req, res) => {
    res.render('sports'); 
    
});

app.get('/nightlife', (req, res) => {
    res.render('nightlife');
});

// Error handling -> app.use() is a basic express route
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// Server Error 500
app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
    console.log('To close press Ctrl-C');
});
