const express = require('express');
const router  = express.Router();
const markerEditions = require('../db/editions/marker_editions');
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

  router.post('/:id/new', (req, res) => {
    const queryBody = req.body;
    const id = req.params.id;
    markerInsertions.addMarker(queryBody, db, id)
      .then(() => {
        console.log('Marker successfully added');
        res.redirect('back');
      })
      .catch((err) => {
        console.log(err.message);
      });


  });


  // id is marker id
  router.post('/:id/edit', (req, res) => {
    let formInfo = req.body;
    const map = req.params.id;
    console.log(formInfo);
    // get database call with markerID
    markerEditions.editMarker(formInfo, db, map)
      .then(() => {
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
