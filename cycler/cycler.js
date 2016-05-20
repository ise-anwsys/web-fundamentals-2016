function isValidImage(url) {
    var regex = /^.*\.(jpg|gif|png|jpeg)$/i;
    return regex.test(url);
}
function patchImgur(param) {
    var result = param;
    if (param.indexOf("imgur.com") !== -1) {
        var parts = param.split("/");
        var imgurId = parts[parts.length - 1];
        result = "http://www.i.imgur.com/" + imgurId + ".jpg";
    }
    return result;
}
function refresh(subreddit) {
    $.ajax({
        type: "GET",
        url: "https://www.reddit.com/r/"+subreddit+".json",
    }).done(function (json, textStatus) {
        var posts = json.data.children;
        var randomIndex = Math.floor(Math.random() * posts.length);
        var el = posts[randomIndex].data;
        console.log(el); // Log random element for debugging
        $("#title").html('<a href="http://www.reddit.com' + el.permalink + '">Reddit: ' + el.title + "</a>");
        var url = patchImgur(el.url);
        if (isValidImage(url)) {
            console.log("Adding image...");
            $("#reddit").append('<a href="#"><img id="image"></a>');
            $("#image").attr("src", url).attr("alt", el.title).attr("width", 800);
        }

        $("#reddit > a").attr("href", url);
    });
}
$(document).ready(function () {
    var refreshIntervalId = 0;
    $("#start").click(function () {
		if(refreshIntervalId !== 0){
			clearInterval(refreshIntervalId);
			$("#source").fadeOut();
        	$("#image").fadeOut();
			$("#image").attr("src", "");
		}
        var refreshTime = $("#time").val();
        var subreddit = $("#subreddit").val();
        $("#source").fadeIn();
        $("#image").fadeIn();
        refresh(subreddit);
        refreshIntervalId = setInterval(function () {
            refresh(subreddit);
        }, refreshTime*1000);
    });

    $("#stop").click(function () {
        clearInterval(refreshIntervalId);
		refreshIntervalId = 0;
        $("#title").html("Stopped");
        $("#source").fadeOut();
        $("#image").fadeOut();
		$("#image").attr("src", "");	
    });

});
