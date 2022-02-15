const deleteMap =  function(mapId, pool) {
  return pool.query(`
    DELETE FROM maps
    WHERE id = $1
    `, mapId)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.deleteMap = deleteMap;

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
