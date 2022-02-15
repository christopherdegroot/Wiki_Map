const addFavourite =  function(favourite) {
  const values = [`${favourite.user_id}`, `${favourite.favourite_map_id}`];
  return pool.query(`
    INSERT INTO users_maps_favourites (user_id, favourite_map_id)
    VALUES ($1, $2)
    RETURNING *
    `,values)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addFavourite = addFavourite;
