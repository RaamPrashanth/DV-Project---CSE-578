var arr = {};
$(function() {
	readTextFile("hashTag.json", function(text){
		arr = JSON.parse(text);
		loadHashtags(0);
	});

});

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

	console.log(arr);
	$('#hashTagsListDiv').html("");
	console.log($('#hashTagsListDiv'));
	console.log(arr);
	var  tagArr =  arr[eventId];
	tagArr.sort((a, b) => b.count-a.count);
	var max_val = tagArr[0].count;
	for (var j = 0; j<tagArr.length; j++) {
		var width = (tagArr[j].count/max_val)*200;
		console.log(width);
		$('#hashTagsListDiv').append('<div class=\"p5 fb\">'+ tagArr[j].tag+'</div><div class=\"blue\" style=\"width:'+width+'px\"></div><div class=\"p5 fg f15\">'+tagArr[j].count+'</div>');
	}
}

function sortByValue(jsObj){
    var sortedArray = [];
    for(var i in jsObj)
    {
        // Push each JSON Object entry in array by [value, key]
        sortedArray.push([jsObj[i], i]);
    }
    return sortedArray.sort();
}
var jsObj = {};
jsObj.e = "elephant";
jsObj.b = "ball";
jsObj.d = "dog";

var sortedbyValueJSONArray = sortByValue(jsObj);