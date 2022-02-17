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

  // Create asynchronous function to fetch database info for markers
  const populateMap = async () => {
    const results = await fetch('/markers/1/fetch')
    const data = await results.json();
    const coordsArray = [];

    // Convert markers object into only coordinates  
    const getCoordinates = function(markerObj) {
      const coords = { 
        lat: Number(markerObj.marker_latitude),
        lng: Number(markerObj.marker_longitude)
      }
      return coords;
    };
    
    data.forEach((marker) => {
      let data = getCoordinates(marker);
      coordsArray.push(data);
    })
    return Promise.resolve(coordsArray);
    }
    
  async function initMap() {

    // Call asynchronous function to return marker data into map initialization
    populateMap()
      .then((array) => {
        const myOptions = {
          zoom: 3,
          center: new google.maps.LatLng(49.300708190202045, -123.13074020583447),
        };
        const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        
        const createMarker = (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          const marker = new google.maps.Marker({
            position: { lat, lng, },
            map: map,
          });
          return marker;
        };
        
        array.forEach((coords) => {
          new google.maps.Marker({
            position: coords,
            map: map,
          });
        });
      })
   
  };

  // Call map initialization function
  initMap();
});