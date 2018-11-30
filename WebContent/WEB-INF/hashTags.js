var arr = {};
$(function() {
//loadHashtags(0);
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
	var  obj =  arr[eventId];
	console.log(obj);
	var tags = obj.tags;
	var arrVal = obj.count;
	console.log(tags);
	console.log(arrVal);
	var max_val = arrVal[0];
	console.log(max_val);
	console.log(tags.length);
	for (var j = 0; j<tags.length; j++) {
		var width = (arrVal[j]/max_val)*200;
		console.log(width);
		$('#hashTagsListDiv').append('<div class=\"p5 fb\">'+ tags[j]+'</div><div class=\"blue\" style=\"width:'+width+'px\"></div><div class=\"p5 fg f15\">'+arrVal[j]+'</div>');
	}
}
