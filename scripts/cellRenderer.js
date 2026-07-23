// =================================
// GeoSpiirit - Cell Renderer
// =================================


let activeLayers=[];



function renderCell(cell){


    clearCellLayers();



    // ROUTES

    if(cell.roads){


        cell.roads.forEach(road=>{


            if(!isRoadDiscovered(road.id))
            return;



            let line=L.polyline(

                road.points,

                {
                    color:"gray",
                    weight:4
                }

            );


            line.addTo(map);


            activeLayers.push(line);


        });


    }





    // LOCALITES

    if(cell.places){


        cell.places.forEach(place=>{


            if(!place.discovered)
                return;



            let marker=L.marker(

                [
                    place.lat,
                    place.lng
                ]

            );


            marker.bindPopup(

                place.name

            );


            marker.addTo(map);


            activeLayers.push(marker);



        });


    }





    // POI

    if(cell.pois){


        cell.pois.forEach(poi=>{


            if(!isPOIDiscovered(poi.id))
            return;



            let marker=L.marker(

                [
                    poi.lat,
                    poi.lng
                ]

            );


            marker.bindPopup(

                poi.name

            );


            marker.addTo(map);


            activeLayers.push(marker);



        });


    }


}



function clearCellLayers(){


    activeLayers.forEach(layer=>{


        map.removeLayer(layer);


    });


    activeLayers=[];


}