const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const { populate } = require("../models/gamming");
const Gamming = require("../models/gamming");

const gammingRouter = express.Router();

gammingRouter.use(bodyParser.json());

gammingRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Gamming.find(req.query)
      .then(
        (gamming) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/application");
          res.json(gamming);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      gamming.create(req.body)
        .then(
          (gamming) => {
            console.log("gamming created ", gamming);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/application");
            res.json(gamming);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /gamming");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      gamming.remove({})
        .then(
          (resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/application");
            res.json(resp);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  );

  module.exports = gammingRouter;