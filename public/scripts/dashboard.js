$(() => {

  // when the compose button is clicked, toggle the input field
  $('.expand').click(() => {
    $('#side-nav').toggle(1000);
  });

  $('.bounce-arrow').click(() => {
    $('.new-tweet').toggle(500, () => {});
    $('#tweet-text').focus();
  })

});


initMap = () => {
  // The location pin
  const aquarium = { lat: 49.300708190202045, lng: -123.13074020583447 };
  // The map, centered at pin
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: aquarium,
  });
  // The pin
  // const marker = new google.maps.Marker({
  //   position: aquarium,
  //   map: map,
  // });
};
