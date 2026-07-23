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