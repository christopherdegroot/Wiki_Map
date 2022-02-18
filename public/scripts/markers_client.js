

$(document).ready(function () {

  const createPinListElement = function (pinObj) {

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $pinListElements = $(`
    <li><button class="pin-button" value="${escape(pinObj.id)}">${escape(pinObj.marker_title)}</button></li>
    <br>
    `);
    return $pinListElements;
  };


  // gets map ID off the url accessing current page
  let urlMapId = '';
  if (window.location.href.slice(-1) === '?') {
    urlMapId += window.location.href.slice(27, -6);
  } else { urlMapId += window.location.href.slice(27, -5); }
  toString(urlMapId);

  const renderMarkers = () => {
    $.ajax({
      url: `/markers/${urlMapId}/fetch`,
      method: 'GET',
    })
      .then((data) => {
        $('.markers-container').empty();
        data.forEach((marker) => {
          const $marker = createPinListElement(marker);
          $('.markers-container').prepend($marker);


          $('.pin-button').click(function (event) {
            event.preventDefault();
            const id = event.target.value;
            $.ajax({
              url: `/markers/${id}/fetchId`,
              method: 'POST'
            })
              .then((x) => {
                console.log('x: ', x[0]);
                $('.new-marker-title').val(`${x[0].marker_title}`);
                $('.img-url').val(`${x[0].image_url}`);
                $('.marker_longitude').val(`${x[0].marker_longitude}`);
                $('.marker_latitude').val(`${x[0].marker_latitude}`);
                $('.description').val(`${x[0].description}`);
                $('.id').val(`${x[0].id}`);
              })
              .catch((err) => {
                console.log('err: ', err);
              });
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  renderMarkers();

});
