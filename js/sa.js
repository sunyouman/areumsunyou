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

$(document).ready(function()
{
  setTimeout(function() {
    $('.main-background').animate({backgroundColor:'rgba(0,0,0,0)'}, 2000, 'linear');
    $('.main-flower').animate({opacity: 0}, 2000, 'linear');
    $('.main-calendar, .main-name').animate({color:'rgba(0,0,0,1)'}, 2000, 'linear');
  }, 1000);
  if (isMobile()) {
    $('body, html').css('height',screen.availHeight + 'px');
    $(window).scroll(function() {
      var x = $(window).scrollTop();
      $('.page-main').css('background-position-y', x + 'px');
      $('.page-info').css('background-position-y', (x-$('.page-info').offset().top) + 'px');
      $('.page-location').css('background-position-y', (x-$('.page-location').offset().top) + 'px');
    });
  }
  setAnimation();
  setMap();
});

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
