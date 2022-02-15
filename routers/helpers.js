// Takes result of user data query and returns an object to be handled later by profileData function 
const userData = (user) => {
  const { name, profile_picture_url, bio } = user;
  const userObj = { 
    user: {
      name,
      profile_picture_url,
      bio
    }
  };
  return userObj;
};

// Takes results of users' map data query and returns an object to be handled later by profileData function ***** Not used right now, waiting on more db test data
const mapsData = (maps) => { 
  const mapVars = {};
  maps.forEach((map) => {
    const { id, map_title, map_category } = map;
    mapVars[id] = { 
      title: map_title, 
      category: map_category
    };
  });
  return mapVars;
}

// Takes results of resolved promises and outputs an object to directly inject into ejs template
const profileData = (values) => {
  const user = values[0];
  const maps = values[1];
  const favourites =  values[2];
  const profileVars = {
    user,
    maps,
    favourites
  }
  return profileVars;
};


module.exports = {
  userData,
  mapsData,
  profileData,
};