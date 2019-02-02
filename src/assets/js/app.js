var navbarOffset = $('.navbar').offset().top;

$(window).scroll(function(){
  var navbar = $('.navbar'),
    headerMenu = $('.header_menu'),
    scroll = $(window).scrollTop();

  if (scroll >= navbarOffset){
    navbar.addClass('sticky');
    headerMenu.addClass('sticky_padded');
  }
  else {
    navbar.removeClass('sticky');
    headerMenu.removeClass('sticky_padded');
  }
});