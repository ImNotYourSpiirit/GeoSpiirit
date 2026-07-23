// =================================
// GeoSpiirit - Fog Manager
// Gestion dynamique du brouillard
// =================================


const fogManager = {


    tileSize:0.25,


    activeFog:{},


    radius:2

};




// ================================
// Créer une clé de cellule
// ================================


function getFogTileKey(lat,lng){


    const x=Math.floor(
        lng / fogManager.tileSize
    );


    const y=Math.floor(
        lat / fogManager.tileSize
    );


    return `${x}_${y}`;

}




// ================================
// Créer une tuile de brouillard
// ================================


function createFogTile(x,y){


    const key=`${x}_${y}`;



    if(fogManager.activeFog[key])
        return;



    const lat=y*fogManager.tileSize;

    const lng=x*fogManager.tileSize;



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

            fillOpacity:0.85

        }

    );



    tile.addTo(map);



    fogManager.activeFog[key]=tile;


}




// ================================
// Retirer une tuile découverte
// ================================


function removeFogTile(lat,lng){


    const key=getFogTileKey(
        lat,
        lng
    );


    if(
        fogManager.activeFog[key]
    ){


        map.removeLayer(
            fogManager.activeFog[key]
        );


        delete fogManager.activeFog[key];


    }


}





// ================================
// Mise à jour autour du joueur
// ================================


function updateFog(lat,lng){



    const currentX=Math.floor(
        lng/fogManager.tileSize
    );


    const currentY=Math.floor(
        lat/fogManager.tileSize
    );



    for(
        let x=-fogManager.radius;
        x<=fogManager.radius;
        x++
    ){


        for(
            let y=-fogManager.radius;
            y<=fogManager.radius;
            y++
        ){


            const tileX=currentX+x;

            const tileY=currentY+y;



            const key=`${tileX}_${tileY}`;



            // Si déjà découvert
            if(
                fog.discovered[key]
            ){

                removeFogTile(
                    tileY*fogManager.tileSize,
                    tileX*fogManager.tileSize
                );

            }

            else{


                createFogTile(
                    tileX,
                    tileY
                );


            }


        }

    }


}