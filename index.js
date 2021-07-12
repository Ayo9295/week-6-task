const express = require('express');
const app = express();

let products = require('./model/Product.js')

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.json(products)
})

app.get('/products', (req, res) =>{
    res.json(products)
})

app.get('/products/:id', (req, res) =>{
    let productId = Number(req.params.id);
    let getProduct = products.find((product) => product.id === productId);
    if(!getProduct){
        res.status(404).send(`Cannot find product with id of ${productId}`);
    }else {
        res.json(getProduct);
    }
});

app.post('/products', (req, res) =>{
let newProduct = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
}
    products.push(newProduct);
    res.json(products)
})

app.put('/products/:id', (req, res) =>{
    let productId = Number(req.params.id);
    let body = req.body;
    let product = products.find((product) => product.id === productId);
    let indexOfProduct = products.indexOf(product);
    if(!product){
        res.status(404).send(`Product with id of ${productId} not found`)
    }else{
        let updateProduct = {...product, ...body};
        products[indexOfProduct] = updateProduct;
        res.json(updateProduct)
    }
})
app.delete('/products/:id',(req,res) =>{
    let productId = Number(req.params.id);
    let deleteProduct = products.filter((product) => product.id !== productId);
    if(!deleteProduct){
        res.status(404).send(`Product with id of ${productId} not found`);
    }else{
        products = deleteProduct;
        res.json(products);
    }
})
app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})