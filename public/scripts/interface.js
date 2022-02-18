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
  const urlMapId = window.location.href.slice(27, 28);

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
          zoom: 11,
          center: new google.maps.LatLng(49.300708190202045, -123.13074020583447),
        };
        const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        
        array.forEach((marker) => {
          let coordinates = { lat: marker.lat, lng: marker.lng }
          let title = marker.title;
          new google.maps.Marker({
            position: coordinates,
            map: map,
            title,
          });
        });

        // Pan map to marker feature (WIP)
        // const element = document.getElementsByClassName('pin-btn');

        // for (let i = 0; i < element.length; i++) {
        //   element[i].addEventListener('click', function(e) {
        //     console.log(e.target);
        //     map.panTo(new google.maps.LatLng(29.300708190202045, -83.13074020583447))
        //   })         
        // }
        
      })
      .catch((err) => console.log(err))
  };

  // Call map initialization function
  setTimeout(() => {
    initMap();
  }, 50)
});
