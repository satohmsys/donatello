﻿/**
* 設定
* @link http://falsandtru.github.io/pjax-api/api/pjax/config/
*/
new window['pjax-api'].Pjax({
    //読み込み箇所を指定
    config: {
        areas: [
            '#fetchContent'
        ],
        link: 'a[href]',
        fetch: {
            timeout: 3000,
            wait: 1000
        },
        // reload: '#fetchContent',
        update: {
            head: 'meta, link',
            css: true,
            script: true,
            ignore: '[href^="chrome-extension://"], [a href^="#"]',
            // reload: '',
            // logger: ''
        }
    }
});


// var $loadCount = 0,
//     $fetchCount = 0,
//     $unloadCount = 0,
//     $readyCount = 0;


/**
* イベント
* @link http://falsandtru.github.io/pjax-api/api/event/
*/

// 更新要求 ( window )
window.addEventListener( 'pjax:fetch', function( e ){
    // $fetchCount++;
    // writeDate( e, $fetchCount );    

    clickedPjaxPoint( 'pjaxLink', 'action')
    classSwitch( 'pjax-fetch', ['pjax-loaded'], true );    
});
 // 更新直前( window )
window.addEventListener( 'pjax:unload', function( e ){
    // $unloadCount++;
    // writeDate( e, $unloadCount );
    classSwitch( 'pjax-unload',[], false );
});
// img,iframe以外のDOM更新完了( document )
document.addEventListener( 'pjax:ready', function( e ){
    // $readyCount++;    

    // writeDate( e );
    classSwitch( 'pjax-ready', [], false );    
});
// img,iframe以外のDOM更新完了( document )
document.addEventListener( 'pjax:content', function( e ){

    // writeDate( e );
    classSwitch( 'pjax-content', [], false );    
});
// 全更新完了( window )
window.addEventListener( 'pjax:load', function( e ){
    // $loadCount++;
    // writeDate( e, $loadCount );
    classSwitch( 'pjax-loaded', [], false );

    // ga( 'send', 'pageview', window.location.pathname + window.location.search );    

    let $pageId = document.getElementById( 'fetchContent' ).getAttribute( 'data-content' ); 
    
});



/**
* 指定したクラスに付け替える
* @param addClassName { string } 付与したいクラス
* @param removeClassName { array } リセットしたいクラス
* @param reset { boolean } クラスのリセット
*/
function classSwitch( addClassName, removeClassName, reset ){
    var $target = document.getElementsByTagName('html').item(0);

    if(reset){ 
        // $target.classList='';
        $target.classList.forEach( function(e){ 
            if( /pjax/.test( e ) ){
                $target.classList.remove( e )            
            }
        })        
    }

    if( removeClassName.length ){
        removeClassName.forEach( function( index, e ){
            $target.classList.remove( e );
        });    
    }
 
    // $target.classList.remove('pjax-fetch','pjax-unload','pjax-ready','pjax-ready');
    
    $target.classList.add( addClassName ) ;
    // reset ? $target.classList='' : classList.add( classname ) ;
}



/**
* クリックしたpjaxクラスにイベント発生オブジェクト用の独自のクラスをつける
*/
var clickedPjaxPoint = function( pjaxClass, addClassName ){
    document.addEventListener( 'click', function( e ){
        var $target = e.target,
            $class = $target.classList;

        if( $class ){
            if( $class.contains( pjaxClass ) )  $target.classList.add( addClassName );
        } else {
            var $class = $target.getAttributes( 'class' );
            if( pjaxClass.test( $class ) )  $target.setAttributes( 'class', $class + ' ' + addClassName );
        }
    }, false );
}


/**
* console用 pjaxイベントをコンソールに表示
*/
function writeDate( e, count ){
    count++;
    var $d = new Date();
    console.log( '↓-----' + e.type + ' - ' + count + ' - ' + '(' + ($d.getMonth() + 1) +'月'+ $d.getDate() +'日'+ $d.getHours() +'時'+ $d.getMinutes() +'分'+ $d.getSeconds() +  ')-----↓' );
    console.log( e );   
}
