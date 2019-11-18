const Product = require("../models/product");
const mongoose = require('mongoose')

mongoose
  .connect("mongodb://localhost:27017/shoppingCart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => handleError(error));

const products = [
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png",
    title: "Tomatoes",
    description: "Lion Ba and proudly Resurrection Power New generation member",
    price: 10
  }),
  new Product({
    imagePath:
      "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Bob Alaska Jnr",
    description: "Lion Ba and proudly Resurrection Power New generation member",
    price: 13
  }),
  new Product({
    imagePath:
      "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Bob Alaska Jnr",
    description: "Lion Ba and proudly Resurrection Power New generation member",
    price: 55
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png",
    title: "Bob Alaska Jnr",
    description: "Lion Ba and proudly Resurrection Power New generation member",
    price: 20
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png",
    title: "Bob Alaska Jnr",
    description: "Lion Ba and proudly Resurrection Power New generation member",
    price: 15
  })
];

let done = 0;
for (let i= 0;i < products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect()
}
