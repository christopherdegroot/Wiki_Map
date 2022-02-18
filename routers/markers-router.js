const express = require('express');
const router  = express.Router();
const maQueries = require('../db/queries/map_queries');
const mapEditions = require('../db/editions/map_editions');
const markerQueries = require('../db/queries/marker_queries');
const markerInsertions = require('../db/insertions/marker_insertions');

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
    markerInsertions.addMarker(queryBody, db)
      .then(() => {
        console.log('Marker successfully added');
        res.redirect('back');
      })
      .catch((err) => {
        console.log(err.message);
      });


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


  // fetch markerID from click event
  router.post('/:id/fetchId', (req, res) => {
    const id = req.params;
    markerQueries.getMarkerInfoByMarkerId(id, db)
      .then(
        (info) => {
          res.jsonp(info);
          console.log('SUCCESS /:id/fetchId');
        }
      )
      .catch((err) => {
        console.log(err.message);
      });
  });










  return router;
};
