const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/map_queries');

module.exports = (db) => {


  router.get('/:id/fetch', (req, res) => {
    const id = req.params.id;
    mapQueries.getMarkersByMapId(id, db)
      .then((markers) => res.jsonp(markers));
  })

  router.post('/new', (req, res) => {
    const queryBody = req.body;
    console.log('qb: ', queryBody);
    const vars = [];
    for (const item in queryBody) {
      // console.log('item:', item);
      vars.push(queryBody[item]);
    }
    console.log('vars: ', vars);

    // db.query(`SELECT * FROM maps WHERE id = $1`, queryBody)
    // .then((map) => {
      // res.json(map.rows);
      // const { id, zoom, center_latitude, center_longitude } = map;
      // const templateVars = { map };
      // res.render('new-map', templateVars)
    // })
    // .catch((err) => {
      // res
      // .status(500)
      // .json({ error: err.message});
    // });
  });

  return router;
};
