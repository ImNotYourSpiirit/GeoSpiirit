// ==========================================
// GeoSpiirit - POI Manager
// ==========================================

const poiManager = {

    // Tous les POI chargés
    pois: [],

    // Marqueurs actuellement affichés
    activeMarkers: {},

    // POI déjà découverts
    discovered: {},

    // Rayon de chargement (km)
    loadDistance: 20,

    // Rayon de découverte (km)
    discoverDistance: 0.25

};

// ==========================================
// Charger les fichiers JSON
// ==========================================

async function loadPOIs() {

    const files = [

        "data/pois/cities.json",
        "data/pois/villages.json",
        "data/pois/fuel.json",
        "data/pois/hotels.json",
        "data/pois/restaurants.json",
        "data/pois/campings.json",
        "data/pois/monuments.json"

    ];

    for(const file of files){

        try{

            const response = await fetch(file);

            const json = await response.json();

            poiManager.pois.push(...json);

        }

        catch(e){

            console.warn(file + " introuvable");

        }

    }

    console.log(

        "POIs chargés :",

        poiManager.pois.length

    );

}

// ==========================================
// Distance entre deux points
// ==========================================

function distanceKm(lat1,lng1,lat2,lng2){

    const R=6371;

    const dLat=(lat2-lat1)*Math.PI/180;

    const dLng=(lng2-lng1)*Math.PI/180;

    const a=

        Math.sin(dLat/2)**2+

        Math.cos(lat1*Math.PI/180)*

        Math.cos(lat2*Math.PI/180)*

        Math.sin(dLng/2)**2;

    return 2*R*Math.atan2(

        Math.sqrt(a),

        Math.sqrt(1-a)

    );

}

// ==========================================
// Choisir l'icône
// ==========================================

function getPOIIcon(type){

    return L.icon({

        iconUrl:"assets/icons/"+type+".png",

        iconSize:[32,32],

        iconAnchor:[16,32]

    });

}