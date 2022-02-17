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
              <form method="POST" action="/maps/${escape(mapObj.map_id)}/favourites">
                <button class="favorite-btn">Favorite</button>
              </form>
              <form method="GET" action="/maps/${escape(mapObj.map_id)}/edit">
                <button class="edit-btn">edit</button>
              </form>
              <form method="POST" action="/maps/${escape(mapObj.map_id)}/delete">
                <button class="delete-btn">delete</button>
              </form>
            </div>
          </div>
          `);

    return $mapListElements;
  };

  // gets user ID off the url accessing current page
  let urlUserId = ''
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

  // favorite maps
  const createFavoriteListElement = function(mapObj) {

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let edit;

    if (mapObj.favourite_map_id !== mapObj.user_id) {
      edit = `<form method="GET" action="/maps/${escape(mapObj.favourite_map_id)}/edit">
        <button type='submit' class="edit-btn">edit</button>
      </form>`
    } else {
      edit = '';
    };

    const $favoriteListElements = $(`
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
          <form method="POST" action="/maps/${escape(mapObj.favourite_map_id)}/favourites">
            <button class="unfavorite-btn">Un-favorite</button>
          </form>
        </div>
      </div>
    `);

    return $favoriteListElements;
  };

  const renderFavoriteList = () => {
    $.ajax({
      url: `/profile/${newUrlUserId}/favourites`,
      method: 'GET',
    })
      .then((data) => {
        $('#favourites-container').empty();
        data.forEach((map) => {
          const $map = createFavoriteListElement(map);
          $('#favourites-container').prepend($map);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMapList();
  renderFavoriteList();
});
