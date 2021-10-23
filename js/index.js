/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function () {
    var $postContent = $(".post-content");
    $postContent.fitVids();

    $(".scroll-down").arctic_scroll();

    $(".menu-button[href='#'], .nav-cover, .nav-close").on("click", function (
      e
    ) {
      e.preventDefault();
      $("body").toggleClass("nav-opened nav-closed");
    });

    // ad
    if (typeof page !== "undefined" && page === "list") {
      const listAdHtml = `
        <div class="ui_adblock post">
          <h3 class="title">Sponsored Ad</h3>
          <div class="content">
            <div class="adunit">
              <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-7900212994905360"
                data-ad-slot="9671567970"
                data-ad-format="auto"
                data-ad-channel="2883212005"
                data-full-width-responsive="true"></ins>
            </div>
          </div>
        </div>
      `;
      $("article.post").each(function (index) {
        if ((index % 2) - 1 == 0) {
          const $this = $(this);
          $this.after(listAdHtml);
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    }
    if (typeof page !== "undefined" && page === "article") {
      const postAdHtml = `
        <div class="ui_adblock">
          <h3 class="title">Sponsored Ad</h3>
          <div class="content">
            <div class="adunit">
              <ins class="adsbygoogle"
                style="display:block; text-align:center; margin: 0 auto;"
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-7900212994905360"
                data-ad-channel="2883212005"
                data-ad-slot="2530825933"></ins>
            </div>
          </div>
        </div>
      `;
      let heightSum = 0;
      let adCount = 0;
      let maxNum = 7;
      // if (!paltformOs.desktop) {
      //   maxNum = 10;
      // }
      $(".post-content")
        .children()
        .not(".ui_adblock")
        .each(function () {
          let $this = $(this);
          heightSum += $this.height();
          if (heightSum > 500) {
            $this.after(postAdHtml);
            (adsbygoogle = window.adsbygoogle || []).push({});

            heightSum = 0;
            adCount++;
          }

          if (adCount >= maxNum) {
            return false;
          }
        });
    }
    // ad end
  });

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {
    var defaults = {
        elem: $(this),
        speed: 500,
      },
      allOptions = $.extend(defaults, options);

    allOptions.elem.click(function (event) {
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
            scrollTop: $(this.hash).offset().top + toMove,
          },
          allOptions.speed
        );
      } else if (position) {
        toMove = parseInt(position);
        $htmlBody.stop(true, false).animate(
          {
            scrollTop: toMove,
          },
          allOptions.speed
        );
      } else {
        $htmlBody.stop(true, false).animate(
          {
            scrollTop: $(this.hash).offset().top,
          },
          allOptions.speed
        );
      }
    });
  };

  const userAgent = navigator.userAgent;
  let paltformOs = {};
  paltformOs.fb =
    userAgent.match(/FBAN/) || userAgent.match(/FBAV/) ? true : false;
  paltformOs.line = userAgent.match(/Line\/([\d.]+)/) ? true : false;
  paltformOs.msie = userAgent.match(/MSIE\/([\d.]+)/) ? true : false;
  paltformOs.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
  paltformOs.opera =
    userAgent.match(/Opera Mobi/) || userAgent.match(/Opera.([\d.]+)/)
      ? true
      : false;
  paltformOs.android =
    userAgent.match(/(Android)\s+([\d.]+)/) ||
    userAgent.match(/Silk-Accelerated/) ||
    userAgent.match(/Android/) ||
    userAgent.match(/Adr/)
      ? true
      : false;
  paltformOs.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
  paltformOs.iphone =
    !paltformOs.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
      ? true
      : false;
  paltformOs.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
    ? true
    : false;
  paltformOs.touchpad =
    paltformOs.webos && userAgent.match(/TouchPad/) ? true : false;
  paltformOs.ios = paltformOs.ipad || paltformOs.iphone;
  paltformOs.blackberry =
    userAgent.match(/BlackBerry/) || userAgent.match(/PlayBook/) ? true : false;
  paltformOs.fennec = userAgent.match(/fennec/i) ? true : false;
  paltformOs.desktop = !(
    paltformOs.ios ||
    paltformOs.android ||
    paltformOs.blackberry ||
    paltformOs.opera ||
    paltformOs.fennec
  );
})(jQuery);
