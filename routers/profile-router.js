/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const profileQueries = require('../db/profile_queries')  // Requiring separate query file once it is created

module.exports = (db) => {
  ///////// Routes requiring separate DB query Promise to be returned
  
  // Route using DB query function that returns a Promise of single user object 
  // router.get('/:id', (req, res) => {
    // profileQueries.getProfileById()
      // .then((user) => {
        // res.json(user);
      // })
      // .catch((err) => {
        // res
          // .status(500)
          // .json({ error: err.message});
      // });

  // Route using DB query function that returns a Promise of an array of all public user objects
  // router.get('/', (req, res) => {
    // profileQueries.getPublicProfiles()
      // .then((users) => {
        // res.json(users);
      // })
      // .catch((err) => {
        // res
          // .status(500)
          // .json({ error: err.message});
      // });

  ////////////////// Routes used in interim until DB query Promises are made

  // Route that returns a single user as JSON 
  router.get('/:id', (req, res) => {
    const queryParams = [req.params.id];
    db.query(`SELECT * FROM users WHERE id = $1`, queryParams)
      .then((user) => {
        res.json(user.rows);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });
  });
  
  // Route that returns an array of all public users as JSON 
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`)  // 
    .then(users => {
      res.json(users.rows);  // 
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};
