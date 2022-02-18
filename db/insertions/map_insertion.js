

const addMap = function (map, pool) {
  const values = [`${map.map_title}`, `${map.map_category}`, `${map.map_description}`, '49.300708190202045', '-123.13074020583447'];
  return pool.query(`
  INSERT INTO maps (map_title, map_category, map_description, map_center_latitude, map_center_longitude)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
    `, values)
    .then((result) => {
      return result.rows[0]})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addMap = addMap;

const addOwner = function (map, pool) {
  const values = [`1`, `${map.id}`];
  return pool.query(`
  INSERT INTO users_maps_ownership (owner_user_id, map_id)
  VALUES ($1, $2)
    `, values)
    .then((result) => { return result.rows[0] })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addOwner = addOwner;



const addDefaultMarker = function (map, pool) {
  const values = [`1`, `${map}`];
  return pool.query(`
  INSERT INTO markers (user_id, map_id, description, marker_title, marker_category, image_url, marker_latitude, marker_longitude) VALUES ($1, $2, 'Whether its a full-time bootcamp or a part-time program, Lighthouse Labs offers coding education from newbie to professional developer.', 'Lighthouse Labs', 'Places & Locations', 'https://www.lighthouselabs.ca/assets/home-1b1053e3e6e741308433e7e45af5783c8466e4bc14df186390ff707c05164f90.jpg', '49.281133', '-123.114496');
    `, values)
    .then((result) => { return result.rows[0]})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addDefaultMarker = addDefaultMarker;


