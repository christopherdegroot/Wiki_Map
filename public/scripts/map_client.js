$(document).ready(function () {
  console.log('map client is being called')

  const createPinListElement = function (PinObj) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $pinListElements = $(`
    <div class="list">
    <ul>
    <li><a href="${'link to pin'}">${escape(pinObj.marker_title)}</a></li>
    </ul>
  </div>
    `);

    return $pinListElements;
  };

  // gets map ID off the url accessing current page
  let urlMapId = ''
  if (window.location.href.slice(-1) === '?') {
    urlMapId += window.location.href.slice(-2);
  } else {urlMapId += window.location.href.slice(-1);}

  toString(urlMapId);
  let newUrlMapId = urlMapId.replace('?', '');

  console.log('I am being called')

  const renderMarkerList = () => {
    $.ajax({
      url: `/markers/${newUrlMapId}/fetch`,
      method: 'GET',
    })
      .then((data) => {
        $('#list').empty();
        data.forEach((marker) => {
          const $marker = createPinListElement(marker);
          $('#list').prepend($marker);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMarkerList();
});
