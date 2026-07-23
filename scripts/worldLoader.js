// ======================================
// GeoSpiirit - World Loader
// Chargement dynamique du monde
// ======================================


let loadedCells = {};


// Taille d'une cellule en degrés GPS
// Plus petit = plus précis mais plus de fichiers
const CELL_SIZE = 0.1;



// Retourne l'identifiant d'une cellule
function getCellID(lat, lng){

    const x = Math.floor(lat / CELL_SIZE);
    const y = Math.floor(lng / CELL_SIZE);

    return `${x}_${y}`;

}



// Trouve les cellules autour du joueur

function getNearbyCells(lat, lng, radius = 1){

    const cells = [];

    const currentX = Math.floor(lat / CELL_SIZE);
    const currentY = Math.floor(lng / CELL_SIZE);



    for(let x=-radius; x<=radius; x++){

        for(let y=-radius; y<=radius; y++){


            cells.push(
                `${currentX+x}_${currentY+y}`
            );


        }

    }


    return cells;

}



function processCell(cell){


    renderCell(cell);



    console.log(

        "Cellule analysée :",

        cell.id

    );


}



    try{


        const response = await fetch(

            `data/world/australia/cells/${cellID}.json`

        );


        if(!response.ok){

            console.log(
                "Cellule inexistante : ",
                cellID
            );

            return;

        }



        const data = await response.json();



        loadedCells[cellID] = data;



        console.log(
            "🌍 Cellule chargée : ",
            cellID
        );



        processCell(data);



    }

    catch(error){


        console.error(
            "Erreur chargement cellule : ",
            error
        );


    }


}



// Charge le monde autour du joueur

async function updateWorld(lat,lng){


    const neededCells = getNearbyCells(
        lat,
        lng,
        1
    );



    for(const cell of neededCells){

        await loadCell(cell);

    }



    unloadUnusedCells(
        neededCells
    );


}



// Fonction appelée quand une cellule arrive

function processCell(cell){


    /*
    
    Ici plus tard :

    - routes
    - POI
    - bâtiments
    - localités

    */


    if(cell.pois){

        console.log(
            cell.pois.length,
            "POI trouvés"
        );

    }


}