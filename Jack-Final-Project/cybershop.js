const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const fs = require('fs');

const cart = [];
let cartPrice = 0;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const productData = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));

const port = process.env.PORT || 3000;

function getCategoryFromId(productId) {
    if (productId >= 1 && productId <= 12) {
        return 'games';
    } else if (productId >= 13 && productId <= 24) {
        return 'posters';
    } else if (productId >= 25 && productId <= 36) {
        return 'accessories';
    }
    return null; 
}

function chooseRandomProducts(allProducts, numProducts) {
    const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, numProducts);
}
function addToCart(productId) {
    const product = productData.products.find(item => item.id === parseInt(productId, 10));
    if (product) {
        cart.push(product);
        cartPrice += parseInt(product.price.replace('$', ''), 10); // Assuming price is a string like "$20"
        return true;
    }
    return false;
}

app.get('/', (req, res) => {
    const allProducts = productData.products;

    const selectedProducts = chooseRandomProducts(allProducts, 5);
    const slideshowProducts = chooseRandomProducts(allProducts, 5);

    const gamesProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'games');
    const postersProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'posters');
    const accessoriesProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'accessories');

    const gamesProduct = chooseRandomProducts(gamesProducts, 1);
    const postersProduct = chooseRandomProducts(postersProducts, 1);
    const accessoriesProduct = chooseRandomProducts(accessoriesProducts, 1);
    
    res.render('home', { products: selectedProducts, slideshow: slideshowProducts, games: gamesProduct, posters: postersProduct, accessories: accessoriesProduct });
});

app.get('/games', (req, res) => {
    const gamesProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'games');
    res.render('category-page', { products: gamesProducts, category: 'Games' });
});

app.get('/posters', (req, res) => {
    const postersProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'posters');
    res.render('category-page', { products: postersProducts, category: 'Posters' });
});

app.get('/accessories', (req, res) => {
    const accessoriesProducts = productData.products.filter(product => getCategoryFromId(product.id) === 'accessories');
    res.render('category-page', { products: accessoriesProducts, category: 'Accessories' });
});

app.get(['/item/:id', '/product/:id'], (req, res) => {
    const productId = req.params.id;
    const selectedProduct = productData.products.find(item => item.id === parseInt(productId, 10));

    if (!selectedProduct) {
        res.status(404).send('Product not found');
        return;
    }

    res.render('product-page', { product: selectedProduct });
});

app.post('/addToCart/:id', (req, res) => {
    const productId = req.params.id;

    if (addToCart(productId)) {
        res.redirect(`/item/${productId}`);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post('/checkout', (req, res) => {
    const { name, address, email, phone } = req.body; // Extracting form data

    cart.length = 0;
    cartPrice = 0;

    res.redirect('/thankyou');
}); 
app.get('/thankyou', (req, res) => {
    res.render('thanks-page'); 
});


app.get('/about', (req, res) => {
    res.render('about-page'); 
});


app.get('/cart', (req, res) => {
    res.render('checkout-page', { cart, cartPrice }); 
});


app.use((req, res) => {
    res.status(404).render('404');
});

app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).render('500');
});



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log('To close, press Ctrl-C');
});
