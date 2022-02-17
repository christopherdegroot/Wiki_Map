const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/map_queries');
const mapEditions = require('../db/editions/map_editions');

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

  // router.post('/:id/edit', (req, res) => {
  //   const formInfo = req.body;
  //   const id = req.params.id;
  //   formInfo.marker_id = id;
  //   mapEditions.editMarker(map, db)
  //     .then(() => {
  //       res.redirect(`back`);
  //     });
  // });












  return router;
};
