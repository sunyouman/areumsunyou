$.fn.extend({
    animateCss: function (animationName, offset) {
    	$(this).each(function(idx) {
        var obj = this;
        $(obj).waypoint(function(direction) {
      		if (direction == 'down') {
      			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      			$(obj).addClass('animated ' + animationName).one(animationEnd, function() {
      				$(obj).removeClass('animated ' + animationName);
      				$(obj).css('opacity', 1);
      			});
      		}
      	}, { offset: offset});
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
  preventPinchZoom();
  if (isMobile()) {
	$('.page-background').css('height', window.screen.height + 'px');
  } else {
	$('.page-background').css('min-height', '100%');
  }
  setAnimation();
  setMap();
});

window.onload = function() {
  $('.page-loading').hide();
  setTimeout(function() {
    $('.main-background').animate({backgroundColor:'rgba(0,0,0,0)'}, 2000, 'linear');
    $('.main-flower').animate({opacity: 0}, 2000, 'linear');
    $('.main-calendar, .main-name').animate({color:'rgba(0,0,0,1)'}, 2000, 'linear');
  }, 1000);
  setPhotoGrid();
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

var images = ["img_3044.jpg","img_2983.jpg", "img_2965.jpg", 
	"img_3044.jpg","img_2983.jpg", "img_2965.jpg", 
	"img_3044.jpg","img_2983.jpg", "img_2965.jpg"]

var prevOffset = 0;

function setPhotoGrid() { 
	for ( var idx in images ) {
		var item = '<div class="photo-grid-item col-6 col-sm-6 col-md-4 col-lg-4"><img class="lazyload" src="'+images[idx]+'"></div>';
		$('.photo-grid').append(item);
	}

	$('.photo-grid-item').click(function(){
		var object = $(this);
		if ($(this).hasClass('photo-grid-item-big') === true) {
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
				$("html, body").animate({
					scrollTop: max 
				}, 400);
			});
		}

		$('.photo-grid').masonry('layout');
	});
	var $grid = $('.photo-grid').masonry( {
		itemSelector: '.photo-grid-item',
		columnWidth: '.col-6, .col-sm-6 .col-md-4, .col-lg-4',
		percentPosition: true,
		transitionDuration:800
	});
	$grid.imagesLoaded().progress(() => {$grid.masonry('layout');});
}
