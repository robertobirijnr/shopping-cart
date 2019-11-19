const express = require("express");
const router = express.Router();
const Products = require("../models/product");


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



module.exports = router;
