const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/map_queries');

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

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    mapQueries.getMapByMapId(id, db)
      .then((map) => {
        res.render('index');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      })
    });



    router.get('/:id/edit', (req, res) => {
      const id = req.params.id;

      mapQueries.getMapByMapId(id, db)
        .then((map) => {
          res.render('edit-map');
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: err.message});
        })
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
