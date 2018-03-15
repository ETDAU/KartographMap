// CSDUID = Geography in employment.csv file

var width = 960, height = 700;
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);


var employment = d3.map();

// given a value in the input domain, returns the corresponding value in the output range/
// so color(44.6) should return #52e4c2

var colors = d3.scaleThreshold()
  .domain([6,40])
  .range(d3.schemeBlues[5]);

d3.queue()
  .defer(d3.json, 'ont.json')
  .defer(d3.csv, 'employment.csv', function(d) {
		if(+d.unemployment > -1){
			employment.set(d.Geography, +d.unemployment);
		}
	})
  .await(ready);

function ready(error, CensusSubDiv, empl) { if (error)
  throw error;

	//console.log(employment)

	var featureCollection = topojson.feature(CensusSubDiv, CensusSubDiv.objects.CensusSubDivision)
	//console.log(featureCollection)

	var projection = d3.geoIdentity()
	  .reflectY(true)
	  .fitSize([width, height], featureCollection)

	//console.log(colors(44.6));

  svg.append('g')
    .attr('id', 'ont')
		.selectAll('path')
    .data(featureCollection.features)
		.enter()
		.append('path')
    .attr('d', d3.geoPath().projection(projection))
    .attr('fill', (d)=>{
			return colors(employment.get(+d.properties.CSDUID))
		});

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
