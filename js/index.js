/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function() {
    var $postContent = $(".post-content");
    $postContent.fitVids();

    $(".scroll-down").arctic_scroll();

    $(".menu-button[href='#'], .nav-cover, .nav-close").on("click", function(
      e
    ) {
      e.preventDefault();
      $("body").toggleClass("nav-opened nav-closed");
    });

    // ad
    // var $postContentAd = $('.ui_adblock', '.post-content');
    // if ($postContentAd.length > 0) {
    //     var aids = $('meta[name="GOOGLEAD_POST_CONTENT"]').attr('content').split(',');
    //     for (var i = 0, postContentAdLen = $postContentAd.length; i < postContentAdLen; i++) {
    //         if (aids[i]) {
    //             var html = ['<h3 class="title">Advertisements</h3><div class="content"><div class="adunit"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">\x3c/script>', '<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-format="fluid" data-ad-layout="in-article" data-ad-client="ca-pub-7900212994905360" data-ad-slot="2530825933"></ins>', '<script>(adsbygoogle = window.adsbygoogle || []).push({});\x3c/script></div>\x3c/div>'].join('');
    //             $postContentAd.eq(i).append(html);
    //         }
    //     }
    // }
    // ad end

    // ad
    if (typeof page !== "undefined" && page === "article") {
      const adHtml = `
        <div class="ui_adblock">
          <h3 class="title">Advertisements</h3>
          <div class="content">
            <div class="adunit">
              <ins class="adsbygoogle"
                style="display:block; text-align:center;"
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-7900212994905360"
                data-ad-slot="2530825933"></ins>
            </div>
          </div>
        </div>
      `;
      let heightSum = 0;
      let adCount = 0;
      $(".post-content")
        .children()
        .not(".ui_adblock")
        .each(function() {
          let $this = $(this);
          heightSum += $this.height();
          if (heightSum > 500) {
            $this.after(adHtml);
            (adsbygoogle = window.adsbygoogle || []).push({});

            heightSum = 0;
            adCount++;
          }

          if (adCount >= 7) {
            return false;
          }
        });
    }
    // ad end
  });

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function(options) {
    var defaults = {
        elem: $(this),
        speed: 500
      },
      allOptions = $.extend(defaults, options);

    allOptions.elem.click(function(event) {
      event.preventDefault();
      var $this = $(this),
        $htmlBody = $("html, body"),
        offset = $this.attr("data-offset") ? $this.attr("data-offset") : false,
        position = $this.attr("data-position")
          ? $this.attr("data-position")
          : false,
        toMove;

      if (offset) {
        toMove = parseInt(offset);
        $htmlBody.stop(true, false).animate(
          {
            scrollTop: $(this.hash).offset().top + toMove
          },
          allOptions.speed
        );
      } else if (position) {
        toMove = parseInt(position);
        $htmlBody.stop(true, false).animate(
          {
            scrollTop: toMove
          },
          allOptions.speed
        );
      } else {
        $htmlBody.stop(true, false).animate(
          {
            scrollTop: $(this.hash).offset().top
          },
          allOptions.speed
        );
      }
    });
  };
})(jQuery);
