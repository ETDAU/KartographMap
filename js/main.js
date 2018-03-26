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
var cddata = d3.map();

// given a value in the input domain, returns the corresponding value in the output range/

var colors = d3.scaleOrdinal()
  .domain([0,5])
  .range(['#195C55','#1F6B5E','#287965','#32876C','#3E9672','#4CA577','#5CB47B','#6DC27E','#80D180','#94E082','#AAEE83','#C2FC84']);

d3.queue()
  .defer(d3.json, 'topojson/ontcd.json')
  .defer(d3.csv, 'data/cddata.csv', function(d) {
		if(+d.percent > 0){
			cddata.set(d.geography, +d.percent);
		}
	})
  .await(ready);

function ready(error, censusDivision, perc) { if (error)
  throw error;

	//console.log(employment)

	var featureCollection = topojson.feature(censusDivision, censusDivision.objects.censusdiv);
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
			return colors(cddata.get(d.properties.CDNAME))
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
  };
}
