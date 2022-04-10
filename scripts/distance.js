var origin = document.getElementById('origin').value
var destination = document.getElementById('destination').value
var btn = document.getElementById('button')
function getDistance(origin,destination){
  console.log("Hello");
  var google_serv = new google.maps.DistanceMatrixService();
  google_serv.getDistanceMatrix(
    {
      origins: [origin],destination:[destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    },
    callback
  );
}
    function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        $("#result").html(err);
      } else {
        var origin = response.originAddresses[0];
        console.log(origin);
        var destination = response.destinationAddresses[0];
        console.log(destination);
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          $("#result").html(
            "No route between"+" "+origin+" and "+destination
          );
        } else {
          var distance = response.rows[0].elements[0].distance;
          console.log(distance);
          var duration = response.rows[0].elements[0].duration;
          console.log(duration);
          console.log(response.rows[0].elements[0].distance);
          var distance_in_kilo = distance.value / 1000; // the kilom
          
          console.log(distance_in_kilo);
          
          var duration_text = duration.text;
          var duration_value = duration.value;
          
          $("#kilo").html(
            `Distance in Kilometre: ${distance_in_kilo.toFixed(2)}`
          );
          $("#text").html(`Distance in Text: ${duration_text}`);
          $("#minute").html(`Distance in Minutes: ${duration_value}`);
          
        }
      }
    }
    // print results on submit the form
    $("#distance_form").submit(function (e) {
      e.preventDefault();
      calculateDistance();
    });
  btn.addEventListener('click',function(){
    getDistance()
  });