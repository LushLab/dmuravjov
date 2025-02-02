!(function () {
    function t(t) {
        return t && t.__esModule ? t.default : t;
    }
    var e,
        i = {},
        r = !1;
    function n() {
        var t, i;
        return (
            r ||
                ((r = !0),
                (e = {}),
                (t = "undefined" != typeof window ? window : e),
                (i = function () {
                    function t() {}
                    var e = t.prototype;
                    return (
                        (e.on = function (t, e) {
                            if (t && e) {
                                var i = (this._events = this._events || {}),
                                    r = (i[t] = i[t] || []);
                                return -1 == r.indexOf(e) && r.push(e), this;
                            }
                        }),
                        (e.once = function (t, e) {
                            if (t && e) {
                                this.on(t, e);
                                var i = (this._onceEvents = this._onceEvents || {});
                                return ((i[t] = i[t] || {})[e] = !0), this;
                            }
                        }),
                        (e.off = function (t, e) {
                            var i = this._events && this._events[t];
                            if (i && i.length) {
                                var r = i.indexOf(e);
                                return -1 != r && i.splice(r, 1), this;
                            }
                        }),
                        (e.emitEvent = function (t, e) {
                            var i = this._events && this._events[t];
                            if (i && i.length) {
                                (i = i.slice(0)), (e = e || []);
                                for (var r = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                                    var s = i[n];
                                    r && r[s] && (this.off(t, s), delete r[s]), s.apply(this, e);
                                }
                                return this;
                            }
                        }),
                        (e.allOff = function () {
                            delete this._events, delete this._onceEvents;
                        }),
                        t
                    );
                }),
                e ? (e = i()) : (t.EvEmitter = i())),
            e
        );
    }
    /*!
     * imagesLoaded v4.1.4
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */ !(function (t, e) {
        i ? (i = e(t, n())) : (t.imagesLoaded = e(t, t.EvEmitter));
    })("undefined" != typeof window ? window : i, function (t, e) {
        var i = t.jQuery,
            r = t.console;
        function n(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        var s = Array.prototype.slice;
        function o(t, e, a) {
            if (!(this instanceof o)) return new o(t, e, a);
            var u,
                h = t;
            ("string" == typeof t && (h = document.querySelectorAll(t)), h)
                ? ((this.elements = ((u = h), Array.isArray(u) ? u : "object" == typeof u && "number" == typeof u.length ? s.call(u) : [u])),
                  (this.options = n({}, this.options)),
                  "function" == typeof e ? (a = e) : n(this.options, e),
                  a && this.on("always", a),
                  this.getImages(),
                  i && (this.jqDeferred = new i.Deferred()),
                  setTimeout(this.check.bind(this)))
                : r.error("Bad element for imagesLoaded " + (h || t));
        }
        (o.prototype = Object.create(e.prototype)),
            (o.prototype.options = {}),
            (o.prototype.getImages = function () {
                (this.images = []), this.elements.forEach(this.addElementImages, this);
            }),
            (o.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && a[e]) {
                    for (var i = t.querySelectorAll("img"), r = 0; r < i.length; r++) {
                        var n = i[r];
                        this.addImage(n);
                    }
                    if ("string" == typeof this.options.background) {
                        var s = t.querySelectorAll(this.options.background);
                        for (r = 0; r < s.length; r++) {
                            var o = s[r];
                            this.addElementBackgroundImages(o);
                        }
                    }
                }
            });
        var a = { 1: !0, 9: !0, 11: !0 };
        function u(t) {
            this.img = t;
        }
        function h(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        return (
            (o.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, r = i.exec(e.backgroundImage); null !== r; ) {
                        var n = r && r[2];
                        n && this.addBackground(n, t), (r = i.exec(e.backgroundImage));
                    }
            }),
            (o.prototype.addImage = function (t) {
                var e = new u(t);
                this.images.push(e);
            }),
            (o.prototype.addBackground = function (t, e) {
                var i = new h(t, e);
                this.images.push(i);
            }),
            (o.prototype.check = function () {
                var t = this;
                function e(e, i, r) {
                    setTimeout(function () {
                        t.progress(e, i, r);
                    });
                }
                (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? this.images.forEach(function (t) {
                              t.once("progress", e), t.check();
                          })
                        : this.complete();
            }),
            (o.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && r && r.log("progress: " + i, t, e);
            }),
            (o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (((this.isComplete = !0), this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred)) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                }
            }),
            (u.prototype = Object.create(e.prototype)),
            (u.prototype.check = function () {
                this.getIsImageComplete()
                    ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      (this.proxyImage.src = this.img.src));
            }),
            (u.prototype.getIsImageComplete = function () {
                return this.img.complete && this.img.naturalWidth;
            }),
            (u.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
            }),
            (u.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (u.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (u.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (u.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (h.prototype = Object.create(u.prototype)),
            (h.prototype.check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url), this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
            }),
            (h.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (h.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.element, e]);
            }),
            (o.makeJQueryPlugin = function (e) {
                (e = e || t.jQuery) &&
                    ((i = e).fn.imagesLoaded = function (t, e) {
                        return new o(this, t, e).jqDeferred.promise(i(this));
                    });
            }),
            o.makeJQueryPlugin(),
            o
        );
    });
    const s = i,
        o = (t, e, i) => (1 - i) * t + i * e,
        a = () => ({ width: window.innerWidth, height: window.innerHeight }),
        u = (t) => ({ x: t.clientX, y: t.clientY }),
        h = (t, e, i) => {
            t.forEach((t) => {
                const r = document.createElement(e);
                (r.classList = i), t.parentNode.appendChild(r), r.appendChild(t);
            });
        };
    function l(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function c(t, e) {
        (t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t), (t.__proto__ = e);
    }
    /*!
     * GSAP 3.6.1
     * https://greensock.com
     *
     * @license Copyright 2008-2021, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */ var d,
        f,
        p,
        _,
        m,
        g,
        v,
        y,
        w,
        x,
        b,
        O,
        M,
        T,
        D,
        k,
        A,
        C,
        S,
        E,
        L,
        P,
        I,
        R,
        z,
        F,
        q,
        B,
        H = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
        N = { duration: 0.5, overwrite: !1, delay: 0 },
        Y = 1e8,
        j = 1e-8,
        V = 2 * Math.PI,
        X = V / 4,
        U = 0,
        W = Math.sqrt,
        G = Math.cos,
        Q = Math.sin,
        $ = function (t) {
            return "string" == typeof t;
        },
        Z = function (t) {
            return "function" == typeof t;
        },
        J = function (t) {
            return "number" == typeof t;
        },
        K = function (t) {
            return void 0 === t;
        },
        tt = function (t) {
            return "object" == typeof t;
        },
        et = function (t) {
            return !1 !== t;
        },
        it = function () {
            return "undefined" != typeof window;
        },
        rt = function (t) {
            return Z(t) || $(t);
        },
        nt = ("function" == typeof ArrayBuffer && ArrayBuffer.isView) || function () {},
        st = Array.isArray,
        ot = /(?:-?\.?\d|\.)+/gi,
        at = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        ut = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        ht = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        lt = /[+-]=-?[.\d]+/,
        ct = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
        dt = /[\d.+\-=]+(?:e[-+]\d*)*/i,
        ft = {},
        pt = {},
        _t = function (t) {
            return (pt = Nt(t, ft)) && Ti;
        },
        mt = function (t, e) {
            return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
        },
        gt = function (t, e) {
            return !e && console.warn(t);
        },
        vt = function (t, e) {
            return (t && (ft[t] = e) && pt && (pt[t] = e)) || ft;
        },
        yt = function () {
            return 0;
        },
        wt = {},
        xt = [],
        bt = {},
        Ot = {},
        Mt = {},
        Tt = 30,
        Dt = [],
        kt = "",
        At = function (t) {
            var e,
                i,
                r = t[0];
            if ((tt(r) || Z(r) || (t = [t]), !(e = (r._gsap || {}).harness))) {
                for (i = Dt.length; i-- && !Dt[i].targetTest(r); );
                e = Dt[i];
            }
            for (i = t.length; i--; ) (t[i] && (t[i]._gsap || (t[i]._gsap = new $e(t[i], e)))) || t.splice(i, 1);
            return t;
        },
        Ct = function (t) {
            return t._gsap || At(_e(t))[0]._gsap;
        },
        St = function (t, e, i) {
            return (i = t[e]) && Z(i) ? t[e]() : (K(i) && t.getAttribute && t.getAttribute(e)) || i;
        },
        Et = function (t, e) {
            return (t = t.split(",")).forEach(e) || t;
        },
        Lt = function (t) {
            return Math.round(1e5 * t) / 1e5 || 0;
        },
        Pt = function (t, e) {
            for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; );
            return r < i;
        },
        It = function (t, e, i) {
            var r,
                n = J(t[1]),
                s = (n ? 2 : 1) + (e < 2 ? 0 : 1),
                o = t[s];
            if ((n && (o.duration = t[1]), (o.parent = i), e)) {
                for (r = o; i && !("immediateRender" in r); ) (r = i.vars.defaults || {}), (i = et(i.vars.inherit) && i.parent);
                (o.immediateRender = et(r.immediateRender)), e < 2 ? (o.runBackwards = 1) : (o.startAt = t[s - 1]);
            }
            return o;
        },
        Rt = function () {
            var t,
                e,
                i = xt.length,
                r = xt.slice(0);
            for (bt = {}, xt.length = 0, t = 0; t < i; t++) (e = r[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        zt = function (t, e, i, r) {
            xt.length && Rt(), t.render(e, i, r), xt.length && Rt();
        },
        Ft = function (t) {
            var e = parseFloat(t);
            return (e || 0 === e) && (t + "").match(ct).length < 2 ? e : $(t) ? t.trim() : t;
        },
        qt = function (t) {
            return t;
        },
        Bt = function (t, e) {
            for (var i in e) i in t || (t[i] = e[i]);
            return t;
        },
        Ht = function (t, e) {
            for (var i in e) i in t || "duration" === i || "ease" === i || (t[i] = e[i]);
        },
        Nt = function (t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        },
        Yt = function t(e, i) {
            for (var r in i) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (e[r] = tt(i[r]) ? t(e[r] || (e[r] = {}), i[r]) : i[r]);
            return e;
        },
        jt = function (t, e) {
            var i,
                r = {};
            for (i in t) i in e || (r[i] = t[i]);
            return r;
        },
        Vt = function (t) {
            var e = t.parent || f,
                i = t.keyframes ? Ht : Bt;
            if (et(t.inherit)) for (; e; ) i(t, e.vars.defaults), (e = e.parent || e._dp);
            return t;
        },
        Xt = function (t, e, i, r) {
            void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
            var n = e._prev,
                s = e._next;
            n ? (n._next = s) : t[i] === e && (t[i] = s), s ? (s._prev = n) : t[r] === e && (t[r] = n), (e._next = e._prev = e.parent = null);
        },
        Ut = function (t, e) {
            t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), (t._act = 0);
        },
        Wt = function (t, e) {
            if (t && (!e || e._end > t._dur || e._start < 0)) for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
            return t;
        },
        Gt = function (t) {
            for (var e = t.parent; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent);
            return t;
        },
        Qt = function t(e) {
            return !e || (e._ts && t(e.parent));
        },
        $t = function (t) {
            return t._repeat ? Zt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
        },
        Zt = function (t, e) {
            var i = Math.floor((t /= e));
            return t && i === t ? i - 1 : i;
        },
        Jt = function (t, e) {
            return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
        },
        Kt = function (t) {
            return (t._end = Lt(t._start + (t._tDur / Math.abs(t._ts || t._rts || j) || 0)));
        },
        te = function (t, e) {
            var i = t._dp;
            return i && i.smoothChildTiming && t._ts && ((t._start = Lt(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts))), Kt(t), i._dirty || Wt(i, t)), t;
        },
        ee = function (t, e) {
            var i;
            if (((e._time || (e._initted && !e._dur)) && ((i = Jt(t.rawTime(), e)), (!e._dur || ce(0, e.totalDuration(), i) - e._tTime > j) && e.render(i, !0)), Wt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)) {
                if (t._dur < t.duration()) for (i = t; i._dp; ) i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
                t._zTime = -1e-8;
            }
        },
        ie = function (t, e, i, r) {
            return (
                e.parent && Ut(e),
                (e._start = Lt(i + e._delay)),
                (e._end = Lt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))),
                (function (t, e, i, r, n) {
                    void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
                    var s,
                        o = t[r];
                    if (n) for (s = e[n]; o && o[n] > s; ) o = o._prev;
                    o ? ((e._next = o._next), (o._next = e)) : ((e._next = t[i]), (t[i] = e)), e._next ? (e._next._prev = e) : (t[r] = e), (e._prev = o), (e.parent = e._dp = t);
                })(t, e, "_first", "_last", t._sort ? "_start" : 0),
                (t._recent = e),
                r || ee(t, e),
                t
            );
        },
        re = function (t, e) {
            return (ft.ScrollTrigger || mt("scrollTrigger", e)) && ft.ScrollTrigger.create(e, t);
        },
        ne = function (t, e, i, r) {
            return ri(t, e), t._initted ? (!i && t._pt && ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) && v !== Fe.frame ? (xt.push(t), (t._lazy = [e, r]), 1) : void 0) : 1;
        },
        se = function t(e) {
            var i = e.parent;
            return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || t(i));
        },
        oe = function (t, e, i, r) {
            var n = t._repeat,
                s = Lt(e) || 0,
                o = t._tTime / t._tDur;
            return o && !r && (t._time *= s / t._dur), (t._dur = s), (t._tDur = n ? (n < 0 ? 1e10 : Lt(s * (n + 1) + t._rDelay * n)) : s), o && !r ? te(t, (t._tTime = t._tDur * o)) : t.parent && Kt(t), i || Wt(t.parent, t), t;
        },
        ae = function (t) {
            return t instanceof Je ? Wt(t) : oe(t, t._dur);
        },
        ue = { _start: 0, endTime: yt },
        he = function t(e, i) {
            var r,
                n,
                s = e.labels,
                o = e._recent || ue,
                a = e.duration() >= Y ? o.endTime(!1) : e._dur;
            return $(i) && (isNaN(i) || i in s)
                ? "<" === (r = i.charAt(0)) || ">" === r
                    ? ("<" === r ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(i.substr(1)) || 0)
                    : (r = i.indexOf("=")) < 0
                    ? (i in s || (s[i] = a), s[i])
                    : ((n = +(i.charAt(r - 1) + i.substr(r + 1))), r > 1 ? t(e, i.substr(0, r - 1)) + n : a + n)
                : null == i
                ? a
                : +i;
        },
        le = function (t, e) {
            return t || 0 === t ? e(t) : e;
        },
        ce = function (t, e, i) {
            return i < t ? t : i > e ? e : i;
        },
        de = function (t) {
            if ("string" != typeof t) return "";
            var e = dt.exec(t);
            return e ? t.substr(e.index + e[0].length) : "";
        },
        fe = [].slice,
        pe = function (t, e) {
            return t && tt(t) && "length" in t && ((!e && !t.length) || (t.length - 1 in t && tt(t[0]))) && !t.nodeType && t !== p;
        },
        _e = function (t, e) {
            return !$(t) || e || (!_ && qe())
                ? st(t)
                    ? (function (t, e, i) {
                          return (
                              void 0 === i && (i = []),
                              t.forEach(function (t) {
                                  var r;
                                  return ($(t) && !e) || pe(t, 1) ? (r = i).push.apply(r, _e(t)) : i.push(t);
                              }) || i
                          );
                      })(t, e)
                    : pe(t)
                    ? fe.call(t, 0)
                    : t
                    ? [t]
                    : []
                : fe.call(m.querySelectorAll(t), 0);
        },
        me = function (t) {
            return t.sort(function () {
                return 0.5 - Math.random();
            });
        },
        ge = function (t) {
            if (Z(t)) return t;
            var e = tt(t) ? t : { each: t },
                i = Xe(e.ease),
                r = e.from || 0,
                n = parseFloat(e.base) || 0,
                s = {},
                o = r > 0 && r < 1,
                a = isNaN(r) || o,
                u = e.axis,
                h = r,
                l = r;
            return (
                $(r) ? (h = l = { center: 0.5, edges: 0.5, end: 1 }[r] || 0) : !o && a && ((h = r[0]), (l = r[1])),
                function (t, o, c) {
                    var d,
                        f,
                        p,
                        _,
                        m,
                        g,
                        v,
                        y,
                        w,
                        x = (c || e).length,
                        b = s[x];
                    if (!b) {
                        if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, Y])[1])) {
                            for (v = -1e8; v < (v = c[w++].getBoundingClientRect().left) && w < x; );
                            w--;
                        }
                        for (b = s[x] = [], d = a ? Math.min(w, x) * h - 0.5 : r % w, f = a ? (x * l) / w - 0.5 : (r / w) | 0, v = 0, y = Y, g = 0; g < x; g++)
                            (p = (g % w) - d), (_ = f - ((g / w) | 0)), (b[g] = m = u ? Math.abs("y" === u ? _ : p) : W(p * p + _ * _)), m > v && (v = m), m < y && (y = m);
                        "random" === r && me(b),
                            (b.max = v - y),
                            (b.min = y),
                            (b.v = x = (parseFloat(e.amount) || parseFloat(e.each) * (w > x ? x - 1 : u ? ("y" === u ? x / w : w) : Math.max(w, x / w)) || 0) * ("edges" === r ? -1 : 1)),
                            (b.b = x < 0 ? n - x : n),
                            (b.u = de(e.amount || e.each) || 0),
                            (i = i && x < 0 ? je(i) : i);
                    }
                    return (x = (b[t] - b.min) / b.max || 0), Lt(b.b + (i ? i(x) : x) * b.v) + b.u;
                }
            );
        },
        ve = function (t) {
            var e = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
            return function (i) {
                var r = Math.round(parseFloat(i) / t) * t * e;
                return (r - (r % 1)) / e + (J(i) ? 0 : de(i));
            };
        },
        ye = function (t, e) {
            var i,
                r,
                n = st(t);
            return (
                !n && tt(t) && ((i = n = t.radius || Y), t.values ? ((t = _e(t.values)), (r = !J(t[0])) && (i *= i)) : (t = ve(t.increment))),
                le(
                    e,
                    n
                        ? Z(t)
                            ? function (e) {
                                  return (r = t(e)), Math.abs(r - e) <= i ? r : e;
                              }
                            : function (e) {
                                  for (var n, s, o = parseFloat(r ? e.x : e), a = parseFloat(r ? e.y : 0), u = Y, h = 0, l = t.length; l--; )
                                      (n = r ? (n = t[l].x - o) * n + (s = t[l].y - a) * s : Math.abs(t[l] - o)) < u && ((u = n), (h = l));
                                  return (h = !i || u <= i ? t[h] : e), r || h === e || J(e) ? h : h + de(e);
                              }
                        : ve(t)
                )
            );
        },
        we = function (t, e, i, r) {
            return le(st(t) ? !e : !0 === i ? !!(i = 0) : !r, function () {
                return st(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i) * i * r) / r;
            });
        },
        xe = function (t, e, i) {
            return le(i, function (i) {
                return t[~~e(i)];
            });
        },
        be = function (t) {
            for (var e, i, r, n, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
                (r = t.indexOf(")", e)), (n = "[" === t.charAt(e + 7)), (i = t.substr(e + 7, r - e - 7).match(n ? ct : ot)), (o += t.substr(s, e - s) + we(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5)), (s = r + 1);
            return o + t.substr(s, t.length - s);
        },
        Oe = function (t, e, i, r, n) {
            var s = e - t,
                o = r - i;
            return le(n, function (e) {
                return i + (((e - t) / s) * o || 0);
            });
        },
        Me = function (t, e, i) {
            var r,
                n,
                s,
                o = t.labels,
                a = Y;
            for (r in o) (n = o[r] - e) < 0 == !!i && n && a > (n = Math.abs(n)) && ((s = r), (a = n));
            return s;
        },
        Te = function (t, e, i) {
            var r,
                n,
                s = t.vars,
                o = s[e];
            if (o) return (r = s[e + "Params"]), (n = s.callbackScope || t), i && xt.length && Rt(), r ? o.apply(n, r) : o.call(n);
        },
        De = function (t) {
            return Ut(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && Te(t, "onInterrupt"), t;
        },
        ke = function (t) {
            var e = (t = (!t.name && t.default) || t).name,
                i = Z(t),
                r =
                    e && !i && t.init
                        ? function () {
                              this._props = [];
                          }
                        : t,
                n = { init: yt, render: mi, add: ei, kill: vi, modifier: gi, rawVars: 0 },
                s = { targetTest: 0, get: 0, getSetter: di, aliases: {}, register: 0 };
            if ((qe(), t !== r)) {
                if (Ot[e]) return;
                Bt(r, Bt(jt(t, n), s)), Nt(r.prototype, Nt(n, jt(t, s))), (Ot[(r.prop = e)] = r), t.targetTest && (Dt.push(r), (wt[e] = 1)), (e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
            }
            vt(e, r), t.register && t.register(Ti, r, xi);
        },
        Ae = 255,
        Ce = {
            aqua: [0, Ae, Ae],
            lime: [0, Ae, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Ae],
            navy: [0, 0, 128],
            white: [Ae, Ae, Ae],
            olive: [128, 128, 0],
            yellow: [Ae, Ae, 0],
            orange: [Ae, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Ae, 0, 0],
            pink: [Ae, 192, 203],
            cyan: [0, Ae, Ae],
            transparent: [Ae, Ae, Ae, 0],
        },
        Se = function (t, e, i) {
            return ((6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * Ae + 0.5) | 0;
        },
        Ee = function (t, e, i) {
            var r,
                n,
                s,
                o,
                a,
                u,
                h,
                l,
                c,
                d,
                f = t ? (J(t) ? [t >> 16, (t >> 8) & Ae, t & Ae] : 0) : Ce.black;
            if (!f) {
                if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ce[t])) f = Ce[t];
                else if ("#" === t.charAt(0)) {
                    if ((t.length < 6 && ((r = t.charAt(1)), (n = t.charAt(2)), (s = t.charAt(3)), (t = "#" + r + r + n + n + s + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))), 9 === t.length))
                        return [(f = parseInt(t.substr(1, 6), 16)) >> 16, (f >> 8) & Ae, f & Ae, parseInt(t.substr(7), 16) / 255];
                    f = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & Ae, t & Ae];
                } else if ("hsl" === t.substr(0, 3))
                    if (((f = d = t.match(ot)), e)) {
                        if (~t.indexOf("=")) return (f = t.match(at)), i && f.length < 4 && (f[3] = 1), f;
                    } else
                        (o = (+f[0] % 360) / 360),
                            (a = +f[1] / 100),
                            (r = 2 * (u = +f[2] / 100) - (n = u <= 0.5 ? u * (a + 1) : u + a - u * a)),
                            f.length > 3 && (f[3] *= 1),
                            (f[0] = Se(o + 1 / 3, r, n)),
                            (f[1] = Se(o, r, n)),
                            (f[2] = Se(o - 1 / 3, r, n));
                else f = t.match(ot) || Ce.transparent;
                f = f.map(Number);
            }
            return (
                e &&
                    !d &&
                    ((r = f[0] / Ae),
                    (n = f[1] / Ae),
                    (s = f[2] / Ae),
                    (u = ((h = Math.max(r, n, s)) + (l = Math.min(r, n, s))) / 2),
                    h === l ? (o = a = 0) : ((c = h - l), (a = u > 0.5 ? c / (2 - h - l) : c / (h + l)), (o = h === r ? (n - s) / c + (n < s ? 6 : 0) : h === n ? (s - r) / c + 2 : (r - n) / c + 4), (o *= 60)),
                    (f[0] = ~~(o + 0.5)),
                    (f[1] = ~~(100 * a + 0.5)),
                    (f[2] = ~~(100 * u + 0.5))),
                i && f.length < 4 && (f[3] = 1),
                f
            );
        },
        Le = function (t) {
            var e = [],
                i = [],
                r = -1;
            return (
                t.split(Ie).forEach(function (t) {
                    var n = t.match(ut) || [];
                    e.push.apply(e, n), i.push((r += n.length + 1));
                }),
                (e.c = i),
                e
            );
        },
        Pe = function (t, e, i) {
            var r,
                n,
                s,
                o,
                a = "",
                u = (t + a).match(Ie),
                h = e ? "hsla(" : "rgba(",
                l = 0;
            if (!u) return t;
            if (
                ((u = u.map(function (t) {
                    return (t = Ee(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
                })),
                i && ((s = Le(t)), (r = i.c).join(a) !== s.c.join(a)))
            )
                for (o = (n = t.replace(Ie, "1").split(ut)).length - 1; l < o; l++) a += n[l] + (~r.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (s.length ? s : u.length ? u : i).shift());
            if (!n) for (o = (n = t.split(Ie)).length - 1; l < o; l++) a += n[l] + u[l];
            return a + n[o];
        },
        Ie = (function () {
            var t,
                e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in Ce) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi");
        })(),
        Re = /hsl[a]?\(/,
        ze = function (t) {
            var e,
                i = t.join(" ");
            if (((Ie.lastIndex = 0), Ie.test(i))) return (e = Re.test(i)), (t[1] = Pe(t[1], e)), (t[0] = Pe(t[0], e, Le(t[1]))), !0;
        },
        Fe =
            ((k = Date.now),
            (A = 500),
            (C = 33),
            (S = k()),
            (E = S),
            (P = L = 1e3 / 240),
            (R = function t(e) {
                var i,
                    r,
                    n,
                    s,
                    o = k() - E,
                    a = !0 === e;
                if ((o > A && (S += o - C), ((i = (n = (E += o) - S) - P) > 0 || a) && ((s = ++M.frame), (T = n - 1e3 * M.time), (M.time = n /= 1e3), (P += i + (i >= L ? 4 : L - i)), (r = 1)), a || (x = b(t)), r))
                    for (D = 0; D < I.length; D++) I[D](n, T, s, e);
            }),
            (M = {
                time: 0,
                frame: 0,
                tick: function () {
                    R(!0);
                },
                deltaRatio: function (t) {
                    return T / (1e3 / (t || 60));
                },
                wake: function () {
                    g &&
                        (!_ &&
                            it() &&
                            ((p = _ = window), (m = p.document || {}), (ft.gsap = Ti), (p.gsapVersions || (p.gsapVersions = [])).push(Ti.version), _t(pt || p.GreenSockGlobals || (!p.gsap && p) || {}), (O = p.requestAnimationFrame)),
                        x && M.sleep(),
                        (b =
                            O ||
                            function (t) {
                                return setTimeout(t, (P - 1e3 * M.time + 1) | 0);
                            }),
                        (w = 1),
                        R(2));
                },
                sleep: function () {
                    (O ? p.cancelAnimationFrame : clearTimeout)(x), (w = 0), (b = yt);
                },
                lagSmoothing: function (t, e) {
                    (A = t || 1e8), (C = Math.min(e, A, 0));
                },
                fps: function (t) {
                    (L = 1e3 / (t || 240)), (P = 1e3 * M.time + L);
                },
                add: function (t) {
                    I.indexOf(t) < 0 && I.push(t), qe();
                },
                remove: function (t) {
                    var e;
                    ~(e = I.indexOf(t)) && I.splice(e, 1) && D >= e && D--;
                },
                _listeners: (I = []),
            })),
        qe = function () {
            return !w && Fe.wake();
        },
        Be = {},
        He = /^[\d.\-M][\d.\-,\s]/,
        Ne = /["']/g,
        Ye = function (t) {
            for (var e, i, r, n = {}, s = t.substr(1, t.length - 3).split(":"), o = s[0], a = 1, u = s.length; a < u; a++)
                (i = s[a]), (e = a !== u - 1 ? i.lastIndexOf(",") : i.length), (r = i.substr(0, e)), (n[o] = isNaN(r) ? r.replace(Ne, "").trim() : +r), (o = i.substr(e + 1).trim());
            return n;
        },
        je = function (t) {
            return function (e) {
                return 1 - t(1 - e);
            };
        },
        Ve = function t(e, i) {
            for (var r, n = e._first; n; )
                n instanceof Je ? t(n, i) : !n.vars.yoyoEase || (n._yoyo && n._repeat) || n._yoyo === i || (n.timeline ? t(n.timeline, i) : ((r = n._ease), (n._ease = n._yEase), (n._yEase = r), (n._yoyo = i))), (n = n._next);
        },
        Xe = function (t, e) {
            return (
                (t &&
                    (Z(t)
                        ? t
                        : Be[t] ||
                          (function (t) {
                              var e,
                                  i,
                                  r,
                                  n,
                                  s = (t + "").split("("),
                                  o = Be[s[0]];
                              return o && s.length > 1 && o.config
                                  ? o.config.apply(
                                        null,
                                        ~t.indexOf("{") ? [Ye(s[1])] : ((e = t), (i = e.indexOf("(") + 1), (r = e.indexOf(")")), (n = e.indexOf("(", i)), e.substring(i, ~n && n < r ? e.indexOf(")", r + 1) : r)).split(",").map(Ft)
                                    )
                                  : Be._CE && He.test(t)
                                  ? Be._CE("", t)
                                  : o;
                          })(t))) ||
                e
            );
        },
        Ue = function (t, e, i, r) {
            void 0 === i &&
                (i = function (t) {
                    return 1 - e(1 - t);
                }),
                void 0 === r &&
                    (r = function (t) {
                        return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
                    });
            var n,
                s = { easeIn: e, easeOut: i, easeInOut: r };
            return (
                Et(t, function (t) {
                    for (var e in ((Be[t] = ft[t] = s), (Be[(n = t.toLowerCase())] = i), s)) Be[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Be[t + "." + e] = s[e];
                }),
                s
            );
        },
        We = function (t) {
            return function (e) {
                return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
            };
        },
        Ge = function t(e, i, r) {
            var n = i >= 1 ? i : 1,
                s = (r || (e ? 0.3 : 0.45)) / (i < 1 ? i : 1),
                o = (s / V) * (Math.asin(1 / n) || 0),
                a = function (t) {
                    return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Q((t - o) * s) + 1;
                },
                u =
                    "out" === e
                        ? a
                        : "in" === e
                        ? function (t) {
                              return 1 - a(1 - t);
                          }
                        : We(a);
            return (
                (s = V / s),
                (u.config = function (i, r) {
                    return t(e, i, r);
                }),
                u
            );
        },
        Qe = function t(e, i) {
            void 0 === i && (i = 1.70158);
            var r = function (t) {
                    return t ? --t * t * ((i + 1) * t + i) + 1 : 0;
                },
                n =
                    "out" === e
                        ? r
                        : "in" === e
                        ? function (t) {
                              return 1 - r(1 - t);
                          }
                        : We(r);
            return (
                (n.config = function (i) {
                    return t(e, i);
                }),
                n
            );
        };
    Et("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var i = e < 5 ? e + 1 : e;
        Ue(
            t + ",Power" + (i - 1),
            e
                ? function (t) {
                      return Math.pow(t, i);
                  }
                : function (t) {
                      return t;
                  },
            function (t) {
                return 1 - Math.pow(1 - t, i);
            },
            function (t) {
                return t < 0.5 ? Math.pow(2 * t, i) / 2 : 1 - Math.pow(2 * (1 - t), i) / 2;
            }
        );
    }),
        (Be.Linear.easeNone = Be.none = Be.Linear.easeIn),
        Ue("Elastic", Ge("in"), Ge("out"), Ge()),
        (z = 7.5625),
        (q = 1 / (F = 2.75)),
        Ue(
            "Bounce",
            function (t) {
                return 1 - B(1 - t);
            },
            (B = function (t) {
                return t < q ? z * t * t : t < 0.7272727272727273 ? z * Math.pow(t - 1.5 / F, 2) + 0.75 : t < 0.9090909090909092 ? z * (t -= 2.25 / F) * t + 0.9375 : z * Math.pow(t - 2.625 / F, 2) + 0.984375;
            })
        ),
        Ue("Expo", function (t) {
            return t ? Math.pow(2, 10 * (t - 1)) : 0;
        }),
        Ue("Circ", function (t) {
            return -(W(1 - t * t) - 1);
        }),
        Ue("Sine", function (t) {
            return 1 === t ? 1 : 1 - G(t * X);
        }),
        Ue("Back", Qe("in"), Qe("out"), Qe()),
        (Be.SteppedEase = Be.steps = ft.SteppedEase = {
            config: function (t, e) {
                void 0 === t && (t = 1);
                var i = 1 / t,
                    r = t + (e ? 0 : 1),
                    n = e ? 1 : 0;
                return function (t) {
                    return (((r * ce(0, 0.99999999, t)) | 0) + n) * i;
                };
            },
        }),
        (N.ease = Be["quad.out"]),
        Et("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
            return (kt += t + "," + t + "Params,");
        });
    var $e = function (t, e) {
            (this.id = U++), (t._gsap = this), (this.target = t), (this.harness = e), (this.get = e ? e.get : St), (this.set = e ? e.getSetter : di);
        },
        Ze = (function () {
            function t(t, e) {
                var i = t.parent || f;
                (this.vars = t),
                    (this._delay = +t.delay || 0),
                    (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && ((this._rDelay = t.repeatDelay || 0), (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                    (this._ts = 1),
                    oe(this, +t.duration, 1, 1),
                    (this.data = t.data),
                    w || Fe.wake(),
                    i && ie(i, this, e || 0 === e ? e : i._time, 1),
                    t.reversed && this.reverse(),
                    t.paused && this.paused(!0);
            }
            var e = t.prototype;
            return (
                (e.delay = function (t) {
                    return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), (this._delay = t), this) : this._delay;
                }),
                (e.duration = function (t) {
                    return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
                }),
                (e.totalDuration = function (t) {
                    return arguments.length ? ((this._dirty = 0), oe(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
                }),
                (e.totalTime = function (t, e) {
                    if ((qe(), !arguments.length)) return this._tTime;
                    var i = this._dp;
                    if (i && i.smoothChildTiming && this._ts) {
                        for (te(this, t), !i._dp || i.parent || ee(i, this); i.parent; ) i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), (i = i.parent);
                        !this.parent && this._dp.autoRemoveChildren && ((this._ts > 0 && t < this._tDur) || (this._ts < 0 && t > 0) || (!this._tDur && !t)) && ie(this._dp, this, this._start - this._delay);
                    }
                    return (this._tTime !== t || (!this._dur && !e) || (this._initted && Math.abs(this._zTime) === j) || (!t && !this._initted && (this.add || this._ptLookup))) && (this._ts || (this._pTime = t), zt(this, t, e)), this;
                }),
                (e.time = function (t, e) {
                    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + $t(this)) % this._dur || (t ? this._dur : 0), e) : this._time;
                }),
                (e.totalProgress = function (t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
                }),
                (e.progress = function (t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + $t(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
                }),
                (e.iteration = function (t, e) {
                    var i = this.duration() + this._rDelay;
                    return arguments.length ? this.totalTime(this._time + (t - 1) * i, e) : this._repeat ? Zt(this._tTime, i) + 1 : 1;
                }),
                (e.timeScale = function (t) {
                    if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                    if (this._rts === t) return this;
                    var e = this.parent && this._ts ? Jt(this.parent._time, this) : this._tTime;
                    return (this._rts = +t || 0), (this._ts = this._ps || -1e-8 === t ? 0 : this._rts), Gt(this.totalTime(ce(-this._delay, this._tDur, e), !0));
                }),
                (e.paused = function (t) {
                    return arguments.length
                        ? (this._ps !== t &&
                              ((this._ps = t),
                              t
                                  ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())), (this._ts = this._act = 0))
                                  : (qe(),
                                    (this._ts = this._rts),
                                    this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= j) && Math.abs(this._zTime) !== j))),
                          this)
                        : this._ps;
                }),
                (e.startTime = function (t) {
                    if (arguments.length) {
                        this._start = t;
                        var e = this.parent || this._dp;
                        return e && (e._sort || !this.parent) && ie(e, this, t - this._delay), this;
                    }
                    return this._start;
                }),
                (e.endTime = function (t) {
                    return this._start + (et(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
                }),
                (e.rawTime = function (t) {
                    var e = this.parent || this._dp;
                    return e ? (t && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1)) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Jt(e.rawTime(t), this) : this._tTime) : this._tTime;
                }),
                (e.globalTime = function (t) {
                    for (var e = this, i = arguments.length ? t : e.rawTime(); e; ) (i = e._start + i / (e._ts || 1)), (e = e._dp);
                    return i;
                }),
                (e.repeat = function (t) {
                    return arguments.length ? ((this._repeat = t === 1 / 0 ? -2 : t), ae(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
                }),
                (e.repeatDelay = function (t) {
                    return arguments.length ? ((this._rDelay = t), ae(this)) : this._rDelay;
                }),
                (e.yoyo = function (t) {
                    return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                }),
                (e.seek = function (t, e) {
                    return this.totalTime(he(this, t), et(e));
                }),
                (e.restart = function (t, e) {
                    return this.play().totalTime(t ? -this._delay : 0, et(e));
                }),
                (e.play = function (t, e) {
                    return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
                }),
                (e.reverse = function (t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
                }),
                (e.pause = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!0);
                }),
                (e.resume = function () {
                    return this.paused(!1);
                }),
                (e.reversed = function (t) {
                    return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0;
                }),
                (e.invalidate = function () {
                    return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
                }),
                (e.isActive = function () {
                    var t,
                        e = this.parent || this._dp,
                        i = this._start;
                    return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= i && t < this.endTime(!0) - j));
                }),
                (e.eventCallback = function (t, e, i) {
                    var r = this.vars;
                    return arguments.length > 1 ? (e ? ((r[t] = e), i && (r[t + "Params"] = i), "onUpdate" === t && (this._onUpdate = e)) : delete r[t], this) : r[t];
                }),
                (e.then = function (t) {
                    var e = this;
                    return new Promise(function (i) {
                        var r = Z(t) ? t : qt,
                            n = function () {
                                var t = e.then;
                                (e.then = null), Z(r) && (r = r(e)) && (r.then || r === e) && (e.then = t), i(r), (e.then = t);
                            };
                        (e._initted && 1 === e.totalProgress() && e._ts >= 0) || (!e._tTime && e._ts < 0) ? n() : (e._prom = n);
                    });
                }),
                (e.kill = function () {
                    De(this);
                }),
                t
            );
        })();
    Bt(Ze.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -1e-8, _prom: 0, _ps: !1, _rts: 1 });
    var Je = (function (t) {
        function e(e, i) {
            var r;
            return (
                void 0 === e && (e = {}),
                ((r = t.call(this, e, i) || this).labels = {}),
                (r.smoothChildTiming = !!e.smoothChildTiming),
                (r.autoRemoveChildren = !!e.autoRemoveChildren),
                (r._sort = et(e.sortChildren)),
                r.parent && ee(r.parent, l(r)),
                e.scrollTrigger && re(l(r), e.scrollTrigger),
                r
            );
        }
        c(e, t);
        var i = e.prototype;
        return (
            (i.to = function (t, e, i) {
                return new ai(t, It(arguments, 0, this), he(this, J(e) ? arguments[3] : i)), this;
            }),
            (i.from = function (t, e, i) {
                return new ai(t, It(arguments, 1, this), he(this, J(e) ? arguments[3] : i)), this;
            }),
            (i.fromTo = function (t, e, i, r) {
                return new ai(t, It(arguments, 2, this), he(this, J(e) ? arguments[4] : r)), this;
            }),
            (i.set = function (t, e, i) {
                return (e.duration = 0), (e.parent = this), Vt(e).repeatDelay || (e.repeat = 0), (e.immediateRender = !!e.immediateRender), new ai(t, e, he(this, i), 1), this;
            }),
            (i.call = function (t, e, i) {
                return ie(this, ai.delayedCall(0, t, e), he(this, i));
            }),
            (i.staggerTo = function (t, e, i, r, n, s, o) {
                return (i.duration = e), (i.stagger = i.stagger || r), (i.onComplete = s), (i.onCompleteParams = o), (i.parent = this), new ai(t, i, he(this, n)), this;
            }),
            (i.staggerFrom = function (t, e, i, r, n, s, o) {
                return (i.runBackwards = 1), (Vt(i).immediateRender = et(i.immediateRender)), this.staggerTo(t, e, i, r, n, s, o);
            }),
            (i.staggerFromTo = function (t, e, i, r, n, s, o, a) {
                return (r.startAt = i), (Vt(r).immediateRender = et(r.immediateRender)), this.staggerTo(t, e, r, n, s, o, a);
            }),
            (i.render = function (t, e, i) {
                var r,
                    n,
                    s,
                    o,
                    a,
                    u,
                    h,
                    l,
                    c,
                    d,
                    p,
                    _,
                    m = this._time,
                    g = this._dirty ? this.totalDuration() : this._tDur,
                    v = this._dur,
                    y = this !== f && t > g - j && t >= 0 ? g : t < j ? 0 : t,
                    w = this._zTime < 0 != t < 0 && (this._initted || !v);
                if (y !== this._tTime || i || w) {
                    if ((m !== this._time && v && ((y += this._time - m), (t += this._time - m)), (r = y), (c = this._start), (u = !(l = this._ts)), w && (v || (m = this._zTime), (t || !e) && (this._zTime = t)), this._repeat)) {
                        if (((p = this._yoyo), (a = v + this._rDelay), this._repeat < -1 && t < 0)) return this.totalTime(100 * a + t, e, i);
                        if (
                            ((r = Lt(y % a)),
                            y === g ? ((o = this._repeat), (r = v)) : ((o = ~~(y / a)) && o === y / a && ((r = v), o--), r > v && (r = v)),
                            (d = Zt(this._tTime, a)),
                            !m && this._tTime && d !== o && (d = o),
                            p && 1 & o && ((r = v - r), (_ = 1)),
                            o !== d && !this._lock)
                        ) {
                            var x = p && 1 & d,
                                b = x === (p && 1 & o);
                            if (
                                (o < d && (x = !x),
                                (m = x ? 0 : v),
                                (this._lock = 1),
                                (this.render(m || (_ ? 0 : Lt(o * a)), e, !v)._lock = 0),
                                !e && this.parent && Te(this, "onRepeat"),
                                this.vars.repeatRefresh && !_ && (this.invalidate()._lock = 1),
                                (m && m !== this._time) || u !== !this._ts || (this.vars.onRepeat && !this.parent && !this._act))
                            )
                                return this;
                            if (((v = this._dur), (g = this._tDur), b && ((this._lock = 2), (m = x ? v : -1e-4), this.render(m, !0)), (this._lock = 0), !this._ts && !u)) return this;
                            Ve(this, _);
                        }
                    }
                    if (
                        (this._hasPause &&
                            !this._forcing &&
                            this._lock < 2 &&
                            (h = (function (t, e, i) {
                                var r;
                                if (i > e)
                                    for (r = t._first; r && r._start <= i; ) {
                                        if (!r._dur && "isPause" === r.data && r._start > e) return r;
                                        r = r._next;
                                    }
                                else
                                    for (r = t._last; r && r._start >= i; ) {
                                        if (!r._dur && "isPause" === r.data && r._start < e) return r;
                                        r = r._prev;
                                    }
                            })(this, Lt(m), Lt(r))) &&
                            (y -= r - (r = h._start)),
                        (this._tTime = y),
                        (this._time = r),
                        (this._act = !l),
                        this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = t), (m = 0)),
                        !m && r && !e && Te(this, "onStart"),
                        r >= m && t >= 0)
                    )
                        for (n = this._first; n; ) {
                            if (((s = n._next), (n._act || r >= n._start) && n._ts && h !== n)) {
                                if (n.parent !== this) return this.render(t, e, i);
                                if ((n.render(n._ts > 0 ? (r - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (r - n._start) * n._ts, e, i), r !== this._time || (!this._ts && !u))) {
                                    (h = 0), s && (y += this._zTime = -1e-8);
                                    break;
                                }
                            }
                            n = s;
                        }
                    else {
                        n = this._last;
                        for (var O = t < 0 ? t : r; n; ) {
                            if (((s = n._prev), (n._act || O <= n._end) && n._ts && h !== n)) {
                                if (n.parent !== this) return this.render(t, e, i);
                                if ((n.render(n._ts > 0 ? (O - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (O - n._start) * n._ts, e, i), r !== this._time || (!this._ts && !u))) {
                                    (h = 0), s && (y += this._zTime = O ? -1e-8 : j);
                                    break;
                                }
                            }
                            n = s;
                        }
                    }
                    if (h && !e && (this.pause(), (h.render(r >= m ? 0 : -1e-8)._zTime = r >= m ? 1 : -1), this._ts)) return (this._start = c), Kt(this), this.render(t, e, i);
                    this._onUpdate && !e && Te(this, "onUpdate", !0),
                        ((y === g && g >= this.totalDuration()) || (!y && m)) &&
                            ((c !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
                                this._lock ||
                                ((t || !v) && ((y === g && this._ts > 0) || (!y && this._ts < 0)) && Ut(this, 1),
                                e || (t < 0 && !m) || (!y && !m) || (Te(this, y === g ? "onComplete" : "onReverseComplete", !0), this._prom && !(y < g && this.timeScale() > 0) && this._prom())));
                }
                return this;
            }),
            (i.add = function (t, e) {
                var i = this;
                if ((J(e) || (e = he(this, e)), !(t instanceof Ze))) {
                    if (st(t))
                        return (
                            t.forEach(function (t) {
                                return i.add(t, e);
                            }),
                            this
                        );
                    if ($(t)) return this.addLabel(t, e);
                    if (!Z(t)) return this;
                    t = ai.delayedCall(0, t);
                }
                return this !== t ? ie(this, t, e) : this;
            }),
            (i.getChildren = function (t, e, i, r) {
                void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === i && (i = !0), void 0 === r && (r = -1e8);
                for (var n = [], s = this._first; s; ) s._start >= r && (s instanceof ai ? e && n.push(s) : (i && n.push(s), t && n.push.apply(n, s.getChildren(!0, e, i)))), (s = s._next);
                return n;
            }),
            (i.getById = function (t) {
                for (var e = this.getChildren(1, 1, 1), i = e.length; i--; ) if (e[i].vars.id === t) return e[i];
            }),
            (i.remove = function (t) {
                return $(t) ? this.removeLabel(t) : Z(t) ? this.killTweensOf(t) : (Xt(this, t), t === this._recent && (this._recent = this._last), Wt(this));
            }),
            (i.totalTime = function (e, i) {
                return arguments.length
                    ? ((this._forcing = 1), !this._dp && this._ts && (this._start = Lt(Fe.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), t.prototype.totalTime.call(this, e, i), (this._forcing = 0), this)
                    : this._tTime;
            }),
            (i.addLabel = function (t, e) {
                return (this.labels[t] = he(this, e)), this;
            }),
            (i.removeLabel = function (t) {
                return delete this.labels[t], this;
            }),
            (i.addPause = function (t, e, i) {
                var r = ai.delayedCall(0, e || yt, i);
                return (r.data = "isPause"), (this._hasPause = 1), ie(this, r, he(this, t));
            }),
            (i.removePause = function (t) {
                var e = this._first;
                for (t = he(this, t); e; ) e._start === t && "isPause" === e.data && Ut(e), (e = e._next);
            }),
            (i.killTweensOf = function (t, e, i) {
                for (var r = this.getTweensOf(t, i), n = r.length; n--; ) Ke !== r[n] && r[n].kill(t, e);
                return this;
            }),
            (i.getTweensOf = function (t, e) {
                for (var i, r = [], n = _e(t), s = this._first, o = J(e); s; )
                    s instanceof ai
                        ? Pt(s._targets, n) && (o ? (!Ke || (s._initted && s._ts)) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && r.push(s)
                        : (i = s.getTweensOf(n, e)).length && r.push.apply(r, i),
                        (s = s._next);
                return r;
            }),
            (i.tweenTo = function (t, e) {
                e = e || {};
                var i = this,
                    r = he(i, t),
                    n = e,
                    s = n.startAt,
                    o = n.onStart,
                    a = n.onStartParams,
                    u = n.immediateRender,
                    h = ai.to(
                        i,
                        Bt(
                            {
                                ease: e.ease || "none",
                                lazy: !1,
                                immediateRender: !1,
                                time: r,
                                overwrite: "auto",
                                duration: e.duration || Math.abs((r - (s && "time" in s ? s.time : i._time)) / i.timeScale()) || j,
                                onStart: function () {
                                    i.pause();
                                    var t = e.duration || Math.abs((r - i._time) / i.timeScale());
                                    h._dur !== t && oe(h, t, 0, 1).render(h._time, !0, !0), o && o.apply(h, a || []);
                                },
                            },
                            e
                        )
                    );
                return u ? h.render(0) : h;
            }),
            (i.tweenFromTo = function (t, e, i) {
                return this.tweenTo(e, Bt({ startAt: { time: he(this, t) } }, i));
            }),
            (i.recent = function () {
                return this._recent;
            }),
            (i.nextLabel = function (t) {
                return void 0 === t && (t = this._time), Me(this, he(this, t));
            }),
            (i.previousLabel = function (t) {
                return void 0 === t && (t = this._time), Me(this, he(this, t), 1);
            }),
            (i.currentLabel = function (t) {
                return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + j);
            }),
            (i.shiftChildren = function (t, e, i) {
                void 0 === i && (i = 0);
                for (var r, n = this._first, s = this.labels; n; ) n._start >= i && ((n._start += t), (n._end += t)), (n = n._next);
                if (e) for (r in s) s[r] >= i && (s[r] += t);
                return Wt(this);
            }),
            (i.invalidate = function () {
                var e = this._first;
                for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
                return t.prototype.invalidate.call(this);
            }),
            (i.clear = function (t) {
                void 0 === t && (t = !0);
                for (var e, i = this._first; i; ) (e = i._next), this.remove(i), (i = e);
                return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), Wt(this);
            }),
            (i.totalDuration = function (t) {
                var e,
                    i,
                    r,
                    n = 0,
                    s = this,
                    o = s._last,
                    a = Y;
                if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
                if (s._dirty) {
                    for (r = s.parent; o; )
                        (e = o._prev),
                            o._dirty && o.totalDuration(),
                            (i = o._start) > a && s._sort && o._ts && !s._lock ? ((s._lock = 1), (ie(s, o, i - o._delay, 1)._lock = 0)) : (a = i),
                            i < 0 && o._ts && ((n -= i), ((!r && !s._dp) || (r && r.smoothChildTiming)) && ((s._start += i / s._ts), (s._time -= i), (s._tTime -= i)), s.shiftChildren(-i, !1, -Infinity), (a = 0)),
                            o._end > n && o._ts && (n = o._end),
                            (o = e);
                    oe(s, s === f && s._time > n ? s._time : n, 1, 1), (s._dirty = 0);
                }
                return s._tDur;
            }),
            (e.updateRoot = function (t) {
                if ((f._ts && (zt(f, Jt(t, f)), (v = Fe.frame)), Fe.frame >= Tt)) {
                    Tt += H.autoSleep || 120;
                    var e = f._first;
                    if ((!e || !e._ts) && H.autoSleep && Fe._listeners.length < 2) {
                        for (; e && !e._ts; ) e = e._next;
                        e || Fe.sleep();
                    }
                }
            }),
            e
        );
    })(Ze);
    Bt(Je.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
    var Ke,
        ti = function (t, e, i, r, n, s, o) {
            var a,
                u,
                h,
                l,
                c,
                d,
                f,
                p,
                _ = new xi(this._pt, t, e, 0, 1, _i, null, n),
                m = 0,
                g = 0;
            for (_.b = i, _.e = r, i += "", (f = ~(r += "").indexOf("random(")) && (r = be(r)), s && (s((p = [i, r]), t, e), (i = p[0]), (r = p[1])), u = i.match(ht) || []; (a = ht.exec(r)); )
                (l = a[0]),
                    (c = r.substring(m, a.index)),
                    h ? (h = (h + 1) % 5) : "rgba(" === c.substr(-5) && (h = 1),
                    l !== u[g++] &&
                        ((d = parseFloat(u[g - 1]) || 0),
                        (_._pt = { _next: _._pt, p: c || 1 === g ? c : ",", s: d, c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - d, m: h && h < 4 ? Math.round : 0 }),
                        (m = ht.lastIndex));
            return (_.c = m < r.length ? r.substring(m, r.length) : ""), (_.fp = o), (lt.test(r) || f) && (_.e = 0), (this._pt = _), _;
        },
        ei = function (t, e, i, r, n, s, o, a, u) {
            Z(r) && (r = r(n || 0, t, s));
            var h,
                l = t[e],
                c = "get" !== i ? i : Z(l) ? (u ? t[e.indexOf("set") || !Z(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]()) : l,
                d = Z(l) ? (u ? li : hi) : ui;
            if (($(r) && (~r.indexOf("random(") && (r = be(r)), "=" === r.charAt(1) && (r = parseFloat(c) + parseFloat(r.substr(2)) * ("-" === r.charAt(0) ? -1 : 1) + (de(c) || 0))), c !== r))
                return isNaN(c * r)
                    ? (!l && !(e in t) && mt(e, r), ti.call(this, t, e, c, r, d, a || H.stringFilter, u))
                    : ((h = new xi(this._pt, t, e, +c || 0, r - (c || 0), "boolean" == typeof l ? pi : fi, 0, d)), u && (h.fp = u), o && h.modifier(o, this, t), (this._pt = h));
        },
        ii = function (t, e, i, r, n, s) {
            var o, a, u, h;
            if (
                Ot[t] &&
                !1 !==
                    (o = new Ot[t]()).init(
                        n,
                        o.rawVars
                            ? e[t]
                            : (function (t, e, i, r, n) {
                                  if ((Z(t) && (t = ni(t, n, e, i, r)), !tt(t) || (t.style && t.nodeType) || st(t) || nt(t))) return $(t) ? ni(t, n, e, i, r) : t;
                                  var s,
                                      o = {};
                                  for (s in t) o[s] = ni(t[s], n, e, i, r);
                                  return o;
                              })(e[t], r, n, s, i),
                        i,
                        r,
                        s
                    ) &&
                ((i._pt = a = new xi(i._pt, n, t, 0, 1, o.render, o, 0, o.priority)), i !== y)
            )
                for (u = i._ptLookup[i._targets.indexOf(n)], h = o._props.length; h--; ) u[o._props[h]] = a;
            return o;
        },
        ri = function t(e, i) {
            var r,
                n,
                s,
                o,
                a,
                u,
                h,
                l,
                c,
                p,
                _,
                m,
                g,
                v = e.vars,
                y = v.ease,
                w = v.startAt,
                x = v.immediateRender,
                b = v.lazy,
                O = v.onUpdate,
                M = v.onUpdateParams,
                T = v.callbackScope,
                D = v.runBackwards,
                k = v.yoyoEase,
                A = v.keyframes,
                C = v.autoRevert,
                S = e._dur,
                E = e._startAt,
                L = e._targets,
                P = e.parent,
                I = P && "nested" === P.data ? P.parent._targets : L,
                R = "auto" === e._overwrite && !d,
                z = e.timeline;
            if ((z && (!A || !y) && (y = "none"), (e._ease = Xe(y, N.ease)), (e._yEase = k ? je(Xe(!0 === k ? y : k, N.ease)) : 0), k && e._yoyo && !e._repeat && ((k = e._yEase), (e._yEase = e._ease), (e._ease = k)), !z)) {
                if (((m = (l = L[0] ? Ct(L[0]).harness : 0) && v[l.prop]), (r = jt(v, wt)), E && E.render(-1, !0).kill(), w))
                    if ((Ut((e._startAt = ai.set(L, Bt({ data: "isStart", overwrite: !1, parent: P, immediateRender: !0, lazy: et(b), startAt: null, delay: 0, onUpdate: O, onUpdateParams: M, callbackScope: T, stagger: 0 }, w)))), x)) {
                        if (i > 0) C || (e._startAt = 0);
                        else if (S && !(i < 0 && E)) return void (i && (e._zTime = i));
                    } else !1 === C && (e._startAt = 0);
                else if (D && S)
                    if (E) !C && (e._startAt = 0);
                    else if ((i && (x = !1), (s = Bt({ overwrite: !1, data: "isFromStart", lazy: x && et(b), immediateRender: x, stagger: 0, parent: P }, r)), m && (s[l.prop] = m), Ut((e._startAt = ai.set(L, s))), x)) {
                        if (!i) return;
                    } else t(e._startAt, j);
                for (e._pt = 0, b = (S && et(b)) || (b && !S), n = 0; n < L.length; n++) {
                    if (
                        ((h = (a = L[n])._gsap || At(L)[n]._gsap),
                        (e._ptLookup[n] = p = {}),
                        bt[h.id] && xt.length && Rt(),
                        (_ = I === L ? n : I.indexOf(a)),
                        l &&
                            !1 !== (c = new l()).init(a, m || r, e, _, I) &&
                            ((e._pt = o = new xi(e._pt, a, c.name, 0, 1, c.render, c, 0, c.priority)),
                            c._props.forEach(function (t) {
                                p[t] = o;
                            }),
                            c.priority && (u = 1)),
                        !l || m)
                    )
                        for (s in r) Ot[s] && (c = ii(s, r, e, _, a, I)) ? c.priority && (u = 1) : (p[s] = o = ei.call(e, a, s, "get", r[s], _, I, 0, v.stringFilter));
                    e._op && e._op[n] && e.kill(a, e._op[n]), R && e._pt && ((Ke = e), f.killTweensOf(a, p, e.globalTime(0)), (g = !e.parent), (Ke = 0)), e._pt && b && (bt[h.id] = 1);
                }
                u && wi(e), e._onInit && e._onInit(e);
            }
            (e._from = !z && !!v.runBackwards), (e._onUpdate = O), (e._initted = (!e._op || e._pt) && !g);
        },
        ni = function (t, e, i, r, n) {
            return Z(t) ? t.call(e, i, r, n) : $(t) && ~t.indexOf("random(") ? be(t) : t;
        },
        si = kt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        oi = (si + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
        ai = (function (t) {
            function e(e, i, r, n) {
                var s;
                "number" == typeof i && ((r.duration = i), (i = r), (r = null));
                var o,
                    a,
                    u,
                    h,
                    c,
                    p,
                    _,
                    m,
                    g = (s = t.call(this, n ? i : Vt(i), r) || this).vars,
                    v = g.duration,
                    y = g.delay,
                    w = g.immediateRender,
                    x = g.stagger,
                    b = g.overwrite,
                    O = g.keyframes,
                    M = g.defaults,
                    T = g.scrollTrigger,
                    D = g.yoyoEase,
                    k = s.parent,
                    A = (st(e) || nt(e) ? J(e[0]) : "length" in i) ? [e] : _e(e);
                if (((s._targets = A.length ? At(A) : gt("GSAP target " + e + " not found. https://greensock.com", !H.nullTargetWarn) || []), (s._ptLookup = []), (s._overwrite = b), O || x || rt(v) || rt(y))) {
                    if (((i = s.vars), (o = s.timeline = new Je({ data: "nested", defaults: M || {} })).kill(), (o.parent = o._dp = l(s)), (o._start = 0), O))
                        Bt(o.vars.defaults, { ease: "none" }),
                            O.forEach(function (t) {
                                return o.to(A, t, ">");
                            });
                    else {
                        if (((h = A.length), (_ = x ? ge(x) : yt), tt(x))) for (c in x) ~si.indexOf(c) && (m || (m = {}), (m[c] = x[c]));
                        for (a = 0; a < h; a++) {
                            for (c in ((u = {}), i)) oi.indexOf(c) < 0 && (u[c] = i[c]);
                            (u.stagger = 0),
                                D && (u.yoyoEase = D),
                                m && Nt(u, m),
                                (p = A[a]),
                                (u.duration = +ni(v, l(s), a, p, A)),
                                (u.delay = (+ni(y, l(s), a, p, A) || 0) - s._delay),
                                !x && 1 === h && u.delay && ((s._delay = y = u.delay), (s._start += y), (u.delay = 0)),
                                o.to(p, u, _(a, p, A));
                        }
                        o.duration() ? (v = y = 0) : (s.timeline = 0);
                    }
                    v || s.duration((v = o.duration()));
                } else s.timeline = 0;
                return (
                    !0 !== b || d || ((Ke = l(s)), f.killTweensOf(A), (Ke = 0)),
                    k && ee(k, l(s)),
                    (w || (!v && !O && s._start === Lt(k._time) && et(w) && Qt(l(s)) && "nested" !== k.data)) && ((s._tTime = -1e-8), s.render(Math.max(0, -y))),
                    T && re(l(s), T),
                    s
                );
            }
            c(e, t);
            var i = e.prototype;
            return (
                (i.render = function (t, e, i) {
                    var r,
                        n,
                        s,
                        o,
                        a,
                        u,
                        h,
                        l,
                        c,
                        d = this._time,
                        f = this._tDur,
                        p = this._dur,
                        _ = t > f - j && t >= 0 ? f : t < j ? 0 : t;
                    if (p) {
                        if (_ !== this._tTime || !t || i || (!this._initted && this._tTime) || (this._startAt && this._zTime < 0 != t < 0)) {
                            if (((r = _), (l = this.timeline), this._repeat)) {
                                if (((o = p + this._rDelay), this._repeat < -1 && t < 0)) return this.totalTime(100 * o + t, e, i);
                                if (
                                    ((r = Lt(_ % o)),
                                    _ === f ? ((s = this._repeat), (r = p)) : ((s = ~~(_ / o)) && s === _ / o && ((r = p), s--), r > p && (r = p)),
                                    (u = this._yoyo && 1 & s) && ((c = this._yEase), (r = p - r)),
                                    (a = Zt(this._tTime, o)),
                                    r === d && !i && this._initted)
                                )
                                    return this;
                                s !== a && (l && this._yEase && Ve(l, u), !this.vars.repeatRefresh || u || this._lock || ((this._lock = i = 1), (this.render(Lt(o * s), !0).invalidate()._lock = 0)));
                            }
                            if (!this._initted) {
                                if (ne(this, t < 0 ? t : r, i, e)) return (this._tTime = 0), this;
                                if (p !== this._dur) return this.render(t, e, i);
                            }
                            for (
                                this._tTime = _,
                                    this._time = r,
                                    !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                                    this.ratio = h = (c || this._ease)(r / p),
                                    this._from && (this.ratio = h = 1 - h),
                                    r && !d && !e && Te(this, "onStart"),
                                    n = this._pt;
                                n;

                            )
                                n.r(h, n.d), (n = n._next);
                            (l && l.render(t < 0 ? t : !r && u ? -1e-8 : l._dur * h, e, i)) || (this._startAt && (this._zTime = t)),
                                this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, i), Te(this, "onUpdate")),
                                this._repeat && s !== a && this.vars.onRepeat && !e && this.parent && Te(this, "onRepeat"),
                                (_ !== this._tDur && _) ||
                                    this._tTime !== _ ||
                                    (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0),
                                    (t || !p) && ((_ === this._tDur && this._ts > 0) || (!_ && this._ts < 0)) && Ut(this, 1),
                                    e || (t < 0 && !d) || (!_ && !d) || (Te(this, _ === f ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < f && this.timeScale() > 0) && this._prom()));
                        }
                    } else
                        !(function (t, e, i, r) {
                            var n,
                                s,
                                o,
                                a = t.ratio,
                                u = e < 0 || (!e && ((!t._start && se(t)) || ((t._ts < 0 || t._dp._ts < 0) && "isFromStart" !== t.data && "isStart" !== t.data))) ? 0 : 1,
                                h = t._rDelay,
                                l = 0;
                            if (
                                (h && t._repeat && ((l = ce(0, t._tDur, e)), (s = Zt(l, h)), (o = Zt(t._tTime, h)), t._yoyo && 1 & s && (u = 1 - u), s !== o && ((a = 1 - u), t.vars.repeatRefresh && t._initted && t.invalidate())),
                                u !== a || r || t._zTime === j || (!e && t._zTime))
                            ) {
                                if (!t._initted && ne(t, e, r, i)) return;
                                for (o = t._zTime, t._zTime = e || (i ? j : 0), i || (i = e && !o), t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, n = t._pt; n; ) n.r(u, n.d), (n = n._next);
                                t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                                    t._onUpdate && !i && Te(t, "onUpdate"),
                                    l && t._repeat && !i && t.parent && Te(t, "onRepeat"),
                                    (e >= t._tDur || e < 0) && t.ratio === u && (u && Ut(t, 1), i || (Te(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
                            } else t._zTime || (t._zTime = e);
                        })(this, t, e, i);
                    return this;
                }),
                (i.targets = function () {
                    return this._targets;
                }),
                (i.invalidate = function () {
                    return (this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0), (this._ptLookup = []), this.timeline && this.timeline.invalidate(), t.prototype.invalidate.call(this);
                }),
                (i.kill = function (t, e) {
                    if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e)))) return (this._lazy = this._pt = 0), this.parent ? De(this) : this;
                    if (this.timeline) {
                        var i = this.timeline.totalDuration();
                        return this.timeline.killTweensOf(t, e, Ke && !0 !== Ke.vars.overwrite)._first || De(this), this.parent && i !== this.timeline.totalDuration() && oe(this, (this._dur * this.timeline._tDur) / i, 0, 1), this;
                    }
                    var r,
                        n,
                        s,
                        o,
                        a,
                        u,
                        h,
                        l = this._targets,
                        c = t ? _e(t) : l,
                        d = this._ptLookup,
                        f = this._pt;
                    if (
                        (!e || "all" === e) &&
                        (function (t, e) {
                            for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; );
                            return i < 0;
                        })(l, c)
                    )
                        return "all" === e && (this._pt = 0), De(this);
                    for (
                        r = this._op = this._op || [],
                            "all" !== e &&
                                ($(e) &&
                                    ((a = {}),
                                    Et(e, function (t) {
                                        return (a[t] = 1);
                                    }),
                                    (e = a)),
                                (e = (function (t, e) {
                                    var i,
                                        r,
                                        n,
                                        s,
                                        o = t[0] ? Ct(t[0]).harness : 0,
                                        a = o && o.aliases;
                                    if (!a) return e;
                                    for (r in ((i = Nt({}, e)), a)) if ((r in i)) for (n = (s = a[r].split(",")).length; n--; ) i[s[n]] = i[r];
                                    return i;
                                })(l, e))),
                            h = l.length;
                        h--;

                    )
                        if (~c.indexOf(l[h]))
                            for (a in ((n = d[h]), "all" === e ? ((r[h] = e), (o = n), (s = {})) : ((s = r[h] = r[h] || {}), (o = e)), o))
                                (u = n && n[a]) && (("kill" in u.d && !0 !== u.d.kill(a)) || Xt(this, u, "_pt"), delete n[a]), "all" !== s && (s[a] = 1);
                    return this._initted && !this._pt && f && De(this), this;
                }),
                (e.to = function (t, i) {
                    return new e(t, i, arguments[2]);
                }),
                (e.from = function (t, i) {
                    return new e(t, It(arguments, 1));
                }),
                (e.delayedCall = function (t, i, r, n) {
                    return new e(i, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: t, onComplete: i, onReverseComplete: i, onCompleteParams: r, onReverseCompleteParams: r, callbackScope: n });
                }),
                (e.fromTo = function (t, i, r) {
                    return new e(t, It(arguments, 2));
                }),
                (e.set = function (t, i) {
                    return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(t, i);
                }),
                (e.killTweensOf = function (t, e, i) {
                    return f.killTweensOf(t, e, i);
                }),
                e
            );
        })(Ze);
    Bt(ai.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
        Et("staggerTo,staggerFrom,staggerFromTo", function (t) {
            ai[t] = function () {
                var e = new Je(),
                    i = fe.call(arguments, 0);
                return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i);
            };
        });
    var ui = function (t, e, i) {
            return (t[e] = i);
        },
        hi = function (t, e, i) {
            return t[e](i);
        },
        li = function (t, e, i, r) {
            return t[e](r.fp, i);
        },
        ci = function (t, e, i) {
            return t.setAttribute(e, i);
        },
        di = function (t, e) {
            return Z(t[e]) ? hi : K(t[e]) && t.setAttribute ? ci : ui;
        },
        fi = function (t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e);
        },
        pi = function (t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        _i = function (t, e) {
            var i = e._pt,
                r = "";
            if (!t && e.b) r = e.b;
            else if (1 === t && e.e) r = e.e;
            else {
                for (; i; ) (r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round(1e4 * (i.s + i.c * t)) / 1e4) + r), (i = i._next);
                r += e.c;
            }
            e.set(e.t, e.p, r, e);
        },
        mi = function (t, e) {
            for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
        },
        gi = function (t, e, i, r) {
            for (var n, s = this._pt; s; ) (n = s._next), s.p === r && s.modifier(t, e, i), (s = n);
        },
        vi = function (t) {
            for (var e, i, r = this._pt; r; ) (i = r._next), (r.p === t && !r.op) || r.op === t ? Xt(this, r, "_pt") : r.dep || (e = 1), (r = i);
            return !e;
        },
        yi = function (t, e, i, r) {
            r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
        },
        wi = function (t) {
            for (var e, i, r, n, s = t._pt; s; ) {
                for (e = s._next, i = r; i && i.pr > s.pr; ) i = i._next;
                (s._prev = i ? i._prev : n) ? (s._prev._next = s) : (r = s), (s._next = i) ? (i._prev = s) : (n = s), (s = e);
            }
            t._pt = r;
        },
        xi = (function () {
            function t(t, e, i, r, n, s, o, a, u) {
                (this.t = e), (this.s = r), (this.c = n), (this.p = i), (this.r = s || fi), (this.d = o || this), (this.set = a || ui), (this.pr = u || 0), (this._next = t), t && (t._prev = this);
            }
            return (
                (t.prototype.modifier = function (t, e, i) {
                    (this.mSet = this.mSet || this.set), (this.set = yi), (this.m = t), (this.mt = i), (this.tween = e);
                }),
                t
            );
        })();
    Et(
        kt +
            "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (t) {
            return (wt[t] = 1);
        }
    ),
        (ft.TweenMax = ft.TweenLite = ai),
        (ft.TimelineLite = ft.TimelineMax = Je),
        (f = new Je({ sortChildren: !1, defaults: N, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 })),
        (H.stringFilter = ze);
    var bi = {
        registerPlugin: function () {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            e.forEach(function (t) {
                return ke(t);
            });
        },
        timeline: function (t) {
            return new Je(t);
        },
        getTweensOf: function (t, e) {
            return f.getTweensOf(t, e);
        },
        getProperty: function (t, e, i, r) {
            $(t) && (t = _e(t)[0]);
            var n = Ct(t || {}).get,
                s = i ? qt : Ft;
            return (
                "native" === i && (i = ""),
                t
                    ? e
                        ? s(((Ot[e] && Ot[e].get) || n)(t, e, i, r))
                        : function (e, i, r) {
                              return s(((Ot[e] && Ot[e].get) || n)(t, e, i, r));
                          }
                    : t
            );
        },
        quickSetter: function (t, e, i) {
            if ((t = _e(t)).length > 1) {
                var r = t.map(function (t) {
                        return Ti.quickSetter(t, e, i);
                    }),
                    n = r.length;
                return function (t) {
                    for (var e = n; e--; ) r[e](t);
                };
            }
            t = t[0] || {};
            var s = Ot[e],
                o = Ct(t),
                a = (o.harness && (o.harness.aliases || {})[e]) || e,
                u = s
                    ? function (e) {
                          var r = new s();
                          (y._pt = 0), r.init(t, i ? e + i : e, y, 0, [t]), r.render(1, r), y._pt && mi(1, y);
                      }
                    : o.set(t, a);
            return s
                ? u
                : function (e) {
                      return u(t, a, i ? e + i : e, o, 1);
                  };
        },
        isTweening: function (t) {
            return f.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
            return t && t.ease && (t.ease = Xe(t.ease, N.ease)), Yt(N, t || {});
        },
        config: function (t) {
            return Yt(H, t || {});
        },
        registerEffect: function (t) {
            var e = t.name,
                i = t.effect,
                r = t.plugins,
                n = t.defaults,
                s = t.extendTimeline;
            (r || "").split(",").forEach(function (t) {
                return t && !Ot[t] && !ft[t] && gt(e + " effect requires " + t + " plugin.");
            }),
                (Mt[e] = function (t, e, r) {
                    return i(_e(t), Bt(e || {}, n), r);
                }),
                s &&
                    (Je.prototype[e] = function (t, i, r) {
                        return this.add(Mt[e](t, tt(i) ? i : (r = i) && {}, this), r);
                    });
        },
        registerEase: function (t, e) {
            Be[t] = Xe(e);
        },
        parseEase: function (t, e) {
            return arguments.length ? Xe(t, e) : Be;
        },
        getById: function (t) {
            return f.getById(t);
        },
        exportRoot: function (t, e) {
            void 0 === t && (t = {});
            var i,
                r,
                n = new Je(t);
            for (n.smoothChildTiming = et(t.smoothChildTiming), f.remove(n), n._dp = 0, n._time = n._tTime = f._time, i = f._first; i; )
                (r = i._next), (!e && !i._dur && i instanceof ai && i.vars.onComplete === i._targets[0]) || ie(n, i, i._start - i._delay), (i = r);
            return ie(f, n, 0), n;
        },
        utils: {
            wrap: function t(e, i, r) {
                var n = i - e;
                return st(e)
                    ? xe(e, t(0, e.length), i)
                    : le(r, function (t) {
                          return ((n + ((t - e) % n)) % n) + e;
                      });
            },
            wrapYoyo: function t(e, i, r) {
                var n = i - e,
                    s = 2 * n;
                return st(e)
                    ? xe(e, t(0, e.length - 1), i)
                    : le(r, function (t) {
                          return e + ((t = (s + ((t - e) % s)) % s || 0) > n ? s - t : t);
                      });
            },
            distribute: ge,
            random: we,
            snap: ye,
            normalize: function (t, e, i) {
                return Oe(t, e, 0, 1, i);
            },
            getUnit: de,
            clamp: function (t, e, i) {
                return le(i, function (i) {
                    return ce(t, e, i);
                });
            },
            splitColor: Ee,
            toArray: _e,
            mapRange: Oe,
            pipe: function () {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                return function (t) {
                    return e.reduce(function (t, e) {
                        return e(t);
                    }, t);
                };
            },
            unitize: function (t, e) {
                return function (i) {
                    return t(parseFloat(i)) + (e || de(i));
                };
            },
            interpolate: function t(e, i, r, n) {
                var s = isNaN(e + i)
                    ? 0
                    : function (t) {
                          return (1 - t) * e + t * i;
                      };
                if (!s) {
                    var o,
                        a,
                        u,
                        h,
                        l,
                        c = $(e),
                        d = {};
                    if ((!0 === r && (n = 1) && (r = null), c)) (e = { p: e }), (i = { p: i });
                    else if (st(e) && !st(i)) {
                        for (u = [], h = e.length, l = h - 2, a = 1; a < h; a++) u.push(t(e[a - 1], e[a]));
                        h--,
                            (s = function (t) {
                                t *= h;
                                var e = Math.min(l, ~~t);
                                return u[e](t - e);
                            }),
                            (r = i);
                    } else n || (e = Nt(st(e) ? [] : {}, e));
                    if (!u) {
                        for (o in i) ei.call(d, e, o, "get", i[o]);
                        s = function (t) {
                            return mi(t, d) || (c ? e.p : e);
                        };
                    }
                }
                return le(r, s);
            },
            shuffle: me,
        },
        install: _t,
        effects: Mt,
        ticker: Fe,
        updateRoot: Je.updateRoot,
        plugins: Ot,
        globalTimeline: f,
        core: {
            PropTween: xi,
            globals: vt,
            Tween: ai,
            Timeline: Je,
            Animation: Ze,
            getCache: Ct,
            _removeLinkedListItem: Xt,
            suppressOverwrites: function (t) {
                return (d = t);
            },
        },
    };
    Et("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return (bi[t] = ai[t]);
    }),
        Fe.add(Je.updateRoot),
        (y = bi.to({}, { duration: 0 }));
    var Oi = function (t, e) {
            for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; ) i = i._next;
            return i;
        },
        Mi = function (t, e) {
            return {
                name: t,
                rawVars: 1,
                init: function (t, i, r) {
                    r._onInit = function (t) {
                        var r, n;
                        if (
                            ($(i) &&
                                ((r = {}),
                                Et(i, function (t) {
                                    return (r[t] = 1);
                                }),
                                (i = r)),
                            e)
                        ) {
                            for (n in ((r = {}), i)) r[n] = e(i[n]);
                            i = r;
                        }
                        !(function (t, e) {
                            var i,
                                r,
                                n,
                                s = t._targets;
                            for (i in e) for (r = s.length; r--; ) (n = t._ptLookup[r][i]) && (n = n.d) && (n._pt && (n = Oi(n, i)), n && n.modifier && n.modifier(e[i], t, s[r], i));
                        })(t, i);
                    };
                },
            };
        },
        Ti =
            bi.registerPlugin(
                {
                    name: "attr",
                    init: function (t, e, i, r, n) {
                        var s, o;
                        for (s in e) (o = this.add(t, "setAttribute", (t.getAttribute(s) || 0) + "", e[s], r, n, 0, 0, s)) && (o.op = s), this._props.push(s);
                    },
                },
                {
                    name: "endArray",
                    init: function (t, e) {
                        for (var i = e.length; i--; ) this.add(t, i, t[i] || 0, e[i]);
                    },
                },
                Mi("roundProps", ve),
                Mi("modifiers"),
                Mi("snap", ye)
            ) || bi;
    (ai.version = Je.version = Ti.version = "3.6.1"), (g = 1), it() && qe();
    Be.Power0, Be.Power1, Be.Power2, Be.Power3, Be.Power4, Be.Linear, Be.Quad, Be.Cubic, Be.Quart, Be.Quint, Be.Strong, Be.Elastic, Be.Back, Be.SteppedEase, Be.Bounce, Be.Sine, Be.Expo, Be.Circ;
    var Di,
        ki,
        Ai,
        Ci,
        Si,
        Ei,
        Li,
        Pi = {},
        Ii = 180 / Math.PI,
        Ri = Math.PI / 180,
        zi = Math.atan2,
        Fi = /([A-Z])/g,
        qi = /(?:left|right|width|margin|padding|x)/i,
        Bi = /[\s,\(]\S/,
        Hi = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
        Ni = function (t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
        },
        Yi = function (t, e) {
            return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
        },
        ji = function (t, e) {
            return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
        },
        Vi = function (t, e) {
            var i = e.s + e.c * t;
            e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        Xi = function (t, e) {
            return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        Ui = function (t, e) {
            return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        Wi = function (t, e, i) {
            return (t.style[e] = i);
        },
        Gi = function (t, e, i) {
            return t.style.setProperty(e, i);
        },
        Qi = function (t, e, i) {
            return (t._gsap[e] = i);
        },
        $i = function (t, e, i) {
            return (t._gsap.scaleX = t._gsap.scaleY = i);
        },
        Zi = function (t, e, i, r, n) {
            var s = t._gsap;
            (s.scaleX = s.scaleY = i), s.renderTransform(n, s);
        },
        Ji = function (t, e, i, r, n) {
            var s = t._gsap;
            (s[e] = i), s.renderTransform(n, s);
        },
        Ki = "transform",
        tr = Ki + "Origin",
        er = function (t, e) {
            var i = ki.createElementNS ? ki.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ki.createElement(t);
            return i.style ? i : ki.createElement(t);
        },
        ir = function t(e, i, r) {
            var n = getComputedStyle(e);
            return n[i] || n.getPropertyValue(i.replace(Fi, "-$1").toLowerCase()) || n.getPropertyValue(i) || (!r && t(e, nr(i) || i, 1)) || "";
        },
        rr = "O,Moz,ms,Ms,Webkit".split(","),
        nr = function (t, e, i) {
            var r = (e || Si).style,
                n = 5;
            if (t in r && !i) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(rr[n] + t in r); );
            return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? rr[n] : "") + t;
        },
        sr = function () {
            "undefined" != typeof window &&
                window.document &&
                ((Di = window),
                (ki = Di.document),
                (Ai = ki.documentElement),
                (Si = er("div") || { style: {} }),
                er("div"),
                (Ki = nr(Ki)),
                (tr = Ki + "Origin"),
                (Si.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
                (Li = !!nr("perspective")),
                (Ci = 1));
        },
        or = function t(e) {
            var i,
                r = er("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
                n = this.parentNode,
                s = this.nextSibling,
                o = this.style.cssText;
            if ((Ai.appendChild(r), r.appendChild(this), (this.style.display = "block"), e))
                try {
                    (i = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = t);
                } catch (t) {}
            else this._gsapBBox && (i = this._gsapBBox());
            return n && (s ? n.insertBefore(this, s) : n.appendChild(this)), Ai.removeChild(r), (this.style.cssText = o), i;
        },
        ar = function (t, e) {
            for (var i = e.length; i--; ) if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
        },
        ur = function (t) {
            var e;
            try {
                e = t.getBBox();
            } catch (i) {
                e = or.call(t, !0);
            }
            return (e && (e.width || e.height)) || t.getBBox === or || (e = or.call(t, !0)), !e || e.width || e.x || e.y ? e : { x: +ar(t, ["x", "cx", "x1"]) || 0, y: +ar(t, ["y", "cy", "y1"]) || 0, width: 0, height: 0 };
        },
        hr = function (t) {
            return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !ur(t));
        },
        lr = function (t, e) {
            if (e) {
                var i = t.style;
                e in Pi && e !== tr && (e = Ki), i.removeProperty ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) || (e = "-" + e), i.removeProperty(e.replace(Fi, "-$1").toLowerCase())) : i.removeAttribute(e);
            }
        },
        cr = function (t, e, i, r, n, s) {
            var o = new xi(t._pt, e, i, 0, 1, s ? Ui : Xi);
            return (t._pt = o), (o.b = r), (o.e = n), t._props.push(i), o;
        },
        dr = { deg: 1, rad: 1, turn: 1 },
        fr = function t(e, i, r, n) {
            var s,
                o,
                a,
                u,
                h = parseFloat(r) || 0,
                l = (r + "").trim().substr((h + "").length) || "px",
                c = Si.style,
                d = qi.test(i),
                f = "svg" === e.tagName.toLowerCase(),
                p = (f ? "client" : "offset") + (d ? "Width" : "Height"),
                _ = 100,
                m = "px" === n,
                g = "%" === n;
            return n === l || !h || dr[n] || dr[l]
                ? h
                : ("px" !== l && !m && (h = t(e, i, r, "px")),
                  (u = e.getCTM && hr(e)),
                  (!g && "%" !== l) || (!Pi[i] && !~i.indexOf("adius"))
                      ? ((c[d ? "width" : "height"] = _ + (m ? l : n)),
                        (o = ~i.indexOf("adius") || ("em" === n && e.appendChild && !f) ? e : e.parentNode),
                        u && (o = (e.ownerSVGElement || {}).parentNode),
                        (o && o !== ki && o.appendChild) || (o = ki.body),
                        (a = o._gsap) && g && a.width && d && a.time === Fe.time
                            ? Lt((h / a.width) * _)
                            : ((g || "%" === l) && (c.position = ir(e, "position")),
                              o === e && (c.position = "static"),
                              o.appendChild(Si),
                              (s = Si[p]),
                              o.removeChild(Si),
                              (c.position = "absolute"),
                              d && g && (((a = Ct(o)).time = Fe.time), (a.width = o[p])),
                              Lt(m ? (s * h) / _ : s && h ? (_ / s) * h : 0)))
                      : ((s = u ? e.getBBox()[d ? "width" : "height"] : e[p]), Lt(g ? (h / s) * _ : (h / 100) * s)));
        },
        pr = function (t, e, i, r) {
            var n;
            return (
                Ci || sr(),
                e in Hi && "transform" !== e && ~(e = Hi[e]).indexOf(",") && (e = e.split(",")[0]),
                Pi[e] && "transform" !== e
                    ? ((n = Tr(t, r)), (n = "transformOrigin" !== e ? n[e] : Dr(ir(t, tr)) + " " + n.zOrigin + "px"))
                    : (!(n = t.style[e]) || "auto" === n || r || ~(n + "").indexOf("calc(")) && (n = (vr[e] && vr[e](t, e, i)) || ir(t, e) || St(t, e) || ("opacity" === e ? 1 : 0)),
                i && !~(n + "").trim().indexOf(" ") ? fr(t, e, n, i) + i : n
            );
        },
        _r = function (t, e, i, r) {
            if (!i || "none" === i) {
                var n = nr(e, t, 1),
                    s = n && ir(t, n, 1);
                s && s !== i ? ((e = n), (i = s)) : "borderColor" === e && (i = ir(t, "borderTopColor"));
            }
            var o,
                a,
                u,
                h,
                l,
                c,
                d,
                f,
                p,
                _,
                m,
                g,
                v = new xi(this._pt, t.style, e, 0, 1, _i),
                y = 0,
                w = 0;
            if (((v.b = i), (v.e = r), (i += ""), "auto" === (r += "") && ((t.style[e] = r), (r = ir(t, e) || r), (t.style[e] = i)), ze((o = [i, r])), (r = o[1]), (u = (i = o[0]).match(ut) || []), (r.match(ut) || []).length)) {
                for (; (a = ut.exec(r)); )
                    (d = a[0]),
                        (p = r.substring(y, a.index)),
                        l ? (l = (l + 1) % 5) : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (l = 1),
                        d !== (c = u[w++] || "") &&
                            ((h = parseFloat(c) || 0),
                            (m = c.substr((h + "").length)),
                            (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)),
                            (f = parseFloat(d)),
                            (_ = d.substr((f + "").length)),
                            (y = ut.lastIndex - _.length),
                            _ || ((_ = _ || H.units[e] || m), y === r.length && ((r += _), (v.e += _))),
                            m !== _ && (h = fr(t, e, c, _) || 0),
                            (v._pt = { _next: v._pt, p: p || 1 === w ? p : ",", s: h, c: g ? g * f : f - h, m: (l && l < 4) || "zIndex" === e ? Math.round : 0 }));
                v.c = y < r.length ? r.substring(y, r.length) : "";
            } else v.r = "display" === e && "none" === r ? Ui : Xi;
            return lt.test(r) && (v.e = 0), (this._pt = v), v;
        },
        mr = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
        gr = function (t, e) {
            if (e.tween && e.tween._time === e.tween._dur) {
                var i,
                    r,
                    n,
                    s = e.t,
                    o = s.style,
                    a = e.u,
                    u = s._gsap;
                if ("all" === a || !0 === a) (o.cssText = ""), (r = 1);
                else for (n = (a = a.split(",")).length; --n > -1; ) (i = a[n]), Pi[i] && ((r = 1), (i = "transformOrigin" === i ? tr : Ki)), lr(s, i);
                r && (lr(s, Ki), u && (u.svg && s.removeAttribute("transform"), Tr(s, 1), (u.uncache = 1)));
            }
        },
        vr = {
            clearProps: function (t, e, i, r, n) {
                if ("isFromStart" !== n.data) {
                    var s = (t._pt = new xi(t._pt, e, i, 0, 0, gr));
                    return (s.u = r), (s.pr = -10), (s.tween = n), t._props.push(i), 1;
                }
            },
        },
        yr = [1, 0, 0, 1, 0, 0],
        wr = {},
        xr = function (t) {
            return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        br = function (t) {
            var e = ir(t, Ki);
            return xr(e) ? yr : e.substr(7).match(at).map(Lt);
        },
        Or = function (t, e) {
            var i,
                r,
                n,
                s,
                o = t._gsap || Ct(t),
                a = t.style,
                u = br(t);
            return o.svg && t.getAttribute("transform")
                ? "1,0,0,1,0,0" === (u = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",")
                    ? yr
                    : u
                : (u !== yr ||
                      t.offsetParent ||
                      t === Ai ||
                      o.svg ||
                      ((n = a.display),
                      (a.display = "block"),
                      ((i = t.parentNode) && t.offsetParent) || ((s = 1), (r = t.nextSibling), Ai.appendChild(t)),
                      (u = br(t)),
                      n ? (a.display = n) : lr(t, "display"),
                      s && (r ? i.insertBefore(t, r) : i ? i.appendChild(t) : Ai.removeChild(t))),
                  e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
        },
        Mr = function (t, e, i, r, n, s) {
            var o,
                a,
                u,
                h = t._gsap,
                l = n || Or(t, !0),
                c = h.xOrigin || 0,
                d = h.yOrigin || 0,
                f = h.xOffset || 0,
                p = h.yOffset || 0,
                _ = l[0],
                m = l[1],
                g = l[2],
                v = l[3],
                y = l[4],
                w = l[5],
                x = e.split(" "),
                b = parseFloat(x[0]) || 0,
                O = parseFloat(x[1]) || 0;
            i
                ? l !== yr && (a = _ * v - m * g) && ((u = b * (-m / a) + O * (_ / a) - (_ * w - m * y) / a), (b = b * (v / a) + O * (-g / a) + (g * w - v * y) / a), (O = u))
                : ((b = (o = ur(t)).x + (~x[0].indexOf("%") ? (b / 100) * o.width : b)), (O = o.y + (~(x[1] || x[0]).indexOf("%") ? (O / 100) * o.height : O))),
                r || (!1 !== r && h.smooth) ? ((y = b - c), (w = O - d), (h.xOffset = f + (y * _ + w * g) - y), (h.yOffset = p + (y * m + w * v) - w)) : (h.xOffset = h.yOffset = 0),
                (h.xOrigin = b),
                (h.yOrigin = O),
                (h.smooth = !!r),
                (h.origin = e),
                (h.originIsAbsolute = !!i),
                (t.style[tr] = "0px 0px"),
                s && (cr(s, h, "xOrigin", c, b), cr(s, h, "yOrigin", d, O), cr(s, h, "xOffset", f, h.xOffset), cr(s, h, "yOffset", p, h.yOffset)),
                t.setAttribute("data-svg-origin", b + " " + O);
        },
        Tr = function (t, e) {
            var i = t._gsap || new $e(t);
            if ("x" in i && !e && !i.uncache) return i;
            var r,
                n,
                s,
                o,
                a,
                u,
                h,
                l,
                c,
                d,
                f,
                p,
                _,
                m,
                g,
                v,
                y,
                w,
                x,
                b,
                O,
                M,
                T,
                D,
                k,
                A,
                C,
                S,
                E,
                L,
                P,
                I,
                R = t.style,
                z = i.scaleX < 0,
                F = "px",
                q = "deg",
                B = ir(t, tr) || "0";
            return (
                (r = n = s = u = h = l = c = d = f = 0),
                (o = a = 1),
                (i.svg = !(!t.getCTM || !hr(t))),
                (m = Or(t, i.svg)),
                i.svg && ((D = !i.uncache && !e && t.getAttribute("data-svg-origin")), Mr(t, D || B, !!D || i.originIsAbsolute, !1 !== i.smooth, m)),
                (p = i.xOrigin || 0),
                (_ = i.yOrigin || 0),
                m !== yr &&
                    ((w = m[0]),
                    (x = m[1]),
                    (b = m[2]),
                    (O = m[3]),
                    (r = M = m[4]),
                    (n = T = m[5]),
                    6 === m.length
                        ? ((o = Math.sqrt(w * w + x * x)),
                          (a = Math.sqrt(O * O + b * b)),
                          (u = w || x ? zi(x, w) * Ii : 0),
                          (c = b || O ? zi(b, O) * Ii + u : 0) && (a *= Math.abs(Math.cos(c * Ri))),
                          i.svg && ((r -= p - (p * w + _ * b)), (n -= _ - (p * x + _ * O))))
                        : ((I = m[6]),
                          (L = m[7]),
                          (C = m[8]),
                          (S = m[9]),
                          (E = m[10]),
                          (P = m[11]),
                          (r = m[12]),
                          (n = m[13]),
                          (s = m[14]),
                          (h = (g = zi(I, E)) * Ii),
                          g &&
                              ((D = M * (v = Math.cos(-g)) + C * (y = Math.sin(-g))),
                              (k = T * v + S * y),
                              (A = I * v + E * y),
                              (C = M * -y + C * v),
                              (S = T * -y + S * v),
                              (E = I * -y + E * v),
                              (P = L * -y + P * v),
                              (M = D),
                              (T = k),
                              (I = A)),
                          (l = (g = zi(-b, E)) * Ii),
                          g && ((v = Math.cos(-g)), (P = O * (y = Math.sin(-g)) + P * v), (w = D = w * v - C * y), (x = k = x * v - S * y), (b = A = b * v - E * y)),
                          (u = (g = zi(x, w)) * Ii),
                          g && ((D = w * (v = Math.cos(g)) + x * (y = Math.sin(g))), (k = M * v + T * y), (x = x * v - w * y), (T = T * v - M * y), (w = D), (M = k)),
                          h && Math.abs(h) + Math.abs(u) > 359.9 && ((h = u = 0), (l = 180 - l)),
                          (o = Lt(Math.sqrt(w * w + x * x + b * b))),
                          (a = Lt(Math.sqrt(T * T + I * I))),
                          (g = zi(M, T)),
                          (c = Math.abs(g) > 2e-4 ? g * Ii : 0),
                          (f = P ? 1 / (P < 0 ? -P : P) : 0)),
                    i.svg && ((D = t.getAttribute("transform")), (i.forceCSS = t.setAttribute("transform", "") || !xr(ir(t, Ki))), D && t.setAttribute("transform", D))),
                Math.abs(c) > 90 && Math.abs(c) < 270 && (z ? ((o *= -1), (c += u <= 0 ? 180 : -180), (u += u <= 0 ? 180 : -180)) : ((a *= -1), (c += c <= 0 ? 180 : -180))),
                (i.x = r - ((i.xPercent = r && (i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-r) ? -50 : 0))) ? (t.offsetWidth * i.xPercent) / 100 : 0) + F),
                (i.y = n - ((i.yPercent = n && (i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? (t.offsetHeight * i.yPercent) / 100 : 0) + F),
                (i.z = s + F),
                (i.scaleX = Lt(o)),
                (i.scaleY = Lt(a)),
                (i.rotation = Lt(u) + q),
                (i.rotationX = Lt(h) + q),
                (i.rotationY = Lt(l) + q),
                (i.skewX = c + q),
                (i.skewY = d + q),
                (i.transformPerspective = f + F),
                (i.zOrigin = parseFloat(B.split(" ")[2]) || 0) && (R[tr] = Dr(B)),
                (i.xOffset = i.yOffset = 0),
                (i.force3D = H.force3D),
                (i.renderTransform = i.svg ? Pr : Li ? Lr : Ar),
                (i.uncache = 0),
                i
            );
        },
        Dr = function (t) {
            return (t = t.split(" "))[0] + " " + t[1];
        },
        kr = function (t, e, i) {
            var r = de(e);
            return Lt(parseFloat(e) + parseFloat(fr(t, "x", i + "px", r))) + r;
        },
        Ar = function (t, e) {
            (e.z = "0px"), (e.rotationY = e.rotationX = "0deg"), (e.force3D = 0), Lr(t, e);
        },
        Cr = "0deg",
        Sr = "0px",
        Er = ") ",
        Lr = function (t, e) {
            var i = e || this,
                r = i.xPercent,
                n = i.yPercent,
                s = i.x,
                o = i.y,
                a = i.z,
                u = i.rotation,
                h = i.rotationY,
                l = i.rotationX,
                c = i.skewX,
                d = i.skewY,
                f = i.scaleX,
                p = i.scaleY,
                _ = i.transformPerspective,
                m = i.force3D,
                g = i.target,
                v = i.zOrigin,
                y = "",
                w = ("auto" === m && t && 1 !== t) || !0 === m;
            if (v && (l !== Cr || h !== Cr)) {
                var x,
                    b = parseFloat(h) * Ri,
                    O = Math.sin(b),
                    M = Math.cos(b);
                (b = parseFloat(l) * Ri), (x = Math.cos(b)), (s = kr(g, s, O * x * -v)), (o = kr(g, o, -Math.sin(b) * -v)), (a = kr(g, a, M * x * -v + v));
            }
            _ !== Sr && (y += "perspective(" + _ + Er),
                (r || n) && (y += "translate(" + r + "%, " + n + "%) "),
                (w || s !== Sr || o !== Sr || a !== Sr) && (y += a !== Sr || w ? "translate3d(" + s + ", " + o + ", " + a + ") " : "translate(" + s + ", " + o + Er),
                u !== Cr && (y += "rotate(" + u + Er),
                h !== Cr && (y += "rotateY(" + h + Er),
                l !== Cr && (y += "rotateX(" + l + Er),
                (c === Cr && d === Cr) || (y += "skew(" + c + ", " + d + Er),
                (1 === f && 1 === p) || (y += "scale(" + f + ", " + p + Er),
                (g.style[Ki] = y || "translate(0, 0)");
        },
        Pr = function (t, e) {
            var i,
                r,
                n,
                s,
                o,
                a = e || this,
                u = a.xPercent,
                h = a.yPercent,
                l = a.x,
                c = a.y,
                d = a.rotation,
                f = a.skewX,
                p = a.skewY,
                _ = a.scaleX,
                m = a.scaleY,
                g = a.target,
                v = a.xOrigin,
                y = a.yOrigin,
                w = a.xOffset,
                x = a.yOffset,
                b = a.forceCSS,
                O = parseFloat(l),
                M = parseFloat(c);
            (d = parseFloat(d)),
                (f = parseFloat(f)),
                (p = parseFloat(p)) && ((f += p = parseFloat(p)), (d += p)),
                d || f
                    ? ((d *= Ri),
                      (f *= Ri),
                      (i = Math.cos(d) * _),
                      (r = Math.sin(d) * _),
                      (n = Math.sin(d - f) * -m),
                      (s = Math.cos(d - f) * m),
                      f && ((p *= Ri), (o = Math.tan(f - p)), (n *= o = Math.sqrt(1 + o * o)), (s *= o), p && ((o = Math.tan(p)), (i *= o = Math.sqrt(1 + o * o)), (r *= o))),
                      (i = Lt(i)),
                      (r = Lt(r)),
                      (n = Lt(n)),
                      (s = Lt(s)))
                    : ((i = _), (s = m), (r = n = 0)),
                ((O && !~(l + "").indexOf("px")) || (M && !~(c + "").indexOf("px"))) && ((O = fr(g, "x", l, "px")), (M = fr(g, "y", c, "px"))),
                (v || y || w || x) && ((O = Lt(O + v - (v * i + y * n) + w)), (M = Lt(M + y - (v * r + y * s) + x))),
                (u || h) && ((o = g.getBBox()), (O = Lt(O + (u / 100) * o.width)), (M = Lt(M + (h / 100) * o.height))),
                (o = "matrix(" + i + "," + r + "," + n + "," + s + "," + O + "," + M + ")"),
                g.setAttribute("transform", o),
                b && (g.style[Ki] = o);
        },
        Ir = function (t, e, i, r, n, s) {
            var o,
                a,
                u = 360,
                h = $(n),
                l = parseFloat(n) * (h && ~n.indexOf("rad") ? Ii : 1),
                c = s ? l * s : l - r,
                d = r + c + "deg";
            return (
                h && ("short" === (o = n.split("_")[1]) && (c %= u) !== c % 180 && (c += c < 0 ? u : -360), "cw" === o && c < 0 ? (c = ((c + 36e9) % u) - ~~(c / u) * u) : "ccw" === o && c > 0 && (c = ((c - 36e9) % u) - ~~(c / u) * u)),
                (t._pt = a = new xi(t._pt, e, i, r, c, Yi)),
                (a.e = d),
                (a.u = "deg"),
                t._props.push(i),
                a
            );
        },
        Rr = function (t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        },
        zr = function (t, e, i) {
            var r,
                n,
                s,
                o,
                a,
                u,
                h,
                l = Rr({}, i._gsap),
                c = i.style;
            for (n in (l.svg
                ? ((s = i.getAttribute("transform")), i.setAttribute("transform", ""), (c[Ki] = e), (r = Tr(i, 1)), lr(i, Ki), i.setAttribute("transform", s))
                : ((s = getComputedStyle(i)[Ki]), (c[Ki] = e), (r = Tr(i, 1)), (c[Ki] = s)),
            Pi))
                (s = l[n]) !== (o = r[n]) &&
                    "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
                    ((a = de(s) !== (h = de(o)) ? fr(i, n, s, h) : parseFloat(s)), (u = parseFloat(o)), (t._pt = new xi(t._pt, r, n, a, u - a, Ni)), (t._pt.u = h || 0), t._props.push(n));
            Rr(r, l);
        };
    Et("padding,margin,Width,Radius", function (t, e) {
        var i = "Top",
            r = "Right",
            n = "Bottom",
            s = "Left",
            o = (e < 3 ? [i, r, n, s] : [i + s, i + r, n + r, n + s]).map(function (i) {
                return e < 2 ? t + i : "border" + i + t;
            });
        vr[e > 1 ? "border" + t : t] = function (t, e, i, r, n) {
            var s, a;
            if (arguments.length < 4)
                return (
                    (s = o.map(function (e) {
                        return pr(t, e, i);
                    })),
                    5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a
                );
            (s = (r + "").split(" ")),
                (a = {}),
                o.forEach(function (t, e) {
                    return (a[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
                }),
                t.init(e, a, n);
        };
    });
    var Fr,
        qr,
        Br,
        Hr = {
            name: "css",
            register: sr,
            targetTest: function (t) {
                return t.style && t.nodeType;
            },
            init: function (t, e, i, r, n) {
                var s,
                    o,
                    a,
                    u,
                    h,
                    l,
                    c,
                    d,
                    f,
                    p,
                    _,
                    m,
                    g,
                    v,
                    y,
                    w,
                    x,
                    b,
                    O,
                    M = this._props,
                    T = t.style,
                    D = i.vars.startAt;
                for (c in (Ci || sr(), e))
                    if ("autoRound" !== c && ((o = e[c]), !Ot[c] || !ii(c, e, i, r, t, n)))
                        if (((h = typeof o), (l = vr[c]), "function" === h && (h = typeof (o = o.call(i, r, t, n))), "string" === h && ~o.indexOf("random(") && (o = be(o)), l)) l(this, t, c, o, i) && (y = 1);
                        else if ("--" === c.substr(0, 2))
                            (s = (getComputedStyle(t).getPropertyValue(c) + "").trim()),
                                (o += ""),
                                (Ie.lastIndex = 0),
                                Ie.test(s) || ((d = de(s)), (f = de(o))),
                                f ? d !== f && (s = fr(t, c, s, f) + f) : d && (o += d),
                                this.add(T, "setProperty", s, o, r, n, 0, 0, c);
                        else if ("undefined" !== h) {
                            if (
                                (D && c in D ? ((s = "function" == typeof D[c] ? D[c].call(i, r, t, n) : D[c]), c in H.units && !de(s) && (s += H.units[c]), "=" === (s + "").charAt(1) && (s = pr(t, c))) : (s = pr(t, c)),
                                (u = parseFloat(s)),
                                (p = "string" === h && "=" === o.charAt(1) ? +(o.charAt(0) + "1") : 0) && (o = o.substr(2)),
                                (a = parseFloat(o)),
                                c in Hi &&
                                    ("autoAlpha" === c && (1 === u && "hidden" === pr(t, "visibility") && a && (u = 0), cr(this, T, "visibility", u ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)),
                                    "scale" !== c && "transform" !== c && ~(c = Hi[c]).indexOf(",") && (c = c.split(",")[0])),
                                (_ = c in Pi))
                            )
                                if (
                                    (m ||
                                        (((g = t._gsap).renderTransform && !e.parseTransform) || Tr(t, e.parseTransform),
                                        (v = !1 !== e.smoothOrigin && g.smooth),
                                        ((m = this._pt = new xi(this._pt, T, Ki, 0, 1, g.renderTransform, g, 0, -1)).dep = 1)),
                                    "scale" === c)
                                )
                                    (this._pt = new xi(this._pt, g, "scaleY", g.scaleY, p ? p * a : a - g.scaleY)), M.push("scaleY", c), (c += "X");
                                else {
                                    if ("transformOrigin" === c) {
                                        (x = void 0),
                                            (b = void 0),
                                            (O = void 0),
                                            (x = (w = o).split(" ")),
                                            (b = x[0]),
                                            (O = x[1] || "50%"),
                                            ("top" !== b && "bottom" !== b && "left" !== O && "right" !== O) || ((w = b), (b = O), (O = w)),
                                            (x[0] = mr[b] || b),
                                            (x[1] = mr[O] || O),
                                            (o = x.join(" ")),
                                            g.svg ? Mr(t, o, 0, v, 0, this) : ((f = parseFloat(o.split(" ")[2]) || 0) !== g.zOrigin && cr(this, g, "zOrigin", g.zOrigin, f), cr(this, T, c, Dr(s), Dr(o)));
                                        continue;
                                    }
                                    if ("svgOrigin" === c) {
                                        Mr(t, o, 1, v, 0, this);
                                        continue;
                                    }
                                    if (c in wr) {
                                        Ir(this, g, c, u, o, p);
                                        continue;
                                    }
                                    if ("smoothOrigin" === c) {
                                        cr(this, g, "smooth", g.smooth, o);
                                        continue;
                                    }
                                    if ("force3D" === c) {
                                        g[c] = o;
                                        continue;
                                    }
                                    if ("transform" === c) {
                                        zr(this, o, t);
                                        continue;
                                    }
                                }
                            else c in T || (c = nr(c) || c);
                            if (_ || ((a || 0 === a) && (u || 0 === u) && !Bi.test(o) && c in T))
                                a || (a = 0),
                                    (d = (s + "").substr((u + "").length)) !== (f = de(o) || (c in H.units ? H.units[c] : d)) && (u = fr(t, c, s, f)),
                                    (this._pt = new xi(this._pt, _ ? g : T, c, u, p ? p * a : a - u, _ || ("px" !== f && "zIndex" !== c) || !1 === e.autoRound ? Ni : Vi)),
                                    (this._pt.u = f || 0),
                                    d !== f && ((this._pt.b = s), (this._pt.r = ji));
                            else if (c in T) _r.call(this, t, c, s, o);
                            else {
                                if (!(c in t)) {
                                    mt(c, o);
                                    continue;
                                }
                                this.add(t, c, t[c], o, r, n);
                            }
                            M.push(c);
                        }
                y && wi(this);
            },
            get: pr,
            aliases: Hi,
            getSetter: function (t, e, i) {
                var r = Hi[e];
                return (
                    r && r.indexOf(",") < 0 && (e = r),
                    e in Pi && e !== tr && (t._gsap.x || pr(t, "x")) ? (i && Ei === i ? ("scale" === e ? $i : Qi) : (Ei = i || {}) && ("scale" === e ? Zi : Ji)) : t.style && !K(t.style[e]) ? Wi : ~e.indexOf("-") ? Gi : di(t, e)
                );
            },
            core: { _removeProperty: lr, _getMatrix: Or },
        };
    (Ti.utils.checkPrefix = nr),
        (Br = Et((Fr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (qr = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
            Pi[t] = 1;
        })),
        Et(qr, function (t) {
            (H.units[t] = "deg"), (wr[t] = 1);
        }),
        (Hi[Br[13]] = Fr + "," + qr),
        Et("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
            var e = t.split(":");
            Hi[e[1]] = Br[e[0]];
        }),
        Et("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
            H.units[t] = "px";
        }),
        Ti.registerPlugin(Hr);
    var Nr = Ti.registerPlugin(Hr) || Ti;
    Nr.core.Tween;
    let Yr = { x: 0, y: 0 };
    window.addEventListener("mousemove", (t) => (Yr = u(t)));
    class jr {
        constructor(t) {
            (this.DOM = { el: t }),
                (this.DOM.el.style.opacity = 0),
                (this.bounds = this.DOM.el.getBoundingClientRect()),
                (this.renderedStyles = { tx: { previous: 0, current: 0, amt: 0.2 }, ty: { previous: 0, current: 0, amt: 0.2 }, scale: { previous: 1, current: 1, amt: 0.15 } }),
                (this.onMouseMoveEv = () => {
                    (this.renderedStyles.tx.previous = this.renderedStyles.tx.current = Yr.x - this.bounds.width / 2),
                        (this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = Yr.y - this.bounds.height / 2),
                        Nr.to(this.DOM.el, { duration: 0.9, ease: "Power3.easeOut", opacity: 1 }),
                        requestAnimationFrame(() => this.render()),
                        window.removeEventListener("mousemove", this.onMouseMoveEv);
                }),
                window.addEventListener("mousemove", this.onMouseMoveEv);
        }
        enter() {
            this.renderedStyles.scale.current = 1.5;
        }
        leave() {
            this.renderedStyles.scale.current = 1;
        }
        render() {
            (this.renderedStyles.tx.current = Yr.x - this.bounds.width / 2), (this.renderedStyles.ty.current = Yr.y - this.bounds.height / 2);
            for (const t in this.renderedStyles) this.renderedStyles[t].previous = o(this.renderedStyles[t].previous, this.renderedStyles[t].current, this.renderedStyles[t].amt);
            (this.DOM.el.style.transform = `translateX(${this.renderedStyles.tx.previous}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`), requestAnimationFrame(() => this.render());
        }
    }
    let Vr = a();
    window.addEventListener("resize", () => (Vr = a()));
    let Xr = { x: 0, y: 0 };
    window.addEventListener("mousemove", (t) => (Xr = u(t)));
    class Ur {
        constructor(t) {
            (this.DOM = { el: t }), (this.renderedStyles = { tx: { previous: 0, current: 0, amt: 0.1 }, ty: { previous: 0, current: 0, amt: 0.1 } }), this.calculateSizePosition(), this.initEvents();
        }
        calculateSizePosition() {
            (this.scrollVal = { x: window.scrollX, y: window.scrollY }), (this.rect = this.DOM.el.getBoundingClientRect());
        }
        initEvents() {
            window.addEventListener("resize", () => this.calculateSizePosition()),
                this.DOM.el.addEventListener("mouseenter", () => {
                    this.loopRender();
                }),
                this.DOM.el.addEventListener("mouseleave", () => {
                    this.stopRendering(), (this.renderedStyles.tx.previous = this.renderedStyles.ty.previous = 0);
                });
        }
        loopRender() {
            this.requestId || (this.requestId = requestAnimationFrame(() => this.render()));
        }
        stopRendering() {
            this.requestId && (window.cancelAnimationFrame(this.requestId), (this.requestId = void 0));
        }
        render() {
            this.requestId = void 0;
            const t = this.scrollVal.x - window.scrollX,
                e = this.scrollVal.y - window.scrollY;
            (this.renderedStyles.tx.current = 0.3 * (Xr.x - (t + this.rect.left + this.rect.width / 2))), (this.renderedStyles.ty.current = 0.3 * (Xr.y - (e + this.rect.top + this.rect.height / 2)));
            for (const t in this.renderedStyles) this.renderedStyles[t].previous = o(this.renderedStyles[t].previous, this.renderedStyles[t].current, this.renderedStyles[t].amt);
            Nr.set(this.DOM.el, { x: this.renderedStyles.tx.previous, y: this.renderedStyles.ty.previous }), this.loopRender();
        }
    }
    var Wr,
        Gr,
        Qr = {};
    (Wr = Qr),
        (Gr = function () {
            var t = document,
                e = t.createTextNode.bind(t);
            function i(t, e, i) {
                t.style.setProperty(e, i);
            }
            function r(t, e) {
                return t.appendChild(e);
            }
            function n(e, i, n, s) {
                var o = t.createElement("span");
                return i && (o.className = i), n && (!s && o.setAttribute("data-" + i, n), (o.textContent = n)), (e && r(e, o)) || o;
            }
            function s(t, e) {
                return t.getAttribute("data-" + e);
            }
            function o(e, i) {
                return e && 0 != e.length ? (e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (i || t).querySelectorAll(e))) : [];
            }
            function a(t) {
                for (var e = []; t--; ) e[t] = [];
                return e;
            }
            function u(t, e) {
                t && t.some(e);
            }
            function h(t) {
                return function (e) {
                    return t[e];
                };
            }
            var l = {};
            function c(t, e, i) {
                var r = i.indexOf(t);
                if (-1 == r)
                    i.unshift(t),
                        u(l[t].depends, function (e) {
                            c(e, t, i);
                        });
                else {
                    var n = i.indexOf(e);
                    i.splice(r, 1), i.splice(n, 0, t);
                }
                return i;
            }
            function d(t, e, i, r) {
                return { by: t, depends: e, key: i, split: r };
            }
            function f(t) {
                return c(t, 0, []).map(h(l));
            }
            function p(t) {
                l[t.by] = t;
            }
            function _(t, i, s, a, h) {
                t.normalize();
                var l = [],
                    c = document.createDocumentFragment();
                a && l.push(t.previousSibling);
                var d = [];
                return (
                    o(t.childNodes).some(function (t) {
                        if (!t.tagName || t.hasChildNodes()) {
                            if (t.childNodes && t.childNodes.length) return d.push(t), void l.push.apply(l, _(t, i, s, a, h));
                            var r = t.wholeText || "",
                                o = r.trim();
                            o.length &&
                                (" " === r[0] && d.push(e(" ")),
                                u(o.split(s), function (t, e) {
                                    e && h && d.push(n(c, "whitespace", " ", h));
                                    var r = n(c, i, t);
                                    l.push(r), d.push(r);
                                }),
                                " " === r[r.length - 1] && d.push(e(" ")));
                        } else d.push(t);
                    }),
                    u(d, function (t) {
                        r(c, t);
                    }),
                    (t.innerHTML = ""),
                    r(t, c),
                    l
                );
            }
            var m = "words",
                g = d(m, 0, "word", function (t) {
                    return _(t, "word", /\s+/, 0, 1);
                }),
                v = "chars",
                y = d(v, [m], "char", function (t, e, i) {
                    var r = [];
                    return (
                        u(i.words, function (t, i) {
                            r.push.apply(r, _(t, "char", "", e.whitespace && i));
                        }),
                        r
                    );
                });
            function w(t) {
                var e = (t = t || {}).key;
                return o(t.target || "[data-splitting]").map(function (r) {
                    var n = r["🍌"];
                    if (!t.force && n) return n;
                    n = r["🍌"] = { el: r };
                    var o = f(t.by || s(r, "splitting") || v),
                        a = (function (t, e) {
                            for (var i in e) t[i] = e[i];
                            return t;
                        })({}, t);
                    return (
                        u(o, function (t) {
                            if (t.split) {
                                var s = t.by,
                                    o = (e ? "-" + e : "") + t.key,
                                    h = t.split(r, a, n);
                                o &&
                                    (function (t, e, r) {
                                        var n = "--" + e,
                                            s = n + "-index";
                                        u(r, function (t, e) {
                                            Array.isArray(t)
                                                ? u(t, function (t) {
                                                      i(t, s, e);
                                                  })
                                                : i(t, s, e);
                                        }),
                                            i(t, n + "-total", r.length);
                                    })(r, o, h),
                                    (n[s] = h),
                                    r.classList.add(s);
                            }
                        }),
                        r.classList.add("splitting"),
                        n
                    );
                });
            }
            function x(t, e, i) {
                var r = o(e.matching || t.children, t),
                    n = {};
                return (
                    u(r, function (t) {
                        var e = Math.round(t[i]);
                        (n[e] || (n[e] = [])).push(t);
                    }),
                    Object.keys(n).map(Number).sort(b).map(h(n))
                );
            }
            function b(t, e) {
                return t - e;
            }
            (w.html = function (t) {
                var e = ((t = t || {}).target = n());
                return (e.innerHTML = t.content), w(t), e.outerHTML;
            }),
                (w.add = p);
            var O = d("lines", [m], "line", function (t, e, i) {
                    return x(t, { matching: i.words }, "offsetTop");
                }),
                M = d("items", 0, "item", function (t, e) {
                    return o(e.matching || t.children, t);
                }),
                T = d("rows", 0, "row", function (t, e) {
                    return x(t, e, "offsetTop");
                }),
                D = d("cols", 0, "col", function (t, e) {
                    return x(t, e, "offsetLeft");
                }),
                k = d("grid", ["rows", "cols"]),
                A = "layout",
                C = d(A, 0, 0, function (t, e) {
                    var a = (e.rows = +(e.rows || s(t, "rows") || 1)),
                        u = (e.columns = +(e.columns || s(t, "columns") || 1));
                    if (((e.image = e.image || s(t, "image") || t.currentSrc || t.src), e.image)) {
                        var h = o("img", t)[0];
                        e.image = h && (h.currentSrc || h.src);
                    }
                    e.image && i(t, "background-image", "url(" + e.image + ")");
                    for (var l = a * u, c = [], d = n(0, "cell-grid"); l--; ) {
                        var f = n(d, "cell");
                        n(f, "cell-inner"), c.push(f);
                    }
                    return r(t, d), c;
                }),
                S = d("cellRows", [A], "row", function (t, e, i) {
                    var r = e.rows,
                        n = a(r);
                    return (
                        u(i.layout, function (t, e, i) {
                            n[Math.floor(e / (i.length / r))].push(t);
                        }),
                        n
                    );
                }),
                E = d("cellColumns", [A], "col", function (t, e, i) {
                    var r = e.columns,
                        n = a(r);
                    return (
                        u(i.layout, function (t, e) {
                            n[e % r].push(t);
                        }),
                        n
                    );
                }),
                L = d("cells", ["cellRows", "cellColumns"], "cell", function (t, e, i) {
                    return i.layout;
                });
            return p(g), p(y), p(O), p(M), p(T), p(D), p(k), p(C), p(S), p(E), p(L), w;
        }),
        "object" == typeof Qr ? (Qr = Gr()) : (Wr.Splitting = Gr());
    t(Qr)();
    let $r = a();
    window.addEventListener("resize", () => ($r = a()));
    const Zr = document.querySelectorAll(".frame");
    class Jr {
        constructor(t, e) {
            (this.DOM = { el: t }),
                (this.itemsArr = e),
                (this.invert = this.DOM.el.classList.contains("item--invert")),
                (this.DOM.imgWrap = this.DOM.el.querySelector(".item__imgwrap")),
                (this.DOM.img = this.DOM.imgWrap.querySelector(".item__img")),
                (this.DOM.enterAction = this.DOM.el.querySelector(".item__enter")),
                (this.DOM.enterActionSVGCircle = this.DOM.enterAction.querySelector("circle")),
                Nr.set(this.DOM.enterActionSVGCircle, { transformOrigin: "50% 50%" }),
                (this.magneticFx = new Ur(this.DOM.enterAction)),
                this.editHeadingLayout(),
                (this.DOM.excerpt = this.DOM.el.querySelector(".item__excerpt")),
                (this.DOM.excerptLink = this.DOM.excerpt.querySelector(".item__excerpt-link")),
                (this.contentId = this.DOM.excerptLink.href.substring(this.DOM.excerptLink.href.lastIndexOf("#"))),
                (this.DOM.metaContent = [...this.DOM.el.querySelectorAll(".item__meta > .item__meta-row")]),
                this.editContentLayout(),
                (this.DOM.backCtrl = document.querySelector(".content__back")),
                this.initEvents();
        }
        editHeadingLayout() {
            (this.DOM.heading = this.DOM.el.querySelector(".heading--item")), (this.DOM.itemHeadingChars = [...this.DOM.heading.querySelectorAll(".char")]), h(this.DOM.itemHeadingChars, "span", "char-wrap");
        }
        editContentLayout() {
            (this.DOM.contentEl = document.querySelector(this.contentId)),
                (this.DOM.contentElHeading = this.DOM.contentEl.querySelector(".heading")),
                (this.DOM.contentHeadingChars = [...this.DOM.contentElHeading.querySelectorAll(".char")]),
                h(this.DOM.contentHeadingChars, "span", "char-wrap"),
                (this.DOM.contentElText = [...this.DOM.contentEl.querySelectorAll(".content__text > *")]);
        }
        initEvents() {
            this.DOM.enterAction.addEventListener("mouseenter", () => this.onMouseEnter()),
                this.DOM.enterAction.addEventListener("mouseleave", () => this.onMouseLeave()),
                this.DOM.enterAction.addEventListener("click", () => this.open()),
                this.DOM.excerptLink.addEventListener("mouseenter", () => this.onMouseEnter()),
                this.DOM.excerptLink.addEventListener("mouseleave", () => this.onMouseLeave()),
                this.DOM.excerptLink.addEventListener("click", () => this.open()),
                this.DOM.backCtrl.addEventListener("click", () => this.close());
        }
        onMouseEnter() {
            this.timelineHoverOut && this.timelineHoverOut.kill(),
                (this.timelineHoverIn = Nr.timeline()
                    .addLabel("start", 0)
                    .to(this.DOM.enterActionSVGCircle, { duration: 0.8, ease: "power3", scale: 1.1 }, "start")
                    .to(this.DOM.imgWrap, { duration: 0.8, ease: "power3", scale: 1.1 }, "start")
                    .to(this.DOM.img, { duration: 0.8, ease: "power3", scale: 1.1 }, "start")
                    .to(this.DOM.itemHeadingChars, { duration: 0.2, ease: "quad.in", x: this.invert ? "0" : "0", scale: 1.1}, "start")
                    .set(this.DOM.heading, { x: this.invert ? "0%" : "0%" }, "start+=0.2")
                    .to(this.DOM.itemHeadingChars, { duration: 0.7, ease: "expo", startAt: { x: this.invert ? "0" : "0", scale: 1.1 }, x: "0%" }, "start+=0.2"));
        }
        onMouseLeave() {
            this.isContentOpen ||
                (this.timelineHoverIn && this.timelineHoverIn.kill(),
                (this.timelineHoverOut = Nr.timeline()
                    .addLabel("start", 0)
                    .to(this.DOM.enterAction, { duration: 0.8, ease: "power3", x: 0, y: 0 }, "start")
                    .to(this.DOM.enterActionSVGCircle, { duration: 0.8, ease: "power3", scale: 1 }, "start")
                    .to([this.DOM.imgWrap, this.DOM.img], { duration: 0.8, ease: "power3", scale: 1 }, "start")
                    .to(this.DOM.itemHeadingChars, { duration: 0.2, ease: "quad.in", x: this.invert ? "0" : "0", scale: 1 }, "start")
                    .set(this.DOM.heading, { x: "0%" }, "start+=0.2")
                    .to(this.DOM.itemHeadingChars, { duration: 0.7, ease: "expo", startAt: { x: this.invert ? "0" : "0", scale: 1 }, x: "0%" }, "start+=0.2")));
        }
        open() {
            this.magneticFx.stopRendering(),
                this.timelineHoverIn && this.timelineHoverIn.kill(),
                this.timelineHoverClose && this.timelineHoverClose.kill(),
                (this.isContentOpen = !0),
                document.body.classList.add("oh"),
                this.DOM.contentEl.classList.add("content__article--open");
            const t = this.DOM.enterAction.getBoundingClientRect();
            this.timelineHoverOpen = Nr.timeline()
                .addLabel("start", 0)
                .set(this.DOM.contentHeadingChars, { x: this.invert ? "-103%" : "103%" }, "start")
                .set(this.DOM.contentElText, { opacity: 0, y: "0%", scale: 1 }, "start")
                .set(this.DOM.backCtrl, { scale: 0.8, opacity: 0 }, "start")
                .to([Zr, this.itemsArr.filter((t) => t != this).map((t) => t.DOM.el)], { duration: 0.6, ease: "power3", opacity: 0 }, "start")
                .to(this.DOM.enterAction, { duration: 0.8, ease: "power2", x: $r.width / 2 - t.left - t.width / 2, y: -t.top - t.height / 2 }, "start")
                .to(this.DOM.enterActionSVGCircle, { duration: 2, ease: "power2", scale: 2.3, opacity: 0, onComplete: () => Nr.set(this.DOM.enterAction, { x: 0, y: 0 }) }, "start")
                .to([this.DOM.excerpt, this.DOM.metaContent], { duration: 0.5, ease: "power4.in", y: (t) => (t ? "-100%" : "-8%"), opacity: 0, stagger: { from: "center", amount: 0.06 } }, "start")
                .to(this.DOM.imgWrap, { duration: 0.5, ease: "power3.inOut", scale: 0.9, opacity: 0 }, "start")
                .to(this.DOM.itemHeadingChars, { duration: 0.3, ease: "quad.in", x: this.invert ? "103%" : "-103%" }, "start")
                .to(this.DOM.contentHeadingChars, { duration: 1.3, ease: "expo", x: "0%", stagger: this.invert ? -0.03 : 0.03 }, "start+=0.4")
                .to(this.DOM.contentElText, { duration: 1.3, ease: "expo", y: "0%", opacity: 1, stagger: 0.03 }, "start+=0.7")
                .to(this.DOM.backCtrl, { duration: 1.3, ease: "expo", scale: 1, opacity: 1 }, "start+=1");
        }
        close() {
            this.timelineHoverOpen && this.timelineHoverOpen.kill(),
                (this.isContentOpen = !1),
                (this.timelineHoverClose = Nr.timeline()
                    .addLabel("start", 0)
                    .set(this.DOM.enterAction, { x: 0, y: 0 }, "start")
                    .to(this.DOM.backCtrl, { duration: 0.3, ease: "quad.in", scale: 0.9, opacity: 0 }, "start")
                    .set(this.DOM.enterActionSVGCircle, { scale: 0.5, opacity: 0 }, "start+=0.4")
                    .to(
                        this.DOM.enterActionSVGCircle,
                        {
                            duration: 1,
                            ease: "expo",
                            scale: 1,
                            opacity: 1,
                            onComplete: () => {
                                this.DOM.contentEl.classList.remove("content__article--open"), document.body.classList.remove("oh"), (this.DOM.contentEl.scrollTop = 0);
                            },
                        },
                        "start+=0.4"
                    )
                    .to(this.DOM.contentHeadingChars, { duration: 0.3, ease: "quad.in", x: this.invert ? "-103%" : "103%" }, "start")
                    .to(this.DOM.itemHeadingChars, { duration: 1.3, ease: "expo", x: "0%", stagger: this.invert ? 0.01 : -0.01 }, "start+=0.4")
                    .to(this.DOM.contentElText, { duration: 0.5, ease: "power4.in", opacity: 0, y: "0%" }, "start")
                    .to(this.DOM.imgWrap, { duration: 0.8, ease: "power3", scale: 1, opacity: 1 }, "start+=0.4")
                    .to([this.DOM.excerpt, this.DOM.metaContent], { duration: 1.3, ease: "expo", y: "0%", opacity: 1, stagger: { from: "center", amount: 0.06 } }, "start+=0.4")
                    .to([Zr, this.itemsArr.filter((t) => t != this).map((t) => t.DOM.el)], { duration: 0.6, ease: "power3", opacity: 1 }, "start+=0.4"));
        }
    }
    var Kr;
    Promise.all([
        ((t = "img") =>
            new Promise((e) => {
                s(document.querySelectorAll(t), { background: !0 }, e);
            }))(".item__img, .content__img"),
        ((Kr = "ytb6dpl"),
        new Promise((t) => {
            WebFont.load({ typekit: { id: Kr }, active: t });
        })),
    ]).then(() => {
        document.body.classList.remove("loading");
        const t = new jr(document.querySelector(".cursor"));
        let e = [];
        [...document.querySelectorAll(".items > .item")].forEach((t) => e.push(new Jr(t, e))),
            [...document.querySelectorAll("a, .unbutton")].forEach((e) => {
                e.addEventListener("mouseenter", () => t.enter()), e.addEventListener("mouseleave", () => t.leave());
            });
    });
})();
