var linkArr = {};
$(function () {
    readTextFile("links.json", function (text) {
        linkArr = JSON.parse(text);
        loadLinks(0);
    });

});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function loadLinks(eventId) {
    $('#linksContainer').html("");
    var arr = linkArr[eventId];
    arr.sort((a, b) => b.count - a.count)
    ;
    for (var j = 0; j < arr.length; j++) {
        var linkObj = arr[j];
        $('#linksContainer').append("<a class=\"tweet-link p5\" href=\"https://t.co/Lb1gvoKbkS\" target=\"_blank\">" + linkObj.url + "</a><div class=\"p5 fg f15\">" + linkObj.count + "</div>");
    }
}
