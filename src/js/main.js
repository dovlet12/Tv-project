// RESPONSIVE

// import scrollToElement = require("scroll-to-element");

// Breakpoints
const breakpoints = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 375,
};

// Media quires
const MQ = {
  wWidth: 0,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isXSM: false,
  updateState: function () {
    this.wWidth = $(window).width();

    for (let key in breakpoints) {
      this['is' + key.toUpperCase()] = this.wWidth <= breakpoints[key];
    }
  },
};

MQ.updateState();

$(document).ready(function () {
  //
});

$(window).on('load', function () {
  //
});

$(window).on('resize', function () {
  MQ.updateState();
});

// COMMON FUNCTIONS

// Popup opener
$('.js-popup').on('click', function (event) {
  event.preventDefault();
  let popupID = $(this).attr('href');

  mfpPopup(popupID);
});
// setTimeout(() => {
//   console.log($('#footer').offset().top);
// }, 1000);

$(document).on('scroll', (e) => {});

// $('.js-scroll').on('click', function (e) {
//   e.preventDefault();
//   const id = $(this).attr('href');
//   console.log(id);
//   // const el = $(`[data-id=${attr}]`);
//   const el = $(id);
//   console.log(el);

//   if (el.length) {
//     const position = el.offset().top;
//     console.log(position);
//     $('html').animate({ scrollTop: position }, 700);
//   }
// });

const jsCustomScroll = (element) => {
  scrollToElement(element, {
    offset: 0,
    ease: 'linear',
    duration: 100,
  });
};

const scrollToSection = () => {
  $('.js-scroll').on('click', function (e) {
    const id = $(this).attr('href');
    jsCustomScroll(id);
  });
};

scrollToSection();

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $('[data-target="hamburger"]').toggleClass('is-active');
  $('.menu').toggleClass('is-opened');
});

// Phone input mask
$('input[type="tel"]').inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
  autoUnmask: true,
});

// E-mail Ajax Send
$('form').on('submit', function (e) {
  e.preventDefault();

  let form = $(this);
  let formData = {};
  formData.data = {};

  // Serialize
  form.find('input, textarea').each(function () {
    let name = $(this).attr('name');
    let title = $(this).attr('data-name');
    let value = $(this).val();

    formData.data[name] = {
      title: title,
      value: value,
    };

    if (name === 'subject') {
      formData.subject = {
        value: value,
      };
      delete formData.data.subject;
    }
  });

  $.ajax({
    type: 'POST',
    url: 'mail/mail.php',
    dataType: 'json',
    data: formData,
  }).done(function (data) {
    if (data.status === 'success') {
      if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
        form.find('.form-result').addClass('form-result--success');
      } else {
        mfpPopup('#success');
      }

      setTimeout(function () {
        if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
          form.find('.form-result').removeClass('form-result--success');
        }
        $.magnificPopup.close();
        form.trigger('reset');
      }, 3000);
    } else {
      alert('Ajax result: ' + data.status);
    }
  });
  return false;
});

const mfpPopup = function (popupID, source) {
  // https://dimsemenov.com/plugins/magnific-popup/
  $.magnificPopup.open({
    items: { src: popupID },
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};
const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 100,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  effect: 'fade',
  autoplay: {
    delay: 5000,
  },
  setWrapperSize: false,
});

// $('.hamburger').on('click', function () {
//   $(this).toggleClass('is-active');
// });
