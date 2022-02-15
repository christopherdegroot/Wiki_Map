// get a single user from the databse by a user ID
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getUserWithId = getUserWithId;

// get favourites for a user by their user id
const favouritesByUserId = function(id) {
  return pool.query(`
  SELECT users_maps_favourites.user_id as user_id, users_maps_favourites.favourite_map_id as favourite_map
  FROM users
  JOIN users_maps_favourites ON user_id = users.id
  WHERE users.id = $1
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}

  });

}
exports.favouritesByUserId = favouritesByUserId;

