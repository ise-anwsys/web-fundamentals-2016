$(document).ready(function () {
    var i = 0;
    var oldText = $("#id").text();
    $('#id').on('click', function () {
        if (i % 2  == 0) {
            $(this).text("Neuer Text!!!");
        } else {
            $(this).text(oldText);
        }
        i++;
    });
    $.ajax({
        url: 'https://www.reddit.com/r/earthporn.json',
        method: 'GET'
    }).done(function (json, textStatus) {
       var children = json.data.children;
       var randomIndex = Math.floor(Math.random() * children.length);
       var el = children[randomIndex].data;
       $("#title").html('<a href="http://www.reddit.com'+el.permalink+'">Reddit: '+el.title+"</a>");
       $('#reddit').append('<a><img src="'+el.url+'"></a>');
       $('#reddit > a').attr("href", el.url);
    });
});