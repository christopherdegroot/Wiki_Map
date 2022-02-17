

// edit map title, category, & description
const editMap = function(map, pool) {
  const values = [map.map_title, map.map_category, map.map_description, map.id];

  return pool.query(`
    UPDATE maps
    SET map_title = $1, map_category = $2, map_description = $3
    WHERE maps.id = $4
    `, values)
    .then(() => {console.log(`Successfully updated map ${map.id}`)})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.editMap = editMap;
