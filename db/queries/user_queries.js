// gets a single user from the databse by a user ID
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getUserWithId = getUserWithId;

// gets all favourite maps for a user by their user id
const favouriteMapsByUserId = function(id) {
  return pool.query(`
  SELECT favourite_map_id as favourite_maps
  FROM users_maps_favourites
  WHERE user_id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.favouriteMapsByUserId = favouriteMapsByUserId;

// Get maps by owned maps for a user
const mapsOwnedByUserId = function(id) {
  return pool.query(`
  SELECT map_id as owned_map_id
  FROM users_maps_ownership
  WHERE owner_user_id = $1;
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows}
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.mapsOwnedByUserId = mapsOwnedByUserId;
