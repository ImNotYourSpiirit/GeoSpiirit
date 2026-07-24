// =================================
// GeoSpiirit - Fog Manager
// Fog permanent par cellules
// =================================


const fogManager = {


    tileSize:0.25,

    revealRadius: 3,

    visibleTiles: {},

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


            createFogTile(
                key,
                lat,
                lng
            );

            count++;


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

    const r  = fogManager.revealRadius;
    const cx = Math.floor(lng / fogManager.tileSize);
    const cy = Math.floor(lat / fogManager.tileSize);

    // Build the set of tiles that should be visible this frame
    const newVisible = {};
    for(let dy = -r; dy <= r; dy++){
        for(let dx = -r; dx <= r; dx++){
            newVisible[`${cx+dx}_${cy+dy}`] = true;
        }
    }

    // Reveal tiles that just entered the vision zone
    for(const key in newVisible){
        if(fogManager.activeFog[key]){
            fogManager.layer.removeLayer(fogManager.activeFog[key]);
            delete fogManager.activeFog[key];
        }
    }

    // Re-fog tiles that just left the vision zone
    const prev = fogManager.visibleTiles;
    for(const key in prev){
        if(!newVisible[key] && !fogManager.activeFog[key]){
            const parts = key.split('_');
            const tileLng = parseInt(parts[0]) * fogManager.tileSize;
            const tileLat = parseInt(parts[1]) * fogManager.tileSize;
            createFogTile(key, tileLat, tileLng);
        }
    }

    fogManager.visibleTiles = newVisible;

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