'use strict';

// モーダル
jQuery(function () {
    let scrollPos; // TOPからのスクロール位置

    jQuery('.contact-privacy-link').on('click', function () {
        scrollPos = jQuery(window).scrollTop(); // TOPからのスクロール位置を格納
        // wrapperSpeed: 1;にすることでモーダルを開いた際に起こるスクロールを防ぐ
        luxy.init({
            wrapperSpeed: 1
        });
        jQuery('.modal-wrap').fadeIn();
        jQuery('.modal').fadeIn();
        jQuery('body').addClass('fixed').css({ // 背景固定
            top: -scrollPos,
        });
        return false;
    });

    jQuery('.modal-wrap, .modal-close-btn').on('click', function () {
        // setTimeoutで遅らせることでモーダルを閉じる際に起こるスクロールをwrapperSpeed: 1;の状態行うことでスクロールしていないように見せる
        setTimeout(() => {
            luxy.init({
                wrapperSpeed: 0.08
            });
        }, 100)
        
        jQuery('.modal-wrap').fadeOut();
        jQuery('.modal').fadeOut();
        jQuery('body').removeClass('fixed').css({ // 背景固定解除
            top: 0
        });
        jQuery(window).scrollTop(scrollPos);//元の位置までスクロール
        return false;
    });
});

jQuery(function () {
    luxy.init({
        wrapperSpeed: 0.08 // スクロールスピードの初期値
    });
});

// プライバシーポリシーのチェックの処理
jQuery('.contact-privacy input[type="checkbox"]').on('click', function() {
    jQuery('.contact-privacy-part').toggleClass('no-check');
    jQuery('.contact-privacy-part').toggleClass('checked');
    return false;
});

// form
let $submit = $('#js-submit');
// お問い合わせフォームの必須項目を全て入力したら送信できる処理
jQuery('#js-form input, #js-form textarea').on('change', function() {
    if (
        // #js-formのtype="text"があるinputのvalueが空ではない時、且つ、
        $('#js-form input[type="text"]').val() !== "" &&
        // #js-formのtype="email"があるinputのvalueが空ではない時、且つ、
        $('#js-form input[type="email"]').val() !== "" &&
        // #js-formのname="your_text"があるtextareaのvalueが空ではない時、且つ、
        $('#js-form textarea[name="your_text"]').val() !== "" &&
        // #js-formのtype="checkbox"があるtextareaのvalueが空ではない時
        $('#js-form input[type="checkbox"]').prop('checked') === true
    ) {
        // 全ての必須項目が入力された時
        // disabled属性をfalseにする
        $submit.prop('disabled', false);
        $submit.addClass('-active'); 
    } else {
        // 必須項目が入力されていない時
        // disabled属性をtrueにする
        $submit.prop('disabled', true);
        $submit.removeClass('-active');
    }
});

jQuery(function () {
    // フッターの前で止まるtopへ戻るボタンの処理
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > 1000) {
            jQuery('.totop').removeClass('fadeOut');
            jQuery('.totop').addClass('fadeIn');
        } else {
            jQuery('.totop').removeClass('fadeIn');
            jQuery('.totop').addClass('fadeOut');
        }
        let scrollHeight = $(document).height(); //ドキュメントの高さ 
        let scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
        let footHeight = $('footer').innerHeight(); //footerの高さ（＝止めたい位置）
        const ua = navigator.userAgent;
        if (scrollHeight - scrollPosition <= footHeight - 200) { //ドキュメントの高さと現在地の差がfooterの高さ-200px以下になったら
            if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
                $(".totop").css({
                    "position": "fixed", //positionをabsolute（親：wrapperからの絶対値）に変更
                    "bottom": footHeight - 35, //下からfooterの高さ + 35px上げた位置に配置
                    "transition": "all 1.5s"
                });
            } else {
                $(".totop").css({
                    "position": "fixed", //positionをabsolute（親：wrapperからの絶対値）に変更
                    "bottom": footHeight - 60, //下からfooterの高さ + 60px上げた位置に配置
                    "transition": "all 1.5s"
                });
            }
        } else {
            if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
                $(".totop").css({
                    "position": "fixed", //固定表示
                    "bottom": "1.6rem" //下から16px上げた位置に
                });
            } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
                $(".totop").css({
                    "position": "fixed", //固定表示
                    "bottom": "3rem" //下から30px上げた位置に
                });
            } else {
                $(".totop").css({
                    "position": "fixed", //固定表示
                    "bottom": "6rem" //下から60px上げた位置に
                });
            }
        }
    });

    // topへ戻るボタンのhoverの処理
    jQuery('.totop').hover(
        //マウスオーバー時の処理
        function () {
            $(this).css({
                "transform": "translateY( -2rem )",
                "transition": "transform .4s"
            });
        },
        //マウスアウト時の処理
        function () {
            $(this).css({
                "transform": "translateY( 0 )",
                "transition": "transform .4s"
            });
        }
    );

    jQuery('.totop').on('click', function () {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

// スムーススクロール
jQuery('a[href^="#"]').on('click', function() {
    // #js-headerがついた要素の高さを取得
    // let header = jQuery('#js-header').innerHeight();
    // 移動速度を指定（ミリ秒）
    let speed = 500;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top; // - header;
    // ターゲットの位置までspeedの速度で移動
    jQuery("html, body").animate(
        {
            scrollTop: position
        },
        speed
    );
    return false;
});