// Initialize and add the map
var map;

/**
 * source - starting point
 * dest - ending point
 */
const source = { lat: 40.7767644, lng: -73.9761399 };
const dest = { lat: 40.771209, lng: -73.9673991 };


function initMap() {
    // The map, centered on Central Park
    const center = { lat: 40.774102, lng: -73.971734 };
    const options = { zoom: 15, scaleControl: true, center: center };
    map = new google.maps.Map(
        document.getElementById('map'), options);
    // Locations of landmarks

    // The markers for The soruce and The Frick Collection
    var mk1 = new google.maps.Marker({ position: source, map: map });
    var mk2 = new google.maps.Marker({ position: dest, map: map });
}


const route = {
    origin: source,
    destination: dest,
    travelMode: 'DRIVING'
}

directionsService.route(route,
    function (response, status) { // anonymous function to capture directions
        if (status !== 'OK') {
            window.alert('Directions request failed due to ' + status);
            return;
        } else {
            directionsRenderer.setDirections(response); // Add route to the map
            var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
            if (!directionsData) {
                window.alert('Directions request failed');
                return;
            }
            else {
                document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
            }
        }
    });