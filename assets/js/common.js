$(document).ready(function () {
    var $gnb = $('#gnb');
    

    //메뉴열기 클릭
    $('.btn_menu').on('click', function () {

        if ($(this).hasClass('active')) {
            $gnb.stop().animate({
                left: '-100%'
            }, 300, function () {
                $(this).css({
                    visibility: 'hidden'
                }).find('ul.fold li.on').removeClass('on').children('ul').stop().slideUp();
            });
            $(this).removeClass('active').find('sr-only').text('메뉴 열기');
            $('#dim').stop().fadeOut(function () {
                $(this).remove();
            });
        } else { //열기
            $gnb.before('<div id="dim"></div>');
            var $dim = $('#dim');
            $dim.stop().fadeIn('slow');

            $(this).addClass('active').find('sr-only').text('메뉴 닫기');

            var $first = $gnb.find('[data-link="first"]');
            var $last = $gnb.find('[data-link="last"]');

            $gnb.css({
                visibility: 'visible'
            }).stop().animate({
                left: 0
            }, 300, function () {
                $first.focus(); //대상 엘리먼트에 포커스를 강제로 이동
            });

            //첫번째 a 태그에서 shift+tab을 눌러 header의 영역으로 포커스가 이동하지 못하게 제한
            $first.on('keydown', function (e) {
                console.log(e.keyCode); //tab을 클릭하면 9를 반환
                if (e.shiftKey && e.keyCode == 9) {
                    e.preventDefault(); //포커스 이동을 강제로 제한
                    $last.focus(); //처음 포커스로 이동, #gnbWrap을 벗어나지 않고 순환됨
                }
            });
            //마지막 버튼 태그에서 tab을 눌러 container의 영역으로 포커스가 이동하지 못하게 제한
            $last.on('keydown', function (e) {
                if (!e.shiftKey && e.keyCode == 9) {
                    e.preventDefault();
                    $('.btn_menu').focus();
                }
            });
            $dim.on('click', function () {
                $('.btn_menu').click();
            });
        }

        //depth1 a click
        $gnb.find('ul.fold>li>a').on('click', function () {
            if ($(this).next().size() == 0) { //depth1 <a>만 있는 경우
                //console.log($(this).next().size());
                location.href = $(this).attr("href");
            } else { //depth2 <ul>도 있는 경우
                //console.log($(this).next().size());
                $(this).next().stop().slideToggle("fast").parent().toggleClass('on');
            }

            return false;
        });

    });

    //search bar
    var $searchBtn = $('#search_btn');
    var $search = $('#headerSearch')

    $searchBtn.on('click', function (e) {
        $search.stop().slideDown(200).css({visibility: 'visible'});
    });
    $('#searchForm button').on('click', function (e) {
        $search.stop().slideUp(200);
    });
    $search.children('.search_close').on('click', function (e) {
        $search.stop().slideUp(200);
    });

    // swiper
    var bnrSwiper = new Swiper('.main_visual_bnr .swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
        pagination: {
            el: '.main_visual_bnr .swiper-pagination',
            type: 'fraction',
            clickable: true,
        },
    });
    var productSwiper = new Swiper('.main_bestsellor .swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
    });

    var brandSwiper = new Swiper('#aboutPuri .swiper-container', {
        pagination: {
            el: '.swiper-pagination.progresspg',
            type: 'progressbar',
        },
        pagination: {
            el: '.swiper-pagination.bulletpg',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    });

    var productSwiper = new Swiper('#skincare .swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
    });

    /* tab */
    //1) 로딩이 완료된후 초기화면 설정
    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
    $('.tab:first-of-type').attr('aria-selected', true);
    $('.tabpanel:first-of-type').attr('aria-hidden', false);

    /* 2) 탭버튼에서 키보드를 누르는 이벤트(keydown) - 키보드 제어*/
    $('.tab').on('keydown', function (e) {
        var key = e.keyCode;
        console.log(key); //왼쪽방향키 37 , 오른쪽 방향키 39, 스페이스바 32 , 엔터 13
        switch (key) {
        case 37:    //왼쪽 방향키
            $(this).attr('tabIndex', -1);
            if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
            else $(this).prev().attr('tabIndex', 0).focus();
            break;
        case 39:  //오른쪽 방향키
            $(this) .attr('tabIndex', -1);
            if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
            else $(this).next().attr('tabIndex', 0).focus();
            break;
        case 36: //home
            e.preventDefault(); //기본기능 차단
            $(this).siblings('.first').attr('tabIndex', 0).focus();
            break;
        case 35: //end
            e.preventDefault(); //기본기능 차단
            $(this).siblings('.first').attr('tabIndex', 0).focus();
            break;
        case 32:  //스페이스바
        case 13:  //엔터
            var $tg = $(this);
            activeOn($tg);
            break;
        }
    });

    //3) 탭 클릭 이벤트
    $('.tab').on('click', function () {
        var $tg = $(this);
        activeOn($tg);
    });

    function activeOn($target) {
        $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
        $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
    }

    //sub pages
    var $brandTab = $('#brandTab .tabpanel ul li');
    var tabimgsize = $brandTab.find('img').outerHeight(true);
    console.log(tabimgsize);
    $brandTab.find('img').addClass('boxarea');
    
    $(window).on('resize', function () {
        if (tabimgsize > 133) $brandTab.hasClass('even').children('p').css({top: tabimgsize});

        if ($('#skincareItems .price').width() < 150) $('#skincareItems .price .dc').addClass('nonvisible');
        else $('#skincareItems .price .dc').removeClass('nonvisible');    
    });
});