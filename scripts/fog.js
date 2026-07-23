// =====================================
// GeoSpiirit - Fog Of War
// =====================================


const fog = {

    tileSize: 0.25,

    discovered: {},

    layers: {},

    fogLayer: null

};



// ===============================
// CREATION DU BROUILLARD
// ===============================


function createFog(){


    fog.fogLayer = L.layerGroup();


    fog.fogLayer.addTo(map);



    // Création des cases couvrant l'Australie

    for(
        let lat = -44;
        lat < -10;
        lat += fog.tileSize
    ){

        for(
            let lng = 112;
            lng < 154;
            lng += fog.tileSize
        ){


            const key = getTileKey(
                lat,
                lng
            );


            const tile = L.rectangle(

                [
                    [
                        lat,
                        lng
                    ],

                    [
                        lat + fog.tileSize,
                        lng + fog.tileSize
                    ]
                ],

                {

                    color:"#000",

                    fillColor:"#000",

                    fillOpacity:0.9,

                    stroke:false

                }

            );


            fog.layers[key] = tile;


            tile.addTo(
                fog.fogLayer
            );


        }

    }

}





// ===============================
// CLE D'UNE TUILE
// ===============================


function getTileKey(lat,lng){


    const x = Math.floor(
        lng / fog.tileSize
    );


    const y = Math.floor(
        lat / fog.tileSize
    );


    return `${x}_${y}`;

}





// ===============================
// DECOUVRIR UNE TUILE
// ===============================


function discoverTile(lat,lng){


    const key = getTileKey(
        lat,
        lng
    );


    fog.discovered[key]=true;



    if(
        fog.layers[key]
    ){

        fog.fogLayer.removeLayer(
            fog.layers[key]
        );

    }


}





// ===============================
// VERIFIER DECOUVERTE
// ===============================


function isTileDiscovered(lat,lng){


    return (
        fog.discovered[
            getTileKey(lat,lng)
        ] === true
    );

}

console.log("FOG CHARGE");