$(document).ready(function () {
  
  const createMapListElement = function (mapObj) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $mapListElements = $(`
        <div class="map-article">
            <header class="article-header">
              <form method="GET" action="/maps/${escape(mapObj.map_id)}">
                <button class="title-btn">${escape(mapObj.map_title)}</button>
              </form>
              <div class="article-category">
                <p>${escape(mapObj.map_category)}</p>
              </div>
            </header>
            <div class="article-body">
              <p>${escape(mapObj.map_description)}</p>
              <div class="upvote">
                <p>Upvotes: ${escape(mapObj.map_rating)}</p>
              </div>
            </div>
            <div class="article-footer">
                <button type="button" value="${escape(mapObj.map_id)}" class="favourite-btn">Favourite</button>
              <form method="GET" action="/maps/${escape(mapObj.map_id)}/edit">
                <button class="edit-btn">Edit</button>
              </form>
              <form method="POST" action="/maps/${escape(mapObj.map_id)}/delete">
                <button class="delete-btn">Delete</button>
              </form>
            </div>
          </div>
          `);

    return $mapListElements;
  };

  // gets user ID off the url accessing current page
  let urlUserId = '';
  if (window.location.href.slice(-1) === '?') {
    urlUserId += window.location.href.slice(-2);
  } else {urlUserId += window.location.href.slice(-1);}

  toString(urlUserId);
  let newUrlUserId = urlUserId.replace('?', '');

  const renderMapList = () => {
    $.ajax({
      url: `/profile/${newUrlUserId}/owned`,
      method: 'GET',
    })
      .then((data) => {
        $('#maps-container').empty();
        data.forEach((map) => {
          const $map = createMapListElement(map);
          $('#maps-container').prepend($map);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // favourite maps
  const createFavouriteListElement = function(mapObj) {

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $favouriteListElements = $(`
      <div class="map-article">
        <header class="article-header">
          <form method="GET" action="/maps/${escape(mapObj.favourite_map_id)}">
            <button class="title-btn">${escape(mapObj.map_title)}</button>
          </form>
          <div class="article-category">
            <p>${escape(mapObj.map_category)}</p>
          </div>
        </header>
        <div class="article-body">
          <p>${escape(mapObj.map_description)}</p>
          <div class="upvote">
            <p>Upvotes: ${escape(mapObj.map_rating)}</p>
            <div>
                Map Created By: ${escape(mapObj.owner_user_id)}
            </div>
          </div>
        </div>
        <div class="article-footer">
          <form method="POST" action="/maps/${escape(mapObj.favourite_map_id)}/remove">
            <button class="unfavourite-btn">Un-favourite</button>
          </form>
        </div>
      </div>
    `);

    return $favouriteListElements;
  };

  const renderFavouriteList = () => {
    $.ajax({
      url: `/profile/${newUrlUserId}/favourites`,
      method: 'GET',
    })
      .then((data) => {
        $('#favourites-container').empty();
        data.forEach((map) => {
          const $map = createFavouriteListElement(map);
          $('#favourites-container').prepend($map);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMapList();
  renderFavouriteList();

  //  Add favourite map to My Favourites list on click of button 
  $('.favourite-btn').on('', function(event) {
    console.log('this: ', $(this).val);
    event.preventDefault();
    console.log('event: ', event);
    // $.ajax({
    //   url: '/maps//add',
    //   method: 'POST'
    // })
    // renderMapList();
    // renderFavouriteList();
  });

  //  Remove favourite map to My Favourites list on click of button 
  // $('.un-favourite-btn').on('submit', function(event) {
  //   event.preventDefault();
  //   console.log('event: ', event);
  //   $.ajax({
  //     url: '/maps//remove',
  //     method: 'POST'
  //   })
  //   renderMapList();
  //   renderFavouriteList();
  // });

  //  Delete map from My Maps list on click of button 
  // $('.delete-btn').on('submit', function(event) {
  //   event.preventDefault();
  //   console.log('event: ', event);
  //   $.ajax({
  //     url: '/maps//delete',
  //     method: 'POST'
  //   })
  //   renderMapList();
  //   renderFavouriteList();
  // });

});
