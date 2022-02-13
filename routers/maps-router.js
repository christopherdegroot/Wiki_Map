/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const mapQueries = require('../db/map_queries')    // Requiring separate query file once it is created

module.exports = (db) => {
  ///////// Routes requiring separate DB query Promise to be returned
  
  // Route using DB query function that returns a Promise of single map object 
  // router.get('/:id', (req, res) => {
    // mapQueries.getMapById()
      // .then((map) => {
        // res.json(map);
      // })
      // .catch((err) => {
        // res
          // .status(500)
          // .json({ error: err.message});
      // });

  // Route using DB query function that returns a Promise of an array of all public map objects
  // router.get('/', (req, res) => {
    // mapQueries.getPublicMaps()
      // .then((maps) => {
        // res.json(maps);
      // })
      // .catch((err) => {
        // res
          // .status(500)
          // .json({ error: err.message});
      // });

  ////////////////// Routes used in interim until DB query Promises are made

  // Route that returns a single map as JSON 
  router.get('/:id', (req, res) => {
    const queryParams = [req.params.id];
    db.query(`SELECT * FROM maps WHERE id = $1`, queryParams)
      .then((map) => {
        res.json(map.rows);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });
  });
  
  // Route that returns an array of all public maps as JSON 
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM maps;`)  // 
    .then(maps => {
      res.json(maps.rows);  // 
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
