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