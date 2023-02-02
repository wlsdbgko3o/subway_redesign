$("document").ready(function(){
    
    const $nav = $(".header .nav ul");
    const $header = $(".header");
    const $submenu = $(".header .submenu");

    $nav.mouseover(function(){
        $submenu.addClass("on")
        $header.addClass("on")
    }).mouseout(function(){
        $submenu.removeClass("on")
        $header.removeClass("on")
    })

    $submenu.mouseover(function(){
        $submenu.addClass("on")
        $header.addClass("on")
    }).mouseout(function(){
        $submenu.removeClass("on")
        $header.removeClass("on")
    })


    const swiper = new Swiper(".main-slide",{
        loop:true,
        pagination:{
            el: ".swiper-pagination",
            type: "progressbar"
        }
    })
    if(swiper.slides.length - 2 > 9){
        $(".swiper-index span").eq(1).text((swiper.slides.length - 2));
    }else{
        $(".swiper-index span").eq(1).text("0"+(swiper.slides.length - 2));
    }


    swiper.on("slideChange", function(){
        console.log(swiper.realIndex, swiper.slides.length - 2)
        if(swiper.realIndex+1 > 9){
            $(".swiper-index span").eq(0).text((swiper.realIndex+1));
        }else{
            $(".swiper-index span").eq(0).text("0"+(swiper.realIndex+1));
        }
    })
    const swiper2 = new Swiper(".notice-swiper",{
        loop:true,
        // direction: "vertical", // 위아래
        navigation:{
            nextEl : ".btn-next",
            prevEl : ".btn-prev",
        }
    })
    const swiper3 = new Swiper(".popular-area",{
        loop:true,
        direction: "vertical", // 위아래
        autoplay:true
    })

    // event 배너 

    const $event_list = $(".event-list ul li");
    const $event_img = $(".event-img img");

    $("a").click(function(e){
        e.preventDefault();
    })

    $event_list.click(function(){
        let i = $(this).index()+2;
        $event_img.attr("src","images/event"+i+".png")
        
    })

// subway menu

    const $sub_menu_slide = $(".subway-menu-content .menu-content")
    const $sub_menu_nav = $(".subway-menu-content ul li")
    $sub_menu_slide.eq(0).show()
    $sub_menu_nav.eq(0).addClass("on")

    const swiper4 = new Swiper(".menu-content",{
        loop: false,
        // direction: "vertical", // 위아래
        slidesPerView: 2,
        spaceBetween: 10,
        grid:{
            rows: 2
        },
        breakpoints:{
            767:{
                loop: true,
                slidesPerView: 4,
                spaceBetween: 50,
                grid:{
                rows: 1
        }

            }
        },
        navigation:{
            nextEl : ".swiper-button-next",
            prevEl : ".swiper-button-prev",
        },
        // 슬라이더가 불러올 때마다 새로고침을 해주는 역할 > display:none > block 변경되었을때 먹통되는걸 방지
        observer: true,
        observeParents: true
    })


    $sub_menu_nav.click(function(){
        let i = $(this).index();
        $sub_menu_nav.removeClass("on").eq(i).addClass("on")
        $sub_menu_slide.hide().eq(i).show();
        swiper4[i].slideTo(0,100) // 원 위치로 돌아가는 코드
    })

// sns

    const $tab_nav = $(".subway-sns-content .content-wrap > ul li");
    const $tab_list = $(".subway-sns-content .tab-content");
    $tab_list.eq(0).show();
    $tab_nav.eq(0).addClass("on")
    let idx = 0;
    $tab_nav.click(function(){
        let i = $(this).index();
        $tab_list.hide().eq(i).show();
        $tab_nav.removeClass("on").eq(i).addClass("on")
        idx = i;

    })


    // mobile hamburger
    $(".hamburger i, .m-nav > i").click(function(){
        $(".m-nav").toggleClass("on")
})

    $(".tab-content a").click(function(e){
        $(".tab-content a").unbind();
    })

// event
    let myswiper = null;
    let ww = $(window).width();
    
    function initswiper(){
        if(ww < 751 && myswiper == null){
            myswiper = new Swiper(".event-img",{
                loop: true,
                pagination:{
                    el: ".swiper-pagination",
                    clickable: true
                }
            })
            // mobile
        }else if(ww > 750 && myswiper != null){
            myswiper.destroy();
            myswiper = null;
            // 태블릿
        }
    }

    let swiper5 = null;

    function initswiper2(){
        if(ww < 751 && swiper5 == null){
            swiper5 = new Swiper(".tab-content",{
                loop: true,
                navigation:{
                    nextEl : ".swiper-button-next",
                    prevEl : ".swiper-button-prev",
                },
                pagination:{
                    el: ".swiper-pagination",
                    clickable: true
                }
            })
            // mobile
        }else if(ww > 750 && swiper5 != null){
            swiper5[0].destroy();
            swiper5[1].destroy();
            swiper5[2].destroy();
            swiper5 = null;
            $tab_list.eq(idx).show()
            // 태블릿
        }
    }


    initswiper()
    initswiper2()
        $(window).resize(function(){
            ww = $(window).width();
            initswiper()
            initswiper2()
            console.log(ww)

        })
        // 햄버거
        let prev = -1;
        const $m_nav = $(".m-nav .menu > ul > li");

        $m_nav.click(function(){

            let i = $(this).index();
            const ul_height = $(this).find("ul li").length * 30+"px";
            
            $m_nav.removeClass("on")

            if(prev == i){
                $(this).removeClass("on")
                $m_nav.find("ul").css("height", "")
                prev = -1;
            }else{
                $(this).toggleClass("on")
                $m_nav.find("ul").css("height", "")
                $m_nav.eq(i).find("ul").css("height", ul_height)
                prev = i
            }


        
        })



})