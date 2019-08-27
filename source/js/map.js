(function (){
  var pin_small = {width: 62, height: 53};
  var pin_big = {width: 124, height: 106};
  var width_table = 768;
  var width_desktop = 1300;

  function resizeListener(f, ms) {
    var timer = null;

    return function (cb) {
      var onComplete = function () {
        f.apply(this, cb);
        timer = null;
      };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(onComplete, ms);
    };
  }

  window.initialize = function() {
    var viewport = document.documentElement.clientWidth || window.innerWidth;
    var mapCenter = viewport < width_desktop ? {lat: 59.938882, lng: 30.32323} : {lat: 59.939065, lng: 30.319335};
    var pinCenter = viewport < width_table ? {lat: 59.93871, lng: 30.32323} : {lat: 59.93871, lng: 30.32299};
    var pinSize = viewport < width_table ? pin_small : pin_big;


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: mapCenter
    });

    var image = {
      url: "img/map-pin.png",
      scaledSize: pinSize
    };

    var beachMarker = new google.maps.Marker({
      position: pinCenter,
      map: map,
      optimized: true,
      icon: image
    });
  };

  window.addEventListener("resize", resizeListener(initialize, 1000));
})();
