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
            </div>
          </div>
          `);

    return $mapListElements;
  };

  // gets user ID off the url accessing current page
  let newUrlUserId = window.location.href.slice(30, 31);

  const renderMapList = () => {
    $.ajax({
      url: `/profile/all`,
      method: 'GET',
    })
      .then((data) => {
        console.log(data)
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



  renderMapList();

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
