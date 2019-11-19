const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const Cart = require("../models/cart");

/* GET home page. */
router.get("/", function(req, res, next) {
  Products.find(function(err, docs) {
    let productChuncks = [];
    let chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/index", {
      title: "Shopping Cart",
      products: productChuncks
    });
  });
});

router.get("/add-to-cart/:id", (req, res) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Products.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/");
    }

    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/shopping-cart", (req, res, next) => {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  let cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

router.get('/checkout',(req,res,next)=>{
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/checkout',{total:cart.totalPrice});

})

module.exports = router;
