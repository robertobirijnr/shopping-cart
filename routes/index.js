const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);
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

router.get("/user/signup", function(req, res, next) {
  let messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/user/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
  })
);

router.get("/user/profile", (req, res, next) => {
  res.render("user/profile");
});

router.get("/user/signin", (req, res, next) => {
  let messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/user/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
  })
);

module.exports = router;
