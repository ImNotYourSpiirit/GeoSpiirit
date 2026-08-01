// ===========================================
// GeoSpiirit - Build World
// Lance toutes les étapes de génération
// ===========================================

const buildPOIs = require("./buildPOIs");
const buildRoads = require("./buildRoads");
const buildChunks = require("./buildChunks");

async function buildWorld(country) {

    console.log("==============================");
    console.log("GeoSpiirit World Builder");
    console.log("==============================");
    console.log("");

    console.log("Pays :", country);
    console.log("");

    await buildPOIs(country);

    await buildRoads(country);

    await buildChunks(country);

    console.log("");
    console.log("Construction terminée !");
}

const country = process.argv[2] || "australia";

buildWorld(country);