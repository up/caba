/** @license caba.js
 * Canvas Fullscreen Background Image |
 * https://github.com/up/caba |
 * copyright 2013 Uli Preuss
*/

/*
 * Usage: 
 *   <canvas 
 *     src="trees.jpg" 
 *     class="caba" 
 *     data-caba-blur-factor="5" 
 *     data-caba-opacity="0.7" 
 *     width="500" 
 *     height="375">
 *  </canvas>
*/

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/jquery-1.8.js
// @output_wrapper "(function() {%output%}) 
// ==/ClosureCompiler==

/*global $:true */

(function(){
  
  /**
   * @constructor
   */
  var Caba = function (elem, img) {
    var 
      chrome = navigator.userAgent.toLowerCase().indexOf("chrome") > - 1, 
      mac = navigator.appVersion.indexOf("Mac") > - 1
    ;
    this.image = img;
    this.element = elem;
    this.element.width = this.image.width;
    this.element.height = this.image.height;
    this.context = this.element.getContext("2d");
    this.context.drawImage(this.image, 0, 0);
    if(chrome && mac) {
      this.element.width = Math.min(this.element.width, 300); 
      this.element.height = Math.min(this.element.height, 200);  
    }
  };

  Caba.prototype.blur = function (factor) {
    var i = -factor, k;
    this.context.globalAlpha = 0.5;
    for (; i <= factor; i += 2) {
      for (k = -factor; k <= factor; k += 2) {
        this.context.drawImage(this.element, k, i);
          if (k >= 0 && i >= 0) {
            this.context.drawImage(
              this.element, 
              -(k-1), 
              -(i-1)
            );
          }
      }
    }
    this.context.globalAlpha = 1;
  };

  $(function () {
    $(".caba").each(function () {
      var 
        img, cabaimg, 
        self = this,
        $self = $(this),
        factor = $self.data('caba-blur-factor') || 4,
        opacity = $self.data('caba-opacity') || 0.7
      ;
      $self.css({
        'display': 'inline-block',
        'min-width': '100%',
        'min-height': '100%',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'z-index': '-2',
        'opacity': opacity
      });

      img = new Image();
      img.onload = function () {
        cabaimg = new Caba(self, this);
        cabaimg.blur(factor);
      };
      img.src = $(this).attr("src");
    });
  });
  
}());
