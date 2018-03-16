var width = 960, height = 700, active = d3.select(null);
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);

// this rectangle background is created so that once you click the background while zoomed in,
// you can zoom out again..

svg.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)

// d3.map
var employment = d3.map();

// given a value in the input domain, returns the corresponding value in the output range/

var colors = d3.scaleThreshold()
  .domain([10,13,16,19,22,25,28,31,34,37])
  .range(["#39A48B","#45AF8A","#55BA89","#66C486","#79CF83","#8ED87F","#A3E27A","#BBEA76","#D3F273","#EDFA71"]);

d3.queue()
  .defer(d3.json, 'ont.json')
  .defer(d3.csv, 'employment.csv', function(d) {
		if(+d.unemployment > -1){
			employment.set(d.Geography, +d.unemployment);
		}
	})
  .await(ready);

function ready(error, censusSubDiv, empl) { if (error)
  throw error;

	//console.log(employment)

	var featureCollection = topojson.feature(censusSubDiv, censusSubDiv.objects.CensusSubDivision);
	//console.log(featureCollection)

	var projection = d3.geoIdentity()
	  .reflectY(true)
	  .fitSize([width, height], featureCollection)

  var thePath = d3.geoPath().projection(projection);

  var g = svg.append('g')
    .attr('id', 'ont')
		.selectAll('path')
    .data(featureCollection.features)
		.enter()
		.append('path')
    .attr('d', thePath)
    .attr('fill', (d)=>{
			return colors(employment.get(+d.properties.CSDUID))
		})
    .attr('class', 'feature')
    .on('click', clicked);

  function clicked(d) {
      if (active.node() === this) return reset();
      active.classed("active", false);
      active = d3.select(this).classed("active", true);

      var bounds = thePath.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = 0.8 / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

      g.transition()
          .duration(750)
          .style("stroke-width", 1.5 / scale + "px")
          .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    };

  function reset() {
    active.classed('active', false);
    active = d3.select(null);

      g.transition()
        .duration(750)
        .attr('transform', '');
  }
}
