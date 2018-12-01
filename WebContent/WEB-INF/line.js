 function loadLine(){

    var margin = {top: 0, right: 20, bottom: 30, left: 50},
        width = 1000 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%d %b %Y %H:%M:%S");
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.count); });
    var svg = d3.select("#lineContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    d3.json("line.json", function(error, data) {
      if (error) throw error;
        data_with_peak = [];
        data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.count = d.count;
          if(!(d.peak == "")){
            data_with_peak.push(d);
          }
      });

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([d3.min(data, function(d) { return d.count-10; }), d3.max(data, function(d) { return d.count+10; })]);

      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("stroke","black")
          .attr("d", valueline);

      var entered_svg = svg.selectAll("dot")
         .data(data_with_peak)
         .enter();

      entered_svg.append("circle")
        .attr("r", 10)
        .attr("stroke","black")
        .attr("fill", "white")
        .attr("id", function(d, i) { return "#"+"event_peak_"+i; })
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.count); });

        for (var j = 0; j<data_with_peak.length; j++) {
            var id = "#"+"event_peak_"+j;
            console.log(d3.select(id));
            d3.selectAll(id)
            .on("click",function(){
                    console.log('d');
                    d3.select(this)
                        .style("opacity", 1)
                        .style("stroke","red")
                        .style("stroke-width",3);})
        }


      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      svg.append("g")
          .call(d3.axisLeft(y));

    });
}