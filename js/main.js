
var map = kartograph.map('#canadamap', 600, 600);

map.loadMap('censussubdivision.svg', () => {
  map.addLayer('censussubdivision');
  console.log('done loading');
});
