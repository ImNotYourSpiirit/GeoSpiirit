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

            fillColor: "#2b2b2b",
            fillOpacity: 1

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

// ==========================================
// GeoSpiirit - Révélation du fog par les routes
// ==========================================



function revealFogAroundRoad(segment){


    if(!segment.points)
        return;



    const revealDistance = 0.08; 
    // environ 8 km autour du segment



    segment.points.forEach(point=>{


        revealFogArea(

            point[0],

            point[1],

            revealDistance

        );


    });


}






// ==========================================
// Révéler une zone circulaire
// ==========================================


function revealFogArea(
    lat,
    lng,
    radius
){



    const tileRadius = Math.ceil(

        radius / fogManager.tileSize

    );



    const centerX = Math.floor(

        lng / fogManager.tileSize

    );



    const centerY = Math.floor(

        lat / fogManager.tileSize

    );





    for(
        let x=-tileRadius;
        x<=tileRadius;
        x++
    ){


        for(
            let y=-tileRadius;
            y<=tileRadius;
            y++
        ){



            const tileX =
            centerX+x;



            const tileY =
            centerY+y;



            const tileLat =
            tileY*fogManager.tileSize;



            const tileLng =
            tileX*fogManager.tileSize;



            removeFogTile(

                tileLat,

                tileLng

            );



            // mémoire de découverte

            const key =
            `${tileX}_${tileY}`;



            fog.discovered[key]=true;



        }


    }


}