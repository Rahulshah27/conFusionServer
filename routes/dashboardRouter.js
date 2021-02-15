const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const { populate } = require("../models/dashboard");
const Dashboard = require("../models/dashboard");

const dashboardRouter = express.Router();

dashboardRouter.use(bodyParser.json());

dashboardRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Dashboard.find(req.query)
      .then(
        (dashboard) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/application");
          res.json(dashboard);
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
      Dashboard.create(req.body)
        .then(
          (dashboard) => {
            console.log("dashboard created ", dashboard);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/application");
            res.json(dashboard);
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
      res.end("PUT operation not supported on /Dashboard");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Dashboard.remove({})
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

  module.exports = dashboardRouter;