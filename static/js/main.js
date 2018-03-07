"use strict";
jQuery(document).on('ready', function () {
    /* -------------------------------------
            TITL EFFECT
    -------------------------------------- */
    var _tg_bannercontent = jQuery(".tg-homebanner .tg-bannercontent")
    _tg_bannercontent.tilt({
        perspective: 1000,
    });
    /* -------------------------------------
            SCROLL NAV
    -------------------------------------- */
    var body = jQuery('body');
    if (body.hasClass('tg-home')) {
        body.addClass("home");
        jQuery(window).on('scroll', function () {
            var scroll = jQuery(window).scrollTop();
            if (scroll >= 10) {
                jQuery("#tg-header").addClass("single-page-nav");
            } else {
                jQuery("#tg-header").removeClass("single-page-nav");
            }
        });
    }
    var _tg_navigation = jQuery('.tg-navigation');
    _tg_navigation.singlePageNav({
        updateHash: false,
        offset: 90,
        filter: ':not(.external)',
    });
    var _tg_btnscrolltop = jQuery("#tg-btnscrolltop");
    _tg_btnscrolltop.on('click', function () {
        var _scrollUp = jQuery('html, body');
        _scrollUp.animate({scrollTop: 0}, 'slow');
    })
    /* -------------------------------------
            HOME BANNER SLIDER
    -------------------------------------- */
    var _tg_homeslider = jQuery("#tg-homeslider")
    _tg_homeslider.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: false,
        navText: [
            '<i class="icon-chevron-left"></i><span>prev</span>',
            '<i class="icon-chevron-right"></i><span>next</span>',
        ],
        navClass: [
            'tg-btnprev',
            'tg-btnnext'
        ],
    });
    /*------------------------------------------
            SIDE NAVIGATION
    ------------------------------------------*/
    var _tg_btnopenclose = jQuery('.tg-btnopenclose');
    _tg_btnopenclose.on('click', function () {
        jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
        if (jQuery('#tg-wrapper').hasClass('tg-sidenavshow')) {
            jQuery('body').addClass('spread-overlay');
            return true;
        }
        jQuery('body').removeClass('spread-overlay');
    });
    var _tg_close = jQuery('.tg-close');
    _tg_close.on('click', function () {
        jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
        if (jQuery('#tg-wrapper').hasClass('tg-sidenavshow')) {
            jQuery('body').addClass('spread-overlay');
            return true;
        }
        jQuery('body').removeClass('spread-overlay');
    });
    /* -------------------------------------
            NEXT EVENT COUNTER
    -------------------------------------- */
    var _tg_upcomingeventcounter = jQuery('#tg-upcomingeventcounter');
    _tg_upcomingeventcounter.countdown('2018/04/08', function (event) {
        var $this = jQuery(this).html(event.strftime(''
            + '<div class="tg-eventcounter"><span>%-D</span><span>Días</span></div>'
            + '<div class="tg-eventcounter"><span>%H</span><span>Horas</span></div>'
            + '<div class="tg-eventcounter"><span>%M</span><span>Minutos</span></div>'
            + '<div class="tg-eventcounter"><span>%S</span><span>Segundos</span></div>'
        ));
    });
    /* -------------------------------------
            NEXT EVENT COUNTER
    -------------------------------------- */
    var _tg_upcomingeventcountervtwo = jQuery('#tg-upcomingeventcountervtwo');
    _tg_upcomingeventcountervtwo.countdown('2017/10/12', function (event) {
        var $this = jQuery(this).html(event.strftime(''
            + '<div class="tg-eventcounterholder"><div class="tg-eventcounter"><span>%-D</span><span> Days</span></div></div>'
            + '<div class="tg-eventcounterholder"><div class="tg-eventcounter"><span>%H</span><span>Hours</span></div></div>'
            + '<div class="tg-eventcounterholder"><div class="tg-eventcounter"><span>%M</span><span>Minutes</span></div></div>'
            + '<div class="tg-eventcounterholder"><div class="tg-eventcounter"><span>%S</span><span>Seconds</span></div></div>'
        ));
    });
    /* -------------------------------------
            TESTIMONIAL SLIDER
    -------------------------------------- */
    var _tg_testimonialslider = jQuery("#tg-testimonialslider")
    _tg_testimonialslider.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        animateIn: "fadeIn",
        autoplay: false
    });
    /* -------------------------------------
            TESTIMONIAL SLIDER
    -------------------------------------- */
    var _tg_eventspeakerslider = jQuery("#tg-eventspeakerslider")
    _tg_eventspeakerslider.owlCarousel({
        loop: true,
        nav: false,
        animateIn: "fadeIn",
        autoplay: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            }
        }
    });

    /* -------------------------------------
            THEME ACCORDION
    -------------------------------------- */
    function themeAccordion() {
        jQuery('.tg-panelcontent').hide();
        jQuery('.tg-accordion h4:first').addClass('active').next().slideDown('slow');
        jQuery('.tg-accordion h4').on('click', function () {
            if (jQuery(this).next().is(':hidden')) {
                jQuery('.tg-accordion h4').removeClass('active').next().slideUp('slow');
                jQuery(this).toggleClass('active').next().slideDown('slow');
            }
        });
    }

    themeAccordion();


    /* -------------------------------------
            TESTIMONIALS SLIDER
    -------------------------------------- */
    function testimonialSlider() {
        var sync1 = jQuery('.tg-galleryslider');
        var sync2 = jQuery('.tg-gallerthumbslider');
        var slidesPerPage = 1;
        var syncedSecondary = true;
        sync1.owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dots: false,
            autoplay: false,
            slideSpeed: 2000,
            responsiveRefreshRate: 200,
        }).on('changed.owl.carousel', syncPosition);
        sync2.on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
            .owlCarousel({
                items: slidesPerPage,
                dots: false,
                nav: true,
                smartSpeed: 200,
                slideSpeed: 500,
                slideBy: slidesPerPage,
                responsiveRefreshRate: 100,
                navText: [
                    '<i class="icon-chevron-left"></i><span>ant</span>',
                    '<i class="icon-chevron-right"></i><span>sig</span>',
                ],
                navClass: [
                    'tg-btnprev',
                    'tg-btnnext'
                ],
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);
            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }
            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current")
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();
            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = jQuery(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });
    }

    testimonialSlider();
    /* -------------------------------------
            PHOTO SWIPE
    -------------------------------------- */
    var initPhotoSwipeFromDOM = function (gallerySelector) {
        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes, numNodes = thumbElements.length, items = [], figureEl, linkEl, size,
                item;
            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i];
                if (figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if (figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML;
                }
                if (linkEl.children.length > 0) {
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl;
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function (el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if (!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode, childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length, nodeIndex = 0, index;
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }
                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };
        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};
            if (hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0], gallery, options, items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function (index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                }
            };
            if (fromURL) {
                if (options.galleryPIDs) {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if (isNaN(options.index)) {
                return;
            }
            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };
    initPhotoSwipeFromDOM('.my-gallery');
    /* -------------------------------------
            STICKY HEADER
    -------------------------------------- */
    jQuery(window).on('scroll', function () {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 900) {
            jQuery('.tg-header.tg-headervthree').addClass('tg-showheader');
        } else {
            jQuery('.tg-header.tg-headervthree').removeClass('tg-showheader');
        }
    });
    /* -------------------------------------
            PRETTY PHOTO GALLERY
    -------------------------------------- */
    jQuery("a[data-rel]").each(function () {
        jQuery(this).attr("rel", jQuery(this).data("rel"));
    });
    jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'normal',
        theme: 'dark_square',
        slideshow: 3000,
        autoplay_slideshow: false,
        social_tools: false
    });
    /* -------------------------------------
            THEME TOOLTIP
    -------------------------------------- */
    jQuery('[data-toggle="tooltip"]').tooltip()


    var map = new google.maps.Map(document.getElementById('maparutadelempedrado'), {
        center: {lat: -0.9338234, lng: -78.6126047},
        zoom: 16,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efe5d7"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efe5d7"
                    },
                    {
                        "lightness": "-4"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efe5d7"
                    },
                    {
                        "lightness": "-1"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efe5d7"
                    },
                    {
                        "lightness": "-6"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#dbdaf2"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "-5"
                    }
                ]
            }
        ]
    });
    var hidro = "static/images/mapa/hidro.png";
    var hidratacion1 = new google.maps.Marker({

        position: {lat: -0.937409, lng: -78.606136},
        map: map,
        icon: hidro
    });

    var hidratacion2 = new google.maps.Marker({

        position: {lat: -0.937030, lng: -78.614751},
        map: map,
        icon: hidro
    });

    var feria = "static/images/mapa/feria.png";
    var feria1 = new google.maps.Marker({

        position: {lat: -0.939633, lng: -78.606904},
        map: map,
        icon: feria
    });
    var feria2 = new google.maps.Marker({

        position: {lat: -0.931184, lng: -78.618310},
        map: map,
        icon: feria
    });


    var meta = "static/images/mapa/meta.png";
    var meta1 = new google.maps.Marker({
        position: {lat: -0.929554, lng: -78.611611},
        map: map,
        icon: meta
    });

    var ctaLayer = new google.maps.KmlLayer({
        url: 'http://xhaviero.com/ruta.kml',
        map: map
    });


  var $mainButton = jQuery(".main-button"),
                $closeButton = jQuery(".close-button"),
                $buttonWrapper = jQuery(".button-wrapper"),
                $ripple = jQuery(".ripple"),
                $layer = jQuery(".layered-content");

            $mainButton.on("click", function(){
                document.getElementById('pool').style.zIndex = 99;
                $buttonWrapper.addClass("clicked").delay(900).queue(function(next){
                    $layer.addClass("active");
                    next();
                });
            });

            $closeButton.on("click", function(){
                document.getElementById('pool').style.zIndex = -1;
                $layer.removeClass("active");
                $buttonWrapper.removeClass("clicked");
            });


function dia() {
            var dia = document.getElementById('dia').value;
            var fecha = mes + '/'+ dia+'/'+ano
            document.getElementById('fechaNacimiento').value = fecha

        }

        function mes() {
            var dia = document.getElementById('mes'').value;
             var fecha = mes + '/'+ dia+'/'+ano
            document.getElementById('fechaNacimiento').value = fecha
        }

        function ano() {
            var dia = document.getElementById('ano').value;
             var fecha = mes + '/'+ dia+'/'+ano
            document.getElementById('fechaNacimiento').value = fecha
        }

});
$("figure").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);