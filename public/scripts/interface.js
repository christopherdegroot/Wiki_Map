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


});



// function to initialize the google maps api
initMap = () => {

  const myOptions = {
    zoom: 13,
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

  google.maps.event.addListener(map, "click", (event) => {
    return createMarker(event);
  });

  const marker1 = new google.maps.Marker({
    position: { lat: 49.300708190202045, lng: -123.13074020583447 },
    map: map,
  });

};
