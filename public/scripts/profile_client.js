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
                <p>Upvotes: <strong>${escape(mapObj.map_rating)}</strong></p>
              </div>
            </div>
            <div class="article-footer">
                <button type="button" value="${escape(mapObj.map_id)}" class="favourite-btn">Favourite</button>
              <form method="GET" action="/maps/${escape(mapObj.map_id)}/edit">
                <button type="submit" class="edit-btn">Edit</button>
              </form>
                <button type="button" value="${escape(mapObj.map_id)}" class="delete-btn">Delete</button>
            </div>
          </div>
          `);

    return $mapListElements;
  };

  // gets user ID off the url accessing current page
  let newUrlUserId = window.location.href.slice(30, 31);

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
            <p>Upvotes: <strong>${escape(mapObj.map_rating)}</strong></p>
            <div>
              Created By: <strong>${escape(mapObj.name)}</strong>
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
        $('#favourites-container').empty();
        console.log(err);
      });
  };

  renderMapList();
  renderFavouriteList();

  $(document).ajaxSuccess(function() {
    setTimeout(() => {  // Timeout to allow page to finish rendering before event listeners are applied to dynamically created elements

      //  Add favourite map to My Favourites list on click of button
      $('.favourite-btn').unbind('click')
      $('.favourite-btn').on('click', function(event) {
        event.preventDefault();
        const btnValue = event.target.value;
        $.ajax({
          url: `/maps/${btnValue}/add`,
          method: 'POST'
        })
          .then(() => {
            renderMapList();
            renderFavouriteList();
          });
      });

      //  Remove favourite map to My Favourites list on click of button
      $('.unfavourite-btn').unbind('click')
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
          });
      });

      // Delete map from My Maps list on click of button
      $('.delete-btn').unbind('click')
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
          });
      });

    }, 20);
  });

});
