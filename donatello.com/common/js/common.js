

/**
* scrollvalue
*/

var $w = $(window),
	$wH = $w.height(),
	$wW = $w.width(),
	$effectTarget = $('.ef'),
	$scrollVal = 0,
	$distance = 0,
	$scrollOffset = $wH / 1.1;

$w.on( 'load scroll resize' , function( e ){
	

	$scrollVal = $w.scrollTop();
	$wW = $w.width();

	if(! $effectTarget.length ) return;
	$distance = $scrollOffset + $scrollVal;

	$.each( $effectTarget, function( e ){
		var $self = $( this ),
			$self_offsetTop = $self.offset().top;

		if( $self_offsetTop < $distance ){
			$self.css({
				'transition-delay' : $self.data('delay') + 's'
			}).addClass( 'doEffect' );
		}
	});
});



/**
* navtoggle
*/

var $toggle = $('.navToggle');

$toggle.on( 'click', function( e ){
	e.stopPropagation();
	$body = $('body');

	if( $body.hasClass( 'navOpen' ) || 768 < $wW ){
		$body.removeClass( 'navOpen' )
	} else if(! $body.hasClass('navOpen') ) {
		$body.addClass( 'navOpen' );
	} else {
		$body.addClass( 'navOpen' );
	}
})



/**
* fixed header 
*/
var $timer = true,
	$siteHeader = $('.siteHeader');

$w.on( 'scroll', function( e ){

	if( $timer ){
		$timer = false;
		setTimeout( function( e ){
			if( 300 < $scrollVal ){
				$siteHeader.addClass( 'scrolled' );
			} else {
				$siteHeader.removeClass( 'scrolled' );
			}
			$timer = true;
			return $timer;
		}, 400 );	
	}
});


/**
* page scripts
*/

var $body = $('body'),
	$pageType = $body.attr('class');

switch( $pageType ){
	case 'index' :
		initForIndex();
		break;
	case 'about' :
		break;
}


/**
* index
*/

function initForIndex(){
	var $slickTarget = $('#topicsWrapper');

	if( $slickTarget ){
		$slickTarget.slick({
			// autoplay: false,
			autoplay: true,
			autoplaySpeed: 3500,
			arrows: false,
			dots: false,
			fade: true,
			slidesToShow: 1,
			slidesToMove: 1,
			speed: 250
		});	
	}
}



