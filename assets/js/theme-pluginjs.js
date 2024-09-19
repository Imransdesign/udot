/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!(function (t, i, n, s) {
  var e = function (s, e) {
    (this.elem = s),
      (this.$elem = t(s)),
      (this.options = e),
      (this.metadata = this.$elem.data("plugin-options")),
      (this.$win = t(i)),
      (this.sections = {}),
      (this.didScroll = !1),
      (this.$doc = t(n)),
      (this.docHeight = this.$doc.height());
  };
  (e.prototype = {
    defaults: {
      navItems: "a",
      currentClass: "current",
      changeHash: !1,
      easing: "swing",
      filter: "",
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      begin: !1,
      end: !1,
      scrollChange: !1,
    },
    init: function () {
      return (
        (this.config = t.extend(
          {},
          this.defaults,
          this.options,
          this.metadata
        )),
        (this.$nav = this.$elem.find(this.config.navItems)),
        "" !== this.config.filter &&
          (this.$nav = this.$nav.filter(this.config.filter)),
        this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)),
        this.getPositions(),
        this.bindInterval(),
        this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)),
        this
      );
    },
    adjustNav: function (t, i) {
      t.$elem
        .find("." + t.config.currentClass)
        .removeClass(t.config.currentClass),
        i.addClass(t.config.currentClass);
    },
    bindInterval: function () {
      var t,
        i = this;
      i.$win.on("scroll.onePageNav", function () {
        i.didScroll = !0;
      }),
        (i.t = setInterval(function () {
          (t = i.$doc.height()),
            i.didScroll && ((i.didScroll = !1), i.scrollChange()),
            t !== i.docHeight && ((i.docHeight = t), i.getPositions());
        }, 250));
    },
    getHash: function (t) {
      return t.attr("href").split("#")[1];
    },
    getPositions: function () {
      var i,
        n,
        s,
        e = this;
      e.$nav.each(function () {
        (i = e.getHash(t(this))),
          (s = t("#" + i)),
          s.length && ((n = s.offset().top), (e.sections[i] = Math.round(n)));
      });
    },
    getSection: function (t) {
      var i = null,
        n = Math.round(this.$win.height() * this.config.scrollThreshold);
      for (var s in this.sections) this.sections[s] - n < t && (i = s);
      return i;
    },
    handleClick: function (n) {
      var s = this,
        e = t(n.currentTarget),
        o = e.parent(),
        a = "#" + s.getHash(e);
      o.hasClass(s.config.currentClass) ||
        (s.config.begin && s.config.begin(),
        s.adjustNav(s, o),
        s.unbindInterval(),
        s.scrollTo(a, function () {
          s.config.changeHash && (i.location.hash = a),
            s.bindInterval(),
            s.config.end && s.config.end();
        })),
        n.preventDefault();
    },
    scrollChange: function () {
      var t,
        i = this.$win.scrollTop(),
        n = this.getSection(i);
      null !== n &&
        ((t = this.$elem.find('a[href$="#' + n + '"]').parent()),
        t.hasClass(this.config.currentClass) ||
          (this.adjustNav(this, t),
          this.config.scrollChange && this.config.scrollChange(t)));
    },
    scrollTo: function (i, n) {
      var s = t(i).offset().top;
      t("html, body").animate(
        { scrollTop: s - this.config.scrollOffset },
        this.config.scrollSpeed,
        this.config.easing,
        n
      );
    },
    unbindInterval: function () {
      clearInterval(this.t), this.$win.unbind("scroll.onePageNav");
    },
  }),
    (e.defaults = e.prototype.defaults),
    (t.fn.onePageNav = function (t) {
      return this.each(function () {
        new e(this, t).init();
      });
    });
})(jQuery, window, document);

/* direction hover js */

!(function (a) {
  (a.fn.directionalHover = function (b) {
    function c(a, b, c, e, f, g, h, i) {
      var n = 0;
      g / 2 >= e - i && (n ^= j),
        c - h >= f / 2 && (n ^= k),
        e - i > g / 2 && (n ^= l),
        f / 2 > c - h && (n ^= m),
        d(n, a, b, c - h, e - i, f / 2, g / 2);
    }
    function d(a, b, c, d, i, j, k) {
      e(a, n)
        ? f(d, i, j, k)
          ? h(b, c, 0, 2 * -j)
          : h(b, c, 2 * -k, 0)
        : e(a, o)
        ? g(d, i, j, k)
          ? h(b, c, 2 * -k, 0)
          : h(b, c, 0, 2 * j)
        : e(a, p)
        ? g(d, i, j, k)
          ? h(b, c, 0, 2 * -j)
          : h(b, c, 2 * k, 0)
        : e(a, q) && (f(d, i, j, k) ? h(b, c, 2 * k, 0) : h(b, c, 0, 2 * j));
    }
    function e(a, b) {
      return (a & b) === b;
    }
    function f(a, b, c, d) {
      return 0 > d * a - c * b;
    }
    function g(a, b, c, d) {
      return 0 > c * (b - d) + d * a - c * d;
    }
    function h(a, b, c, d) {
      "in" === b
        ? a.animate({ top: c, left: d }, 0, function () {
            a.stop().animate({ top: 0, left: 0 }, i.speed, i.easing);
          })
        : "out" === b &&
          a.animate({ top: 0, left: 0 }, 0, function () {
            a.stop().animate({ top: c, left: d }, i.speed, i.easing);
          });
    }
    var i = a.extend({}, a.fn.directionalHover.defaults, b),
      j = 1,
      k = 2,
      l = 4,
      m = 8,
      n = j | m,
      o = j | k,
      p = l | m,
      q = l | k;
    return (
      this.css({ position: "relative", overflow: "hidden" }),
      this.find("." + i.overlay).css({ position: "absolute", top: "-100%" }),
      this.each(function () {
        var b = a(this);
        b.hover(
          function (a) {
            c(
              b.find("." + i.overlay),
              "in",
              a.pageX,
              a.pageY,
              b.width(),
              b.height(),
              Math.floor(b.offset().left),
              b.offset().top
            );
          },
          function (a) {
            c(
              b.find("." + i.overlay),
              "out",
              a.pageX,
              a.pageY,
              b.width(),
              b.height(),
              Math.floor(b.offset().left),
              b.offset().top
            );
          }
        );
      })
    );
  }),
    (a.fn.directionalHover.defaults = {
      overlay: "dh-overlay",
      easing: "swing",
      speed: 400,
    });
})(jQuery);

/* counter up */
(function ($) {
  "use strict";
  $.fn.counterUp = function (options) {
    var settings = $.extend(
        {
          time: 400,
          delay: 10,
          offset: 100,
          beginAt: 0,
          formatter: false,
          lowgo: "window",
          callback: function () {},
        },
        options
      ),
      s;
    return this.each(function () {
      var $this = $(this),
        counter = {
          time: $(this).data("counterup-time") || settings.time,
          delay: $(this).data("counterup-delay") || settings.delay,
          offset: $(this).data("counterup-offset") || settings.offset,
          beginAt: $(this).data("counterup-beginat") || settings.beginAt,
          lowgo: $(this).data("counterup-lowgo") || settings.lowgo,
        };
      var counterUpper = function () {
        var nums = [];
        var divisions = counter.time / counter.delay;
        var num = $(this).attr("data-num")
          ? $(this).attr("data-num")
          : $this.text();
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, "");
        var decimalPlaces = (num.split(".")[1] || []).length;
        if (counter.beginAt > num) counter.beginAt = num;
        var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);
        if (isTime) {
          var times = num.split(":"),
            m = 1;
          s = 0;
          while (times.length > 0) {
            s += m * parseInt(times.pop(), 10);
            m *= 60;
          }
        }
        for (var i = divisions; i >= (counter.beginAt / num) * divisions; i--) {
          var newNum = parseFloat((num / divisions) * i).toFixed(decimalPlaces);
          if (isTime) {
            newNum = parseInt((s / divisions) * i);
            var hours = parseInt(newNum / 3600) % 24;
            var minutes = parseInt(newNum / 60) % 60;
            var seconds = parseInt(newNum % 60, 10);
            newNum =
              (hours < 10 ? "0" + hours : hours) +
              ":" +
              (minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds);
          }
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum
                .toString()
                .replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
            }
          }
          if (settings.formatter) {
            newNum = settings.formatter.call(this, newNum);
          }
          nums.unshift(newNum);
        }
        $this.data("counterup-nums", nums);
        $this.text(counter.beginAt);
        var f = function () {
          if (!$this.data("counterup-nums")) {
            settings.callback.call(this);
            return;
          }
          $this.html($this.data("counterup-nums").shift());
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), counter.delay);
          } else {
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
            settings.callback.call(this);
          }
        };
        $this.data("counterup-func", f);
        setTimeout($this.data("counterup-func"), counter.delay);
      };
      $this.waypoint(
        function (direction) {
          counterUpper();
          this.destroy();
        },
        { offset: counter.offset + "%", lowgo: counter.lowgo }
      );
    });
  };
})(jQuery);

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * Permission is hereby udoted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function (a) {
  "use strict";
  function b(a) {
    if (a instanceof Date) return a;
    if (String(a).match(g))
      return (
        String(a).match(/^[0-9]*$/) && (a = Number(a)),
        String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
        new Date(a)
      );
    throw new Error("Couldn't cast `" + a + "` to a date object.");
  }
  function c(a) {
    var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    return new RegExp(b);
  }
  function d(a) {
    return function (b) {
      var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (d)
        for (var f = 0, g = d.length; f < g; ++f) {
          var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            j = c(h[0]),
            k = h[1] || "",
            l = h[3] || "",
            m = null;
          (h = h[2]),
            i.hasOwnProperty(h) && ((m = i[h]), (m = Number(a[m]))),
            null !== m &&
              ("!" === k && (m = e(l, m)),
              "" === k && m < 10 && (m = "0" + m.toString()),
              (b = b.replace(j, m.toString())));
        }
      return (b = b.replace(/%%/, "%"));
    };
  }
  function e(a, b) {
    var c = "s",
      d = "";
    return (
      a &&
        ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
        1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
      Math.abs(b) > 1 ? c : d
    );
  }
  var f = [],
    g = [],
    h = { precision: 100, elapse: !1, defer: !1 };
  g.push(/^[0-9]*$/.source),
    g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    (g = new RegExp(g.join("|")));
  var i = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      d: "daysToWeek",
      w: "weeks",
      W: "weeksToMonth",
      H: "hours",
      M: "minutes",
      S: "seconds",
      D: "totalDays",
      I: "totalHours",
      N: "totalMinutes",
      T: "totalSeconds",
    },
    j = function (b, c, d) {
      (this.el = b),
        (this.$el = a(b)),
        (this.interval = null),
        (this.offset = {}),
        (this.options = a.extend({}, h)),
        (this.instanceNumber = f.length),
        f.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        d &&
          ("function" == typeof d
            ? (this.$el.on("update.countdown", d),
              this.$el.on("stoped.countdown", d),
              this.$el.on("finish.countdown", d))
            : (this.options = a.extend({}, h, d))),
        this.setFinalDate(c),
        this.options.defer === !1 && this.start();
    };
  a.extend(j.prototype, {
    start: function () {
      null !== this.interval && clearInterval(this.interval);
      var a = this;
      this.update(),
        (this.interval = setInterval(function () {
          a.update.call(a);
        }, this.options.precision));
    },
    stop: function () {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent("stoped");
    },
    toggle: function () {
      this.interval ? this.stop() : this.start();
    },
    pause: function () {
      this.stop();
    },
    resume: function () {
      this.start();
    },
    remove: function () {
      this.stop.call(this),
        (f[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance;
    },
    setFinalDate: function (a) {
      this.finalDate = b(a);
    },
    update: function () {
      if (0 === this.$el.closest("html").length) return void this.remove();
      var b,
        c = void 0 !== a._data(this.el, "events"),
        d = new Date();
      (b = this.finalDate.getTime() - d.getTime()),
        (b = Math.ceil(b / 1e3)),
        (b = !this.options.elapse && b < 0 ? 0 : Math.abs(b)),
        this.totalSecsLeft !== b &&
          c &&
          ((this.totalSecsLeft = b),
          (this.elapsed = d >= this.finalDate),
          (this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToMonth: Math.floor(
              (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
            ),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
            years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()),
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
            totalMinutes: Math.floor(this.totalSecsLeft / 60),
            totalSeconds: this.totalSecsLeft,
          }),
          this.options.elapse || 0 !== this.totalSecsLeft
            ? this.dispatchEvent("update")
            : (this.stop(), this.dispatchEvent("finish")));
    },
    dispatchEvent: function (b) {
      var c = a.Event(b + ".countdown");
      (c.finalDate = this.finalDate),
        (c.elapsed = this.elapsed),
        (c.offset = a.extend({}, this.offset)),
        (c.strftime = d(this.offset)),
        this.$el.trigger(c);
    },
  }),
    (a.fn.countdown = function () {
      var b = Array.prototype.slice.call(arguments, 0);
      return this.each(function () {
        var c = a(this).data("countdown-instance");
        if (void 0 !== c) {
          var d = f[c],
            e = b[0];
          j.prototype.hasOwnProperty(e)
            ? d[e].apply(d, b.slice(1))
            : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
            ? (d.setFinalDate.call(d, e), d.start())
            : a.error(
                "Method %s does not exist on jQuery.countdown".replace(
                  /\%s/gi,
                  e
                )
              );
        } else new j(this, b[0], b[1]);
      });
    });
});

/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2018 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!(function (a, b) {
  "use strict";
  "function" == typeof define && define.amd
    ? define([], b)
    : "object" == typeof exports
    ? (module.exports = b())
    : (a.Headroom = b());
})(this, function () {
  "use strict";
  function a(a) {
    (this.callback = a), (this.ticking = !1);
  }
  function b(a) {
    return a && "undefined" != typeof window && (a === window || a.nodeType);
  }
  function c(a) {
    if (arguments.length <= 0)
      throw new Error("Missing arguments in extend function");
    var d,
      e,
      f = a || {};
    for (e = 1; e < arguments.length; e++) {
      var g = arguments[e] || {};
      for (d in g)
        "object" != typeof f[d] || b(f[d])
          ? (f[d] = f[d] || g[d])
          : (f[d] = c(f[d], g[d]));
    }
    return f;
  }
  function d(a) {
    return a === Object(a) ? a : { down: a, up: a };
  }
  function e(a, b) {
    (b = c(b, e.options)),
      (this.lastKnownScrollY = 0),
      (this.elem = a),
      (this.tolerance = d(b.tolerance)),
      (this.classes = b.classes),
      (this.offset = b.offset),
      (this.scroller = b.scroller),
      (this.initialised = !1),
      (this.onPin = b.onPin),
      (this.onUnpin = b.onUnpin),
      (this.onTop = b.onTop),
      (this.onNotTop = b.onNotTop),
      (this.onBottom = b.onBottom),
      (this.onNotBottom = b.onNotBottom);
  }
  var f = {
    bind: !!function () {}.bind,
    classList: "classList" in document.documentElement,
    rAF: !!(
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame
    ),
  };
  return (
    (window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame),
    (a.prototype = {
      constructor: a,
      update: function () {
        this.callback && this.callback(), (this.ticking = !1);
      },
      requestTick: function () {
        this.ticking ||
          (requestAnimationFrame(
            this.rafCallback || (this.rafCallback = this.update.bind(this))
          ),
          (this.ticking = !0));
      },
      handleEvent: function () {
        this.requestTick();
      },
    }),
    (e.prototype = {
      constructor: e,
      init: function () {
        if (e.cutsTheMustard)
          return (
            (this.debouncer = new a(this.update.bind(this))),
            this.elem.classList.add(this.classes.initial),
            setTimeout(this.attachEvent.bind(this), 100),
            this
          );
      },
      destroy: function () {
        var a = this.classes;
        this.initialised = !1;
        for (var b in a)
          a.hasOwnProperty(b) && this.elem.classList.remove(a[b]);
        this.scroller.removeEventListener("scroll", this.debouncer, !1);
      },
      attachEvent: function () {
        this.initialised ||
          ((this.lastKnownScrollY = this.getScrollY()),
          (this.initialised = !0),
          this.scroller.addEventListener("scroll", this.debouncer, !1),
          this.debouncer.handleEvent());
      },
      unpin: function () {
        var a = this.elem.classList,
          b = this.classes;
        (!a.contains(b.pinned) && a.contains(b.unpinned)) ||
          (a.add(b.unpinned),
          a.remove(b.pinned),
          this.onUnpin && this.onUnpin.call(this));
      },
      pin: function () {
        var a = this.elem.classList,
          b = this.classes;
        a.contains(b.unpinned) &&
          (a.remove(b.unpinned),
          a.add(b.pinned),
          this.onPin && this.onPin.call(this));
      },
      top: function () {
        var a = this.elem.classList,
          b = this.classes;
        a.contains(b.top) ||
          (a.add(b.top),
          a.remove(b.notTop),
          this.onTop && this.onTop.call(this));
      },
      notTop: function () {
        var a = this.elem.classList,
          b = this.classes;
        a.contains(b.notTop) ||
          (a.add(b.notTop),
          a.remove(b.top),
          this.onNotTop && this.onNotTop.call(this));
      },
      bottom: function () {
        var a = this.elem.classList,
          b = this.classes;
        a.contains(b.bottom) ||
          (a.add(b.bottom),
          a.remove(b.notBottom),
          this.onBottom && this.onBottom.call(this));
      },
      notBottom: function () {
        var a = this.elem.classList,
          b = this.classes;
        a.contains(b.notBottom) ||
          (a.add(b.notBottom),
          a.remove(b.bottom),
          this.onNotBottom && this.onNotBottom.call(this));
      },
      getScrollY: function () {
        return void 0 !== this.scroller.pageYOffset
          ? this.scroller.pageYOffset
          : void 0 !== this.scroller.scrollTop
          ? this.scroller.scrollTop
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      },
      getViewportHeight: function () {
        return (
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
        );
      },
      getElementPhysicalHeight: function (a) {
        return Math.max(a.offsetHeight, a.clientHeight);
      },
      getScrollerPhysicalHeight: function () {
        return this.scroller === window || this.scroller === document.body
          ? this.getViewportHeight()
          : this.getElementPhysicalHeight(this.scroller);
      },
      getDocumentHeight: function () {
        var a = document.body,
          b = document.documentElement;
        return Math.max(
          a.scrollHeight,
          b.scrollHeight,
          a.offsetHeight,
          b.offsetHeight,
          a.clientHeight,
          b.clientHeight
        );
      },
      getElementHeight: function (a) {
        return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight);
      },
      getScrollerHeight: function () {
        return this.scroller === window || this.scroller === document.body
          ? this.getDocumentHeight()
          : this.getElementHeight(this.scroller);
      },
      isOutOfBounds: function (a) {
        var b = a < 0,
          c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
        return b || c;
      },
      toleranceExceeded: function (a, b) {
        return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b];
      },
      shouldUnpin: function (a, b) {
        var c = a > this.lastKnownScrollY,
          d = a >= this.offset;
        return c && d && b;
      },
      shouldPin: function (a, b) {
        var c = a < this.lastKnownScrollY,
          d = a <= this.offset;
        return (c && b) || d;
      },
      update: function () {
        var a = this.getScrollY(),
          b = a > this.lastKnownScrollY ? "down" : "up",
          c = this.toleranceExceeded(a, b);
        this.isOutOfBounds(a) ||
          (a <= this.offset ? this.top() : this.notTop(),
          a + this.getViewportHeight() >= this.getScrollerHeight()
            ? this.bottom()
            : this.notBottom(),
          this.shouldUnpin(a, c)
            ? this.unpin()
            : this.shouldPin(a, c) && this.pin(),
          (this.lastKnownScrollY = a));
      },
    }),
    (e.options = {
      tolerance: { up: 0, down: 0 },
      offset: 0,
      scroller: window,
      classes: {
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
        bottom: "headroom--bottom",
        notBottom: "headroom--not-bottom",
        initial: "headroom",
      },
    }),
    (e.cutsTheMustard =
      "undefined" != typeof f && f.rAF && f.bind && f.classList),
    e
  );
});

/*! WOW - v1.0.2 - 2014-10-28
 * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */ (function () {
  "use strict";
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          (this.animationNameCache = new c());
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(window, "scroll", this.scrollHandler),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      var c, d, e, f, g;
                      for (g = [], e = 0, f = b.length; f > e; e++)
                        (d = b[e]),
                          g.push(
                            function () {
                              var a, b, e, f;
                              for (
                                e = d.addedNodes || [],
                                  f = [],
                                  a = 0,
                                  b = e.length;
                                b > a;
                                a++
                              )
                                (c = e[a]), f.push(this.doSync(c));
                              return f;
                            }.call(a)
                          );
                      return g;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = "" + a.className + " " + this.config.animateClass)
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          f = [];
          for (c in b)
            (d = b[c]),
              (a["" + c] = d),
              f.push(
                function () {
                  var b, f, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, f = g.length;
                    f > b;
                    b++
                  )
                    (e = g[b]),
                      h.push(
                        (a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] =
                          d)
                      );
                  return h;
                }.call(this)
              );
          return f;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            e = d(a),
              c = e.getPropertyCSSValue(b),
              i = this.vendors,
              g = 0,
              h = i.length;
            h > g;
            g++
          )
            (f = i[g]), (c = c || e.getPropertyCSSValue("-" + f + "-" + b));
          return c;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f = window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}).call(this);

/*!
Waypoints - 4.0.1
Copyright � 2011-2016 Caleb Troughton
Licensed under the MIT license.
://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.lowgo = t.lowgo.findOrCreateByElement(this.options.lowgo)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.lowgo.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.lowgo.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.lowgo.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.lowgo.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.lowgo.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      lowgo: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.lowgo.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.lowgo.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-lowgo-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointlowgoKey = this.key),
        (o[t.waypointlowgoKey] = this),
        (i += 1),
        n.windowlowgo ||
          ((n.windowlowgo = !0), (n.windowlowgo = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.lowgo.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              lowgoOffset: e ? 0 : i.left,
              lowgoScroll: e ? 0 : this.oldScroll.x,
              lowgoDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              lowgoOffset: e ? 0 : i.top,
              lowgoScroll: e ? 0 : this.oldScroll.y,
              lowgoDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.lowgoDimension * f) / 100))),
              (l = s.lowgoScroll - s.lowgoOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointlowgoKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.lowgo = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.lowgo &&
              (n.lowgo = t(this).closest(n.lowgo)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();

/* scroll fixed */
(function (a) {
  a.isScrollToFixed = function (b) {
    return !!a(b).data("ScrollToFixed");
  };
  a.ScrollToFixed = function (d, i) {
    var m = this;
    m.$el = a(d);
    m.el = d;
    m.$el.data("ScrollToFixed", m);
    var c = false;
    var H = m.$el;
    var I;
    var F;
    var k;
    var e;
    var z;
    var E = 0;
    var r = 0;
    var j = -1;
    var f = -1;
    var u = null;
    var A;
    var g;
    function v() {
      H.trigger("preUnfixed.ScrollToFixed");
      l();
      H.trigger("unfixed.ScrollToFixed");
      f = -1;
      E = H.offset().top;
      r = H.offset().left;
      if (m.options.offsets) {
        r += H.offset().left - H.position().left;
      }
      if (j == -1) {
        j = r;
      }
      I = H.css("position");
      c = true;
      if (m.options.bottom != -1) {
        H.trigger("udoted.ScrollToFixed");
        x();
        H.trigger("fixed.ScrollToFixed");
      }
    }
    function o() {
      var J = m.options.limit;
      if (!J) {
        return 0;
      }
      if (typeof J === "function") {
        return J.apply(H);
      }
      return J;
    }
    function q() {
      return I === "fixed";
    }
    function y() {
      return I === "absolute";
    }
    function h() {
      return !(q() || y());
    }
    function x() {
      if (!q()) {
        var J = H[0].getBoundingClientRect();
        u.css({
          display: H.css("display"),
          width: J.width,
          height: J.height,
          float: H.css("float"),
        });
        cssOptions = {
          "z-index": m.options.zIndex,
          position: "fixed",
          top: m.options.bottom == -1 ? t() : "",
          bottom: m.options.bottom == -1 ? "" : m.options.bottom,
          "margin-left": "0px",
        };
        if (!m.options.dontSetWidth) {
          cssOptions.width = H.css("width");
        }
        H.css(cssOptions);
        H.addClass(m.options.baseClassName);
        if (m.options.className) {
          H.addClass(m.options.className);
        }
        I = "fixed";
      }
    }
    function b() {
      var K = o();
      var J = r;
      if (m.options.removeOffsets) {
        J = "";
        K = K - E;
      }
      cssOptions = {
        position: "absolute",
        top: K,
        left: J,
        "margin-left": "0px",
        bottom: "",
      };
      if (!m.options.dontSetWidth) {
        cssOptions.width = H.css("width");
      }
      H.css(cssOptions);
      I = "absolute";
    }
    function l() {
      if (!h()) {
        f = -1;
        u.css("display", "none");
        H.css({
          "z-index": z,
          width: "",
          position: F,
          left: "",
          top: e,
          "margin-left": "",
        });
        H.removeClass("scroll-to-fixed-fixed");
        if (m.options.className) {
          H.removeClass(m.options.className);
        }
        I = null;
      }
    }
    function w(J) {
      if (J != f) {
        H.css("left", r - J);
        f = J;
      }
    }
    function t() {
      var J = m.options.marginTop;
      if (!J) {
        return 0;
      }
      if (typeof J === "function") {
        return J.apply(H);
      }
      return J;
    }
    function B() {
      if (!a.isScrollToFixed(H) || H.is(":hidden")) {
        return;
      }
      var M = c;
      var L = h();
      if (!c) {
        v();
      } else {
        if (h()) {
          E = H.offset().top;
          r = H.offset().left;
        }
      }
      var J = a(window).scrollLeft();
      var N = a(window).scrollTop();
      var K = o();
      if (m.options.minWidth && a(window).width() < m.options.minWidth) {
        if (!h() || !M) {
          p();
          H.trigger("preUnfixed.ScrollToFixed");
          l();
          H.trigger("unfixed.ScrollToFixed");
        }
      } else {
        if (m.options.maxWidth && a(window).width() > m.options.maxWidth) {
          if (!h() || !M) {
            p();
            H.trigger("preUnfixed.ScrollToFixed");
            l();
            H.trigger("unfixed.ScrollToFixed");
          }
        } else {
          if (m.options.bottom == -1) {
            if (K > 0 && N >= K - t()) {
              if (!L && (!y() || !M)) {
                p();
                H.trigger("preAbsolute.ScrollToFixed");
                b();
                H.trigger("unfixed.ScrollToFixed");
              }
            } else {
              if (N >= E - t()) {
                if (!q() || !M) {
                  p();
                  H.trigger("udoted.ScrollToFixed");
                  x();
                  f = -1;
                  H.trigger("fixed.ScrollToFixed");
                }
                w(J);
              } else {
                if (!h() || !M) {
                  p();
                  H.trigger("preUnfixed.ScrollToFixed");
                  l();
                  H.trigger("unfixed.ScrollToFixed");
                }
              }
            }
          } else {
            if (K > 0) {
              if (
                N + a(window).height() - H.outerHeight(true) >=
                K - (t() || -n())
              ) {
                if (q()) {
                  p();
                  H.trigger("preUnfixed.ScrollToFixed");
                  if (F === "absolute") {
                    b();
                  } else {
                    l();
                  }
                  H.trigger("unfixed.ScrollToFixed");
                }
              } else {
                if (!q()) {
                  p();
                  H.trigger("udoted.ScrollToFixed");
                  x();
                }
                w(J);
                H.trigger("fixed.ScrollToFixed");
              }
            } else {
              w(J);
            }
          }
        }
      }
    }
    function n() {
      if (!m.options.bottom) {
        return 0;
      }
      return m.options.bottom;
    }
    function p() {
      var J = H.css("position");
      if (J == "absolute") {
        H.trigger("postAbsolute.ScrollToFixed");
      } else {
        if (J == "fixed") {
          H.trigger("postFixed.ScrollToFixed");
        } else {
          H.trigger("postUnfixed.ScrollToFixed");
        }
      }
    }
    var D = function (J) {
      if (H.is(":visible")) {
        c = false;
        B();
      } else {
        l();
      }
    };
    var G = function (J) {
      !!window.requestAnimationFrame ? requestAnimationFrame(B) : B();
    };
    var C = function () {
      var K = document.body;
      if (document.createElement && K && K.appendChild && K.removeChild) {
        var M = document.createElement("div");
        if (!M.getBoundingClientRect) {
          return null;
        }
        M.innerHTML = "x";
        M.style.cssText = "position:fixed;top:100px;";
        K.appendChild(M);
        var N = K.style.height,
          O = K.scrollTop;
        K.style.height = "3000px";
        K.scrollTop = 500;
        var J = M.getBoundingClientRect().top;
        K.style.height = N;
        var L = J === 100;
        K.removeChild(M);
        K.scrollTop = O;
        return L;
      }
      return null;
    };
    var s = function (J) {
      J = J || window.event;
      if (J.preventDefault) {
        J.preventDefault();
      }
      J.returnValue = false;
    };
    m.init = function () {
      m.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
      z = H.css("z-index");
      m.$el.css("z-index", m.options.zIndex);
      u = a("<div />");
      I = H.css("position");
      F = H.css("position");
      k = H.css("float");
      e = H.css("top");
      if (h()) {
        m.$el.after(u);
      }
      a(window).bind("resize.ScrollToFixed", D);
      a(window).bind("scroll.ScrollToFixed", G);
      if ("ontouchmove" in window) {
        a(window).bind("touchmove.ScrollToFixed", B);
      }
      if (m.options.udoted) {
        H.bind("udoted.ScrollToFixed", m.options.udoted);
      }
      if (m.options.postFixed) {
        H.bind("postFixed.ScrollToFixed", m.options.postFixed);
      }
      if (m.options.preUnfixed) {
        H.bind("preUnfixed.ScrollToFixed", m.options.preUnfixed);
      }
      if (m.options.postUnfixed) {
        H.bind("postUnfixed.ScrollToFixed", m.options.postUnfixed);
      }
      if (m.options.preAbsolute) {
        H.bind("preAbsolute.ScrollToFixed", m.options.preAbsolute);
      }
      if (m.options.postAbsolute) {
        H.bind("postAbsolute.ScrollToFixed", m.options.postAbsolute);
      }
      if (m.options.fixed) {
        H.bind("fixed.ScrollToFixed", m.options.fixed);
      }
      if (m.options.unfixed) {
        H.bind("unfixed.ScrollToFixed", m.options.unfixed);
      }
      if (m.options.spacerClass) {
        u.addClass(m.options.spacerClass);
      }
      H.bind("resize.ScrollToFixed", function () {
        u.height(H.height());
      });
      H.bind("scroll.ScrollToFixed", function () {
        H.trigger("preUnfixed.ScrollToFixed");
        l();
        H.trigger("unfixed.ScrollToFixed");
        B();
      });
      H.bind("detach.ScrollToFixed", function (J) {
        s(J);
        H.trigger("preUnfixed.ScrollToFixed");
        l();
        H.trigger("unfixed.ScrollToFixed");
        a(window).unbind("resize.ScrollToFixed", D);
        a(window).unbind("scroll.ScrollToFixed", G);
        H.unbind(".ScrollToFixed");
        u.remove();
        m.$el.removeData("ScrollToFixed");
      });
      D();
    };
    m.init();
  };
  a.ScrollToFixed.defaultOptions = {
    marginTop: 0,
    limit: 0,
    bottom: -1,
    zIndex: 1000,
    baseClassName: "scroll-to-fixed-fixed",
  };
  a.fn.scrollToFixed = function (b) {
    return this.each(function () {
      new a.ScrollToFixed(this, b);
    });
  };
})(jQuery);

/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear � @markgdyr � http://markgoodyear.com
 * License: MIT
 */
!(function (l, o, e) {
  "use strict";
  (l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") ||
      (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
  }),
    (l.fn.scrollUp.init = function (r) {
      var s,
        t,
        c,
        i,
        n,
        a,
        d,
        p = (l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r)),
        f = !1;
      switch (
        ((d = p.scrollTrigger
          ? l(p.scrollTrigger)
          : l("<a/>", { id: p.scrollName, href: "#top" })),
        p.scrollTitle && d.attr("title", p.scrollTitle),
        d.appendTo("body"),
        p.scrollImg || p.scrollTrigger || d.html(p.scrollText),
        d.css({ display: "none", position: "fixed", zIndex: p.zIndex }),
        p.activeOverlay &&
          l("<div/>", { id: p.scrollName + "-active" })
            .css({
              position: "absolute",
              top: p.scrollDistance + "px",
              width: "100%",
              borderTop: "1px dotted" + p.activeOverlay,
              zIndex: p.zIndex,
            })
            .appendTo("body"),
        p.animation)
      ) {
        case "fade":
          (s = "fadeIn"), (t = "fadeOut"), (c = p.animationSpeed);
          break;
        case "slide":
          (s = "slideDown"), (t = "slideUp"), (c = p.animationSpeed);
          break;
        default:
          (s = "show"), (t = "hide"), (c = 0);
      }
      (i =
        "top" === p.scrollFrom
          ? p.scrollDistance
          : l(e).height() - l(o).height() - p.scrollDistance),
        (n = l(o).scroll(function () {
          l(o).scrollTop() > i
            ? f || (d[s](c), (f = !0))
            : f && (d[t](c), (f = !1));
        })),
        p.scrollTarget
          ? "number" == typeof p.scrollTarget
            ? (a = p.scrollTarget)
            : "string" == typeof p.scrollTarget &&
              (a = Math.floor(l(p.scrollTarget).offset().top))
          : (a = 0),
        d.click(function (o) {
          o.preventDefault(),
            l("html, body").animate(
              { scrollTop: a },
              p.scrollSpeed,
              p.easingType
            );
        });
    }),
    (l.fn.scrollUp.defaults = {
      scrollName: "scrollUp",
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "linear",
      animation: "fade",
      animationSpeed: 200,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (l.fn.scrollUp.destroy = function (r) {
      l.removeData(e.body, "scrollUp"),
        l("#" + l.fn.scrollUp.settings.scrollName).remove(),
        l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
        l.fn.jquery.split(".")[1] >= 7
          ? l(o).off("scroll", r)
          : l(o).unbind("scroll", r);
    }),
    (l.scrollUp = l.fn.scrollUp);
})(jQuery, window, document);

/* meanmenu */
!(function ($) {
  "use strict";
  $.fn.meanmenu = function (e) {
    var n = {
      meanMenuTarget: jQuery(this),
      meanMenuContainer: "body",
      meanMenuClose: "X",
      meanMenuCloseSize: "18px",
      meanMenuOpen: "<span></span><span></span><span></span>",
      meanRevealPosition: "right",
      meanRevealPositionDistance: "0",
      meanRevealColour: "",
      meanScreenWidth: "480",
      meanNavPush: "",
      meanShowChildren: !0,
      meanExpandableChildren: !0,
      meanExpand: "+",
      meanContract: "-",
      meanRemoveAttrs: !1,
      onePage: !1,
      meanDisplay: "block",
      removeElements: "",
    };
    e = $.extend(n, e);
    var a = window.innerWidth || document.documentElement.clientWidth;
    return this.each(function () {
      var n = e.meanMenuTarget,
        t = e.meanMenuContainer,
        r = e.meanMenuClose,
        i = e.meanMenuCloseSize,
        s = e.meanMenuOpen,
        u = e.meanRevealPosition,
        m = e.meanRevealPositionDistance,
        l = e.meanRevealColour,
        o = e.meanScreenWidth,
        c = e.meanNavPush,
        v = ".meanmenu-reveal",
        h = e.meanShowChildren,
        d = e.meanExpandableChildren,
        y = e.meanExpand,
        j = e.meanContract,
        Q = e.meanRemoveAttrs,
        f = e.onePage,
        g = e.meanDisplay,
        p = e.removeElements,
        C = !1;
      (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/Blackberry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) &&
        (C = !0),
        (navigator.userAgent.match(/MSIE 8/i) ||
          navigator.userAgent.match(/MSIE 7/i)) &&
          jQuery("html").css("overflow-y", "scroll");
      var w = "",
        x = function () {
          if ("center" === u) {
            var e = window.innerWidth || document.documentElement.clientWidth,
              n = e / 2 - 22 + "px";
            (w = "left:" + n + ";right:auto;"),
              C
                ? jQuery(".meanmenu-reveal").animate({ left: n })
                : jQuery(".meanmenu-reveal").css("left", n);
          }
        },
        A = !1,
        E = !1;
      "right" === u && (w = "right:" + m + ";left:auto;"),
        "left" === u && (w = "left:" + m + ";right:auto;"),
        x();
      var M = "",
        P = function () {
          M.html(jQuery(M).is(".meanmenu-reveal.meanclose") ? r : s);
        },
        W = function () {
          jQuery(".mean-bar,.mean-push").remove(),
            jQuery(t).removeClass("mean-container"),
            jQuery(n).css("display", g),
            (A = !1),
            (E = !1),
            jQuery(p).removeClass("mean-remove");
        },
        b = function () {
          var e = "background:" + l + ";color:" + l + ";" + w;
          if (o >= a) {
            jQuery(p).addClass("mean-remove"),
              (E = !0),
              jQuery(t).addClass("mean-container"),
              jQuery(".mean-container").prepend(
                '<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' +
                  e +
                  '">Show Navigation</a><nav class="mean-nav"></nav></div>'
              );
            var r = jQuery(n).html();
            jQuery(".mean-nav").html(r),
              Q &&
                jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function () {
                  jQuery(this).is(".mean-remove")
                    ? jQuery(this).attr("class", "mean-remove")
                    : jQuery(this).removeAttr("class"),
                    jQuery(this).removeAttr("id");
                }),
              jQuery(n).before('<div class="mean-push" />'),
              jQuery(".mean-push").css("margin-top", c),
              jQuery(n).hide(),
              jQuery(".meanmenu-reveal").show(),
              jQuery(v).html(s),
              (M = jQuery(v)),
              jQuery(".mean-nav ul").hide(),
              h
                ? d
                  ? (jQuery(".mean-nav ul ul").each(function () {
                      jQuery(this).children().length &&
                        jQuery(this, "li:first")
                          .parent()
                          .append(
                            '<a class="mean-expand" href="#" style="font-size: ' +
                              i +
                              '">' +
                              y +
                              "</a>"
                          );
                    }),
                    jQuery(".mean-expand").on("click", function (e) {
                      e.preventDefault(),
                        jQuery(this).hasClass("mean-clicked")
                          ? (jQuery(this).text(y),
                            jQuery(this)
                              .prev("ul")
                              .slideUp(300, function () {}))
                          : (jQuery(this).text(j),
                            jQuery(this)
                              .prev("ul")
                              .slideDown(300, function () {})),
                        jQuery(this).toggleClass("mean-clicked");
                    }))
                  : jQuery(".mean-nav ul ul").show()
                : jQuery(".mean-nav ul ul").hide(),
              jQuery(".mean-nav ul li").last().addClass("mean-last"),
              M.removeClass("meanclose"),
              jQuery(M).click(function (e) {
                e.preventDefault(),
                  A === !1
                    ? (M.css("text-align", "center"),
                      M.css("text-indent", "0"),
                      M.css("font-size", i),
                      jQuery(".mean-nav ul:first").slideDown(),
                      (A = !0))
                    : (jQuery(".mean-nav ul:first").slideUp(), (A = !1)),
                  M.toggleClass("meanclose"),
                  P(),
                  jQuery(p).addClass("mean-remove");
              }),
              f &&
                jQuery(".mean-nav ul > li > a:first-child").on(
                  "click",
                  function () {
                    jQuery(".mean-nav ul:first").slideUp(),
                      (A = !1),
                      jQuery(M).toggleClass("meanclose").html(s);
                  }
                );
          } else W();
        };
      C ||
        jQuery(window).resize(function () {
          (a = window.innerWidth || document.documentElement.clientWidth),
            a > o,
            W(),
            o >= a ? (b(), x()) : W();
        }),
        jQuery(window).resize(function () {
          (a = window.innerWidth || document.documentElement.clientWidth),
            C
              ? (x(), o >= a ? E === !1 && b() : W())
              : (W(), o >= a && (b(), x()));
        }),
        b();
    });
  };
})(jQuery);



