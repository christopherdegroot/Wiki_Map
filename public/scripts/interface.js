$(document).ready(function () {

  // when the side button is clicked, toggle the side navbar
  $('.expand').click(() => {
    $('#side-nav').toggle(1100);
  });

  // john's attempt at animating the sliding motion, jQuery.toggle is very glitchy
  $('.top-btn').click(function () {
    $('.new-marker').toggle(600);
    $('.edit-marker').toggle(600);
  });

  // gets user ID off the url accessing current page
  const string = window.location.href.slice(21);
  let urlMapId = '';
  for (let char of string) {
    if (char == '1' || char == '2' || char == '3' || char == '4' || char == '5' || char == '6' || char == '7' || char == '8' || char == '9' || char == '0') {urlMapId += char}
  }

  // Create asynchronous function to fetch database info for markers
  const populateMap = async () => {
    const results = await fetch(`/markers/${urlMapId}/fetch`);
    const data = await results.json();
    const coordsArray = [];

    // Convert markers object into only coordinates
    const getCoordinates = function (markerObj) {
      const coords = {
        lat: Number(markerObj.marker_latitude),
        lng: Number(markerObj.marker_longitude),
        title: markerObj.marker_title
      }
      return coords;
    };

    data.forEach((marker) => {
      let data = getCoordinates(marker);
      coordsArray.push(data);
    })
    return Promise.resolve(coordsArray);
  }

  // eslint-disable-next-line func-style
  async function initMap() {

    // Call asynchronous function to return marker data into map initialization
    populateMap()
      .then((array) => {
        const myOptions = {
          zoom: 13,
          center: new google.maps.LatLng(49.300708190202045, -123.13074020583447),
        };
        const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


        array.forEach((marker) => {
          let coordinates = { lat: marker.lat, lng: marker.lng };
          let title = marker.title;
          new google.maps.Marker({
            position: coordinates,
            map: map,
            title,
          });
        });

        // const clickroute = (lati,long) => {
        //   const latLng = new google.maps.LatLng(lati, long); //Makes a latlng
        //   map.panTo(latLng); //Make map global
        // };

        // $('.pin-btn').click(function (event) {
        //   event.preventDefault();
        //   console.log('clicked');
        //   const title = event.target.value;
        //   $.ajax({
        //     url: `/markers/${title}/fetchLatlng`,
        //     method: 'GET'
        //   })
        //     .then((x) => {
        //       clickroute(x[0].marker_latitude, x[0].marker_longitude);
        //     })
        //     .catch((err) => {
        //       console.log('err: ', err);
        //     });
        // });



      });

  }

  // Call map initialization function
  initMap();
});
