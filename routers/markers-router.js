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

  // id is marker id
  //using jquery
  // router.post('/:id/edit', (req, res) => {
  //   let formInfo = req.body;
  //   const id = req.params.id;
  //   formInfo.id = id;
  //   console.log(formInfo.marker_id);
  //   const map = 1;

  //   // get database call with markerID

  //   mapEditions.editMarker(map, db)
  //     .then(() => {
  //       // return from backend to the front end
  //       res.redirect(`back`);
  //     });
  // });












  return router;
};
