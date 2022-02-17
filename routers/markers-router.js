const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/map_queries');

module.exports = (db) => {


  router.get('/:id/fetch', (req, res) => {
    const id = req.params.id;
    mapQueries.getMarkersByMapId(id, db)
      .then((markers) => res.jsonp(markers));
  });

  router.post('/new', (req, res) => {
    const queryBody = req.body;
    const vars = [];
    for (const item in queryBody) {
      vars.push(queryBody[item]);
    }
  });

  // router.get('/')









  return router;
};
