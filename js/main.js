// globals
var carouselList = $('#carousel ul');
var sliderNavPoints = $('.slider-nav-point');
var sliderNavPointsArray = [];
    sliderNavPoints.each(function (index) {
        sliderNavPointsArray[index] = sliderNavPoints[index].outerHTML;
      });
var sliderNav = $('#slider-nav');
var intervalId = 0;


$(function() {
    initialize();
    runCarousel(); 
});

function initialize() {
    $('#btn-left').click(function(e) {
        e.preventDefault();
        carouselList.stop(true);
        shiftSlide(400,moveSlideLeft);
    });
    $('#btn-right').click(function(e) {
        event.preventDefault();
        carouselList.stop(true,true);
        shiftSlide(-400,moveSlideRight);
    });
    addSliderNavListener();
    $('#carousel').mouseenter(function () { clearInterval(intervalId); });
    $('#carousel').mouseleave(function () { runCarousel(); });
}

function addSliderNavListener () {
    $('.slider-nav-point').click(function() {changeSlideFromNav($(this));});
}

function changeSlideFromNav(e) {
    var chosen = e.index();
    var active = $('.slider-nav-point i').index($('.fa-circle'));
    var margineValue = 0;

    if (chosen > -1) {

        if (active < chosen) {
            for (let i = 0; i < chosen - active ; i++) {
                moveSlideRight();       
            }
            margineValue = 400*(chosen - active);
            carouselList.css({'marginLeft':margineValue});
            shiftSlide(0);
        } 
        if (active > chosen) {
            for (let i = 0; i < (active - chosen); i++) {
                moveSlideLeft();
            }
            margineValue = -400*(active - chosen);
            carouselList.css({'marginLeft':margineValue});
            shiftSlide(0);

        }
    }
}

function runCarousel() { 
    //intervalId = setInterval(function(){shiftSlide(-400,moveSlideRight);}, 4000);
}

function shiftSlide(direction,action) {
    carouselList.animate({'marginLeft':direction}, 1000, action);
}


function moveSlideRight() {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    resetCarouselMargin();
    sliderNavPointRight();
}

function moveSlideLeft() {
    var firstItem = carouselList.find("li:first");
    var lastItem = carouselList.find("li:last");
    firstItem.before(lastItem);
    resetCarouselMargin();
    sliderNavPointLeft();
}

function resetCarouselMargin() {
    carouselList.css({'marginLeft':0});
}

function sliderNavPointLeft() {
    sliderNavPointsArray.push(sliderNavPointsArray.shift());
    sliderNav.html(sliderNavPointsArray);
    addSliderNavListener();  
}

function sliderNavPointRight() {
    sliderNavPointsArray.unshift(sliderNavPointsArray.pop());
    sliderNav.html(sliderNavPointsArray);
    addSliderNavListener();
}