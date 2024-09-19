(function ($) {
  "use strict";

  /* Preloader Effect */
  var $window = $(window); 
	$window.on('load', function(){
		$(".udot_preloader").fadeOut(600);
	});

  /*==== one page menu  ====*/
  var top_offset = $(".one_page").height() + 0;
  $(".one_page .udot_menu .nav_scroll").onePageNav({
    currentClass: "current",
    changeHash: false,
    scrollSpeed: 1000,
    scrollOffset: top_offset,
    scrollThreshold: 0.5,
    filter: "",
    easing: "swing",
  });

  $(".nav_scroll > li:first-child").addClass("current");
  /* sticky nav */
  $(".one_page").scrollToFixed({
    udoted: function () {
      $(this).find(".scroll_fixed").addClass("udot");
    },
    postFixed: function () {
      $(this).find(".scroll_fixed").addClass("postfix").removeClass("udot");
    },
  });

  /* transprent menu */
  var headers1 = $(".udt_nav_area");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 200) {
      headers1.addClass("sticky-nav");
    } else {
      headers1.removeClass("sticky-nav");
    }
  });

  /*==== Mobile Menu  ====*/
  $(".mobile-menu nav").meanmenu({
    meanScreenWidth: "990",
    meanMenuContainer: ".mobile-menu",
    onePage: true,
  });

  /*==== Popup mobile menu  ====*/
  var mrightma = $(".mobile_menu_o i.openclass");
  var mrightmi = $(".mobile_menu_o i.closeclass");
  var mrightmir = $(".mobile_menu_inner");
  var mobile_ov = $(".mobile_overlay");
  mrightma.on("click", function () {
    mrightmir.addClass("tx-s-open");
    mobile_ov.addClass("mactive");
  });
  mrightmi.on("click", function () {
    mrightmir.removeClass("tx-s-open");
    mobile_ov.removeClass("mactive");
  });

  /*==== WOW active js ====*/
  new WOW().init();

  /*==== ScrollUp  ====*/
  $.scrollUp({
    scrollText: '<i class="icofont-thin-up"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
  });

  /*==== Testimonial active ====*/
  $(".test_active").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /*==== Blog active ====*/
  var udotbslick = $(".blog_active");
  if (udotbslick.length > 0) {
    udotbslick.slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 2000,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  /*==== Project isotop ====*/
  $(".project_active").imagesLoaded(function () {
    if ($.fn.isotope) {
      var $project = $(".project_active");

      $project.isotope({
        itemSelector: ".single-udot-project",

        filter: "*",

        resizesContainer: true,

        layoutMode: "masonry",

        transitionDuration: "0.8s",
      });

      $(".filter_menu li").on("click", function () {
        $(".filter_menu li").removeClass("current_menu_item");

        $(this).addClass("current_menu_item");

        var selector = $(this).attr("data-filter");

        $project.isotope({
          filter: selector,
        });
      });
    }
  });

  /*==== Project popup ====*/
  Fancybox.bind("[data-fancybox]", {});

  /*==== Countdown  ====*/
  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<span class="cdowns days"><span class="time-counts">%-D</span> <p>Days</p></span> <span class="cdowns hour"><span class="time-counts">%-H</span> <p>Hour</p></span> <span class="cdowns minutes"><span class="time-counts">%M</span> <p>Min</p></span> <span class="cdowns second"> <span><span class="time-counts">%S</span> <p>Sec</p></span>'
        )
      );
    });
  });

  /*==== counter active ====*/
  $(".counter").counterUp({
    delay: 20,
    time: 3000,
  });
})(jQuery);
