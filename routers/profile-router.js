const express = require('express');
const router  = express.Router();
const { userData, profileData } = require('./helpers');
const userQueries = require('../db/queries/user_queries');  // Requiring separate query file once it is created

module.exports = (db) => {

  // Route for jQuery rendering of My Maps containers
  router.get('/:id/owned', (req, res) => {
    const id = req.params.id;
    userQueries.mapsOwnedByUserId(id, db)
      .then((data) => {
        res.json(data);
      });
  });

  // Route for jQuery rendering of My Favourites containers
  router.get('/:id/favourites', (req, res) => {
    const id = req.params.id;
    userQueries.favouriteMapsByUserId(id, db)
      .then((data) => {
        res.json(data);
      })
  });

  // Route using DB query function that returns a Promise of single user object
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    // User info query Promise
    const userPromise = userQueries.getUserWithId(id, db)
      .then((user) => {
        const userObj = userData(user);
        return userObj;
      })
      .catch((err) => {
        res
        .status(500)
        .json({ error: err.message});
      });

    // All user maps query Promise
    const mapPromise = userQueries.mapsOwnedByUserId(id, db)
      .then((maps) => maps)
      .catch((err) => {
        res
        .status(500)
        .json({ error: err.message});
      });

    // All user favourite maps query Promise
    const favouritePromise = userQueries.favouriteMapsByUserId(id, db)
      .then((maps) => maps)
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });

    // Promise method to take all the Promise data and feed into helper function to create templateVars
    Promise.all([userPromise, mapPromise, favouritePromise])
    .then((values) => {
      const templateVars = profileData(values);
      res.render('profile', templateVars);
    });
  });

  return router;
};
