var tweetArr = {};
$(function() {
	readTextFile("tweets.json", function(text){
		tweetArr = JSON.parse(text);
		loadTweets(0);
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


function loadTweets(eventId) {
	var sentiment = ['', 'anticipation', 'excited', 'bored', 'happy', 'surprised', 'enraged'];
	$('#tweetsListDiv').html("");
	var  arr =  tweetArr[eventId];
	for (var j = 0; j<arr.length; j++) {
		var tweetObj = arr[j];
		
		$('#tweetsListDiv').append("<div class=\"tweet " + sentiment[tweetObj.sentiment] + "\"><div class=\"tweet-top\"><div class=\"tweet-user-photo\"><a href=\"\" target=\"_blank\"><object data=\""
				+ tweetObj.profilePicURL + "\" type=\"image/png\"><img src=\"tweetprofile.jpg\"style=\"display: inline;\"></object></a></div><div class=\"tweet-body\"><div class=\"user-info\"><span class=\"name\">@" + tweetObj.userName
				+ "</span><span class=\"time\">"+ tweetObj.createdTime + "</span></div><div class=\"tweet-text\">"
				+ tweetObj.text + "</div></div></div>"
				);
	}
}
