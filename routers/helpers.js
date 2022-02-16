//// ---------- Profile Helpers

// Takes result of user data query and returns an object to be handled later by profileData function
const userData = (user) => {
  const { username, profile_picture_url, user_bio } = user;
  const userObj = {
      username,
      profile_picture_url,
      bio: user_bio
  };
  return userObj;
};

// Takes results of resolved promises and outputs a profile data object to directly inject into ejs template
const profileData = (values) => {
  const user = values[0];
  const maps = values[1];
  const favourites =  values[2];
  const profileVars = {
    user,
    maps,
    favourites
  };
  return profileVars;
};


//// ---------- Map Helpers


// Takes results of resolved promises and outputs a map data object to directly inject into ejs template
const mapData = (values) => {
  const title = values[0];
  const category = values[1];
  const rating =  values[2];
  const description =  values[3];
  const mapVars = {
    title,
    category,
    rating,
    description
  };
  return mapVars;
};

const markerData = (marker) => {
  const { marker_title, image_url, description, marker_latitude, marker_longitude } = marker;
  const markerObj = {
      title: marker_title,
      url: image_url,
      desc: description,
      lat: marker_latitude,
      lon: marker_longitude,
  };
  return markerObj;
};


const mapEditData = (values) => {
  const user = values[0];
  const map = values[1];
  const markers =  values[2];
  const mapTempVars = {
    user,
    map,
    markers
  };
  return mapTempVars;
};


module.exports = {
  userData,
  profileData,
  mapData,
  mapEditData,
  markerData
};
