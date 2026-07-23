let pois = [];
let poiMarkers = [];

async function loadPOIs() {

    const response = await fetch("data/pois.json");

    pois = await response.json();

}

function getPOIIcon(type){

    switch(type){

        case "fuel":
            return "⛽";

        case "hotel":
            return "🏨";

        case "restaurant":
            return "🍔";

        case "landmark":
            return "🏛";

        default:
            return "📍";

    }

}

function drawPOIs(){

    poiMarkers.forEach(marker=>map.removeLayer(marker));

    poiMarkers=[];

    pois.forEach(poi=>{

        if(!poi.discovered) return;

        const marker=L.marker([poi.lat,poi.lng]);

        marker.bindPopup(

            `<b>${getPOIIcon(poi.type)} ${poi.name}</b>`

        );

        marker.addTo(map);

        poiMarkers.push(marker);

    });

}

function discoverPOIs(){

    pois.forEach(poi=>{

        if(poi.discovered) return;

        const d=map.distance(

            playerMarker.getLatLng(),

            [poi.lat,poi.lng]

        );

        if(d<150){

            poi.discovered=true;

            drawPOIs();

            showMessage(

                getPOIIcon(poi.type)

                +" Découverte : "

                +poi.name

            );

        }

    });

}