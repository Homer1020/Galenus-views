// Función que dectecta si estás en movil
function isMovil() {
    let result = false;
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
        result = true;
    }

    return result;
}

$(function(){
    $('#site-nav').slicknav({
        label: '',
        appendTo: '.site-header'
    });

    $('.main-slider').slick({
        arrows: false,
        dots: true
    });

    $('.gallery-print__slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 8,
        slidesToScroll: 5,
        prevArrow: '<button class="prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button class="next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 8
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });

    $('.side-nav__item--drop').on('click', function(e) {
        e.preventDefault();

        $(e.target).toggleClass('active');

        $(e.target.parentElement.querySelector('.side-nav__dropdown')).slideToggle();
    });

    if(!isMovil()) {
        // No movil
        $('.card-team').hover(function() {
            $(this.querySelector('.card__text--clp')).slideToggle();
        });
    }else {
        // En movil
        $('.card-team .card__body').append('<div class="t-center"><button class="btn-show-clp btn t-uppercase btn--primary" style="padding: 1rem; margin-top: 1rem; font-size: 12px;">Mostrar</button></div>');
        $('.card-team').on('click', function(e) {
            const tg = $(e.target);
            $(e.target.parentElement.parentElement.querySelector('.card__text--clp')).slideToggle();
            tg.toggleClass('active');
            if(tg.hasClass('active')) {
                tg.text('Ocultar');
            }else {
                tg.text('Mostrar');
            }
        });
    }

    $('.gallery-print__slider').on('click', function(e) {
        e.preventDefault();
        if(matchMedia('(min-width: 768px)').matches) {

            const tg = $(e.target);

            if(tg.prop('tagName') === 'IMG') {
                const imgs = tg.parent().find('img');

                $('.gallery-print__view').html(`
                    <img src="${imgs[0].src}" alt="Página 1" />
                    <img src="${imgs[1].src}" alt="Página 2" />
                `);
            }
        }
    });


    var lightbox = new SimpleLightbox('.lightbox a', {
        nav: true,
        animationSpeed: 100,
        scrollZoom: false,
        captionSelector: 'self',
        captionType: 'title'
    });

    // Autores al inicio en responsive
    function authorInStart() {
        if(matchMedia('(max-width: 1200px)').matches) {
            $('.person-float').insertAfter('.card__body h2');
        }
    }

    authorInStart();
});

/* Dev */

/* Modal */
class Modal {
    constructor({ selector, toShowSelector }) {
        this.modal = document.querySelector(selector);
        this.toShowSelector = toShowSelector ? document.querySelector(toShowSelector) : null;
        this.bindEvents();
        this.events();
    }
    bindEvents() {
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBodyOverflow = this.setBodyOverflow.bind(this);
    }
    events() {
        if(this.toShowSelector) {
            this.toShowSelector.addEventListener('click', this.showModal);
        }
        this.modal.addEventListener('click', this.closeModal);
    }
    showModal(e) {
        if(e.target.classList.contains('calendar__action')) {
            const title = e.target.dataset.title || 'Hola mamá';
            const description = e.target.dataset.description || 'Una descripción cualquiera';
            const date = e.target.dataset.date || '00/00/00';

            this.modal.querySelector('.m-title').textContent = title;
            this.modal.querySelector('.m-desc').innerHTML = description;
            this.modal.querySelector('.m-date').textContent = date;

            this.modal.classList.add('show');
            this.setBodyOverflow();
        }
    }
    closeModal(e) {
        if(
            e.target.classList.contains('modal__overlay') || 
            e.target.parentElement.classList.contains('modal__close') ||
            e.target.classList.contains('modal__close')
        ) {
            this.modal.classList.remove('show');
            this.setBodyOverflow();
        }
    }
    setBodyOverflow() {
        if(this.modal.classList.contains('show')) {
            return document.body.style.overflow = 'hidden';
        }
        document.body.style.overflow = '';
    }
}

if(document.querySelector('#modal')) {
    new Modal({
        selector: '#modal',
        toShowSelector: '.calendar'
    });
}