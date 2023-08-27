$(function(){
  $('.global-footer__nav-title').on('click', function(){
    if( $(window).width() <= 767 ) {
      let $this = $(this);
      let $links = $this.next('.global-footer__nav-links');
      
      if( $this.hasClass('is-opened') ) {
        $links.addClass('is-closing');
        $this.removeClass('is-opened');
        $links.removeClass('is-opened');
        setTimeout(() => {
          $links.removeClass('is-closing is-active');
        }, 130);
      } else {
        $this.addClass('is-opened');
        $links.addClass('is-opened');
        setTimeout(() => {
          $links.addClass('is-active');
        }, 130);
      }
    }
  });

  const emailCheck = function(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
        return false;
    }else{
        return email;
    }
  } 
});