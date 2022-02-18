$(document).ready(function() {

  const createPinListElement = function(pinObj) {

    const $pinListElements = $(`
    <li><button class="pin-btn" value="${pinObj.marker_title}" href="/maps/${newUrlMapId}">${pinObj.marker_title}</button></li>
    <br>
    `);

    return $pinListElements;
  };

  // gets map ID off the url accessing current page
  let urlMapId = '';
  if (window.location.href.slice(-1) === '?') {
    urlMapId += window.location.href.slice(-2);
  } else {urlMapId += window.location.href.slice(-1);}

  toString(urlMapId);
  let newUrlMapId = urlMapId.replace('?', '');

  // Get marker data for rendering list of markers
  const renderMarkerList = () => {
    $.ajax({
      url: `/markers/${newUrlMapId}/fetch`,
      method: 'GET',
    })
      .then((data) => {
        $('.list').empty();
        data.forEach((marker) => {
          const $marker = createPinListElement(marker);
          $('.list').prepend($marker);
        });

        // Call function to ensure all dynamically rendered elements loaded before applying listeners to them
        renderMarkerDetails()

      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get marker details and create eventListener to show marker details when clicked
  const renderMarkerDetails = () => {
    $.ajax({
      url: `/markers/${urlMapId}/detail`,
      method: 'GET'
    })
      .then((data) => {
        $('.pin-btn').on('click', function(event) {
          const btnValue = event.target.value;
          for (const element of data) {
            if (element.marker_title === btnValue) {
              $('.marker-content').empty();
              const $markerDetails =  $(`
              <header class="marker-article"><strong>${element.marker_title}</strong></header>
              <article>${element.description}</article>
              <br>
              <div class="marker-img">
                <img src="${element.image_url}">
              </div>
              `)
              $('.marker-content').append($markerDetails);
            }
          }
        });
      });

  };

  renderMarkerList();

});
