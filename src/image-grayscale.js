/*!
 * Image Grayscale v1.0.0
 * Apply gray-scale effect to the images
 * Copyright 2013-2014 Nethru
 * Licensed under MIT (http://nethru.mit-license.org/)
 */

;( function($) {

	$.fn.imggrayscale = function( method ) {
		var _defaults = {
				svgTemplate: '<svg width="%w" height="%h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="grayscale"><feColorMatrix type="saturate" values="0" /></filter></defs><image x="0" y="0" width="%w" height="%h" xlink:href="%s" filter="url(#grayscale)"></image></svg>',
				hoverShowOrigin: false,
				hoverTransitionDuration: 1,
				onResize: null
			},

			slice = Array.prototype.slice,
			svgWidth = /%w/g,
			svgHeight = /%h/g,
			svgSrc = /%s/g,

			_isIE1011 = function() {
				// IE 10 only CSS properties
				var ie10Styles = [
					'msTouchAction',
					'msWrapFlow'];

				// IE 11 only CSS properties
				var ie11Styles = [
					'msTextCombineHorizontal'];

				var d = document;
				var b = d.body;
				var s = b.style;
				var brwoser = null;
				var property;

				// Tests IE10 properties
				for ( var i = 0; i < ie10Styles.length; i++ ) {
					property = ie10Styles[i];
					if ( s[property] != undefined ) {
						brwoser = "ie10";
					}
				}

				// Tests IE11 properties
				for ( var i = 0; i < ie11Styles.length; i++ ) {
					property = ie11Styles[i];
					if ( s[property] != undefined ) {
						brwoser = "ie11";
					}
				}

				return brwoser != null;
			},

			_grayscaleIe = function( imgObj ) {
				var settings = $(imgObj).data("imggrayscale"),
					template = settings.svgTemplate,
					imgW = imgObj.width+"px",
					imgH = imgObj.height+"px",
					src = imgObj.src;
				var svgObj = $(template.replace( svgWidth, imgW ).replace( svgHeight, imgH ).replace( svgSrc, src ));
				$(imgObj).replaceWith(svgObj);
			},

			methods = {

				init: function( options ) {
					var opts = $.extend( {}, _defaults, options );

					return this.each(function() {
						var $this = $(this),
							settings = {};

						if (opts.onResize) {
							$this.on("resize.imggrayscale", opts.onResize);
						}

						settings = $.extend({}, opts);
						$this.data("imggrayscale", settings);

						if ( !$this.hasClass("imggrayscale") ) {
							$this.addClass("imggrayscale");
							if ( settings.hoverShowOrigin ) {
								$this.css({
									"-webkit-transition": "-webkit-all "+settings.hoverTransitionDuration+"s ease-out",
									"-moz-transition": "-moz-all "+settings.hoverTransitionDuration+"s ease-out",
									"-ms-transition": "-ms-all "+settings.hoverTransitionDuration+"s ease-out",
									"-o-transition": "-o-all "+settings.hoverTransitionDuration+"s ease-out",
									"transition": "all "+settings.hoverTransitionDuration+"s ease-out"
								}).hover(
									function () {
										$(this).stop().addClass("hover");
									},
									function () {
										$(this).stop().removeClass("hover");
									}
								);
							}
						}

						if ( _isIE1011() ) {
							$this.one('load', function() {
								var imgObj = $(this);
								imgObj.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone(true)
									.addClass('img_grayscale ieImage').css({"position":"absolute","z-index":"5","opacity":"0"})
									.insertBefore(imgObj).queue(function(){
										var el = $(this);
										var width = this.width;
										var height = this.height;
										el.parent().css({"width":width,"height":height});
										if ( settings.hoverShowOrigin ) {
											// Quick animation on IE10+
											el.hover(
												function () {
													$(this).parent().find('img:first').stop().animate({opacity:1}, settings.hoverTransitionDuration);
												},
												function () {
													$('.img_grayscale').stop().animate({opacity:0}, settings.hoverTransitionDuration);
												}
											);
										}
										el.dequeue();
										_grayscaleIe(imgObj[0]);
								});
							})
							.each(function(){
								if (this.complete) $(this).load();
							});
						}
					});
				},

				resize: function() {
					return this.each(function() {
						var $this = $(this),
							settings = $this.data("imggrayscale");

						if ( !settings ) {
							return true;
						}

						// resize here
						if ( _isIE1011() ) {
							var el = $(this);
							var width = this.width;
							var height = this.height;
							el.parent().css({"width":width,"height":height});
						}

						$this.data("imggrayscale", settings).trigger("resize.imggrayscale", [settings]);
					});
				},

				destroy: function() {
					return this.each(function() {
						var $this = $(this),
							settings = $this.data("imggrayscale");

						if ( !settings ) {
							return true;
						}

						if ( _isIE1011() ) {
							var $wrapper = $this.parent();
							$this = $this.clone(true)
								.removeClass('img_grayscale ieImage').css({"position":"","z-index":"","opacity":""})
								.insertBefore($wrapper);
							$wrapper.remove();
						}

						$this.off(".imggrayscale").removeData("imggrayscale").removeClass("imggrayscale");
					});
				}

			};

		if( methods[ method ] ) {
			return methods[ method ].apply( this, slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error("Method "+ method +" does not exist");
		}
	};

})( jQuery );
