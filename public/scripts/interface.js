$(document).ready(function() {

  // when the side button is clicked, toggle the side navbar
  $('.expand').click(() => {
    $('#side-nav').toggle(1100);
  });

  // john's attempt at animating the sliding motion, jQuery.toggle is very glitchy
  $('.top-btn').click(function() {
    if ($(this).val() === "closed") {
      $(this).val("open");
      setTimeout(() => {$('.marker-list').css('width', '95%')}, 50);
      setTimeout(() => {$('.marker-list').css('width', '89%')}, 100);
      setTimeout(() => {$('.marker-list').css('width', '83%')}, 150);
      setTimeout(() => {$('.marker-list').css('width', '77%')}, 200);
      setTimeout(() => {$('.marker-list').css('width', '71%')}, 250);
      setTimeout(() => {$('.marker-list').css('width', '65%')}, 300);
      setTimeout(() => {$('.marker-list').css('width', '59%')}, 350);
      setTimeout(() => {$('.marker-list').css('width', '53%')}, 400);
      setTimeout(() => {$('.marker-list').css('width', '47%')}, 450);
      setTimeout(() => {$('.marker-list').css('width', '41%')}, 500);
      setTimeout(() => {$('.marker-list').css('width', '35%')}, 550);
      setTimeout(() => {$('.marker-list').css('width', '30%')}, 600);
      $('.new-marker').toggle(600);
    } else {
      $(this).val("closed");
      setTimeout(() => {$('.marker-list').css('width', '35%')}, 50);
      setTimeout(() => {$('.marker-list').css('width', '41%')}, 100);
      setTimeout(() => {$('.marker-list').css('width', '47%')}, 150);
      setTimeout(() => {$('.marker-list').css('width', '53%')}, 200);
      setTimeout(() => {$('.marker-list').css('width', '59%')}, 250);
      setTimeout(() => {$('.marker-list').css('width', '65%')}, 300);
      setTimeout(() => {$('.marker-list').css('width', '71%')}, 350);
      setTimeout(() => {$('.marker-list').css('width', '77%')}, 400);
      setTimeout(() => {$('.marker-list').css('width', '83%')}, 450);
      setTimeout(() => {$('.marker-list').css('width', '89%')}, 500);
      setTimeout(() => {$('.marker-list').css('width', '95%')}, 550);
      setTimeout(() => {$('.marker-list').css('width', '100%')}, 600);
      $('.new-marker').toggle(600);
    }

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

  // 

});
  // const map3 = new google.maps.Map(document.getElementById("map_canvas3"), myOptions);
  const lat = parseFloat('49.300708190202045');
  const long = parseFloat('-123.13074020583447');

  const marker1 = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
  });
};
