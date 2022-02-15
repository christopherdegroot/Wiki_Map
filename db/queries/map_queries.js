// Get map by a map ID
const getMapByMapId = function(id, pool) {
  return pool.query(`
  SELECT maps.*
  FROM maps
  WHERE maps.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getMapByMapId = getMapByMapId;


// get all markers that match a particular map ID
const getMarkersByMapId = function(id, pool) {
  return pool.query(`
  SELECT user_id, map_id, markers.marker_latitude, markers.marker_longitude
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getMarkersByMapId = getMarkersByMapId;


// get all maps that match a particular category
const getMapsByCategory = function(category, pool) {
  return pool.query(`
  SELECT *
  FROM maps
  WHERE maps.map_category = '$1';
  `,[category])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getMapsByCategory = getMapsByCategory;


// get all markers by a particular category
const getMarkersByCategory = function(category, pool) {
  return pool.query(`
  SELECT markers.*
  FROM markers
  JOIN maps ON map_id = maps.id
  WHERE maps.map_category = '$1';
  `,[category])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getMarkersByCategory = getMarkersByCategory;
