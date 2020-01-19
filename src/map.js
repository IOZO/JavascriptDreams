export {initMap, addMarkerOnMap, visitDreamOnMap};

let map;
let panorama;
const panoramaElement = document.querySelector("#panorama");

const resetMapButton = document.querySelector("#reset-map");
const backtoMapButton = document.querySelector("#backto-map");

function styleMap(){
    return ([
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 33
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f7f7f7"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#deecdb"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "25"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "25"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "saturation": "-90"
                },
                {
                    "lightness": "25"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#e0f1f9"
                }
            ]
        }
    ]);
}

function initMap()
{
    const style = styleMap();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.858159, lng: 2.294497},
        zoom: 2,
        mapTypeId:'roadmap',
        styles: style
    });

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('panorama'), {
          position: {lat: 48.858159, lng: 2.294497},
          pov: {
            heading: 34,
            pitch: 10
          }
        });

    panoramaElement.style.display = "none";
    backtoMapButton.style.display = "none";
 
    addMapListener();
}

function addMapListener(){
    resetMapButton.addEventListener("click",resetMap);
    backtoMapButton.addEventListener("click",backToMap);
}

function addMarkerOnMap(dream)
{
    const marker = new google.maps.Marker({
        position: dream.coordinates, 
        map: map,
        icon: dream.done?"images/markervisited.png":"images/marker.png"
   });

   marker.addListener('click', function(){
       zoomOn(marker.getPosition());
   });
}

function zoomOn(position){
    map.setZoom(20);
    map.setCenter(position);
    map.setMapTypeId('satellite');
}



function resetMap(){
    map.setZoom(2);
    map.setCenter({lat: 48.858465, lng: 2.294524});
    map.setMapTypeId('roadmap');
}

function backToMap(){
    panoramaElement.style.display = "none";
    backtoMapButton.style.display = "none";
    resetMapButton.style.display = "block";
}

function visitDreamOnMap(position)
{
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backtoMapButton.style.display = "block";
    resetMapButton.style.display = "none";
}