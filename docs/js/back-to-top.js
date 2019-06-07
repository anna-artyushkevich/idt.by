$(document).ready(function(){
    // grab the initial top offset of the navigation
    var stickyNavTop = $('.header').position().top;
    // our function that decides weather the navigation bar should have "fixed" css position or not.
    var stickyNav = function(){
      var scrollTop = $(window).scrollTop(); // our current vertical position from the top
      // if we've scrolled more than the navigation, change its position to fixed to stick to top,
      // otherwise change it back to relative
      if (scrollTop > stickyNavTop) {
          $('.header').addClass('header-sticky');
      } else {
          $('.header').removeClass('header-sticky');
      }
    };

    $('.quote-slider').on('click', function (e) {
        var target = $(e.target);
        var parent = target.parents('.slider-item');
        if (parent.length) {
          var refIndex = parent.data("index");
          $('.slider-item').each(function () {
              $(this).removeClass('active');
          });
          $('.quote').each(function () {
              $(this).removeClass('active');
          });
  				parent.addClass("active");
          $(`.quote.quote-${refIndex}`).addClass("active");
        }
    });

    $('.quotes-arrow').on('click', function (e) {
        var target = $(e.target);
        var direction = target.data("direction");
        var currIndex = $('.slider-item.active').data("index");
        var itemAmount = $('.slider-item').length;
        var refIndex = undefined;
        var nextElement = undefined;

        if (direction === 'back') {
          refIndex = currIndex === 1 ? itemAmount : (currIndex - 1);
        } else {
          refIndex = currIndex === itemAmount ? 1 : (currIndex + 1);
        }
        $('.slider-item').each(function () {
            $(this).removeClass('active');
        });
        $('.quote').each(function () {
            $(this).removeClass('active');
        });
        $(`.slider-item.item-${refIndex}`).addClass("active");
        $(`.quote.quote-${refIndex}`).addClass("active");
    });

    stickyNav();
    $(window).scroll(function(){
        stickyNav();

        if ($(this).scrollTop() > 100) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });
    $('#backToTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

});
