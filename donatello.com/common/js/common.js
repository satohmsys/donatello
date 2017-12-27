

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
* back to top
*/

var $backtotop = $('.backToTop');

$w.on( 'scroll load resize', function( e ){
	if( 500 < $scrollVal ){
		$backtotop.fadeIn( 'fast' )
	} else {
		$backtotop.fadeOut( 'fast' )
	}
})

$backtotop.on('click', function(){
	$('body,html').stop(true,true).animate({
		scrollTop: 0,
	}, 500, 'swing');
})



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
	case 'works' :
		initForWorks();
		break;
	default: 
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


/**
* works
*/

function initForWorks(){
	var $slickTarget = $('.worksContents'),
		$slickAsNav = $('.worksNav .wrap'),
		$hash = location.hash.substr( 1, location.hash.length );

	if( $slickAsNav ){
		$slickAsNav.slick({
			// autoplay: false,
			asNavFor: '.worksContents',
			autoplay: false,
			arrows: false,
			dots: false,
			focusOnSelect: true,
			slidesToShow: 4,		
	    //      responsive: [{
	    //            breakpoint: 768,
	    //            settings: {
	    //            	adaptiveHeight: true,
	    //            	centerMode: true,
	    //            	centerPadding: "20px",
	    //            	slidesToShow: 2
	    //            	rows: 2,
	    //            	slidesToShow: 4,
					// slidesPerRow: 2
	    //            }
	    //       }]			
		});	
	}	
	if( $slickTarget ){
		$slickTarget.slick({
			asNavFor: '.worksNav .wrap',
			autoplay: false,
			arrows: false,
			dots: false,
			fade: true,
			slidesToShow: 1,
			slidesToMove: 1,
			speed: 600
		});	
		$slickTarget.on( 'beforeChange', function( e ){
			var $targetOffsetTop = $slickTarget.offset().top;
			$('body,html').animate({
				scrollTop: $targetOffsetTop
			}, 400 , 'swing')
		});
		$slickTarget.on( 'afterChange', function(){
			$.each( $slickAsNav, function(){
				$slick = $(this).find('.slick-slide');
				// $(this).slick('slickGoTo', $slickTarget.slick('slickCurrentSlide') );
				$slickAsNav.slick('slickGoTo', $slickTarget.slick('slickCurrentSlide') );
				$slick.removeClass('slick-current').eq( $slickTarget.slick('slickCurrentSlide') ).addClass('slick-current');				
			});
		});			
	}

	if( $hash !== 'undefined' || $hash == '' ){
		$.each( $slickAsNav.find('.worksNav_tab'), function(){
			$tab = $(this);
			$data = $tab.attr('data-tab');
			if( $data == $hash ){
				$tab.click();
				return false;
			}
		});
	}

}





