function addXP(amount){

player.xp+=amount;

while(player.xp>=1000){

player.level++;

player.xp-=1000;

}

updateHUD();

}

function discoverCities(){

cities.forEach(city=>{

if(city.discovered) return;

const cityCoords = city.coords || [city.lat, city.lng];

if(!cityCoords || cityCoords[0] == null) return;

const d=map.distance(

[player.lat,player.lng],

cityCoords

);

if(d<5000){

city.discovered=true;

player.discoveredCities.push(city.name);

player.journal.push(city.name);

addXP(100);

showMessage(

"📍 Nouvelle ville découverte : "

+city.name

);

}

});

}

function consumeResources(){

player.food=Math.max(0,player.food-0.002);

player.water=Math.max(0,player.water-0.003);

player.energy=Math.max(0,player.energy-0.001);

updateHUD();

}

setInterval(consumeResources,1000);

function updateGame(){

if(typeof playerMarker !== 'undefined'){
    player.lat=playerMarker.getLatLng().lat;
    player.lng=playerMarker.getLatLng().lng;
}

if(typeof discoverFogTile === 'function'){
    discoverFogTile(player.lat, player.lng);
}

discoverCities();

updateHUD();

requestAnimationFrame(updateGame);

}

loadGame();

updateGame();

async function startGame() {

    await loadCities();
    
    await loadPOIs();

    updateHUD();

    discoverPOIs();
    
    discoverCities();
    
    setInterval(()=>{

    updateWorld(
        player.lat,
        player.lng
    );

},5000);

}

// lancement du brouillard
initFog();

startGame();