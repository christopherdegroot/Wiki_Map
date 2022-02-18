
const addMarker = function(markers, pool, id) {
  const values = [markers.marker_title, markers.description, markers.image_url, markers.marker_latitude, markers.marker_longitude,'1', id];
  return pool.query(`
    INSERT INTO markers (marker_title, description, image_url, marker_latitude, marker_longitude, user_id, map_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, values)
    .then((result) => { return result.rows[0] })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addMarker = addMarker;
