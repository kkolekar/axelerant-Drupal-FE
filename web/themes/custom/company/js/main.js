(function($, Drupal){

  // Mobile sidebar toggle.
  $('.topnav a').click(function() {
    $('#sideNavigation').css('width','250px');
    $("#main").css('marginLeft','250px');
    $('body').addClass('overflow-hidden');
  });
  
  $('.closebtn').click(function() {
    $('#sideNavigation').css('width' , '0');
    $("#main").css('marginLeft',"0");
    $('body').removeClass('overflow-hidden');
  }); 
  
  Drupal.behaviors.maupulationDom = {
    attach: function (context, settings) {
      $('.service').append('<span class="scroll-down"><a href="#scroll-to">Scroll Down</a></span>')
      $('.service-cover').prepend('<h2 id="scroll-to">Our Success Stories</h2><br>'); 
      $('#scroll-to').prepend('<span id="scroll-to"></span>');  
    }
  }
})(jQuery, Drupal);
