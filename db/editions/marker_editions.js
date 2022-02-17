

const editMarker = function(marker, pool) {
  const values = [marker.marker_title, marker.image_url, marker.marker_longitude, marker.marker_latitude, marker.description, '1'];
  // hard-coded markers.id to be 1 for now
  return pool.query(`
    UPDATE markers
    SET marker_title = $1, image_url = $2, marker_longitude = $3, marker_latitude = $4, description = $5
    WHERE markers.id = $6
    `, values)
    .then(() => {console.log(`Successfully updated marker ${marker.id}`)})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.editMarker = editMarker;
