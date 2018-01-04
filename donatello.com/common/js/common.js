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
* canvas 
*/
let $cP = $('canvas.pattern');

if( $cP ){
	
	let $img = new Image();
	
	$img.src = '/common/img/hexagonal.svg?' + new Date().getTime();

	$img.addEventListener('load', function(){
		$.each( $cP, function( e ){
		
		let $canvas = $(this)[0];

		let $imgSize = 50,
			$ctx = $canvas.getContext('2d'),
			$imgArea = 70,
			$cw = $wW,
			$ch = $canvas.height,
			$dxStart = $dyStart = $imgSize / -2,
			$margin = ($imgArea - $imgSize) / 2,
			$patternTimesX = $wW / $imgSize * 2,
			$patternTimesY = $ch / $imgSize * 2;

		$ctx.scale( 2,2 );
		$canvas.width = $wW;
		$canvas.height = $(this).parent().outerHeight();

		for( var i=1;i<=$patternTimesY;i++){
			var $dy = i==1 ? $dyStart : $dyStart + ( ($imgSize + $margin) * (i - 1) );
			
			for( var j=1;j<=$patternTimesX;j++){
				var $dx = j==1 ? $dxStart : $dxStart + ( ($imgSize + $margin) * (j - 1) );
				$ctx.drawImage( $img, $dx, $dy, $imgSize, $imgSize );
			}
		}
	});
});



	// ctx.fill( path2d );
	// ctx.globalCompositeOperation = 'source-over';
	// ctx.save();


}



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





