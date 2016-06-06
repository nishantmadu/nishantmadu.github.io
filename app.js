$(document).ready(function() {
  $('#scroll_up').click(function() {
    $('html, body').animate(
      {scrollTop: 0}, 1000
    );
  });
});
