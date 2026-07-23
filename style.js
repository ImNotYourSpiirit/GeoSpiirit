// ==============================
// GEO SPIIRIT
// ==============================

const map = L.map("map",{

    zoomControl:true

}).setView([-25.2,133.8],5);


// ==============================
// OPEN STREET MAP
// ==============================

L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

attribution:"© OpenStreetMap"

}

).addTo(map);


// ==============================
// AUSTRALIA LIMITS
// ==============================

const bounds=[

[-44,111],

[-9,155]

];

map.setMaxBounds(bounds);

map.setMinZoom(4);

map.setMaxZoom(18);

setInterval(()=>{


updateFog(
    playerLatLng.lat,
    playerLatLng.lng
);


},2000);


// ==============================
// PLAYER DATA
// ==============================

let player={

money:500,

fuel:60,

food:5,

water:5,

energy:100

};


// ==============================
// UPDATE HUD
// ==============================

function updateHUD(){

document.getElementById("money").innerHTML=player.money;

document.getElementById("fuel").innerHTML=player.fuel+" L";

document.getElementById("food").innerHTML=player.food;

document.getElementById("water").innerHTML=player.water;

document.getElementById("energy").innerHTML=player.energy+"%";

}

updateHUD();


// ==============================
// MAIN CITIES
// ==============================

const cities=[

{

name:"Sydney",

coords:[-33.8688,151.2093]

},

{

name:"Melbourne",

coords:[-37.8136,144.9631]

},

{

name:"Brisbane",

coords:[-27.4698,153.0251]

},

{

name:"Perth",

coords:[-31.9523,115.8613]

},

{

name:"Adelaide",

coords:[-34.9285,138.6007]

},

{

name:"Canberra",

coords:[-35.2809,149.1300]

},

{

name:"Darwin",

coords:[-12.4634,130.8456]

},

{

name:"Hobart",

coords:[-42.8821,147.3272]

},

{

name:"Alice Springs",

coords:[-23.6980,133.8807]

},

{

name:"Cairns",

coords:[-16.9186,145.7781]

}

];


// ==============================
// DISPLAY CITIES
// ==============================

cities.forEach(city=>{

L.marker(city.coords)

.addTo(map)

.bindPopup("<b>"+city.name+"</b>");

});


// ==============================
// START / DESTINATION
// ==============================

let start=

cities[Math.floor(Math.random()*cities.length)];

let destination=

cities[Math.floor(Math.random()*cities.length)];

while(destination===start){

destination=

cities[Math.floor(Math.random()*cities.length)];

}

alert(

"Bienvenue sur GeoSpiirit !\n\nDépart : "

+start.name+

"\nDestination : "

+destination.name

);


// ==============================
// CENTER PLAYER
// ==============================

map.flyTo(start.coords,9);


