$(() => {

  // when the side button is clicked, toggle the side navbar
  $('.expand').click(() => {
    $('#side-nav').toggle(1100);
  });

  // john's attempt at animating the sliding motion, jQuery.toggle is very glitchy
  $('.top-btn').click(function() {
    $('.new-marker').toggle(600);
  });
});

// function to initialize the google maps api
initMap = () => {

  const myOptions = {
    zoom: 13,
    center: new google.maps.LatLng(49.300708190202045, -123.13074020583447),
  };

  const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  // const map2 = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);

  // const map3 = new google.maps.Map(document.getElementById("map_canvas3"), myOptions);
  const lat = parseFloat('49.300708190202045');
  const long = parseFloat('-123.13074020583447');

  const marker1 = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
  });
};
