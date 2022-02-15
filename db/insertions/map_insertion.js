const addMap =  function(map) {
  const values = [`${map.map_title}`, `${map.map_category}`, `${map.zoom}`, `${map.map_center_latitude}`, `${map.map_center_longitude}`];
  return pool.query(`
    INSERT INTO maps (map_title, map_category, zoom, map_center_latitude, map_center_longitude)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,values)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addMap = addMap;

const addMarker =  function(marker) {
  const values = [`${markers.user_id}`, `${markers.map_id}`, `${markers.marker_title}`, `${markers.description}`, `${markers.marker_category}`, `${markers.image_url}`, `${markers.marker_latitude}`, `${markers.marker_longitude}`];
  return pool.query(`
    INSERT INTO markers (user_id, map_id, marker_title, description, marker_category, image_url, marker_latitude, marker_longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,values)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addMarker = addMarker;
