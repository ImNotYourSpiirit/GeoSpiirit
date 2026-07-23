const fog = {

    tileSize: 0.25,

    discovered: {},

    layers: {}

};

function getTileKey(lat, lng) {

    const x = Math.floor(lng / fog.tileSize);
    const y = Math.floor(lat / fog.tileSize);

    return `${x}_${y}`;

}

function discoverTile(lat, lng) {

    const key = getTileKey(lat, lng);

    fog.discovered[key] = true;

}

function isTileDiscovered(lat, lng) {

    return fog.discovered[getTileKey(lat, lng)] === true;

}