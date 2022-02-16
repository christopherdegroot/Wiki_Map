$(document).ready(function() {

    const createMapListElement = function(mapObj) {
    
      const escape = function(str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      };
    
      const $mapListElements = $(`
      <div class="map-article">
        <header>
          <div>
            <header class="article-header">${escape(mapObj.maps.map_title)}</header>
          </div>
        </header>
        <div class="article-body">
          <p>${escape(mapObj.maps.map_description)}</p>
          <div class="upvote">
            <p>Upvotes: n</p>
          </div>
        </div>
        <div class="article-footer">
          <form>
            <button class="favorite-btn">Favorite</button>
          </form>
          <form>
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
          $('#map-container').empty();
          data.forEach((map) => {
            const $map = createMapListElement(map);
            $('#map-container').prepend($map);
          });
        })
        .catch((err) => {
          console.log(err);
        })
    };
  
    renderMapList();
  
});