var margin = {top: 0, right: 0, bottom: 20, left: 0};
var width = 650 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var colors = ["#4AB847", "#FBE925", "#F6911F", "#1A61AF", "#612D91", "#E71E24"];

function loadStackedBar(eventId){
    var svg = d3.select("#barChartContainer")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json("bar.json", function(data) {
        total = data[eventId];
        var data_sentiment = [];
        for (var key in total) {
            data_sentiment.push({
               country: key,
               sentiment1: total[key]["sentiment1"],
               sentiment2: total[key]["sentiment2"],
               sentiment3: total[key]["sentiment3"],
               sentiment4: total[key]["sentiment4"],
               sentiment5: total[key]["sentiment5"],
               sentiment6: total[key]["sentiment6"]});
        }
        var data_set = d3.stack()
            .keys(["sentiment1", "sentiment2", "sentiment3", "sentiment4", "sentiment5", "sentiment6"])
            .offset(d3.stackOffsetDiverging)(data_sentiment);

        var x = d3.scaleBand()
            .domain(data_set[0].map(function(d) {  return d.data.country; }))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);

        var y = d3.scaleLinear()
          .domain([d3.min(data_set, stackMin), d3.max(data_set, stackMax)])
          .rangeRound([height, 0]);


        var xAxis = d3.axisBottom(x)
          .tickFormat(function(d) {   return d } );

          var yAxis = d3.axisLeft(y)
                    .ticks(5)
                    .tickSize(width+100, 0, 0)
                    .tickFormat( function(d,i) { return d } );

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);


        var groups = svg.selectAll("g.cost")
          .data(data_set)
          .enter().append("g")
          .attr("class", "cost")
          .style("fill", function(d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
          .data(function(d) { return d; })
          .enter()
          .append("rect")
          .attr("x", function(d) { return x(d.data.country); })
          .attr("y", function(d, i) { return y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
          .attr("width", x.bandwidth())
          .on("mouseover", function() { tooltip.style("display", null); })
          .on("mouseout", function() { tooltip.style("display", "none"); })
          .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.y);
          });


        var legend = svg.selectAll(".legend")
          .data(colors)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(-100," + i * 19 + ")"; });

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


        function stackMin(serie) {
            return 0;
        }

        function stackMax(serie) {
            return d3.max(serie, function(d) { return d[1]; });
        }
    });

}