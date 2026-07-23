// ======================================
// GeoSpiirit - Memory Manager
// Gestion de la mémoire
// ======================================



const MAX_MEMORY_CELLS = 20;



function unloadUnusedCells(requiredCells){



    const cells = Object.keys(loadedCells);



    if(cells.length <= MAX_MEMORY_CELLS){

        return;

    }



    cells.forEach(cell=>{



        if(!requiredCells.includes(cell)){


            delete loadedCells[cell];


            console.log(
                "🗑️ Cellule supprimée :",
                cell
            );


        }


    });


}



// Retourne l'état mémoire

function getMemoryUsage(){


    return {

        loadedCells:
        Object.keys(loadedCells).length,


        limit:
        MAX_MEMORY_CELLS


    };


}