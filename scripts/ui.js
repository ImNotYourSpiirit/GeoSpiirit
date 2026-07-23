const hud=document.getElementById("hud");

function updateHUD(){

hud.innerHTML=`

💰 ${player.money}$

<br>

⛽ ${player.fuel.toFixed(1)} L

<br>

🍞 ${player.food}

<br>

💧 ${player.water}

<br>

⚡ ${player.energy}

<br>

⭐ Niveau ${player.level}

<br>

XP : ${player.xp}

`;

}

const messageBox = document.getElementById("messageBox");

function showMessage(text){

if(!messageBox) return;

messageBox.innerHTML=text;

messageBox.style.opacity="1";

setTimeout(()=>{

messageBox.style.opacity="0";

},4000);

}