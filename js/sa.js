$.fn.extend({
    animateCss: function (animationName, offset) {
    	$(this).each(function(idx) {
        var obj = this;
        $(obj).waypoint(function(direction) {
      		if (direction == 'down') {
      			$(obj).animation(animationName)
      		}
      	}, { offset: offset});
      });
    },
    animation: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
        $(this).css('opacity', 1);
      });
    }
});




function isMobile() {
	var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
	for (var info in mobileInfo){
		if (navigator.userAgent.match(mobileInfo[info]) != null){
			return true;
		}
	}
	return false;
}

function preventPinchZoom() {
	document.documentElement.addEventListener('touchstart', function (event) {
		if (event.touches.length > 1) {
			event.preventDefault();
		}
	}, false);

	var lastTouchEnd = 0;
	document.documentElement.addEventListener('touchend', function (event) {
		var now = (new Date()).getTime();
		if (now - lastTouchEnd <= 300) {
			event.preventDefault();
		}
		lastTouchEnd = now;
	}, false);
}

$(document).ready(function()
{
  $('body').bind('touchmove', function(e){e.preventDefault()});

  Pace.once('hide', () => {
    $('.page-loading').hide();
    $('body').unbind('touchmove');
    loaded();
  });

  var script = window.location.search.substring(1);

  if (script === "")
	script = "wedding";

  var headTag = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.onload = function() {
    for (var text in contents)
      $('#'+text).append(contents[text]);

    setMap();
    setPhotoGrid();
  };
  newScript.src = './js/'+script+'.js';
  headTag.appendChild(newScript);

  preventPinchZoom();

  if (isMobile()) {
	   $('.page-background').css('height', window.screen.height + 'px');
  } else {
	   $('.page-background').css('min-height', '100%');
  }

  setAnimation();
});


function loaded() {

  setTimeout(function() {
    $('.main-background').animate({backgroundColor:'rgba(0,0,0,0)'}, 2000, 'linear');
    $('.main-flower').animate({opacity: 0}, 2000, 'linear');
    $('.main-calendar, .main-name').animate({color:'rgba(0,0,0,1)'}, 2000, 'linear');
  }, 1000);
    $('.lazyload').lazyload().on('load',function(){
    $('.photo-grid').masonry('layout');
  });
}

window.onload = loaded;


window.onbeforeunload = function() {
  $(window).scrollTop(0);
}

function setAnimation() {
  $('.invitation-img').animateCss('zoomIn', '100%');
  $('#invitation-title').animateCss('zoomIn', '100%');
  $('#invitation-text').animateCss('slideInUp', '100%');
  $('.invitation-table1').animateCss('slideInLeft', '100%');
  $('.invitation-table2').animateCss('slideInRight', '100%');
  $('.info-box').animateCss('jackInTheBox', '100%');
  $('.location-text-box').animateCss('fadeIn', '100%');
  $('.location-text-left').animateCss('slideInLeft', '100%');
  $('.location-text-right').animateCss('slideInRight', '100%');

}

function setMap() {
  var mapOptions = {
      center: new naver.maps.LatLng(lat,long),
      zoom: 12,
      draggable: false,
      pinchZoom: false,
      scrollWheel: false,
      keyboardShortcuts: false,
      disableDoubleTapZoom: true,
      disableDoubleClickZoom: true,
      disableTwoFingerTapZoom: true
  };

  var map = new naver.maps.Map('map', mapOptions);
  var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat,long),
    map: map,
    animation: naver.maps.Animation.BOUNCE,
    icon: {
        content: '<div class="text-center" style="color:red;"><b style="background:white;padding:2px">'+overlay_location+'</b><br><img src="https://i.imgur.com/4ruXDon.png" class="main-img"></div>',
        size: new naver.maps.Size(50, 82),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(50, 56)
    }
  });
}

var prevOffset = 0;

function setPhotoGrid() {
	for ( var idx in images ) {
		var item = '<div class="photo-grid-item col-6 col-sm-6 col-md-4 col-lg-4">'
      +'<div class="photo-menu-wrapper">'
      +'<img class="lazyload" data-src="'+images[idx]['small']+'"  data-origin-src="'+images[idx]['large']+'"></div></div>';
    $('.photo-grid').append(item);
	}

	$('.photo-grid-item').click(photoClick);
	var $grid = $('.photo-grid').masonry( {
		itemSelector: '.photo-grid-item',
		columnWidth: '.col-6, .col-sm-6 .col-md-4, .col-lg-4',
		percentPosition: true,
		transitionDuration:800
	});
}

function photoClick(){
  var object = $(this);
  var $grid = $('.photo-grid');
  $('.photo-grid-item').find('.photo-navigation, .photo-menu').remove();
  if ($(this).hasClass('photo-grid-item-big')) {
    $(this).removeClass('photo-grid-item-big');
    $('.photo-grid-item').removeClass('photo-grid-item-opacity');
    var offset = 0;
    if (window.innerHeight > $(object).height())
      offset = ($(object).height()/2) - (window.innerHeight/2)
    $("html, body").animate({
      scrollTop: prevOffset + offset
    }, 800);

    $('.photo-grid').masonry( {
      transitionDuration:800
    });
  } else {
    $('.photo-grid-item').removeClass('photo-grid-item-big');
    $('.photo-grid-item').addClass('photo-grid-item-opacity');
    $(this).addClass('photo-grid-item-big');
    $(this).removeClass('photo-grid-item-opacity');
    $('.photo-grid').masonry( {
      transitionDuration:0
    });

    var menu = [
      "<div class='photo-menu'>",
        '<div class="photo-menu-icon">',
        '<span class="oi oi-zoom-in" aria-hidden="true"></span></div>',
      "</div>"];
    $(object).find('.photo-menu-wrapper').prepend(menu.join(''));

    var navigation = [
      "<div class='photo-navigation'>",
        '<button class="arrow left"><svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg></button>',
        '<button class="arrow right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg></button>',
      "</div>"];
	var $itemList = $('.photo-grid .photo-grid-item');
	var len = $itemList.length;
	var itemIndex = $itemList.index($('.photo-grid-item-big'));

	if (itemIndex == 0) navigation.splice(1, 1);
	if (itemIndex == len-1) navigation.splice(2, 1);
    $(object).append(navigation.join(''));

    $('.photo-menu').click(function(e) {
      var src = $('.photo-grid-item-big img').attr('data-origin-src');
      src = encodeURIComponent(src);
      window.open("./photo_view.html?src="+src, '_blank');
      e.stopPropagation();
    });

    $('.photo-navigation button').click(
      function(e) {
        var $itemList = $('.photo-grid .photo-grid-item');
        var len = $itemList.length;
        var itemIndex = $itemList.index($('.photo-grid-item-big'));
        if ($(this).hasClass('left')) {
          itemIndex = itemIndex - 1;
          $('.photo-grid').data('event', 'left');
        }else if($(this).hasClass('right')) {
          itemIndex = itemIndex + 1;
          $('.photo-grid').data('event', 'right');
        }
        itemIndex %= len;
        $('.photo-grid .photo-grid-item:eq('+itemIndex+')').click();

        e.stopPropagation();
      }
    );

    $grid.one('layoutComplete', () => {
      prevOffset = $(object).offset().top;
      var i = $('.photo-grid .photo-grid-item').index(this);
      var max = 0;
      if (i == 0) max = $(this).offset().top;
      else {
        $('.photo-grid-item:lt('+i+')').each(function() {
          var offset = $(this).offset().top + $(this).height();
          if (max < offset) max = offset;
        });
      }
      var ev = $grid.data('event');
      var animationName = 'zoomIn';
      var scrollSpeed = 400;
      switch (ev) {
        case 'left': animationName = 'slideInLeft'; scrollSpeed = 0; break;
        case 'right': animationName = 'slideInRight'; scrollSpeed = 0; break;
      }
      $(object).find('.photo-menu-wrapper').animation(animationName);
      $("html, body").animate({scrollTop: max}, scrollSpeed);

      $grid.data('event', 'default');

    });
  }

  $('.photo-grid').masonry('layout');
}
