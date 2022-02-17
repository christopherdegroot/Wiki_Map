const { query } = require("express");

// Get map by a map ID
const getMapByMapId = function (id, pool) {
  return pool.query(`
  SELECT maps.*
  FROM maps
  WHERE maps.id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows[0] }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getMapByMapId = getMapByMapId;

// Get map descriptive data by a map ID
const getMapDescByMapId = function (id, pool) {
  return pool.query(`
  SELECT map_title, map_category, map_rating, map_description
  FROM maps
  WHERE maps.id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows[0] }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getMapDescByMapId = getMapDescByMapId;


// get all markers that match a particular map ID
const getMarkersByMapId = function (id, pool) {
  return pool.query(`
  SELECT user_id, map_id, markers.marker_latitude, markers.marker_longitude
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.getMarkersByMapId = getMarkersByMapId;

// get all markers that match a particular map ID
const getMarkersDescByMapId = function (id, pool) {
  return pool.query(`
  SELECT markers.marker_title, markers.image_url, markers.description, marker_latitude, marker_longitude
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.getMarkersDescByMapId = getMarkersDescByMapId;


// get all maps that match a particular category
const getMapsByCategory = function (category, pool) {
  return pool.query(`
  SELECT *
  FROM maps
  WHERE maps.map_category = '$1';
  `, [category])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.getMapsByCategory = getMapsByCategory;


// get all markers by a particular category
const getMarkersByCategory = function (category, pool) {
  return pool.query(`
  SELECT markers.*
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.map_category = '$1';
  `, [category])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.getMarkersByCategory = getMarkersByCategory;


