/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);


    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    // const doc = document.documentElement;
    // doc.setAttribute('data-useragent', navigator.userAgent);


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {
        $("#loader, #preloader").hide();
        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            window.scrollTo(0, 0);

            $("#loader, #preloader").hide();

        });
    };



   /* pretty print
    * -------------------------------------------------- */
    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };



   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const $hero = $('.s-hero'),
              $hdr = $('.s-header'),
              triggerHeight = $hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            let loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                $hdr.addClass('offset');
            } else {
                $hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                $hdr.addClass('scrolling');
            } else {
                $hdr.removeClass('scrolling');
            }

        });

    };



   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const $toggleButton = $('.s-header__menu-toggle');
        const $headerContent = $('.s-header__content');
        const $siteBody = $("body");

        $toggleButton.on('click', function(event){
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $siteBody.toggleClass('menu-is-open');
        });

        $headerContent.find('.s-header__nav a, .btn').on("click", function() {

            // at 900px and below
            if (window.matchMedia('(max-width: 900px)').matches) {
                $toggleButton.toggleClass('is-clicked');
                $siteBody.toggleClass('menu-is-open');
            }
        });

        $WIN.on('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
                if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
            }
        });

    };



   /* photoswipe
    * ----------------------------------------------------- */
    const ssPhotoswipe = function() {
        const items = [],
              $pswp = $('.pswp')[0],
              $folioItems = $('.folio-item');

        // get items
        $folioItems.each( function(i) {

            let $folio = $(this),
                $thumbLink =  $folio.find('.folio-item__thumb-link'),
                $title = $folio.find('.folio-item__title'),
                $caption = $folio.find('.folio-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            let item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).find('.folio-item__thumb-link').on('click', function(e) {
                e.preventDefault();
                
                // Find the index of the clicked item relative to all portfolio items
                let clickedIndex = $folioItems.index($(this).closest('.folio-item'));
                
                let options = {
                    index: clickedIndex,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };



   /* slick slider
    * ------------------------------------------------------ */
    const ssSlickSlider = function() {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonial-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

    };


   /* scroll reveal animations
    * ------------------------------------------------------ */
    const ssScrollReveal = function() {
        const $aosElements = $('[data-aos]');

        if (!$aosElements.length) return;

        $aosElements
            .removeAttr('data-aos')
            .removeAttr('data-aos-offset')
            .removeAttr('data-aos-easing')
            .removeAttr('data-aos-duration')
            .removeAttr('data-aos-delay')
            .removeClass('aos-init aos-animate')
            .css({
                opacity: '',
                visibility: '',
                transform: '',
                transition: ''
            });
    };



   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().hide();
        }); 

    };

    
   /* smooth scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            if ($target.length) {
                window.scrollTo(0, $target.offset().top);
            }
            window.location.hash = target;
        });

    };


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow = 800;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };



   /* EmailJS contact form
    * ------------------------------------------------------ */
    const ssEmailJS = function() {

        const contactForm = document.getElementById('contactForm');
        const contactStatus = document.getElementById('contactFormStatus');

        if (!contactForm || !contactStatus || typeof emailjs === 'undefined') return;

        const EMAILJS_SERVICE_ID = "service_15ofg9r";
        const EMAILJS_TEMPLATE_ID = "template_5dxi081";
        const EMAILJS_PUBLIC_KEY = "Ql9fdB8-80sRNy095";

        emailjs.init(EMAILJS_PUBLIC_KEY);

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const btn = contactForm.querySelector('button[type="submit"]');
            const params = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                message: document.getElementById('contactMessage').value
            };

            console.log('EmailJS params:', params);

            if (btn) {
                btn.innerText = 'Sending...';
                btn.disabled = true;
            }

            contactStatus.className = 'contact-form__status';
            contactStatus.textContent = 'Sending message...';

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
                .then(function() {
                    contactStatus.className = 'contact-form__status contact-form__status--success';
                    contactStatus.textContent = 'Message sent! Thank you – we will be in touch soon.';
                    contactForm.reset();
                    if (btn) {
                        btn.innerText = 'Message Sent!';
                        btn.disabled = false;
                    }
                }, function(error) {
                    const errorMessage = error?.text || error?.statusText || error?.message || JSON.stringify(error);
                    contactStatus.className = 'contact-form__status contact-form__status--error';
                    contactStatus.textContent = 'Failed to send message. ' + errorMessage;
                    console.error('EmailJS error:', error);
                    if (btn) {
                        btn.innerText = 'Failed. Try Again.';
                        btn.disabled = false;
                    }
                });

            return false;
        });
    };

   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssPhotoswipe();
        ssSlickSlider();
        ssScrollReveal();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
        ssEmailJS();

    })();

})(jQuery);
