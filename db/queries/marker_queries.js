// get all markers that match a particular map ID
const getMarkersByMapId = function (id, pool) {
  return pool.query(`
  SELECT markers.marker_title, markers.id, user_id, map_id, markers.marker_latitude, markers.marker_longitude
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

// hard coded for mount seymour
// const getMarkerIdByTitle = function(title, pool) {
//   return pool.query(`
//     SELECT markers.*
//     FROM markers
//     WHERE marker_title = $1;
//   `, ['Mount Seymour'])
//     .then((response) => {
//       if (response.rows[0].length === 0) { return null }
//       else { return response.rows }
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
// exports.getMarkerIdByTitle = getMarkerIdByTitle;
