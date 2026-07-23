let cities = [];
let cityMarkers = [];

async function loadCities() {

    const response = await fetch("data/cities.json");
    cities = await response.json();

    drawCities();
}

function drawCities() {

    cityMarkers.forEach(marker => map.removeLayer(marker));
    cityMarkers = [];

    cities.forEach(city => {

        if (!city.discovered) return;

        const marker = L.marker([city.lat, city.lng]);

        marker.bindPopup(`
            <b>${city.name}</b><br>
            ${city.state}
        `);

        marker.addTo(map);

        cityMarkers.push(marker);

    });

}

function discoverCities() {

    cities.forEach(city => {

        if (city.discovered) return;

        const distance = map.distance(
            playerMarker.getLatLng(),
            [city.lat, city.lng]
        );

        if (distance <= 5000) {

            city.discovered = true;

            player.discoveredCities.push(city.name);
            player.journal.push(city.name);

            addXP(100);

            drawCities();

            showMessage("📍 Nouvelle ville découverte : " + city.name);

        }

    });

}