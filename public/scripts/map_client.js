$(document).ready(function () {

  const createPinListElement = function (pinObj) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $pinListElements = $(`

    <li><a href="${'link to pin'}">${pinObj.user_id}</a></li>

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMarkerList();
});
