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
  Pace.once('hide', () => {
    $('.page-loading').hide();
    $('body').unbind('touchmove');
  });
  preventPinchZoom();
  $('body').bind('touchmove', function(e){e.preventDefault()});
  if (isMobile()) {
	$('.page-background').css('height', window.screen.height + 'px');
  } else {
	$('.page-background').css('min-height', '100%');
  }
  setAnimation();
  setMap();
  setPhotoGrid();
});


window.onload = function() {
  setTimeout(function() {
    $('.main-background').animate({backgroundColor:'rgba(0,0,0,0)'}, 2000, 'linear');
    $('.main-flower').animate({opacity: 0}, 2000, 'linear');
    $('.main-calendar, .main-name').animate({color:'rgba(0,0,0,1)'}, 2000, 'linear');
  }, 1000);
  //$('.lazyload').lazyload();
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
      center: new naver.maps.LatLng(37.4871272,127.0461243),
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
    position: new naver.maps.LatLng(37.4871272,127.0461243),
    map: map,
    animation: naver.maps.Animation.BOUNCE,
    icon: {
        content: '<div class="text-center" style="color:red;"><b style="background:white;padding:2px">마켓오 도곡점</b><br><img src="./img/heart.png" class="main-img"></div>',
        size: new naver.maps.Size(50, 82),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(50, 56)
    }
  });
}

var images = ["img_3044","img_2983", "img_2965",
	"img_3044","img_2983", "img_2965",
	"img_3044","img_2983", "img_2965"]

var prevOffset = 0;

function setPhotoGrid() {
	for ( var idx in images ) {
		var item = '<div class="photo-grid-item col-6 col-sm-6 col-md-4 col-lg-4">'
      +'<div class="photo-menu-wrapper">'
      +'<img class="lazyload" src="./photo/'+images[idx]+'_small.jpg" data-src="./photo/'+images[idx]+'.jpg"></div></div>';
    $('.photo-grid').append(item);
	}

	$('.photo-grid-item').click(photoClick);
	var $grid = $('.photo-grid').masonry( {
		itemSelector: '.photo-grid-item',
		columnWidth: '.col-6, .col-sm-6 .col-md-4, .col-lg-4',
		percentPosition: true,
		transitionDuration:800
	});
	$grid.imagesLoaded().done(() => {$grid.masonry('layout');});
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
    //$(object).find('.photo-menu-wrapper').animation('flipInY');
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

    var menu = ["<div class='photo-menu'>",
      '<div class="photo-menu-icon"><span class="oi oi-zoom-in" aria-hidden="true"></span></div>',
      "</div>"].join('');
    $(object).find('.photo-menu-wrapper').prepend(menu);
    var navigation = ["<div class='photo-navigation'>",
    '<button class="arrow left"><svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg></button>',
    '<button class="arrow right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg></button>',
      "</div>"].join('');
    $(object).append(navigation);

    $('.photo-menu').click(function(e) {
      window.open($('.photo-grid-item-big img').attr('data-src'), '_blank');
      //window.location.href = $('.photo-grid-item-big img').attr('src');
      e.stopPropagation();
    });

    $('.photo-navigation button').click(
      function(e) {
        $itemList = $('.photo-grid .photo-grid-item');
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
