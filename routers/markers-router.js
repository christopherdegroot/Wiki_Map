const express = require('express');
const router  = express.Router();
const maQueries = require('../db/queries/map_queries');
const mapEditions = require('../db/editions/map_editions');
const markerQueries = require('../db/queries/marker_queries');

module.exports = (db) => {

  // fetch all markers from mapID
  router.get('/:id/fetch', (req, res) => {
    const id = req.params.id;
    markerQueries.getMarkersByMapId(id, db)
      .then((markers) => res.jsonp(markers))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // Fetch all marker details from mapID
  router.get('/:id/detail', (req, res) => {
    const id = req.params.id;
    markerQueries.getMarkersDescByMapId(id, db)
      .then((markers) => res.jsonp(markers))
      .catch((err) => {
        console.log(err.message);
      });
  });

  router.post('/new', (req, res) => {
    const queryBody = req.body;
    const vars = [];
    for (const item in queryBody) {
      vars.push(queryBody[item]);
    }
  });

  // id is marker id
  //using jquery /////////////////////////////
  router.post('/:id/edit', (req, res) => {
    let formInfo = req.body;
    const id = req.params.id;
    formInfo.id = id;
    console.log(formInfo.marker_id);
    const map = 1;
    // get database call with markerID
    mapEditions.editMarker(map, db)
      .then(() => {
        // return from backend to the front end
        res.redirect(`back`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // hard coded for Mt. Seymour
  // fetch markerID from click event
  // router.get('/fetchId', (req, res) => {
  //   const title = 'Mount Seymour';
  //   markerQueries.getMarkerIdByTitle(title, db)
  //     .then(
  //       $(.)
  //     )
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });










  return router;
};
