$(() => {

  // when the side button is clicked, toggle the side navbar
  $('.expand').click(() => {
    $('#side-nav').toggle(1000);
  });

  $('.bounce-arrow').click(() => {
    $('.new-tweet').toggle(500, () => {});
    $('#tweet-text').focus();
  })

});

// function to initialize the google maps api
initMap = () => {

  const myOptions = {
    zoom: 16,
    center: new google.maps.LatLng(49.300708190202045, -123.13074020583447),
  };

  const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  const map2 = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);

  const map3 = new google.maps.Map(document.getElementById("map_canvas3"), myOptions);

  const marker = new google.maps.Marker({
    position: { lat: 49.300708190202045, lng: -123.13074020583447 },
    map: map2,
  });

  // // The location pin
  // const aquarium = { lat: 49.300708190202045, lng: -123.13074020583447 };
  // // The map, centered at pin
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 12,
  //   center: aquarium,
  // });
  // The pin
  // const marker = new google.maps.Marker({
  //   position: aquarium,
  //   map: map,
  // });
};
