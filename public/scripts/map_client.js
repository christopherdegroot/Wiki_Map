$(document).ready(function() {

  const createPinListElement = function(pinObj) {

    const $pinListElements = $(`
    <li><button class="pin-btn" value="${pinObj.marker_title}" href="/maps/${urlMapId}">${pinObj.marker_title}</button></li>
    <br>
    `);

    return $pinListElements;
  };

  // gets user ID off the url accessing current page
  const string = window.location.href.slice(21);
  let urlMapId = '';
  for (let char of string) {
    if (char == '1' || char == '2' || char == '3' || char == '4' || char == '5' || char == '6' || char == '7' || char == '8' || char == '9' || char == '0') {urlMapId += char}
  }

  // Get marker data for rendering list of markers
  const renderMarkerList = () => {
    $.ajax({
      url: `/markers/${urlMapId}/fetch`,
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
