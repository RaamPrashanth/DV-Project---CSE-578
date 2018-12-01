function loadChoroplethMap(eventId) {
    console.log("Choro Map Event ID: ", eventId);
    $('#choroplethmapListDiv').html("");
    var sentiment_colors = ["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"];
    var format = d3.format(",");
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 1000 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;
    var svg = d3.select("#choroplethmapListDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');
    var projection = d3.geoMercator()
        .scale(130)
        .translate([width / 2, height / 1.5]);
    var path = d3.geoPath().projection(projection);

    queue()
        .defer(d3.json, "countries.geojson")
        .await(ready)

    function ready(error, data, population) {
        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return "#D4F1FF";
            })
            .attr("id", function (d, i) {
                return d.properties.ADMIN.split(' ').join('_') + "_mapper";
            })
            .style('stroke', 'white')
            .style('stroke-width', 1.5)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style('stroke-width', 0.3)
            .on('mouseover', function (d) {
                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3);
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .style("opacity", 0.8)
                    .style("stroke", "white")
                    .style("stroke-width", 0.3);
            });

        svg.append("path")
            .datum(topojson.mesh(data.features, function (a, b) {
                return a.id !== b.id;
            }))
            .attr("class", "names")
            .attr("d", path);

        d3.select("#United_States_of_America_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#United_Kingdom_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#France_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Argentina_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Portugal_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Italy_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Spain_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Brazil_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.select("#Netherlands_mapper").style('fill', function (f) {
            return sentiment_colors[7]
        });
        d3.json("choromap.json", function (d) {
            data = d[eventId];
            var max = 0;
            var min = 1000;
            for (var key in data) {
                max = Math.max(max, data[key]);
                min = Math.min(min, data[key]);
            }
            var range = (max - min) / 10;

            for (var key1 in data) {
                var id = "#" + key1.split(' ').join('_') + "_mapper"
                if (id.indexOf('(') !== -1) {
                    continue;
                }

                d3.select(id).style('fill', function (f) {
                    colorVal = parseInt(data[key1] / range);
                    if (colorVal == 0) {
                        colorVal = Math.floor(Math.random() * 10);
                    }
                    return sentiment_colors[colorVal];
                });
            }
        });
    }


}