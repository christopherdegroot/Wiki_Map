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
              <form type="GET" action="/maps/:id">
                <button class="title-btn">${escape(mapObj.maps.map_title)}</button>
              </form>
              <div>
                <p>${escape(mapObj.maps.map_category)}</p>
              </div>
            </header>
            <div class="article-body">
              <p>${escape(mapObj.maps.map_description)}</p>
              <div class="upvote">
                <p>Upvotes: ${escape(mapObj.maps.map_rating)}</p>
              </div>
            </div>
            <div class="article-footer">
              <form>
                <button class="favorite-btn">Favorite</button>
              </form>
              <form type="GET" action="/maps/:id/edit">
                <button class="edit-btn">edit</button>
              </form>
              <form>
                <button class="delete-btn">delete</button>
              </form>
            </div>
          </div>
          `);

    return $mapListElements;
  };


  const renderMapList = () => {
    $.ajax({
      url: '/profile/1/render',
      method: 'GET',
    })
      .then((data) => {
        $('.my-maps').empty();
        data.forEach((map) => {
          const $map = createMapListElement(map);
          $('.my-maps').prepend($map);
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

    const $favoriteListElements = $(`
      <div class="map-article">
        <header class="article-header">
          <form type="GET" action="/maps/:id">
            <button class="title-btn">${escape(mapObj.maps.map_title)}</button>
          </form>
          <div>
            <p>${escape(mapObj.maps.map_category)}</p>
          </div>
        </header>
        <div class="article-body">
          <p>${escape(mapObj.maps.map_description)}</p>
          <div class="upvote">
            <p>Upvotes: ${escape(mapObj.maps.map_rating)}</p>
          </div>
        </div>
        <div class="article-footer">
          <form>
            <button class="unfavorite-btn">Un-favorite</button>
          </form>
          <form type="GET" action="/maps/:id/edit">
            <button type='submit' class="edit-btn">edit</button>
          </form>
          <form>
            <button class="delete-btn">delete</button>
          </form>
        </div>
      </div>
    `);

    return $favoriteListElements;
  };

  const renderFavoriteList = () => {
    $.ajax({
      url: '/profile/1/render',
      method: 'GET',
    })
      .then((data) => {
        $('.my-favorites').empty();
        data.forEach((map) => {
          const $map = createFavoriteListElement(map);
          $('.my-favorites').prepend($map);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMapList();
  renderFavoriteList();
});
