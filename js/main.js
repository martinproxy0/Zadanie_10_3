// globals
var carouselList = $("#carousel ul");

$(function() {
    initialize();
    runCarousel(); 
});

function initialize() {
    $('#btn-left').click(function(e) {
        e.preventDefault();
        carouselList.stop(true);
        moveSlideLeft();
        carouselList.css({marginLeft:-400});
        carouselList.animate({'marginLeft':0},1000);
    });
    $("#btn-right").click(function(e) {
        event.preventDefault();
        carouselList.stop(true);
        carouselList.animate({'marginLeft':-400},1000,moveSlideRight);
    });
}

function runCarousel() { 
    setInterval(function(){shiftSlide(-400,moveSlideRight);}, 4000);
}

function shiftSlide(direction,action) {
    carouselList.animate({'marginLeft':direction}, 1000, action);
}


function moveSlideRight() {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    carouselList.css({'marginLeft':0});
}

function moveSlideLeft() {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    firstItem.before(lastItem);
}
