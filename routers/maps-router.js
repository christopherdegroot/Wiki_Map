const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/map_queries');
const userQueries = require('../db/queries/user_queries');
const userInsertions = require('../db/insertions/user_insertion');
const mapInsertions = require('../db/insertions/map_insertion');
const mapDeletions = require('../db/deletions/map_deletions');
const mapEditions = require('../db/editions/map_editions');
const { mapData, userData, markerData, mapEditData, mapUserData } = require('./helpers');


module.exports = (db) => {

  // ------------------------ GET ROUTES -------------------------- //

  router.get('/new', (req, res) => {
    const id = req.params.id;

    mapQueries.getMapByMapId(id, db)
      .then(() => {
        res.render('new-map');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Route using DB query functions that returns a promise
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    const mapPromise = mapQueries.getMapDescByMapId(id, db)
      .then((map) => {
        return map;
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // User info query Promise
    const userPromise = userQueries.getUserWithId(id, db)
      .then((user) => {
        const userObj = userData(user);
        return userObj;
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });


    Promise.all([mapPromise, userPromise])
      .then((values) => {
        const templateVars = mapUserData(values);
        res.render('index', templateVars);
        console.log(templateVars);
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
          .json({ error: err.message });
      });

    // map info promise
    const mapPromise = mapQueries.getMapByMapId(id, db)
      .then((maps) => {
        return maps;
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // marker info promise
    const markerPromise = mapQueries.getMarkersDescByMapId(id, db)
      .then((markers) => {
        return markers;
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });

    Promise.all([userPromise, mapPromise, markerPromise])
      .then((values) => {
        const templateVars = mapEditData(values);
        res.render('edit-map', templateVars);
      });
  });


  // ------------------------- POST ROUTES ------------------------- //




  // post route to create new map, then refirect to edit page of that newly created map
  router.post('/new', (req, res) => {
    const newMap = req.body;
    mapInsertions.addMap(newMap, db)
      .then((x) => {
        res.redirect(`/maps/${x.id}/edit`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });


  router.post('/:id/add', (req, res) => {
    const id = [req.params.id];
    userInsertions.addFavourite(id, db)
      .then((map) => console.log(map))
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id/remove', (req, res) => {
    const id = [req.params.id];
    mapDeletions.removeFavouriteMap(id, db)
      .then((map) => console.log(map))
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id/delete', (req, res) => {
    const id = req.params.id;

    mapDeletions.deleteMap(id, db)
      .then(() => {
        res.redirect('/profile/1');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:id/edit', (req, res) => {
    const map = req.body;
    const id = req.params.id;
    map.id = id;
    mapEditions.editMap(map, db)
      .then(() => {
        res.redirect(`/maps/${id}/edit`);
      });
  });


  return router;
};
