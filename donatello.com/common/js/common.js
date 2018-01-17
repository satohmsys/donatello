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
* loading
*/

var $loadingAnim = $('#loadingAnim');

$w.on( 'load', function(){
	setTimeout( function(){
		$('body').addClass( 'isLoaded' );
		$loadingAnim.on( 'transitionend', function(){
			$('body').addClass( 'loadingAnimEnd' );
				// $loadingAnim.remove();
		});
	}, 250 )
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
* scroll fade objects setting (fixed header and backtotop
*/
var $timer = true,
	$siteHeader = $('.siteHeader'),
	$backtotop = $('.backToTop');

$w.on( 'scroll load resize', function( e ){

	if( $timer ){
		$timer = false;
		setTimeout( function( e ){
			if( 300 < $scrollVal ){
				$siteHeader.addClass( 'scrolled' );
			} else {
				$siteHeader.removeClass( 'scrolled' );
			}
			
			if( 500 < $scrollVal ){
				$backtotop.fadeIn( 'fast' )
			} else {
				$backtotop.fadeOut( 'fast' )
			}

			$timer = true;
			return $timer;
		}, 400 );	
	}
});



/**
* canvas 
*/
let $cP = $('canvas.pattern'),
	$mainvisual = $('#city');

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
// if( $mainvisual ){
// 	let $ctx = $mainvisual[0].getContext('2d'),
// 		$canvas_width = $wW,
// 		$canvas_height = $wH,
// 		// $srcs = {
// 		// 	cityFront: './common/img/mainvisual-city-front.svg', 
// 		// 	cityBack: './common/img/mainvisual-city-behind.svg', 
// 		// 	cloud1: './common/img/mainvisual-cloud1.svg',
// 		// 	cloud2: './common/img/mainvisual-cloud2.svg',
// 		// 	cloud3: './common/img/mainvisual-cloud3.svg'
// 		// },
// 		$srcs = [
// 			'./common/img/mainvisual-city-front.svg', 
// 			'./common/img/mainvisual-city-behind.svg', 
// 			'./common/img/mainvisual-cloud-1.svg',
// 			'./common/img/mainvisual-cloud-2.svg',
// 			'./common/img/mainvisual-cloud-3.svg'
// 		],		
// 		$images = new Array(),
// 		$length = $srcs.length,
// 		$count = 0,
// 		$i = 0;


// 		canvasReset();
// 		loadImg();

// 		function canvasReset(){
// 			$ctx.clearRect( 0,0,$canvas_width, $canvas_height );
// 		}

// 		function loadImg(){
// 			for( var i=0; i<$length; i++){
// 				$images[i] = new Image();
// 				$images[i].onload = handleLoad;
// 				$images[i].src = $srcs[i];
// 			}

// 			function handleLoad(){
// 				console.log( $count )
// 				if( ++$count == $length ) draw();
// 			}
// 		}


// 		function draw(){
// 			console.log( $images)
// 			$ctx.drawImage( $images[0], 0, 0, 1449, 476 );
// 		}
// }



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

	///////// main visual
	var $buildings = $('.building'),
		$building_front = $('.building_front'),
		$building_behind = $('.building_behind'),
		$clouds = $('cloud'),
		// $cloud1 = $('.cloud_1'),
		// $cloud2 = $('.cloud_2'),
		// $cloud3 = $('.cloud_3'),
		$airplane = $('.airplane'),
		$area = $('#city'),
		$areaW = $area.outerWidth(),
		$areaH = $area.outerHeight(),
		$scrollVal = 0,
		$multiple = 3,
		$count= 1;

	makeRandomCloud();
	cloudMove();


	$w.on( 'scroll', function(){
		$scrollVal = $w.scrollTop();

		var $p = $wW < 768 ? 4 : 8;
		var $posX = $scrollVal / $wW * $p;

		$building_front.css({
			'transform': 'translateX(' + $posX + '%)'
		})
		$building_behind.css({
			'transform': 'translateX(' + $posX*0.5 + '%)'
		})
	});

	$airplane.on( 'animationend', function(){
		$airplane.toggleClass('RtoL');
	});

	function cloudMove(){
		var $target = $('.cloudWrapper'),
			$moveVal = 0.2,
			$move = ($count++) * $moveVal, 
			$randNum = Math.floor(Math.random() * 3 + 1),
			$moveVal = $move;

		$target.css({
			'transform': 'translateX(' + $move + 'px)'
		});
	
		requestAnimationFrame( cloudMove );
		
		if( $areaW * $multiple < $move ){
			$move = 0;
			$count = 0;
			cloneCloud( $target );
		}
	}

	function makeRandomCloud(){
		var $target = $('.cloud'),
			$clouds = $target.find('i'),
			$cloudWrapper = $('<div class="cloudWrapper"></div>');

		$.each($clouds, function(){
			$(this).removeClass();
		});
		for( var i=0; i<$multiple; i++ ){
			$clone = $target.clone();
			$clone.css({
				'width': '100%',
				'right': 100*i*0.95 + '%',
				'left': 'auto'
			});
			$cloudWrapper.append( $clone );
		}

		$.each( $cloudWrapper.find('i'), function(){
			var	$target = $(this),
				$randomNum = Math.floor( Math.random() * 3 + 1 ),
				$cls = 'cloud_'+$randomNum,
				$posX = Math.floor( Math.random() * 100 + 1 ),
				$posY = Math.floor( Math.random() * 90 + 5 ),
				$zindex = Math.floor( Math.random() * 5 + 1 );

			$target.addClass( $cls ).css({
				'bottom': $posY + '%',
				'right': $posX + '%',
				'z-index': $zindex
			});
		});

		$cloudWrapper.appendTo( '#city' );
	}

	function cloneCloud( $target ){
		var $cloud = $target.clone()
		
		$cloud.attr({'style': ''});
		$target.remove();
		$area.append( $cloud ).find( $target ).css({
			'right' : '105%'
		});
	}



	$.ajax({
		url: '/common/js/updates.json',
	}).done(function( data ){
		var $data = data,
			$topicsArea = $( '#topicsWrapper' );

		$.each( $data, function( $index, $topic ){
			var $wrapperDiv = $('<div class="update" />'),
				$parentHTML = $('<dl />'),
				$dateHTML,
				$textHTML,
				$appendHTML;

			$dateHTML = '<dt class="update_date">' + $topic.date + '</dt>';
			$textHTML = '<dd class="update_info">' + $topic.text + '</dd>';
			$parentHTML.html($dateHTML + $textHTML);

			if( $topic.url ){
				var $linkHTML = $('<a href="' + $topic.url + '"></a>');

				$appendHTML = $linkHTML.append( $parentHTML );;
			} else {
				$appendHTML = $parentHTML;
			}

			$topicsArea.append( $appendHTML[0] );
		});


		var $slickTarget = $('#topicsWrapper');
		if( $slickTarget ){
			$slickTarget.slick({
				// autoplay: false,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				dots: false,
				fade: true,
				slidesToShow: 1,
				slidesToMove: 1,
				speed: 400
			});	
		}
	}).fail( function( error ){
		$topicsArea.html('<<div class="update"><dt class="update_date">ERROR! Please reload own browser. To see Donatello company\'s news.</dt></div>')
		// console.error( error );
	});

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





