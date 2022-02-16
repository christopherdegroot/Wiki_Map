const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/map_queries');
const userQueries = require('../db/queries/user_queries');
const { mapData, userData, markerData, mapEditData } = require('./helpers');

module.exports = (db) => {

  router.get('/new', (req, res) => {
    const id = req.params.id;

    mapQueries.getMapByMapId(id, db)
      .then((map) => {
        res.render('new-map');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      })
    });

    // Route using DB query functions that returns a promise
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    mapQueries.getMapDescByMapId(id, db)
      .then((map) => {
        const templateVars = mapData(map);
        res.render('index', templateVars);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });
    });



    router.get('/:id/edit', (req, res) => {
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

      // map info promise
      const mapPromise = mapQueries.getMapByMapId(id, db)
      .then((maps) => maps)
      .catch((err) => {
        res
        .status(500)
        .json({ error: err.message});
      });

      // marker info promise
      const markerPromise = mapQueries.getMarkersDescByMapId(id, db)
      .then((markers) => {
        const markerArr = [];
        markers.forEach(element => markerArr.push(element));
        return markerArr;
      })
      .catch((err) => {
        res
        .status(500)
        .json({ error: err.message});
      });

        Promise.all([userPromise, mapPromise, markerPromise])
        .then((values) => {
          const templateVars = mapEditData(values);
          res.render('edit-map', templateVars);
          console.log('template vars from MAPS-ROUTER: ', templateVars)
        });
      });

  router.post('/:id/delete', (req, res) => {
    const id = req.params.id;

    mapQueries.deleteMapByMapId(id, db)
      .then((map) => {
        res.redirect('/profile/1');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      })
    });

  return router;
};
