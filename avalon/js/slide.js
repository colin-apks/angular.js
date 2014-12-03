/*
 * slideControl - jQuery Plugin
 * version: 1.2 October 2012
 * @requires jQuery v1.6 or later
 *
 * Examples at http://nikorablin.com/slideControl
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($){
	 $.fn.slideControl = function(options) {
		
		// defaults
		var defaults = {
			speed: 400,
			lowerBound: 1,
			upperBound: 10,
            total:230,
            slideControlContainer:'.slideControlContainer',
            slideControlFill:'.slideControlFill',
            slideControlHandle:'.slideControlHandle'
		};

		var options = $.extend(defaults, options);
		
		return this.each(function() {
			
			// set vars
			var o = options;
			var controller = false;
			var position = 0;
			var obj = this;
			$(this).addClass('slideControlInput');
			var parent = $(this).parent();
			var label = $(parent).find('label');
			//parent.html("<label>" + $(label).html() + "</label><span class=\"slideControlContainer\"><span class=\"slideControlFill\" style=\"width:10%\"><span class=\"slideControlHandle\"></span></span></span>" + $(obj).wrap("<span></span>").parent().html());
			var container = parent.find(o.slideControlContainer);
			var fill = container.find(o.slideControlFill);
			var handle = fill.find(o.slideControlHandle);
			var input = parent.find('input');
			var containerWidth = container.outerWidth() + 1;
			var handleWidth = $(handle).outerWidth();
			var offset = $(container).offset();
			var animate = function(value){$(fill).animate({ width: value + "%"}, o.speed);}
			
			$(window).resize(function() {
				offset = $(container).offset();
			})
			
			//adds shadow class to handle for IE <9
			if (getInternetExplorerVersion() < 9 && getInternetExplorerVersion() > -1) {
				handle.addClass('ieShadow');
			}
			
			// when user clicks anywhere on the slider
			$(container).click(function(e) {		
				e.preventDefault();
				position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
				animate(position);
				$(input).val(parseInt(position/100* o.total));
			});
			
			// when user clicks handle
			$(handle).mousedown(function(e) {
				e.preventDefault();
				controller = true;
				$(document).mousemove(function(e) {
					e.preventDefault();
					position = checkBoundaries(Math.round(((e.pageX - offset.left + handleWidth/2)/containerWidth)*100));
					if (controller) {	
						$(fill).width(position + "%");
						$(input).val(parseInt(position/100* o.total));
					}
				});
				$(document).mouseup(function() {
					e.preventDefault();
					controller = false;
				});
			});
			
			// when user changes value in input

			
		});
		
		// checks if value is within boundaries
		function checkBoundaries(value) {
			if (value < options.lowerBound*10)
				return options.lowerBound*10;
			else if (value > options.upperBound*10)
				return options.upperBound*10;
			else
				return value;
		}
		
		// checks ie version
		function getInternetExplorerVersion(){
		   var rv = -1;
		   if (navigator.appName == 'Microsoft Internet Explorer') {
			  var ua = navigator.userAgent;
			  var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			  if (re.exec(ua) != null)
				 rv = parseFloat( RegExp.$1 );
		   }
		   return rv;
		}
		return this;
	 }
})(jQuery);
