function toggleHamburger () {
  $('.hamburger').toggleClass('is-active');
}

$('.hamburger-button').on('click', function () {
  toggleHamburger();
});