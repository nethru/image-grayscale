# image-grayscale

A simple library that applies gray-scale effect to the images on your page, using JavaScript and CSS only.

Here is the [demo](http://htmlpreview.github.io/?https://github.com/nethru/image-grayscale/blob/master/demo/demo.html).

## Requirements

+ [jQuery](http://jquery.com/)

## Install

Include following files into your page:

+ [image-grayscale.css](http://raw.githubusercontent.com/nethru/image-grayscale/master/src/image-grayscale.css)
+ [image-grayscale.js](http://raw.githubusercontent.com/nethru/image-grayscale/master/src/image-grayscale.js)

## Basic Usage

```js
(function($) {
	$(function() {
		$(".myimage").imggrayscale();
	});
})(jQuery);
```

## Methods

### init

Initialize the `imggrayscale`, same as `$(".myimage").imggrayscale()`.

```js
$(".myimage").imggrayscale("init");
// same effect as $(".myimage").imggrayscale();
```

### resize
When the original image size is changed, call this method to resize the gray-scale effect.

```js
$(window).on("resize", function() {
	$(".myimage").imggrayscale("resize");
});
```

### destroy
Destroy the gray-scale effect.

```js
$(".myimage").imggrayscale("destroy");
```


## Settings

`imggrayscale` supports setting parameters during initialization.

### hoverShowOrigin

When `hoverShowOrigin` set to `true`, the original image will be shown when mouse over it. (Default is `false`)

```js
$(".myimage").imggrayscale({hoverShowOrigin: true});
```


## MIT License

image-grayscale is released under the [MIT License](http://nethru.mit-license.org/).
