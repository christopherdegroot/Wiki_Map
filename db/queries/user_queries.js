// gets a single user from the databse by a user ID
const getUserWithId = function (id, pool) {
  return pool.query(`
  SELECT name, username, profile_picture_url, user_bio
  FROM users
  WHERE users.id = $1
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows[0] }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

// gets all favourite maps for a user by their user id
const favouriteMapsByUserId = function (id, pool) {
  return pool.query(`
  SELECT favourite_map_id, user_id, maps.map_description, maps.map_category, maps.map_rating, maps.map_title, name
  FROM users_maps_favourites
  JOIN maps ON favourite_map_id = maps.id
  JOIN users_maps_ownership ON map_id = maps.id
  JOIN users ON owner_user_id = users.id
  WHERE user_id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows; }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.favouriteMapsByUserId = favouriteMapsByUserId;

// Get maps by owned maps for a user
const mapsOwnedByUserId = function (id, pool) {
  return pool.query(`
  SELECT owner_user_id, map_id, maps.map_title, maps.map_category, maps.map_description, maps.map_rating
  FROM users_maps_ownership
  JOIN maps on map_id = maps.id
  WHERE owner_user_id = $1;
  `, [id])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.mapsOwnedByUserId = mapsOwnedByUserId;

const totalUpvotesById = function (id, pool) {
  return pool.query(`
  SELECT SUM(map_rating)
  FROM maps
  JOIN users_maps_ownership ON map_id = maps.id
  WHERE owner_user_id = $1
  GROUP BY owner_user_id
  `, ['1'])
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows[0] }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.totalUpvotesById = totalUpvotesById;

// Get all maps
const getAllMaps = function(id, pool) {
  return pool.query(`
  SELECT *
  FROM maps
  `, )
    .then((response) => {
      if (response.rows[0].length === 0) { return null }
      else { return response.rows}
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllMaps = getAllMaps;
