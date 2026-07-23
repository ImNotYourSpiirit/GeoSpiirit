// =================================
// GeoSpiirit - Fog Manager
// Fog permanent par cellules
// =================================


const fogManager = {


    tileSize:0.1,


    activeFog:{},


    layer:L.layerGroup(),


    // Australie pour le moment

    bounds:{

        minLat:-44,

        maxLat:-10,

        minLng:112,

        maxLng:154

    }


};




// ================================
// Initialisation
// ================================

function initFog(){

    fogManager.layer.addTo(map);

    let count = 0;

    for(
        let lat=fogManager.bounds.minLat;
        lat<fogManager.bounds.maxLat;
        lat+=fogManager.tileSize
    ){


        for(
            let lng=fogManager.bounds.minLng;
            lng<fogManager.bounds.maxLng;
            lng+=fogManager.tileSize
        ){


            const key=getFogTileKey(
                lat,
                lng
            );


            if(
                !fog.discovered[key]
            ){

                createFogTile(
                    key,
                    lat,
                    lng
                );

                count++;

            }


        }


    }

}






// ================================
// Clé cellule
// ================================


function getFogTileKey(lat,lng){


    const x=Math.floor(
        lng/fogManager.tileSize
    );


    const y=Math.floor(
        lat/fogManager.tileSize
    );


    return `${x}_${y}`;

}







// ================================
// Création tuile fog
// ================================


function createFogTile(key,lat,lng){



    if(
        fogManager.activeFog[key]
    )
        return;



    const tile=L.rectangle(

        [

            [
                lat,
                lng
            ],

            [
                lat+fogManager.tileSize,
                lng+fogManager.tileSize
            ]

        ],


        {

            stroke:false,

            fillColor:"#000",

            fillOpacity:0.90

        }

    );



    tile.addTo(
        fogManager.layer
    );


    fogManager.activeFog[key]=tile;


}







// ================================
// Découvrir une cellule
// ================================


function discoverFogTile(lat,lng){


    const key=getFogTileKey(
        lat,
        lng
    );


    fog.discovered[key]=true;



    if(
        fogManager.activeFog[key]
    ){


        fogManager.layer.removeLayer(
            fogManager.activeFog[key]
        );


        delete fogManager.activeFog[key];


    }


}






// ================================
// Mise à jour exploration
// ================================


function updateFog(lat,lng){



    discoverFogTile(
        lat,
        lng
    );


}