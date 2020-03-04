$(function() {
  $(window).scroll(function() {
    $('.section-title').each(function() {
      var imagePos = $(this).offset().top

      var topOfWindow = $(window).scrollTop()
      if (imagePos < topOfWindow + 650) {
        $(this).addClass('fadeInLeft')
      }
    })
  })
  $(window).scroll(function() {
    $('.future__item, .ticket__form').each(function() {
      var imagePos = $(this).offset().top

      var topOfWindow = $(window).scrollTop()
      if (imagePos < topOfWindow + 650) {
        $(this).addClass('fadeInUp')
      }
    })
  })
})
