var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const authenticate = require("../authenticate");
const cors = require("./cors"); // i added this and it looks good

var Favorites = require("../models/favorites");

var favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorites) => {
          if (!favorites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.json({ exists: false, favorites: favorites });
          } else {
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: false, favorites: favorites });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: true, favorites: favorites });
            }
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(authenticate.verifyUser, function (req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id }, function (err, favs) {
      if (!favs) {
        Favorites.create(req.body, function (err, favs) {
          if (err) throw err;
          favs.postedBy = req.decoded._doc._id;
          console.log("your favorite has been created!");
          favs.dishes.push(req.body._id);
          favs.save(function (err, favs) {
            if (err) throw err;
            console.log("Dish added");
            res.json(favs);
          });
        });
      } else {
        // see whether this dish already exists
        var test = favs.dishes.indexOf(req.body._id);
        console.log("the test value is  " + test);
        if (test > -1) {
          var err = new Error("This recipe is already in your favorite list");
          err.status = 401;
          return next(err);
        } else {
          favs.dishes.push(req.body._id);
          favs.save(function (err, favs) {
            if (err) throw err;
            console.log("Another Dish has been added");
            res.json(favs);
          });
        }
      }
    });
  })

  .delete(authenticate.verifyUser, function (req, res, next) {
    Favorites.remove({ postedBy: req.decoded._doc._id }, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

//use combination of these: http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
favoritesRouter
  .route("/:favsId")
  .delete(authenticate.verifyUser, function (req, res, next) {
    Favorites.findOne({ postedBy: req.decoded._doc._id }, function (err, favs) {
      if (err) throw err;
      if (favs) {
        var index = favs.dishes.indexOf(req.params.favsId);
        if (index > -1) {
          favs.dishes.splice(index, 1);
        }
        favs.save(function (err, favorite) {
          if (err) throw err;
          res.json(favorite);
        });
      } else {
        var err = new Error("There' no Favorites");
        err.status = 401;
        return next(err);
      }
    });
  });

//use combination of these: http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
//favoritesRouter.route('/:favsId')
//.delete(authenticate.verifyUser ,  function (req, res, next) {
//  Favorites.findByIdAndRemove(req.params.favsId, function (err, resp) {
//    if (err) throw err;
//  res.json(resp);
// });
//});

module.exports = favoritesRouter;
