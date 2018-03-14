// var ontsvg = 'CensusSubDiv.svg';
//
// kartograph.map('#map', 900, 900)
//           .loadMap(ontsvg, mapLoaded);
//
// function mapLoaded(map) {
//     map.addLayer('layer0', {
//         styles: {
//             stroke: '#aaa',
//             fill: '#f6f4f2'
//         },
//         mouseenter: function(d, path) {
//             path.attr('fill', '#c04');
//         },
//         mouseleave: function(d, path) {
//             path.animate({ fill: '#f6f4f2' }, 500);
//         }
//     });
// }

// MAP WITH TOPOJSON

var width = 960, height = 700;

var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height)

d3.json('CensusSubDiv.json', function(error, CensusSubDiv) {
  if (error) return console.error(error);



  svg.append('path')
  .datum(topojson.feature(CensusSubDiv, CensusSubDiv.objects.CensusSubDivision))
  .attr('d', d3.geo.path().projection(d3.geo.mercator()))
  .attr('id', 'ont')
;
});
