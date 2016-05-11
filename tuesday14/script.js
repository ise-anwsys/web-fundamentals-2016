$(document).ready(function () {    
    $('p').on({
        mouseenter: function () {
            //$(this).css("background-color", "#bada55");
            $(this).toggleClass("active white");
        },
        mouseleave: function () {
            //$(this).css("background-color", "#ffffff");
            $(this).toggleClass("active white");
        },
        click: function () {
            $(this).text("Hallo Welt!");
        }
    });
    $('button').click(function () {
       $('#surprise').toggle(1500);
    });
});