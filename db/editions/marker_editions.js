

const editMarker = function(marker, pool) {
  const values = [marker.map_title, marker.map_category, marker.map_description, marker.id];

  return pool.query(`
    UPDATE markers
    SET map_title = $1, map_category = $2, map_description = $3
    WHERE maps.id = $4
    `, values)
    .then(() => {console.log(`Successfully updated map ${map.id}`)})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.editMarker = editMarker;
