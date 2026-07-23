function saveGame(){

localStorage.setItem(

"GeoSpiirit",

JSON.stringify({

player,

fog,

cities

})

);

}

function loadGame(){

const save=

localStorage.getItem("GeoSpiirit");

if(!save) return;

const data=JSON.parse(save);

Object.assign(player,data.player);

Object.assign(fog,data.fog);

data.cities.forEach((city,i)=>{

cities[i].discovered=city.discovered;

});

}

setInterval(saveGame,30000);