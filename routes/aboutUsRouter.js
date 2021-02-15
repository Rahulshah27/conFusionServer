const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const AboutUs = require("../models/aboutUs");
const { populate } = require("../models/aboutUs");

const aboutUsRouter = express.Router();

aboutUsRouter
.route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    AboutUs.find(req.query)
      .then(
        (aboutUs) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/application");
          res.json(aboutUs);
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
      AboutUs.create(req.body)
        .then(
          (AboutUs) => {
            console.log("aboutUs created ", AboutUs);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/application");
            res.json(AboutUs);
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
      res.end("PUT operation not supported on /AboutUs");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      AboutUs.remove({})
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

  module.exports = aboutUsRouter;