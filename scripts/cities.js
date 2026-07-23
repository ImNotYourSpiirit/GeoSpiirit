const cities = [

{
name:"Sydney",
lat:-33.8688,
lng:151.2093,
discovered:true
},

{
name:"Melbourne",
lat:-37.8136,
lng:144.9631,
discovered:true
},

{
name:"Brisbane",
lat:-27.4698,
lng:153.0251,
discovered:true
},

{
name:"Perth",
lat:-31.9505,
lng:115.8605,
discovered:true
},

{
name:"Darwin",
lat:-12.4634,
lng:130.8456,
discovered:true
},

{
name:"Canberra",
lat:-35.2809,
lng:149.1300,
discovered:false
},

{
name:"Alice Springs",
lat:-23.6980,
lng:133.8807,
discovered:false
},

{
name:"Adelaide",
lat:-34.9285,
lng:138.6007,
discovered:false
},

{
name:"Cairns",
lat:-16.9186,
lng:145.7781,
discovered:false
}

];

let cityMarkers = [];

function drawCities() {

    cityMarkers.forEach(marker => map.removeLayer(marker));
    cityMarkers = [];

    cities.forEach(city => {

        if (!city.discovered) return;

        const marker = L.marker([city.lat, city.lng]);

        marker.bindPopup(city.name);

        marker.addTo(map);

        cityMarkers.push(marker);

    });

}

city.discovered = true;

drawCities();

showMessage("📍 " + city.name + " découverte !");