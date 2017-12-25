/**
* scrollvalue
*/

var $w = $(window),
	$wH = $w.height(),
	$effectTarget = $('.ef'),
	$scrollVal = 0,
	$scrollOffset = $wH / 2;

$w.on( 'load scroll resize' , function( e ){
	
	if(! $effectTarget.length ) return;

	$scrollVal = $scrollOffset + $w.scrollTop();

	$.each( $effectTarget, function( e ){
		var $self = $( this ),
			$self_offsetTop = $self.offset().top;

		if( $self_offsetTop < $scrollVal ){
			$self.css({
				'transition-delay' : $self.data('delay') + 's'
			}).addClass( 'doEffect' );
		}
	});
})


/**
* index
*/

var $slickTarget = $('#topicsWrapper');

$slickTarget.slick({
	autoplay: true,
	arrows: false,
	dots: false,
	slidesToShow: 1,
	slidesToMove: 1

});



