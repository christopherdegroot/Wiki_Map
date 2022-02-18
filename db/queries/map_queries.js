const { query } = require("express");

// Get map by a map ID
const getMapByMapId = function(id, pool) {
  return pool.query(`
  SELECT *
  FROM maps
  JOIN users_maps_ownership ON map_id = maps.id
  JOIN users ON owner_user_id = users.id
  WHERE maps.id = $1
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
  SELECT map_title, map_category, map_rating, map_description, map_image_url
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


const getMapByLastId = function(pool) {
  return pool.query(`
  SELECT *
  FROM maps
  ORDER BY maps.id DESC
  LIMIT 1;
  `)
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getMapByLastId = getMapByLastId;
