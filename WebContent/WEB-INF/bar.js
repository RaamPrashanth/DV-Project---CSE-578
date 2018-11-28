var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
console.log($("#barChartContainer"));
/*var svg = $("#barChartContainer")
  .append("svg")
  	    .attr("width", width)
  	    .attr("height", height)
  .append("g")
  	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");*/
/*
d3.json("bar.json", function(data) {
    total = data["Total"];
    var data_sentiment = [];
    for (var key in total) {
        data_sentiment.push({country: key, sentiment1: total[key]["sentiment1"],
           sentiment2: total[key]["sentiment2"],
           sentiment3: total[key]["sentiment3"],
           sentiment4: total[key]["sentiment4"],
           sentiment5: total[key]["sentiment5"],
           sentiment6: total[key]["sentiment6"]});
    }
    var dataset = d3.layout.stack()
            (["sentiment1", "sentiment2", "sentiment3", "sentiment4", "sentiment5", "sentiment6"].map(function(sentiment) {
                return data_sentiment.map(function(c) {
                        return { x: c.country, y: +c[sentiment]};
            });
     }));

    var x = d3.scale.ordinal()
      .domain(dataset[0].map(function(d) { return d.x; }))
      .rangeRoundBands([10, width-10], 0.02);

    var y = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
      .range([height, 0]);

    var colors = ["#4AB847", "#FBE925", "#F6911F", "#1A61AF", "#612D91", "#E71E24"];

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat( function(d) { return d } );

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function(d) { return d } );

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);



    // Create groups for each series, rects for each segment
    var groups = svg.selectAll("g.cost")
      .data(dataset)
      .enter().append("g")
      .attr("class", "cost")
      .style("fill", function(d, i) { return colors[i]; });

    var rect = groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand())
      .on("mouseover", function() { tooltip.style("display", null); })
      .on("mouseout", function() { tooltip.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 15;
        var yPosition = d3.mouse(this)[1] - 25;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text(d.y);
      });


    // Draw legend
    var legend = svg.selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {return colors.slice().reverse()[i];});

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d, i) {
        switch (i) {
          case 0: return "Enraged";
          case 1: return "Anticipation";
          case 2: return "Surprised";
          case 3: return "Bored";
          case 4: return "Happy";
          case 5: return "Excited";
        }
      });


    // Prep the tooltip bits, initial display is hidden
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

*/


