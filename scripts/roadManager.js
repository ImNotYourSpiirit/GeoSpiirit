// ==========================================
// GeoSpiirit - Road Manager
// ==========================================

const roadManager = {

    roads: [],

    activeRoads: {},

    discoveredRoads: {},

    loadDistance: 20, // km

    discoverDistance: 0.05 // km (≈50 m)

};

async function loadRoads(chunkFile){

    try{

        const response = await fetch(chunkFile);

        const json = await response.json();

        roadManager.roads.push(...json.roads);

    }

    catch(e){

        console.log("Aucune route");

    }

}

function pointDistance(lat,lng,road){

    let best = Infinity;

    road.points.forEach(point=>{

        const d = distanceKm(

            lat,

            lng,

            point.lat,

            point.lng

        );

        if(d < best)

            best = d;

    });

    return best;

}

function updateRoadDiscovery(playerLat,playerLng){

    roadManager.roads.forEach(road=>{

        const d = pointDistance(

            playerLat,

            playerLng,

            road

        );

        if(

            d < roadManager.discoverDistance

        ){

            if(

                !roadManager.discoveredRoads[road.id]

            ){

                roadManager.discoveredRoads[road.id] = true;

                drawRoad(road);

            }

        }

    });

}

function drawRoad(road){

    if(

        roadManager.activeRoads[road.id]

    ) return;

    const coords = road.points.map(

        p=>[p.lat,p.lng]

    );

    const polyline = L.polyline(

        coords,

        {

            color:"#ffffff",

            weight:4

        }

    );

    polyline.addTo(map);

    roadManager.activeRoads[road.id]=polyline;

}

function unloadRoad(road){

    if(

        roadManager.activeRoads[road.id]

    ){

        map.removeLayer(

            roadManager.activeRoads[road.id]

        );

        delete roadManager.activeRoads[road.id];

    }

}


