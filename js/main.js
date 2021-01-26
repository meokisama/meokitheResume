(function ($) {

    "use stict";

    var position = $(window).scrollTop();

    stopAnimateOnScroll();
    setPrettyPhoto();
    placeholderToggle();
    setDataNumberForSections();
    setTotalPageNumber();
    setCircleSkills();
    setHorizontalSkills();
    setSlowScroll();
    setPortfolio();
    setActiveMenuItem();
    portfolioItemContentLoadOnClick();
    sendMail();


    $(window).on('load', function () {
        imageSliderSetUp();
        $('#toggle').on("click", multiClickFunctionStop);
        setMenu();
        setHash();
        $('.doc-loader').fadeOut();
    });

    $(window).on('resize', function () {
        setCircleSkills();
        setHorizontalSkills();
        setActiveMenuItem();
    });

    $(window).on('scroll', function () {
        setCircleSkills();
        setHorizontalSkills();
        setActiveMenuItem();
    });

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------

    function stopAnimateOnScroll() {
        $("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
            $("html, body").stop();
        });
    }

    function placeholderToggle() {
        $('input, textarea').on('focus', function () {
            $(this).data('placeholder', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        });
        $('input, textarea').on('blur', function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    }

    function setSlowScroll() {
        $('#header-main-menu ul li a[href^="#"], a.button, .slow-scroll').on("click", function (e) {
            if ($(this).attr('href') === '#')
            {
                e.preventDefault();
            } else {
                if ($(window).width() < 1360) {
                    if (!$(e.target).is('.sub-arrow')) {
                        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 1500);
                        $('body').removeClass("open done");
                        $('#toggle').removeClass('on');
                        return false;
                    }
                } else {
                    $('html, body').animate({scrollTop: $(this.hash).offset().top}, 1500);
                    return false;
                }
            }
        });
    }

    function setPortfolio() {
        var grid = $('.grid').imagesLoaded(function () {
            grid.isotope({
                percentPosition: true,
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
            $('.filters-button-group').on('click', '.button', function () {
                var filterValue = $(this).attr('data-filter');
                grid.isotope({filter: filterValue});
                grid.on('arrangeComplete', function () {
                    setPrettyPhoto();
                });
            });
            $('.button-group').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', '.button', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
            $(".category-filter").on('click', function () {
                $(this).toggleClass('filter-open');
                $(".category-filter-list").slideToggle("fast");
            });
        });
    }

    function setActiveMenuItem() {
        var currentSection = null;
        var c = $('.content-right .section.section-active').data("num");
        var scroll = $(window).scrollTop();
        $('.section').each(function () {
            var element = $(this).attr('id');
            if ($('#' + element).is('*')) {
                if ($(window).scrollTop() >= $('#' + element).offset().top - 150) {
                    currentSection = element;
                }
            }
        });
        $('#header-main-menu ul li').removeClass('current').find('a[href*="#' + currentSection + '"]').parent().addClass('current');
        $('.content-right .section').removeClass('section-active');
        $('#' + currentSection).addClass('section-active');

        if (c !== $('#' + currentSection).data("num")) {
            c = $('#' + currentSection).data("num");
            $('.current-num span').animate({"opacity": '0', "left": "-5px"}, 150, function () {
                $(this).text(c).animate({"opacity": '1', "left": "0"}, 150);
                $('.current-big-num').text(c).data("num");
            });
        }

        position = scroll;
    }

    function setTotalPageNumber() {
        $('.total-pages-num').html(('0' + $('.content-right .section').length).slice(-2));
    }

    function setDataNumberForSections() {
        var k = 1;
        $('.content-right .section').each(function () {
            $(this).data('num', ('0' + k).slice(-2));
            k++;
        });
    }

    function setCircleSkills() {
        $(".skill-circle-wrapper:not(.animation-done)").each(function () {
            $(this).circleProgress({
                value: $(this).data("value"),
                size: 254,
                fill: $(this).data("color"),
                startAngle: -Math.PI / 2,
                thickness: 45,
                emptyFill: $(this).data("empty-color"),
                reverse: true
            });
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('.skill-circle-num').html(Math.round(100 * stepValue.toFixed(2).substr(1)) + '%');
                });
                $(this).addClass('animation-done');
            }
        });
    }

    function setHorizontalSkills() {
        $(".skill-fill:not(.animation-done").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).width($(this).data("fill"));
                $(this).addClass('animation-done');
            }
        });
    }

    function setHash() {
        var hash = location.hash;
        if ((hash !== '') && ($(hash).length))
        {
            $('html, body').animate({scrollTop: $(hash).offset().top}, 1);
            $('html, body').animate({scrollTop: $(hash).offset().top}, 1);
        } else {
            $(window).scrollTop(1);
            $(window).scrollTop(0);
        }
    }

    function setMenu() {
        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8
        });
    }

    function imageSliderSetUp() {
        $(".image-slider").each(function () {
            var speed_value = $(this).data('speed');
            var auto_value = $(this).data('auto');
            var hover_pause = $(this).data('hover');
            if (auto_value === true) {
                $(this).owlCarousel({
                    loop: true,
                    autoHeight: true,
                    smartSpeed: 1000,
                    autoplay: auto_value,
                    autoplayHoverPause: hover_pause,
                    autoplayTimeout: speed_value,
                    responsiveClass: true,
                    items: 1
                });
                $(this).on('mouseleave', function () {
                    $(this).trigger('stop.owl.autoplay');
                    $(this).trigger('play.owl.autoplay', [auto_value]);
                });
            } else {
                $(this).owlCarousel({
                    loop: true,
                    autoHeight: true,
                    smartSpeed: 1000,
                    autoplay: false,
                    responsiveClass: true,
                    items: 1
                });
            }
        });
    }

    function setPrettyPhoto() {
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $(".grid-item:visible a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false,
            overlay_gallery: false,
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });
    }

    function multiClickFunctionStop(e) {
        e.preventDefault();
        $('#toggle').off("click");
        $('#toggle').toggleClass("on");
        $('body').toggleClass("open").delay(300).queue(function (next) {
            $(this).toggleClass("done");
            $('#toggle').on("click", multiClickFunctionStop);
            next();
        });
    }

    function portfolioItemContentLoadOnClick() {
        $('.ajax-portfolio').on('click', function (e) {
            e.preventDefault();
            var portfolioItemID = $(this).data('id');
            $(this).closest('.grid-item').addClass('portfolio-content-loading');
            $('#portfolio-grid').addClass('portfoio-items-mask');
            if ($("#pcw-" + portfolioItemID).length) {
                $('html, body').animate({scrollTop: $('#portfolio-wrapper').offset().top - 150}, 400);
                setTimeout(function () {
                    $('#portfolio-grid, .category-filter, .category-filter-list').addClass('hide');
                    setTimeout(function () {
                        $("#pcw-" + portfolioItemID).addClass('show');
                        $('.portfolio-load-content-holder').addClass('show');
                        $('.grid-item').removeClass('portfolio-content-loading');
                        $('#portfolio-grid, .category-filter').hide().removeClass('portfoio-items-mask');
                    }, 300);
                }, 500);
            } else {
                loadPortfolioItemContent(portfolioItemID);
            }
        });
    }

    function loadPortfolioItemContent(portfolioItemID) {
        $.ajax({
            url: $('.ajax-portfolio[data-id="' + portfolioItemID + '"]').attr('href'),
            type: 'GET',
            success: function (html) {
                var getPortfolioItemHtml = $(html).find(".portfolio-item-wrapper").html();
                $('.portfolio-load-content-holder').append('<div id="pcw-' + portfolioItemID + '" class="portfolio-content-wrapper">' + getPortfolioItemHtml + '</div>');
                if (!$("#pcw-" + portfolioItemID + " .close-icon").length) {
                    $("#pcw-" + portfolioItemID).prepend('<div class="close-icon"></div>');
                }
                $('html, body').animate({scrollTop: $('#portfolio-wrapper').offset().top - 150}, 400);
                setTimeout(function () {
                    $("#pcw-" + portfolioItemID).imagesLoaded(function () {
                        imageSliderSetUp();
                        setSlowScroll();
                        $('#portfolio-grid, .category-filter, .category-filter-list').addClass('hide');
                        setTimeout(function () {
                            $("#pcw-" + portfolioItemID).addClass('show');
                            $('.portfolio-load-content-holder').addClass('show');
                            $('.grid-item').removeClass('portfolio-content-loading');
                            $('#portfolio-grid').hide().removeClass('portfoio-items-mask');
                        }, 300);
                        $('.close-icon').on('click', function (e) {
                            var portfolioReturnItemID = $(this).closest('.portfolio-content-wrapper').attr("id").split("-")[1];
                            $('.portfolio-load-content-holder').addClass("viceversa");
                            $('#portfolio-grid, .category-filter').css('display', 'block');
                            setTimeout(function () {
                                $('#pcw-' + portfolioReturnItemID).removeClass('show');
                                $('.portfolio-load-content-holder').removeClass('viceversa show');
                                $('#portfolio-grid, .category-filter, .category-filter-list').removeClass('hide');
                            }, 300);
                            setTimeout(function () {
                                $('html, body').animate({scrollTop: $('#p-item-' + portfolioReturnItemID).offset().top - 150}, 400);
                            }, 500);
                        });
                    });
                }, 500);
            }
        });
        return false;
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    function sendMail() {
        $('.contact-form [type="submit"]').on('click', function () {

            var emailVal = $('#contact-email').val();

            if (isValidEmailAddress(emailVal)) {
                var params = {
                    'action': 'SendMessage',
                    'name': $('#name').val(),
                    'email': $('#contact-email').val(),
                    'subject': $('#subject').val(),
                    'message': $('#message').val()
                };
                $.ajax({
                    type: "POST",
                    url: "php/sendMail.php",
                    data: params,
                    success: function (response) {
                        if (response) {
                            var responseObj = $.parseJSON(response);
                            if (responseObj.ResponseData)
                            {
                                alert(responseObj.ResponseData);
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //xhr.status : 404, 303, 501...
                        var error = null;
                        switch (xhr.status)
                        {
                            case "301":
                                error = "Redirection Error!";
                                break;
                            case "307":
                                error = "Error, temporary server redirection!";
                                break;
                            case "400":
                                error = "Bad request!";
                                break;
                            case "404":
                                error = "Page not found!";
                                break;
                            case "500":
                                error = "Server is currently unavailable!";
                                break;
                            default:
                                error = "Unespected error, please try again later.";
                        }
                        if (error) {
                            alert(error);
                        }
                    }
                });
            } else {
                alert('Your email is not in valid format');
            }
        });
    }

})(jQuery);