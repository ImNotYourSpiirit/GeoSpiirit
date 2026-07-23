// =====================================
// GeoSpiirit - Discovery Manager
// Mémoire du joueur
// =====================================


// Données découvertes par le joueur

let playerDiscoveries = {

    pois: [],

    roads: [],

    places: []

};



// =====================================
// CHARGER LA SAUVEGARDE
// =====================================

function loadDiscoveries(){


    const save = localStorage.getItem(
        "geospirit_discoveries"
    );


    if(save){

        playerDiscoveries = JSON.parse(save);

        console.log(
            "💾 Découvertes chargées"
        );

    }

    else{

        console.log(
            "Nouvelle partie"
        );

    }


}



// =====================================
// SAUVEGARDER
// =====================================

function saveDiscoveries(){


    localStorage.setItem(

        "geospirit_discoveries",

        JSON.stringify(
            playerDiscoveries
        )

    );


    console.log(
        "💾 Progression sauvegardée"
    );


}



// =====================================
// DECOUVRIR UN POI
// =====================================

function discoverPOI(id){


    if(
        !playerDiscoveries.pois.includes(id)
    ){

        playerDiscoveries.pois.push(id);


        saveDiscoveries();


        showMessage(
            "📍 Nouveau lieu découvert !"
        );


    }


}




// =====================================
// DECOUVRIR UNE ROUTE
// =====================================

function discoverRoad(id){


    if(
        !playerDiscoveries.roads.includes(id)
    ){


        playerDiscoveries.roads.push(id);


        saveDiscoveries();


        showMessage(
            "🛣️ Nouvelle route découverte !"
        );


    }


}




// =====================================
// DECOUVRIR UNE VILLE
// =====================================

function discoverPlace(id){


    if(
        !playerDiscoveries.places.includes(id)
    ){


        playerDiscoveries.places.push(id);


        saveDiscoveries();


        showMessage(
            "🏙️ Nouvelle localité découverte !"
        );


    }


}




// =====================================
// VERIFICATIONS
// =====================================


function isPOIDiscovered(id){

    return playerDiscoveries.pois.includes(id);

}



function isRoadDiscovered(id){

    return playerDiscoveries.roads.includes(id);

}



function isPlaceDiscovered(id){

    return playerDiscoveries.places.includes(id);

}