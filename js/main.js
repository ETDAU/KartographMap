var ontsvg = 'CensusSubDiv.svg';

kartograph.map('#map', 900, 900)
          .loadMap(ontsvg, mapLoaded);

function mapLoaded(map) {
    map.addLayer('layer0', {
        styles: {
            stroke: '#aaa',
            fill: '#f6f4f2'
        },
        mouseenter: function(d, path) {
            path.attr('fill', '#c04');
        },
        mouseleave: function(d, path) {
            path.animate({ fill: '#f6f4f2' }, 500);
        }
    });




}
