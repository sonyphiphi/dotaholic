var swfobject = (function () {
  var aq = "undefined",
    aD = "object",
    ab = "Shockwave Flash",
    X = "ShockwaveFlash.ShockwaveFlash",
    aE = "application/x-shockwave-flash",
    ac = "SWFObjectExprInst",
    ax = "onreadystatechange",
    af = window,
    aL = document,
    aB = navigator,
    aa = false,
    Z = [aN],
    aG = [],
    ag = [],
    al = [],
    aJ,
    ad,
    ap,
    at,
    ak = false,
    aU = false,
    aH,
    an,
    aI = true,
    ah = (function () {
      var a =
          typeof aL.getElementById != aq &&
          typeof aL.getElementsByTagName != aq &&
          typeof aL.createElement != aq,
        f = aB.userAgent.toLowerCase(),
        d = aB.platform.toLowerCase(),
        j = d ? /win/.test(d) : /win/.test(f),
        l = d ? /mac/.test(d) : /mac/.test(f),
        h = /webkit/.test(f)
          ? parseFloat(f.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1"))
          : false,
        e = !+"\v1",
        g = [0, 0, 0],
        m = null;
      if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
        m = aB.plugins[ab].description;
        if (
          m &&
          !(
            typeof aB.mimeTypes != aq &&
            aB.mimeTypes[aE] &&
            !aB.mimeTypes[aE].enabledPlugin
          )
        ) {
          aa = true;
          e = false;
          m = m.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          g[0] = parseInt(m.replace(/^(.*)\..*$/, "$1"), 10);
          g[1] = parseInt(m.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          g[2] = /[a-zA-Z]/.test(m)
            ? parseInt(m.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10)
            : 0;
        }
      } else {
        if (typeof af.ActiveXObject != aq) {
          try {
            var k = new ActiveXObject(X);
            if (k) {
              m = k.GetVariable("$version");
              if (m) {
                e = true;
                m = m.split(" ")[1].split(",");
                g = [
                  parseInt(m[0], 10),
                  parseInt(m[1], 10),
                  parseInt(m[2], 10),
                ];
              }
            }
          } catch (b) {}
        }
      }
      return { w3: a, pv: g, wk: h, ie: e, win: j, mac: l };
    })(),
    aK = (function () {
      if (!ah.w3) {
        return;
      }
      if (
        (typeof aL.readyState != aq && aL.readyState == "complete") ||
        (typeof aL.readyState == aq &&
          (aL.getElementsByTagName("body")[0] || aL.body))
      ) {
        aP();
      }
      if (!ak) {
        if (typeof aL.addEventListener != aq) {
          aL.addEventListener("DOMContentLoaded", aP, false);
        }
        if (ah.ie && ah.win) {
          aL.attachEvent(ax, function () {
            if (aL.readyState == "complete") {
              aL.detachEvent(ax, arguments.callee);
              aP();
            }
          });
          if (af == top) {
            (function () {
              if (ak) {
                return;
              }
              try {
                aL.documentElement.doScroll("left");
              } catch (a) {
                setTimeout(arguments.callee, 0);
                return;
              }
              aP();
            })();
          }
        }
        if (ah.wk) {
          (function () {
            if (ak) {
              return;
            }
            if (!/loaded|complete/.test(aL.readyState)) {
              setTimeout(arguments.callee, 0);
              return;
            }
            aP();
          })();
        }
        aC(aP);
      }
    })();
  function aP() {
    if (ak) {
      return;
    }
    try {
      var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
      b.parentNode.removeChild(b);
    } catch (a) {
      return;
    }
    ak = true;
    var e = Z.length;
    for (var d = 0; d < e; d++) {
      Z[d]();
    }
  }
  function aj(a) {
    if (ak) {
      a();
    } else {
      Z[Z.length] = a;
    }
  }
  function aC(a) {
    if (typeof af.addEventListener != aq) {
      af.addEventListener("load", a, false);
    } else {
      if (typeof aL.addEventListener != aq) {
        aL.addEventListener("load", a, false);
      } else {
        if (typeof af.attachEvent != aq) {
          aM(af, "onload", a);
        } else {
          if (typeof af.onload == "function") {
            var b = af.onload;
            af.onload = function () {
              b();
              a();
            };
          } else {
            af.onload = a;
          }
        }
      }
    }
  }
  function aN() {
    if (aa) {
      Y();
    } else {
      am();
    }
  }
  function Y() {
    var e = aL.getElementsByTagName("body")[0];
    var b = ar(aD);
    b.setAttribute("type", aE);
    var a = e.appendChild(b);
    if (a) {
      var d = 0;
      (function () {
        if (typeof a.GetVariable != aq) {
          var f = a.GetVariable("$version");
          if (f) {
            f = f.split(" ")[1].split(",");
            ah.pv = [
              parseInt(f[0], 10),
              parseInt(f[1], 10),
              parseInt(f[2], 10),
            ];
          }
        } else {
          if (d < 10) {
            d++;
            setTimeout(arguments.callee, 10);
            return;
          }
        }
        e.removeChild(b);
        a = null;
        am();
      })();
    } else {
      am();
    }
  }
  function am() {
    var h = aG.length;
    if (h > 0) {
      for (var j = 0; j < h; j++) {
        var d = aG[j].id;
        var n = aG[j].callbackFn;
        var a = { success: false, id: d };
        if (ah.pv[0] > 0) {
          var k = aS(d);
          if (k) {
            if (ao(aG[j].swfVersion) && !(ah.wk && ah.wk < 312)) {
              ay(d, true);
              if (n) {
                a.success = true;
                a.ref = av(d);
                n(a);
              }
            } else {
              if (aG[j].expressInstall && au()) {
                var f = {};
                f.data = aG[j].expressInstall;
                f.width = k.getAttribute("width") || "0";
                f.height = k.getAttribute("height") || "0";
                if (k.getAttribute("class")) {
                  f.styleclass = k.getAttribute("class");
                }
                if (k.getAttribute("align")) {
                  f.align = k.getAttribute("align");
                }
                var g = {};
                var e = k.getElementsByTagName("param");
                var m = e.length;
                for (var l = 0; l < m; l++) {
                  if (e[l].getAttribute("name").toLowerCase() != "movie") {
                    g[e[l].getAttribute("name")] = e[l].getAttribute("value");
                  }
                }
                ae(f, g, d, n);
              } else {
                aF(k);
                if (n) {
                  n(a);
                }
              }
            }
          }
        } else {
          ay(d, true);
          if (n) {
            var b = av(d);
            if (b && typeof b.SetVariable != aq) {
              a.success = true;
              a.ref = b;
            }
            n(a);
          }
        }
      }
    }
  }
  function av(b) {
    var e = null;
    var d = aS(b);
    if (d && d.nodeName == "OBJECT") {
      if (typeof d.SetVariable != aq) {
        e = d;
      } else {
        var a = d.getElementsByTagName(aD)[0];
        if (a) {
          e = a;
        }
      }
    }
    return e;
  }
  function au() {
    return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312);
  }
  function ae(g, e, j, f) {
    aU = true;
    ap = f || null;
    at = { success: false, id: j };
    var a = aS(j);
    if (a) {
      if (a.nodeName == "OBJECT") {
        aJ = aO(a);
        ad = null;
      } else {
        aJ = a;
        ad = j;
      }
      g.id = ac;
      if (
        typeof g.width == aq ||
        (!/%$/.test(g.width) && parseInt(g.width, 10) < 310)
      ) {
        g.width = "310";
      }
      if (
        typeof g.height == aq ||
        (!/%$/.test(g.height) && parseInt(g.height, 10) < 137)
      ) {
        g.height = "137";
      }
      aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
      var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
        d =
          "MMredirectURL=" +
          af.location.toString().replace(/&/g, "%26") +
          "&MMplayerType=" +
          b +
          "&MMdoctitle=" +
          aL.title;
      if (typeof e.flashvars != aq) {
        e.flashvars += "&" + d;
      } else {
        e.flashvars = d;
      }
      if (ah.ie && ah.win && a.readyState != 4) {
        var h = ar("div");
        j += "SWFObjectNew";
        h.setAttribute("id", j);
        a.parentNode.insertBefore(h, a);
        a.style.display = "none";
        (function () {
          if (a.readyState == 4) {
            a.parentNode.removeChild(a);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      aA(g, e, j);
    }
  }
  function aF(a) {
    if (ah.ie && ah.win && a.readyState != 4) {
      var b = ar("div");
      a.parentNode.insertBefore(b, a);
      b.parentNode.replaceChild(aO(a), b);
      a.style.display = "none";
      (function () {
        if (a.readyState == 4) {
          a.parentNode.removeChild(a);
        } else {
          setTimeout(arguments.callee, 10);
        }
      })();
    } else {
      a.parentNode.replaceChild(aO(a), a);
    }
  }
  function aO(b) {
    var e = ar("div");
    if (ah.win && ah.ie) {
      e.innerHTML = b.innerHTML;
    } else {
      var f = b.getElementsByTagName(aD)[0];
      if (f) {
        var a = f.childNodes;
        if (a) {
          var g = a.length;
          for (var d = 0; d < g; d++) {
            if (
              !(a[d].nodeType == 1 && a[d].nodeName == "PARAM") &&
              !(a[d].nodeType == 8)
            ) {
              e.appendChild(a[d].cloneNode(true));
            }
          }
        }
      }
    }
    return e;
  }
  function aA(f, h, d) {
    var e,
      a = aS(d);
    if (ah.wk && ah.wk < 312) {
      return e;
    }
    if (a) {
      if (typeof f.id == aq) {
        f.id = d;
      }
      if (ah.ie && ah.win) {
        var g = "";
        for (var k in f) {
          if (f[k] != Object.prototype[k]) {
            if (k.toLowerCase() == "data") {
              h.movie = f[k];
            } else {
              if (k.toLowerCase() == "styleclass") {
                g += ' class="' + f[k] + '"';
              } else {
                if (k.toLowerCase() != "classid") {
                  g += " " + k + '="' + f[k] + '"';
                }
              }
            }
          }
        }
        var j = "";
        for (var l in h) {
          if (h[l] != Object.prototype[l]) {
            j += '<param name="' + l + '" value="' + h[l] + '" />';
          }
        }
        a.outerHTML =
          '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
          g +
          ">" +
          j +
          "</object>";
        ag[ag.length] = f.id;
        e = aS(f.id);
      } else {
        var b = ar(aD);
        b.setAttribute("type", aE);
        for (var m in f) {
          if (f[m] != Object.prototype[m]) {
            if (m.toLowerCase() == "styleclass") {
              b.setAttribute("class", f[m]);
            } else {
              if (m.toLowerCase() != "classid") {
                b.setAttribute(m, f[m]);
              }
            }
          }
        }
        for (var n in h) {
          if (h[n] != Object.prototype[n] && n.toLowerCase() != "movie") {
            aQ(b, n, h[n]);
          }
        }
        a.parentNode.replaceChild(b, a);
        e = b;
      }
    }
    return e;
  }
  function aQ(b, e, d) {
    var a = ar("param");
    a.setAttribute("name", e);
    a.setAttribute("value", d);
    b.appendChild(a);
  }
  function aw(a) {
    var b = aS(a);
    if (b && b.nodeName == "OBJECT") {
      if (ah.ie && ah.win) {
        b.style.display = "none";
        (function () {
          if (b.readyState == 4) {
            aT(a);
          } else {
            setTimeout(arguments.callee, 10);
          }
        })();
      } else {
        b.parentNode.removeChild(b);
      }
    }
  }
  function aT(a) {
    var b = aS(a);
    if (b) {
      for (var d in b) {
        if (typeof b[d] == "function") {
          b[d] = null;
        }
      }
      b.parentNode.removeChild(b);
    }
  }
  function aS(a) {
    var d = null;
    try {
      d = aL.getElementById(a);
    } catch (b) {}
    return d;
  }
  function ar(a) {
    return aL.createElement(a);
  }
  function aM(a, d, b) {
    a.attachEvent(d, b);
    al[al.length] = [a, d, b];
  }
  function ao(a) {
    var b = ah.pv,
      d = a.split(".");
    d[0] = parseInt(d[0], 10);
    d[1] = parseInt(d[1], 10) || 0;
    d[2] = parseInt(d[2], 10) || 0;
    return b[0] > d[0] ||
      (b[0] == d[0] && b[1] > d[1]) ||
      (b[0] == d[0] && b[1] == d[1] && b[2] >= d[2])
      ? true
      : false;
  }
  function az(b, g, a, d) {
    if (ah.ie && ah.mac) {
      return;
    }
    var f = aL.getElementsByTagName("head")[0];
    if (!f) {
      return;
    }
    var h = a && typeof a == "string" ? a : "screen";
    if (d) {
      aH = null;
      an = null;
    }
    if (!aH || an != h) {
      var e = ar("style");
      e.setAttribute("type", "text/css");
      e.setAttribute("media", h);
      aH = f.appendChild(e);
      if (
        ah.ie &&
        ah.win &&
        typeof aL.styleSheets != aq &&
        aL.styleSheets.length > 0
      ) {
        aH = aL.styleSheets[aL.styleSheets.length - 1];
      }
      an = h;
    }
    if (ah.ie && ah.win) {
      if (aH && typeof aH.addRule == aD) {
        aH.addRule(b, g);
      }
    } else {
      if (aH && typeof aL.createTextNode != aq) {
        aH.appendChild(aL.createTextNode(b + " {" + g + "}"));
      }
    }
  }
  function ay(a, d) {
    if (!aI) {
      return;
    }
    var b = d ? "visible" : "hidden";
    if (ak && aS(a)) {
      aS(a).style.visibility = b;
    } else {
      az("#" + a, "visibility:" + b);
    }
  }
  function ai(b) {
    var a = /[\\\"<>\.;]/;
    var d = a.exec(b) != null;
    return d && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b;
  }
  var aR = (function () {
    if (ah.ie && ah.win) {
      window.attachEvent("onunload", function () {
        var a = al.length;
        for (var b = 0; b < a; b++) {
          al[b][0].detachEvent(al[b][1], al[b][2]);
        }
        var e = ag.length;
        for (var d = 0; d < e; d++) {
          aw(ag[d]);
        }
        for (var f in ah) {
          ah[f] = null;
        }
        ah = null;
        for (var g in swfobject) {
          swfobject[g] = null;
        }
        swfobject = null;
      });
    }
  })();
  return {
    registerObject: function (a, f, d, b) {
      if (ah.w3 && a && f) {
        var e = {};
        e.id = a;
        e.swfVersion = f;
        e.expressInstall = d;
        e.callbackFn = b;
        aG[aG.length] = e;
        ay(a, false);
      } else {
        if (b) {
          b({ success: false, id: a });
        }
      }
    },
    getObjectById: function (a) {
      if (ah.w3) {
        return av(a);
      }
    },
    embedSWF: function (m, f, j, g, d, a, b, k, h, l) {
      var e = { success: false, id: f };
      if (ah.w3 && !(ah.wk && ah.wk < 312) && m && f && j && g && d) {
        ay(f, false);
        aj(function () {
          j += "";
          g += "";
          var s = {};
          if (h && typeof h === aD) {
            for (var q in h) {
              s[q] = h[q];
            }
          }
          s.data = m;
          s.width = j;
          s.height = g;
          var p = {};
          if (k && typeof k === aD) {
            for (var r in k) {
              p[r] = k[r];
            }
          }
          if (b && typeof b === aD) {
            for (var n in b) {
              if (typeof p.flashvars != aq) {
                p.flashvars += "&" + n + "=" + b[n];
              } else {
                p.flashvars = n + "=" + b[n];
              }
            }
          }
          if (ao(d)) {
            var o = aA(s, p, f);
            if (s.id == f) {
              ay(f, true);
            }
            e.success = true;
            e.ref = o;
          } else {
            if (a && au()) {
              s.data = a;
              ae(s, p, f, l);
              return;
            } else {
              ay(f, true);
            }
          }
          if (l) {
            l(e);
          }
        });
      } else {
        if (l) {
          l(e);
        }
      }
    },
    switchOffAutoHideShow: function () {
      aI = false;
    },
    ua: ah,
    getFlashPlayerVersion: function () {
      return { major: ah.pv[0], minor: ah.pv[1], release: ah.pv[2] };
    },
    hasFlashPlayerVersion: ao,
    createSWF: function (a, b, d) {
      if (ah.w3) {
        return aA(a, b, d);
      } else {
        return undefined;
      }
    },
    showExpressInstall: function (b, a, e, d) {
      if (ah.w3 && au()) {
        ae(b, a, e, d);
      }
    },
    removeSWF: function (a) {
      if (ah.w3) {
        aw(a);
      }
    },
    createCSS: function (b, a, d, e) {
      if (ah.w3) {
        az(b, a, d, e);
      }
    },
    addDomLoadEvent: aj,
    addLoadEvent: aC,
    getQueryParamValue: function (b) {
      var a = aL.location.search || aL.location.hash;
      if (a) {
        if (/\?/.test(a)) {
          a = a.split("?")[1];
        }
        if (b == null) {
          return ai(a);
        }
        var d = a.split("&");
        for (var e = 0; e < d.length; e++) {
          if (d[e].substring(0, d[e].indexOf("=")) == b) {
            return ai(d[e].substring(d[e].indexOf("=") + 1));
          }
        }
      }
      return "";
    },
    expressInstallCallback: function () {
      if (aU) {
        var a = aS(ac);
        if (a && aJ) {
          a.parentNode.replaceChild(aJ, a);
          if (ad) {
            ay(ad, true);
            if (ah.ie && ah.win) {
              aJ.style.display = "block";
            }
          }
          if (ap) {
            ap(at);
          }
        }
        aU = false;
      }
    },
  };
})();
(function (a) {
  var b = function (e, g, d, f) {
    this.x1 = e;
    this.x2 = d;
    this.y1 = g;
    this.y2 = f;
  };
  b.prototype.contains = function (d) {
    return (
      this.x1 <= d.x1 && d.x2 <= this.x2 && this.y1 <= d.y1 && d.y2 <= this.y2
    );
  };
  b.prototype.transform = function (d, e) {
    return new b(this.x1 + d, this.y1 + e, this.x2 + d, this.y2 + e);
  };
  a.fn.positionBy = function (k) {
    var m = new Date();
    if (this.length == 0) {
      return this;
    }
    var k = a.extend(
      {
        target: null,
        targetPos: null,
        elementPos: null,
        x: null,
        y: null,
        positions: null,
        addClass: false,
        force: false,
        container: window,
        hideAfterPosition: false,
      },
      k
    );
    if (k.x != null) {
      var g = k.x;
      var h = k.y;
      var f = 0;
      var l = 0;
    } else {
      var d = a(a(k.target)[0]);
      var f = d.outerWidth();
      var l = d.outerHeight();
      var j = d.offset();
      var g = j.left;
      var h = j.top;
    }
    var e = g + f;
    var n = h + l;
    return this.each(function () {
      var E = a(this);
      if (!E.is(":visible")) {
        E.css({ left: -3000, top: -3000 }).show();
      }
      var F = E.outerWidth();
      var D = E.outerHeight();
      var u = [];
      var t = [];
      u[0] = new b(e, h, e + F, h + D);
      t[0] = [1, 7, 4];
      u[1] = new b(e, n - D, e + F, n);
      t[1] = [0, 6, 4];
      u[2] = new b(e, n, e + F, n + D);
      t[2] = [1, 3, 10];
      u[3] = new b(e - F, n, e, n + D);
      t[3] = [1, 6, 10];
      u[4] = new b(g, n, g + F, n + D);
      t[4] = [1, 6, 9];
      u[5] = new b(g - F, n, g, n + D);
      t[5] = [6, 4, 9];
      u[6] = new b(g - F, n - D, g, n);
      t[6] = [7, 1, 4];
      u[7] = new b(g - F, h, g, h + D);
      t[7] = [6, 0, 4];
      u[8] = new b(g - F, h - D, g, h);
      t[8] = [7, 9, 4];
      u[9] = new b(g, h - D, g + F, h);
      t[9] = [0, 7, 4];
      u[10] = new b(e - F, h - D, e, h);
      t[10] = [0, 7, 3];
      u[11] = new b(e, h - D, e + F, h);
      t[11] = [0, 10, 3];
      u[12] = new b(e - F, h, e, h + D);
      t[12] = [13, 7, 10];
      u[13] = new b(e - F, n - D, e, n);
      t[13] = [12, 6, 3];
      u[14] = new b(g, n - D, g + F, n);
      t[14] = [15, 1, 4];
      u[15] = new b(g, h, g + F, h + D);
      t[15] = [14, 0, 9];
      if (k.positions !== null) {
        var B = k.positions[0];
      } else {
        if (k.targetPos != null && k.elementPos != null) {
          var B = [];
          B[0] = [];
          B[0][0] = 15;
          B[0][1] = 7;
          B[0][2] = 8;
          B[0][3] = 9;
          B[1] = [];
          B[1][0] = 0;
          B[1][1] = 12;
          B[1][2] = 10;
          B[1][3] = 11;
          B[2] = [];
          B[2][0] = 2;
          B[2][1] = 3;
          B[2][2] = 13;
          B[2][3] = 1;
          B[3] = [];
          B[3][0] = 4;
          B[3][1] = 5;
          B[3][2] = 6;
          B[3][3] = 14;
          var B = B[k.targetPos][k.elementPos];
        }
      }
      var s = u[B];
      var r = B;
      if (!k.force) {
        $window = a(window);
        var C = $window.scrollLeft();
        var A = $window.scrollTop();
        var o = new b(C, A, C + $window.width(), A + $window.height());
        var z;
        if (k.positions) {
          z = k.positions;
        } else {
          z = [B];
        }
        var w = [];
        while (z.length > 0) {
          var q = z.shift();
          if (w[q]) {
            continue;
          }
          w[q] = true;
          if (!o.contains(u[q])) {
            if (k.positions === null) {
              z = jQuery.merge(z, t[q]);
            }
          } else {
            s = u[q];
            break;
          }
        }
      }
      E.parents().each(function () {
        var G = a(this);
        if (G.css("position") != "static") {
          var p = G.offset();
          s = s.transform(-p.left, -p.top);
          return false;
        }
      });
      var v = { left: s.x1, top: s.y1 };
      if (k.hideAfterPosition) {
        v.display = "none";
      }
      E.css(v);
      if (k.addClass) {
        E.removeClass(
          "positionBy0 positionBy1 positionBy2 positionBy3 positionBy4 positionBy5 positionBy6 positionBy7 positionBy8 positionBy9 positionBy10 positionBy11 positionBy12 positionBy13 positionBy14 positionBy15"
        ).addClass("positionBy" + q);
      }
    });
  };
})(jQuery);
(function ($) {
  $.extend({
    metadata: {
      defaults: {
        type: "class",
        name: "metadata",
        cre: /({.*})/,
        single: "metadata",
      },
      setType: function (type, name) {
        this.defaults.type = type;
        this.defaults.name = name;
      },
      get: function (elem, opts) {
        var settings = $.extend({}, this.defaults, opts);
        if (!settings.single.length) {
          settings.single = "metadata";
        }
        var data = $.data(elem, settings.single);
        if (data) {
          return data;
        }
        data = "{}";
        if (settings.type == "class") {
          var m = settings.cre.exec(elem.className);
          if (m) {
            data = m[1];
          }
        } else {
          if (settings.type == "elem") {
            if (!elem.getElementsByTagName) {
              return undefined;
            }
            var e = elem.getElementsByTagName(settings.name);
            if (e.length) {
              data = $.trim(e[0].innerHTML);
            }
          } else {
            if (elem.getAttribute != undefined) {
              var attr = elem.getAttribute(settings.name);
              if (attr) {
                data = attr;
              }
            }
          }
        }
        if (data.indexOf("{") < 0) {
          data = "{" + data + "}";
        }
        data = eval("(" + data + ")");
        $.data(elem, settings.single, data);
        return data;
      },
    },
  });
  $.fn.metadata = function (opts) {
    return $.metadata.get(this[0], opts);
  };
})(jQuery);
(function (a) {
  a.fn.hoverIntent = function (m, l) {
    var n = { sensitivity: 7, interval: 100, timeout: 0 };
    n = a.extend(n, l ? { over: m, out: l } : m);
    var p, o, j, e;
    var h = function (f) {
      p = f.pageX;
      o = f.pageY;
    };
    var d = function (g, f) {
      f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      if (Math.abs(j - p) + Math.abs(e - o) < n.sensitivity) {
        a(f).unbind("mousemove", h);
        f.hoverIntent_s = 1;
        return n.over.apply(f, [g]);
      } else {
        j = p;
        e = o;
        f.hoverIntent_t = setTimeout(function () {
          d(g, f);
        }, n.interval);
      }
    };
    var k = function (g, f) {
      f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      f.hoverIntent_s = 0;
      return n.out.apply(f, [g]);
    };
    var b = function (r) {
      var q =
        (r.type == "mouseover" ? r.fromElement : r.toElement) ||
        r.relatedTarget;
      while (q && q != this) {
        try {
          q = q.parentNode;
        } catch (r) {
          q = this;
        }
      }
      if (q == this) {
        return false;
      }
      var g = jQuery.extend({}, r);
      var f = this;
      if (f.hoverIntent_t) {
        f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      }
      if (r.type == "mouseover") {
        j = g.pageX;
        e = g.pageY;
        a(f).bind("mousemove.cluetip", h);
        if (f.hoverIntent_s != 1) {
          f.hoverIntent_t = setTimeout(function () {
            d(g, f);
          }, n.interval);
        }
      } else {
        a(f).unbind("mousemove.cluetip", h);
        if (f.hoverIntent_s == 1) {
          f.hoverIntent_t = setTimeout(function () {
            k(g, f);
          }, n.timeout);
        }
      }
    };
    return this.bind("mouseover.cluetip", b).bind("mouseout.cluetip", b);
  };
})(jQuery);
(function (a) {
  a.fn.bgIframe = a.fn.bgiframe = function (d) {
    if (a.browser.msie && /6.0/.test(navigator.userAgent)) {
      d = a.extend(
        {
          top: "auto",
          left: "auto",
          width: "auto",
          height: "auto",
          opacity: true,
          src: "javascript:false;",
        },
        d || {}
      );
      var e = function (f) {
        return f && f.constructor == Number ? f + "px" : f;
      };
      var b = document.createElement("iframe");
      b.setAttribute("class", "bgiframe");
      b.setAttribute("frameborder", "0");
      b.setAttribute("tabindex", "-1");
      b.setAttribute("src", d.src);
      b.setAttribute(
        "style",
        "display:block;position:absolute;z-index:-1;" +
          (d.opacity !== false ? "filter:Alpha(Opacity='0');" : "") +
          "top:" +
          (d.top == "auto"
            ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')"
            : e(d.top)) +
          ";left:" +
          (d.left == "auto"
            ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')"
            : e(d.left)) +
          ";width:" +
          (d.width == "auto"
            ? "expression(this.parentNode.offsetWidth+'px')"
            : e(d.width)) +
          ";height:" +
          (d.height == "auto"
            ? "expression(this.parentNode.offsetHeight+'px')"
            : e(d.height)) +
          ";"
      );
      return this.each(function () {
        if (a("> iframe.bgiframe", this).length == 0) {
          this.insertBefore(b, this.firstChild);
        }
      });
    }
    return this;
  };
})(jQuery);
jQuery.cookie = function (b, k, n) {
  if (typeof k != "undefined") {
    n = n || {};
    if (k === null) {
      k = "";
      n.expires = -1;
    }
    var f = "";
    if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
      var g;
      if (typeof n.expires == "number") {
        g = new Date();
        g.setTime(g.getTime() + n.expires * 24 * 60 * 60 * 1000);
      } else {
        g = n.expires;
      }
      f = "; expires=" + g.toUTCString();
    }
    var m = n.path ? "; path=" + n.path : "";
    var h = n.domain ? "; domain=" + n.domain : "";
    var a = n.secure ? "; secure" : "";
    document.cookie = [b, "=", encodeURIComponent(k), f, m, h, a].join("");
  } else {
    var e = null;
    if (document.cookie && document.cookie != "") {
      var l = document.cookie.split(";");
      for (var j = 0; j < l.length; j++) {
        var d = jQuery.trim(l[j]);
        if (d.substring(0, b.length + 1) == b + "=") {
          e = decodeURIComponent(d.substring(b.length + 1));
          break;
        }
      }
    }
    return e;
  }
};
(function (a) {
  a.fn.hoverIntent = function (m, l) {
    var n = { sensitivity: 7, interval: 50, timeout: 0 };
    n = a.extend(n, l ? { over: m, out: l } : m);
    var p, o, j, e;
    var h = function (f) {
      p = f.pageX;
      o = f.pageY;
    };
    var d = function (g, f) {
      f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      if (Math.abs(j - p) + Math.abs(e - o) < n.sensitivity) {
        a(f).unbind("mousemove", h);
        f.hoverIntent_s = 1;
        return n.over.apply(f, [g]);
      } else {
        j = p;
        e = o;
        f.hoverIntent_t = setTimeout(function () {
          d(g, f);
        }, n.interval);
      }
    };
    var k = function (g, f) {
      f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      f.hoverIntent_s = 0;
      return n.out.apply(f, [g]);
    };
    var b = function (q) {
      var g = jQuery.extend({}, q);
      var f = this;
      if (f.hoverIntent_t) {
        f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
      }
      if (q.type == "mouseenter") {
        j = g.pageX;
        e = g.pageY;
        a(f).bind("mousemove", h);
        if (f.hoverIntent_s != 1) {
          f.hoverIntent_t = setTimeout(function () {
            d(g, f);
          }, n.interval);
        }
      } else {
        a(f).unbind("mousemove", h);
        if (f.hoverIntent_s == 1) {
          f.hoverIntent_t = setTimeout(function () {
            k(g, f);
          }, n.timeout);
        }
      }
    };
    return this.bind("mouseenter", b).bind("mouseleave", b);
  };
})(jQuery);
(function (f) {
  f.prettyPhoto = { version: "3.1.3" };
  f.fn.prettyPhoto = function (h) {
    h = jQuery.extend(
      {
        animation_speed: "fast",
        slideshow: 5000,
        autoplay_slideshow: false,
        opacity: 0.8,
        show_title: true,
        allow_resize: true,
        default_width: 500,
        default_height: 344,
        counter_separator_label: "/",
        theme: "pp_default",
        horizontal_padding: 20,
        hideflash: false,
        wmode: "opaque",
        autoplay: true,
        modal: false,
        deeplinking: true,
        overlay_gallery: true,
        keyboard_shortcuts: true,
        changepicturecallback: function () {},
        callback: function () {},
        ie6_fallback: true,
        markup:
          '<div class="pp_pic_holder"> 						<div class="ppt">&nbsp;</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<a class="pp_close" href="#">Close</a> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<div class="clear_both"></div> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
        gallery_markup:
          '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
        image_markup: '<img id="fullResImage" src="{path}" />',
        flash_markup:
          '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
        quicktime_markup:
          '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
        iframe_markup:
          '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
        inline_markup: '<div class="pp_inline">{content}</div>',
        custom_markup: "",
        social_tools:
          '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>',
      },
      h
    );
    var p = this,
      o = false,
      v,
      t,
      u,
      w,
      B,
      C,
      k = f(window).height(),
      F = f(window).width(),
      l;
    (doresize = true), (scroll_pos = D());
    f(window)
      .unbind("resize.prettyphoto")
      .bind("resize.prettyphoto", function () {
        s();
        A();
      });
    if (h.keyboard_shortcuts) {
      f(document)
        .unbind("keydown.prettyphoto")
        .bind("keydown.prettyphoto", function (G) {
          if (typeof $pp_pic_holder != "undefined") {
            if ($pp_pic_holder.is(":visible")) {
              switch (G.keyCode) {
                case 37:
                  f.prettyPhoto.changePage("previous");
                  G.preventDefault();
                  break;
                case 39:
                  f.prettyPhoto.changePage("next");
                  G.preventDefault();
                  break;
                case 27:
                  if (!settings.modal) {
                    f.prettyPhoto.close();
                  }
                  G.preventDefault();
                  break;
              }
            }
          }
        });
    }
    f.prettyPhoto.initialize = function () {
      settings = h;
      if (settings.theme == "pp_default") {
        settings.horizontal_padding = 16;
      }
      if (
        settings.ie6_fallback &&
        f.browser.msie &&
        parseInt(f.browser.version) == 6
      ) {
        settings.theme = "light_square";
      }
      theRel = f(this).attr("rel");
      galleryRegExp = /\[(?:.*)\]/;
      isSet = galleryRegExp.exec(theRel) ? true : false;
      pp_images = isSet
        ? jQuery.map(p, function (H, G) {
            if (f(H).attr("rel").indexOf(theRel) != -1) {
              return f(H).attr("href");
            }
          })
        : f.makeArray(f(this).attr("href"));
      pp_titles = isSet
        ? jQuery.map(p, function (H, G) {
            if (f(H).attr("rel").indexOf(theRel) != -1) {
              return f(H).find("img").attr("alt")
                ? f(H).find("img").attr("alt")
                : "";
            }
          })
        : f.makeArray(f(this).find("img").attr("alt"));
      pp_descriptions = isSet
        ? jQuery.map(p, function (H, G) {
            if (f(H).attr("rel").indexOf(theRel) != -1) {
              return f(H).attr("title") ? f(H).attr("title") : "";
            }
          })
        : f.makeArray(f(this).attr("title"));
      if (pp_images.length > 30) {
        settings.overlay_gallery = false;
      }
      set_position = jQuery.inArray(f(this).attr("href"), pp_images);
      rel_index = isSet
        ? set_position
        : f("a[rel^='" + theRel + "']").index(f(this));
      j(this);
      if (settings.allow_resize) {
        f(window).bind("scroll.prettyphoto", function () {
          s();
        });
      }
      f.prettyPhoto.open();
      return false;
    };
    f.prettyPhoto.open = function (I) {
      if (typeof settings == "undefined") {
        settings = h;
        if (f.browser.msie && f.browser.version == 6) {
          settings.theme = "light_square";
        }
        pp_images = f.makeArray(arguments[0]);
        pp_titles = arguments[1] ? f.makeArray(arguments[1]) : f.makeArray("");
        pp_descriptions = arguments[2]
          ? f.makeArray(arguments[2])
          : f.makeArray("");
        isSet = pp_images.length > 1 ? true : false;
        set_position = 0;
        j(I.target);
      }
      if (f.browser.msie && f.browser.version == 6) {
        f("select").css("visibility", "hidden");
      }
      if (settings.hideflash) {
        f("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css(
          "visibility",
          "hidden"
        );
      }
      n(f(pp_images).size());
      f(".pp_loaderIcon").show();
      if (settings.deeplinking) {
        b();
      }
      if (settings.social_tools) {
        var G = location.href.split("#");
        var H =
          G[0] + rebuildHashTagData(["screen", ["screens", rel_index]], true);
        facebook_like_link = settings.social_tools.replace(
          "{location_href}",
          H
        );
        $pp_pic_holder.find(".pp_social").html(facebook_like_link);
      }
      if ($ppt.is(":hidden")) {
        $ppt.css("opacity", 0).show();
      }
      $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
      $pp_pic_holder
        .find(".currentTextHolder")
        .text(
          set_position +
            1 +
            settings.counter_separator_label +
            f(pp_images).size()
        );
      if (pp_descriptions[set_position] != "") {
        $pp_pic_holder
          .find(".pp_description")
          .show()
          .html(unescape(pp_descriptions[set_position]));
      } else {
        $pp_pic_holder.find(".pp_description").hide();
      }
      movie_width = parseFloat(a("width", pp_images[set_position]))
        ? a("width", pp_images[set_position])
        : settings.default_width.toString();
      movie_height = parseFloat(a("height", pp_images[set_position]))
        ? a("height", pp_images[set_position])
        : settings.default_height.toString();
      o = false;
      if (movie_height.indexOf("%") != -1) {
        movie_height = parseFloat(
          (f(window).height() * parseFloat(movie_height)) / 100 - 150
        );
        o = true;
      }
      if (movie_width.indexOf("%") != -1) {
        movie_width = parseFloat(
          (f(window).width() * parseFloat(movie_width)) / 100 - 150
        );
        o = true;
      }
      $pp_pic_holder.fadeIn(function () {
        settings.show_title &&
        pp_titles[set_position] != "" &&
        typeof pp_titles[set_position] != "undefined"
          ? $ppt.html(unescape(pp_titles[set_position]))
          : $ppt.html("&nbsp;");
        imgPreloader = "";
        skipInjection = false;
        switch (E(pp_images[set_position])) {
          case "image":
            imgPreloader = new Image();
            nextImage = new Image();
            if (isSet && set_position < f(pp_images).size() - 1) {
              nextImage.src = pp_images[set_position + 1];
            }
            prevImage = new Image();
            if (isSet && pp_images[set_position - 1]) {
              prevImage.src = pp_images[set_position - 1];
            }
            $pp_pic_holder.find(
              "#pp_full_res"
            )[0].innerHTML = settings.image_markup.replace(
              /{path}/g,
              pp_images[set_position]
            );
            imgPreloader.onload = function () {
              v = r(imgPreloader.width, imgPreloader.height);
              m();
            };
            imgPreloader.onerror = function () {
              alert(
                "Image cannot be loaded. Make sure the path is correct and image exist."
              );
              f.prettyPhoto.close();
            };
            imgPreloader.src = pp_images[set_position];
            break;
          case "youtube":
            v = r(movie_width, movie_height);
            movie_id = a("v", pp_images[set_position]);
            if (movie_id == "") {
              movie_id = pp_images[set_position].split("youtu.be/");
              movie_id = movie_id[1];
              if (movie_id.indexOf("?") > 0) {
                movie_id = movie_id.substr(0, movie_id.indexOf("?"));
              }
              if (movie_id.indexOf("&") > 0) {
                movie_id = movie_id.substr(0, movie_id.indexOf("&"));
              }
            }
            movie = "http://www.youtube.com/embed/" + movie_id;
            a("rel", pp_images[set_position])
              ? (movie += "?rel=" + a("rel", pp_images[set_position]))
              : (movie += "?rel=1");
            if (settings.autoplay) {
              movie += "&autoplay=1";
            }
            toInject = settings.iframe_markup
              .replace(/{width}/g, v.width)
              .replace(/{height}/g, v.height)
              .replace(/{wmode}/g, settings.wmode)
              .replace(/{path}/g, movie);
            break;
          case "vimeo":
            v = r(movie_width, movie_height);
            movie_id = pp_images[set_position];
            var K = /http:\/\/(www\.)?vimeo.com\/(\d+)/;
            var J = movie_id.match(K);
            movie =
              "http://player.vimeo.com/video/" +
              J[2] +
              "?title=0&amp;byline=0&amp;portrait=0";
            if (settings.autoplay) {
              movie += "&autoplay=1;";
            }
            vimeo_width = v.width + "/embed/?moog_width=" + v.width;
            toInject = settings.iframe_markup
              .replace(/{width}/g, vimeo_width)
              .replace(/{height}/g, v.height)
              .replace(/{path}/g, movie);
            break;
          case "quicktime":
            v = r(movie_width, movie_height);
            v.height += 15;
            v.contentHeight += 15;
            v.containerHeight += 15;
            toInject = settings.quicktime_markup
              .replace(/{width}/g, v.width)
              .replace(/{height}/g, v.height)
              .replace(/{wmode}/g, settings.wmode)
              .replace(/{path}/g, pp_images[set_position])
              .replace(/{autoplay}/g, settings.autoplay);
            break;
          case "flash":
            v = r(movie_width, movie_height);
            flash_vars = pp_images[set_position];
            flash_vars = flash_vars.substring(
              pp_images[set_position].indexOf("flashvars") + 10,
              pp_images[set_position].length
            );
            filename = pp_images[set_position];
            filename = filename.substring(0, filename.indexOf("?"));
            toInject = settings.flash_markup
              .replace(/{width}/g, v.width)
              .replace(/{height}/g, v.height)
              .replace(/{wmode}/g, settings.wmode)
              .replace(/{path}/g, filename + "?" + flash_vars);
            break;
          case "iframe":
            v = r(movie_width, movie_height);
            frame_url = pp_images[set_position];
            frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
            toInject = settings.iframe_markup
              .replace(/{width}/g, v.width)
              .replace(/{height}/g, v.height)
              .replace(/{path}/g, frame_url);
            break;
          case "ajax":
            doresize = false;
            v = r(movie_width, movie_height);
            doresize = true;
            skipInjection = true;
            f.get(pp_images[set_position], function (L) {
              toInject = settings.inline_markup.replace(/{content}/g, L);
              $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
              m();
            });
            break;
          case "custom":
            v = r(movie_width, movie_height);
            toInject = settings.custom_markup;
            break;
          case "inline":
            myClone = f(pp_images[set_position])
              .clone()
              .append('<br clear="all" />')
              .css({ width: settings.default_width })
              .wrapInner(
                '<div id="pp_full_res"><div class="pp_inline"></div></div>'
              )
              .appendTo(f("body"))
              .show();
            doresize = false;
            v = r(f(myClone).width(), f(myClone).height());
            doresize = true;
            f(myClone).remove();
            toInject = settings.inline_markup.replace(
              /{content}/g,
              f(pp_images[set_position]).html()
            );
            break;
        }
        if (!imgPreloader && !skipInjection) {
          $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
          m();
        }
      });
      return false;
    };
    f.prettyPhoto.changePage = function (G) {
      currentGalleryPage = 0;
      if (G == "previous") {
        set_position--;
        if (set_position < 0) {
          set_position = f(pp_images).size() - 1;
        }
      } else {
        if (G == "next") {
          set_position++;
          if (set_position > f(pp_images).size() - 1) {
            set_position = 0;
          }
        } else {
          set_position = G;
        }
      }
      rel_index = set_position;
      if (!doresize) {
        doresize = true;
      }
      f(".pp_contract").removeClass("pp_contract").addClass("pp_expand");
      q(function () {
        f.prettyPhoto.open();
      });
    };
    f.prettyPhoto.changeGalleryPage = function (G) {
      if (G == "next") {
        currentGalleryPage++;
        if (currentGalleryPage > totalPage) {
          currentGalleryPage = 0;
        }
      } else {
        if (G == "previous") {
          currentGalleryPage--;
          if (currentGalleryPage < 0) {
            currentGalleryPage = totalPage;
          }
        } else {
          currentGalleryPage = G;
        }
      }
      slide_speed =
        G == "next" || G == "previous" ? settings.animation_speed : 0;
      slide_to = currentGalleryPage * (itemsPerPage * itemWidth);
      $pp_gallery.find("ul").animate({ left: -slide_to }, slide_speed);
    };
    f.prettyPhoto.startSlideshow = function () {
      if (typeof l == "undefined") {
        $pp_pic_holder
          .find(".pp_play")
          .unbind("click")
          .removeClass("pp_play")
          .addClass("pp_pause")
          .click(function () {
            f.prettyPhoto.stopSlideshow();
            return false;
          });
        l = setInterval(f.prettyPhoto.startSlideshow, settings.slideshow);
      } else {
        f.prettyPhoto.changePage("next");
      }
    };
    f.prettyPhoto.stopSlideshow = function () {
      $pp_pic_holder
        .find(".pp_pause")
        .unbind("click")
        .removeClass("pp_pause")
        .addClass("pp_play")
        .click(function () {
          f.prettyPhoto.startSlideshow();
          return false;
        });
      clearInterval(l);
      l = undefined;
    };
    f.prettyPhoto.close = function () {
      if ($pp_overlay.is(":animated")) {
        return;
      }
      f.prettyPhoto.stopSlideshow();
      $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
      f("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(
        settings.animation_speed,
        function () {
          f(this).remove();
        }
      );
      $pp_overlay.fadeOut(settings.animation_speed, function () {
        if (f.browser.msie && f.browser.version == 6) {
          f("select").css("visibility", "visible");
        }
        if (settings.hideflash) {
          f("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css(
            "visibility",
            "visible"
          );
        }
        f(this).remove();
        f(window).unbind("scroll.prettyphoto");
        d();
        settings.callback();
        doresize = true;
        t = false;
        delete settings;
      });
    };
    function m() {
      f(".pp_loaderIcon").hide();
      projectedTop = scroll_pos.scrollTop + (k / 2 - v.containerHeight / 2);
      if (projectedTop < 0) {
        projectedTop = 0;
      }
      $ppt.fadeTo(settings.animation_speed, 1);
      $pp_pic_holder
        .find(".pp_content")
        .animate(
          { height: v.contentHeight, width: v.contentWidth },
          settings.animation_speed
        );
      $pp_pic_holder.animate(
        {
          top: projectedTop,
          left: F / 2 - v.containerWidth / 2,
          width: v.containerWidth,
        },
        settings.animation_speed,
        function () {
          $pp_pic_holder
            .find(".pp_hoverContainer,#fullResImage")
            .height(v.height)
            .width(v.width);
          $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);
          if (isSet && E(pp_images[set_position]) == "image") {
            $pp_pic_holder.find(".pp_hoverContainer").show();
          } else {
            $pp_pic_holder.find(".pp_hoverContainer").hide();
          }
          if (v.resized) {
            f("a.pp_expand,a.pp_contract").show();
          } else {
            f("a.pp_expand").hide();
          }
          if (settings.autoplay_slideshow && !l && !t) {
            f.prettyPhoto.startSlideshow();
          }
          settings.changepicturecallback();
          t = true;
        }
      );
      g();
    }
    function q(G) {
      $pp_pic_holder
        .find("#pp_full_res object,#pp_full_res embed")
        .css("visibility", "hidden");
      $pp_pic_holder
        .find(".pp_fade")
        .fadeOut(settings.animation_speed, function () {
          f(".pp_loaderIcon").show();
          G();
        });
    }
    function n(G) {
      G > 1 ? f(".pp_nav").show() : f(".pp_nav").hide();
    }
    function r(H, G) {
      resized = false;
      z(H, G);
      (imageWidth = H), (imageHeight = G);
      if ((C > F || B > k) && doresize && settings.allow_resize && !o) {
        (resized = true), (fitting = false);
        while (!fitting) {
          if (C > F) {
            imageWidth = F - 200;
            imageHeight = (G / H) * imageWidth;
          } else {
            if (B > k) {
              imageHeight = k - 200;
              imageWidth = (H / G) * imageHeight;
            } else {
              fitting = true;
            }
          }
          (B = imageHeight), (C = imageWidth);
        }
        z(imageWidth, imageHeight);
        if (C > F || B > k) {
          r(C, B);
        }
      }
      return {
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        containerHeight: Math.floor(B),
        containerWidth: Math.floor(C) + settings.horizontal_padding * 2,
        contentHeight: Math.floor(u),
        contentWidth: Math.floor(w),
        resized: resized,
      };
    }
    function z(H, G) {
      H = parseFloat(H);
      G = parseFloat(G);
      $pp_details = $pp_pic_holder.find(".pp_details");
      $pp_details.width(H);
      detailsHeight =
        parseFloat($pp_details.css("marginTop")) +
        parseFloat($pp_details.css("marginBottom"));
      $pp_details = $pp_details
        .clone()
        .addClass(settings.theme)
        .width(H)
        .appendTo(f("body"))
        .css({ position: "absolute", top: -10000 });
      detailsHeight += $pp_details.height();
      detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight;
      if (f.browser.msie && f.browser.version == 7) {
        detailsHeight += 8;
      }
      $pp_details.remove();
      $pp_title = $pp_pic_holder.find(".ppt");
      $pp_title.width(H);
      titleHeight =
        parseFloat($pp_title.css("marginTop")) +
        parseFloat($pp_title.css("marginBottom"));
      $pp_title = $pp_title
        .clone()
        .appendTo(f("body"))
        .css({ position: "absolute", top: -10000 });
      titleHeight += $pp_title.height();
      $pp_title.remove();
      u = G + detailsHeight;
      w = H;
      B =
        u +
        titleHeight +
        $pp_pic_holder.find(".pp_top").height() +
        $pp_pic_holder.find(".pp_bottom").height();
      C = H;
    }
    function E(G) {
      if (G.match(/youtube\.com\/watch/i) || G.match(/youtu\.be/i)) {
        return "youtube";
      } else {
        if (G.match(/vimeo\.com/i)) {
          return "vimeo";
        } else {
          if (G.match(/\b.mov\b/i)) {
            return "quicktime";
          } else {
            if (G.match(/\b.swf\b/i)) {
              return "flash";
            } else {
              if (G.match(/\biframe=true\b/i)) {
                return "iframe";
              } else {
                if (G.match(/\bajax=true\b/i)) {
                  return "ajax";
                } else {
                  if (G.match(/\bcustom=true\b/i)) {
                    return "custom";
                  } else {
                    if (G.substr(0, 1) == "#") {
                      return "inline";
                    } else {
                      return "image";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    function s() {
      if (doresize && typeof $pp_pic_holder != "undefined") {
        scroll_pos = D();
        (contentHeight = $pp_pic_holder.height()),
          (contentwidth = $pp_pic_holder.width());
        projectedTop = k / 2 + scroll_pos.scrollTop - contentHeight / 2;
        if (projectedTop < 0) {
          projectedTop = 0;
        }
        if (contentHeight > k) {
          return;
        }
        $pp_pic_holder.css({
          top: projectedTop,
          left: F / 2 + scroll_pos.scrollLeft - contentwidth / 2,
        });
      }
    }
    function D() {
      if (self.pageYOffset) {
        return { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset };
      } else {
        if (document.documentElement && document.documentElement.scrollTop) {
          return {
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft,
          };
        } else {
          if (document.body) {
            return {
              scrollTop: document.body.scrollTop,
              scrollLeft: document.body.scrollLeft,
            };
          }
        }
      }
    }
    function A() {
      (k = f(window).height()), (F = f(window).width());
      if (typeof $pp_overlay != "undefined") {
        $pp_overlay.height(f(document).height()).width(F);
      }
    }
    function g() {
      if (
        isSet &&
        settings.overlay_gallery &&
        E(pp_images[set_position]) == "image" &&
        settings.ie6_fallback &&
        !(f.browser.msie && parseInt(f.browser.version) == 6)
      ) {
        itemWidth = 52 + 5;
        navWidth =
          settings.theme == "facebook" || settings.theme == "pp_default"
            ? 50
            : 30;
        itemsPerPage = Math.floor(
          (v.containerWidth - 100 - navWidth) / itemWidth
        );
        itemsPerPage =
          itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length;
        totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
        if (totalPage == 0) {
          navWidth = 0;
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide();
        } else {
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show();
        }
        galleryWidth = itemsPerPage * itemWidth;
        fullGalleryWidth = pp_images.length * itemWidth;
        $pp_gallery
          .css("margin-left", -(galleryWidth / 2 + navWidth / 2))
          .find("div:first")
          .width(galleryWidth + 5)
          .find("ul")
          .width(fullGalleryWidth)
          .find("li.selected")
          .removeClass("selected");
        goToPage =
          Math.floor(set_position / itemsPerPage) < totalPage
            ? Math.floor(set_position / itemsPerPage)
            : totalPage;
        f.prettyPhoto.changeGalleryPage(goToPage);
        $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected");
      } else {
        $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave");
      }
    }
    function j(G) {
      if (settings.social_tools) {
        facebook_like_link = settings.social_tools.replace(
          "{location_href}",
          encodeURIComponent(location.href)
        );
      }
      settings.markup = settings.markup.replace(
        "{pp_social}",
        settings.social_tools ? facebook_like_link : ""
      );
      f("body").append(settings.markup);
      ($pp_pic_holder = f(".pp_pic_holder")),
        ($ppt = f(".ppt")),
        ($pp_overlay = f("div.pp_overlay"));
      if (isSet && settings.overlay_gallery) {
        currentGalleryPage = 0;
        toInject = "";
        for (var H = 0; H < pp_images.length; H++) {
          if (!pp_images[H].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
            classname = "default";
            img_src = "";
          } else {
            classname = "";
            img_src = pp_images[H];
          }
          toInject +=
            "<li class='" +
            classname +
            "'><a href='#'><img src='" +
            img_src +
            "' width='50' alt='' /></a></li>";
        }
        toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
        $pp_pic_holder.find("#pp_full_res").after(toInject);
        ($pp_gallery = f(".pp_pic_holder .pp_gallery")),
          ($pp_gallery_li = $pp_gallery.find("li"));
        $pp_gallery.find(".pp_arrow_next").click(function () {
          f.prettyPhoto.changeGalleryPage("next");
          f.prettyPhoto.stopSlideshow();
          return false;
        });
        $pp_gallery.find(".pp_arrow_previous").click(function () {
          f.prettyPhoto.changeGalleryPage("previous");
          f.prettyPhoto.stopSlideshow();
          return false;
        });
        $pp_pic_holder.find(".pp_content").hover(
          function () {
            $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn();
          },
          function () {
            $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut();
          }
        );
        itemWidth = 52 + 5;
        $pp_gallery_li.each(function (I) {
          f(this)
            .find("a")
            .click(function () {
              f.prettyPhoto.changePage(I);
              f.prettyPhoto.stopSlideshow();
              return false;
            });
        });
      }
      if (settings.slideshow) {
        $pp_pic_holder
          .find(".pp_nav")
          .prepend('<a href="#" class="pp_play">Play</a>');
        $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
          f.prettyPhoto.startSlideshow();
          return false;
        });
      }
      $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
      $pp_overlay
        .css({
          opacity: 0,
          height: f(document).height(),
          width: f(window).width(),
        })
        .bind("click", function () {
          if (!settings.modal) {
            f.prettyPhoto.close();
          }
        });
      f("a.pp_close").bind("click", function () {
        f.prettyPhoto.close();
        return false;
      });
      f("a.pp_expand").bind("click", function (I) {
        if (f(this).hasClass("pp_expand")) {
          f(this).removeClass("pp_expand").addClass("pp_contract");
          doresize = false;
        } else {
          f(this).removeClass("pp_contract").addClass("pp_expand");
          doresize = true;
        }
        q(function () {
          f.prettyPhoto.open();
        });
        return false;
      });
      $pp_pic_holder
        .find(".pp_previous, .pp_nav .pp_arrow_previous")
        .bind("click", function () {
          f.prettyPhoto.changePage("previous");
          f.prettyPhoto.stopSlideshow();
          return false;
        });
      $pp_pic_holder
        .find(".pp_next, .pp_nav .pp_arrow_next")
        .bind("click", function () {
          f.prettyPhoto.changePage("next");
          f.prettyPhoto.stopSlideshow();
          return false;
        });
      s();
    }
    if (!pp_alreadyInitialized && e()) {
      pp_alreadyInitialized = true;
      hashIndex = e();
      hashRel = hashIndex;
      hashIndex = hashIndex.substring(
        hashIndex.indexOf("/") + 1,
        hashIndex.length - 1
      );
      hashRel = hashRel.substring(0, hashRel.indexOf("/"));
      setTimeout(function () {
        f("a[rel^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click");
      }, 50);
    }
    return this.unbind("click.prettyphoto").bind(
      "click.prettyphoto",
      f.prettyPhoto.initialize
    );
  };
  function e() {
    url = location.href;
    hashtag =
      url.indexOf("#!") != -1
        ? decodeURI(url.substring(url.indexOf("#!") + 2, url.length))
        : false;
    return hashtag;
  }
  function b() {
    if (typeof theRel == "undefined") {
      return;
    }
    location.hash = "!" + theRel + "/" + rel_index + "/";
  }
  function d() {
    url = location.href;
    hashtag = url.indexOf("#!prettyPhoto") > -1 ? true : false;
    if (hashtag == true) {
      location.hash = "!prettyPhoto";
    }
  }
  function a(j, h) {
    j = j.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var g = "[\\?&]" + j + "=([^&#]*)";
    var l = new RegExp(g);
    var k = l.exec(h);
    return k == null ? "" : k[1];
  }
})(jQuery);
var pp_alreadyInitialized = false;
if (jQuery) {
  (function () {
    $.extend($.fn, {
      rightClick: function (a) {
        $(this).each(function () {
          $(this).mousedown(function (d) {
            var b = d;
            $(this).mouseup(function () {
              $(this).unbind("mouseup");
              if (b.button == 2) {
                a.call($(this), b);
                return false;
              } else {
                return true;
              }
            });
          });
          $(this)[0].oncontextmenu = function () {
            return false;
          };
        });
        return $(this);
      },
      rightMouseDown: function (a) {
        $(this).each(function () {
          $(this).mousedown(function (b) {
            if (b.button == 2) {
              a.call($(this), b);
              return false;
            } else {
              return true;
            }
          });
          $(this)[0].oncontextmenu = function () {
            return false;
          };
        });
        return $(this);
      },
      rightMouseUp: function (a) {
        $(this).each(function () {
          $(this).mouseup(function (b) {
            if (b.button == 2) {
              a.call($(this), b);
              return false;
            } else {
              return true;
            }
          });
          $(this)[0].oncontextmenu = function () {
            return false;
          };
        });
        return $(this);
      },
      noContext: function () {
        $(this).each(function () {
          $(this)[0].oncontextmenu = function () {
            return false;
          };
        });
        return $(this);
      },
    });
  })(jQuery);
}
(function (h, m, j) {
  var l = true,
    u = false,
    D = null,
    t,
    s,
    d,
    C = {},
    n = "ui-tooltip",
    f = "ui-widget",
    g = "ui-state-disabled",
    v = "div.qtip." + n,
    o = n + "-default",
    E = n + "-focus",
    e = n + "-hover",
    z = n + "-fluid",
    r = "-31000px",
    B = "_replacedByqTip",
    q = "oldtitle",
    p;
  function k() {
    k.history = k.history || [];
    k.history.push(arguments);
    if ("object" === typeof console) {
      var I = console[console.warn ? "warn" : "log"],
        H = Array.prototype.slice.call(arguments),
        G;
      if (typeof arguments[0] === "string") {
        H[0] = "qTip2: " + H[0];
      }
      G = I.apply ? I.apply(console, H) : I(H);
    }
  }
  function a(H) {
    var G;
    if (!H || "object" !== typeof H) {
      return u;
    }
    if (H.metadata === D || "object" !== typeof H.metadata) {
      H.metadata = { type: H.metadata };
    }
    if ("content" in H) {
      if (
        H.content === D ||
        "object" !== typeof H.content ||
        H.content.jquery
      ) {
        H.content = { text: H.content };
      }
      G = H.content.text || u;
      if (
        !h.isFunction(G) &&
        ((!G && !G.attr) ||
          G.length < 1 ||
          ("object" === typeof G && !G.jquery))
      ) {
        H.content.text = u;
      }
      if ("title" in H.content) {
        if (H.content.title === D || "object" !== typeof H.content.title) {
          H.content.title = { text: H.content.title };
        }
        G = H.content.title.text || u;
        if (
          !h.isFunction(G) &&
          ((!G && !G.attr) ||
            G.length < 1 ||
            ("object" === typeof G && !G.jquery))
        ) {
          H.content.title.text = u;
        }
      }
    }
    if ("position" in H) {
      if (H.position === D || "object" !== typeof H.position) {
        H.position = { my: H.position, at: H.position };
      }
    }
    if ("show" in H) {
      if (H.show === D || "object" !== typeof H.show) {
        if (H.show.jquery) {
          H.show = { target: H.show };
        } else {
          H.show = { event: H.show };
        }
      }
    }
    if ("hide" in H) {
      if (H.hide === D || "object" !== typeof H.hide) {
        if (H.hide.jquery) {
          H.hide = { target: H.hide };
        } else {
          H.hide = { event: H.hide };
        }
      }
    }
    if ("style" in H) {
      if (H.style === D || "object" !== typeof H.style) {
        H.style = { classes: H.style };
      }
    }
    h.each(s, function () {
      if (this.sanitize) {
        this.sanitize(H);
      }
    });
    return H;
  }
  function A(ac, I, W, X) {
    var V = this,
      R = document.body,
      O = n + "-" + W,
      J = 0,
      ab = 0,
      K = h(),
      S = ".qtip-" + W,
      T,
      U;
    V.id = W;
    V.rendered = u;
    V.elements = T = { target: ac };
    V.timers = { img: {} };
    V.options = I;
    V.checks = {};
    V.plugins = {};
    V.cache = U = { event: {}, target: h(), disabled: u, attr: X, onTarget: u };
    function L(af) {
      var ad = 0,
        ah,
        ae = I,
        ag = af.split(".");
      while ((ae = ae[ag[ad++]])) {
        if (ad < ag.length) {
          ah = ae;
        }
      }
      return [ah || I, ag.pop()];
    }
    function aa() {
      var ad = I.style.widget;
      K.toggleClass(f, ad).toggleClass(o, I.style["default"] && !ad);
      T.content.toggleClass(f + "-content", ad);
      if (T.titlebar) {
        T.titlebar.toggleClass(f + "-header", ad);
      }
      if (T.button) {
        T.button.toggleClass(n + "-icon", !ad);
      }
    }
    function G(ad) {
      if (T.title) {
        T.titlebar.remove();
        T.titlebar = T.title = T.button = D;
        if (ad !== u) {
          V.reposition();
        }
      }
    }
    function Y() {
      var ae = I.content.title.button,
        ad = typeof ae === "string",
        af = ad ? ae : "Close tooltip";
      if (T.button) {
        T.button.remove();
      }
      if (ae.jquery) {
        T.button = ae;
      } else {
        T.button = h("<a />", {
          class:
            "ui-state-default ui-tooltip-close " +
            (I.style.widget ? "" : n + "-icon"),
          title: af,
          "aria-label": af,
        }).prepend(
          h("<span />", { class: "ui-icon ui-icon-close", html: "&times;" })
        );
      }
      T.button
        .appendTo(T.titlebar)
        .attr("role", "button")
        .click(function (ag) {
          if (!K.hasClass(g)) {
            V.hide(ag);
          }
          return u;
        });
      V.redraw();
    }
    function N() {
      var ad = O + "-title";
      if (T.titlebar) {
        G();
      }
      T.titlebar = h("<div />", {
        class: n + "-titlebar " + (I.style.widget ? "ui-widget-header" : ""),
      })
        .append(
          (T.title = h("<div />", {
            id: ad,
            class: n + "-title",
            "aria-atomic": l,
          }))
        )
        .insertBefore(T.content)
        .delegate(
          ".ui-tooltip-close",
          "mousedown keydown mouseup keyup mouseout",
          function (ae) {
            h(this).toggleClass(
              "ui-state-active ui-state-focus",
              ae.type.substr(-4) === "down"
            );
          }
        )
        .delegate(".ui-tooltip-close", "mouseover mouseout", function (ae) {
          h(this).toggleClass("ui-state-hover", ae.type === "mouseover");
        });
      if (I.content.title.button) {
        Y();
      } else {
        if (V.rendered) {
          V.redraw();
        }
      }
    }
    function Q(ad) {
      var ae = T.button,
        af = T.title;
      if (!V.rendered) {
        return u;
      }
      if (!ad) {
        ae.remove();
      } else {
        if (!af) {
          N();
        }
        Y();
      }
    }
    function Z(af, ad) {
      var ae = T.title;
      if (!V.rendered || !af) {
        return u;
      }
      if (h.isFunction(af)) {
        af = af.call(ac, U.event, V);
      }
      if (af === u) {
        return G(u);
      } else {
        if (af.jquery && af.length > 0) {
          ae.empty().append(af.css({ display: "block" }));
        } else {
          ae.html(af);
        }
      }
      V.redraw();
      if (ad !== u && V.rendered && K.is(":visible")) {
        V.reposition(U.event);
      }
    }
    function P(af, ad) {
      var ae = T.content;
      if (!V.rendered || !af) {
        return u;
      }
      if (h.isFunction(af)) {
        af = af.call(ac, U.event, V) || "";
      }
      if (af.jquery && af.length > 0) {
        ae.empty().append(af.css({ display: "block" }));
      } else {
        ae.html(af);
      }
      function ag(ai) {
        var ah,
          aj = {};
        function ak(al) {
          if (al) {
            delete aj[al.src];
            clearTimeout(V.timers.img[al.src]);
            h(al).unbind(S);
          }
          if (h.isEmptyObject(aj)) {
            V.redraw();
            if (ad !== u) {
              V.reposition(U.event);
            }
            ai();
          }
        }
        if ((ah = ae.find("img:not([height]):not([width])")).length === 0) {
          return ak();
        }
        ah.each(function (am, ao) {
          if (aj[ao.src] !== j) {
            return;
          }
          var an = 0,
            al = 3;
          (function ap() {
            if (ao.height || ao.width || an > al) {
              return ak(ao);
            }
            an += 1;
            V.timers.img[ao.src] = setTimeout(ap, 700);
          })();
          h(ao).bind("error" + S + " load" + S, function () {
            ak(this);
          });
          aj[ao.src] = ao;
        });
      }
      if (V.rendered < 0) {
        K.queue("fx", ag);
      } else {
        ab = 0;
        ag(h.noop);
      }
      return V;
    }
    function H() {
      var ag = I.position,
        ae = {
          show: I.show.target,
          hide: I.hide.target,
          viewport: h(ag.viewport),
          document: h(document),
          body: h(document.body),
          window: h(m),
        },
        af = {
          show: h.trim("" + I.show.event).split(" "),
          hide: h.trim("" + I.hide.event).split(" "),
        },
        ad = h.browser.msie && parseInt(h.browser.version, 10) === 6;
      function ai(al) {
        if (K.hasClass(g)) {
          return u;
        }
        clearTimeout(V.timers.show);
        clearTimeout(V.timers.hide);
        var am = function () {
          V.toggle(l, al);
        };
        if (I.show.delay > 0) {
          V.timers.show = setTimeout(am, I.show.delay);
        } else {
          am();
        }
      }
      function ah(ao) {
        if (K.hasClass(g) || J || ab) {
          return u;
        }
        var am = h(ao.relatedTarget || ao.target),
          al = am.closest(v)[0] === K[0],
          an = am[0] === ae.show[0];
        clearTimeout(V.timers.show);
        clearTimeout(V.timers.hide);
        if (
          (ag.target === "mouse" && al) ||
          (I.hide.fixed && /mouse(out|leave|move)/.test(ao.type) && (al || an))
        ) {
          try {
            ao.preventDefault();
            ao.stopImmediatePropagation();
          } catch (ap) {}
          return;
        }
        if (I.hide.delay > 0) {
          V.timers.hide = setTimeout(function () {
            V.hide(ao);
          }, I.hide.delay);
        } else {
          V.hide(ao);
        }
      }
      function aj(al) {
        if (K.hasClass(g)) {
          return u;
        }
        clearTimeout(V.timers.inactive);
        V.timers.inactive = setTimeout(function () {
          V.hide(al);
        }, I.hide.inactive);
      }
      function ak(al) {
        if (K.is(":visible")) {
          V.reposition(al);
        }
      }
      K.bind("mouseenter" + S + " mouseleave" + S, function (al) {
        var am = al.type === "mouseenter";
        if (am) {
          V.focus(al);
        }
        K.toggleClass(e, am);
      });
      if (I.hide.fixed) {
        ae.hide = ae.hide.add(K);
        K.bind("mouseover" + S, function () {
          if (!K.hasClass(g)) {
            clearTimeout(V.timers.hide);
          }
        });
      }
      if (/mouse(out|leave)/i.test(I.hide.event)) {
        if (I.hide.leave === "window") {
          ae.window.bind("mouseout" + S + " blur" + S, function (al) {
            if (/select|option/.test(al.target) && !al.relatedTarget) {
              V.hide(al);
            }
          });
        }
      } else {
        if (/mouse(over|enter)/i.test(I.show.event)) {
          ae.hide.bind("mouseleave" + S, function (al) {
            clearTimeout(V.timers.show);
          });
        }
      }
      if (("" + I.hide.event).indexOf("unfocus") > -1) {
        ae.body.bind("mousedown" + S, function (an) {
          var al = h(an.target),
            am = !K.hasClass(g) && K.is(":visible");
          if (
            al[0] !== K[0] &&
            al.parents(v).length === 0 &&
            al.add(ac).length > 1 &&
            !al.attr("disabled")
          ) {
            V.hide(an);
          }
        });
      }
      if ("number" === typeof I.hide.inactive) {
        ae.show.bind("qtip-" + W + "-inactive", aj);
        h.each(t.inactiveEvents, function (al, am) {
          ae.hide.add(T.tooltip).bind(am + S + "-inactive", aj);
        });
      }
      h.each(af.hide, function (am, an) {
        var al = h.inArray(an, af.show),
          ao = h(ae.hide);
        if (
          (al > -1 && ao.add(ae.show).length === ao.length) ||
          an === "unfocus"
        ) {
          ae.show.bind(an + S, function (ap) {
            if (K.is(":visible")) {
              ah(ap);
            } else {
              ai(ap);
            }
          });
          delete af.show[al];
        } else {
          ae.hide.bind(an + S, ah);
        }
      });
      h.each(af.show, function (al, am) {
        ae.show.bind(am + S, ai);
      });
      if ("number" === typeof I.hide.distance) {
        ae.show.add(K).bind("mousemove" + S, function (ao) {
          var an = U.origin || {},
            am = I.hide.distance,
            al = Math.abs;
          if (al(ao.pageX - an.pageX) >= am || al(ao.pageY - an.pageY) >= am) {
            V.hide(ao);
          }
        });
      }
      if (ag.target === "mouse") {
        ae.show.bind("mousemove" + S, function (al) {
          d = { pageX: al.pageX, pageY: al.pageY, type: "mousemove" };
        });
        if (ag.adjust.mouse) {
          if (I.hide.event) {
            K.bind("mouseleave" + S, function (al) {
              if ((al.relatedTarget || al.target) !== ae.show[0]) {
                V.hide(al);
              }
            });
            T.target.bind("mouseenter" + S + " mouseleave" + S, function (al) {
              U.onTarget = al.type === "mouseenter";
            });
          }
          ae.document.bind("mousemove" + S, function (al) {
            if (U.onTarget && !K.hasClass(g) && K.is(":visible")) {
              V.reposition(al || d);
            }
          });
        }
      }
      if (ag.adjust.resize || ae.viewport.length) {
        (h.event.special.resize ? ae.viewport : ae.window).bind(
          "resize" + S,
          ak
        );
      }
      if (ae.viewport.length || (ad && K.css("position") === "fixed")) {
        ae.viewport.bind("scroll" + S, ak);
      }
    }
    function M() {
      var ad = [
        I.show.target[0],
        I.hide.target[0],
        V.rendered && T.tooltip[0],
        I.position.container[0],
        I.position.viewport[0],
        m,
        document,
      ];
      if (V.rendered) {
        h([])
          .pushStack(
            h.grep(ad, function (ae) {
              return typeof ae === "object";
            })
          )
          .unbind(S);
      } else {
        I.show.target.unbind(S + "-create");
      }
    }
    V.checks.builtin = {
      "^id$": function (af, ag, ad) {
        var ah = ad === l ? t.nextid : ad,
          ae = n + "-" + ah;
        if (ah !== u && ah.length > 0 && !h("#" + ae).length) {
          K[0].id = ae;
          T.content[0].id = ae + "-content";
          T.title[0].id = ae + "-title";
        }
      },
      "^content.text$": function (ae, af, ad) {
        P(ad);
      },
      "^content.title.text$": function (ae, af, ad) {
        if (!ad) {
          return G();
        }
        if (!T.title && ad) {
          N();
        }
        Z(ad);
      },
      "^content.title.button$": function (ae, af, ad) {
        Q(ad);
      },
      "^position.(my|at)$": function (ae, af, ad) {
        if ("string" === typeof ad) {
          ae[af] = new s.Corner(ad);
        }
      },
      "^position.container$": function (ae, af, ad) {
        if (V.rendered) {
          K.appendTo(ad);
        }
      },
      "^show.ready$": function () {
        if (!V.rendered) {
          V.render(1);
        } else {
          V.toggle(l);
        }
      },
      "^style.classes$": function (ae, af, ad) {
        K.attr("class", n + " qtip ui-helper-reset " + ad);
      },
      "^style.widget|content.title": aa,
      "^events.(render|show|move|hide|focus|blur)$": function (ae, af, ad) {
        K[(h.isFunction(ad) ? "" : "un") + "bind"]("tooltip" + af, ad);
      },
      "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
        var ad = I.position;
        K.attr("tracking", ad.target === "mouse" && ad.adjust.mouse);
        M();
        H();
      },
    };
    h.extend(V, {
      render: function (ad) {
        if (V.rendered) {
          return V;
        }
        var ag = I.content.text,
          af = I.content.title.text,
          ae = I.position,
          ah = h.Event("tooltiprender");
        h.attr(ac[0], "aria-describedby", O);
        K = T.tooltip = h("<div/>", {
          id: O,
          class:
            n +
            " qtip ui-helper-reset " +
            o +
            " " +
            I.style.classes +
            " " +
            n +
            "-pos-" +
            I.position.my.abbrev(),
          width: I.style.width || "",
          height: I.style.height || "",
          tracking: ae.target === "mouse" && ae.adjust.mouse,
          role: "alert",
          "aria-live": "polite",
          "aria-atomic": u,
          "aria-describedby": O + "-content",
          "aria-hidden": l,
        })
          .toggleClass(g, U.disabled)
          .data("qtip", V)
          .appendTo(I.position.container)
          .append(
            (T.content = h("<div />", {
              class: n + "-content",
              id: O + "-content",
              "aria-atomic": l,
            }))
          );
        V.rendered = -1;
        ab = 1;
        J = 1;
        if (af) {
          N();
          if (!h.isFunction(af)) {
            Z(af, u);
          }
        }
        if (!h.isFunction(ag)) {
          P(ag, u);
        }
        V.rendered = l;
        aa();
        h.each(I.events, function (ai, aj) {
          if (h.isFunction(aj)) {
            K.bind(
              ai === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + ai,
              aj
            );
          }
        });
        h.each(s, function () {
          if (this.initialize === "render") {
            this(V);
          }
        });
        H();
        K.queue("fx", function (ai) {
          ah.originalEvent = U.event;
          K.trigger(ah, [V]);
          ab = 0;
          J = 0;
          V.redraw();
          if (I.show.ready || ad) {
            V.toggle(l, U.event, u);
          }
          ai();
        });
        return V;
      },
      get: function (ae) {
        var ad, af;
        switch (ae.toLowerCase()) {
          case "dimensions":
            ad = { height: K.outerHeight(), width: K.outerWidth() };
            break;
          case "offset":
            ad = s.offset(K, I.position.container);
            break;
          default:
            af = L(ae.toLowerCase());
            ad = af[0][af[1]];
            ad = ad.precedance ? ad.string() : ad;
            break;
        }
        return ad;
      },
      set: function (ag, ah) {
        var af = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
          ai = /^content\.(title|attr)|style/i,
          aj = u,
          al = u,
          ae = V.checks,
          ad;
        function ak(ap, an) {
          var ao, aq, am;
          for (ao in ae) {
            for (aq in ae[ao]) {
              if ((am = new RegExp(aq, "i").exec(ap))) {
                an.push(am);
                ae[ao][aq].apply(V, an);
              }
            }
          }
        }
        if ("string" === typeof ag) {
          ad = ag;
          ag = {};
          ag[ad] = ah;
        } else {
          ag = h.extend(l, {}, ag);
        }
        h.each(ag, function (an, ao) {
          var ap = L(an.toLowerCase()),
            am;
          am = ap[0][ap[1]];
          ap[0][ap[1]] = "object" === typeof ao && ao.nodeType ? h(ao) : ao;
          ag[an] = [ap[0], ap[1], ao, am];
          aj = af.test(an) || aj;
          al = ai.test(an) || al;
        });
        a(I);
        J = ab = 1;
        h.each(ag, ak);
        J = ab = 0;
        if (K.is(":visible") && V.rendered) {
          if (aj) {
            V.reposition(I.position.target === "mouse" ? D : U.event);
          }
          if (al) {
            V.redraw();
          }
        }
        return V;
      },
      toggle: function (af, ag) {
        if (!V.rendered) {
          return af ? V.render(1) : V;
        }
        var al = af ? "show" : "hide",
          ad = I[al],
          ah = K.is(":visible"),
          ai = !ag || I[al].target.length < 2 || U.target[0] === ag.target,
          an = I.position,
          aj = I.content,
          ak,
          am;
        if ((typeof af).search("boolean|number")) {
          af = !ah;
        }
        if (!K.is(":animated") && ah === af && ai) {
          return V;
        }
        if (ag) {
          if (
            /over|enter/.test(ag.type) &&
            /out|leave/.test(U.event.type) &&
            ag.target === I.show.target[0] &&
            K.has(ag.relatedTarget).length
          ) {
            return V;
          }
          U.event = h.extend({}, ag);
        }
        am = h.Event("tooltip" + al);
        am.originalEvent = ag ? U.event : D;
        K.trigger(am, [V, 90]);
        if (am.isDefaultPrevented()) {
          return V;
        }
        h.attr(K[0], "aria-hidden", !!!af);
        if (af) {
          U.origin = h.extend({}, d);
          V.focus(ag);
          if (h.isFunction(aj.text)) {
            P(aj.text, u);
          }
          if (h.isFunction(aj.title.text)) {
            Z(aj.title.text, u);
          }
          if (!p && an.target === "mouse" && an.adjust.mouse) {
            h(document).bind("mousemove.qtip", function (ao) {
              d = { pageX: ao.pageX, pageY: ao.pageY, type: "mousemove" };
            });
            p = l;
          }
          V.reposition(ag, arguments[2]);
          if ((am.solo = !!ad.solo)) {
            h(v, ad.solo).not(K).qtip("hide", am);
          }
        } else {
          clearTimeout(V.timers.show);
          delete U.origin;
          if (p && !h(v + '[tracking="true"]:visible', ad.solo).not(K).length) {
            h(document).unbind("mousemove.qtip");
            p = u;
          }
          V.blur(ag);
        }
        function ae() {
          if (af) {
            if (h.browser.msie) {
              K[0].style.removeAttribute("filter");
            }
            K.css("overflow", "");
            if ("string" === typeof ad.autofocus) {
              h(ad.autofocus, K).focus();
            }
            am = h.Event("tooltipvisible");
            am.originalEvent = ag ? U.event : D;
            K.trigger(am, [V]);
            ad.target.trigger("qtip-" + W + "-inactive");
          } else {
            K.css({
              display: "",
              visibility: "",
              opacity: "",
              left: "",
              top: "",
            });
          }
        }
        if (ai) {
          K.stop(0, 1);
        }
        if (ad.effect === u) {
          K[al]();
          ae.call(K);
        } else {
          if (h.isFunction(ad.effect)) {
            ad.effect.call(K, V);
            K.queue("fx", function (ao) {
              ae();
              ao();
            });
          } else {
            K.fadeTo(90, af ? 1 : 0, ae);
          }
        }
        if (af) {
          ad.target.trigger("qtip-" + W + "-inactive");
        }
        return V;
      },
      show: function (ad) {
        return V.toggle(l, ad);
      },
      hide: function (ad) {
        return V.toggle(u, ad);
      },
      focus: function (ah) {
        if (!V.rendered) {
          return V;
        }
        var ai = h(v),
          af = parseInt(K[0].style.zIndex, 10),
          ae = t.zindex + ai.length,
          ag = h.extend({}, ah),
          ad,
          aj;
        if (!K.hasClass(E)) {
          aj = h.Event("tooltipfocus");
          aj.originalEvent = ag;
          K.trigger(aj, [V, ae]);
          if (!aj.isDefaultPrevented()) {
            if (af !== ae) {
              ai.each(function () {
                if (this.style.zIndex > af) {
                  this.style.zIndex = this.style.zIndex - 1;
                }
              });
              ai.filter("." + E).qtip("blur", ag);
            }
            K.addClass(E)[0].style.zIndex = ae;
          }
        }
        return V;
      },
      blur: function (ae) {
        var ad = h.extend({}, ae),
          af;
        K.removeClass(E);
        af = h.Event("tooltipblur");
        af.originalEvent = ad;
        K.trigger(af, [V]);
        return V;
      },
      reposition: function (au, ap) {
        if (!V.rendered || J) {
          return V;
        }
        J = 1;
        var ay = I.position.target,
          ax = I.position,
          an = ax.my,
          ao = ax.at,
          aq = ax.adjust,
          ae = aq.method.split(" "),
          av = K.outerWidth(),
          ar = K.outerHeight(),
          aj = 0,
          ak = 0,
          ai = h.Event("tooltipmove"),
          ag = K.css("position") === "fixed",
          aw = ax.viewport,
          az = { left: 0, top: 0 },
          al = ax.container,
          af = u,
          am = V.plugins.tip,
          ad = {
            horizontal: ae[0],
            vertical: (ae[1] = ae[1] || ae[0]),
            enabled:
              aw.jquery && ay[0] !== m && ay[0] !== R && aq.method !== "none",
            left: function (aE) {
              var aA = ad.horizontal === "shift",
                aD = -al.offset.left + aw.offset.left + aw.scrollLeft,
                aB = an.x === "left" ? av : an.x === "right" ? -av : -av / 2,
                at = ao.x === "left" ? aj : ao.x === "right" ? -aj : -aj / 2,
                aG = am && am.size ? am.size.width || 0 : 0,
                aJ =
                  am && am.corner && am.corner.precedance === "x" && !aA
                    ? aG
                    : 0,
                aI = aD - aE + aJ,
                aC = aE + av - aw.width - aD + aJ,
                aF =
                  aB -
                  (an.precedance === "x" || an.x === an.y ? at : 0) -
                  (ao.x === "center" ? aj / 2 : 0),
                aH = an.x === "center";
              if (aA) {
                aJ = am && am.corner && am.corner.precedance === "y" ? aG : 0;
                aF = (an.x === "left" ? 1 : -1) * aB - aJ;
                az.left += aI > 0 ? aI : aC > 0 ? -aC : 0;
                az.left = Math.max(
                  -al.offset.left +
                    aw.offset.left +
                    (aJ && am.corner.x === "center" ? am.offset : 0),
                  aE - aF,
                  Math.min(
                    Math.max(
                      -al.offset.left + aw.offset.left + aw.width,
                      aE + aF
                    ),
                    az.left
                  )
                );
              } else {
                if (aI > 0 && (an.x !== "left" || aC > 0)) {
                  az.left -= aF;
                } else {
                  if (aC > 0 && (an.x !== "right" || aI > 0)) {
                    az.left -= aH ? -aF : aF;
                  }
                }
                if (az.left !== aE && aH) {
                  az.left -= aq.x;
                }
                if (az.left < aD && -az.left > aC) {
                  az.left = aE;
                }
              }
              return az.left - aE;
            },
            top: function (aG) {
              var aA = ad.vertical === "shift",
                aE = -al.offset.top + aw.offset.top + aw.scrollTop,
                aB = an.y === "top" ? ar : an.y === "bottom" ? -ar : -ar / 2,
                aH = ao.y === "top" ? ak : ao.y === "bottom" ? -ak : -ak / 2,
                at = am && am.size ? am.size.height || 0 : 0,
                aJ =
                  am && am.corner && am.corner.precedance === "y" && !aA
                    ? at
                    : 0,
                aC = aE - aG + aJ,
                aD = aG + ar - aw.height - aE + aJ,
                aF =
                  aB -
                  (an.precedance === "y" || an.x === an.y ? aH : 0) -
                  (ao.y === "center" ? ak / 2 : 0),
                aI = an.y === "center";
              if (aA) {
                aJ = am && am.corner && am.corner.precedance === "x" ? at : 0;
                aF = (an.y === "top" ? 1 : -1) * aB - aJ;
                az.top += aC > 0 ? aC : aD > 0 ? -aD : 0;
                az.top = Math.max(
                  -al.offset.top +
                    aw.offset.top +
                    (aJ && am.corner.x === "center" ? am.offset : 0),
                  aG - aF,
                  Math.min(
                    Math.max(
                      -al.offset.top + aw.offset.top + aw.height,
                      aG + aF
                    ),
                    az.top
                  )
                );
              } else {
                if (aC > 0 && (an.y !== "top" || aD > 0)) {
                  az.top -= aF;
                } else {
                  if (aD > 0 && (an.y !== "bottom" || aC > 0)) {
                    console.log("test");
                    az.top -= aI ? -aF : aF;
                  }
                }
                if (az.top !== aG && aI) {
                  az.top -= aq.y;
                }
                if (az.top < 0 && -az.top > aD) {
                  az.top = aG;
                }
              }
              return az.top - aG;
            },
          },
          ah;
        if (h.isArray(ay) && ay.length === 2) {
          ao = { x: "left", y: "top" };
          az = { left: ay[0], top: ay[1] };
        } else {
          if (ay === "mouse" && ((au && au.pageX) || U.event.pageX)) {
            ao = { x: "left", y: "top" };
            au =
              (au && (au.type === "resize" || au.type === "scroll")
                ? U.event
                : au && au.pageX && au.type === "mousemove"
                ? au
                : d && d.pageX && (aq.mouse || !au || !au.pageX)
                ? { pageX: d.pageX, pageY: d.pageY }
                : !aq.mouse && U.origin && U.origin.pageX && I.show.distance
                ? U.origin
                : au) ||
              au ||
              U.event ||
              d ||
              {};
            az = { top: au.pageY, left: au.pageX };
          } else {
            if (ay === "event") {
              if (
                au &&
                au.target &&
                au.type !== "scroll" &&
                au.type !== "resize"
              ) {
                ay = U.target = h(au.target);
              } else {
                ay = U.target;
              }
            } else {
              ay = U.target = h(ay.jquery ? ay : T.target);
            }
            ay = h(ay).eq(0);
            if (ay.length === 0) {
              return V;
            } else {
              if (ay[0] === document || ay[0] === m) {
                aj = s.iOS ? m.innerWidth : ay.width();
                ak = s.iOS ? m.innerHeight : ay.height();
                if (ay[0] === m) {
                  az = {
                    top: (aw || ay).scrollTop(),
                    left: (aw || ay).scrollLeft(),
                  };
                }
              } else {
                if (ay.is("area") && s.imagemap) {
                  az = s.imagemap(ay, ao, ad.enabled ? ae : u);
                } else {
                  if (
                    ay[0].namespaceURI === "http://www.w3.org/2000/svg" &&
                    s.svg
                  ) {
                    az = s.svg(ay, ao);
                  } else {
                    aj = ay.outerWidth();
                    ak = ay.outerHeight();
                    az = s.offset(ay, al);
                  }
                }
              }
            }
            if (az.offset) {
              aj = az.width;
              ak = az.height;
              af = az.flipoffset;
              az = az.offset;
            }
            if (
              (s.iOS < 4.1 && s.iOS > 3.1) ||
              s.iOS == 4.3 ||
              (!s.iOS && ag)
            ) {
              ah = h(m);
              az.left -= ah.scrollLeft();
              az.top -= ah.scrollTop();
            }
            az.left += ao.x === "right" ? aj : ao.x === "center" ? aj / 2 : 0;
            az.top += ao.y === "bottom" ? ak : ao.y === "center" ? ak / 2 : 0;
          }
        }
        az.left +=
          aq.x + (an.x === "right" ? -av : an.x === "center" ? -av / 2 : 0);
        az.top +=
          aq.y + (an.y === "bottom" ? -ar : an.y === "center" ? -ar / 2 : 0);
        if (ad.enabled) {
          aw = {
            elem: aw,
            height: aw[(aw[0] === m ? "h" : "outerH") + "eight"](),
            width: aw[(aw[0] === m ? "w" : "outerW") + "idth"](),
            scrollLeft: ag ? 0 : aw.scrollLeft(),
            scrollTop: ag ? 0 : aw.scrollTop(),
            offset: aw.offset() || { left: 0, top: 0 },
          };
          al = {
            elem: al,
            scrollLeft: al.scrollLeft(),
            scrollTop: al.scrollTop(),
            offset: al.offset() || { left: 0, top: 0 },
          };
          az.adjusted = {
            left: ad.horizontal !== "none" ? ad.left(az.left) : 0,
            top: ad.vertical !== "none" ? ad.top(az.top) : 0,
          };
          if (az.adjusted.left + az.adjusted.top) {
            K.attr(
              "class",
              K[0].className.replace(
                /ui-tooltip-pos-\w+/i,
                n + "-pos-" + an.abbrev()
              )
            );
          }
          if (af && az.adjusted.left) {
            az.left += af.left;
          }
          if (af && az.adjusted.top) {
            az.top += af.top;
          }
        } else {
          az.adjusted = { left: 0, top: 0 };
        }
        ai.originalEvent = h.extend({}, au);
        K.trigger(ai, [V, az, aw.elem || aw]);
        if (ai.isDefaultPrevented()) {
          return V;
        }
        delete az.adjusted;
        if (
          ap === u ||
          isNaN(az.left) ||
          isNaN(az.top) ||
          ay === "mouse" ||
          !h.isFunction(ax.effect)
        ) {
          K.css(az);
        } else {
          if (h.isFunction(ax.effect)) {
            ax.effect.call(K, V, h.extend({}, az));
            K.queue(function (at) {
              h(this).css({ opacity: "", height: "" });
              if (h.browser.msie) {
                this.style.removeAttribute("filter");
              }
              at();
            });
          }
        }
        J = 0;
        return V;
      },
      redraw: function () {
        if (V.rendered < 1 || ab) {
          return V;
        }
        var ae = I.position.container,
          ag,
          ah,
          ad,
          af;
        ab = 1;
        if (I.style.height) {
          K.css("height", I.style.height);
        }
        if (I.style.width) {
          K.css("width", I.style.width);
        } else {
          K.css("width", "").addClass(z);
          ah = K.width() + 1;
          ad = K.css("max-width") || "";
          af = K.css("min-width") || "";
          ag = (ad + af).indexOf("%") > -1 ? ae.width() / 100 : 0;
          ad = (ad.indexOf("%") > -1 ? ag : 1) * parseInt(ad, 10) || ah;
          af = (af.indexOf("%") > -1 ? ag : 1) * parseInt(af, 10) || 0;
          ah = ad + af ? Math.min(Math.max(ah, af), ad) : ah;
          K.css("width", Math.round(ah)).removeClass(z);
        }
        ab = 0;
        return V;
      },
      disable: function (ad) {
        if ("boolean" !== typeof ad) {
          ad = !(K.hasClass(g) || U.disabled);
        }
        if (V.rendered) {
          K.toggleClass(g, ad);
          h.attr(K[0], "aria-disabled", ad);
        } else {
          U.disabled = !!ad;
        }
        return V;
      },
      enable: function () {
        return V.disable(u);
      },
      destroy: function () {
        var ad = ac[0],
          ae = h.attr(ad, q),
          af = ac.data("qtip");
        if (V.rendered) {
          K.remove();
          h.each(V.plugins, function () {
            if (this.destroy) {
              this.destroy();
            }
          });
        }
        clearTimeout(V.timers.show);
        clearTimeout(V.timers.hide);
        M();
        if (!af || V === af) {
          h.removeData(ad, "qtip");
          if (I.suppress && ae) {
            h.attr(ad, "title", ae);
            ac.removeAttr(q);
          }
          ac.removeAttr("aria-describedby");
        }
        ac.unbind(".qtip-" + W);
        delete C[V.id];
        return ac;
      },
    });
  }
  function w(H, G) {
    var K,
      T,
      O,
      I,
      R,
      J = h(this),
      L = h(document.body),
      Q = this === document ? L : J,
      P = J.metadata ? J.metadata(G.metadata) : D,
      S = G.metadata.type === "html5" && P ? P[G.metadata.name] : D,
      M = J.data(G.metadata.name || "qtipopts");
    try {
      M = typeof M === "string" ? new Function("return " + M)() : M;
    } catch (N) {
      k("Unable to parse HTML5 attribute data: " + M);
    }
    I = h.extend(
      l,
      {},
      t.defaults,
      G,
      typeof M === "object" ? a(M) : D,
      a(S || P)
    );
    T = I.position;
    I.id = H;
    if ("boolean" === typeof I.content.text) {
      O = J.attr(I.content.attr);
      if (I.content.attr !== u && O) {
        I.content.text = O;
      } else {
        k(
          "Unable to locate content for tooltip! Aborting render of tooltip on element: ",
          J
        );
        return u;
      }
    }
    if (!T.container.length) {
      T.container = L;
    }
    if (T.target === u) {
      T.target = Q;
    }
    if (I.show.target === u) {
      I.show.target = Q;
    }
    if (I.show.solo === l) {
      I.show.solo = L;
    }
    if (I.hide.target === u) {
      I.hide.target = Q;
    }
    if (I.position.viewport === l) {
      I.position.viewport = T.container;
    }
    T.at = new s.Corner(T.at);
    T.my = new s.Corner(T.my);
    if (h.data(this, "qtip")) {
      if (I.overwrite) {
        J.qtip("destroy");
      } else {
        if (I.overwrite === u) {
          return u;
        }
      }
    }
    if (I.suppress && (R = h.attr(this, "title"))) {
      h(this).removeAttr("title").attr(q, R);
    }
    K = new A(J, I, H, !!O);
    h.data(this, "qtip", K);
    J.bind("remove.qtip-" + H, function () {
      K.destroy();
    });
    return K;
  }
  t = h.fn.qtip = function (H, L, M) {
    var N = ("" + H).toLowerCase(),
      K = D,
      G = h.makeArray(arguments).slice(1),
      J = G[G.length - 1],
      I = this[0] ? h.data(this[0], "qtip") : D;
    if ((!arguments.length && I) || N === "api") {
      return I;
    } else {
      if ("string" === typeof H) {
        this.each(function () {
          var O = h.data(this, "qtip");
          if (!O) {
            return l;
          }
          if (J && J.timeStamp) {
            O.cache.event = J;
          }
          if ((N === "option" || N === "options") && L) {
            if (h.isPlainObject(L) || M !== j) {
              O.set(L, M);
            } else {
              K = O.get(L);
              return u;
            }
          } else {
            if (O[N]) {
              O[N].apply(O[N], G);
            }
          }
        });
        return K !== D ? K : this;
      } else {
        if ("object" === typeof H || !arguments.length) {
          I = a(h.extend(l, {}, H));
          return t.bind.call(this, I, J);
        }
      }
    }
  };
  t.bind = function (H, G) {
    return this.each(function (L) {
      var J, I, K, N, M, P;
      P = h.isArray(H.id) ? H.id[L] : H.id;
      P = !P || P === u || P.length < 1 || C[P] ? t.nextid++ : (C[P] = P);
      N = ".qtip-" + P + "-create";
      M = w.call(this, P, H);
      if (M === u) {
        return l;
      }
      J = M.options;
      h.each(s, function () {
        if (this.initialize === "initialize") {
          this(M);
        }
      });
      I = { show: J.show.target, hide: J.hide.target };
      K = {
        show: h.trim("" + J.show.event).replace(/ /g, N + " ") + N,
        hide: h.trim("" + J.hide.event).replace(/ /g, N + " ") + N,
      };
      if (
        /mouse(over|enter)/i.test(K.show) &&
        !/mouse(out|leave)/i.test(K.hide)
      ) {
        K.hide += " mouseleave" + N;
      }
      I.show.bind("mousemove" + N, function (Q) {
        d = { pageX: Q.pageX, pageY: Q.pageY, type: "mousemove" };
        M.cache.onTarget = l;
      });
      function O(R) {
        function Q() {
          M.render(typeof R === "object" || J.show.ready);
          I.show.add(I.hide).unbind(N);
        }
        if (M.cache.disabled) {
          return u;
        }
        M.cache.event = h.extend({}, R);
        M.cache.target = R ? h(R.target) : [j];
        if (J.show.delay > 0) {
          clearTimeout(M.timers.show);
          M.timers.show = setTimeout(Q, J.show.delay);
          if (K.show !== K.hide) {
            I.hide.bind(K.hide, function () {
              clearTimeout(M.timers.show);
            });
          }
        } else {
          Q();
        }
      }
      I.show.bind(K.show, O);
      if (J.show.ready || J.prerender) {
        O(G);
      }
    });
  };
  s = t.plugins = {
    Corner: function (G) {
      G = ("" + G)
        .replace(/([A-Z])/, " $1")
        .replace(/middle/gi, "center")
        .toLowerCase();
      this.x = (G.match(/left|right/i) ||
        G.match(/center/) || ["inherit"])[0].toLowerCase();
      this.y = (G.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
      var H = G.charAt(0);
      this.precedance = H === "t" || H === "b" ? "y" : "x";
      this.string = function () {
        return this.precedance === "y" ? this.y + this.x : this.x + this.y;
      };
      this.abbrev = function () {
        var I = this.x.substr(0, 1),
          J = this.y.substr(0, 1);
        return I === J
          ? I
          : I === "c" || (I !== "c" && J !== "c")
          ? J + I
          : I + J;
      };
      this.clone = function () {
        return {
          x: this.x,
          y: this.y,
          precedance: this.precedance,
          string: this.string,
          abbrev: this.abbrev,
          clone: this.clone,
        };
      };
    },
    offset: function (I, G) {
      var L = I.offset(),
        N = G,
        O = 0,
        K = document.body,
        H,
        J;
      function M(Q, P) {
        L.left += P * Q.scrollLeft();
        L.top += P * Q.scrollTop();
      }
      if (N) {
        do {
          if (N.css("position") !== "static") {
            H =
              N[0] === K
                ? {
                    left: parseInt(N.css("left"), 10) || 0,
                    top: parseInt(N.css("top"), 10) || 0,
                  }
                : N.position();
            L.left -=
              H.left +
              (parseInt(N.css("borderLeftWidth"), 10) || 0) +
              (parseInt(N.css("marginLeft"), 10) || 0);
            L.top -= H.top + (parseInt(N.css("borderTopWidth"), 10) || 0);
            J = N.css("overflow");
            if (J === "scroll" || J === "auto") {
              O++;
            }
          }
          if (N[0] === K) {
            break;
          }
        } while ((N = N.offsetParent()));
        if (G[0] !== K && O) {
          M(G, 1);
        }
      }
      return L;
    },
    iOS:
      parseFloat(
        (
          "" +
          (/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(
            navigator.userAgent
          ) || [0, ""])[1]
        )
          .replace("undefined", "3_2")
          .replace("_", ".")
      ) || u,
    fn: {
      attr: function (G, K) {
        if (this.length) {
          var H = this[0],
            J = "title",
            I = h.data(H, "qtip");
          if (G === J && I && "object" === typeof I && I.options.suppress) {
            if (arguments.length < 2) {
              return h.attr(H, q);
            } else {
              if (I && I.options.content.attr === J && I.cache.attr) {
                I.set("content.text", K);
              }
              return this.attr(q, K);
            }
          }
        }
        return h.fn["attr" + B].apply(this, arguments);
      },
      clone: function (H) {
        var J = h([]),
          I = "title",
          G = h.fn["clone" + B].apply(this, arguments);
        if (!H) {
          G.filter("[" + q + "]")
            .attr("title", function () {
              return h.attr(this, q);
            })
            .removeAttr(q);
        }
        return G;
      },
      remove: h.ui
        ? D
        : function (G, H) {
            if (h.ui) {
              return;
            }
            h(this).each(function () {
              if (!H) {
                if (!G || h.filter(G, [this]).length) {
                  h("*", this)
                    .add(this)
                    .each(function () {
                      h(this).triggerHandler("remove");
                    });
                }
              }
            });
          },
    },
  };
  h.each(s.fn, function (H, I) {
    if (!I || h.fn[H + B]) {
      return l;
    }
    var G = (h.fn[H + B] = h.fn[H]);
    h.fn[H] = function () {
      return I.apply(this, arguments) || G.apply(this, arguments);
    };
  });
  t.version = "nightly";
  t.nextid = 0;
  t.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(
    " "
  );
  t.zindex = 15000;
  t.defaults = {
    prerender: u,
    id: u,
    overwrite: l,
    suppress: l,
    content: { text: l, attr: "title", title: { text: u, button: u } },
    position: {
      my: "top left",
      at: "bottom right",
      target: u,
      container: u,
      viewport: u,
      adjust: { x: 0, y: 0, mouse: l, resize: l, method: "flip flip" },
      effect: function (H, I, G) {
        h(this).animate(I, { duration: 200, queue: u });
      },
    },
    show: {
      target: u,
      event: "mouseenter",
      effect: l,
      delay: 90,
      solo: u,
      ready: u,
      autofocus: u,
    },
    hide: {
      target: u,
      event: "mouseleave",
      effect: l,
      delay: 0,
      fixed: u,
      inactive: u,
      leave: "window",
      distance: u,
    },
    style: { classes: "", widget: u, width: u, height: u, default: l },
    events: {
      render: D,
      move: D,
      show: D,
      hide: D,
      toggle: D,
      visible: D,
      focus: D,
      blur: D,
    },
  };
  function b(M) {
    var O = this,
      Q = M.options.show.modal,
      G = M.elements,
      P = G.tooltip,
      I = "#qtip-overlay",
      H = ".qtipmodal",
      J = H + M.id,
      N = "is-modal-qtip",
      L = h(document.body),
      K;
    M.checks.modal = {
      "^show.modal.(on|blur)$": function () {
        O.init();
        G.overlay.toggle(P.is(":visible"));
      },
    };
    h.extend(O, {
      init: function () {
        if (!Q.on) {
          return O;
        }
        K = O.create();
        P.attr(N, l)
          .css("z-index", s.modal.zindex + h(v + "[" + N + "]").length)
          .unbind(H)
          .unbind(J)
          .bind("tooltipshow" + H + " tooltiphide" + H, function (T, S, V) {
            var R = T.originalEvent;
            if (T.target === P[0]) {
              if (
                R &&
                T.type === "tooltiphide" &&
                /mouse(leave|enter)/.test(R.type) &&
                h(R.relatedTarget).closest(K[0]).length
              ) {
                try {
                  T.preventDefault();
                } catch (U) {}
              } else {
                if (!R || (R && !R.solo)) {
                  O[T.type.replace("tooltip", "")](T, V);
                }
              }
            }
          })
          .bind("tooltipfocus" + H, function (T) {
            if (T.isDefaultPrevented() || T.target !== P[0]) {
              return;
            }
            var U = h(v).filter("[" + N + "]"),
              S = s.modal.zindex + U.length,
              R = parseInt(P[0].style.zIndex, 10);
            K[0].style.zIndex = S - 1;
            U.each(function () {
              if (this.style.zIndex > R) {
                this.style.zIndex -= 1;
              }
            });
            U.end()
              .filter("." + E)
              .qtip("blur", T.originalEvent);
            P.addClass(E)[0].style.zIndex = S;
            try {
              T.preventDefault();
            } catch (V) {}
          })
          .bind("tooltiphide" + H, function (R) {
            if (R.target === P[0]) {
              h("[" + N + "]")
                .filter(":visible")
                .not(P)
                .last()
                .qtip("focus", R);
            }
          });
        if (Q.escape) {
          h(m)
            .unbind(J)
            .bind("keydown" + J, function (R) {
              if (R.keyCode === 27 && P.hasClass(E)) {
                M.hide(R);
              }
            });
        }
        if (Q.blur) {
          G.overlay.unbind(J).bind("click" + J, function (R) {
            if (P.hasClass(E)) {
              M.hide(R);
            }
          });
        }
        return O;
      },
      create: function () {
        var S = h(I);
        if (S.length) {
          return (G.overlay = S.insertAfter(h(v).last()));
        }
        K = G.overlay = h("<div />", {
          id: I.substr(1),
          html: "<div></div>",
          mousedown: function () {
            return u;
          },
        }).insertAfter(h(v).last());
        function R() {
          K.css({ height: h(m).height(), width: h(m).width() });
        }
        h(m)
          .unbind(H)
          .bind("resize" + H, R);
        R();
        return K;
      },
      toggle: function (V, W, X) {
        if (V && V.isDefaultPrevented()) {
          return O;
        }
        var U = Q.effect,
          T = W ? "show" : "hide",
          Y = K.is(":visible"),
          S = h("[" + N + "]")
            .filter(":visible")
            .not(P),
          R;
        if (!K) {
          K = O.create();
        }
        if ((K.is(":animated") && Y === W) || (!W && S.length)) {
          return O;
        }
        if (W) {
          K.css({ left: 0, top: 0 });
          K.toggleClass("blurs", Q.blur);
          L.bind("focusin" + J, function (aa) {
            var ab = h(aa.target),
              Z = ab.closest(".qtip"),
              ac =
                Z.length < 1
                  ? u
                  : parseInt(Z[0].style.zIndex, 10) >
                    parseInt(P[0].style.zIndex, 10);
            if (!ac && h(aa.target).closest(v)[0] !== P[0]) {
              P.find("input:visible").filter(":first").focus();
            }
          });
        } else {
          L.undelegate("*", "focusin" + J);
        }
        K.stop(l, u);
        if (h.isFunction(U)) {
          U.call(K, W);
        } else {
          if (U === u) {
            K[T]();
          } else {
            K.fadeTo(parseInt(X, 10) || 90, W ? 1 : 0, function () {
              if (!W) {
                h(this).hide();
              }
            });
          }
        }
        if (!W) {
          K.queue(function (Z) {
            K.css({ left: "", top: "" });
            Z();
          });
        }
        return O;
      },
      show: function (R, S) {
        return O.toggle(R, l, S);
      },
      hide: function (R, S) {
        return O.toggle(R, u, S);
      },
      destroy: function () {
        var R = K;
        if (R) {
          R = h("[" + N + "]").not(P).length < 1;
          if (R) {
            G.overlay.remove();
            h(m).unbind(H);
          } else {
            G.overlay.unbind(H + M.id);
          }
          L.undelegate("*", "focusin" + J);
        }
        return P.removeAttr(N).unbind(H);
      },
    });
    O.init();
  }
  s.modal = function (H) {
    var G = H.plugins.modal;
    return "object" === typeof G ? G : (H.plugins.modal = new b(H));
  };
  s.modal.initialize = "render";
  s.modal.sanitize = function (G) {
    if (G.show) {
      if (typeof G.show.modal !== "object") {
        G.show.modal = { on: !!G.show.modal };
      } else {
        if (typeof G.show.modal.on === "undefined") {
          G.show.modal.on = l;
        }
      }
    }
  };
  s.modal.zindex = t.zindex + 1000;
  h.extend(l, t.defaults, {
    show: { modal: { on: u, effect: l, blur: l, escape: l } },
  });
  function F(J) {
    var H = this,
      G = J.elements,
      K = G.tooltip,
      I = ".bgiframe-" + J.id;
    h.extend(H, {
      init: function () {
        G.bgiframe = h(
          '<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'
        );
        G.bgiframe.appendTo(K);
        K.bind("tooltipmove" + I, H.adjust);
      },
      adjust: function () {
        var N = J.get("dimensions"),
          M = J.plugins.tip,
          O = G.tip,
          L,
          P;
        P = parseInt(K.css("border-left-width"), 10) || 0;
        P = { left: -P, top: -P };
        if (M && O) {
          L =
            M.corner.precedance === "x" ? ["width", "left"] : ["height", "top"];
          P[L[1]] -= O[L[0]]();
        }
        G.bgiframe.css(P).css(N);
      },
      destroy: function () {
        G.bgiframe.remove();
        K.unbind(I);
      },
    });
    H.init();
  }
  s.bgiframe = function (I) {
    var H = h.browser,
      G = I.plugins.bgiframe;
    if (
      h("select, object").length < 1 ||
      !(H.msie && ("" + H.version).charAt(0) === "6")
    ) {
      return u;
    }
    return "object" === typeof G ? G : (I.plugins.bgiframe = new F(I));
  };
  s.bgiframe.initialize = "render";
})(jQuery, window);
(function (e) {
  var b = "ar" + +new Date(),
    f = (d.defaults = {
      onResize: function () {},
      onBeforeResize: function () {
        return 123;
      },
      onAfterResize: function () {
        return 555;
      },
      animate: { duration: 200, complete: function () {} },
      extraSpace: 50,
      minHeight: "original",
      maxHeight: 500,
      minWidth: "original",
      maxWidth: 500,
    });
  d.cloneCSSProperties = [
    "lineHeight",
    "textDecoration",
    "letterSpacing",
    "fontSize",
    "fontFamily",
    "fontStyle",
    "fontWeight",
    "textTransform",
    "textAlign",
    "direction",
    "wordSpacing",
    "fontSizeAdjust",
    "paddingTop",
    "paddingLeft",
    "paddingBottom",
    "paddingRight",
    "width",
  ];
  d.cloneCSSValues = {
    position: "absolute",
    top: -9999,
    left: -9999,
    opacity: 0,
    overflow: "hidden",
  };
  d.resizableFilterSelector = [
    "textarea:not(textarea." + b + ")",
    "input:not(input[type])",
    "input[type=text]",
    "input[type=password]",
    "input[type=email]",
    "input[type=url]",
  ].join(",");
  d.AutoResizer = a;
  e.fn.autoResize = d;
  function d(g) {
    this.filter(d.resizableFilterSelector).each(function () {
      new a(e(this), g);
    });
    return this;
  }
  function a(h, g) {
    if (h.data("AutoResizer")) {
      h.data("AutoResizer").destroy();
    }
    g = this.config = e.extend(true, {}, d.defaults, g);
    this.el = h;
    this.nodeName = h[0].nodeName.toLowerCase();
    this.originalHeight = h.height();
    this.previousScrollTop = null;
    this.value = h.val();
    if (g.maxWidth === "original") {
      g.maxWidth = h.width();
    }
    if (g.minWidth === "original") {
      g.minWidth = h.width();
    }
    if (g.maxHeight === "original") {
      g.maxHeight = h.height();
    }
    if (g.minHeight === "original") {
      g.minHeight = h.height();
    }
    if (this.nodeName === "textarea") {
      h.css({ resize: "none", overflowY: "hidden" });
    }
    h.data("AutoResizer", this);
    g.animate.complete = (function (j) {
      return function () {
        g.onAfterResize.call(h);
        return j.apply(this, arguments);
      };
    })(g.animate.complete);
    this.bind();
  }
  a.prototype = {
    bind: function () {
      var g = e.proxy(function () {
        this.check();
        return true;
      }, this);
      this.unbind();
      this.el
        .bind("keyup.autoResize", g)
        .bind("change.autoResize", g)
        .bind("paste.autoResize", function () {
          setTimeout(function () {
            g();
          }, 0);
        });
      if (!this.el.is(":hidden")) {
        this.check(null, true);
      }
    },
    unbind: function () {
      this.el.unbind(".autoResize");
    },
    createClone: function () {
      var g = this.el,
        h = this.nodeName === "textarea" ? g.clone() : e("<span/>");
      this.clone = h;
      e.each(d.cloneCSSProperties, function (j, k) {
        h[0].style[k] = g.css(k);
      });
      h.removeAttr("name")
        .removeAttr("id")
        .addClass(b)
        .attr("tabIndex", -1)
        .css(d.cloneCSSValues);
      if (this.nodeName === "textarea") {
        h.height("auto");
      } else {
        h.width("auto").css({ whiteSpace: "nowrap" });
      }
    },
    check: function (n, l) {
      if (!this.clone) {
        this.createClone();
        this.injectClone();
      }
      var k = this.config,
        o = this.clone,
        j = this.el,
        p = j.val();
      if (p === this.prevValue) {
        return true;
      }
      this.prevValue = p;
      if (this.nodeName === "input") {
        o.text(p);
        var q = o.width(),
          m = q + k.extraSpace >= k.minWidth ? q + k.extraSpace : k.minWidth,
          h = j.width();
        m = Math.min(m, k.maxWidth);
        if (
          (m < h && m >= k.minWidth) ||
          (m >= k.minWidth && m <= k.maxWidth)
        ) {
          k.onBeforeResize.call(j);
          k.onResize.call(j);
          j.scrollLeft(0);
          if (k.animate && !l) {
            j.stop(1, 1).animate({ width: m }, k.animate);
          } else {
            j.width(m);
            k.onAfterResize.call(j);
          }
        }
        return;
      }
      o.width(j.width()).height(0).val(p).scrollTop(10000);
      var g = o[0].scrollTop;
      if (this.previousScrollTop === g) {
        return;
      }
      this.previousScrollTop = g;
      if (g + k.extraSpace >= k.maxHeight) {
        j.css("overflowY", "");
        g = k.maxHeight;
        l = true;
      } else {
        if (g <= k.minHeight) {
          g = k.minHeight;
        } else {
          j.css("overflowY", "hidden");
          g += k.extraSpace;
        }
      }
      k.onBeforeResize.call(j);
      k.onResize.call(j);
      if (k.animate && !l) {
        j.stop(1, 1).animate({ height: g }, k.animate);
      } else {
        j.height(g);
        k.onAfterResize.call(j);
      }
    },
    destroy: function () {
      this.unbind();
      this.el.removeData("AutoResizer");
      this.clone.remove();
      delete this.el;
      delete this.clone;
    },
    injectClone: function () {
      (
        d.cloneContainer ||
        (d.cloneContainer = e("<arclones/>").appendTo("body"))
      ).append(this.clone);
    },
  };
})(jQuery);
(function (a) {
  a.fn.jScroll = function (b) {
    var d = a.extend({}, a.fn.jScroll.defaults, b);
    return this.each(function () {
      var e = a(this);
      var f = a(window);
      a.fn.jScroll.recalcPos(e);
      f.scroll(function () {
        e.stop().animate(a.fn.jScroll.defaults.location.getMargin(f), d.speed);
      });
    });
  };
  a.fn.jScroll.recalcPos = function (b) {
    a.fn.jScroll.defaults.location = new a.fn.jScroll.location(b);
  };
  a.fn.jScroll.location = function (b) {
    $element = b;
    this.min = $element.offset().top;
    this.originalMargin = parseInt($element.css("margin-top"), 10) || 0;
    this.getMargin = function (f) {
      var d = $element.parent().height() - $element.outerHeight();
      var e = this.originalMargin;
      if (f.scrollTop() >= this.min) {
        e = e + a.fn.jScroll.defaults.top + f.scrollTop() - this.min;
      }
      if (e > d) {
        e = d;
      }
      return { marginTop: e + "px" };
    };
  };
  a.fn.jScroll.defaults = { speed: "slow", top: 10, location: new Object() };
})(jQuery);
(function (b) {
  b.fn.superfish = function (l) {
    var g = b.fn.superfish,
      k = g.c,
      f = b(['<span class="', k.arrowClass, '"> &#187;</span>'].join("")),
      j = function () {
        var m = b(this),
          n = d(m);
        g.defaults.isMouseOverM = true;
        clearTimeout(n.sfTimer);
        clearTimeout(n.sfTimer2);
        clearTimeout(n.sfTimer3);
        var o = !m.hasClass("main_link") ? 0 : 100;
        m.showSuperfishUl().siblings().hideSuperfishUl();
        hideAds("body");
      },
      e = function () {
        g.defaults.isMouseOverM = false;
        var m = b(this),
          p = d(m),
          n = g.op;
        clearTimeout(p.sfTimer2);
        p.sfTimer2 = setTimeout(function () {
          if (
            m.attr("class") != "main_link sfHover2" &&
            m.attr("class") != "main_link" &&
            m.attr("class") != "main_link sfHover2 sfHover"
          ) {
            m.hideSuperfishUl();
            if (
              n.$path.length &&
              m.parents(["li.", n.hoverClass].join("")).length < 1
            ) {
              j.call(n.$path);
            }
          }
          if (g.defaults.isMouseOverM == false) {
            clearTimeout(p.sfTimer3);
            p.sfTimer3 = setTimeout(function () {
              m.hideSuperfishUl();
              if (
                n.$path.length &&
                m.parents(["li.", n.hoverClass].join("")).length < 1
              ) {
                j.call(n.$path);
              }
            }, 600);
          }
          if (
            m.attr("class") == "main_link sfHover2" ||
            m.attr("class") == "main_link" ||
            m.attr("class") == "main_link sfHover2 sfHover"
          ) {
            showAds("body");
          }
        }, 50);
      },
      d = function (m) {
        var n = m.parents(["ul.", k.menuClass, ":first"].join(""))[0];
        g.op = g.o[n.serial];
        return n;
      },
      h = function (m) {
        if (m.attr("class") != "main_link" && m.is("li")) {
          m.addClass(k.anchorClass)
            .find(".menu_item")
            .first()
            .prepend(f.clone());
        }
      };
    return this.each(function () {
      var m = (this.serial = g.o.length);
      var p = b.extend({}, g.defaults, l);
      p.$path = b("li." + p.pathClass, this)
        .slice(0, p.pathLevels)
        .each(function () {
          b(this)
            .addClass([p.hoverClass, k.bcClass].join(" "))
            .filter("li:has(ul)")
            .removeClass(p.pathClass);
        });
      g.o[m] = g.op = p;
      b("li:has(ul)", this)
        [b.fn.hoverIntent && !p.disableHI ? "hoverIntent" : "hover"](j, e)
        .each(function () {
          if (p.autoArrows) {
            h(b(this));
          }
        })
        .not("." + k.bcClass)
        .hideSuperfishUl();
      var n = b("a", this);
      n.each(function (o) {
        var q = n.eq(o).parents("li");
        n.eq(o)
          .focus(function () {
            j.call(q);
          })
          .blur(function () {
            e.call(q);
          });
      });
      p.onInit.call(this);
    }).each(function () {
      var m = [k.menuClass];
      b(this).addClass(m.join(" "));
    });
  };
  var a = b.fn.superfish;
  a.o = [];
  a.op = {};
  a.c = {
    bcClass: "sf-breadcrumb",
    menuClass: "sf-js-enabled",
    anchorClass: "sf-with-ul",
    arrowClass: "sf-sub-indicator",
  };
  a.defaults = {
    hoverClass: "sfHover",
    pathClass: "overideME",
    pathLevels: 1,
    delay: 0,
    animation: { opacity: "show" },
    speed: 1,
    autoArrows: true,
    dropShadows: false,
    isMouseOverM: false,
    disableHI: false,
    onInit: function () {},
    onBeforeShow: function () {},
    onShow: function () {},
    onHide: function () {},
  };
  b.fn.extend({
    hideSuperfishUl: function () {
      var f = a.op,
        e = f.retainPath === true ? f.$path : "";
      f.retainPath = false;
      var d = b(["li.", f.hoverClass].join(""), this)
        .add(this)
        .not(e)
        .removeClass(f.hoverClass)
        .removeClass("sfHover2")
        .find(">ul")
        .hide()
        .css("visibility", "hidden")
        .css("top", "0px");
      f.onHide.call(d);
      return this;
    },
    showSuperfishUl: function () {
      var f = a.op;
      if (this.children().last().children().last().is("li")) {
        this.children().last().children().last().addClass("menu_item_last");
      }
      if (b(this).attr("class") != "main_link") {
        var j = this.addClass(f.hoverClass)
          .find(">ul:hidden")
          .css("visibility", "visible");
        this.find("ul").first().css("padding-left", "10px");
        this.find("ul").first().css("margin-left", "-10px");
        if (b(this).children().first().is("span")) {
          b(this).css("cursor", "default");
        }
      } else {
        var j = this.addClass("sfHover2")
          .find(">ul:hidden")
          .css("visibility", "visible");
        j.css("left", "-1px");
        j.css("top", "32px");
      }
      f.onBeforeShow.call(j);
      j.show();
      f.onShow.call(j);
      var k = b(this).find("ul").first();
      var d = k.offset();
      if (k.css("top") == "0px") {
        if (k.height() + d.top > b(window).height() + window.pageYOffset) {
          var h = k.parent().parent().offset().top;
          k.css("top", "-" + (k.parent().offset().top - h) + "px");
        } else {
          if (!b(this).hasClass("main_link")) {
            k.css("top", "0px");
          }
        }
      }
      d = k.offset();
      if (k.height() + d.top > b(window).height() + window.pageYOffset) {
        var m = 5555;
        var p = k.width();
        var n = k.height();
        var g = 0;
        var l = 0;
        k.find("li").each(function (o) {
          var q = b(this).offset();
          if (
            q.top + b(this).height() >
            b(window).height() + window.pageYOffset
          ) {
            l++;
          }
        });
        var e = 0;
        k.find("li").each(function (o) {
          var q = b(this).offset();
          if (
            q.top + b(this).height() >
            b(window).height() + window.pageYOffset
          ) {
            if (e == 0) {
              e = 1;
              b(this).prev().addClass("menu_item_last");
            }
            b(this).css("margin-left", p - 1 + "px");
            b(this).css(
              "margin-top",
              (n - g * b(this).height()) * -1 + b(this).height() * l + "px"
            );
            g++;
          }
        });
      }
      return this;
    },
  });
})(jQuery);
/*! Javascript plotting library for jQuery, v. 0.7.
 *
 * Released under the MIT license by IOLA, December 2007.
 *
 */
(function (b) {
  b.color = {};
  b.color.make = function (e, f, h, g) {
    var d = {};
    d.r = e || 0;
    d.g = f || 0;
    d.b = h || 0;
    d.a = g != null ? g : 1;
    d.add = function (j, k) {
      for (var l = 0; l < j.length; ++l) {
        d[j.charAt(l)] += k;
      }
      return d.normalize();
    };
    d.scale = function (j, k) {
      for (var l = 0; l < j.length; ++l) {
        d[j.charAt(l)] *= k;
      }
      return d.normalize();
    };
    d.toString = function () {
      if (d.a >= 1) {
        return "rgb(" + [d.r, d.g, d.b].join(",") + ")";
      } else {
        return "rgba(" + [d.r, d.g, d.b, d.a].join(",") + ")";
      }
    };
    d.normalize = function () {
      function j(l, k, m) {
        return k < l ? l : k > m ? m : k;
      }
      d.r = j(0, parseInt(d.r), 255);
      d.g = j(0, parseInt(d.g), 255);
      d.b = j(0, parseInt(d.b), 255);
      d.a = j(0, d.a, 1);
      return d;
    };
    d.clone = function () {
      return b.color.make(d.r, d.b, d.g, d.a);
    };
    return d.normalize();
  };
  b.color.extract = function (e, f) {
    var d;
    do {
      d = e.css(f).toLowerCase();
      if (d != "" && d != "transparent") {
        break;
      }
      e = e.parent();
    } while (!b.nodeName(e.get(0), "body"));
    if (d == "rgba(0, 0, 0, 0)") {
      d = "transparent";
    }
    return b.color.parse(d);
  };
  b.color.parse = function (d) {
    var e,
      g = b.color.make;
    if (
      (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(
        d
      ))
    ) {
      return g(parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10));
    }
    if (
      (e = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(
        d
      ))
    ) {
      return g(
        parseInt(e[1], 10),
        parseInt(e[2], 10),
        parseInt(e[3], 10),
        parseFloat(e[4])
      );
    }
    if (
      (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(
        d
      ))
    ) {
      return g(
        parseFloat(e[1]) * 2.55,
        parseFloat(e[2]) * 2.55,
        parseFloat(e[3]) * 2.55
      );
    }
    if (
      (e = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(
        d
      ))
    ) {
      return g(
        parseFloat(e[1]) * 2.55,
        parseFloat(e[2]) * 2.55,
        parseFloat(e[3]) * 2.55,
        parseFloat(e[4])
      );
    }
    if ((e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(d))) {
      return g(parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16));
    }
    if ((e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(d))) {
      return g(
        parseInt(e[1] + e[1], 16),
        parseInt(e[2] + e[2], 16),
        parseInt(e[3] + e[3], 16)
      );
    }
    var f = b.trim(d).toLowerCase();
    if (f == "transparent") {
      return g(255, 255, 255, 0);
    } else {
      e = a[f] || [0, 0, 0];
      return g(e[0], e[1], e[2]);
    }
  };
  var a = {
    aqua: [0, 255, 255],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    brown: [165, 42, 42],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgrey: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkviolet: [148, 0, 211],
    fuchsia: [255, 0, 255],
    gold: [255, 215, 0],
    green: [0, 128, 0],
    indigo: [75, 0, 130],
    khaki: [240, 230, 140],
    lightblue: [173, 216, 230],
    lightcyan: [224, 255, 255],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    navy: [0, 0, 128],
    olive: [128, 128, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    violet: [128, 0, 128],
    red: [255, 0, 0],
    silver: [192, 192, 192],
    white: [255, 255, 255],
    yellow: [255, 255, 0],
  };
})(jQuery);
(function (d) {
  function b(ay, al, M, ai) {
    var T = [],
      R = {
        colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
        legend: {
          show: true,
          noColumns: 1,
          labelFormatter: null,
          labelBoxBorderColor: "#ccc",
          container: null,
          position: "ne",
          margin: 5,
          backgroundColor: null,
          backgroundOpacity: 0.85,
        },
        xaxis: {
          show: null,
          position: "bottom",
          mode: null,
          color: null,
          tickColor: null,
          transform: null,
          inverseTransform: null,
          min: null,
          max: null,
          autoscaleMargin: null,
          ticks: null,
          tickFormatter: null,
          labelWidth: null,
          labelHeight: null,
          reserveSpace: null,
          tickLength: null,
          alignTicksWithAxis: null,
          tickDecimals: null,
          tickSize: null,
          minTickSize: null,
          monthNames: null,
          timeformat: null,
          twelveHourClock: false,
        },
        yaxis: { autoscaleMargin: 0.02, position: "left" },
        xaxes: [],
        yaxes: [],
        series: {
          points: {
            show: false,
            radius: 3,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
          },
          lines: { lineWidth: 2, fill: false, fillColor: null, steps: false },
          bars: {
            show: false,
            lineWidth: 2,
            barWidth: 1,
            fill: true,
            fillColor: null,
            align: "left",
            horizontal: false,
          },
          shadowSize: 3,
        },
        grid: {
          show: true,
          aboveData: false,
          color: "#545454",
          backgroundColor: null,
          borderColor: null,
          tickColor: null,
          labelMargin: 5,
          axisMargin: 8,
          borderWidth: 2,
          minBorderMargin: null,
          markings: null,
          markingsColor: "#f4f4f4",
          markingsLineWidth: 2,
          clickable: false,
          hoverable: false,
          autoHighlight: true,
          mouseActiveRadius: 10,
        },
        hooks: {},
      },
      aC = null,
      ag = null,
      B = null,
      K = null,
      D = null,
      q = [],
      az = [],
      r = { left: 0, right: 0, top: 0, bottom: 0 },
      J = 0,
      L = 0,
      j = 0,
      z = 0,
      an = {
        processOptions: [],
        processRawData: [],
        processDatapoints: [],
        drawSeries: [],
        draw: [],
        bindEvents: [],
        drawOverlay: [],
        shutdown: [],
      },
      au = this;
    au.setData = am;
    au.setupGrid = u;
    au.draw = Z;
    au.getPlaceholder = function () {
      return ay;
    };
    au.getCanvas = function () {
      return aC;
    };
    au.getPlotOffset = function () {
      return r;
    };
    au.width = function () {
      return j;
    };
    au.height = function () {
      return z;
    };
    au.offset = function () {
      var aE = B.offset();
      aE.left += r.left;
      aE.top += r.top;
      return aE;
    };
    au.getData = function () {
      return T;
    };
    au.getAxes = function () {
      var aF = {},
        aE;
      d.each(q.concat(az), function (aG, aH) {
        if (aH) {
          aF[aH.direction + (aH.n != 1 ? aH.n : "") + "axis"] = aH;
        }
      });
      return aF;
    };
    au.getXAxes = function () {
      return q;
    };
    au.getYAxes = function () {
      return az;
    };
    au.c2p = F;
    au.p2c = av;
    au.getOptions = function () {
      return R;
    };
    au.highlight = A;
    au.unhighlight = W;
    au.triggerRedrawOverlay = g;
    au.pointOffset = function (aE) {
      return {
        left: parseInt(q[aD(aE, "x") - 1].p2c(+aE.x) + r.left),
        top: parseInt(az[aD(aE, "y") - 1].p2c(+aE.y) + r.top),
      };
    };
    au.shutdown = aj;
    au.resize = function () {
      E();
      h(aC);
      h(ag);
    };
    au.hooks = an;
    I(au);
    ac(M);
    aa();
    am(al);
    u();
    Z();
    ak();
    function aq(aG, aE) {
      aE = [au].concat(aE);
      for (var aF = 0; aF < aG.length; ++aF) {
        aG[aF].apply(this, aE);
      }
    }
    function I() {
      for (var aE = 0; aE < ai.length; ++aE) {
        var aF = ai[aE];
        aF.init(au);
        if (aF.options) {
          d.extend(true, R, aF.options);
        }
      }
    }
    function ac(aF) {
      var aE;
      d.extend(true, R, aF);
      if (R.xaxis.color == null) {
        R.xaxis.color = R.grid.color;
      }
      if (R.yaxis.color == null) {
        R.yaxis.color = R.grid.color;
      }
      if (R.xaxis.tickColor == null) {
        R.xaxis.tickColor = R.grid.tickColor;
      }
      if (R.yaxis.tickColor == null) {
        R.yaxis.tickColor = R.grid.tickColor;
      }
      if (R.grid.borderColor == null) {
        R.grid.borderColor = R.grid.color;
      }
      if (R.grid.tickColor == null) {
        R.grid.tickColor = d.color
          .parse(R.grid.color)
          .scale("a", 0.22)
          .toString();
      }
      for (aE = 0; aE < Math.max(1, R.xaxes.length); ++aE) {
        R.xaxes[aE] = d.extend(true, {}, R.xaxis, R.xaxes[aE]);
      }
      for (aE = 0; aE < Math.max(1, R.yaxes.length); ++aE) {
        R.yaxes[aE] = d.extend(true, {}, R.yaxis, R.yaxes[aE]);
      }
      if (R.xaxis.noTicks && R.xaxis.ticks == null) {
        R.xaxis.ticks = R.xaxis.noTicks;
      }
      if (R.yaxis.noTicks && R.yaxis.ticks == null) {
        R.yaxis.ticks = R.yaxis.noTicks;
      }
      if (R.x2axis) {
        R.xaxes[1] = d.extend(true, {}, R.xaxis, R.x2axis);
        R.xaxes[1].position = "top";
      }
      if (R.y2axis) {
        R.yaxes[1] = d.extend(true, {}, R.yaxis, R.y2axis);
        R.yaxes[1].position = "right";
      }
      if (R.grid.coloredAreas) {
        R.grid.markings = R.grid.coloredAreas;
      }
      if (R.grid.coloredAreasColor) {
        R.grid.markingsColor = R.grid.coloredAreasColor;
      }
      if (R.lines) {
        d.extend(true, R.series.lines, R.lines);
      }
      if (R.points) {
        d.extend(true, R.series.points, R.points);
      }
      if (R.bars) {
        d.extend(true, R.series.bars, R.bars);
      }
      if (R.shadowSize != null) {
        R.series.shadowSize = R.shadowSize;
      }
      for (aE = 0; aE < R.xaxes.length; ++aE) {
        Y(q, aE + 1).options = R.xaxes[aE];
      }
      for (aE = 0; aE < R.yaxes.length; ++aE) {
        Y(az, aE + 1).options = R.yaxes[aE];
      }
      for (var aG in an) {
        if (R.hooks[aG] && R.hooks[aG].length) {
          an[aG] = an[aG].concat(R.hooks[aG]);
        }
      }
      aq(an.processOptions, [R]);
    }
    function am(aE) {
      T = ab(aE);
      aA();
      C();
    }
    function ab(aH) {
      var aF = [];
      for (var aE = 0; aE < aH.length; ++aE) {
        var aG = d.extend(true, {}, R.series);
        if (aH[aE].data != null) {
          aG.data = aH[aE].data;
          delete aH[aE].data;
          d.extend(true, aG, aH[aE]);
          aH[aE].data = aG.data;
        } else {
          aG.data = aH[aE];
        }
        aF.push(aG);
      }
      return aF;
    }
    function aD(aF, aG) {
      var aE = aF[aG + "axis"];
      if (typeof aE == "object") {
        aE = aE.n;
      }
      if (typeof aE != "number") {
        aE = 1;
      }
      return aE;
    }
    function n() {
      return d.grep(q.concat(az), function (aE) {
        return aE;
      });
    }
    function F(aH) {
      var aF = {},
        aE,
        aG;
      for (aE = 0; aE < q.length; ++aE) {
        aG = q[aE];
        if (aG && aG.used) {
          aF["x" + aG.n] = aG.c2p(aH.left);
        }
      }
      for (aE = 0; aE < az.length; ++aE) {
        aG = az[aE];
        if (aG && aG.used) {
          aF["y" + aG.n] = aG.c2p(aH.top);
        }
      }
      if (aF.x1 !== undefined) {
        aF.x = aF.x1;
      }
      if (aF.y1 !== undefined) {
        aF.y = aF.y1;
      }
      return aF;
    }
    function av(aI) {
      var aG = {},
        aF,
        aH,
        aE;
      for (aF = 0; aF < q.length; ++aF) {
        aH = q[aF];
        if (aH && aH.used) {
          aE = "x" + aH.n;
          if (aI[aE] == null && aH.n == 1) {
            aE = "x";
          }
          if (aI[aE] != null) {
            aG.left = aH.p2c(aI[aE]);
            break;
          }
        }
      }
      for (aF = 0; aF < az.length; ++aF) {
        aH = az[aF];
        if (aH && aH.used) {
          aE = "y" + aH.n;
          if (aI[aE] == null && aH.n == 1) {
            aE = "y";
          }
          if (aI[aE] != null) {
            aG.top = aH.p2c(aI[aE]);
            break;
          }
        }
      }
      return aG;
    }
    function Y(aF, aE) {
      if (!aF[aE - 1]) {
        aF[aE - 1] = {
          n: aE,
          direction: aF == q ? "x" : "y",
          options: d.extend(true, {}, aF == q ? R.xaxis : R.yaxis),
        };
      }
      return aF[aE - 1];
    }
    function aA() {
      var aJ;
      var aP = T.length,
        aE = [],
        aH = [];
      for (aJ = 0; aJ < T.length; ++aJ) {
        var aM = T[aJ].color;
        if (aM != null) {
          --aP;
          if (typeof aM == "number") {
            aH.push(aM);
          } else {
            aE.push(d.color.parse(T[aJ].color));
          }
        }
      }
      for (aJ = 0; aJ < aH.length; ++aJ) {
        aP = Math.max(aP, aH[aJ] + 1);
      }
      var aF = [],
        aI = 0;
      aJ = 0;
      while (aF.length < aP) {
        var aL;
        if (R.colors.length == aJ) {
          aL = d.color.make(100, 100, 100);
        } else {
          aL = d.color.parse(R.colors[aJ]);
        }
        var aG = aI % 2 == 1 ? -1 : 1;
        aL.scale("rgb", 1 + aG * Math.ceil(aI / 2) * 0.2);
        aF.push(aL);
        ++aJ;
        if (aJ >= R.colors.length) {
          aJ = 0;
          ++aI;
        }
      }
      var aK = 0,
        aQ;
      for (aJ = 0; aJ < T.length; ++aJ) {
        aQ = T[aJ];
        if (aQ.color == null) {
          aQ.color = aF[aK].toString();
          ++aK;
        } else {
          if (typeof aQ.color == "number") {
            aQ.color = aF[aQ.color].toString();
          }
        }
        if (aQ.lines.show == null) {
          var aO,
            aN = true;
          for (aO in aQ) {
            if (aQ[aO] && aQ[aO].show) {
              aN = false;
              break;
            }
          }
          if (aN) {
            aQ.lines.show = true;
          }
        }
        aQ.xaxis = Y(q, aD(aQ, "x"));
        aQ.yaxis = Y(az, aD(aQ, "y"));
      }
    }
    function C() {
      var aR = Number.POSITIVE_INFINITY,
        aL = Number.NEGATIVE_INFINITY,
        aE = Number.MAX_VALUE,
        aX,
        aV,
        aU,
        aQ,
        aG,
        aM,
        aW,
        aS,
        aK,
        aJ,
        aF,
        a3,
        a0,
        aO;
      function aI(a6, a5, a4) {
        if (a5 < a6.datamin && a5 != -aE) {
          a6.datamin = a5;
        }
        if (a4 > a6.datamax && a4 != aE) {
          a6.datamax = a4;
        }
      }
      d.each(n(), function (a4, a5) {
        a5.datamin = aR;
        a5.datamax = aL;
        a5.used = false;
      });
      for (aX = 0; aX < T.length; ++aX) {
        aM = T[aX];
        aM.datapoints = { points: [] };
        aq(an.processRawData, [aM, aM.data, aM.datapoints]);
      }
      for (aX = 0; aX < T.length; ++aX) {
        aM = T[aX];
        var a2 = aM.data,
          aZ = aM.datapoints.format;
        if (!aZ) {
          aZ = [];
          aZ.push({ x: true, number: true, required: true });
          aZ.push({ y: true, number: true, required: true });
          if (aM.bars.show || (aM.lines.show && aM.lines.fill)) {
            aZ.push({
              y: true,
              number: true,
              required: false,
              defaultValue: 0,
            });
            if (aM.bars.horizontal) {
              delete aZ[aZ.length - 1].y;
              aZ[aZ.length - 1].x = true;
            }
          }
          aM.datapoints.format = aZ;
        }
        if (aM.datapoints.pointsize != null) {
          continue;
        }
        aM.datapoints.pointsize = aZ.length;
        aS = aM.datapoints.pointsize;
        aW = aM.datapoints.points;
        insertSteps = aM.lines.show && aM.lines.steps;
        aM.xaxis.used = aM.yaxis.used = true;
        for (aV = aU = 0; aV < a2.length; ++aV, aU += aS) {
          aO = a2[aV];
          var aH = aO == null;
          if (!aH) {
            for (aQ = 0; aQ < aS; ++aQ) {
              a3 = aO[aQ];
              a0 = aZ[aQ];
              if (a0) {
                if (a0.number && a3 != null) {
                  a3 = +a3;
                  if (isNaN(a3)) {
                    a3 = null;
                  } else {
                    if (a3 == Infinity) {
                      a3 = aE;
                    } else {
                      if (a3 == -Infinity) {
                        a3 = -aE;
                      }
                    }
                  }
                }
                if (a3 == null) {
                  if (a0.required) {
                    aH = true;
                  }
                  if (a0.defaultValue != null) {
                    a3 = a0.defaultValue;
                  }
                }
              }
              aW[aU + aQ] = a3;
            }
          }
          if (aH) {
            for (aQ = 0; aQ < aS; ++aQ) {
              a3 = aW[aU + aQ];
              if (a3 != null) {
                a0 = aZ[aQ];
                if (a0.x) {
                  aI(aM.xaxis, a3, a3);
                }
                if (a0.y) {
                  aI(aM.yaxis, a3, a3);
                }
              }
              aW[aU + aQ] = null;
            }
          } else {
            if (
              insertSteps &&
              aU > 0 &&
              aW[aU - aS] != null &&
              aW[aU - aS] != aW[aU] &&
              aW[aU - aS + 1] != aW[aU + 1]
            ) {
              for (aQ = 0; aQ < aS; ++aQ) {
                aW[aU + aS + aQ] = aW[aU + aQ];
              }
              aW[aU + 1] = aW[aU - aS + 1];
              aU += aS;
            }
          }
        }
      }
      for (aX = 0; aX < T.length; ++aX) {
        aM = T[aX];
        aq(an.processDatapoints, [aM, aM.datapoints]);
      }
      for (aX = 0; aX < T.length; ++aX) {
        aM = T[aX];
        (aW = aM.datapoints.points), (aS = aM.datapoints.pointsize);
        var aN = aR,
          aT = aR,
          aP = aL,
          aY = aL;
        for (aV = 0; aV < aW.length; aV += aS) {
          if (aW[aV] == null) {
            continue;
          }
          for (aQ = 0; aQ < aS; ++aQ) {
            a3 = aW[aV + aQ];
            a0 = aZ[aQ];
            if (!a0 || a3 == aE || a3 == -aE) {
              continue;
            }
            if (a0.x) {
              if (a3 < aN) {
                aN = a3;
              }
              if (a3 > aP) {
                aP = a3;
              }
            }
            if (a0.y) {
              if (a3 < aT) {
                aT = a3;
              }
              if (a3 > aY) {
                aY = a3;
              }
            }
          }
        }
        if (aM.bars.show) {
          var a1 = aM.bars.align == "left" ? 0 : -aM.bars.barWidth / 2;
          if (aM.bars.horizontal) {
            aT += a1;
            aY += a1 + aM.bars.barWidth;
          } else {
            aN += a1;
            aP += a1 + aM.bars.barWidth;
          }
        }
        aI(aM.xaxis, aN, aP);
        aI(aM.yaxis, aT, aY);
      }
      d.each(n(), function (a4, a5) {
        if (a5.datamin == aR) {
          a5.datamin = null;
        }
        if (a5.datamax == aL) {
          a5.datamax = null;
        }
      });
    }
    function k(aE, aF) {
      var aG = document.createElement("canvas");
      aG.className = aF;
      aG.width = J;
      aG.height = L;
      if (!aE) {
        d(aG).css({ position: "absolute", left: 0, top: 0 });
      }
      d(aG).appendTo(ay);
      if (!aG.getContext) {
        aG = window.G_vmlCanvasManager.initElement(aG);
      }
      aG.getContext("2d").save();
      return aG;
    }
    function E() {
      J = ay.width();
      L = ay.height();
      if (J <= 0 || L <= 0) {
        throw "Invalid dimensions for plot, width = " + J + ", height = " + L;
      }
    }
    function h(aF) {
      if (aF.width != J) {
        aF.width = J;
      }
      if (aF.height != L) {
        aF.height = L;
      }
      var aE = aF.getContext("2d");
      aE.restore();
      aE.save();
    }
    function aa() {
      var aF,
        aE = ay.children("canvas.base"),
        aG = ay.children("canvas.overlay");
      if (aE.length == 0 || aG == 0) {
        ay.html("");
        ay.css({ padding: 0 });
        if (ay.css("position") == "static") {
          ay.css("position", "relative");
        }
        E();
        aC = k(true, "base");
        ag = k(false, "overlay");
        aF = false;
      } else {
        aC = aE.get(0);
        ag = aG.get(0);
        aF = true;
      }
      K = aC.getContext("2d");
      D = ag.getContext("2d");
      B = d([ag, aC]);
      if (aF) {
        ay.data("plot").shutdown();
        au.resize();
        D.clearRect(0, 0, J, L);
        B.unbind();
        ay.children().not([aC, ag]).remove();
      }
      ay.data("plot", au);
    }
    function ak() {
      if (R.grid.hoverable) {
        B.mousemove(ad);
        B.mouseleave(m);
      }
      if (R.grid.clickable) {
        B.click(U);
      }
      aq(an.bindEvents, [B]);
    }
    function aj() {
      if (P) {
        clearTimeout(P);
      }
      B.unbind("mousemove", ad);
      B.unbind("mouseleave", m);
      B.unbind("click", U);
      aq(an.shutdown, [B]);
    }
    function s(aJ) {
      function aF(aK) {
        return aK;
      }
      var aI,
        aE,
        aG = aJ.options.transform || aF,
        aH = aJ.options.inverseTransform;
      if (aJ.direction == "x") {
        aI = aJ.scale = j / Math.abs(aG(aJ.max) - aG(aJ.min));
        aE = Math.min(aG(aJ.max), aG(aJ.min));
      } else {
        aI = aJ.scale = z / Math.abs(aG(aJ.max) - aG(aJ.min));
        aI = -aI;
        aE = Math.max(aG(aJ.max), aG(aJ.min));
      }
      if (aG == aF) {
        aJ.p2c = function (aK) {
          return (aK - aE) * aI;
        };
      } else {
        aJ.p2c = function (aK) {
          return (aG(aK) - aE) * aI;
        };
      }
      if (!aH) {
        aJ.c2p = function (aK) {
          return aE + aK / aI;
        };
      } else {
        aJ.c2p = function (aK) {
          return aH(aE + aK / aI);
        };
      }
    }
    function O(aG) {
      var aE = aG.options,
        aI,
        aM = aG.ticks || [],
        aL = [],
        aH,
        aN = aE.labelWidth,
        aJ = aE.labelHeight,
        aF;
      function aK(aP, aO) {
        return d(
          '<div style="position:absolute;top:-10000px;' +
            aO +
            'font-size:smaller"><div class="' +
            aG.direction +
            "Axis " +
            aG.direction +
            aG.n +
            'Axis">' +
            aP.join("") +
            "</div></div>"
        ).appendTo(ay);
      }
      if (aG.direction == "x") {
        if (aN == null) {
          aN = Math.floor(J / (aM.length > 0 ? aM.length : 1));
        }
        if (aJ == null) {
          aL = [];
          for (aI = 0; aI < aM.length; ++aI) {
            aH = aM[aI].label;
            if (aH) {
              aL.push(
                '<div class="tickLabel" style="float:left;width:' +
                  aN +
                  'px">' +
                  aH +
                  "</div>"
              );
            }
          }
          if (aL.length > 0) {
            aL.push('<div style="clear:left"></div>');
            aF = aK(aL, "width:10000px;");
            aJ = aF.height();
            aF.remove();
          }
        }
      } else {
        if (aN == null || aJ == null) {
          for (aI = 0; aI < aM.length; ++aI) {
            aH = aM[aI].label;
            if (aH) {
              aL.push('<div class="tickLabel">' + aH + "</div>");
            }
          }
          if (aL.length > 0) {
            aF = aK(aL, "");
            if (aN == null) {
              aN = aF.children().width();
            }
            if (aJ == null) {
              aJ = aF.find("div.tickLabel").height();
            }
            aF.remove();
          }
        }
      }
      if (aN == null) {
        aN = 0;
      }
      if (aJ == null) {
        aJ = 0;
      }
      aG.labelWidth = aN;
      aG.labelHeight = aJ;
    }
    function ax(aG) {
      var aF = aG.labelWidth,
        aO = aG.labelHeight,
        aK = aG.options.position,
        aI = aG.options.tickLength,
        aJ = R.grid.axisMargin,
        aM = R.grid.labelMargin,
        aN = aG.direction == "x" ? q : az,
        aH;
      var aE = d.grep(aN, function (aQ) {
        return aQ && aQ.options.position == aK && aQ.reserveSpace;
      });
      if (d.inArray(aG, aE) == aE.length - 1) {
        aJ = 0;
      }
      if (aI == null) {
        aI = "full";
      }
      var aL = d.grep(aN, function (aQ) {
        return aQ && aQ.reserveSpace;
      });
      var aP = d.inArray(aG, aL) == 0;
      if (!aP && aI == "full") {
        aI = 5;
      }
      if (!isNaN(+aI)) {
        aM += +aI;
      }
      if (aG.direction == "x") {
        aO += aM;
        if (aK == "bottom") {
          r.bottom += aO + aJ;
          aG.box = { top: L - r.bottom, height: aO };
        } else {
          aG.box = { top: r.top + aJ, height: aO };
          r.top += aO + aJ;
        }
      } else {
        aF += aM;
        if (aK == "left") {
          aG.box = { left: r.left + aJ, width: aF };
          r.left += aF + aJ;
        } else {
          r.right += aF + aJ;
          aG.box = { left: J - r.right, width: aF };
        }
      }
      aG.position = aK;
      aG.tickLength = aI;
      aG.box.padding = aM;
      aG.innermost = aP;
    }
    function X(aE) {
      if (aE.direction == "x") {
        aE.box.left = r.left;
        aE.box.width = j;
      } else {
        aE.box.top = r.top;
        aE.box.height = z;
      }
    }
    function u() {
      var aF,
        aH = n();
      d.each(aH, function (aI, aJ) {
        aJ.show = aJ.options.show;
        if (aJ.show == null) {
          aJ.show = aJ.used;
        }
        aJ.reserveSpace = aJ.show || aJ.options.reserveSpace;
        o(aJ);
      });
      allocatedAxes = d.grep(aH, function (aI) {
        return aI.reserveSpace;
      });
      r.left = r.right = r.top = r.bottom = 0;
      if (R.grid.show) {
        d.each(allocatedAxes, function (aI, aJ) {
          V(aJ);
          S(aJ);
          at(aJ, aJ.ticks);
          O(aJ);
        });
        for (aF = allocatedAxes.length - 1; aF >= 0; --aF) {
          ax(allocatedAxes[aF]);
        }
        var aG = R.grid.minBorderMargin;
        if (aG == null) {
          aG = 0;
          for (aF = 0; aF < T.length; ++aF) {
            aG = Math.max(aG, T[aF].points.radius + T[aF].points.lineWidth / 2);
          }
        }
        for (var aE in r) {
          r[aE] += R.grid.borderWidth;
          r[aE] = Math.max(aG, r[aE]);
        }
      }
      j = J - r.left - r.right;
      z = L - r.bottom - r.top;
      d.each(aH, function (aI, aJ) {
        s(aJ);
      });
      if (R.grid.show) {
        d.each(allocatedAxes, function (aI, aJ) {
          X(aJ);
        });
        l();
      }
      p();
    }
    function o(aH) {
      var aI = aH.options,
        aG = +(aI.min != null ? aI.min : aH.datamin),
        aE = +(aI.max != null ? aI.max : aH.datamax),
        aK = aE - aG;
      if (aK == 0) {
        var aF = aE == 0 ? 1 : 0.01;
        if (aI.min == null) {
          aG -= aF;
        }
        if (aI.max == null || aI.min != null) {
          aE += aF;
        }
      } else {
        var aJ = aI.autoscaleMargin;
        if (aJ != null) {
          if (aI.min == null) {
            aG -= aK * aJ;
            if (aG < 0 && aH.datamin != null && aH.datamin >= 0) {
              aG = 0;
            }
          }
          if (aI.max == null) {
            aE += aK * aJ;
            if (aE > 0 && aH.datamax != null && aH.datamax <= 0) {
              aE = 0;
            }
          }
        }
      }
      aH.min = aG;
      aH.max = aE;
    }
    function V(aJ) {
      var aP = aJ.options;
      var aK;
      if (typeof aP.ticks == "number" && aP.ticks > 0) {
        aK = aP.ticks;
      } else {
        aK = 0.3 * Math.sqrt(aJ.direction == "x" ? J : L);
      }
      var aW = (aJ.max - aJ.min) / aK,
        aR,
        aE,
        aQ,
        aU,
        aV,
        aT,
        aL;
      if (aP.mode == "time") {
        var aM = {
          second: 1000,
          minute: 60 * 1000,
          hour: 60 * 60 * 1000,
          day: 24 * 60 * 60 * 1000,
          month: 30 * 24 * 60 * 60 * 1000,
          year: 365.2425 * 24 * 60 * 60 * 1000,
        };
        var aN = [
          [1, "second"],
          [2, "second"],
          [5, "second"],
          [10, "second"],
          [30, "second"],
          [1, "minute"],
          [2, "minute"],
          [5, "minute"],
          [10, "minute"],
          [30, "minute"],
          [1, "hour"],
          [2, "hour"],
          [4, "hour"],
          [8, "hour"],
          [12, "hour"],
          [1, "day"],
          [2, "day"],
          [3, "day"],
          [0.25, "month"],
          [0.5, "month"],
          [1, "month"],
          [2, "month"],
          [3, "month"],
          [6, "month"],
          [1, "year"],
        ];
        var aF = 0;
        if (aP.minTickSize != null) {
          if (typeof aP.tickSize == "number") {
            aF = aP.tickSize;
          } else {
            aF = aP.minTickSize[0] * aM[aP.minTickSize[1]];
          }
        }
        for (var aV = 0; aV < aN.length - 1; ++aV) {
          if (
            aW <
              (aN[aV][0] * aM[aN[aV][1]] + aN[aV + 1][0] * aM[aN[aV + 1][1]]) /
                2 &&
            aN[aV][0] * aM[aN[aV][1]] >= aF
          ) {
            break;
          }
        }
        aR = aN[aV][0];
        aQ = aN[aV][1];
        if (aQ == "year") {
          aT = Math.pow(10, Math.floor(Math.log(aW / aM.year) / Math.LN10));
          aL = aW / aM.year / aT;
          if (aL < 1.5) {
            aR = 1;
          } else {
            if (aL < 3) {
              aR = 2;
            } else {
              if (aL < 7.5) {
                aR = 5;
              } else {
                aR = 10;
              }
            }
          }
          aR *= aT;
        }
        aJ.tickSize = aP.tickSize || [aR, aQ];
        aE = function (a0) {
          var a5 = [],
            a3 = a0.tickSize[0],
            a6 = a0.tickSize[1],
            a4 = new Date(a0.min);
          var aZ = a3 * aM[a6];
          if (a6 == "second") {
            a4.setUTCSeconds(a(a4.getUTCSeconds(), a3));
          }
          if (a6 == "minute") {
            a4.setUTCMinutes(a(a4.getUTCMinutes(), a3));
          }
          if (a6 == "hour") {
            a4.setUTCHours(a(a4.getUTCHours(), a3));
          }
          if (a6 == "month") {
            a4.setUTCMonth(a(a4.getUTCMonth(), a3));
          }
          if (a6 == "year") {
            a4.setUTCFullYear(a(a4.getUTCFullYear(), a3));
          }
          a4.setUTCMilliseconds(0);
          if (aZ >= aM.minute) {
            a4.setUTCSeconds(0);
          }
          if (aZ >= aM.hour) {
            a4.setUTCMinutes(0);
          }
          if (aZ >= aM.day) {
            a4.setUTCHours(0);
          }
          if (aZ >= aM.day * 4) {
            a4.setUTCDate(1);
          }
          if (aZ >= aM.year) {
            a4.setUTCMonth(0);
          }
          var a8 = 0,
            a7 = Number.NaN,
            a1;
          do {
            a1 = a7;
            a7 = a4.getTime();
            a5.push(a7);
            if (a6 == "month") {
              if (a3 < 1) {
                a4.setUTCDate(1);
                var aY = a4.getTime();
                a4.setUTCMonth(a4.getUTCMonth() + 1);
                var a2 = a4.getTime();
                a4.setTime(a7 + a8 * aM.hour + (a2 - aY) * a3);
                a8 = a4.getUTCHours();
                a4.setUTCHours(0);
              } else {
                a4.setUTCMonth(a4.getUTCMonth() + a3);
              }
            } else {
              if (a6 == "year") {
                a4.setUTCFullYear(a4.getUTCFullYear() + a3);
              } else {
                a4.setTime(a7 + aZ);
              }
            }
          } while (a7 < a0.max && a7 != a1);
          return a5;
        };
        aU = function (aY, a1) {
          var a3 = new Date(aY);
          if (aP.timeformat != null) {
            return d.plot.formatDate(a3, aP.timeformat, aP.monthNames);
          }
          var aZ = a1.tickSize[0] * aM[a1.tickSize[1]];
          var a0 = a1.max - a1.min;
          var a2 = aP.twelveHourClock ? " %p" : "";
          if (aZ < aM.minute) {
            fmt = "%h:%M:%S" + a2;
          } else {
            if (aZ < aM.day) {
              if (a0 < 2 * aM.day) {
                fmt = "%h:%M" + a2;
              } else {
                fmt = "%b %d %h:%M" + a2;
              }
            } else {
              if (aZ < aM.month) {
                fmt = "%b %d";
              } else {
                if (aZ < aM.year) {
                  if (a0 < aM.year) {
                    fmt = "%b";
                  } else {
                    fmt = "%b %y";
                  }
                } else {
                  fmt = "%y";
                }
              }
            }
          }
          return d.plot.formatDate(a3, fmt, aP.monthNames);
        };
      } else {
        var aX = aP.tickDecimals;
        var aS = -Math.floor(Math.log(aW) / Math.LN10);
        if (aX != null && aS > aX) {
          aS = aX;
        }
        aT = Math.pow(10, -aS);
        aL = aW / aT;
        if (aL < 1.5) {
          aR = 1;
        } else {
          if (aL < 3) {
            aR = 2;
            if (aL > 2.25 && (aX == null || aS + 1 <= aX)) {
              aR = 2.5;
              ++aS;
            }
          } else {
            if (aL < 7.5) {
              aR = 5;
            } else {
              aR = 10;
            }
          }
        }
        aR *= aT;
        if (aP.minTickSize != null && aR < aP.minTickSize) {
          aR = aP.minTickSize;
        }
        aJ.tickDecimals = Math.max(0, aX != null ? aX : aS);
        aJ.tickSize = aP.tickSize || aR;
        aE = function (a0) {
          var a2 = [];
          var a3 = a(a0.min, a0.tickSize),
            aZ = 0,
            aY = Number.NaN,
            a1;
          do {
            a1 = aY;
            aY = a3 + aZ * a0.tickSize;
            a2.push(aY);
            ++aZ;
          } while (aY < a0.max && aY != a1);
          return a2;
        };
        aU = function (aY, aZ) {
          return aY.toFixed(aZ.tickDecimals);
        };
      }
      if (aP.alignTicksWithAxis != null) {
        var aI = (aJ.direction == "x" ? q : az)[aP.alignTicksWithAxis - 1];
        if (aI && aI.used && aI != aJ) {
          var aO = aE(aJ);
          if (aO.length > 0) {
            if (aP.min == null) {
              aJ.min = Math.min(aJ.min, aO[0]);
            }
            if (aP.max == null && aO.length > 1) {
              aJ.max = Math.max(aJ.max, aO[aO.length - 1]);
            }
          }
          aE = function (a0) {
            var a1 = [],
              aY,
              aZ;
            for (aZ = 0; aZ < aI.ticks.length; ++aZ) {
              aY = (aI.ticks[aZ].v - aI.min) / (aI.max - aI.min);
              aY = a0.min + aY * (a0.max - a0.min);
              a1.push(aY);
            }
            return a1;
          };
          if (aJ.mode != "time" && aP.tickDecimals == null) {
            var aH = Math.max(0, -Math.floor(Math.log(aW) / Math.LN10) + 1),
              aG = aE(aJ);
            if (
              !(aG.length > 1 && /\..*0$/.test((aG[1] - aG[0]).toFixed(aH)))
            ) {
              aJ.tickDecimals = aH;
            }
          }
        }
      }
      aJ.tickGenerator = aE;
      if (d.isFunction(aP.tickFormatter)) {
        aJ.tickFormatter = function (aY, aZ) {
          return "" + aP.tickFormatter(aY, aZ);
        };
      } else {
        aJ.tickFormatter = aU;
      }
    }
    function S(aI) {
      var aK = aI.options.ticks,
        aJ = [];
      if (aK == null || (typeof aK == "number" && aK > 0)) {
        aJ = aI.tickGenerator(aI);
      } else {
        if (aK) {
          if (d.isFunction(aK)) {
            aJ = aK({ min: aI.min, max: aI.max });
          } else {
            aJ = aK;
          }
        }
      }
      var aH, aE;
      aI.ticks = [];
      for (aH = 0; aH < aJ.length; ++aH) {
        var aF = null;
        var aG = aJ[aH];
        if (typeof aG == "object") {
          aE = +aG[0];
          if (aG.length > 1) {
            aF = aG[1];
          }
        } else {
          aE = +aG;
        }
        if (aF == null) {
          aF = aI.tickFormatter(aE, aI);
        }
        if (!isNaN(aE)) {
          aI.ticks.push({ v: aE, label: aF });
        }
      }
    }
    function at(aE, aF) {
      if (aE.options.autoscaleMargin && aF.length > 0) {
        if (aE.options.min == null) {
          aE.min = Math.min(aE.min, aF[0].v);
        }
        if (aE.options.max == null && aF.length > 1) {
          aE.max = Math.max(aE.max, aF[aF.length - 1].v);
        }
      }
    }
    function Z() {
      K.clearRect(0, 0, J, L);
      var aF = R.grid;
      if (aF.show && aF.backgroundColor) {
        Q();
      }
      if (aF.show && !aF.aboveData) {
        af();
      }
      for (var aE = 0; aE < T.length; ++aE) {
        aq(an.drawSeries, [K, T[aE]]);
        e(T[aE]);
      }
      aq(an.draw, [K]);
      if (aF.show && aF.aboveData) {
        af();
      }
    }
    function G(aE, aL) {
      var aH,
        aK,
        aJ,
        aG,
        aI = n();
      for (i = 0; i < aI.length; ++i) {
        aH = aI[i];
        if (aH.direction == aL) {
          aG = aL + aH.n + "axis";
          if (!aE[aG] && aH.n == 1) {
            aG = aL + "axis";
          }
          if (aE[aG]) {
            aK = aE[aG].from;
            aJ = aE[aG].to;
            break;
          }
        }
      }
      if (!aE[aG]) {
        aH = aL == "x" ? q[0] : az[0];
        aK = aE[aL + "1"];
        aJ = aE[aL + "2"];
      }
      if (aK != null && aJ != null && aK > aJ) {
        var aF = aK;
        aK = aJ;
        aJ = aF;
      }
      return { from: aK, to: aJ, axis: aH };
    }
    function Q() {
      K.save();
      K.translate(r.left, r.top);
      K.fillStyle = ap(R.grid.backgroundColor, z, 0, "rgba(255, 255, 255, 0)");
      K.fillRect(0, 0, j, z);
      K.restore();
    }
    function af() {
      var aI;
      K.save();
      K.translate(r.left, r.top);
      var aK = R.grid.markings;
      if (aK) {
        if (d.isFunction(aK)) {
          var aN = au.getAxes();
          aN.xmin = aN.xaxis.min;
          aN.xmax = aN.xaxis.max;
          aN.ymin = aN.yaxis.min;
          aN.ymax = aN.yaxis.max;
          aK = aK(aN);
        }
        for (aI = 0; aI < aK.length; ++aI) {
          var aG = aK[aI],
            aF = G(aG, "x"),
            aL = G(aG, "y");
          if (aF.from == null) {
            aF.from = aF.axis.min;
          }
          if (aF.to == null) {
            aF.to = aF.axis.max;
          }
          if (aL.from == null) {
            aL.from = aL.axis.min;
          }
          if (aL.to == null) {
            aL.to = aL.axis.max;
          }
          if (
            aF.to < aF.axis.min ||
            aF.from > aF.axis.max ||
            aL.to < aL.axis.min ||
            aL.from > aL.axis.max
          ) {
            continue;
          }
          aF.from = Math.max(aF.from, aF.axis.min);
          aF.to = Math.min(aF.to, aF.axis.max);
          aL.from = Math.max(aL.from, aL.axis.min);
          aL.to = Math.min(aL.to, aL.axis.max);
          if (aF.from == aF.to && aL.from == aL.to) {
            continue;
          }
          aF.from = aF.axis.p2c(aF.from);
          aF.to = aF.axis.p2c(aF.to);
          aL.from = aL.axis.p2c(aL.from);
          aL.to = aL.axis.p2c(aL.to);
          if (aF.from == aF.to || aL.from == aL.to) {
            K.beginPath();
            K.strokeStyle = aG.color || R.grid.markingsColor;
            K.lineWidth = aG.lineWidth || R.grid.markingsLineWidth;
            K.moveTo(aF.from, aL.from);
            K.lineTo(aF.to, aL.to);
            K.stroke();
          } else {
            K.fillStyle = aG.color || R.grid.markingsColor;
            K.fillRect(aF.from, aL.to, aF.to - aF.from, aL.from - aL.to);
          }
        }
      }
      var aN = n(),
        aP = R.grid.borderWidth;
      for (var aH = 0; aH < aN.length; ++aH) {
        var aE = aN[aH],
          aJ = aE.box,
          aT = aE.tickLength,
          aQ,
          aO,
          aS,
          aM;
        if (!aE.show || aE.ticks.length == 0) {
          continue;
        }
        K.strokeStyle =
          aE.options.tickColor ||
          d.color.parse(aE.options.color).scale("a", 0.22).toString();
        K.lineWidth = 1;
        if (aE.direction == "x") {
          aQ = 0;
          if (aT == "full") {
            aO = aE.position == "top" ? 0 : z;
          } else {
            aO = aJ.top - r.top + (aE.position == "top" ? aJ.height : 0);
          }
        } else {
          aO = 0;
          if (aT == "full") {
            aQ = aE.position == "left" ? 0 : j;
          } else {
            aQ = aJ.left - r.left + (aE.position == "left" ? aJ.width : 0);
          }
        }
        if (!aE.innermost) {
          K.beginPath();
          aS = aM = 0;
          if (aE.direction == "x") {
            aS = j;
          } else {
            aM = z;
          }
          if (K.lineWidth == 1) {
            aQ = Math.floor(aQ) + 0.5;
            aO = Math.floor(aO) + 0.5;
          }
          K.moveTo(aQ, aO);
          K.lineTo(aQ + aS, aO + aM);
          K.stroke();
        }
        K.beginPath();
        for (aI = 0; aI < aE.ticks.length; ++aI) {
          var aR = aE.ticks[aI].v;
          aS = aM = 0;
          if (
            aR < aE.min ||
            aR > aE.max ||
            (aT == "full" && aP > 0 && (aR == aE.min || aR == aE.max))
          ) {
            continue;
          }
          if (aE.direction == "x") {
            aQ = aE.p2c(aR);
            aM = aT == "full" ? -z : aT;
            if (aE.position == "top") {
              aM = -aM;
            }
          } else {
            aO = aE.p2c(aR);
            aS = aT == "full" ? -j : aT;
            if (aE.position == "left") {
              aS = -aS;
            }
          }
          if (K.lineWidth == 1) {
            if (aE.direction == "x") {
              aQ = Math.floor(aQ) + 0.5;
            } else {
              aO = Math.floor(aO) + 0.5;
            }
          }
          K.moveTo(aQ, aO);
          K.lineTo(aQ + aS, aO + aM);
        }
        K.stroke();
      }
      if (aP) {
        K.lineWidth = aP;
        K.strokeStyle = R.grid.borderColor;
        K.strokeRect(-aP / 2, -aP / 2, j + aP, z + aP);
      }
      K.restore();
    }
    function l() {
      ay.find(".tickLabels").remove();
      var aJ = ['<div class="tickLabels" style="font-size:smaller">'];
      var aM = n();
      for (var aG = 0; aG < aM.length; ++aG) {
        var aF = aM[aG],
          aI = aF.box;
        if (!aF.show) {
          continue;
        }
        aJ.push(
          '<div class="' +
            aF.direction +
            "Axis " +
            aF.direction +
            aF.n +
            'Axis" style="color:' +
            aF.options.color +
            '">'
        );
        for (var aH = 0; aH < aF.ticks.length; ++aH) {
          var aK = aF.ticks[aH];
          if (!aK.label || aK.v < aF.min || aK.v > aF.max) {
            continue;
          }
          var aN = {},
            aL;
          if (aF.direction == "x") {
            aL = "center";
            aN.left = Math.round(r.left + aF.p2c(aK.v) - aF.labelWidth / 2);
            if (aF.position == "bottom") {
              aN.top = aI.top + aI.padding;
            } else {
              aN.bottom = L - (aI.top + aI.height - aI.padding);
            }
          } else {
            aN.top = Math.round(r.top + aF.p2c(aK.v) - aF.labelHeight / 2);
            if (aF.position == "left") {
              aN.right = J - (aI.left + aI.width - aI.padding);
              aL = "right";
            } else {
              aN.left = aI.left + aI.padding;
              aL = "left";
            }
          }
          aN.width = aF.labelWidth;
          var aE = ["position:absolute", "text-align:" + aL];
          for (var aO in aN) {
            aE.push(aO + ":" + aN[aO] + "px");
          }
          aJ.push(
            '<div class="tickLabel" style="' +
              aE.join(";") +
              '">' +
              aK.label +
              "</div>"
          );
        }
        aJ.push("</div>");
      }
      aJ.push("</div>");
      ay.append(aJ.join(""));
    }
    function e(aE) {
      if (aE.lines.show) {
        aw(aE);
      }
      if (aE.bars.show) {
        f(aE);
      }
      if (aE.points.show) {
        ar(aE);
      }
    }
    function aw(aH) {
      function aG(aS, aT, aL, aX, aW) {
        var aY = aS.points,
          aM = aS.pointsize,
          aQ = null,
          aP = null;
        K.beginPath();
        for (var aR = aM; aR < aY.length; aR += aM) {
          var aO = aY[aR - aM],
            aV = aY[aR - aM + 1],
            aN = aY[aR],
            aU = aY[aR + 1];
          if (aO == null || aN == null) {
            continue;
          }
          if (aV <= aU && aV < aW.min) {
            if (aU < aW.min) {
              continue;
            }
            aO = ((aW.min - aV) / (aU - aV)) * (aN - aO) + aO;
            aV = aW.min;
          } else {
            if (aU <= aV && aU < aW.min) {
              if (aV < aW.min) {
                continue;
              }
              aN = ((aW.min - aV) / (aU - aV)) * (aN - aO) + aO;
              aU = aW.min;
            }
          }
          if (aV >= aU && aV > aW.max) {
            if (aU > aW.max) {
              continue;
            }
            aO = ((aW.max - aV) / (aU - aV)) * (aN - aO) + aO;
            aV = aW.max;
          } else {
            if (aU >= aV && aU > aW.max) {
              if (aV > aW.max) {
                continue;
              }
              aN = ((aW.max - aV) / (aU - aV)) * (aN - aO) + aO;
              aU = aW.max;
            }
          }
          if (aO <= aN && aO < aX.min) {
            if (aN < aX.min) {
              continue;
            }
            aV = ((aX.min - aO) / (aN - aO)) * (aU - aV) + aV;
            aO = aX.min;
          } else {
            if (aN <= aO && aN < aX.min) {
              if (aO < aX.min) {
                continue;
              }
              aU = ((aX.min - aO) / (aN - aO)) * (aU - aV) + aV;
              aN = aX.min;
            }
          }
          if (aO >= aN && aO > aX.max) {
            if (aN > aX.max) {
              continue;
            }
            aV = ((aX.max - aO) / (aN - aO)) * (aU - aV) + aV;
            aO = aX.max;
          } else {
            if (aN >= aO && aN > aX.max) {
              if (aO > aX.max) {
                continue;
              }
              aU = ((aX.max - aO) / (aN - aO)) * (aU - aV) + aV;
              aN = aX.max;
            }
          }
          if (aO != aQ || aV != aP) {
            K.moveTo(aX.p2c(aO) + aT, aW.p2c(aV) + aL);
          }
          aQ = aN;
          aP = aU;
          K.lineTo(aX.p2c(aN) + aT, aW.p2c(aU) + aL);
        }
        K.stroke();
      }
      function aI(aL, aT, aS) {
        var aZ = aL.points,
          aY = aL.pointsize,
          aQ = Math.min(Math.max(0, aS.min), aS.max),
          a0 = 0,
          aX,
          aW = false,
          aP = 1,
          aO = 0,
          aU = 0;
        while (true) {
          if (aY > 0 && a0 > aZ.length + aY) {
            break;
          }
          a0 += aY;
          var a2 = aZ[a0 - aY],
            aN = aZ[a0 - aY + aP],
            a1 = aZ[a0],
            aM = aZ[a0 + aP];
          if (aW) {
            if (aY > 0 && a2 != null && a1 == null) {
              aU = a0;
              aY = -aY;
              aP = 2;
              continue;
            }
            if (aY < 0 && a0 == aO + aY) {
              K.fill();
              aW = false;
              aY = -aY;
              aP = 1;
              a0 = aO = aU + aY;
              continue;
            }
          }
          if (a2 == null || a1 == null) {
            continue;
          }
          if (a2 <= a1 && a2 < aT.min) {
            if (a1 < aT.min) {
              continue;
            }
            aN = ((aT.min - a2) / (a1 - a2)) * (aM - aN) + aN;
            a2 = aT.min;
          } else {
            if (a1 <= a2 && a1 < aT.min) {
              if (a2 < aT.min) {
                continue;
              }
              aM = ((aT.min - a2) / (a1 - a2)) * (aM - aN) + aN;
              a1 = aT.min;
            }
          }
          if (a2 >= a1 && a2 > aT.max) {
            if (a1 > aT.max) {
              continue;
            }
            aN = ((aT.max - a2) / (a1 - a2)) * (aM - aN) + aN;
            a2 = aT.max;
          } else {
            if (a1 >= a2 && a1 > aT.max) {
              if (a2 > aT.max) {
                continue;
              }
              aM = ((aT.max - a2) / (a1 - a2)) * (aM - aN) + aN;
              a1 = aT.max;
            }
          }
          if (!aW) {
            K.beginPath();
            K.moveTo(aT.p2c(a2), aS.p2c(aQ));
            aW = true;
          }
          if (aN >= aS.max && aM >= aS.max) {
            K.lineTo(aT.p2c(a2), aS.p2c(aS.max));
            K.lineTo(aT.p2c(a1), aS.p2c(aS.max));
            continue;
          } else {
            if (aN <= aS.min && aM <= aS.min) {
              K.lineTo(aT.p2c(a2), aS.p2c(aS.min));
              K.lineTo(aT.p2c(a1), aS.p2c(aS.min));
              continue;
            }
          }
          var aR = a2,
            aV = a1;
          if (aN <= aM && aN < aS.min && aM >= aS.min) {
            a2 = ((aS.min - aN) / (aM - aN)) * (a1 - a2) + a2;
            aN = aS.min;
          } else {
            if (aM <= aN && aM < aS.min && aN >= aS.min) {
              a1 = ((aS.min - aN) / (aM - aN)) * (a1 - a2) + a2;
              aM = aS.min;
            }
          }
          if (aN >= aM && aN > aS.max && aM <= aS.max) {
            a2 = ((aS.max - aN) / (aM - aN)) * (a1 - a2) + a2;
            aN = aS.max;
          } else {
            if (aM >= aN && aM > aS.max && aN <= aS.max) {
              a1 = ((aS.max - aN) / (aM - aN)) * (a1 - a2) + a2;
              aM = aS.max;
            }
          }
          if (a2 != aR) {
            K.lineTo(aT.p2c(aR), aS.p2c(aN));
          }
          K.lineTo(aT.p2c(a2), aS.p2c(aN));
          K.lineTo(aT.p2c(a1), aS.p2c(aM));
          if (a1 != aV) {
            K.lineTo(aT.p2c(a1), aS.p2c(aM));
            K.lineTo(aT.p2c(aV), aS.p2c(aM));
          }
        }
      }
      K.save();
      K.translate(r.left, r.top);
      K.lineJoin = "round";
      var aJ = aH.lines.lineWidth,
        aE = aH.shadowSize;
      if (aJ > 0 && aE > 0) {
        K.lineWidth = aE;
        K.strokeStyle = "rgba(0,0,0,0.1)";
        var aK = Math.PI / 18;
        aG(
          aH.datapoints,
          Math.sin(aK) * (aJ / 2 + aE / 2),
          Math.cos(aK) * (aJ / 2 + aE / 2),
          aH.xaxis,
          aH.yaxis
        );
        K.lineWidth = aE / 2;
        aG(
          aH.datapoints,
          Math.sin(aK) * (aJ / 2 + aE / 4),
          Math.cos(aK) * (aJ / 2 + aE / 4),
          aH.xaxis,
          aH.yaxis
        );
      }
      K.lineWidth = aJ;
      K.strokeStyle = aH.color;
      var aF = ah(aH.lines, aH.color, 0, z);
      if (aF) {
        K.fillStyle = aF;
        aI(aH.datapoints, aH.xaxis, aH.yaxis);
      }
      if (aJ > 0) {
        aG(aH.datapoints, 0, 0, aH.xaxis, aH.yaxis);
      }
      K.restore();
    }
    function ar(aH) {
      function aK(aQ, aP, aX, aN, aV, aW, aT, aM) {
        var aU = aQ.points,
          aL = aQ.pointsize;
        for (var aO = 0; aO < aU.length; aO += aL) {
          var aS = aU[aO],
            aR = aU[aO + 1];
          if (
            aS == null ||
            aS < aW.min ||
            aS > aW.max ||
            aR < aT.min ||
            aR > aT.max
          ) {
            continue;
          }
          K.beginPath();
          aS = aW.p2c(aS);
          aR = aT.p2c(aR) + aN;
          if (aM == "circle") {
            K.arc(aS, aR, aP, 0, aV ? Math.PI : Math.PI * 2, false);
          } else {
            aM(K, aS, aR, aP, aV);
          }
          K.closePath();
          if (aX) {
            K.fillStyle = aX;
            K.fill();
          }
          K.stroke();
        }
      }
      K.save();
      K.translate(r.left, r.top);
      var aJ = aH.points.lineWidth,
        aF = aH.shadowSize,
        aE = aH.points.radius,
        aI = aH.points.symbol;
      if (aJ > 0 && aF > 0) {
        var aG = aF / 2;
        K.lineWidth = aG;
        K.strokeStyle = "rgba(0,0,0,0.1)";
        aK(aH.datapoints, aE, null, aG + aG / 2, true, aH.xaxis, aH.yaxis, aI);
        K.strokeStyle = "rgba(0,0,0,0.2)";
        aK(aH.datapoints, aE, null, aG / 2, true, aH.xaxis, aH.yaxis, aI);
      }
      K.lineWidth = aJ;
      K.strokeStyle = aH.color;
      aK(
        aH.datapoints,
        aE,
        ah(aH.points, aH.color),
        0,
        false,
        aH.xaxis,
        aH.yaxis,
        aI
      );
      K.restore();
    }
    function H(aQ, aP, aY, aL, aT, aI, aG, aO, aN, aX, aU, aF) {
      var aH, aW, aM, aS, aJ, aE, aR, aK, aV;
      if (aU) {
        aK = aE = aR = true;
        aJ = false;
        aH = aY;
        aW = aQ;
        aS = aP + aL;
        aM = aP + aT;
        if (aW < aH) {
          aV = aW;
          aW = aH;
          aH = aV;
          aJ = true;
          aE = false;
        }
      } else {
        aJ = aE = aR = true;
        aK = false;
        aH = aQ + aL;
        aW = aQ + aT;
        aM = aY;
        aS = aP;
        if (aS < aM) {
          aV = aS;
          aS = aM;
          aM = aV;
          aK = true;
          aR = false;
        }
      }
      if (aW < aO.min || aH > aO.max || aS < aN.min || aM > aN.max) {
        return;
      }
      if (aH < aO.min) {
        aH = aO.min;
        aJ = false;
      }
      if (aW > aO.max) {
        aW = aO.max;
        aE = false;
      }
      if (aM < aN.min) {
        aM = aN.min;
        aK = false;
      }
      if (aS > aN.max) {
        aS = aN.max;
        aR = false;
      }
      aH = aO.p2c(aH);
      aM = aN.p2c(aM);
      aW = aO.p2c(aW);
      aS = aN.p2c(aS);
      if (aG) {
        aX.beginPath();
        aX.moveTo(aH, aM);
        aX.lineTo(aH, aS);
        aX.lineTo(aW, aS);
        aX.lineTo(aW, aM);
        aX.fillStyle = aG(aM, aS);
        aX.fill();
      }
      if (aF > 0 && (aJ || aE || aR || aK)) {
        aX.beginPath();
        aX.moveTo(aH, aM + aI);
        if (aJ) {
          aX.lineTo(aH, aS + aI);
        } else {
          aX.moveTo(aH, aS + aI);
        }
        if (aR) {
          aX.lineTo(aW, aS + aI);
        } else {
          aX.moveTo(aW, aS + aI);
        }
        if (aE) {
          aX.lineTo(aW, aM + aI);
        } else {
          aX.moveTo(aW, aM + aI);
        }
        if (aK) {
          aX.lineTo(aH, aM + aI);
        } else {
          aX.moveTo(aH, aM + aI);
        }
        aX.stroke();
      }
    }
    function f(aG) {
      function aF(aM, aL, aO, aJ, aN, aQ, aP) {
        var aR = aM.points,
          aI = aM.pointsize;
        for (var aK = 0; aK < aR.length; aK += aI) {
          if (aR[aK] == null) {
            continue;
          }
          H(
            aR[aK],
            aR[aK + 1],
            aR[aK + 2],
            aL,
            aO,
            aJ,
            aN,
            aQ,
            aP,
            K,
            aG.bars.horizontal,
            aG.bars.lineWidth
          );
        }
      }
      K.save();
      K.translate(r.left, r.top);
      K.lineWidth = aG.bars.lineWidth;
      K.strokeStyle = aG.color;
      var aE = aG.bars.align == "left" ? 0 : -aG.bars.barWidth / 2;
      var aH = aG.bars.fill
        ? function (aI, aJ) {
            return ah(aG.bars, aG.color, aI, aJ);
          }
        : null;
      aF(aG.datapoints, aE, aE + aG.bars.barWidth, 0, aH, aG.xaxis, aG.yaxis);
      K.restore();
    }
    function ah(aG, aE, aF, aI) {
      var aH = aG.fill;
      if (!aH) {
        return null;
      }
      if (aG.fillColor) {
        return ap(aG.fillColor, aF, aI, aE);
      }
      var aJ = d.color.parse(aE);
      aJ.a = typeof aH == "number" ? aH : 0.4;
      aJ.normalize();
      return aJ.toString();
    }
    function p() {
      ay.find(".legend").remove();
      if (!R.legend.show) {
        return;
      }
      var aK = [],
        aI = false,
        aQ = R.legend.labelFormatter,
        aP,
        aM;
      for (var aH = 0; aH < T.length; ++aH) {
        aP = T[aH];
        aM = aP.label;
        if (!aM) {
          continue;
        }
        if (aH % R.legend.noColumns == 0) {
          if (aI) {
            aK.push("</tr>");
          }
          aK.push("<tr>");
          aI = true;
        }
        if (aQ) {
          aM = aQ(aM, aP);
        }
        aK.push(
          '<td class="legendColorBox"><div style="border:1px solid ' +
            R.legend.labelBoxBorderColor +
            ';padding:1px"><div style="width:4px;height:0;border:5px solid ' +
            aP.color +
            ';overflow:hidden"></div></div></td><td class="legendLabel">' +
            aM +
            "</td>"
        );
      }
      if (aI) {
        aK.push("</tr>");
      }
      if (aK.length == 0) {
        return;
      }
      var aO =
        '<table style="font-size:smaller;color:' +
        R.grid.color +
        '">' +
        aK.join("") +
        "</table>";
      if (R.legend.container != null) {
        d(R.legend.container).html(aO);
      } else {
        var aL = "",
          aF = R.legend.position,
          aG = R.legend.margin;
        if (aG[0] == null) {
          aG = [aG, aG];
        }
        if (aF.charAt(0) == "n") {
          aL += "top:" + (aG[1] + r.top) + "px;";
        } else {
          if (aF.charAt(0) == "s") {
            aL += "bottom:" + (aG[1] + r.bottom) + "px;";
          }
        }
        if (aF.charAt(1) == "e") {
          aL += "right:" + (aG[0] + r.right) + "px;";
        } else {
          if (aF.charAt(1) == "w") {
            aL += "left:" + (aG[0] + r.left) + "px;";
          }
        }
        var aN = d(
          '<div class="legend">' +
            aO.replace('style="', 'style="position:absolute;' + aL + ";") +
            "</div>"
        ).appendTo(ay);
        if (R.legend.backgroundOpacity != 0) {
          var aJ = R.legend.backgroundColor;
          if (aJ == null) {
            aJ = R.grid.backgroundColor;
            if (aJ && typeof aJ == "string") {
              aJ = d.color.parse(aJ);
            } else {
              aJ = d.color.extract(aN, "background-color");
            }
            aJ.a = 1;
            aJ = aJ.toString();
          }
          var aE = aN.children();
          d(
            '<div style="position:absolute;width:' +
              aE.width() +
              "px;height:" +
              aE.height() +
              "px;" +
              aL +
              "background-color:" +
              aJ +
              ';"> </div>'
          )
            .prependTo(aN)
            .css("opacity", R.legend.backgroundOpacity);
        }
      }
    }
    var ae = [],
      P = null;
    function N(aL, aJ, aG) {
      var aR = R.grid.mouseActiveRadius,
        a3 = aR * aR + 1,
        a1 = null,
        aU = false,
        aZ,
        aX;
      for (aZ = T.length - 1; aZ >= 0; --aZ) {
        if (!aG(T[aZ])) {
          continue;
        }
        var aS = T[aZ],
          aK = aS.xaxis,
          aI = aS.yaxis,
          aY = aS.datapoints.points,
          aW = aS.datapoints.pointsize,
          aT = aK.c2p(aL),
          aQ = aI.c2p(aJ),
          aF = aR / aK.scale,
          aE = aR / aI.scale;
        if (aK.options.inverseTransform) {
          aF = Number.MAX_VALUE;
        }
        if (aI.options.inverseTransform) {
          aE = Number.MAX_VALUE;
        }
        if (aS.lines.show || aS.points.show) {
          for (aX = 0; aX < aY.length; aX += aW) {
            var aN = aY[aX],
              aM = aY[aX + 1];
            if (aN == null) {
              continue;
            }
            if (
              aN - aT > aF ||
              aN - aT < -aF ||
              aM - aQ > aE ||
              aM - aQ < -aE
            ) {
              continue;
            }
            var aP = Math.abs(aK.p2c(aN) - aL),
              aO = Math.abs(aI.p2c(aM) - aJ),
              aV = aP * aP + aO * aO;
            if (aV < a3) {
              a3 = aV;
              a1 = [aZ, aX / aW];
            }
          }
        }
        if (aS.bars.show && !a1) {
          var aH = aS.bars.align == "left" ? 0 : -aS.bars.barWidth / 2,
            a0 = aH + aS.bars.barWidth;
          for (aX = 0; aX < aY.length; aX += aW) {
            var aN = aY[aX],
              aM = aY[aX + 1],
              a2 = aY[aX + 2];
            if (aN == null) {
              continue;
            }
            if (
              T[aZ].bars.horizontal
                ? aT <= Math.max(a2, aN) &&
                  aT >= Math.min(a2, aN) &&
                  aQ >= aM + aH &&
                  aQ <= aM + a0
                : aT >= aN + aH &&
                  aT <= aN + a0 &&
                  aQ >= Math.min(a2, aM) &&
                  aQ <= Math.max(a2, aM)
            ) {
              a1 = [aZ, aX / aW];
            }
          }
        }
      }
      if (a1) {
        aZ = a1[0];
        aX = a1[1];
        aW = T[aZ].datapoints.pointsize;
        return {
          datapoint: T[aZ].datapoints.points.slice(aX * aW, (aX + 1) * aW),
          dataIndex: aX,
          series: T[aZ],
          seriesIndex: aZ,
        };
      }
      return null;
    }
    function ad(aE) {
      if (R.grid.hoverable) {
        v("plothover", aE, function (aF) {
          return aF.hoverable != false;
        });
      }
    }
    function m(aE) {
      if (R.grid.hoverable) {
        v("plothover", aE, function (aF) {
          return false;
        });
      }
    }
    function U(aE) {
      v("plotclick", aE, function (aF) {
        return aF.clickable != false;
      });
    }
    function v(aF, aE, aG) {
      var aH = B.offset(),
        aK = aE.pageX - aH.left - r.left,
        aI = aE.pageY - aH.top - r.top,
        aM = F({ left: aK, top: aI });
      aM.pageX = aE.pageX;
      aM.pageY = aE.pageY;
      var aN = N(aK, aI, aG);
      if (aN) {
        aN.pageX = parseInt(
          aN.series.xaxis.p2c(aN.datapoint[0]) + aH.left + r.left
        );
        aN.pageY = parseInt(
          aN.series.yaxis.p2c(aN.datapoint[1]) + aH.top + r.top
        );
      }
      if (R.grid.autoHighlight) {
        for (var aJ = 0; aJ < ae.length; ++aJ) {
          var aL = ae[aJ];
          if (
            aL.auto == aF &&
            !(
              aN &&
              aL.series == aN.series &&
              aL.point[0] == aN.datapoint[0] &&
              aL.point[1] == aN.datapoint[1]
            )
          ) {
            W(aL.series, aL.point);
          }
        }
        if (aN) {
          A(aN.series, aN.datapoint, aF);
        }
      }
      ay.trigger(aF, [aM, aN]);
    }
    function g() {
      if (!P) {
        P = setTimeout(t, 30);
      }
    }
    function t() {
      P = null;
      D.save();
      D.clearRect(0, 0, J, L);
      D.translate(r.left, r.top);
      var aF, aE;
      for (aF = 0; aF < ae.length; ++aF) {
        aE = ae[aF];
        if (aE.series.bars.show) {
          w(aE.series, aE.point);
        } else {
          aB(aE.series, aE.point);
        }
      }
      D.restore();
      aq(an.drawOverlay, [D]);
    }
    function A(aG, aE, aI) {
      if (typeof aG == "number") {
        aG = T[aG];
      }
      if (typeof aE == "number") {
        var aH = aG.datapoints.pointsize;
        aE = aG.datapoints.points.slice(aH * aE, aH * (aE + 1));
      }
      var aF = ao(aG, aE);
      if (aF == -1) {
        ae.push({ series: aG, point: aE, auto: aI });
        g();
      } else {
        if (!aI) {
          ae[aF].auto = false;
        }
      }
    }
    function W(aG, aE) {
      if (aG == null && aE == null) {
        ae = [];
        g();
      }
      if (typeof aG == "number") {
        aG = T[aG];
      }
      if (typeof aE == "number") {
        aE = aG.data[aE];
      }
      var aF = ao(aG, aE);
      if (aF != -1) {
        ae.splice(aF, 1);
        g();
      }
    }
    function ao(aG, aH) {
      for (var aE = 0; aE < ae.length; ++aE) {
        var aF = ae[aE];
        if (aF.series == aG && aF.point[0] == aH[0] && aF.point[1] == aH[1]) {
          return aE;
        }
      }
      return -1;
    }
    function aB(aH, aG) {
      var aF = aG[0],
        aL = aG[1],
        aK = aH.xaxis,
        aJ = aH.yaxis;
      if (aF < aK.min || aF > aK.max || aL < aJ.min || aL > aJ.max) {
        return;
      }
      var aI = aH.points.radius + aH.points.lineWidth / 2;
      D.lineWidth = aI;
      D.strokeStyle = d.color.parse(aH.color).scale("a", 0.5).toString();
      var aE = 1.5 * aI,
        aF = aK.p2c(aF),
        aL = aJ.p2c(aL);
      D.beginPath();
      if (aH.points.symbol == "circle") {
        D.arc(aF, aL, aE, 0, 2 * Math.PI, false);
      } else {
        aH.points.symbol(D, aF, aL, aE, false);
      }
      D.closePath();
      D.stroke();
    }
    function w(aH, aE) {
      D.lineWidth = aH.bars.lineWidth;
      D.strokeStyle = d.color.parse(aH.color).scale("a", 0.5).toString();
      var aG = d.color.parse(aH.color).scale("a", 0.5).toString();
      var aF = aH.bars.align == "left" ? 0 : -aH.bars.barWidth / 2;
      H(
        aE[0],
        aE[1],
        aE[2] || 0,
        aF,
        aF + aH.bars.barWidth,
        0,
        function () {
          return aG;
        },
        aH.xaxis,
        aH.yaxis,
        D,
        aH.bars.horizontal,
        aH.bars.lineWidth
      );
    }
    function ap(aM, aE, aK, aF) {
      if (typeof aM == "string") {
        return aM;
      } else {
        var aL = K.createLinearGradient(0, aK, 0, aE);
        for (var aH = 0, aG = aM.colors.length; aH < aG; ++aH) {
          var aI = aM.colors[aH];
          if (typeof aI != "string") {
            var aJ = d.color.parse(aF);
            if (aI.brightness != null) {
              aJ = aJ.scale("rgb", aI.brightness);
            }
            if (aI.opacity != null) {
              aJ.a *= aI.opacity;
            }
            aI = aJ.toString();
          }
          aL.addColorStop(aH / (aG - 1), aI);
        }
        return aL;
      }
    }
  }
  d.plot = function (h, f, e) {
    var g = new b(d(h), f, e, d.plot.plugins);
    return g;
  };
  d.plot.version = "0.7";
  d.plot.plugins = [];
  d.plot.formatDate = function (l, f, h) {
    var o = function (q) {
      q = "" + q;
      return q.length == 1 ? "0" + q : q;
    };
    var e = [];
    var p = false,
      j = false;
    var n = l.getUTCHours();
    var k = n < 12;
    if (h == null) {
      h = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }
    if (f.search(/%p|%P/) != -1) {
      if (n > 12) {
        n = n - 12;
      } else {
        if (n == 0) {
          n = 12;
        }
      }
    }
    for (var g = 0; g < f.length; ++g) {
      var m = f.charAt(g);
      if (p) {
        switch (m) {
          case "h":
            m = "" + n;
            break;
          case "H":
            m = o(n);
            break;
          case "M":
            m = o(l.getUTCMinutes());
            break;
          case "S":
            m = o(l.getUTCSeconds());
            break;
          case "d":
            m = "" + l.getUTCDate();
            break;
          case "m":
            m = "" + (l.getUTCMonth() + 1);
            break;
          case "y":
            m = "" + l.getUTCFullYear();
            break;
          case "b":
            m = "" + h[l.getUTCMonth()];
            break;
          case "p":
            m = k ? "am" : "pm";
            break;
          case "P":
            m = k ? "AM" : "PM";
            break;
          case "0":
            m = "";
            j = true;
            break;
        }
        if (m && j) {
          m = o(m);
          j = false;
        }
        e.push(m);
        if (!j) {
          p = false;
        }
      } else {
        if (m == "%") {
          p = true;
        } else {
          e.push(m);
        }
      }
    }
    return e.join("");
  };
  function a(f, e) {
    return e * Math.floor(f / e);
  }
})(jQuery);
var using_build_maker = 0;
jQuery.fn.stripTags = function () {
  return this.replaceWith(this.html().replace(/<\/?[^>]+>/gi, ""));
};
jQuery.fn.reverse = function () {
  return this.pushStack(this.get().reverse(), arguments);
};
function tableAddData(b, d) {
  var a = $(b).dataTable();
  a.fnAddData(window[d]);
}
function buildUrlVars() {
  var f = [],
    e;
  var b = 0;
  var a = window.location.href
    .replace(site_root + "/dota-2/", "")
    .replace("www.", "")
    .split("/");
  a.shift();
  var d = a.length;
  while (b <= d) {
    f.push(a[b]);
    f[a[b]] = a[b + 1];
    b += 2;
  }
  return f;
}
function getPositions(d) {
  var e = $(d);
  var f = e.position();
  var b = e.width();
  var a = e.height();
  return [
    [f.left, f.left + b],
    [f.top, f.top + a],
  ];
}
function comparePositions(e, d) {
  var b = e[0] < d[0] ? e : d;
  var a = e[0] < d[0] ? d : e;
  return b[1] > a[0] || b[0] === a[0] ? true : false;
}
function round(e, b, j) {
  var a, d, g, h;
  b |= 0;
  a = Math.pow(10, b);
  e *= a;
  h = (e > 0) | -(e < 0);
  g = e % 1 === 0.5 * h;
  d = Math.floor(e);
  if (g) {
    switch (j) {
      case "PHP_ROUND_HALF_DOWN":
        e = d + (h < 0);
        break;
      case "PHP_ROUND_HALF_EVEN":
        e = d + (d % 2) * h;
        break;
      case "PHP_ROUND_HALF_ODD":
        e = d + !(d % 2);
        break;
      default:
        e = d + (h > 0);
    }
  }
  return (g ? e : Math.round(e)) / a;
}
function getFPGuideData(d, b) {
  var a = $.ajax({
    url: site_root + "/ajax_guide_data.php",
    type: "POST",
    timeout: "10000",
    dataType: "json",
    data: { hero_id: b, type: d },
    success: function (j) {
      var g = "";
      var f, h, e, k;
      if (j.length) {
        for (i in j) {
          if (j.hasOwnProperty(i)) {
            f = j[i]["hero_url_name"] ? "/" + j[i]["hero_url_name"] : "";
            e = j[i]["hero_icon"]
              ? '<a href="' +
                site_root +
                "/dota-2/hero/i/" +
                j[i]["hero_id_name"] +
                "/" +
                j[i]["hero_url_name"] +
                '" class="hero_mini_icon_tt" style="display: inline;"><img style="float: left; width: 16px; height: 16px; margin-right: 4px;" src="' +
                site_root +
                "/images/hero_icons/" +
                j[i]["hero_icon"] +
                '.png"></a>'
              : "";
            if (d == "top") {
              k =
                j[i]["guide_display_name"].length > 32
                  ? $.trim(j[i]["guide_display_name"].substr(0, 32)) + "..."
                  : j[i]["guide_display_name"];
              h = '<td class="center">' + j[i]["guide_rating"] + "</td>";
            } else {
              if (d == "latest") {
                k =
                  j[i]["guide_display_name"].length > 26
                    ? $.trim(j[i]["guide_display_name"].substr(0, 26)) + "..."
                    : j[i]["guide_display_name"];
                h = '<td class="center">' + j[i]["guide_submit_date"] + "</td>";
              } else {
                if (d == "hot-week") {
                  k =
                    j[i]["guide_display_name"].length > 32
                      ? $.trim(j[i]["guide_display_name"].substr(0, 32)) + "..."
                      : j[i]["guide_display_name"];
                  h = '<td class="center">' + j[i]["guide_rating"] + "</td>";
                } else {
                  if (d == "hot-month") {
                    k =
                      j[i]["guide_display_name"].length > 32
                        ? $.trim(j[i]["guide_display_name"].substr(0, 32)) +
                          "..."
                        : j[i]["guide_display_name"];
                    h = '<td class="center">' + j[i]["guide_rating"] + "</td>";
                  }
                }
              }
            }
            g +=
              "<tr><td>" +
              e +
              '<a href="' +
              site_root +
              "/dota-2/guide/i/" +
              j[i]["guide_id_name"] +
              f +
              "/" +
              j[i]["guide_url_name"] +
              '" class="core_link">' +
              k +
              "</a></td>" +
              h +
              "</tr>";
          }
        }
      }
      if (d == "top") {
        $("#tabs-top-guides").html(
          '<table class="basic_table fp_guide_table"><tbody>' +
            g +
            "</tbody></table>"
        );
      } else {
        if (d == "latest") {
          $("#tabs-latest-guides").html(
            '<table class="basic_table fp_guide_table"><tbody>' +
              g +
              "</tbody></table>"
          );
        } else {
          if (d == "hot-week") {
            $("#tabs-hot-week-guides").html(
              '<table class="basic_table fp_guide_table"><tbody>' +
                g +
                "</tbody></table>"
            );
          } else {
            if (d == "hot-month") {
              $("#tabs-hot-month-guides").html(
                '<table class="basic_table fp_guide_table"><tbody>' +
                  g +
                  "</tbody></table>"
              );
            }
          }
        }
      }
      tooltip.find_links();
      clickableFPGuideTables();
    },
    timeout: function (e) {
      $(".fp_hero_select_wrapper").html(
        "Quick guide request timed out, server may be overloaded. Please try again in a few minutes."
      );
    },
    error: function (e, g, f) {
      $(".fp_hero_select_wrapper").html(
        "Quick guide change hero request failed: " + f + " " + g
      );
    },
  });
}
function clickableFPGuideTables() {
  $("#tabs-top-guides table tbody, #tabs-latest-guides table tbody").click(
    function (a) {
      if (a.target.tagName != "A") {
        var b = $(a.target).parents("tr:first");
        $(b)
          .children()
          .each(function () {
            if ($(this).find("a.core_link").length) {
              var d = $(this).find("a.core_link").first().attr("href");
              window.location = d;
            }
          });
      }
    }
  );
}
var item_filters = {
  0: ["", "", 0, [], 0],
  1: ["Durability", "text", 1, "0", 6],
};
var item_filter_groups = { "": [0], General: [1] };
function makeAdvFilters(l, n) {
  var k = "";
  var b;
  var g;
  var q;
  var p;
  var s = $('select[name="f[]"]').size();
  var h =
    '<select name="fe[]"><option value="g">&gt;</option><option value="gt">&gt;=</option><option value="l">&lt;</option><option value="lt">&lt;=</option><option value="e">=</option></select>';
  k += '<div><select name="f[]" id="f' + s + '">';
  for (i in n) {
    if (n.hasOwnProperty(i)) {
      if (i != "") {
        k += '<optgroup label="' + i + '">';
      }
      for (ii in n[i]) {
        if (n[i].hasOwnProperty(ii)) {
          k +=
            '<option value="' + n[i][ii] + '">' + l[n[i][ii]][0] + "</option>";
        }
      }
      if (i != "") {
        k += "</optgroup>";
      }
    }
  }
  var e = s >= 1 ? '<a href="" class="adv_filter_remove">Remove</a>' : "";
  k += "</select>" + e + "</div>";
  $(".adv_filters").append(k);
  $(document).on("change", "#f" + s, function (v) {
    var w = $(this).val();
    var f = $('select[name="f[]"]').size();
    if (l[w] && w != 0) {
      b = l[w][2] == 1 ? h : "";
      if (l[w][1] == "select") {
        g = '<select name="fo[]">';
        for (fk in l[w][3]) {
          if (l[w][3].hasOwnProperty(fk)) {
            g +=
              '<option value="' +
              l[w][3][fk][0] +
              '">' +
              l[w][3][fk][1] +
              "</option>";
          }
        }
        g += "</select>";
      } else {
        if (l[w][1] == "text") {
          q = l[w][4] > 0 ? ' size="' + l[w][4] + '"' : "";
          p = l[w][3] ? ' value="' + l[w][3] + '"' : "";
          g = '<input type="text" name="fo[]"' + p + q + "></input>";
        }
      }
      if (f == 1) {
        g += '<a href="" class="adv_filter_clear">Clear</a>';
      } else {
        g += '<a href="" class="adv_filter_remove">Remove</a>';
      }
      $(this).parent().find("a").remove();
      $(this)
        .parent()
        .find(':input[name="fe[]"], :input[name="fo[]"]')
        .remove();
      $(this)
        .parent()
        .find(':input[name="f[]"]')
        .after(b + g);
    } else {
      $(this)
        .parent()
        .find(':input[name="fe[]"], :input[name="fo[]"]')
        .remove();
    }
  });
  if (filter_run_once == 1) {
    filter_run_once = 0;
    var a = buildUrlVars();
    if (typeof a.f != "undefined") {
      $(".adv_filters div:last").remove();
      var t = a.f.split(":");
      if (t.length > 5) {
        t = t.splice(0, 5);
      }
      for (fi in t) {
        if (t.hasOwnProperty(fi)) {
          makeAdvFilters(l, n);
          $(".adv_filters div").eq(fi).find(':input[name="f[]"]').val(t[fi]);
        }
      }
    }
    if (typeof a.fe != "undefined") {
      var m = a.fe.split(":");
      if (m.length > 5) {
        m = m.splice(0, 5);
      }
      var o = 0;
      for (fei in m) {
        if (m.hasOwnProperty(fei)) {
          if (
            m[fei] == "gt" ||
            m[fei] == "lt" ||
            m[fei] == "g" ||
            m[fei] == "l" ||
            m[fei] == "e"
          ) {
            $(".adv_filters div").eq(o).find(':input[name="f[]"]').after(h);
            $(".adv_filters div").eq(o).find(':input[name="fe[]"]').val(m[fei]);
          }
          o++;
        }
      }
    }
    if (typeof a.fo != "undefined") {
      var j = a.fo.split(":");
      if (j.length > 5) {
        j = j.splice(0, 5);
      }
      var o = 0;
      var u;
      var d = "";
      for (foi in j) {
        if (j.hasOwnProperty(foi)) {
          u = $(".adv_filters div").eq(o).find(':input[name="f[]"]').val();
          if (l[u][1] == "select") {
            d = '<select name="fo[]">';
            for (fok in l[u][3]) {
              if (l[u][3].hasOwnProperty(fok)) {
                d +=
                  '<option value="' +
                  l[u][3][fok][0] +
                  '">' +
                  l[u][3][fok][1] +
                  "</option>";
              }
            }
            d += "</select>";
          } else {
            if (l[u][1] == "text") {
              q = l[u][4] > 0 ? ' size="' + l[u][4] + '"' : "";
              p = l[u][3] ? ' value="' + decodeURIComponent(l[u][3]) + '"' : "";
              d = '<input type="text" name="fo[]"' + p + q + "></input>";
            }
          }
          if (
            $(".adv_filters div").eq(o).find(':input[name="fe[]"]').size() >= 1
          ) {
            $(".adv_filters div").eq(o).find(':input[name="fe[]"]').after(d);
          } else {
            $(".adv_filters div").eq(o).find(':input[name="f[]"]').after(d);
          }
          $(".adv_filters div")
            .eq(o)
            .find(':input[name="fo[]"]')
            .val(decodeURIComponent(j[foi]));
          o++;
        }
      }
    }
    if (typeof a.f != "undefined") {
      var r = $('select[name="f[]"]').size();
      if (r > 1) {
        $(".adv_filters div:first").append(
          '<a href="" class="adv_filter_remove">Remove</a>'
        );
      } else {
        $(".adv_filters div:first").append(
          '<a href="" class="adv_filter_clear">Clear</a>'
        );
      }
    }
    s = $('select[name="f[]"]').size();
    if (s < 5 && $(".adv_filter_new").size() == 0) {
      $(".adv_filters").after(
        '<div><a href="#" class="adv_filter_new">Add Another Filter</a></div>'
      );
    }
    $(document).on("click", ".adv_filter_new", function (v) {
      v.preventDefault();
      makeAdvFilters(l, n);
      $(".adv_filters div").first().find("a").remove();
      var f = $(':input[name="f[]"]').size();
      if ($(".adv_filters div select").val() != "0") {
        if (f == 1) {
          $(".adv_filters div")
            .first()
            .append('<a href="" class="adv_filter_clear">Clear</a>');
        } else {
          $(".adv_filters div")
            .first()
            .append('<a href="" class="adv_filter_remove">Remove</a>');
        }
      } else {
        $(".adv_filters div")
          .first()
          .append('<a href="" class="adv_filter_remove">Remove</a>');
      }
      if (f >= 5) {
        $(this).parent().remove();
      }
    });
    $(document).on("click", ".adv_filter_remove", function (v) {
      v.preventDefault();
      $(this).parent().remove();
      var f = $(':input[name="f[]"]').size();
      if (f == 1) {
        if ($(".adv_filters div select").val() != "0") {
          $(".adv_filters div")
            .first()
            .find("a")
            .attr("class", "adv_filter_clear");
          $(".adv_filters div").first().find("a").html("Clear");
        } else {
          $(".adv_filters div").first().find("a").remove();
        }
      }
      if (f < 5 && !$(".adv_filter_new").size()) {
        $(".adv_filters").after(
          '<div><a href="#" class="adv_filter_new">Add Another Filter</a></div>'
        );
      }
    });
    $(document).on("click", ".adv_filter_clear", function (f) {
      f.preventDefault();
      $(this)
        .parent()
        .find(':input[name="fe[]"], :input[name="fo[]"]')
        .remove();
      $(this).parent().find(':input[name="f[]"]').val("0");
      $(this).remove();
    });
  }
}
function insertAds() {
  if (site_root.indexOf("127.0.0.1") == -1) {
    $("#fluffly_bunny_header_holder").html(
      '<iframe width="728" height="90" src="' +
        site_root +
        '/leaderboard_ad.html"></iframe>'
    );
    $("#fluffly_bunny_body_holder").html(
      '<iframe width="300" height="250" src="' +
        site_root +
        '/medrec_ad.html"></iframe>'
    );
  }
}
function showAds(a) {
  if (a == "body") {
    $("#fluffly_bunny_body_holder").css("visibility", "");
  } else {
    if ("header") {
      $("#fluffly_bunny_header_holder").css("visibility", "");
    } else {
      $("#fluffly_bunny_body_holder").css("visibility", "");
      $("#fluffly_bunny_header_holder").css("visibility", "");
    }
  }
}
function hideAds(a) {
  if (a == "body") {
    $("#fluffly_bunny_body_holder").css("visibility", "hidden");
  } else {
    if ("header") {
      $("#fluffly_bunny_header_holder").css("visibility", "hidden");
    } else {
      $("#fluffly_bunny_body_holder").css("visibility", "hidden");
      $("#fluffly_bunny_header_holder").css("visibility", "hidden");
    }
  }
}
var ajax_items = new Array();
var ajax_abilities = new Array();
var ajax_heroes = new Array();
var ajax_npcs = new Array();
var matched_items = new Array();
function db_bb_parser(j) {
  var f = j.indexOf("[code]");
  var h = j.indexOf("[/code]");
  var a = new Array();
  if (f >= 0 && h >= 0) {
    var d = j.match(/\[code\]([\s\S]*?)\[\/code\]/gim);
    for (var e = 0; e < d.length; e++) {
      a[e] = d[e];
    }
  }
  var b = new Array(
    /\[item\="?([\s\S]*?)"?\]/gim,
    /\[ability\="?([\s\S]*?)"?\]/gim,
    /\[hero\="?([\s\S]*?)"?\]/gim,
    /\[npc\="?([\s\S]*?)"?\]/gim
  );
  var g;
  for (var e = 0; e < b.length; e++) {
    g = j.match(b[e]);
    for (c in g) {
      if (g.hasOwnProperty(c)) {
        match_split = g[c].split("=");
        item_id = match_split[1].replace("]", "");
        item_type = match_split[0].replace("[", "");
        if (item_type == "item" && jQuery.inArray(item_id, ajax_items) == -1) {
          ajax_items.push(item_id);
        } else {
          if (
            item_type == "ability" &&
            jQuery.inArray(item_id, ajax_abilities) == -1
          ) {
            ajax_abilities.push(item_id);
          } else {
            if (
              item_type == "hero" &&
              jQuery.inArray(item_id, ajax_heroes) == -1
            ) {
              ajax_heroes.push(item_id);
            } else {
              if (
                item_type == "npcs" &&
                jQuery.inArray(item_id, ajax_npcs) == -1
              ) {
                ajax_npcs.push(item_id);
              }
            }
          }
        }
      }
    }
    if (g) {
      matched_items = matched_items.concat(g);
    }
  }
}
function bbcode_parser(j, b) {
  var k = j.indexOf("[code]");
  var n = j.indexOf("[/code]");
  var e = new Array();
  if (k >= 0 && n >= 0) {
    var g = j.match(/\[code\]([\s\S]*?)\[\/code\]/gim);
    for (var f = 0; f < g.length; f++) {
      e[f] = g[f];
    }
  }
  var d = new Array(
    /\[b\]([\s\S]*?)\[\/b\]/gim,
    /\[u\]([\s\S]*?)\[\/u\]/gim,
    /\[i\]([\s\S]*?)\[\/i\]/gim,
    /\[sup\]([\s\S]*?)\[\/sup\]/gim,
    /\[sub\]([\s\S]*?)\[\/sub\]/gim,
    /\[url\]([\s\S]*?)\[\/url\]/gim,
    /\[url\="?([\s\S]*?)"?\]([\s\S]*?)\[\/url\]/gim,
    /\[list="?(\*|a|d)?"?\]([\s\S]*?)\[\/list\]/gim,
    /\[\*\]([\s\S]*?)\[\/\*\]/gim,
    /\[s\]([\s\S]*?)\[\/s\]/gim,
    /\[code\]([\s\S]*?)\[\/code\]/gim,
    /\[img\]([\s\S]*?)\[\/img\]/gim,
    /\[quote\]([\s\S]*?)\[\/quote\]/gim,
    /\[quote\="?([\s\S]*?)"?\]([\s\S]*?)\[\/quote\]/gim
  );
  var m = new Array(
    "<strong>$1</strong>",
    "<u>$1</u>",
    "<em>$1</em>",
    "<sup>$1</sup>",
    "<sub>$1</sub>",
    '<a href="$1" rel="nofollow" target="_blank">$1</a>',
    '<a href="$1" rel="nofollow" target="_blank">$2</a>',
    '<ul class="$1">$2</ul>',
    "<li>$1</li>",
    "<s>$1</s>",
    "<code><div>Code:</div>$1</code>",
    '<img src="$1" />',
    '<div class="comment_quote"><em>Quote:</em><br />$1</div>',
    '<div class="comment_quote"><em><strong>$1</strong> said:</em><div class="comment_quote_message">$2</div></div>'
  );
  var a = new Array(
    /:D/g,
    /XD/g,
    /\<3/g,
    /:\?/g,
    /:x/g,
    /B\)/g,
    /:\(/g,
    /:\)/g,
    /:-\)/g,
    /:-\(/g,
    /;\)/g,
    /;-\)/g,
    /:P/g,
    /\>:\(/g,
    /:o/g,
    /:O/g,
    /:laugh:/g,
    /:lol:/g,
    /:blush:/g,
    /:sick:/g,
    /:wub:/g,
    /:cry:/g,
    /:woot:/g,
    /:kiss:/g
  );
  var h = new Array(
    "emoticon_grin.png",
    "emoticon_pinch.png",
    "emoticon_heart.png",
    "emoticon_wondering.png",
    "emoticon_crossed.png",
    "emoticon_cool.png",
    "emoticon_sad.png",
    "emoticon_smile.png",
    "emoticon_smile.png",
    "emoticon_smile.png",
    "emoticon_sad.png",
    "emoticon_wink.png",
    "emoticon_cwy.png",
    "emoticon_wink.png",
    "emoticon_tongue.png",
    "emoticon_angry.png",
    "emoticon_shocked.png",
    "emoticon_shocked.png",
    "emoticon_laughing.png",
    "emoticon_laughing.png",
    "emoticon_blush.png",
    "emoticon_sick.png",
    "emoticon_wub.png",
    "emoticon_cwy.png",
    "emoticon_w00t.png",
    "emoticon_kiss.png"
  );
  var l;
  for (var f = 0; f < d.length; f++) {
    if (b == 0 && f == 11) {
      j = j.replace(d[f], "");
    } else {
      j = j.replace(d[f], m[f]);
    }
  }
  for (var f = 0; f < a.length; f++) {
    j = j.replace(
      a[f],
      '<img src="' +
        site_root +
        "/images/emoticons/" +
        h[f] +
        '" alt="" border="0" style="vertical-align: bottom;" />'
    );
  }
  if (k >= 0 && n >= 0) {
    var g = j.match(/\<code\>([\s\S]*?)\<\/code\>/gim);
    for (var f = 0; f < g.length; f++) {
      j = j.replace(g[f], e[f].replace(d[10], m[10]));
    }
  }
  return j;
}
function replaceAjaxData(a, d, e) {
  var b;
  if (
    a == "item" &&
    typeof bbcode_items != "undefined" &&
    typeof bbcode_items[d] != "undefined"
  ) {
    b =
      '<div class="item_icon_block_small_inline"><a class="item_icon_tt_small" href="' +
      site_root +
      "/dota-2/item/i/" +
      d +
      "/" +
      bbcode_items[d][3] +
      '"><img class="item_icon_small" src="' +
      site_root +
      "/images/item_icons/medium/" +
      bbcode_items[d][1] +
      '.png"></a></div>';
    e = e.replace(
      matched_items[i],
      b +
        '<a href="' +
        site_root +
        "/dota-2/item/i/" +
        bbcode_items[d][4] +
        "/" +
        bbcode_items[d][3] +
        '" class="q' +
        bbcode_items[d][2] +
        '">' +
        bbcode_items[d][0] +
        "</a>"
    );
  } else {
    if (
      a == "ability" &&
      typeof bbcode_abilities != "undefined" &&
      typeof bbcode_abilities[d] != "undefined"
    ) {
      b =
        '<div class="ability_icon_block_small_inline"><a class="ability_icon_tt_small_inline" href="' +
        site_root +
        "/dota-2/ability/i/" +
        d +
        "/" +
        bbcode_abilities[d][2] +
        '"><img class="ability_icon_small_inline" src="' +
        site_root +
        "/images/ability_icons/medium/" +
        bbcode_abilities[d][1] +
        '.png"></a></div>';
      e = e.replace(
        matched_items[i],
        b +
          '<a href="' +
          site_root +
          "/dota-2/ability/i/" +
          bbcode_abilities[d][3] +
          "/" +
          bbcode_abilities[d][2] +
          '" class="q0">' +
          bbcode_abilities[d][0] +
          "</a>"
      );
    } else {
      if (
        a == "hero" &&
        typeof bbcode_heroes != "undefined" &&
        typeof bbcode_heroes[d] != "undefined"
      ) {
        b =
          '<div class="hero_icon_block_small_inline"><a class="hero_icon_tt_small_inline" href="' +
          site_root +
          "/dota-2/hero/i/" +
          d +
          "/" +
          bbcode_heroes[d][2] +
          '"><img class="hero_icon_small_inline" src="' +
          site_root +
          "/images/hero_portraits/medium/" +
          bbcode_heroes[d][1] +
          '.png"></a></div>';
        e = e.replace(
          matched_items[i],
          b +
            '<a href="' +
            site_root +
            "/dota-2/hero/i/" +
            bbcode_heroes[d][3] +
            "/" +
            bbcode_heroes[d][2] +
            '" class="q0">' +
            bbcode_heroes[d][0] +
            "</a>"
        );
      } else {
        if (
          a == "npc" &&
          typeof bbcode_npcs != "undefined" &&
          typeof bbcode_npcs[d] != "undefined"
        ) {
          e = e.replace(
            matched_items[i],
            '<a href="' +
              site_root +
              "/dota-2/npc/i/" +
              bbcode_npcs[d][2] +
              '" class="q0">' +
              bbcode_npcs[d][0] +
              "</a>"
          );
        }
      }
    }
  }
  return e;
}
function getBBCodeData(b) {
  var a = $(".view_guide_text_wrapper").html();
  for (i in b) {
    if (b.hasOwnProperty(i)) {
      match_split = b[i].split("=");
      item_id = match_split[1].replace("]", "");
      item_type = match_split[0].replace("[", "");
      a = replaceAjaxData(item_type, item_id, a);
      $(".forum_post_message").each(function (d) {
        var e = $(this).html();
        e = replaceAjaxData(item_type, item_id, e);
        $(this).html(e);
      });
    }
  }
  $(".view_guide_text_wrapper").html(a);
}
function createNum(a, d, b) {
  return (
    '<span class="' +
    b +
    '" style="position: absolute; right: 0px; bottom: 0px; text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;">' +
    d +
    a +
    "</span>"
  );
}
function reportIt(a, d, b, e) {
  if (!$("#lightbox-panel").length) {
    $(
      '<div id="lightbox-panel" class="lightbox-panel"><h1>Report ' +
        b +
        ' by <a href="/profile/i/' +
        a +
        '">' +
        d +
        '</a></h1><form id="report_form"><table><tbody><tr><th>Reason: </th><td style="width: 98%;"><select id="report_reason" name="reason"><option value=""></option><option value="1">Advertising</option><option value="2">Inaccurate</option><option value="3">Out of date</option><option value="4">Spam</option><option value="5">Inappropriate</option><option value="6">Other</option></select></td></tr><tr><td colspan="2"><textarea id="report_details" name="details" rows="10" cols="30" style="width: 98%;"></textarea><span class="note">Please be as specific as possible.</span></td></tr></tbody></table></form><br /><p id="send_report_response" align="center"><a id="send_report" href="' +
        site_root +
        "/dota-2/report/u/" +
        a +
        "/ri/" +
        b +
        "/rii/" +
        e +
        '/tt/1">Send Report</a> - <a id="close-panel" href="javascript:void(0)">Close Window</a></p></div><div id="lightbox"> </div>'
    ).appendTo("body");
  } else {
    $("#lightbox-panel h1").html(
      "Report " + b + ' by <a href="/profile/i/' + a + '">' + d + "</a>"
    );
  }
  $("#lightbox, #lightbox-panel").fadeIn(300);
}
function bbcode(e, b, g) {
  var f = document.all ? true : false;
  var e = e ? e : "";
  var b = b ? b : "";
  if (f) {
    g.focus();
    var j = document.selection.createRange();
    j.text = e + j.text + b;
  } else {
    if (!f && typeof g.selectionStart != "undefined") {
      var h = g.value.substr(0, g.selectionStart);
      var a = g.value.substr(g.selectionEnd, g.value.length);
      var d = g.value.replace(h, "").replace(a, "");
      g.value = h + e + d + b + a;
      g.focus();
    } else {
      g.value += arguments[2] ? e + arguments[2] + "]" + b : e + b;
      g.focus();
    }
  }
}
function setFavicon() {
  var a = $('link[type="image/x-icon"]').remove().attr("href");
  $(
    '<link href="' + a + '" rel="shortcut icon" type="image/x-icon" />'
  ).appendTo("head");
}
function addCommas(b) {
  b += "";
  x = b.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var a = /(\d+)(\d{3})/;
  while (a.test(x1)) {
    x1 = x1.replace(a, "$1,$2");
  }
  return x1 + x2;
}
function urlencode(a) {
  a = (a + "").toString();
  return encodeURIComponent(a)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/%20/g, "+");
}
function urldecode(a) {
  return decodeURIComponent((a + "").replace(/\+/g, "%20"));
}
jQuery.fn.dataTableExt.oSort["formatted-num-asc"] = function (x, y) {
  x = x.replace(/<.*?>/g, "").toLowerCase();
  y = y.replace(/<.*?>/g, "").toLowerCase();
  x = x.replace(/[^\d\-\.\/]/g, "");
  y = y.replace(/[^\d\-\.\/]/g, "");
  if (x.indexOf("/") >= 0) {
    x = eval(x);
  }
  if (y.indexOf("/") >= 0) {
    y = eval(y);
  }
  return x / 1 - y / 1;
};
jQuery.fn.dataTableExt.oSort["formatted-num-desc"] = function (x, y) {
  x = x.replace(/<.*?>/g, "").toLowerCase();
  y = y.replace(/<.*?>/g, "").toLowerCase();
  x = x.replace(/[^\d\-\.\/]/g, "");
  y = y.replace(/[^\d\-\.\/]/g, "");
  if (x.indexOf("/") >= 0) {
    x = eval(x);
  }
  if (y.indexOf("/") >= 0) {
    y = eval(y);
  }
  return y / 1 - x / 1;
};
jQuery.fn.dataTableExt.oSort["formatted-num2-asc"] = function (f, e) {
  var d = f.split("-")[0];
  var g = e.split("-")[0];
  return d / 1 - g / 1;
};
jQuery.fn.dataTableExt.oSort["formatted-num2-desc"] = function (f, e) {
  var d = f.split("-")[0];
  var g = e.split("-")[0];
  return g / 1 - d / 1;
};
jQuery.fn.dataTableExt.oSort["title-numeric-asc"] = function (f, e) {
  var d = f.match(/title="*(-?[0-9\.]+)/)[1];
  var g = e.match(/title="*(-?[0-9\.]+)/)[1];
  d = parseFloat(d);
  g = parseFloat(g);
  return d < g ? -1 : d > g ? 1 : 0;
};
jQuery.fn.dataTableExt.oSort["title-numeric-desc"] = function (f, e) {
  var d = f.match(/title="*(-?[0-9\.]+)/)[1];
  var g = e.match(/title="*(-?[0-9\.]+)/)[1];
  d = parseFloat(d);
  g = parseFloat(g);
  return d < g ? 1 : d > g ? -1 : 0;
};
jQuery.fn.dataTableExt.oSort["title-string-asc"] = function (f, e) {
  var d = f.match(/title="(.*?)"/)[1].toLowerCase();
  var g = e.match(/title="(.*?)"/)[1].toLowerCase();
  return d < g ? -1 : d > g ? 1 : 0;
};
jQuery.fn.dataTableExt.oSort["title-string-desc"] = function (f, e) {
  var d = f.match(/title="(.*?)"/)[1].toLowerCase();
  var g = e.match(/title="(.*?)"/)[1].toLowerCase();
  return d < g ? 1 : d > g ? -1 : 0;
};
jQuery.fn.dataTableExt.oSort["alt-string-asc"] = function (f, e) {
  var d = f.match(/alt="(.*?)"/)[1].toLowerCase();
  var g = e.match(/alt="(.*?)"/)[1].toLowerCase();
  return d < g ? -1 : d > g ? 1 : 0;
};
jQuery.fn.dataTableExt.oSort["alt-string-desc"] = function (f, e) {
  var d = f.match(/alt="(.*?)"/)[1].toLowerCase();
  var g = e.match(/alt="(.*?)"/)[1].toLowerCase();
  return d < g ? 1 : d > g ? -1 : 0;
};
var custom_filters = new Object();
$.fn.dataTableExt.afnFiltering.push(function (b, e, d) {
  var m = true;
  for (var j in custom_filters) {
    if (custom_filters.hasOwnProperty(j)) {
      if (custom_filters[j].length >= 1) {
        if (custom_filters[j][1].indexOf("-") != -1) {
          var k = custom_filters[j][1].split("-");
          var a = parseFloat(k[0]);
          var g = parseFloat(k[1]);
          var h = custom_filters[j][0];
          if (typeof e[h] == "number") {
            var f = e[h];
          } else {
            var f =
              !e[h] || typeof e[h] == "undefined"
                ? 0
                : parseFloat(
                    e[h].replace(/<.*?>/g, "").replace(/[^\d\-\.\/]/g, "")
                  );
          }
          if (f >= a && f <= g) {
            m = true;
          } else {
            if (f <= g && f >= a) {
              m = true;
            } else {
              m = false;
            }
          }
        } else {
          if (
            m == true &&
            (custom_filters[j][1].indexOf(">") === 0 ||
              custom_filters[j][1].indexOf(">=") === 0 ||
              custom_filters[j][1].indexOf("<") === 0 ||
              custom_filters[j][1].indexOf("<=") === 0)
          ) {
            var l = parseFloat(custom_filters[j][1].replace(/[^0-9.]/gi, ""));
            var h = custom_filters[j][0];
            if (typeof e[h] == "number") {
              var f = e[h];
            } else {
              var f =
                !e[h] || typeof e[h] == "undefined"
                  ? 0
                  : parseFloat(
                      e[h].replace(/<.*?>/g, "").replace(/[^\d\-\.\/]/g, "")
                    );
            }
            if (custom_filters[j][1].indexOf(">") === 0 && f > l) {
              m = true;
            } else {
              if (custom_filters[j][1].indexOf(">=") === 0 && f >= l) {
                m = true;
              } else {
                if (custom_filters[j][1].indexOf("<") === 0 && f < l) {
                  m = true;
                } else {
                  if (custom_filters[j][1].indexOf("<=") === 0 && f <= l) {
                    m = true;
                  } else {
                    m = false;
                  }
                }
              }
            }
          } else {
            if (m == true) {
              var l = custom_filters[j][1];
              l = parseFloat(l) > 0 ? parseFloat(l) : l;
              var h = custom_filters[j][0];
              var f = e[h];
              if (f == l) {
                m = true;
              } else {
                if (e[h].toLowerCase().indexOf(String(l).toLowerCase()) > -1) {
                  m = true;
                } else {
                  m = false;
                }
              }
            }
          }
        }
      } else {
        m = true;
      }
    }
  }
  if (m == true) {
    return true;
  } else {
    return false;
  }
});
function heroStatsSlider() {
  $("#level_slider").slider({
    min: 1,
    max: 25,
    range: "min",
    slide: function (b, d) {
      var a = d.value;
      current_hero_level = a;
      $(".hero_icon_count").children().html(a);
      if (typeof level_stats != "undefined") {
        if (level_stats[a]) {
          for (i in level_stats[a]) {
            if (level_stats[a].hasOwnProperty(i)) {
              if ($("#" + i).length) {
                $("#" + i).html(level_stats[a][i]);
              }
            }
          }
        }
      }
      updateStats();
    },
    change: function (d, b) {
      var a = b.value;
      current_hero_level = a;
      $(".hero_icon_count").children().html(a);
      if (typeof level_stats != "undefined") {
        if (level_stats[a]) {
          for (i in level_stats[a]) {
            if (level_stats[a].hasOwnProperty(i)) {
              if ($("#" + i).length) {
                $("#" + i).html(level_stats[a][i]);
              }
            }
          }
        }
      }
      updateStats();
    },
  });
}
var items,
  econ_items,
  items_icon_list,
  abilities,
  heroes,
  guides,
  recipes,
  recipes_crafted_by,
  recipes_used_in,
  npcs,
  statistics_heroes,
  statistics_items,
  econ_bundled_in,
  econ_lootable_from,
  matches_profile,
  matches,
  phero_stats,
  phero_friends,
  phero_rivals,
  leaderboards_default,
  comments_list,
  mail_inbox,
  mail_sent,
  leaderboards_total_games,
  leaderboards_total_wins,
  leaderboards_total_kills,
  leaderboards_total_last_hits,
  leaderboards_total_denies,
  leaderboards_total_assists,
  leaderboards_total_gold_earned,
  leaderboards_total_kadr,
  leaderboards_win_percent,
  players,
  per_hero_stats,
  favorite_matches;
var pages_with_screenshots = ["item", "ability", "hero", "citem", "npc"];
var table_filterable_headers =
  "#items_default th, #abilities_default th, #heroes_default th, #guides_default th, #recipes_default th, #comments_default th, #npcs_default th, #statistics_heroes_default th, #statistics_items_default th, #matches th, #matches_profile th, #phero_stats th, #phero_friends th, #phero_rivals th, #leaderboards_default th, #players_default th";
var site_root = "./";
var menu_url = location.href;
var urlHash = window.location.hash;
var filter_run_once = 1;
var url_vars = buildUrlVars();
var hideCols = new Array();
var tableAddData = new Array();
var current_hero_level = 1;
var comments_per_page = parseInt($.cookie("comments_per_page"))
  ? $.cookie("comments_per_page")
  : 10;
var comments_cur_page = 1;
var comments_sort_type = "oldest";
var comments = [];
var numReplies = 0;
var commentReplies = [];
var commentReplies2 = [];
var lastPoint = 0;
var select_comment_tab = false;
function parseHash() {
  var e = window.location.hash.replace("#", "");
  if (e) {
    if (e.indexOf(":") != -1) {
      var g, a, d;
      var f = new Object();
      var h = e.split(";");
      var b = 0;
      for (i in h) {
        if (h.hasOwnProperty(i)) {
          d = h[i].split(":");
          g = d[0];
          a = new Object();
          a[d[0]] = d[1].split("+");
          f[b] = a;
          b++;
        }
      }
    }
  }
  return f;
}
var rebuilt_hash = new Array();
function rebuildHashTagData(f, e) {
  rebuilt_hash = new Array();
  if (typeof rebuilt_hash != "array") {
  }
  if (hash_tag_data) {
    if (f != "undefined" && f.length) {
      var a = true;
      for (var b in hash_tag_data) {
        if (hash_tag_data.hasOwnProperty(b)) {
          for (var d in hash_tag_data[b]) {
            if (hash_tag_data[b].hasOwnProperty(d)) {
              if (d == f[0]) {
                a = false;
              }
            }
          }
        }
      }
    }
    for (var b in hash_tag_data) {
      if (hash_tag_data.hasOwnProperty(b)) {
        for (var d in hash_tag_data[b]) {
          if (hash_tag_data[b].hasOwnProperty(d)) {
            if (f != "undefined" && typeof f != "undefined" && f.length) {
              if (d == f[0] && f[1][0] == hash_tag_data[b][d][0]) {
                if (f[1].length >= hash_tag_data[b][d].length) {
                  rebuilt_hash.push(d + ":" + f[1].join("+"));
                } else {
                  rebuilt_hash.push(d + ":" + hash_tag_data[b][d].join("+"));
                }
                f = [];
              } else {
                if (d == f[0] && f[1][0] != hash_tag_data[b][d][0]) {
                  if (typeof stored_hash_data[f[1][0]] != "undefined") {
                    rebuilt_hash.push(
                      d + ":" + stored_hash_data[f[1][0]].join("+")
                    );
                    f = [];
                  } else {
                    rebuilt_hash.push(d + ":" + f[1].join("+"));
                    f = [];
                  }
                } else {
                  if (d != f[0]) {
                    rebuilt_hash.push(d + ":" + hash_tag_data[b][d].join("+"));
                  } else {
                    rebuilt_hash.push(d + ":" + hash_tag_data[b][d].join("+"));
                  }
                }
              }
            } else {
              rebuilt_hash.push(d + ":" + hash_tag_data[b][d].join("+"));
            }
          }
        }
      }
    }
    if (a) {
      rebuilt_hash.push(f[0] + ":" + f[1].join("+"));
    }
  } else {
    rebuilt_hash.push(f[0] + ":" + f[1].join("+"));
  }
  rebuilt_hash = "#" + rebuilt_hash.join(";");
  if (typeof e == "undefined") {
    window.location.replace(rebuilt_hash);
    hash_tag_data = parseHash();
  } else {
    return rebuilt_hash;
  }
}
if (urlHash) {
  var hash_tag_data = parseHash();
}
if (hash_tag_data) {
}
var selectCommentID = 0;
var change_tab = false;
var stored_hash_data = new Object();
if (hash_tag_data) {
  for (i in hash_tag_data) {
    if (hash_tag_data.hasOwnProperty(i)) {
      if (typeof hash_tag_data[i]["tab"] != "undefined") {
        change_tab = hash_tag_data[i]["tab"][0];
        selectCommentID = hash_tag_data[i]["tab"][1];
        stored_hash_data[hash_tag_data[i]["tab"][0]] = hash_tag_data[i]["tab"];
      } else {
        if (typeof hash_tag_data[i]["table"] != "undefined") {
          var table_hash_table_id = hash_tag_data[i]["table"][0];
          var table_hash_data = hash_tag_data[i]["table"];
        } else {
          if (typeof hash_tag_data[i]["screen"] != "undefined") {
            var select_screen = hash_tag_data[i]["screen"][0];
            var select_screen_id = hash_tag_data[i]["screen"][1];
          }
        }
      }
    }
  }
}
function sortOldestDate(e, d) {
  return e[2] - d[2];
}
function sortNewestDate(e, d) {
  return d[2] - e[2];
}
function sortLowestRating(e, d) {
  return parseFloat(e[4]) - parseFloat(d[4]);
}
function sortHighestRating(e, d) {
  return parseFloat(d[4]) - parseFloat(e[4]);
}
function createDate(j) {
  if (j > 0) {
    var f = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    );
    var h = new Date();
    h.setTime(j * 1000);
    var a = h.getDate();
    var b = "";
    if (a == 1 || a == 21 || a == 31) {
      b = "st";
    } else {
      if (a == 2 || a == 22) {
        b = "nd";
      } else {
        if (a == 3 || a == 23) {
          b = "rd";
        } else {
          b = "th";
        }
      }
    }
    var g = h.getMonth();
    var e = h.getFullYear();
    return f[g] + " " + a + b + " " + e;
  }
}
var commentFound = false;
function addComment(h, d, o) {
  var f;
  var a;
  var n;
  var p = new Date();
  var k;
  var e;
  var g;
  var l = new Array();
  var b;
  var m;
  var o;
  var j = "";
  f =
    comments[h][4] > 0
      ? '<span class="comment_green">+' + comments[h][4] + "</span>"
      : '<span class="comment_red">' + comments[h][4] + "</span>";
  f = comments[h][4] == 0 ? comments[h][4] : f;
  a = comments[h][5].split(",");
  n =
    o.id && jQuery.inArray(o.id, a) == -1 && o.id != comments[h][6]
      ? ' <a class="comment_rate" id="' +
        comments[h][3] +
        '" href="' +
        site_root +
        "/dota-2/rate-comment/cid/" +
        comments[h][3] +
        "/a/plus/tt/1/r/" +
        comments[h][4] +
        '" alt="Add Rating" title="Add Rating">[+]</a> <a class="comment_rate" id="' +
        comments[h][3] +
        '" href="' +
        site_root +
        "/dota-2/rate-comment/cid/" +
        comments[h][3] +
        "/a/minus/tt/1/r/" +
        comments[h][4] +
        '" alt="Remove Rating" title="Remove Rating">[-]</a> '
      : "";
  p.setTime(comments[h][7] * 1000);
  dateString = createDate(comments[h][7]);
  if (comments[h][7]) {
    l.push(
      '<div class="comment_editdate">Last edited on ' + dateString + "</div>"
    );
  }
  l.push('<a href="#" class="report_link">Report</a>');
  if (comments[h][6] == o.id) {
    l.push(
      '<a href="' +
        site_root +
        "/dota-2/edit-comment/cid/" +
        comments[h][3] +
        '" alt="Edit Comment" title="Edit Comment">Edit Comment</a>'
    );
  }
  if (o.id != 0 && comments[h][6] != o.id) {
    l.push(
      '<span class="comment_reply"><a class="replylink" id="' +
        comments[h][3] +
        '" href="#">Reply</a></span>'
    );
  }
  l =
    '<div class="comment_bttns_wrapper"><div class="comment_bttns_container">' +
    l.join(" - ") +
    '</div><div class="clear_both"></div></div>';
  p.setTime(comments[h][2] * 1000);
  dateString = createDate(comments[h][2]);
  comments[h][1] =
    comments[h][4] >= 10
      ? '<span class="comment_blue">' + comments[h][1] + "</span>"
      : comments[h][1];
  o = comments[h][0].split("#");
  g = o[0];
  e = o[1] != "" ? 'style="color: #' + o[1] + '"' : "";
  m =
    o[2] != ""
      ? '<div class="hero_icon_block_small_inline" style="padding-right: 0px;"><div class="hero_icon_tt_small_inline"><img src="' +
        site_root +
        "/images/hero_portraits/medium/" +
        o[2] +
        '" class="hero_icon_small_inline"></div></div> '
      : "";
  if (comments[h][3] == selectCommentID) {
    j = " comment_wrapper_selected";
    commentFound = true;
  }
  if (d == 0) {
    if (comments[h][4] < -3) {
      k = comments[h][3];
      $("#comment_container").append(
        '<div id="comment' +
          comments[h][3] +
          '" class="comment_wrapper_indent0' +
          j +
          '"><div class="comment_head">By ' +
          m +
          '<strong><a id="comment' +
          comments[h][3] +
          '_profile" href="' +
          site_root +
          "/dota-2/profile/i/" +
          comments[h][6] +
          '">' +
          g +
          "</a></strong> on <strong>" +
          dateString +
          '</strong><span class="comment_rating" id="comment_rating' +
          comments[h][3] +
          '">Rating: ' +
          f +
          n +
          '</span><span class="display_link"><a href="javascript:void(0);">Show</a> -&nbsp;</span></div><div class="comment_body">' +
          bbcode_parser(comments[h][1], 0) +
          "</div>" +
          l +
          "</div>"
      );
      $(
        "#comment" +
          k +
          " .comment_bttns_wrapper, #comment" +
          k +
          " .comment_body"
      ).hide();
      $(document).on("click", "#comment" + k + " .display_link", function (q) {
        if (
          $(this)
            .parent()
            .parent()
            .children(".comment_bttns_wrapper, .comment_body")
            .is(":hidden")
        ) {
          $(this)
            .parent()
            .parent()
            .children(".comment_bttns_wrapper, .comment_body")
            .slideDown();
          $(this)
            .parent()
            .children(".display_link")
            .html(
              '<span class="display_link"><a href="javascript:void(0);">Hide</a> -&nbsp;</span>'
            );
        } else {
          $(this)
            .parent()
            .parent()
            .children(".comment_bttns_wrapper, .comment_body")
            .slideUp();
          $(this)
            .parent()
            .children(".display_link")
            .html(
              '<span class="display_link"><a href="javascript:void(0);">Show</a> -&nbsp;</span>'
            );
        }
      });
    } else {
      $("#comment_container").append(
        '<div id="comment' +
          comments[h][3] +
          '" class="comment_wrapper_indent0' +
          j +
          '"><div class="comment_head">By ' +
          m +
          '<strong><a id="comment' +
          comments[h][3] +
          '_profile" href="' +
          site_root +
          "/dota-2/profile/i/" +
          comments[h][6] +
          '" ' +
          e +
          ">" +
          g +
          "</a></strong> on <strong>" +
          dateString +
          '</strong><span class="comment_rating" id="comment_rating' +
          comments[h][3] +
          '">Rating: ' +
          f +
          n +
          '</span></div><div class="comment_body">' +
          bbcode_parser(comments[h][1], 0) +
          "</div>" +
          l +
          "</div>"
      );
    }
  } else {
    if ($("#comment" + comments[h][8]).length != 0) {
      b =
        parseInt(
          $("#comment" + comments[h][8])
            .attr("class")
            .replace("comment_wrapper_indent", "")
        ) + 1;
      if (comments[h][4] < -3) {
        k = comments[h][3];
        $("#comment" + comments[h][8]).after(
          '<div id="comment' +
            comments[h][3] +
            '" class="comment_wrapper_indent' +
            b +
            "" +
            j +
            '"><div class="comment_head">By ' +
            m +
            '<strong><a id="comment' +
            comments[h][3] +
            '_profile" href="' +
            site_root +
            "/dota-2/profile/i/" +
            comments[h][6] +
            '" ' +
            e +
            ">" +
            g +
            "</a></strong> on <strong>" +
            dateString +
            '</strong><span class="comment_rating" id="comment_rating' +
            comments[h][3] +
            '">Rating: ' +
            f +
            n +
            '</span><span class="display_link"><a href="javascript:void(0);">Show</a> -&nbsp;</span></div><div class="comment_body">' +
            bbcode_parser(comments[h][1], 0) +
            "</div>" +
            l +
            "</div>"
        );
        $(
          "#comment" +
            k +
            " .comment_bttns_wrapper, #comment" +
            comments[h][3] +
            " .comment_body"
        ).hide();
        $(document).on(
          "click",
          "#comment" + k + " .display_link",
          function (q) {
            if (
              $(this)
                .parent()
                .parent()
                .children(".comment_bttns_wrapper, .comment_body")
                .is(":hidden")
            ) {
              $(this)
                .parent()
                .parent()
                .children(".comment_bttns_wrapper, .comment_body")
                .slideDown();
              $(this)
                .parent()
                .children(".display_link")
                .html(
                  '<span class="display_link"><a href="javascript:void(0);">Hide</a> -&nbsp;</span>'
                );
            } else {
              $(this)
                .parent()
                .parent()
                .children(".comment_bttns_wrapper, .comment_body")
                .slideUp();
              $(this)
                .parent()
                .children(".display_link")
                .html(
                  '<span class="display_link"><a href="javascript:void(0);">Show</a> -&nbsp;</span>'
                );
            }
          }
        );
      } else {
        $("#comment" + comments[h][8]).after(
          '<div id="comment' +
            comments[h][3] +
            '" class="comment_wrapper_indent' +
            b +
            "" +
            j +
            '"><div class="comment_head">By ' +
            m +
            '<strong><a id="comment' +
            comments[h][3] +
            '_profile" href="' +
            site_root +
            "/dota-2/profile/i/" +
            comments[h][6] +
            '" ' +
            e +
            ">" +
            g +
            "</a></strong> on <strong>" +
            dateString +
            '</strong><span class="comment_rating" id="comment_rating' +
            comments[h][3] +
            '">Rating: ' +
            f +
            n +
            '</span></div><div class="comment_body">' +
            bbcode_parser(comments[h][1], 0) +
            "</div>" +
            l +
            "</div>"
        );
      }
    } else {
      commentReplies2[comments[h][3]] = comments[h][3];
    }
  }
}
function changePage(a) {
  comments_cur_page = a;
  var d =
    a != 1
      ? comments_per_page * a - comments_per_page
      : comments_per_page * a - comments_per_page;
  if (comments[d]) {
    if (comments[d][8] != 0) {
      var b = comments.length;
      for (e = d; e < b; ++e) {
        if (e != b && b != 0) {
          if (comments[e][8] == 0 && e > lastPoint) {
            parseComments(e, 0);
            break;
          }
        }
      }
    } else {
      var f = 0;
      for (var e in commentReplies) {
        if (commentReplies[e][0] < comments[d][3]) {
          f += 1;
        }
      }
      parseComments(d + f, 0);
    }
  }
}
function parseComments(g, a) {
  var e = comments.length;
  var d = g;
  var b = 0;
  commentReplies2 = [];
  $("#comment_container").html("");
  if (comments_sort_type == "oldest") {
    comments.sort(sortOldestDate);
  } else {
    if (comments_sort_type == "highestrated") {
      comments.sort(sortHighestRating);
    } else {
      if (comments_sort_type == "lowestrated") {
        comments.sort(sortLowestRating);
      } else {
        if (comments_sort_type == "newest") {
          comments.sort(sortNewestDate);
        }
      }
    }
  }
  d = g;
  addComments = 0;
  while (d < e) {
    if (d != e && e != 0) {
      if (comments[d]) {
        if (a == 1) {
          if (comments[d][8] != 0) {
            commentReplies[comments[d][3]] = comments[d][3];
            numReplies++;
          }
        }
        if (b < comments_per_page && comments[d][8] == 0) {
          addComment(d, 0, user_info);
          lastPoint = d;
          b++;
        }
      }
      d++;
    }
  }
  comments.reverse();
  for (d = 0; d < e; ++d) {
    if (d != e && e != 0 && comments[d]) {
      if (
        comments[d][8] != 0 &&
        comments[d][3] == commentReplies[comments[d][3]]
      ) {
        addComment(d, 1, user_info);
      }
    }
  }
  comments.reverse();
  for (d = 0; d < e; ++d) {
    if (d != e && e != 0 && comments[d]) {
      if (
        comments[d][8] != 0 &&
        comments[d][3] == commentReplies2[comments[d][3]]
      ) {
        addComment(d, 1, user_info);
      }
    }
  }
  var f = Math.ceil((e - numReplies) / comments_per_page);
  if (f >= 1) {
    $(".comments_page_info").html(
      '<div class="comments_page_numbers">' +
        comments_cur_page +
        " of " +
        f +
        "</div>"
    );
  } else {
    $(".comment_container_head").html(
      '<div class="comment_nocomments">No comments found! Be the first to submit one!</div>'
    );
  }
  if (f > 1) {
    $(".comments_page_info").html(
      '<div class="comments_page_numbers">' +
        comments_cur_page +
        " of " +
        f +
        "</div>"
    );
    $("#firstPage, #prevPage, #nextPage, #lastPage").remove();
    if (comments_cur_page - 1 >= 1) {
      $(".comments_page_info").prepend(
        '<div class="comment_page_wrapper" id="prevPage" style="margin-right: 5px;"><a href="#" class="changePage" id="pageNumber' +
          (comments_cur_page - 1) +
          '">&lsaquo; Prev</a><div>'
      );
    }
    if (comments_cur_page != 1) {
      $(".comments_page_info").prepend(
        '<div class="comment_page_wrapper" id="firstPage" style="margin-right: 5px;"><a href="#" class="changePage" id="pageNumber1">&laquo; First</a><div>'
      );
    }
    if (comments_cur_page != f) {
      $(".comments_page_info").append(
        '<div class="comment_page_wrapper" id="lastPage" style="float: right; margin-left: 5px;"><a href="#" class="changePage" id="pageNumber' +
          f +
          '">Last &raquo;</a><div>'
      );
    }
    if (comments_cur_page + 1 <= f) {
      $(".comments_page_info").append(
        '<div class="comment_page_wrapper" id="nextPage" style="float: right; margin-left: 5px;"><a href="#" class="changePage" id="pageNumber' +
          (comments_cur_page + 1) +
          '">Next &rsaquo;</a><div>'
      );
    }
  }
}
function Prompt(b, d, g) {
  var a = $("<input />", {
      val: d,
      keyup: function (h) {
        if (h.keyCode == 13) {
          g(a.val());
        }
      },
    }),
    e = $("<button />", {
      text: "Ok",
      click: function () {
        g(a.val());
      },
    }),
    f = $("<button />", {
      text: "Cancel",
      click: function () {
        g("");
      },
    });
  $("<div />").qtip({
    content: {
      text: $("<p />").prepend(b).add(a).add(e).add(f),
      title: "Set a filter",
    },
    position: { my: "center", at: "center", target: $(window) },
    show: { ready: true, modal: { on: true, blur: false } },
    hide: false,
    style: "ui-tooltip-light ui-tooltip-rounded ui-tooltip-dialogue",
    events: {
      render: function (j, h) {
        $("input", h.elements.content).keyup(function (k) {
          if (k.keyCode == 13) {
            h.hide();
          }
        });
        $(this).find("input").focus();
        $("button", h.elements.content).click(h.hide);
      },
      hide: function (j, h) {
        h.destroy();
      },
    },
  });
}
$(document).ready(function () {
  $(".report_link").live("click", function (ev) {
    ev.preventDefault();
    if (typeof $(this).attr("id") != "undefined" && $(this).attr("id") != "") {
      var data = $(this).attr("id").split(";");
      var ri = "post" + data[0];
      var ri_data = ri.split("post");
      var user_name = data[1];
      var user_id = data[2];
      reportIt(user_id, user_name, "post", ri_data[1]);
    } else {
      var ri = $(this).parent().parent().parent().attr("id");
      var ri_data = ri.split("comment");
      var user_name = $("#" + ri + "_profile").html();
      var user_id = $("#" + ri + "_profile")
        .attr("href")
        .split("=")[1];
      reportIt(user_id, user_name, "comment", ri_data[1]);
    }
  });
  $("a#close-panel").live("click", function (ev) {
    $("#lightbox, #lightbox-panel, #icon-panel").fadeOut(300);
  });
  $("#send_report").live("click", function (ev) {
    ev.preventDefault();
    if (
      $("#report_form #report_reason").val() != "" &&
      $("#report_form #report_details").val() != ""
    ) {
      $("#send_report_response").html(
        '<img src="images/layout/comment-load.gif" />'
      );
      $.post(
        $(this).attr("href"),
        {
          reason: $("#report_form #report_reason").val(),
          details: $("#report_form #report_details").val(),
        },
        function (response) {
          $("#send_report_response").fadeOut();
          $("#send_report_response").html(unescape(response));
          $("#send_report_response").fadeIn();
        }
      );
    } else {
      (function (el) {
        setTimeout(function () {
          el.children().remove("span");
        }, 2000);
      })(
        $("#send_report_response").append(
          '<span class="comment_red"><br />You must fill out both fields.<span>'
        )
      );
    }
  });
  $(document).on("click", ".comment_rate", function (ev) {
    ev.preventDefault();
    var a = $(this).attr("id");
    $(this).parent().html('<img src="images/layout/comment-load.gif" />');
    $.post($(this).attr("href"), {}, function (response) {
      $("#comment_rating" + a).fadeOut();
      $("#comment_rating" + a).html(unescape(response));
      $("#comment_rating" + a).fadeIn();
    });
  });
  $(document).on("click", ".replylink", function (ev) {
    ev.preventDefault();
    if (!$("#comment_reply_container").length) {
      var comment_id = $(this).attr("id");
      var indent_amount =
        parseInt(
          $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .attr("class")
            .replace("comment_wrapper_indent", "")
        ) + 1;
      var user_color = user_info.color
        ? 'style="color: #' + user_info.color + '" '
        : "";
      var user_avatar = user_info.avatar
        ? '<div style="margin-right: 5px;" class="item_icon_block_small"><div class="item_icon_wrapper_small"><div class="item_icon_icon_small"><img src="' +
          site_root +
          "/images/item_icons_small/" +
          user_info.avatar +
          '"></div></div><div class="item_icon_border_smallq1"></div></div> '
        : "";
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .after(
          '<div class="comment_wrapper_indent' +
            indent_amount +
            '" id="comment_reply_container"><div class="comment_head">By ' +
            user_avatar +
            "<strong><a " +
            user_color +
            'href="' +
            site_root +
            "/dota-2/profile/i/" +
            user_info.id +
            '" id="comment_profile">' +
            user_info.username +
            '</a></strong></div><div class="comment_body"><form class="addcomment"><textarea name="reply_message" id="reply_message" cols="10" rows="10" class="addc_message"></textarea></form></div><div class="comment_bttns_wrapper">&nbsp;<div class="comment_reply_bttns"><span class="comment_reply"><a href="#" class="reply_submit_link">Post Reply</a></span> - <a href="#" class="reply_cancel_link">Cancel</a></div></div></div>'
        );
      if ($("#comment_reply_id").length != 0) {
        $("#comment_reply_id").attr("value", comment_id);
      } else {
        $("#commentform").append(
          '<input type="hidden" id="comment_reply_id" name="reply_id" value="' +
            comment_id +
            '" />'
        );
      }
    }
  });
  $(document).on("click", ".reply_submit_link", function (ev) {
    ev.preventDefault();
    $("#commentform textarea").val($("#reply_message").val());
    $("#commentform").submit();
  });
  $(document).on("click", ".reply_cancel_link", function (ev) {
    ev.preventDefault();
    $("#comment_reply_container").remove();
    $("#comment_reply_id").remove();
  });
  $(document).on("click", ".changePage", function (ev) {
    ev.preventDefault();
    var pageNum = $(this).attr("id").split("pageNumber");
    changePage(parseInt(pageNum[1]));
  });
  $(document).on("click", "#comment_per_page", function (ev) {
    comments_per_page = parseInt($("#comment_per_page").val());
    $.cookie("comments_per_page", comments_per_page);
    comments_cur_page = 1;
    parseComments(0, 0);
  });
  if (comments.length) {
    parseComments(0, 1);
  }
  if (
    selectCommentID > 0 &&
    selectCommentID != "undefined" &&
    commentFound == false
  ) {
    changePage(comments_cur_page + 1);
  }
  $.fn.dataTableExt.oPagination.full_numbers = {
    fnInit: function (oSettings, nPaging, fnCallbackDraw) {
      var oLang = oSettings.oLanguage.oPaginate;
      var oClasses = oSettings.oClasses;
      var fnClickHandler = function (e) {
        if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
          fnCallbackDraw(oSettings);
        }
      };
      $(nPaging).append(
        '<a  tabindex="' +
          oSettings.iTabIndex +
          '" class="' +
          oClasses.sPageButton +
          " " +
          oClasses.sPageFirst +
          '">' +
          oLang.sFirst +
          '</a><a  tabindex="' +
          oSettings.iTabIndex +
          '" class="' +
          oClasses.sPageButton +
          " " +
          oClasses.sPagePrevious +
          '">' +
          oLang.sPrevious +
          '</a><span class="' +
          oSettings.sTableId +
          '_np_info np_info"></span><a tabindex="' +
          oSettings.iTabIndex +
          '" class="' +
          oClasses.sPageButton +
          " " +
          oClasses.sPageNext +
          '">' +
          oLang.sNext +
          '</a><a tabindex="' +
          oSettings.iTabIndex +
          '" class="' +
          oClasses.sPageButton +
          " " +
          oClasses.sPageLast +
          '">' +
          oLang.sLast +
          "</a>"
      );
      var els = $("a", nPaging);
      var nFirst = els[0],
        nPrev = els[1],
        nNext = els[2],
        nLast = els[3];
      oSettings.oApi._fnBindAction(nFirst, { action: "first" }, fnClickHandler);
      oSettings.oApi._fnBindAction(
        nPrev,
        { action: "previous" },
        fnClickHandler
      );
      oSettings.oApi._fnBindAction(nNext, { action: "next" }, fnClickHandler);
      oSettings.oApi._fnBindAction(nLast, { action: "last" }, fnClickHandler);
      if (!oSettings.aanFeatures.p) {
        nPaging.id = oSettings.sTableId + "_paginate";
        nFirst.id = oSettings.sTableId + "_first";
        nPrev.id = oSettings.sTableId + "_previous";
        nNext.id = oSettings.sTableId + "_next";
        nLast.id = oSettings.sTableId + "_last";
      }
    },
    fnUpdate: function (oSettings, fnCallbackDraw) {
      if (!oSettings.aanFeatures.p) {
        return;
      }
      var iPageCount = 5;
      var iPageCountHalf = Math.floor(iPageCount / 2);
      var iPages = Math.ceil(
        oSettings.fnRecordsDisplay() / oSettings._iDisplayLength
      );
      var iCurrentPage =
        Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
      var sList = "";
      var iStartButton, iEndButton, i, iLen;
      var oClasses = oSettings.oClasses;
      var anButtons, anStatic, nPaginateList;
      var an = oSettings.aanFeatures.p;
      var fnBind = function (j) {
        oSettings.oApi._fnBindAction(
          this,
          { page: j + iStartButton - 1 },
          function (e) {
            oSettings.oApi._fnPageChange(oSettings, e.data.page);
            fnCallbackDraw(oSettings);
            e.preventDefault();
          }
        );
      };
      if (iPages < iPageCount) {
        iStartButton = 1;
        iEndButton = iPages;
      } else {
        if (iCurrentPage <= iPageCountHalf) {
          iStartButton = 1;
          iEndButton = iPageCount;
        } else {
          if (iCurrentPage >= iPages - iPageCountHalf) {
            iStartButton = iPages - iPageCount + 1;
            iEndButton = iPages;
          } else {
            iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
            iEndButton = iStartButton + iPageCount - 1;
          }
        }
      }
      for (i = 0, iLen = an.length; i < iLen; i++) {
        if (an[i].childNodes.length === 0) {
          continue;
        }
        $("span:eq(0)", an[i]).html(sList).children("a").each(fnBind);
        anButtons = an[i].getElementsByTagName("a");
        anStatic = [
          anButtons[0],
          anButtons[1],
          anButtons[anButtons.length - 2],
          anButtons[anButtons.length - 1],
        ];
        $(anStatic).removeClass(
          oClasses.sPageButton +
            " " +
            oClasses.sPageButtonActive +
            " " +
            oClasses.sPageButtonStaticDisabled
        );
        $([anStatic[0], anStatic[1]]).addClass(
          iCurrentPage == 1
            ? oClasses.sPageButtonStaticDisabled
            : oClasses.sPageButton
        );
        $([anStatic[2], anStatic[3]]).addClass(
          iPages === 0 ||
            iCurrentPage === iPages ||
            oSettings._iDisplayLength === -1
            ? oClasses.sPageButtonStaticDisabled
            : oClasses.sPageButton
        );
      }
    },
  };
  var oTable, pathArr, parseSort, parseLength, tableVars;
  var checkHash = 0;
  var tableDefaults = {
    aaSorting: [],
    iDisplayStart: 0,
    bDeferRender: true,
    bAutoWidth: false,
    oLanguage: {
      sLengthMenu: "_MENU_",
      sLengthMenu:
        '<select><option value="10">10 per page</option><option value="20">20 per page</option><option value="30">30 per page</option><option value="40">40 per page</option><option value="50">50 per page</option><option value="60">60 per page</option><option value="70">70 per page</option><option value="80">80 per page</option><option value="90">90 per page</option><option value="100">100 per page</option><option value="-1">All</option></select>',
      sInfoEmpty: "0 to 0 of 0",
      sZeroRecords: "No results found.",
      sSearch: "",
      oPaginate: {
        sFirst: "&laquo; First",
        sPrevious: "&lsaquo; Previous",
        sNext: "Next &rsaquo;",
        sLast: "Last &raquo;",
      },
    },
    iDisplayLength: user_info.per_page_count,
    sPaginationType: "full_numbers",
    sDom:
      '<"table_head"<"table_head_search"f><"table_head_page"ip><"clear_both">>rt<"table_foot"l<"table_foot_page">p<"clear_both">',
    fnInitComplete: function (oSettings) {
      $("#" + oSettings.sTableId + " tbody").click(function (ev) {
        if (ev.target.tagName != "A") {
          var parent_element = $(ev.target).parents("tr:first");
          $(parent_element)
            .children()
            .each(function () {
              if (
                $(this).attr("class") &&
                $(this).hasClass("table_click_link")
              ) {
                if ($(this).find("a.core_link").length) {
                  var url_href = $(this)
                    .find("a.core_link")
                    .first()
                    .attr("href");
                  window.location = url_href;
                } else {
                  var url_href = $(this).find("a").first().attr("href");
                  if (url_href) {
                    window.location = url_href;
                  }
                }
              }
            });
        }
      });
    },
    fnDrawCallback: function (oSettings) {
      tooltip.find_links();
      $("." + oSettings.sTableId + "_np_info").html(
        $("#" + oSettings.sTableId + "_info").html()
      );
      $("#" + oSettings.sTableId + "_info").hide();
    },
    fnInfoCallback: function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
      var page = oSettings._iDisplayStart ? oSettings._iDisplayStart : 0;
      var sorting = oSettings.aaSorting[0] ? oSettings.aaSorting[0] : "";
      var sortedColumn = oSettings.aaSorting[0] ? sorting[0] : "null";
      var sortedDirection = oSettings.aaSorting[0] ? sorting[1] : "null";
      var sortSearch = oSettings.oPreviousSearch.sSearch
        ? oSettings.oPreviousSearch.sSearch
        : "null";
      var pageLength = oSettings._iDisplayLength
        ? oSettings._iDisplayLength
        : user_info.per_page_count;
      var ignore_sort = 0;
      if (oSettings.sTableId == "matches_profile") {
        var table_obj_name = eval(oSettings.sTableId + "_table_obj");
        if (sortedColumn == 0 && sortedDirection == "desc") {
          ignore_sort = 1;
        }
      }
      if (oSettings.sTableId.indexOf("leaderboard") == -1 && ignore_sort == 0) {
        if (
          page != 0 ||
          sortedColumn != "null" ||
          sortedDirection != "null" ||
          sortSearch != "null" ||
          pageLength != user_info.per_page_count
        ) {
          rebuildHashTagData([
            "table",
            [
              oSettings.sTableId,
              page,
              sortedColumn,
              sortedDirection,
              encodeURIComponent(sortSearch),
              pageLength,
            ],
          ]);
          setFavicon();
        } else {
          if (
            page == 0 &&
            $(location).attr("hash").indexOf("table") > -1 &&
            $(location).attr("hash").indexOf(oSettings.sTableId) > -1
          ) {
            rebuildHashTagData([
              "table",
              [
                oSettings.sTableId,
                page,
                sortedColumn,
                sortedDirection,
                encodeURIComponent(sortSearch),
                pageLength,
              ],
            ]);
            setFavicon();
          }
        }
      }
      return (
        "<strong>" +
        iStart +
        "</strong> to <strong>" +
        iEnd +
        "</strong> of <strong>" +
        iTotal +
        "</strong>"
      );
    },
  };
  if ($("#" + table_hash_table_id).length) {
    parseSort =
      table_hash_data[2] != "null" && table_hash_data[3] != "null"
        ? [[parseInt(table_hash_data[2]), table_hash_data[3]]]
        : [];
    parseSearch = table_hash_data[4] != "null" ? table_hash_data[4] : "";
    parseLength =
      table_hash_data[5] != user_info.per_page_count
        ? table_hash_data[5]
        : user_info.per_page_count;
    var tableHashDefaults = $.extend(true, {}, tableDefaults, {
      iDisplayStart: parseInt(table_hash_data[1]),
      aaSorting: parseSort,
      oSearch: { sSearch: decodeURIComponent(parseSearch) },
      iDisplayLength: parseLength,
      fnInfoCallback: function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
        var page = oSettings._iDisplayStart ? oSettings._iDisplayStart : 0;
        var sorting = oSettings.aaSorting[0] ? oSettings.aaSorting[0] : "";
        var sortedColumn = oSettings.aaSorting[0] ? sorting[0] : "null";
        var sortedDirection = oSettings.aaSorting[0] ? sorting[1] : "null";
        var sortSearch = oSettings.oPreviousSearch.sSearch
          ? oSettings.oPreviousSearch.sSearch
          : "null";
        var pageLength = oSettings._iDisplayLength
          ? oSettings._iDisplayLength
          : user_info.per_page_count;
        if (
          page != 0 ||
          sortedColumn != "null" ||
          sortedDirection != "null" ||
          sortSearch != "null" ||
          pageLength != user_info.per_page_count
        ) {
          rebuildHashTagData([
            "table",
            [
              oSettings.sTableId,
              page,
              sortedColumn,
              sortedDirection,
              encodeURIComponent(sortSearch),
              pageLength,
            ],
          ]);
          setFavicon();
        } else {
          if (
            page == 0 &&
            $(location).attr("hash").indexOf("table") > -1 &&
            $(location).attr("hash").indexOf(oSettings.sTableId) > -1
          ) {
            rebuildHashTagData([
              "table",
              [
                oSettings.sTableId,
                page,
                sortedColumn,
                sortedDirection,
                encodeURIComponent(sortSearch),
                pageLength,
              ],
            ]);
            setFavicon();
          }
        }
        return (
          "<strong>" +
          iStart +
          "</strong> to <strong>" +
          iEnd +
          "</strong> of <strong>" +
          iTotal +
          "</strong>"
        );
      },
    });
  }
  var item_table_obj = {
    aaData: items,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          var count = obj.aData[obj.iDataColumn][4]
            ? createNum(obj.aData[obj.iDataColumn][4], "", "icon_count")
            : "";
          sReturn =
            '<div class="item_icon_block"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="item_icon_tt" rel="">' +
            count +
            '<img src="' +
            site_root +
            "/images/item_icons/medium/" +
            obj.aData[obj.iDataColumn][1] +
            '.png" class="item_icon" /></a></div><div class="item_icon_title"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="q' +
            obj.aData[obj.iDataColumn][3] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Cost",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn]
            ? '<img class="dbtt_gold_icon" src=".//images/icons/gold.png" title="Gold Icon" alt="Gold"> <span class="dbtt_gold">' +
              obj.aData[obj.iDataColumn] +
              "</span>"
            : obj.aData[obj.iDataColumn];
          return sReturn;
        },
      },
      { sTitle: "Location", sClass: "center", sWidth: "100px" },
    ],
  };
  var item_icon_list_table_obj = {
    aaData: items,
    aoColumns: [
      {
        sTitle: "",
        sClass: "table_click_link",
        fnRender: function (obj) {
          var count = obj.aData[obj.iDataColumn][4]
            ? createNum(obj.aData[obj.iDataColumn][4], "", "icon_count")
            : "";
          sReturn =
            '<div class="item_icon_block" style="float: none; margin: 0 auto;"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="item_icon_tt" rel="">' +
            count +
            '<img src="' +
            site_root +
            "/images/item_icons/medium/" +
            obj.aData[obj.iDataColumn][1] +
            '.png" class="item_icon" /></a></div><div class="icon_list_item_name"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="q' +
            obj.aData[obj.iDataColumn][3] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      { sTitle: "", bVisible: false },
      { sTitle: "", bVisible: false },
    ],
  };
  var item_econ_table_obj = {
    aaData: econ_items,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          var count = obj.aData[obj.iDataColumn][4]
            ? createNum(obj.aData[obj.iDataColumn][4], "", "icon_count")
            : "";
          var strange_version = obj.aData[obj.iDataColumn][6]
            ? '<div style="color: #cf6a32;">Strange Version Tracks: ' +
              obj.aData[obj.iDataColumn][6] +
              " - " +
              obj.aData[obj.iDataColumn][7] +
              " Ranks</div>"
            : "";
          sReturn =
            '<div class="citem_icon_block"><a href="' +
            site_root +
            "/dota-2/citem/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="citem_icon_tt" rel="">' +
            count +
            '<img src="' +
            site_root +
            "/images/cosmetic_items/" +
            obj.aData[obj.iDataColumn][1] +
            '" class="citem_icon" /></a></div><div class="citem_icon_title"><a href="' +
            site_root +
            "/dota-2/citem/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="eq' +
            obj.aData[obj.iDataColumn][3] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>" +
            strange_version +
            "</div>";
          return sReturn;
        },
      },
      {
        sTitle: "Max iLevel",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
      },
      { sTitle: "Slot", sClass: "center", sWidth: "100px" },
      { sTitle: "Type", sClass: "center", sWidth: "100px" },
      {
        sTitle: "Used By",
        sClass: "center",
        sType: "title-string",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn][1]
            ? '<div class="hero_mini_icon_block"><a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][0] +
              "/" +
              obj.aData[obj.iDataColumn][2] +
              '" class="hero_mini_icon_tt" title="' +
              obj.aData[obj.iDataColumn][1] +
              '" rel=""><img src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][3] +
              '.png" class="hero_mini_icon" title="' +
              obj.aData[obj.iDataColumn][1] +
              '" /></a></div>'
            : '<span title=""></span>';
          return sReturn;
        },
      },
    ],
  };
  var item_econ_table_obj2 = {
    aaData: econ_lootable_from,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          var count = obj.aData[obj.iDataColumn][4]
            ? createNum(obj.aData[obj.iDataColumn][4], "", "icon_count")
            : "";
          sReturn =
            '<div class="citem_icon_block"><a href="' +
            site_root +
            "/dota-2/citem/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="citem_icon_tt" rel="">' +
            count +
            '<img src="' +
            site_root +
            "/images/cosmetic_items/" +
            obj.aData[obj.iDataColumn][1] +
            '" class="citem_icon" /></a></div><div class="citem_icon_title"><a href="' +
            site_root +
            "/dota-2/citem/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="eq' +
            obj.aData[obj.iDataColumn][3] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Max iLevel",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
      },
      { sTitle: "Slot", sClass: "center", sWidth: "100px" },
      { sTitle: "Type", sClass: "center", sWidth: "100px" },
      {
        sTitle: "Used By",
        sClass: "center",
        sType: "title-string",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn][1]
            ? '<div class="hero_mini_icon_block"><a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][0] +
              "/" +
              obj.aData[obj.iDataColumn][2] +
              '" class="hero_mini_icon_tt" title="' +
              obj.aData[obj.iDataColumn][1] +
              '" rel=""><img src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][3] +
              '.png" class="hero_mini_icon" title="' +
              obj.aData[obj.iDataColumn][1] +
              '" /></a></div>'
            : '<span title=""></span>';
          return sReturn;
        },
      },
    ],
  };
  tableVars =
    table_hash_table_id == "items_default" ? tableHashDefaults : tableDefaults;
  var item_table = $("#items_default").dataTable(
    $.extend(true, item_table_obj, tableVars, {})
  );
  tableVars =
    table_hash_table_id == "items_icon_list_default"
      ? tableHashDefaults
      : tableDefaults;
  var item_icon_list_table = $("#items_icon_list_default").dataTable(
    $.extend(true, item_icon_list_table_obj, tableVars, {
      iDisplayLength: -1,
      fnInfoCallback: function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
        var page = oSettings._iDisplayStart ? oSettings._iDisplayStart : 0;
        var sorting = oSettings.aaSorting[0] ? oSettings.aaSorting[0] : "";
        var sortedColumn = oSettings.aaSorting[0] ? sorting[0] : "null";
        var sortedDirection = oSettings.aaSorting[0] ? sorting[1] : "null";
        var sortSearch = oSettings.oPreviousSearch.sSearch
          ? oSettings.oPreviousSearch.sSearch
          : "null";
        var pageLength = oSettings._iDisplayLength
          ? oSettings._iDisplayLength
          : user_info.per_page_count;
        return (
          "<strong>" +
          iStart +
          "</strong> to <strong>" +
          iEnd +
          "</strong> of <strong>" +
          iTotal +
          "</strong>"
        );
      },
    })
  );
  tableVars =
    table_hash_table_id == "items_econ" ? tableHashDefaults : tableDefaults;
  var item_econ_table = $("#items_econ").dataTable(
    $.extend(true, item_econ_table_obj, tableVars, {})
  );
  tableVars =
    table_hash_table_id == "econ_bundled_in"
      ? tableHashDefaults
      : tableDefaults;
  var item_econ_bundled_in_table = $("#econ_bundled_in").dataTable(
    $.extend(item_econ_table_obj, tableVars, { aaData: econ_bundled_in })
  );
  tableVars =
    table_hash_table_id == "econ_lootable_from"
      ? tableHashDefaults
      : tableDefaults;
  var item_econ_lootable_from = $("#econ_lootable_from").dataTable(
    $.extend(item_econ_table_obj, tableVars, { aaData: econ_lootable_from })
  );
  $(document).on("click", "#table_icon_list", function (ev) {
    ev.preventDefault();
    $("#items_default thead").hide();
    $("#items_default").dataTable(
      $.extend(true, item_icon_list_table_obj, tableDefaults, {
        bDestroy: true,
      })
    );
    $("#items_default")
      .removeClass("item_icon_list_table")
      .addClass("item_icon_list_table");
  });
  $(document).on("click", "#table_default_style", function (ev) {
    ev.preventDefault();
    $("#items_default thead").show();
    $("#items_default").dataTable(
      $.extend(true, item_table_obj, tableDefaults, { bDestroy: true })
    );
    $("#items_default").removeClass("item_icon_list_table");
  });
  var matches_profile_table_obj = {
    aaData: matches_profile,
    aoColumns: [
      {
        sTitle: "Match ID",
        sClass: "table_click_link",
        sType: "formatted-num",
        fnRender: function (obj) {
          var ignore_match =
            obj.aData[obj.iDataColumn][1] == 1
              ? '<div class="note">Not counted in stats.</div>'
              : "";
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/match/i/" +
            obj.aData[obj.iDataColumn][0] +
            '">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>" +
            ignore_match;
          return sReturn;
        },
      },
      {
        sTitle: "Date",
        sClass: "center",
        sWidth: "60px",
        sType: "title-numeric",
      },
      { sTitle: "Team", sClass: "center", sWidth: "60px" },
      {
        sTitle: "Verdict",
        sClass: "center",
        sWidth: "70px",
        fnRender: function (obj) {
          var color =
            obj.aData[obj.iDataColumn] == "Victory"
              ? "comment_green"
              : "comment_red";
          sReturn =
            '<span class="' +
            color +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</span>";
          return sReturn;
        },
      },
      {
        sTitle: "Duration",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "80px",
      },
      {
        sTitle: "Hero",
        sClass: "center",
        sType: "alt-string",
        sWidth: "55px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn][2]
            ? '<div class="hero_mini_icon_block"><a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][2] +
              "/" +
              obj.aData[obj.iDataColumn][3] +
              '" class="hero_mini_icon_tt" title="' +
              obj.aData[obj.iDataColumn][0] +
              '" rel=""><img src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][1] +
              '.png" class="hero_mini_icon" alt="' +
              obj.aData[obj.iDataColumn][1] +
              '" /></a></div>'
            : '<span alt=""></span>';
          return sReturn;
        },
      },
      { sTitle: "K", altLabel: "Kills", sClass: "center", sWidth: "25px" },
      { sTitle: "D", altLabel: "Deaths", sClass: "center", sWidth: "25px" },
      { sTitle: "A", altLabel: "Assists", sClass: "center", sWidth: "25px" },
      {
        sTitle: "LHs",
        altLabel: "Last Hits",
        sClass: "center",
        sWidth: "50px",
      },
      { sTitle: "Denies", sClass: "center", sWidth: "60px" },
      {
        sTitle: "Gold/M",
        altLabel: "Gold per min",
        sClass: "center",
        sWidth: "70px",
      },
      {
        sTitle: "Exp/M",
        altLabel: "Exp per min",
        sClass: "center",
        sWidth: "70px",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "matches_profile"
      ? tableHashDefaults
      : tableDefaults;
  var matches_profile_table = $("#matches_profile").dataTable(
    $.extend(true, matches_profile_table_obj, tableVars, {})
  );
  var match_table_obj = {
    aaData: matches,
    aoColumns: [
      {
        sTitle: "Match ID",
        sClass: "table_click_link center",
        sWidth: "80px",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/match/i/" +
            obj.aData[obj.iDataColumn] +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</a>";
          return sReturn;
        },
      },
      { sTitle: "Victor", sClass: "center", sWidth: "80px" },
      { sTitle: "Date", sClass: "center", sWidth: "90px" },
      {
        sTitle: "Duration",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "70px",
      },
      {
        sTitle: "The Radiant",
        sType: "alt-string",
        fnRender: function (obj) {
          sReturn = "";
          var player_name,
            hero_icon = "";
          for (i in obj.aData[obj.iDataColumn]) {
            if (obj.aData[obj.iDataColumn].hasOwnProperty(i)) {
              player_name = obj.aData[obj.iDataColumn][i][1]
                ? '<a href="' +
                  site_root +
                  "/dota-2/player/i/" +
                  obj.aData[obj.iDataColumn][i][1] +
                  '">' +
                  obj.aData[obj.iDataColumn][i][2] +
                  "</a>"
                : "No player found.";
              hero_icon = obj.aData[obj.iDataColumn][i][0][2]
                ? '<div class="hero_mini_icon_block" style="height: 20px; width: 20px; float: left; margin-right: 3px;"><a style="height: 20px; width: 20px;" href="' +
                  site_root +
                  "/dota-2/hero/i/" +
                  obj.aData[obj.iDataColumn][i][0][2] +
                  "/" +
                  obj.aData[obj.iDataColumn][i][0][3] +
                  '" class="hero_mini_icon_tt" title="' +
                  obj.aData[obj.iDataColumn][i][0][0] +
                  '" rel=""><img src="' +
                  site_root +
                  "/images/hero_icons/" +
                  obj.aData[obj.iDataColumn][i][0][1] +
                  '.png" class="hero_mini_icon" alt="' +
                  obj.aData[obj.iDataColumn][i][0][1] +
                  '" style="height: 20px; width: 20px;" /></a></div>'
                : "";
              sReturn +=
                '<div class="match_table_block">' +
                hero_icon +
                player_name +
                "</div>";
            }
          }
          return sReturn;
        },
      },
      {
        sTitle: "The Dire",
        sType: "alt-string",
        fnRender: function (obj) {
          sReturn = "";
          var player_name,
            hero_icon = "";
          for (i in obj.aData[obj.iDataColumn]) {
            if (obj.aData[obj.iDataColumn].hasOwnProperty(i)) {
              player_name = obj.aData[obj.iDataColumn][i][1]
                ? '<a href="' +
                  site_root +
                  "/dota-2/player/i/" +
                  obj.aData[obj.iDataColumn][i][1] +
                  '">' +
                  obj.aData[obj.iDataColumn][i][2] +
                  "</a>"
                : "No player found.";
              hero_icon = obj.aData[obj.iDataColumn][i][0][2]
                ? '<div class="hero_mini_icon_block" style="height: 20px; width: 20px; float: left; margin-right: 3px;"><a style="height: 20px; width: 20px;" href="' +
                  site_root +
                  "/dota-2/hero/i/" +
                  obj.aData[obj.iDataColumn][i][0][2] +
                  "/" +
                  obj.aData[obj.iDataColumn][i][0][3] +
                  '" class="hero_mini_icon_tt" title="' +
                  obj.aData[obj.iDataColumn][i][0][0] +
                  '" rel=""><img src="' +
                  site_root +
                  "/images/hero_icons/" +
                  obj.aData[obj.iDataColumn][i][0][1] +
                  '.png" class="hero_mini_icon" alt="' +
                  obj.aData[obj.iDataColumn][i][0][1] +
                  '" style="height: 20px; width: 20px;" /></a></div>'
                : "";
              sReturn +=
                '<div class="match_table_block">' +
                hero_icon +
                player_name +
                "</div>";
            }
          }
          return sReturn;
        },
      },
    ],
  };
  tableVars =
    table_hash_table_id == "matches_default"
      ? tableHashDefaults
      : tableDefaults;
  var match_table = $("#matches_default").dataTable(
    $.extend(true, match_table_obj, tableVars, {})
  );
  var phero_stats_table_obj = {
    aaData: phero_stats,
    aoColumnDefs: [
      { asSorting: ["desc", "asc"], aTargets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    ],
    aoColumns: [
      {
        sTitle: "Hero",
        sClass: "table_click_link",
        sType: "alt-string",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn][2]
            ? '<div class="hero_mini_icon_block" style="float: left; margin-right: 3px;"><a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][2] +
              "/" +
              obj.aData[obj.iDataColumn][3] +
              '" class="hero_mini_icon_tt" title="' +
              obj.aData[obj.iDataColumn][0] +
              '" rel=""><img src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][1] +
              '.png" class="hero_mini_icon" alt="' +
              obj.aData[obj.iDataColumn][1] +
              '" /></a></div><a class="q0" href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][2] +
              "/" +
              obj.aData[obj.iDataColumn][3] +
              '">' +
              obj.aData[obj.iDataColumn][0] +
              '</a><br /><a href="#" style="font-size: 10px;" class="show_more_stats" id="hero_' +
              obj.aData[obj.iDataColumn][2] +
              '">Show more stats &raquo;</a>'
            : '<span alt=""></span>';
          return sReturn;
        },
      },
      {
        sTitle: "Total",
        altLabel: "Total Games",
        sClass: "center",
        sWidth: "50px",
      },
      {
        sTitle: "Won",
        altLabel: "Total Games Won",
        sClass: "center",
        sWidth: "50px",
      },
      {
        sTitle: "Win %",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "55px",
      },
      {
        sTitle: "K",
        altLabel: "Average Kills/Game",
        sClass: "center",
        sWidth: "25px",
      },
      {
        sTitle: "D",
        altLabel: "Average Deaths/Game",
        sClass: "center",
        sWidth: "25px",
      },
      {
        sTitle: "A",
        altLabel: "Average Assists/Game",
        sClass: "center",
        sWidth: "25px",
      },
      {
        sTitle: "KA:D",
        altLabel: "Kills+Assists:Death Ratio",
        sClass: "center",
        sWidth: "50px",
      },
      {
        sTitle: "LHs",
        altLabel: "Average Last Hits/Game",
        sClass: "center",
        sWidth: "50px",
      },
      {
        sTitle: "Denies",
        altLabel: "Average Denies/Game",
        sClass: "center",
        sWidth: "60px",
      },
      {
        sTitle: "G/PM",
        altLabel: "Average Gold Per Min/Game",
        sClass: "center",
        sWidth: "60px",
      },
      {
        sTitle: "XP/PM",
        altLabel: "Average Exp Per Min/Game",
        sClass: "center",
        sWidth: "60px",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "phero_stats" ? tableHashDefaults : tableDefaults;
  var phero_stats_table = $("#phero_stats").dataTable(
    $.extend(true, phero_stats_table_obj, tableVars, {})
  );
  var phero_friends_table_obj = {
    aaData: phero_friends,
    aoColumns: [
      {
        sTitle: "Player",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/player/i/" +
            obj.aData[obj.iDataColumn][1] +
            '">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>";
          return sReturn;
        },
      },
      { sTitle: "Games", sClass: "center", sWidth: "60px" },
      { sTitle: "Victories", sClass: "center", sWidth: "80px" },
      { sTitle: "Defeats", sClass: "center", sWidth: "80px" },
      {
        sTitle: "Win %",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "55px",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "phero_friends" ? tableHashDefaults : tableDefaults;
  var phero_friends_table = $("#phero_friends").dataTable(
    $.extend(true, phero_friends_table_obj, tableVars, {})
  );
  tableVars =
    table_hash_table_id == "phero_rivals" ? tableHashDefaults : tableDefaults;
  var phero_rivals_table = $("#phero_rivals").dataTable(
    $.extend(true, phero_friends_table_obj, tableVars, { aaData: phero_rivals })
  );
  var favorite_match_table_obj = {
    aaData: favorite_matches,
    aoColumns: [
      {
        sTitle: "Match ID",
        sClass: "table_click_link center",
        sWidth: "80px",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/match/i/" +
            obj.aData[obj.iDataColumn] +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</a>";
          return sReturn;
        },
      },
      { sTitle: "Victor", sClass: "center", sWidth: "80px" },
      { sTitle: "Date", sClass: "center", sWidth: "90px" },
      {
        sTitle: "Duration",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "70px",
      },
      { sTitle: "Added", sClass: "center", sWidth: "90px" },
      { sTitle: "Comment" },
    ],
  };
  tableVars =
    table_hash_table_id == "matches_favorite"
      ? tableHashDefaults
      : tableDefaults;
  var favorite_match_table = $("#matches_favorite").dataTable(
    $.extend(true, favorite_match_table_obj, tableVars, {})
  );
  var leaderboards_default_table_obj = {
    aaData: leaderboards_total_games,
    aoColumnDefs: [
      { bSortable: false, aTargets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    ],
    hashDisabled: 1,
    iDisplayLength: 7,
    aoColumns: [
      { sTitle: "Place", sClass: "center", sWidth: "60px" },
      {
        sTitle: "Player",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/player/i/" +
            obj.aData[obj.iDataColumn][1] +
            '">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>";
          return sReturn;
        },
      },
      { sTitle: "Games", sClass: "center", sWidth: "60px" },
      { sTitle: "Victories", sClass: "center", sWidth: "80px" },
      {
        sTitle: "Win %",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "65px",
      },
      { sTitle: "Kills", sClass: "center", sWidth: "80px" },
      { sTitle: "Deaths", sClass: "center", sWidth: "80px" },
      { sTitle: "Assists", sClass: "center", sWidth: "80px" },
      { sTitle: "Last Hits", sClass: "center", sWidth: "80px" },
      { sTitle: "Denies", sClass: "center", sWidth: "80px" },
      { sTitle: "Gold", sClass: "center", sWidth: "80px" },
      { sTitle: "K+A:D Ratio", sClass: "center", sWidth: "120px" },
    ],
  };
  tableVars =
    table_hash_table_id == "leaderboards_total_games"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_games_table = $("#leaderboards_total_games").dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_games,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_wins"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_wins_table = $("#leaderboards_total_wins").dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_wins,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_kills"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_kills_table = $("#leaderboards_total_kills").dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_kills,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_assists"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_assists_table = $(
    "#leaderboards_total_assists"
  ).dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_assists,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_last_hits"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_last_hits_table = $(
    "#leaderboards_total_last_hits"
  ).dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_last_hits,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_denies"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_denies_table = $(
    "#leaderboards_total_denies"
  ).dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_denies,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_gold_earned"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_gold_earned_table = $(
    "#leaderboards_total_gold_earned"
  ).dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_gold_earned,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_total_kadr"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_total_kadr_table = $("#leaderboards_total_kadr").dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_total_kadr,
      iDisplayLength: 7,
    })
  );
  tableVars =
    table_hash_table_id == "leaderboards_win_percent"
      ? tableHashDefaults
      : tableDefaults;
  var leaderboards_win_percent_table = $("#leaderboards_win_percent").dataTable(
    $.extend(true, leaderboards_default_table_obj, tableVars, {
      aaData: leaderboards_win_percent,
      iDisplayLength: 7,
    })
  );
  var ability_table_obj = {
    aaData: abilities,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<div class="ability_icon_block"><a href="' +
            site_root +
            "/dota-2/ability/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="ability_icon_tt" rel=""><img src="' +
            site_root +
            "/images/ability_icons/medium/" +
            obj.aData[obj.iDataColumn][1] +
            '.png" class="ability_icon" /></a></div><div class="ability_icon_title"><a href="' +
            site_root +
            "/dota-2/ability/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="q0" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Used By",
        sClass: "center",
        sType: "alt-string",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn][1]
            ? '<div class="hero_mini_icon_block"><a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][0] +
              "/" +
              obj.aData[obj.iDataColumn][2] +
              '" class="hero_mini_icon_tt" title="' +
              obj.aData[obj.iDataColumn][1] +
              '" rel=""><img src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][3] +
              '.png" class="hero_mini_icon" alt="' +
              obj.aData[obj.iDataColumn][1] +
              '" /></a></div>'
            : '<span alt=""></span>';
          return sReturn;
        },
      },
      { sTitle: "Type", sClass: "center", sWidth: "100px" },
    ],
  };
  tableVars =
    table_hash_table_id == "abilities_default"
      ? tableHashDefaults
      : tableDefaults;
  var ability_table = $("#abilities_default").dataTable(
    $.extend(true, ability_table_obj, tableVars, {})
  );
  var hero_table_obj = {
    aaData: heroes,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<div class="hero_icon_block"><a href="' +
            site_root +
            "/dota-2/hero/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="hero_icon_tt" rel=""><img src="' +
            site_root +
            "/images/hero_portraits/medium/" +
            obj.aData[obj.iDataColumn][1] +
            '.png" class="hero_icon" /></a></div><div class="ability_icon_title"><a href="' +
            site_root +
            "/dota-2/hero/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="q0">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Team",
        sClass: "center",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn =
            '<span class="team_color_' +
            obj.aData[obj.iDataColumn][0].toLowerCase() +
            '">' +
            obj.aData[obj.iDataColumn][1] +
            "</span>";
          return sReturn;
        },
      },
      {
        sTitle: "Attribute",
        sClass: "center",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn =
            '<span class="attribute_color_' +
            obj.aData[obj.iDataColumn].toLowerCase() +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</span>";
          return sReturn;
        },
      },
      { sTitle: "Role(s)", sClass: "center", sWidth: "100px" },
    ],
  };
  tableVars =
    table_hash_table_id == "heroes_default" ? tableHashDefaults : tableDefaults;
  var hero_table = $("#heroes_default").dataTable(
    $.extend(true, hero_table_obj, tableVars, {})
  );
  var guides_table_obj = {
    aaData: guides,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          var hero_url_name = obj.aData[obj.iDataColumn][3]
            ? obj.aData[obj.iDataColumn][5] + "/"
            : "";
          var hero_img = obj.aData[obj.iDataColumn][3]
            ? '<a href="' +
              site_root +
              "/dota-2/hero/i/" +
              obj.aData[obj.iDataColumn][3] +
              "/" +
              obj.aData[obj.iDataColumn][5] +
              '" class="hero_mini_icon_tt" style="display: inline;"><img style="float: left; width: 32px; height: 32px; margin-right: 4px;" src="' +
              site_root +
              "/images/hero_icons/" +
              obj.aData[obj.iDataColumn][6] +
              '.png" alt="' +
              obj.aData[obj.iDataColumn][5] +
              '"></a>'
            : "";
          var user_color = obj.aData[obj.iDataColumn][9]
            ? ' style="color: #' + obj.aData[obj.iDataColumn][9] + '"'
            : "";
          var hidden_text =
            obj.aData[obj.iDataColumn][11] == 1
              ? '<div class="comment_red small" style="float: right;">Hidden</div>'
              : "";
          sReturn =
            hidden_text +
            hero_img +
            '<a href="' +
            site_root +
            "/dota-2/guide/i/" +
            obj.aData[obj.iDataColumn][1] +
            "/" +
            hero_url_name +
            obj.aData[obj.iDataColumn][2] +
            '" class="core_link">' +
            obj.aData[obj.iDataColumn][0] +
            '</a><div class="browse_guide_info">by <a href="' +
            site_root +
            "/dota-2/profile/i/" +
            obj.aData[obj.iDataColumn][7] +
            '"' +
            user_color +
            ">" +
            obj.aData[obj.iDataColumn][8] +
            "</a> on " +
            obj.aData[obj.iDataColumn][10] +
            "</div>";
          return sReturn;
        },
      },
      {
        sTitle: "Age",
        sClass: "center",
        sType: "title-string",
        sWidth: "100px",
      },
      { sTitle: "Type", sClass: "center", sWidth: "100px" },
      {
        sTitle: "Rating",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
      },
      {
        sTitle: "Views",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "guides_default" ? tableHashDefaults : tableDefaults;
  var guides_table = $("#guides_default").dataTable(
    $.extend(true, guides_table_obj, tableVars, {})
  );
  var recipe_table_obj = {
    aaData: recipes,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<div class="item_icon_title"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][1] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="q' +
            obj.aData[obj.iDataColumn][2] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Result",
        sClass: "center",
        sType: "alt-string",
        sWidth: "65px",
        fnRender: function (obj) {
          var count = obj.aData[obj.iDataColumn][3]
            ? createNum(obj.aData[obj.iDataColumn][3], "", "icon_count")
            : "";
          sReturn =
            '<div class="item_icon_block" style="width: 50px; margin: 0 auto; float: none;"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][1] +
            "/" +
            obj.aData[obj.iDataColumn][4] +
            '" class="item_icon_tt" rel="">' +
            count +
            '<img src="' +
            site_root +
            "/images/item_icons/medium/" +
            obj.aData[obj.iDataColumn][0] +
            '.png" class="item_icon" alt="' +
            obj.aData[obj.iDataColumn][4] +
            '" /></a></div>';
          return sReturn;
        },
      },
      {
        sTitle: "Total Cost",
        sClass: "center",
        sType: "formatted-num",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn = obj.aData[obj.iDataColumn]
            ? '<img class="dbtt_gold_icon" src=".//images/icons/gold.png" title="Gold Icon" alt="Gold"> <span class="dbtt_gold">' +
              obj.aData[obj.iDataColumn] +
              "</span>"
            : obj.aData[obj.iDataColumn];
          return sReturn;
        },
      },
      {
        sTitle: "Ingredients",
        sClass: "center",
        sType: "alt-string",
        fnRender: function (obj) {
          sReturn = "";
          for (i in obj.aData[obj.iDataColumn]) {
            if (obj.aData[obj.iDataColumn].hasOwnProperty(i)) {
              var item_data = String(obj.aData[obj.iDataColumn][i]);
              item_data = item_data.split(";");
              sReturn +=
                '<div class="item_icon_block" ><a href="' +
                site_root +
                "/dota-2/item/i/" +
                item_data[0] +
                "/" +
                item_data[1] +
                '" class="item_icon_tt" rel=""><img src="' +
                site_root +
                "/images/item_icons/medium/" +
                item_data[2] +
                '.png" class="item_icon" alt="' +
                item_data[1] +
                '" /></a></div>';
            }
          }
          return sReturn;
        },
      },
    ],
  };
  tableVars =
    table_hash_table_id == "recipes_default"
      ? tableHashDefaults
      : tableDefaults;
  var recipe_table = $("#recipes_default").dataTable(
    $.extend(true, recipe_table_obj, tableVars, {})
  );
  var recipe_used_in_table_obj = $.extend(true, recipe_table_obj, tableVars, {
    aaData: recipes_used_in,
  });
  tableVars =
    table_hash_table_id == "recipes_used_in"
      ? tableHashDefaults
      : tableDefaults;
  var recipe_table = $("#recipes_used_in").dataTable(
    $.extend(true, recipe_used_in_table_obj, tableVars, {})
  );
  var recipe_crafted_by_table_obj = $.extend(
    true,
    recipe_table_obj,
    tableVars,
    { aaData: recipes_crafted_by }
  );
  tableVars =
    table_hash_table_id == "recipes_crafted_by"
      ? tableHashDefaults
      : tableDefaults;
  var recipe_table = $("#recipes_crafted_by").dataTable(
    $.extend(true, recipe_crafted_by_table_obj, tableVars, {})
  );
  var npc_table_obj = {
    aaData: npcs,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/npc/i/" +
            obj.aData[obj.iDataColumn][1] +
            '" class="q0">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>";
          return sReturn;
        },
      },
      {
        sTitle: "Team",
        sClass: "center",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn =
            '<span class="team_color_' +
            obj.aData[obj.iDataColumn].toLowerCase().replace(" ", "_") +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</span>";
          return sReturn;
        },
      },
      { sTitle: "Level", sClass: "center", sWidth: "100px", sType: "numeric" },
      {
        sTitle: "Attribute",
        sClass: "center",
        sWidth: "100px",
        fnRender: function (obj) {
          sReturn =
            '<span class="attribute_color_' +
            obj.aData[obj.iDataColumn].toLowerCase() +
            '">' +
            obj.aData[obj.iDataColumn] +
            "</span>";
          return sReturn;
        },
      },
    ],
  };
  tableVars =
    table_hash_table_id == "npcs_default" ? tableHashDefaults : tableDefaults;
  var npc_table = $("#npcs_default").dataTable(
    $.extend(true, npc_table_obj, tableVars, {})
  );
  var statistics_hero_table_obj = {
    aaData: statistics_heroes,
    aoColumnDefs: [
      { asSorting: ["desc", "asc"], aTargets: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ],
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/hero/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="hero_mini_icon_tt" style="display: inline;"><img style="float: left; width: 32px; height: 32px; margin-right: 4px;" src="' +
            site_root +
            "/images/hero_icons/" +
            obj.aData[obj.iDataColumn][1] +
            '.png"></a><div class="ability_icon_title" style="height: 32px;"><a href="' +
            site_root +
            "/dota-2/hero/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][3] +
            '" class="q0">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Win %",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
      {
        sTitle: "Matches",
        sClass: "center",
        sWidth: "80px",
        sType: "formatted-num",
      },
      {
        sTitle: "Kills",
        sClass: "center",
        sWidth: "50px",
        sType: "formatted-num",
      },
      {
        sTitle: "Deaths",
        sClass: "center",
        sWidth: "70px",
        sType: "formatted-num",
      },
      {
        sTitle: "Assists",
        sClass: "center",
        sWidth: "80px",
        sType: "formatted-num",
      },
      {
        sTitle: "Last Hits",
        sClass: "center",
        sWidth: "80px",
        sType: "formatted-num",
      },
      {
        sTitle: "Denies",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
      {
        sTitle: "GOLD/M",
        sClass: "center",
        sWidth: "70px",
        sType: "formatted-num",
      },
      {
        sTitle: "EXP/M",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "statistics_heroes_default"
      ? tableHashDefaults
      : tableDefaults;
  var statistics_hero_table = $("#statistics_heroes_default").dataTable(
    $.extend(true, statistics_hero_table_obj, tableVars, {})
  );
  var statistics_item_table_obj = {
    aaData: statistics_items,
    aoColumnDefs: [
      { asSorting: ["desc", "asc"], aTargets: [1, 2, 3, 4, 5, 6, 7, 8] },
    ],
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<div class="item_icon_block"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="item_icon_tt" rel=""><img src="' +
            site_root +
            "/images/item_icons/medium/" +
            obj.aData[obj.iDataColumn][1] +
            '.png" class="item_icon" /></a></div><div class="item_icon_title"><a href="' +
            site_root +
            "/dota-2/item/i/" +
            obj.aData[obj.iDataColumn][2] +
            "/" +
            obj.aData[obj.iDataColumn][5] +
            '" class="q' +
            obj.aData[obj.iDataColumn][3] +
            '" rel="">' +
            obj.aData[obj.iDataColumn][0] +
            "</a></div>";
          return sReturn;
        },
      },
      {
        sTitle: "Purchasers",
        sClass: "center",
        sWidth: "90px",
        sType: "formatted-num",
      },
      {
        sTitle: "Kills",
        sClass: "center",
        sWidth: "50px",
        sType: "formatted-num",
      },
      {
        sTitle: "Deaths",
        sClass: "center",
        sWidth: "70px",
        sType: "formatted-num",
      },
      {
        sTitle: "Assists",
        sClass: "center",
        sWidth: "80px",
        sType: "formatted-num",
      },
      {
        sTitle: "Last Hits",
        sClass: "center",
        sWidth: "80px",
        sType: "formatted-num",
      },
      {
        sTitle: "Denies",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
      {
        sTitle: "GOLD/M",
        sClass: "center",
        sWidth: "70px",
        sType: "formatted-num",
      },
      {
        sTitle: "EXP/M",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "statistics_items_default"
      ? tableHashDefaults
      : tableDefaults;
  var statistics_item_table = $("#statistics_items_default").dataTable(
    $.extend(true, statistics_item_table_obj, tableVars, {})
  );
  var players_table_obj = {
    aaData: players,
    aoColumns: [
      {
        sTitle: "Name",
        sClass: "table_click_link",
        fnRender: function (obj) {
          sReturn =
            '<a href="' +
            site_root +
            "/dota-2/player/i/" +
            obj.aData[obj.iDataColumn][1] +
            '" class="q0">' +
            obj.aData[obj.iDataColumn][0] +
            "</a>";
          return sReturn;
        },
      },
      {
        sTitle: "Games",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
      {
        sTitle: "Wins",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
      {
        sTitle: "Win %",
        sClass: "center",
        sWidth: "60px",
        sType: "formatted-num",
      },
    ],
  };
  tableVars =
    table_hash_table_id == "players_default"
      ? tableHashDefaults
      : tableDefaults;
  var players_table = $("#players_default").dataTable(
    $.extend(true, players_table_obj, tableVars, {})
  );
  tableVars =
    table_hash_table_id == "comments_default"
      ? tableHashDefaults
      : tableDefaults;
  var comment_table = $("#comments_default").dataTable(
    $.extend(true, {}, tableVars, {
      aaData: comments_list,
      aoColumns: [
        {
          sTitle: "Subject",
          sClass: "table_click_link",
          sType: "html",
          fnRender: function (obj) {
            sReturn =
              '<a href="' +
              site_root +
              "/dota-2/" +
              obj.aData[obj.iDataColumn][0] +
              "/i/" +
              obj.aData[obj.iDataColumn][1] +
              "#tab:tabs-comments+" +
              obj.aData[obj.iDataColumn][3] +
              '" class="q0">' +
              obj.aData[obj.iDataColumn][2] +
              '</a><br /><span class="note">' +
              (obj.aData[obj.iDataColumn][0].charAt(0).toUpperCase() +
                obj.aData[obj.iDataColumn][0].slice(1)) +
              "</span>";
            return sReturn;
          },
        },
        {
          sTitle: "Comment Preview",
          sWidth: "500px",
          fnRender: function (obj) {
            sReturn =
              '<div class="comment_table_message_wrapper">' +
              obj.aData[obj.iDataColumn][0] +
              '</div><span class="note">Rating: ' +
              obj.aData[obj.iDataColumn][1] +
              "</span>";
            return sReturn;
          },
        },
        { sTitle: "Added", sClass: "center" },
        {
          sTitle: "User",
          sClass: "center",
          fnRender: function (obj) {
            var style = obj.aData[obj.iDataColumn][2]
              ? ' style="color: #' + obj.aData[obj.iDataColumn][2] + '"'
              : "";
            sReturn =
              '<a href="' +
              site_root +
              "/dota-2/profile/i/" +
              obj.aData[obj.iDataColumn][0] +
              '"' +
              style +
              ">" +
              obj.aData[obj.iDataColumn][1] +
              "</a>";
            return sReturn;
          },
        },
      ],
    })
  );
  tableVars =
    table_hash_table_id == "mail_inbox" ? tableHashDefaults : tableDefaults;
  var mail_inbox_table = $("#mail_inbox").dataTable(
    $.extend(true, {}, tableVars, {
      aaData: mail_inbox,
      oLanguage: { sZeroRecords: "Your mailbox is empty." },
      aoColumns: [
        {
          sTitle: '<input type="checkbox" id="pm_id_toggle_check" value="" />',
          sWidth: "1%",
          bSortable: false,
          fnRender: function (obj) {
            sReturn =
              '<input type="checkbox" class="pm_id_checkbox" name=i[]" value="' +
              obj.aData[obj.iDataColumn] +
              '" />';
            return sReturn;
          },
        },
        {
          sTitle: "Sender",
          sType: "html",
          sWidth: "10%",
          fnRender: function (obj) {
            sReturn =
              '<a href="' +
              site_root +
              "/dota-2/profile/i/" +
              obj.aData[obj.iDataColumn][0] +
              '"' +
              (obj.aData[obj.iDataColumn][2]
                ? ' style="color: #' + obj.aData[obj.iDataColumn][2] + ';"'
                : "") +
              ">" +
              obj.aData[obj.iDataColumn][1] +
              "</a>";
            return sReturn;
          },
        },
        {
          sTitle: "Subject",
          sClass: "table_click_link",
          sWidth: "59%",
          fnRender: function (obj) {
            sReturn =
              (obj.aData[obj.iDataColumn][1] == 1
                ? '<img src="' +
                  site_root +
                  '/images/icons/mail-open.png" style="vertical-align: middle;" />'
                : '<img src="' +
                  site_root +
                  '/images/icons/mail.png" style="vertical-align: middle;" />') +
              ' <a href="' +
              site_root +
              "/dota-2/mailbox/action/view/i/" +
              obj.aData[obj.iDataColumn][0] +
              '">' +
              obj.aData[obj.iDataColumn][2] +
              "</a>";
            return sReturn;
          },
        },
        { sTitle: "Time Recieved", sClass: "center", sWidth: "15%" },
        { sTitle: "Age", sClass: "center", sWidth: "15%" },
      ],
    })
  );
  tableVars =
    table_hash_table_id == "mail_sent" ? tableHashDefaults : tableDefaults;
  var mail_sent_table = $("#mail_sent").dataTable(
    $.extend(true, {}, tableVars, {
      aaData: mail_sent,
      aoColumns: [
        {
          sTitle: "To",
          sType: "html",
          sWidth: "10%",
          fnRender: function (obj) {
            sReturn =
              '<a href="' +
              site_root +
              "/dota-2/profile/i/" +
              obj.aData[obj.iDataColumn][0] +
              '"' +
              (obj.aData[obj.iDataColumn][2]
                ? ' style="color: #' + obj.aData[obj.iDataColumn][2] + ';"'
                : "") +
              ">" +
              obj.aData[obj.iDataColumn][1] +
              "</a>";
            return sReturn;
          },
        },
        {
          sTitle: "Subject",
          sClass: "table_click_link",
          sWidth: "60%",
          fnRender: function (obj) {
            sReturn =
              '<a href="' +
              site_root +
              "/dota-2/mailbox/action/view/i/" +
              obj.aData[obj.iDataColumn][0] +
              '">' +
              obj.aData[obj.iDataColumn][1] +
              "</a>";
            return sReturn;
          },
        },
        { sTitle: "Time Sent", sClass: "center", sWidth: "15%" },
        { sTitle: "Age", sClass: "center", sWidth: "15%" },
      ],
    })
  );
  tableVars =
    table_hash_table_id == "sgtable_default2"
      ? tableHashDefaults
      : tableDefaults;
  $("#sgtable_default2").dataTable($.extend(true, {}, tableVars, {}));
  tableVars =
    table_hash_table_id == "table_default" ? tableHashDefaults : tableDefaults;
  $("#table_default").dataTable($.extend(true, {}, tableVars, {}));
  tableVars =
    table_hash_table_id == "sm_table" ? tableHashDefaults : tableDefaults;
  $("#sm_table").dataTable($.extend(true, {}, tableDefaults));
  $("#toggle_check").live("click", function (ev) {
    $(".s_id_checkbox").prop("checked", $("#toggle_check").is(":checked"));
  });
  if (hideCols) {
    for (i in hideCols) {
      if (hideCols.hasOwnProperty(i)) {
        var oTable = $(hideCols[i][0]).dataTable();
        var bVis;
        if (hideCols[i].length > 2) {
          var redraw;
          $.each(hideCols[i], function (key, value) {
            if (parseInt(value) >= 0) {
              redraw = key + 1 == hideCols[i].length ? true : false;
              bVis = oTable.fnSettings().aoColumns[value].bVisible;
              oTable.fnSetColumnVis(value, bVis ? false : true, redraw);
            }
          });
        } else {
          bVis = oTable.fnSettings().aoColumns[hideCols[i][1]].bVisible;
          oTable.fnSetColumnVis(hideCols[i][1], bVis ? false : true);
          oTable.fnAdjustColumnSizing();
        }
      }
    }
  }
  if (tableAddData) {
    for (i in tableAddData) {
      if (tableAddData.hasOwnProperty(i)) {
        var oTable = $(tableAddData[i][0]).dataTable();
        oTable.fnClearTable();
        oTable.fnAddData(window[tableAddData[i][1]]);
        oTable.fnAdjustColumnSizing();
      }
    }
  }
  var first_screen = $("div #tabs-screens")
    .find("div .screens_thumb a")
    .first();
  var first_screen_selected = $("div #tabs-screens")
    .find("div.screens_thumb a.selected_screen")
    .first();
  if (jQuery.inArray(pageAlias, pages_with_screenshots) != -1) {
    if (first_screen.length >= 1 || first_screen_selected.length >= 1) {
      first_screen =
        first_screen_selected.length >= 1
          ? first_screen_selected
          : first_screen;
      var num_screens = $("div #tabs-screens").find("div .screens_thumb")
        .length;
      var img_el = $(first_screen).children().first();
      img_el.attr("class", "first_screen");
      $(".first_screen").live("click", function () {
        first_screen.click();
      });
      var first_screen_html = first_screen.html();
      $(".detail_box_body").append(
        '<div class="detail_box_screens"><strong>Screenshots</strong><br />' +
          first_screen_html +
          '<br /> <a href="#tabs-screens" id="submit_screens">Submit</a> - <a href="#tabs-screens" id="show_screens">View All (' +
          num_screens +
          ")</a></div>"
      );
    } else {
      $(".detail_box_body").append(
        '<div class="detail_box_screens"><strong>Screenshots</strong><br />None Available - <a href="#tabs-screens" id="submit_screens">Submit One</a></div>'
      );
    }
  }
  var $tabs = $("#tabs").tabs({
    select: function (event, ui) {
      rebuildHashTagData(["tab", [$(ui.panel).attr("id")]]);
    },
    show: function (event, ui) {
      var found_table = $("#" + $(ui.panel).attr("id") + " table");
      if ($(found_table).length && $(found_table).attr("id")) {
        $(found_table).css("width", "100%");
        $(found_table).dataTable().fnAdjustColumnSizing();
      }
      if ($("#fp_hero_select").length) {
        getFPHeroChange();
      }
    },
  });
  $(".ui-tabs-nav").show();
  if (change_tab) {
    $tabs.tabs("select", change_tab);
    for (i in hideCols) {
      if (hideCols.hasOwnProperty(i)) {
        var oTable = $(hideCols[i][0]).dataTable();
        $(hideCols[i][0]).css("width", "100%");
        oTable.fnAdjustColumnSizing();
      }
    }
    setFavicon();
  }
  $(document).on("click", "#show_screens, #submit_screens", function (ev) {
    $tabs.tabs("select", "tabs-screens");
  });
  $(document).on("click", "#show_hero_stats", function (ev) {
    ev.preventDefault();
    $tabs.tabs("select", "tabs-hero-stats");
    var hero = $(this).attr("href");
    var hero_name = encodeURIComponent($(this).attr("href"));
    rebuildHashTagData([
      "table",
      ["phero_stats", 0, "null", "null", hero_name, 30],
    ]);
    $("#phero_stats_filter label input").val(hero);
    $("#phero_stats_filter label input").trigger("keyup");
    hide_hero_stats();
    setFavicon();
  });
  $("a[rel^='screens']").prettyPhoto({
    theme: "dark_square",
    social_tools: '<input type="text" value="{location_href}">',
    deeplinking: false,
    overlay_gallery: false,
  });
  if (select_screen) {
    setTimeout(function () {
      $("a[rel^='" + select_screen + "']:eq(" + select_screen_id + ")").trigger(
        "click"
      );
    }, 50);
  }
  var ac_cache = {};
  $("#search_website")
    .autocomplete({
      source: function (request, response) {
        var term = $.trim(request.term);
        if (term.length >= 3) {
          if (term in ac_cache) {
            response(ac_cache[term]);
            return;
          }
          $.ajax({
            url: site_root + "/dota-2/search/i/" + $.trim(request.term) + "/tt",
            dataType: "json",
            success: function (data) {
              ac_cache[term] = data;
              response(data);
            },
          });
        }
      },
      select: function (event, ui) {
        window.location = ui.item.url;
      },
      open: function (event, ui) {
        $(this).autocomplete("widget").find("a").removeClass("ui-corner-all");
        $(this)
          .autocomplete("widget")
          .find("odd")
          .removeClass("odd")
          .end()
          .find("li.ui-menu-item:odd")
          .addClass("odd");
        hideAds("body");
      },
      close: function (event, ui) {
        showAds("body");
      },
    })
    .focus(function () {
      if (this.value != "Search the website...") {
        $(this).autocomplete("search");
      }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
    item.qclass = "q";
    if (item.category == "Hero") {
      item.icon =
        '<img src="' +
        site_root +
        "/images/hero_icons/" +
        item.icon +
        '.png" style="width: 16px; height: 16px; padding-right: 3px; vertical-align: text-top;" />';
    } else {
      if (item.category == "Item") {
        item.icon =
          '<div class="item_small_icon_block"><div class="item_small_icon_tt"><img src="' +
          site_root +
          "/images/item_icons/small/" +
          item.icon +
          '.png" class="item_small_icon" /></div></div>';
      } else {
        if (item.category == "Cosmetic") {
          item.qclass = "eq";
          item.icon =
            '<div class="citem_small_icon_block"><div class="citem_small_icon_tt"><img src="' +
            site_root +
            "/images/cosmetic_items/" +
            item.icon +
            '" class="citem_small_icon" /></div></div>';
        } else {
          if (item.category == "Ability") {
            item.icon =
              '<div class="ability_small_icon_block"><div class="ability_small_icon_tt"><img src="' +
              site_root +
              "/images/ability_icons/small/" +
              item.icon +
              '.png" class="ability_small_icon" /></div></div>';
          } else {
            if (item.category == "Guide" && item.icon) {
              item.icon =
                '<img src="' +
                site_root +
                "/images/hero_icons/" +
                item.icon +
                '.png" style="width: 16px; height: 16px; padding-right: 3px; vertical-align: text-top;" />';
            } else {
              item.icon = "";
            }
          }
        }
      }
    }
    item.name = item.name.replace(
      new RegExp(
        "(?![^&;]+;)(?!<[^<>]*)(" +
          $.ui.autocomplete.escapeRegex(this.term) +
          ")(?![^<>]*>)(?![^&;]+;)",
        "gi"
      ),
      "<strong>$1</strong>"
    );
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append(
        '<a href="' +
          item.url +
          '" class="' +
          item.qclass +
          item.quality +
          '">' +
          item.icon +
          item.name +
          '<span class="search_cat">' +
          item.category +
          "</span></a>"
      )
      .appendTo(ul);
  };
  $("#search_website").focus(function () {
    if ($(this).val() == "Search the website...") {
      $(this).val("");
    }
  });
  $("#filter-box").focus(function () {
    if ($(this).val() == "Search these results...") {
      $(this).val("");
    }
  });
  $(".dataTables_filter input").focus(function () {
    if ($(this).val() == "Search these results...") {
      $(this).val("");
    }
  });
  if ($(".dataTables_filter input").val() == "") {
    $(".dataTables_filter input").val("Search these results...");
  }
  $("ul.sf-menu").superfish();
  var url_breadcrumb = new Object();
  var url_exact_match = false;
  var menu_url_base = menu_url;
  $("ul.sf-menu")
    .find("li a")
    .each(function (index, element) {
      if ($(element).attr("href") == menu_url) {
        url_exact_match = true;
      }
    });
  if (url_exact_match != true) {
    menu_url = menu_url.split("dota-2/");
    var menu_root = menu_url[0];
    menu_url =
      typeof menu_url[1] != "undefined" ? menu_url[1].split("/") : menu_url[0];
    menu_url = menu_root + "dota-2/" + menu_url[0];
  }
  $("ul.sf-menu")
    .find("span.menu_item")
    .each(function (index, element) {
      if ($(element).parent().attr("href") == menu_url) {
        var parents = $(element).parentsUntil(".main_link");
        url_breadcrumb[parents.last().parent().find("span").first().html()] =
          "none";
        if ($(element).find(".sf-sub-indicator").first().length <= 0) {
          $(element)
            .find("span")
            .first()
            .append(
              '<span class="sf-sub-indicator"> <img src="' +
                site_root +
                '/images/icons/tick-small.png" /></span>'
            );
        } else {
          $(element)
            .find(".sf-sub-indicator")
            .first()
            .html(
              '<img src="' + site_root + '/images/icons/tick-small.png" />'
            );
        }
        parents.reverse().each(function (index, element) {
          if ($(element).is("li")) {
            $(element).css(
              "background",
              "transparent url(" +
                site_root +
                "/images/layout/menu_dropdown_bg.gif) 0px -26px no-repeat"
            );
          }
          var par_par = $(element).parent();
          if (par_par.is("li") && par_par.attr("class") != "main_link") {
            if (par_par.find("span").first().length >= 1) {
              var t_link = par_par.children().first().attr("href");
              url_breadcrumb[par_par.find("span").first().html()] =
                typeof t_link != "undefined" ? t_link : "none";
            }
            if (par_par.find(".sf-sub-indicator").first().length <= 0) {
              par_par
                .find("span")
                .first()
                .append(
                  '<span class="sf-sub-indicator"> <img src="' +
                    site_root +
                    '/images/icons/tick-small.png" /></span>'
                );
            } else {
              par_par
                .find(".sf-sub-indicator")
                .first()
                .html(
                  '<img src="' + site_root + '/images/icons/tick-small.png" />'
                );
            }
          }
        });
      }
    });
  for (var i in url_breadcrumb) {
    if (url_breadcrumb[i] == "none") {
      $(".subnav_breadcrumb").append(
        '<span class="breadcrumb_menu">' +
          i.replace(/<\/?[^>](.*)?<\/?[^>]+>/gi, "") +
          '</span><span class="bread_crumb_arrow">&raquo;</span>'
      );
    } else {
      $(".subnav_breadcrumb").append(
        '<span class="breadcrumb_menu"><a href="' +
          url_breadcrumb[i] +
          '">' +
          i.replace(/<\/?[^>](.*)?<\/?[^>]+>/gi, "") +
          '</a></span><span class="bread_crumb_arrow">&raquo;</span>'
      );
    }
  }
  if (
    $(".subnav_breadcrumb .bread_crumb_arrow").size() <= 0 &&
    menu_url_base != "" &&
    menu_url_base.indexOf("|") != -1
  ) {
    var bc_array = menu_url_base.split("|");
    var bc_data;
    $.each(bc_array, function (key, value) {
      bc_data = value.split(";");
      if (typeof bc_data["1"] != "undefined") {
        $(".subnav_breadcrumb").append(
          '<span class="breadcrumb_menu"><a href="' +
            bc_data["1"] +
            '">' +
            bc_data["0"] +
            '</a></span><span class="bread_crumb_arrow">&raquo;</span>'
        );
      } else {
        $(".subnav_breadcrumb").append(
          '<span class="breadcrumb_menu">' +
            bc_data["0"] +
            '</span><span class="bread_crumb_arrow">&raquo;</span>'
        );
      }
    });
  }
  $(".subnav_breadcrumb .bread_crumb_arrow").last().remove();
  if (
    selectCommentID &&
    selectCommentID != "undefined" &&
    $("#comment" + selectCommentID).length
  ) {
    $("html").scrollTop($("#comment" + selectCommentID).offset().top - 20);
  }
  $('form[method="GET"]').submit(function () {
    var filtered_url = new Array();
    var url_f = new Array();
    var url_fe = new Array();
    var url_fo = new Array();
    var url_question;
    $(this).find(':input[value=""]').attr("disabled", true);
    $(".adv_filters div").each(function (index) {
      if ($(this).find(':input[name="f[]"]').val() != "0") {
        url_f.push($(this).find(':input[name="f[]"]').val());
        url_fe.push($(this).find(':input[name="fe[]"]').val());
        url_fo.push(
          encodeURIComponent($(this).find(':input[name="fo[]"]').val())
        );
      }
      $(this).find(':input[name="f[]"]').attr("disabled", true);
      $(this).find(':input[name="fe[]"]').attr("disabled", true);
      $(this).find(':input[name="fo[]"]').attr("disabled", true);
    });
    var temp_url;
    var url_href = location.href;
    if (url_href.indexOf("f/") != -1) {
      url_href = url_href.replace($(this).attr("action"), "");
      url_href = url_href.replace("?", "");
      url_href = url_href.split("/");
      for (i in url_href) {
        if (url_href.hasOwnProperty(i)) {
          if (url_href[i].indexOf("f/") != -1) {
            url_href[i] = url_href[i].replace("f/", "");
            temp_url = url_href[i].split(":");
            url_href.splice(i, 1);
          }
          if (url_href[i].indexOf("fe/") != -1) {
            url_href[i] = url_href[i].replace("fe/", "");
            temp_url = url_href[i].split(":");
            url_href.splice(i, 1);
          }
          if (url_href[i].indexOf("fo/") != -1) {
            url_href[i] = url_href[i].replace("fo/", "");
            temp_url = url_href[i].split(":");
            url_href.splice(i, 1);
          }
        }
      }
      url_href = url_href.join("/");
      url_href = $(this).attr("action");
    } else {
      url_href = $(this).attr("action");
    }
    if (url_f.length >= 1) {
      filtered_url.push("f/" + url_f.join(":"));
      filtered_url.push("fe/" + url_fe.join(":"));
      filtered_url.push("fo/" + url_fo.join(":"));
    }
    $(this)
      .find(":input")
      .each(function (index) {
        if (
          typeof $(this).attr("name") != "undefined" &&
          $(this).val() &&
          $(this).attr("disabled") != "disabled" &&
          $(this).attr("type") != "checkbox" &&
          $(this).attr("type") != "radio" &&
          $(this).val() != "Search the website..."
        ) {
          filtered_url.push($(this).attr("name") + "/" + $(this).val());
        }
        if (
          typeof $(this).attr("name") != "undefined" &&
          $(this).val() &&
          $(this).attr("disabled") != "disabled" &&
          $(this).attr("type") == "checkbox" &&
          $(this).attr("checked") == "checked"
        ) {
          filtered_url.push($(this).attr("name") + "/" + $(this).val());
        }
        if (
          typeof $(this).attr("name") != "undefined" &&
          $(this).val() &&
          $(this).attr("disabled") != "disabled" &&
          $(this).attr("type") == "radio" &&
          $(this).attr("checked") == "checked"
        ) {
          filtered_url.push($(this).attr("name") + "/" + $(this).val());
        }
      });
    url_question =
      url_href.indexOf("/") + 1 != url_href.length && filtered_url.length >= 1
        ? "/"
        : "";
    location.href = url_href + url_question + filtered_url.join("/");
    return false;
  });
  $(document).on("click", ".hero_icon_tt", function (ev) {
    if ($(this).attr("href") == "#show_icon") {
      ev.preventDefault();
      var icon = $(this).find("img").attr("src").split("/");
      var icon_html = $(this).find("img").parents("div.hero_icon_block:first");
      if (!$("#icon-panel").length) {
        $(
          '<div id="icon-panel" class="lightbox-panel"><h1>Icon</h1><input type="text" value="' +
            icon[icon.length - 1] +
            '" style="float: right; width: 295px;" /><div class="hero_icon_block">' +
            $(icon_html).html() +
            '</div><div class="clear_both"></div><a id="close-panel" href="javascript:void(0)" style="display: block; text-align: center;">Close Window</a><div id="lightbox"> </div>'
        ).appendTo("body");
      } else {
        $("#icon-panel h1").html("Icon");
      }
      $("#lightbox, #icon-panel").fadeIn(300);
    }
  });
  $(".forum_post_message").each(function (index) {
    var post_html = $(this).html();
    var bb_html = bbcode_parser(post_html, 1);
    $(this).html(bb_html);
  });
  $(".view_guide_text_wrapper").each(function (index) {
    var post_html = $(this).html();
    var bb_html = db_bb_parser(post_html, 0);
    $(this).html(bb_html);
  });
  if (
    ajax_items.length >= 1 ||
    ajax_abilities.length >= 1 ||
    ajax_heroes.length >= 1 ||
    ajax_npcs.length >= 1
  ) {
    getBBCodeData(matched_items);
  }
  $(document).on("click", "#filter_clear_button", function (ev) {
    window.location.href = site_root + "/dota-2/" + pageAlias;
  });
  $("#pm_id_toggle_check").live("click", function (ev) {
    $(".pm_id_checkbox").prop(
      "checked",
      $("#pm_id_toggle_check").is(":checked")
    );
  });
  insertAds();
  var embedTag;
  $("embed").each(function (i) {
    embedTag = $(this).attr("outerHTML");
    if (embedTag != null && embedTag.length > 0) {
      embedTag = embedTag.replace(/embed /gi, 'embed wmode="opaque" ');
      $(this).attr("outerHTML", embedTag);
    } else {
      $(this).wrap("<div></div>");
    }
  });
  $(table_filterable_headers).qtip({
    content: {
      text: function (api) {
        var table_id = $(this).parent().parent().parent().attr("id");
        var oTable = $("#" + table_id).dataTable();
        var col_index = oTable._fnVisibleToColumnIndex($(this).index());
        var has_label = oTable.fnSettings().aoColumns[$(this).index()].altLabel;
        var title_text =
          typeof has_label != "undefined" ? has_label : $(this).text();
        var filter_val =
          typeof custom_filters[col_index] != "undefined" &&
          custom_filters[col_index].length >= 1
            ? "Filter: " + custom_filters[col_index][1] + "<br />"
            : "";
        return (
          '<span class="tip_title">' +
          title_text +
          '</span><br /><span class="tip_filter">' +
          filter_val +
          "</span>Click to sort<br />Right-click to filter"
        );
      },
    },
    style: { classes: "ui-tooltip-dark ui-tooltip-tipsy" },
    position: { my: "bottom center", at: "top center" },
  });
  $(table_filterable_headers).rightClick(function (ev) {
    var table = $(this);
    var table_id = $(this).parent().parent().parent().attr("id");
    var oTable = $("#" + table_id).dataTable();
    var col_index = oTable._fnVisibleToColumnIndex($(this).index());
    var prompt_text =
      oTable.fnSettings().aoColumns[col_index].sType == "numeric" ||
      oTable.fnSettings().aoColumns[col_index].sType == "formatted-num"
        ? "You may set a filter for the " +
          $(this).text() +
          ' column. <br /><br /> e.g. ">100", "32-34" or "<=10"'
        : "You may set a filter for the " +
          $(this).text() +
          ' column. <br /><br />e.g. "sword"';
    var input_val =
      typeof custom_filters[col_index] != "undefined" &&
      custom_filters[col_index].length >= 1
        ? custom_filters[col_index][1]
        : "";
    Prompt(prompt_text, input_val, function (response) {
      if (response === "") {
        if (
          typeof custom_filters[col_index] != "undefined" &&
          custom_filters[col_index]
        ) {
          $(table).removeClass("basic_table_custom_filtered");
          custom_filters[col_index] = [];
          oTable.fnDraw();
        }
      } else {
        $(table).addClass("basic_table_custom_filtered");
        custom_filters[col_index] = [col_index, response];
        oTable.fnDraw();
      }
    });
  });
  function getFPHeroChange() {
    var selected_tab = $("#tabs").tabs("option", "selected");
    var hero_id = $("#fp_hero_select").val();
    hero_id = hero_id ? hero_id : "";
    if (selected_tab == 0) {
      getFPGuideData("top", hero_id);
    } else {
      if (selected_tab == 1) {
        getFPGuideData("latest", hero_id);
      } else {
        if (selected_tab == 2) {
          getFPGuideData("hot-week", hero_id);
        } else {
          if (selected_tab == 3) {
            getFPGuideData("hot-month", hero_id);
          }
        }
      }
    }
  }
  $(document).on("change", "#fp_hero_select", function (ev) {
    getFPHeroChange();
  });
  $(document).on("mouseover", ".help_q_mark", function (ev) {
    $(this).qtip({
      overwrite: false,
      content: {
        text: function (api) {
          return $(this).attr("title");
        },
      },
      show: { ready: true },
      style: { classes: "ui-tooltip-dark ui-tooltip-tipsy help_q_tip" },
      position: { my: "bottom left", at: "top left", viewport: $(window) },
    });
  });
  $(document).on("mouseover", ".match_top_winner", function (ev) {
    if ($(this).attr("id") == "RADIANT VICTORY!") {
      $(this).addClass("team_color_good");
    } else {
      $(this).addClass("team_color_bad");
    }
    $(this).html($(this).attr("id"));
  });
  function installSearchEngine() {
    if (window.external && "AddSearchProvider" in window.external) {
      window.external.AddSearchProvider(site_root + "/open-search.xml");
    } else {
      if (window.sidebar && "addSearchEngine" in window.sidebar) {
        alert(
          "No search engine support found in your browser, you should update!"
        );
      } else {
        alert(
          "No search engine support found in your browser, you should update!"
        );
      }
    }
  }
  $(document).on("click", ".add_search_plugin", function (ev) {
    ev.preventDefault();
    installSearchEngine();
  });
  $(document).on("click", "#new_guide_button", function (ev) {
    var hero_id = $(this).children("img").first().attr("id");
    $.cookie("selected_hero_id", hero_id, { path: "/" });
  });
  $(document).on(
    "mouseover",
    ".forum_post_message_wrapper, .forum_post_controls",
    function (ev) {
      $(this)
        .parent()
        .find(".forum_post_controls ul")
        .css("visibility", "visible");
      $(this)
        .parent()
        .find(".forum_post_controls div")
        .css("visibility", "visible");
    }
  );
  $(document).on(
    "mouseout",
    ".forum_post_message_wrapper, .forum_post_controls",
    function (ev) {
      $(this)
        .parent()
        .find(".forum_post_controls ul")
        .css("visibility", "hidden");
      $(this)
        .parent()
        .find(".forum_post_controls div")
        .css("visibility", "hidden");
    }
  );
  heroStatsSlider();
  $(document).on("click", "#match_more_stats", function (ev) {
    ev.preventDefault();
    calcCols("radiant_table");
    calcCols("dire_table");
    calcPercents("radiant_table");
    calcPercents("dire_table");
    $(
      "#radiant_table_totals, #radiant_table_averages, #dire_table_totals, #dire_table_averages"
    ).show();
  });
  function calcPercents(table_id) {
    if (!$("#" + table_id + " tbody tr.match_detail_row").length) {
      $("#" + table_id + " tbody tr").each(function (i) {
        var row_index = $(this).index();
        var html = '<tr class="match_detail_row">';
        $(this)
          .find("td")
          .each(function (i) {
            var col_index = $(this).index();
            var this_val = parseInt($(this).text().replace(",", ""), 10);
            var total_val = parseInt(
              $("#" + table_id + "_totals td:eq(" + col_index + ")")
                .text()
                .replace(",", ""),
              10
            );
            if (
              isNaN(this_val) ||
              this_val === undefined ||
              isNaN(total_val) ||
              total_val === undefined
            ) {
              var hero_dmg = addCommas($(this).find(".hero_damage").text());
              var tower_dmg = addCommas($(this).find(".tower_damage").text());
              var gold_earned = addCommas($(this).find(".gold_earned").text());
              gold_earned = gold_earned
                ? "<br />Gold Earned: " + gold_earned
                : "";
              if (col_index == 0) {
                html += "<td>Percents & Totals</td>";
              } else {
                if (hero_dmg) {
                  html +=
                    '<td style="text-align: left;">Hero Dmg: ' +
                    hero_dmg +
                    "</td>";
                } else {
                  if (tower_dmg) {
                    html +=
                      '<td style="text-align: left;" colspan="6">Tower Dmg: ' +
                      tower_dmg +
                      gold_earned +
                      "</td>";
                  } else {
                    if (col_index > 11 || col_index < 6) {
                      html += "<td></td>";
                    }
                  }
                }
              }
              return;
            }
            var percent = round((this_val / total_val) * 100);
            html += "<td>" + percent + "%</td>";
          });
        html += "</tr>";
        $("#" + table_id + " tbody tr:eq(" + row_index + ")").after(html);
      });
    }
  }
  function calcCols(table_id) {
    if (!$("#" + table_id + " tbody tr.match_detail_row").length) {
      var sum = 0;
      var highest_val = new Object();
      var highest_index = 0;
      var highest_indexes = new Object();
      $("#" + table_id + " tbody tr")
        .find("td")
        .each(function (i) {
          var row_index = $(this).parent().index();
          var col_index = $(this).index();
          var val = parseInt($(this).text().replace(",", ""), 10);
          if (isNaN(val) || val === undefined) {
            return;
          }
          if (typeof highest_val[col_index] == "undefined") {
            highest_val[col_index] = new Object();
            highest_indexes[col_index] = new Array();
            highest_val[col_index] = val;
          }
          if (highest_val[col_index] < val) {
            highest_indexes[col_index] = new Array();
            highest_val[col_index] = val;
          }
          if (highest_val[col_index] == val) {
            highest_indexes[col_index].push([row_index, col_index]);
          }
        });
      for (i in highest_indexes) {
        if (highest_indexes.hasOwnProperty(i)) {
          for (c in highest_indexes[i]) {
            if (highest_indexes[i].hasOwnProperty(c)) {
              $(
                "#" +
                  table_id +
                  " tbody tr:eq(" +
                  highest_indexes[i][c][0] +
                  ")"
              )
                .find("td:nth(" + highest_indexes[i][c][1] + ")")
                .addClass("comment_green");
            }
          }
        }
      }
    }
  }
  per_hero_stats = jQuery.parseJSON(per_hero_stats);
  function updateHeroTable(show_or_hide) {
    if (show_or_hide == "show") {
      $(
        "#phero_stats tbody tr td:not(:nth-child(1)), #phero_stats thead tr th:not(:nth-child(1))"
      ).hide();
      $("#phero_stats").css("width", "225px").css("float", "left");
    } else {
      $(
        "#phero_stats tbody tr td:not(:nth-child(1)), #phero_stats thead tr th:not(:nth-child(1))"
      ).show();
      $("#phero_stats").css("width", "100%").css("float", "none");
    }
  }
  function compare(a, b) {
    if (a.count < b.count) {
      return -1;
    }
    if (a.count > b.count) {
      return 1;
    }
    return 0;
  }
  function secondsToString(seconds) {
    var numdays = Math.floor(seconds / 86400);
    var numhours = Math.floor((seconds % 86400) / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = ((seconds % 86400) % 3600) % 60;
    return (
      (numdays ? numdays + "D" : "") +
      (numhours ? " " + numhours + "H" : "") +
      (numminutes ? " " + numminutes + "M" : "")
    );
  }
  var stats_name_map = {
    victories: "Victories",
    total_games: "Games",
    tower_dmg: "Tower Damage",
    hero_dmg: "Hero Damage",
    hero_healing: "Hero Healing",
    gold_spent: "Gold Spent",
    gold_earned: "Gold Earned",
    gold_highest: "Highest Gold",
    game_time: "Game Time",
    kills: "Kills",
    kills_highest: "Highest Kills",
    deaths: "Deaths",
    deaths_highest: "Highest Deaths",
    assists: "Assists",
    assists_highest: "Highest Assists",
    last_hits: "Last Hits",
    last_hits_highest: "Highest Last Hits",
    denies: "Denies",
    denies_highest: "Highest Denies",
  };
  var stat_average_map = {
    tower_dmg: "Tower Damage",
    hero_dmg: "Hero Damage",
    hero_healing: "Hero Healing",
    gold_spent: "Gold Spent",
    gold_earned: "Gold Earned",
    kills: "Kills",
    deaths: "Deaths",
    assists: "Assists",
    last_hits: "Last Hits",
    denies: "Denies",
  };
  function hide_hero_stats() {
    table_show_status = 0;
    $(".hide_more_stats").html("Show more stats &raquo;");
    $(".hide_more_stats").attr("class", "show_more_stats");
    $(this).attr("class", "show_more_stats");
    $(this).html("Show more stats &raquo;");
    $(".phero_stats_right_stats, .phero_stats_left_stats").remove();
    updateHeroTable("hide");
  }
  var table_show_status = 1;
  $(document).on("click", ".hide_more_stats", function (ev) {
    ev.preventDefault();
    hide_hero_stats();
  });
  $(document).on("click", ".show_more_stats", function (ev) {
    ev.preventDefault();
    table_show_status = 1;
    $(this).attr("class", "hide_more_stats");
    $(this).html("Hide more stats &laquo;");
    updateHeroTable("show");
    $(".phero_stats_right_stats, .phero_stats_left_stats").show();
    $(document).on(
      "click",
      "#phero_stats_next, #phero_stats_prev, #phero_stats_last, #phero_stats_first, .table_click_link sorting_asc",
      function (ev) {
        if (table_show_status == 1) {
          updateHeroTable("show");
        }
      }
    );
    $(document).on("keydown", "#phero_stats_filter label input", function (ev) {
      if (table_show_status == 1) {
        updateHeroTable("show");
      }
    });
    $(document).on("change", "#phero_stats_length label select", function (ev) {
      if (table_show_status == 1) {
        updateHeroTable("show");
      }
    });
    if (!$("#phero_stats_details").length) {
      $("#phero_stats").after('<div id="phero_stats_details"></div>');
    }
    var html;
    var hero_id = $(this).attr("id").replace("hero_", "");
    html = '<div class="phero_stats_right_stats">';
    var sortable = [];
    for (var i in per_hero_stats[hero_id]["items_count"]) {
      sortable.push([i, per_hero_stats[hero_id]["items_count"][i]]);
    }
    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    sortable.reverse();
    html +=
      '<div class="phero_stats_portrait" style="background-image: url(\'' +
      site_root +
      "/images/hero_portraits/" +
      per_hero_stats[hero_id]["hero_portrait"] +
      '.png\');"><div class="phero_stats_portrait_overlay">&nbsp;</div></div>';
    html +=
      '<div class="phero_stats_items_wrapper"><div class="phero_stats_fave_items_head">Favorite Items</div>';
    html +=
      '<table class="basic_table" style="width: 300px; border-top: 2px solid #282828;"><tbody>';
    var c = 0;
    for (i in sortable) {
      if (sortable.hasOwnProperty(i)) {
        class_name = c % 2 == 0 ? "even" : "odd";
        html +=
          '<tr class="' +
          class_name +
          '"><td><div class="item_icon_block"><a class="item_icon_tt" href="' +
          site_root +
          "/dota-2/item/i/" +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_id_name"] +
          "/" +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_url_name"] +
          '"><img class="item_icon" src="' +
          site_root +
          "/images/item_icons/medium/" +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_icon"] +
          '.png"></a></div><div class="item_icon_title"><a rel="" class="q' +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_quality"] +
          '" href="' +
          site_root +
          "/dota-2/item/i/" +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_id_name"] +
          "/" +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["item_url_name"] +
          '">' +
          per_hero_stats[hero_id]["items"][sortable[i][0]][
            "item_display_name"
          ] +
          "</a><br />Acquired in " +
          per_hero_stats[hero_id]["items"][sortable[i][0]]["count"] +
          "/" +
          per_hero_stats[hero_id]["total_games"] +
          " games</div></td></tr>";
        c++;
      }
    }
    html += "</tbody></table>";
    html += "</div>";
    html += "</div>";
    html += '<div class="phero_stats_left_stats">';
    html +=
      '<img style="float: left; margin: 0 10px 0 0; width: 32px; height: 32px;" src="' +
      site_root +
      "/images/hero_icons/" +
      per_hero_stats[hero_id]["hero_icon"] +
      '.png">';
    html +=
      '<span class="phero_stats_hero_name">' +
      per_hero_stats[hero_id]["hero_display_name"] +
      "</span>";
    html += '<div class="phero_stats_group_head">Total Stats</div>';
    html += '<div class="phero_stats_group">';
    html +=
      '<table class="basic_table" style="width: 300px; border-top: 2px solid #282828;"><tbody>';
    var c = 0;
    var stat_value;
    for (i in per_hero_stats[hero_id]) {
      if (per_hero_stats[hero_id].hasOwnProperty(i)) {
        var stat_name = stats_name_map[i];
        if (stat_name) {
          class_name = c % 2 == 0 ? "even" : "odd";
          stat_value = per_hero_stats[hero_id][i];
          if (i == "game_time") {
            html +=
              '<tr class="' +
              class_name +
              '"><td>' +
              stat_name +
              "</td><td>" +
              secondsToString(stat_value) +
              "</td></tr>";
          } else {
            if (i == "win_prc") {
              html +=
                '<tr class="' +
                class_name +
                '"><td>' +
                stat_name +
                "</td><td>" +
                secondsToString(stat_value) +
                "</td></tr>";
            } else {
              html +=
                '<tr class="' +
                class_name +
                '"><td>' +
                stat_name +
                "</td><td>" +
                addCommas(stat_value) +
                "</td></tr>";
            }
          }
          c++;
        }
      }
    }
    html += "</tbody></table>";
    html += "</div>";
    html += '<div class="phero_stats_group_head">Averages</div>';
    html += '<div class="phero_stats_group">';
    html +=
      '<table class="basic_table" style="width: 300px; border-top: 2px solid #282828;"><tbody>';
    var c = 0;
    var stat_value;
    var average;
    for (i in stat_average_map) {
      if (stat_average_map.hasOwnProperty(i)) {
        var stat_name = stats_name_map[i];
        if (stat_name) {
          class_name = c % 2 == 0 ? "even" : "odd";
          stat_value = per_hero_stats[hero_id][i];
          average = stat_value / per_hero_stats[hero_id]["total_games"];
          html +=
            '<tr class="' +
            class_name +
            '"><td>' +
            stat_name +
            "</td><td>" +
            addCommas(round(average, 2)) +
            "</td></tr>";
          c++;
        }
      }
    }
    html += "</tbody></table>";
    html += "</div>";
    html += '</div><div class="clear_both"></div>';
    $("#phero_stats_details").html(html);
    tooltip.find_links();
  });
  $(document).on("click", ".parser_data_head", function (ev) {
    $(this).parent().children(".parser_data_body").slideToggle("fast");
  });
  $(document).on("click", "#delete_guide", function (ev) {
    ev.preventDefault();
    var answer = confirm(
      "This will delete any guide data that hasn't been saved to the site yet, are you sure?"
    );
    if (answer) {
      window.location = $(this).attr("href");
    }
  });
  var comment_place_holder_text =
    "You can tag this match with a comment to make it easier to identify in your favorites...";
  function closePanel() {
    $("#download-panel, #lightbox").fadeOut(300);
  }
  $(document).on("click", "a#close-panel", function (ev) {
    closePanel();
  });
  $(document).on("click", "#favorite_match", function (ev) {
    ev.preventDefault();
    var match_id = $("#favorite_match span").attr("id");
    if (!$("#download-panel").length) {
      var options =
        '<textarea type="text" style="margin-bottom: 10px;" id="favorite_comment" rows="10" cols="46" maxlength="255">' +
        comment_place_holder_text +
        "</textarea>";
      var download_link =
        '<a id="real_favorite_match" href="#" class="small_buttons"><img src="' +
        site_root +
        '/images/icons/heart.png" /><span id="' +
        match_id +
        '">Add to Favorites</span></a>';
      $(
        '<div id="download-panel" class="lightbox-panel"><h1>Favorite Match</h1><div style="padding-bottom: 4px;">You can enter a comment to help identify this match in your favorites!</div><div class="clear_both"></div><div class="ss_download_options_wrapper">' +
          options +
          '</div><div style="float: left;">' +
          download_link +
          '</div><div style="float: right;"><a class="small_buttons" id="close-panel" href="javascript:void(0)"><img src="' +
          site_root +
          '/images/icons/cross-button.png" /><span>Cancel</span></a></div><div class="clear_both"></div></div><div id="lightbox"></div>'
      ).appendTo("body");
    }
    $("#lightbox, #download-panel").fadeIn(300);
  });
  $(document).on("click", "#real_favorite_match", function (ev) {
    ev.preventDefault();
    var match_id = $("#favorite_match span").attr("id");
    var comment = $("#favorite_comment").val();
    comment = comment == comment_place_holder_text ? "" : comment;
    $(this)
      .parent()
      .html(
        '<img id="favorite_loading_img" src="' +
          site_root +
          '/images/layout/comment-load.gif" />'
      );
    $.ajax({
      url: site_root + "/dota-2/ajax_favorite_match/tt/1",
      type: "POST",
      data: { match_id: match_id, comment: comment, tt: 1 },
      dataType: "json",
      success: function (data) {
        $("#favorite_loading_img")
          .parent()
          .html(
            '<a id="real_favorite_match" href="#" class="small_buttons"><img src="' +
              site_root +
              '/images/icons/heart.png" /><span id="' +
              match_id +
              '">Add to Favorites</span></a>'
          );
        if (data.status == "success") {
          $("#favorite_match").parent().append("Match added to favorites!");
          $("#favorite_match").remove();
          closePanel();
        } else {
          $(".sys_error").remove();
          $("#download-panel").prepend(
            '<div class="sys_error">' + data.msg + "</div>"
          );
        }
      },
    });
  });
  $(document).on("click", "#favorite_comment", function (ev) {
    ev.preventDefault();
    if ($(this).val() == comment_place_holder_text) {
      $(this).val("");
    }
  });
  tooltip.init();
});
function getSteamUserInfo(a, d) {
  var b;
  $.ajax({
    url:
      site_root +
      "/dota-2/ajax_steam_data/?steam_ids=" +
      String(a) +
      "&match_id=" +
      d +
      "&tt=1",
    dataType: "json",
    success: function (e) {
      if (e != "No Steam IDs provided.") {
        for (i in e) {
          if (e.hasOwnProperty(i)) {
            b = e[i]["gameid"] ? 50 : e[i]["personastate"];
            $("#" + i).html(
              '<a href="' +
                e[i]["profileurl"] +
                '"><img src="' +
                e[i]["avatar"] +
                '" style="float: left; margin: 0px 4px 0px 0px; width: 20px; height: 20px;" class="profile_border_' +
                b +
                '" /></a>'
            );
            $("#" + i + "_name").html(e[i]["personaname"]);
          }
        }
      }
    },
  });
}
var DBTipTag = "a";
var DBTipX = 0;
var DBTipY = 0;
var DBTipTrackingYOffset = 0;
var DBTipTrackingXOffset = 15;
var DBTipTracking = false;
var DBTipPosition = "top-right-top";
var DBTipCache = new Object();
var ShowTT = 0;
var gMouseX = 0;
var gMouseY = 0;
tooltip = {
  name: "DBTip",
  offsetX: DBTipX,
  offsetY: DBTipY,
  extraIconSize: 0,
  tip: null,
  MouseTracking: false,
  openDelay: 20,
};
tooltip.init = function () {
  var b = "http://www.w3.org/1999/xhtml";
  if (!a) {
    var a = "DBTip";
  }
  var d = document.getElementById(a);
  if (!d) {
    d = document.createElementNS
      ? document.createElementNS(b, "div")
      : document.createElement("div");
    d.setAttribute("id", a);
    document.getElementsByTagName("body").item(0).appendChild(d);
  }
  if (!document.getElementById) {
    return;
  }
  this.tip = document.getElementById(this.name);
  this.tip.onmouseover = function () {
    this.innerHTML = "";
    this.style.display = "none";
    if (this.waiting) {
      clearTimeout(this.waiting);
    }
  };
  window.onscroll = tooltip.updateCords;
  tooltip.find_links();
};
tooltip.find_links = function () {
  var f = document.getElementsByTagName("a");
  var b, d;
  if (f) {
    for (var e = 0; e < f.length; e++) {
      b = f[e];
      d = b.getAttribute("href");
      if (d && typeof b.onmouseover != "function") {
        b.onmouseover = tooltip.event_onmouseover;
        if (DBTipTracking == true && typeof b.onmousemove != "function") {
        }
      }
    }
  }
};
tooltip.isDescendant = function (a, d) {
  if (d) {
    var b = d.parentNode;
    while (b != null) {
      if (b == a) {
        return true;
      }
      b = b.parentNode;
    }
  }
  return false;
};
tooltip.event_onmouseover = function (a) {
  tooltip.remove_script(a);
  tooltip.show(a);
};
tooltip.event_onmouseout = function (a) {
  tooltip.remove_script(a);
  if (tooltip.isDescendant(a.currentTarget, a.relatedTarget)) {
    return false;
  }
  tooltip.hide(a);
};
tooltip.event_onmousemove = function (a) {
  tooltip.move(a, "");
};
tooltip.getTarget = function (b) {
  var a;
  if (!b) {
    var b = window.event;
  }
  if (b.target) {
    a = b.target;
  } else {
    if (b.srcElement) {
      a = b.srcElement;
    }
  }
  if (a.nodeType == 3) {
    a = a.parentNode;
  }
  if (Object.prototype.toString.call(a) == "[object HTMLModElement]") {
    return a.parentNode;
  } else {
    if (!a.getAttribute("href")) {
      return a.parentNode;
    } else {
      return a;
    }
  }
};
tooltip.updateCords = function () {
  tooltip.tip.innerHTML = "";
  tooltip.tip.style.display = "none";
  if (window.pageYOffset) {
    return window.pageYOffset;
  } else {
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    } else {
      if (document.body && document.body.scrollTop) {
        return document.body.scrollTop;
      } else {
        return 0;
      }
    }
  }
};
tooltip.getViewPortInfo = function () {
  var b;
  var a;
  if (typeof window.innerWidth != "undefined") {
    (b = window.innerWidth), (a = window.innerHeight);
  } else {
    if (
      typeof document.documentElement != "undefined" &&
      typeof document.documentElement.clientWidth != "undefined" &&
      document.documentElement.clientWidth != 0
    ) {
      (b = document.documentElement.clientWidth),
        (a = document.documentElement.clientHeight);
    } else {
      (b = document.getElementsByTagName("body")[0].clientWidth),
        (a = document.getElementsByTagName("body")[0].clientHeight);
    }
  }
  return { height: a, width: b };
};
tooltip.getCumulativeOffset = function (f) {
  var e, d;
  var b = f.offsetHeight;
  var a = f.offsetWidth;
  e = d = 0;
  if (f.offsetParent) {
    do {
      e += f.offsetLeft;
      d += f.offsetTop;
    } while ((f = f.offsetParent));
  }
  return { x: e, y: d, height: b, width: a };
};
tooltip.f_scrollTop = function () {
  return this.f_filterResults(
    window.pageYOffset ? window.pageYOffset : 0,
    document.documentElement ? document.documentElement.scrollTop : 0,
    document.body ? document.body.scrollTop : 0
  );
};
tooltip.f_filterResults = function (e, b, a) {
  var d = e ? e : 0;
  if (b && (!d || d > b)) {
    d = b;
  }
  return a && (!d || d > a) ? a : d;
};
tooltip.position = function () {
  viewportsize = tooltip.getViewPortInfo();
  topscroll = this.f_scrollTop();
  if (tooltip.MouseTracking == true) {
    var a = tooltip.getCumulativeOffset(tooltip.tip);
    gwidth = a.width;
  }
  if (DBTipPosition == "top-right-bottom") {
    leftPos = gx + gwidth + this.offsetX;
    topPos = gy + gheight - this.tip.offsetHeight + this.offsetY;
  } else {
    if (DBTipPosition == "top-right-top") {
      leftPos = gx + gwidth + this.offsetX;
      topPos = gy;
    } else {
      if (DBTipPosition == "bottom-right") {
        leftPos = gx + gwidth + this.offsetX;
        topPos = gy - gheight / 2 + this.offsetY;
      } else {
        leftPos = gx + this.offsetX;
        topPos = gy + this.offsetY;
      }
    }
  }
  if (topPos + this.tip.offsetHeight > viewportsize.height + topscroll) {
    topPos =
      topPos -
      (topPos + this.tip.offsetHeight - (viewportsize.height + topscroll));
  }
  if (topscroll > topPos) {
    topPos = topscroll - topPos + topPos;
  }
  if (leftPos + this.tip.offsetWidth > viewportsize.width) {
    leftPos = gx - this.offsetX - this.tip.offsetWidth - this.extraIconSize;
  }
  this.tip.style.left = leftPos + "px";
  this.tip.style.top = topPos + "px";
  if (tooltip.MouseTracking == true) {
    tooltip.move("", 1);
  }
};
tooltip.getMousePos = function (a) {
  if (document.all) {
    x =
      document.documentElement && document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft;
    y =
      document.documentElement && document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
    x += window.event.clientX;
    y += window.event.clientY;
  } else {
    x = a.pageX;
    y = a.pageY;
  }
  gMouseX = x;
  gMouseY = y;
  return { x: x, y: y };
};
tooltip.move = function (a, b) {
  if (b == "" && a != "") {
    mousePos = this.getMousePos(a);
  } else {
    mousePos = { x: gMouseX, y: gMouseY };
  }
  tooltip.MouseTracking = true;
  viewportsize = tooltip.getViewPortInfo();
  topscroll = this.f_scrollTop();
  leftPos = mousePos.x + this.offsetX + DBTipTrackingXOffset;
  topPos = mousePos.y + this.offsetY + DBTipTrackingYOffset;
  if (topPos + this.tip.offsetHeight > viewportsize.height + topscroll) {
  } else {
    this.tip.style.top = topPos + "px";
  }
  if (leftPos + this.tip.offsetWidth > viewportsize.width) {
    leftPos =
      mousePos.x -
      this.offsetX -
      DBTipTrackingXOffset -
      this.tip.offsetWidth -
      this.extraIconSize;
  }
  this.tip.style.left = leftPos + "px";
};
function showToolTip(b) {
  if (tooltip.mouseIsOver) {
    if (no_icon == 1) {
      tooltip.extraIconSize = 0;
    }
    tooltip.tip.innerHTML = b.symbol;
    tooltip.tip.style.display = "block";
    var d = document.getElementById("dbtt_display_icon");
    var a = document.getElementById("dbtt_wrapper");
    if (d) {
      if (no_icon == 1) {
        d.style.display = "none";
        a.style.margin = "0px 0px 0px 5px";
      } else {
        tooltip.MouseTracking = true;
        d.style.display = "block";
        a.style.margin = "0px 0px 0px 0px";
      }
    }
    if (!DBTipCache[b.id] || DBTipCache[b.id] == "") {
      DBTipCache[b.id] = b.symbol;
    }
  }
  tooltip.position();
}
tooltip.removeElement = function (a) {
  element = document.getElementById(a);
  element.parentNode.removeChild(element);
};
var url, script, gx, gy, gwidth, gheight, element, mousePos, no_icon;
var tooltipLoadingMsg = "";
tooltip.show = function (k) {
  var f = tooltip.getTarget(k);
  var g = f.getAttribute("href");
  var h, d;
  if (g) {
    var b = f.getAttribute("rel");
    h = g.match(
      /^http:\/\/(.+?)?\.?dotaholic.com\/dota-2\/\??(item|ability|hero|guide|citem|npc)\/i\/([0-9A-z+%_\.]+)/i
    );
    if (h) {
      f.removeAttribute("title");
      f.removeAttribute("alt");
      rel_vars = b ? b.replace("&", "") : "";
      f.id = h[2] + unescape(h[3]) + rel_vars;
      f.id = f.id.replace(/[\s':"\+)(=&\/]/gi, "");
      d = f.getAttribute("class");
      if (typeof site_root == "undefined" && !d) {
        d = "q0";
      }
      if (
        d == "item_icon_tt_small" ||
        d == "hero_icon_tt_small_inline" ||
        d == "ability_icon_tt_small_inline" ||
        d == "item_icon_guide_view" ||
        d == "item_group_item_in_group" ||
        d == "hero_select" ||
        d == "ability_icon_tt" ||
        d == "item_icon_tt" ||
        d == "citem_icon_tt" ||
        d == "hero_icon_tt" ||
        d == "hero_mini_icon_tt" ||
        d == "ability_medium_icon_tt" ||
        d == "q0" ||
        d == "q1" ||
        d == "q2" ||
        d == "q3" ||
        d == "q4" ||
        d == "q5" ||
        d == "q6" ||
        d == "eq1" ||
        d == "eq2" ||
        d == "eq3" ||
        d == "eq4" ||
        d == "eq5" ||
        d == "eq6" ||
        d == "eq7" ||
        d == "item_icon_tt_mouse_track"
      ) {
        f.onmouseout = tooltip.event_onmouseout;
        if (
          d == "hero_select" ||
          d == "q0" ||
          d == "q1" ||
          d == "q2" ||
          d == "q3" ||
          d == "q4" ||
          d == "q5" ||
          d == "q6" ||
          d == "eq1" ||
          d == "eq2" ||
          d == "eq3" ||
          d == "eq4" ||
          d == "eq5" ||
          d == "eq6" ||
          d == "eq7" ||
          d == "item_icon_tt_mouse_track"
        ) {
          f.onmousemove = tooltip.event_onmousemove;
        }
        var l = g.split("#")[0] + "/tt" + (b ? b : "");
        var j = f.getAttribute("id");
        tooltip.mouseIsOver = true;
        elementpos = tooltip.getCumulativeOffset(f);
        gx = elementpos.x;
        gy = elementpos.y;
        gwidth = elementpos.width;
        gheight = elementpos.height;
        no_icon =
          f.className == "item_icon_tt_small" ||
          f.className == "hero_icon_tt_small_inline" ||
          f.className == "ability_icon_tt_small_inline" ||
          f.className == "item_icon_tt" ||
          f.className == "item_icon_tt_mini" ||
          f.className == "ability_icon_tt" ||
          f.className == "hero_icon_tt" ||
          f.className == "hero_mini_icon_tt" ||
          f.className == "ability_medium_icon_tt" ||
          f.className == "item_group_item_in_group" ||
          f.className == "item_icon_guide_view"
            ? 1
            : 0;
        if (DBTipCache[j] && DBTipCache[j] != "") {
          showToolTip({ symbol: DBTipCache[j], id: j });
        } else {
          this.waiting = setTimeout(function () {
            script = document.createElement("script");
            script.setAttribute("src", l);
            script.type = "text/javascript";
            script.id = "script" + j;
            document.getElementsByTagName("head")[0].appendChild(script);
          }, tooltip.openDelay);
        }
      }
    }
  }
};
tooltip.hide = function (d) {
  if (!this.tip) {
    return;
  }
  var a = tooltip.getTarget(d);
  var b = a.getAttribute("id");
  tooltip.mouseIsOver = false;
  tooltip.MouseTracking = false;
  productElement = document.getElementById("script" + b);
  if (productElement != null) {
    this.removeElement("script" + b);
  }
  if (this.waiting) {
    clearTimeout(this.waiting);
  }
  this.tip.innerHTML = "";
  this.tip.style.display = "none";
};
tooltip.remove_script = function (d) {
  if (!this.tip) {
    return;
  }
  var a = tooltip.getTarget(d);
  var b = a.getAttribute("id");
  productElement = document.getElementById("script" + b);
  if (productElement != null) {
    this.removeElement("script" + b);
  }
};
if (typeof site_root == "undefined") {
  window.onload = function () {
    var a = document.createElement("link");
    a.setAttribute("href", ".//styles/db_tooltips.css");
    a.type = "text/css";
    a.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(a);
    tooltip.init();
  };
}
