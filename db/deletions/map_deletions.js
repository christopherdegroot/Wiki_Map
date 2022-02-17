const deleteMap =  function(mapId, pool) {
  return pool.query(`
    DELETE FROM maps
    WHERE id = $1
    RETURNING *
    `, mapId)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.deleteMap = deleteMap;

const removeFavouriteMap =  function(mapId, pool) {
  return pool.query(`
    DELETE FROM users_maps_favourites
    WHERE favourite_map_id = $1 AND user_id = 1
    RETURNING *
    `, mapId)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.removeFavouriteMap = removeFavouriteMap;

const deleteMarker =  function(markerId, pool) {
  return pool.query(`
    DELETE FROM markers
    WHERE id = $1
    `, markerId)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.deleteMarker = deleteMarker;
