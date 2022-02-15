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

// Takes results of resolved promises and outputs an object to directly inject into ejs template
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


module.exports = {
  userData,
  profileData,
};