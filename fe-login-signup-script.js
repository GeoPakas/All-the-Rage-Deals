jQuery(document).ready(function($){
	var $form_modal = $('.user-modal'),
		$form_login = $form_modal.find('#login'),
		$form_signup = $form_modal.find('#signup'),
		$form_modal_tab = $('.switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$login_nav = $('.login-nav');

	$login_nav.on('click', function(event){
		if( $(event.target).is($login_nav) ) {
			$(this).children('ul').toggleClass('is-visible');
		}else{
			$login_nav.children('ul').removeClass('is-visible');
			$form_modal.addClass('is-visible');

			( $(event.target).is('.signup') ) ? signup_selected() : login_selected();
		}
	});

	$('.user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
			$form_modal.removeClass('is-visible');
		}
	});

	$(document).keyup(function(event){
		if(event.which=='27'){
			$form_modal.removeClass('is-visible');
		}
	});

	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	$('.hide-password').on('click', function(){
		var $this = $(this),
			$password_field = $this.prev('input');

		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') :	$password_field.attr('type', 'password');	
		( 'Show' == $this.text() ) ? $this.text('Hide') : $this.text('Show');

		$password_field.putCursorAtEnd();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}
		

	//IE9 placeholder fallback
  	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  	if(!Modernizr.input.placeholder){
    	$('[placeholder]').focus(function() {
      		var input = $(this);
      		if (input.val() == input.attr('placeholder')) {
        		input.val('');
        	}
    	}).blur(function() {
      		var input = $(this);
        	if (input.val() == '' || input.val() == input.attr('placeholder')) {
        		input.val(input.attr('placeholder'));
        	}
    	}).blur();
    	$('[placeholder]').parents('form').submit(function() {
        	$(this).find('[placeholder]').each(function() {
        		var input = $(this);
        		if (input.val() == input.attr('placeholder')) {
          			input.val('');
        		}
        	})
    	});
  	}
});

//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
  	return this.each(function() {
      	// If this function exists...
      	if (this.setSelectionRange) {
          	// ... then use it (Doesn't work in IE)
          	// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
          	var len = $(this).val().length * 2;
          	this.setSelectionRange(len, len);
      	} else {
        	// ... otherwise replace the contents with itself
        	// (Doesn't work in Google Chrome)
          	$(this).val($(this).val());
      	}
  	});
};