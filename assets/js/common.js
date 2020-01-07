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
        }

        //depth1 a click
        $gnb.find('>ul>li>a').on('click', function () {
            if ($(this).next().size() == 0) { //depth1 <a>만 있는 경우
                //console.log($(this).next().size());
                location.href = $(this).attr("href");
            } else { //depth2 <ul>도 있는 경우
                //console.log($(this).next().size());
                $(this).next().stop().slideToggle("fast").parent().toggleClass('on');
            }

            return false;
        });

        $dim.on('click', function () {
            $('btn_menu').click();
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
        slidesPerView: 3,
        freeMode: true,
    });
});