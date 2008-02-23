/* Copyright (c) 2008 Andy Kent (andrew.d.kent@gmail.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 *
 * Requires: jQuery 1.2+
 *
 ****** CURRENTLY ONLY TESTED IN FF and Safari 3 *******
 */

(function($) {
	$.humanize = function(msg,options){
		if(typeof(msg)=='string') {
			var o = $.extend($.humanize.defaults, options||{});
			if($(o.baseSelector).length==0) $('body').append(o.container);
			$(o.baseSelector).html(msg);
		} else {
			var o = $.extend($.humanize.defaults, msg||{});
		};
		$(o.baseSelector).css('opacity',0)
		.animate({opacity:o.opacity},o.fadeIn);
		$(window).mousemove($.humanize.remove).click($.humanize.remove).keypress($.humanize.remove)
	};
	$.humanize.defaults = {
		baseSelector : '.feedback',
		container : '<p class="feedback">&nbsp;</p>',
		fadeIn : {easing:'swing', duration:1000},
		fadeOut : {easing:'swing', duration:1000},
		opacity : 0.8
	};
	$.humanize.mouseCatch = true; // a horrid hack for Safari because it triggers a mousemove event on refresh.
	$.humanize.remove = function(e) {
		if(e.type=='mousemove' && $.humanize.mouseCatch) {
			$.humanize.mouseCatch=false;
		 return
		} else {
			$.humanize.mouseCatch=true;
		}
		var o = $.humanize.defaults;
			$(o.baseSelector)
			.animate({opacity:0},o.fadeOut);
			$(window)
				.unbind('mousemove',$.humanize.remove)
				.unbind('click',$.humanize.remove)
				.unbind('keypress',$.humanize.remove)
	};
})(jQuery);