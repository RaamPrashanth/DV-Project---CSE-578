function loadDonut(eventId){
    $('#donutContainer').html("");
    d3.json("donut.json", function(d1) {
        console.log("Donut chart: Event ID",eventId);
        var colors = ["#4AB847", "#FBE925", "#F6911F", "#1A61AF", "#612D91", "#E71E24"];
        var sentiments = ["Excited", "Happy", "Bored", "Surprised", "Anticipation", "Enraged"]
        var width = document.getElementById('donutContainer').offsetWidth +20 ,
            height = 200 ,
            radius = 75;
        var data = []
        for (var key in d1[eventId]) {
            data.push(d1[eventId][key]);
        }
    	var arc = d3.arc()
        	.outerRadius(radius)
        	.innerRadius(40);
    	var pie = d3.pie()
    	    .value(function(d) {
    	        return d;
    	    });
    	var svg = d3.select('#donutContainer').append("svg")
    	    .attr("width", width)
    	    .attr("height", height)
    	    .append("g")
    	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter().append("g");

       	g.append("path")
        	.attr("d", arc)
          .style("fill", function(d,i) {
          	return colors[i];
          });
        g.append("text")
        	.attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] *= 1.5;
            _d[1] *= 1.5;
            return "translate(" + _d + ")";
          })
          .attr("dy", ".50em")
          .style("text-anchor", "middle")
          .text(function(d, i) {
            return sentiments[i];
          });

    });


}