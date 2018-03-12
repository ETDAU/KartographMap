var ontsvg = 'CensusSubDiv.svg',
    opts = { padding: 30 };

kartograph.map('#map')
          .loadMap(ontsvg, mapLoaded, opts);

function mapLoaded(map) {
    map.addLayer('layer0', {
        styles: {
            stroke: '#aaa',
            fill: '#f6f4f2'
        },
        mouseenter: function(d, path) {
            path.attr('fill', Math.random() < 0.5 ? '#c04' : '#04c');
        },
        mouseleave: function(d, path) {
            path.animate({ fill: '#f6f4f2' }, 500);
        }
    });

}
