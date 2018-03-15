// CSDUID = Geography in employment.csv file

var width = 960, height = 700;
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);


var employment = d3.map();

// given a value in the input domain, returns the corresponding value in the output range/
// so color(44.6) should return #52e4c2

var colors = d3.scaleThreshold()
  .domain([0,45])
  .range(["#3F445A","#435970","#446E86","#418599","#3C9DA9","#3AB4B5","#40CDBD","#52E4C2"]);

d3.queue()
  .defer(d3.json, 'ont.json')
  .defer(d3.csv, 'employment.csv', function(d) {employment.set(d.Geography, +d.unemployment); })
  .await(ready);
function ready(error, CensusSubDiv) { if (error)
  throw error;

var featureCollection = topojson.feature(CensusSubDiv, CensusSubDiv.objects.CensusSubDivision)

var projection = d3.geoIdentity()
  .reflectY(true)
  .fitSize([width, height], featureCollection)

console.log(colors(44.6));

  svg.append('path')
    .datum(featureCollection)
    .attr('d', d3.geoPath().projection(projection))
    .attr('fill', colors(employment[d.unemployment]));
    //.attr('id', 'ont');
  };







// d3.json('ont.json', function(error, CensusSubDiv) {
//   if (error) return console.error(error);
//
//   var featureCollection = topojson.feature(CensusSubDiv, CensusSubDiv.objects.CensusSubDivision)
//
//   var projection = d3.geoIdentity()
// 	.reflectY(true)
//     .fitSize([width,height],featureCollection)
//
//   svg.append('path')
//   .datum(featureCollection)
//   .attr('d', d3.geoPath().projection(projection))
//   .attr('id', 'ont');
//
// });
