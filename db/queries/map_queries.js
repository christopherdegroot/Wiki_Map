
// Get maps by a single user ID
const getMapByUserId = function(id) {
  return pool.query(`
  SELECT *
  FROM maps
  JOIN users_maps_ownership ON map_id = maps.id
  JOIN users ON user_id = users.id
  WHERE users.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getMapByUserId = getMapByUserId;


// Get map by a map ID
const getMapByMapId = function(id) {
  return pool.query(`
  SELECT *
  FROM maps
  JOIN users_maps_ownership ON map_id = maps.id
  JOIN users ON user_id = users.id
  WHERE maps.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getMapByMapId = getMapByMapId;


// Get maps by selected as favourite map for a user
const getFavMapByUserId = function(id) {
  return pool.query(`
  SELECT *
  FROM maps
  JOIN users_maps_favourites ON favourite_map_id = maps.id
  JOIN users ON user_id = users.id
  WHERE users.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getFavMapByUserId = getFavMapByUserId;

// Get maps by owned maps for a user
const mapsOwnedByUserId = function(id) {
  return pool.query(`
  SELECT *
  FROM maps
  JOIN users_maps_ownership ON map_id = maps.id
  JOIN users ON owner_user_id = users.id
  WHERE users.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.mapsOwnedByUserId = mapsOwnedByUserId;


// get all markers that match a particular map ID
const getMarkersByMapId = function(id) {
  return pool.query(`
  SELECT *
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getMarkersByMapId = getMarkersByMapId;


// get all maps that match a particular category
const getMapsByCategory = function(category) {
  return pool.query(`
  SELECT *
  FROM maps
  WHERE maps.map_category = '$1';
  `,[category])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getMapsByCategory = getMapsByCategory;


// get all markers by a particular category
const getMarkersByCategory = function(category) {
  return pool.query(`
  SELECT *
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.map_category = 'Food & Drink';
  `,[category])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getMarkersByCategory = getMarkersByCategory;
