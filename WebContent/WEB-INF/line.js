var prev = "";
var prevEventId = -1;

function loadLine() {
    console.log("Load Line");
    $('#lineContainer').html("");
    d3.json("line.json", function (error, data) {
        var margin = {top: 0, right: 20, bottom: 30, left: 50},
            width = 1000 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var parseTime = d3.timeParse("%d %b %Y %H:%M:%S");
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        var valueline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            });
        var svg = d3.select("#lineContainer")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        if (error) throw error;
        data_with_peak = [];
        data.forEach(function (d) {
            d.date = parseTime(d.date);
            d.count = d.count;
            if (!(d.peak == "")) {
                data_with_peak.push(d);
            }
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([d3.min(data, function (d) {
            return d.count - 10;
        }), d3.max(data, function (d) {
            return d.count + 10;
        })]);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("stroke", "black")
            .attr("d", valueline);

        var entered_svg = svg.selectAll("dot")
            .data(data_with_peak)
            .enter();

        entered_svg.append("circle")
            .attr("r", 10)
            .attr("stroke", "black")
            .attr("fill", "white")
            .style("stroke-width", 1)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.count);
            })
            .on("click", function (d, i) {
                if (prevEventId != i + 1) {
                    prevEventId = i + 1;
                    if (prev != "") {
                        prev.style("stroke", "black")
                            .style("stroke-width", 1);
                    }
                    prev = d3.select(this);
                    prev.style("stroke", "red")
                        .style("stroke-width", 3);
                    changeData(i + 1);
                }
            })

            .on("mouseover", function () {
                tooltip.style("display", null);
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.peak);
            });


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

    });
}