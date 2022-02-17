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
                <button type="button" class="edit-btn">Edit</button>
              </form>
                <button type="button" value="${escape(mapObj.map_id)}" class="delete-btn">Delete</button>
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
            <button class="title-btn">${escape(mapObj.map_title)}</button>
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
            <button type="button" value="${escape(mapObj.favourite_map_id)}" class="unfavourite-btn">Un-favourite</button>
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

  $(document).ajaxSuccess(function() {
    setTimeout(() => {  // Timeout to allow page to finish rendering before event listeners are applied to dynamically created elements

      //  Add favourite map to My Favourites list on click of button
      $('.favourite-btn').on('click', function(event) {
        event.preventDefault();
        const btnValue = event.target.value;
        console.log('btn:', btnValue);
        $.ajax({
          url: `/maps/${btnValue}/add`,
          method: 'POST'
        })
          .then(() => {
            renderMapList();
            renderFavouriteList();
          })
      });

      //  Remove favourite map to My Favourites list on click of button
      $('.unfavourite-btn').on('click', function(event) {
        event.preventDefault();
        const btnValue = event.target.value;
        $.ajax({
          url: `/maps/${btnValue}/remove`,
          method: 'POST'
        })
          .then(() => {
            renderMapList();
            renderFavouriteList();
          })
      });

      // Delete map from My Maps list on click of button
      $('.delete-btn').on('click', function(event) {
        event.preventDefault();
        const btnValue = event.target.value;
        $.ajax({
          url: `/maps/${btnValue}/delete`,
          method: 'POST'
        })
          .then(() => {
            renderMapList();
            renderFavouriteList();
          })
      });

    }, 20);
  });

});
