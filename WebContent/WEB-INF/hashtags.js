var arr = {};
$(function() {
	readTextFile("hashTag.json", function(text){
		arr = JSON.parse(text);
		loadHashtags(0);
		loadDonut(0);
		loadStackedBar(0);
		loadLine();
		loadDotMap(0);
		loadCloud(0);
		loadChoroplethMap(0);
		loadLinks(0);
	});

});
function changeData(eventId){
        console.log("New data for eventId",eventId);
        loadHashtags(eventId);
		loadDonut(eventId);
		loadStackedBar(eventId);
		loadDotMap(eventId);
		loadCloud(eventId);
		loadChoroplethMap(eventId);
		loadTweets(eventId);
		loadLinks(eventId);
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function loadHashtags(eventId) {
	$('#hashTagsListDiv').html("");
	var  tagArr =  arr[eventId];
	tagArr.sort((a, b) => b.count-a.count);
	console.log(tagArr);
	var max_val = tagArr[0].count;
	for (var j = 0; j<tagArr.length; j++) {
		var width = (tagArr[j].count/max_val)*200;
		$('#hashTagsListDiv').append('<div class=\"p5 fb\">'+ tagArr[j].tag+'</div><div class=\"blue\" style=\"width:'+width+'px\"></div><div class=\"p5 fg f15\">'+tagArr[j].count+'</div>');
	}
}