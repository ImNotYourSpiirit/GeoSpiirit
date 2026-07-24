// ===========================================
// GeoSpiirit
// World Loader v2
// ===========================================

const worldLoader = {

    chunkSize: 0.25,

    loadRadius: 1,

    loadedChunks: {},

    loading: false

};




// ===========================================
// Clé d'un chunk
// ===========================================

function getChunkKey(lat,lng){

    const x=Math.floor(
        lng/worldLoader.chunkSize
    );

    const y=Math.floor(
        lat/worldLoader.chunkSize
    );

    return `${x}_${y}`;

}




// ===========================================
// Coordonnées d'un chunk
// ===========================================

function getChunkCoords(key){

    const split=key.split("_");

    return{

        x:Number(split[0]),

        y:Number(split[1])

    };

}





// ===========================================
// Charger un chunk
// ===========================================


async function loadChunk(x,y){


    const key=`${x}_${y}`;



    if(worldLoader.loadedChunks[key])

        return;




    try{


        const response = await fetch(

            `data/chunks/${key}.json`

        );



        const chunk = await response.json();



        worldLoader.loadedChunks[key]=chunk;



        // ==========================
        // Charger les POI
        // ==========================


        if(chunk.pois){


            chunk.pois.forEach(poi=>{


                const exists =

                poiManager.pois.some(

                    p=>p.id===poi.id

                );



                if(!exists){


                    poiManager.pois.push(poi);


                }


            });


        }





        // ==========================
        // Charger les routes
        // ==========================


        if(chunk.segments){


            loadRoadSegments(chunk);


        }




        console.log(

            "Chunk chargé :",

            key

        );



    }


    catch(error){


        console.log(

            "Impossible de charger",

            key

        );


    }


}

// ===========================================
// Décharger un chunk
// ===========================================

function unloadChunk(key){


    if(!worldLoader.loadedChunks[key])

        return;




    const chunk =
    worldLoader.loadedChunks[key];



    // ==========================
    // Retirer les routes
    // ==========================


    if(chunk.segments){


        chunk.segments.forEach(segment=>{


            if(
                roadSegmentManager.activeLines[segment.id]
            ){


                map.removeLayer(

                    roadSegmentManager.activeLines[segment.id]

                );


                delete
                roadSegmentManager.activeLines[segment.id];


            }


        });


    }





    delete worldLoader.loadedChunks[key];



    console.log(

        "Chunk supprimé :",

        key

    );


}

// ===========================================
// Mise à jour du monde
// ===========================================

async function updateWorld(lat,lng){

    if(worldLoader.loading)
        return;

    worldLoader.loading=true;

    const center=getChunkCoords(

        getChunkKey(lat,lng)

    );

    const wanted={};

    for(

        let x=-worldLoader.loadRadius;

        x<=worldLoader.loadRadius;

        x++

    ){

        for(

            let y=-worldLoader.loadRadius;

            y<=worldLoader.loadRadius;

            y++

        ){

            const cx=center.x+x;

            const cy=center.y+y;

            const key=`${cx}_${cy}`;

            wanted[key]=true;

            await loadChunk(

                cx,

                cy

            );

        }

    }

    Object.keys(

        worldLoader.loadedChunks

    ).forEach(key=>{

        if(!wanted[key]){

            unloadChunk(key);

        }

    });

    worldLoader.loading=false;

}

// ===========================================
// Mise à jour du monde
// ===========================================

async function updateWorld(lat,lng){

    if(worldLoader.loading)
        return;

    worldLoader.loading=true;

    const center=getChunkCoords(

        getChunkKey(lat,lng)

    );

    const wanted={};

    for(

        let x=-worldLoader.loadRadius;

        x<=worldLoader.loadRadius;

        x++

    ){

        for(

            let y=-worldLoader.loadRadius;

            y<=worldLoader.loadRadius;

            y++

        ){

            const cx=center.x+x;

            const cy=center.y+y;

            const key=`${cx}_${cy}`;

            wanted[key]=true;

            await loadChunk(

                cx,

                cy

            );

        }

    }

    Object.keys(

        worldLoader.loadedChunks

    ).forEach(key=>{

        if(!wanted[key]){

            unloadChunk(key);

        }

    });

    worldLoader.loading=false;

}

