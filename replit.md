# GeoSpiirit

A browser-based geo-exploration game set in Australia. The player navigates a Leaflet map, discovers cities, manages resources (money, fuel, food, water, energy), and completes missions.

## Stack

- Pure HTML / CSS / JavaScript — no build step
- [Leaflet.js](https://leafletjs.com/) for the interactive map (loaded via CDN)
- Static file server (`serve`) on port 5000

## How to run

The **Start application** workflow serves the project:

```
npx serve . -p 5000
```

Open the preview pane to play.

## Project structure

```
index.html          Main page
style.css           Styles
style.js            Map init, basic player/HUD setup (note: loaded as script.js was the intended name)
scripts/            Game logic modules
  player.js         Player state
  game.js           Core game loop (XP, resource consumption)
  cities.js         City data & discovery
  ui.js             HUD updates
  save.js           Save/load via localStorage
  fog.js            Fog-of-war rendering
  worldLoader.js    World cell loading
  cellRenderer.js   Cell rendering on map
  discoveryManager.js  Discovery tracking
  memoryManager.js  Memory/journal
  pois.js           Points of interest
  vehicles.js       Vehicle system
  missions.js       Mission system
  events.js         Random events
  travel.js         Travel mechanics
  streetview.js     Street View integration
data/
  events.json       Event definitions
  missions.json     Mission definitions
  world/australia/  World cell data
saves/
  player.json       Saved player state
```

## Known issues

- `data/pois.json` is referenced in `game.js` but does not exist in the repo — POI loading will silently fail with a 404.
- `style.js` contains the main map initialization code (was intended to be named `script.js`).
