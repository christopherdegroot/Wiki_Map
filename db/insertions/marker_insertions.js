
const addMarker = function(markers, pool) {
  const values = [markers.marker_title, markers.description, markers.image_url, markers.marker_latitude, markers.marker_longitude];
  return pool.query(`
    INSERT INTO markers (marker_title, description, image_url, marker_latitude, marker_longitude)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, values)
    .then((result) => { return result.rows[0] })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addMarker = addMarker;
