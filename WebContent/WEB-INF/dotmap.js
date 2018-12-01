function loadDotMap(eventId) {
    $('#dotMapListDiv').html("");
    console.log("Dot Map Event ID: ", eventId);
    var sentiment_colors = ["#FEFDD1", "#FBE925", "#F6911F", "#1A61AF", "#612D91", "#E71E24"];
    var format = d3.format(",");
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 1000 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;
    var path = d3.geoPath();
    var svg = d3.select("#dotMapListDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "#4A4A4A");

    var projection = d3.geoMercator()
        .scale(130)
        .translate([width / 2, height / 1.5]);
    var path = d3.geoPath().projection(projection);
    queue()
        .defer(d3.json, "countries.geojson")
        .await(ready)

    function ready(error, data) {
        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("d", path)
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
        addDot(1);
    }

    function addDot(sentiment) {
        aa = [-122.490402, 37.786453];
        c = [45.099998, 15.200000].reverse();
        d = [46.227638, 2.213749].reverse();
        e = [41.871941, 12.567380].reverse();
        f = [51.165691, 10.451526].reverse();
        g = [40.712776, -74.005974].reverse();
        h = [41.878113, -87.629799].reverse();
        i = [13.082680, 80.270721].reverse();
        j = [12.971599, 77.594566].reverse();
        var x = svg.selectAll("circle")
            .data([aa, c, d, e, f, g, h, i, j]).enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection(d)[0];
            })
            .attr("cy", function (d) {
                return projection(d)[1];
            })
            .attr("r", "6px")
            .attr("fill", function (d, i) {
                return sentiment_colors[i % 5];
            })
    }

}