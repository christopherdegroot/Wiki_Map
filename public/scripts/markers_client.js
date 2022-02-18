
$(document).ready(function () {

  const createPinListElement = function(pinObj) {

    const $pinListElements = $(`
    <button id='<%= marker.id %>' class="pin-button">${pinObj.marker_title}</button>
    `);
    return $pinListElements;
  };


  // gets map ID off the url accessing current page
  let urlMapId = '';
  if (window.location.href.slice(-1) === '?') {
    urlMapId += window.location.href.slice(27, -6);
  } else { urlMapId += window.location.href.slice(27, -5); }
  toString(urlMapId);

  const renderMarkerList = () => {
    $.ajax({
      url: `/markers/${urlMapId}/fetch`,
      method: 'GET',
    })
      .then((data) => {
        $('.markers-container').empty();
        data.forEach((marker) => {
          const $marker = createPinListElement(marker);
          $('.markers-container').prepend($marker);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  renderMarkerList();



  // $('.pin-button').click(function(event) {
  //   event.preventDefault();
  //   let marker = $(this).id;

  //   $ajax(() => {
  //     url: ,
  //     method: GET,

  //   })
  // .then(() => {
  // info to display everything
  // append to html
  // })

  // });

  // <!-- <button id='<%= marker.id %>' class="pin-button">pin1</button> -->

});
