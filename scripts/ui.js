const hud=document.getElementById("hud");

function updateHUD(){

hud.innerHTML=`

💰 ${Math.round(player.money)}$

<br>

⛽ ${Math.round(player.fuel)} L

<br>

🍞 ${Math.round(player.food)}

<br>

💧 ${Math.round(player.water)}

<br>

⚡ ${Math.round(player.energy)}

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