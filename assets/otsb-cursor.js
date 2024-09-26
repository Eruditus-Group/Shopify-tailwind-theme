if(window?.otsb?.loadedScript||(window.otsb={loadedScript:[]}),!window.otsb.loadedScript.includes('otsb-gif-cursor')){window.otsb.loadedScript.push('otsb-gif-cursor'),
"use strict";
(() => {
  var Pt = Object.create;
  var wt = Object.defineProperty;
  var Tt = Object.getOwnPropertyDescriptor;
  var St = Object.getOwnPropertyNames;
  var Bt = Object.getPrototypeOf, Lt = Object.prototype.hasOwnProperty;
  var jt = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
  var Dt = (i, t, e, r) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let s of St(t))
        !Lt.call(i, s) && s !== e && wt(i, s, { get: () => t[s], enumerable: !(r = Tt(t, s)) || r.enumerable });
    return i;
  };
  var _t = (i, t, e) => (e = i != null ? Pt(Bt(i)) : {}, Dt(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    t || !i || !i.__esModule ? wt(e, "default", { value: i, enumerable: !0 }) : e,
    i
  ));

  // node_modules/omggif/omggif.js
  var bt = jt((dt) => {
    "use strict";
    function kt(i, t, e, o) {
      var s = 0, o = o === void 0 ? {} : o, n = o.loop === void 0 ? null : o.loop, a = o.palette === void 0 ? null : o.palette;
      if (t <= 0 || e <= 0 || t > 65535 || e > 65535)
        throw new Error("Width/Height invalid.");
      function c(p) {
        var l = p.length;
        if (l < 2 || l > 256 || l & l - 1)
          throw new Error(
            "Invalid code/color length, must be power of 2 and 2 .. 256."
          );
        return l;
      }
      i[s++] = 71, i[s++] = 73, i[s++] = 70, i[s++] = 56, i[s++] = 57, i[s++] = 97;
      var d = 0, h = 0;
      if (a !== null) {
        for (var m = c(a); m >>= 1; ) ++d;
        if (m = 1 << d, --d, o.background !== void 0) {
          if (h = o.background, h >= m)
            throw new Error("Background index out of range.");
          if (h === 0)
            throw new Error("Background index explicitly passed as 0.");
        }
      }
      if (i[s++] = t & 255, i[s++] = t >> 8 & 255, i[s++] = e & 255, i[s++] = e >> 8 & 255, i[s++] = (a !== null ? 128 : 0) | // Global Color Table Flag.
      d, i[s++] = h, i[s++] = 0, a !== null)
        for (var A = 0, f = a.length; A < f; ++A) {
          var y = a[A];
          i[s++] = y >> 16 & 255, i[s++] = y >> 8 & 255, i[s++] = y & 255;
        }
      if (n !== null) {
        if (n < 0 || n > 65535)
          throw new Error("Loop count invalid.");
        i[s++] = 33, i[s++] = 255, i[s++] = 11, i[s++] = 78, i[s++] = 69, i[s++] = 84, i[s++] = 83, i[s++] = 67, i[s++] = 65, i[s++] = 80, i[s++] = 69, i[s++] = 50, i[s++] = 46, i[s++] = 48, i[s++] = 3, i[s++] = 1, i[s++] = n & 255, i[s++] = n >> 8 & 255, i[s++] = 0;
      }
      var w = !1;
      this.addFrame = function(p, l, b, g, P, x) {
        if (w === !0 && (--s, w = !1), x = x === void 0 ? {} : x, p < 0 || l < 0 || p > 65535 || l > 65535)
          throw new Error("x/y invalid.");
        if (b <= 0 || g <= 0 || b > 65535 || g > 65535)
          throw new Error("Width/Height invalid.");
        if (P.length < b * g)
          throw new Error("Not enough pixels for the frame size.");
        var D = !0, M = x.palette;
        if (M == null && (D = !1, M = a), M == null)
          throw new Error("Must supply either a local or global palette.");
        for (var G = c(M), _ = 0; G >>= 1; ) ++_;
        G = 1 << _;
        var Q = x.delay === void 0 ? 0 : x.delay, k = x.disposal === void 0 ? 0 : x.disposal;
        if (k < 0 || k > 3)
          throw new Error("Disposal out of range.");
        var U = !1, R = 0;
        if (x.transparent !== void 0 && x.transparent !== null && (U = !0, R = x.transparent, R < 0 || R >= G))
          throw new Error("Transparent color index.");
        if ((k !== 0 || U || Q !== 0) && (i[s++] = 33, i[s++] = 249, i[s++] = 4, i[s++] = k << 2 | (U === !0 ? 1 : 0), i[s++] = Q & 255, i[s++] = Q >> 8 & 255, i[s++] = R, i[s++] = 0), i[s++] = 44, i[s++] = p & 255, i[s++] = p >> 8 & 255, i[s++] = l & 255, i[s++] = l >> 8 & 255, i[s++] = b & 255, i[s++] = b >> 8 & 255, i[s++] = g & 255, i[s++] = g >> 8 & 255, i[s++] = D === !0 ? 128 | _ - 1 : 0, D === !0)
          for (var Z = 0, ot = M.length; Z < ot; ++Z) {
            var T = M[Z];
            i[s++] = T >> 16 & 255, i[s++] = T >> 8 & 255, i[s++] = T & 255;
          }
        return s = Rt(
          i,
          s,
          _ < 2 ? 2 : _,
          P
        ), s;
      }, this.end = function() {
        return w === !1 && (i[s++] = 59, w = !0), s;
      }, this.getOutputBuffer = function() {
        return i;
      }, this.setOutputBuffer = function(p) {
        i = p;
      }, this.getOutputBufferPosition = function() {
        return s;
      }, this.setOutputBufferPosition = function(p) {
        s = p;
      };
    }
    function Rt(i, t, e, r) {
      i[t++] = e;
      var s = t++, o = 1 << e, n = o - 1, a = o + 1, c = a + 1, d = e + 1, h = 0, m = 0;
      function A(x) {
        for (; h >= x; )
          i[t++] = m & 255, m >>= 8, h -= 8, t === s + 256 && (i[s] = 255, s = t++);
      }
      function f(x) {
        m |= x << h, h += d, A(8);
      }
      var y = r[0] & n, w = {};
      f(o);
      for (var p = 1, l = r.length; p < l; ++p) {
        var b = r[p] & n, g = y << 8 | b, P = w[g];
        if (P === void 0) {
          for (m |= y << h, h += d; h >= 8; )
            i[t++] = m & 255, m >>= 8, h -= 8, t === s + 256 && (i[s] = 255, s = t++);
          c === 4096 ? (f(o), c = a + 1, d = e + 1, w = {}) : (c >= 1 << d && ++d, w[g] = c++), y = b;
        } else
          y = P;
      }
      return f(y), f(a), A(1), s + 1 === t ? i[s] = 0 : (i[s] = t - s - 1, i[t++] = 0), t;
    }
    function Ft(i) {
      var t = 0;
      if (i[t++] !== 71 || i[t++] !== 73 || i[t++] !== 70 || i[t++] !== 56 || (i[t++] + 1 & 253) !== 56 || i[t++] !== 97)
        throw new Error("Invalid GIF 87a/89a header.");
      var e = i[t++] | i[t++] << 8, r = i[t++] | i[t++] << 8, s = i[t++], o = s >> 7, n = s & 7, a = 1 << n + 1, c = i[t++];
      i[t++];
      var d = null, h = null;
      o && (d = t, h = a, t += a * 3);
      var m = !0, A = [], f = 0, y = null, w = 0, p = null;
      for (this.width = e, this.height = r; m && t < i.length; )
        switch (i[t++]) {
          case 33:
            switch (i[t++]) {
              case 255:
                if (i[t] !== 11 || // 21 FF already read, check block size.
                // NETSCAPE2.0
                i[t + 1] == 78 && i[t + 2] == 69 && i[t + 3] == 84 && i[t + 4] == 83 && i[t + 5] == 67 && i[t + 6] == 65 && i[t + 7] == 80 && i[t + 8] == 69 && i[t + 9] == 50 && i[t + 10] == 46 && i[t + 11] == 48 && // Sub-block
                i[t + 12] == 3 && i[t + 13] == 1 && i[t + 16] == 0)
                  t += 14, p = i[t++] | i[t++] << 8, t++;
                else
                  for (t += 12; ; ) {
                    var l = i[t++];
                    if (!(l >= 0)) throw Error("Invalid block size");
                    if (l === 0) break;
                    t += l;
                  }
                break;
              case 249:
                if (i[t++] !== 4 || i[t + 4] !== 0)
                  throw new Error("Invalid graphics extension block.");
                var b = i[t++];
                f = i[t++] | i[t++] << 8, y = i[t++], b & 1 || (y = null), w = b >> 2 & 7, t++;
                break;
              case 254:
                for (; ; ) {
                  var l = i[t++];
                  if (!(l >= 0)) throw Error("Invalid block size");
                  if (l === 0) break;
                  t += l;
                }
                break;
              default:
                throw new Error(
                  "Unknown graphic control label: 0x" + i[t - 1].toString(16)
                );
            }
            break;
          case 44:
            var g = i[t++] | i[t++] << 8, P = i[t++] | i[t++] << 8, x = i[t++] | i[t++] << 8, D = i[t++] | i[t++] << 8, M = i[t++], G = M >> 7, _ = M >> 6 & 1, Q = M & 7, k = 1 << Q + 1, U = d, R = h, Z = !1;
            if (G) {
              var Z = !0;
              U = t, R = k, t += k * 3;
            }
            var ot = t;
            for (t++; ; ) {
              var l = i[t++];
              if (!(l >= 0)) throw Error("Invalid block size");
              if (l === 0) break;
              t += l;
            }
            A.push({
              x: g,
              y: P,
              width: x,
              height: D,
              has_local_palette: Z,
              palette_offset: U,
              palette_size: R,
              data_offset: ot,
              data_length: t - ot,
              transparent_index: y,
              interlaced: !!_,
              delay: f,
              disposal: w
            });
            break;
          case 59:
            m = !1;
            break;
          default:
            throw new Error("Unknown gif block: 0x" + i[t - 1].toString(16));
        }
      this.numFrames = function() {
        return A.length;
      }, this.loopCount = function() {
        return p;
      }, this.frameInfo = function(T) {
        if (T < 0 || T >= A.length)
          throw new Error("Frame index out of range.");
        return A[T];
      }, this.decodeAndBlitFrameBGRA = function(T, S) {
        var u = this.frameInfo(T), J = u.width * u.height, F = new Uint8Array(J);
        Et(
          i,
          u.data_offset,
          F,
          J
        );
        var H = u.palette_offset, O = u.transparent_index;
        O === null && (O = 256);
        var B = u.width, Y = e - B, W = B, K = (u.y * e + u.x) * 4, nt = ((u.y + u.height) * e + u.x) * 4, E = K, z = Y * 4;
        u.interlaced === !0 && (z += e * 4 * 7);
        for (var V = 8, X = 0, at = F.length; X < at; ++X) {
          var L = F[X];
          if (W === 0 && (E += z, W = B, E >= nt && (z = Y * 4 + e * 4 * (V - 1), E = K + (B + Y) * (V << 1), V >>= 1)), L === O)
            E += 4;
          else {
            var ht = i[H + L * 3], ct = i[H + L * 3 + 1], lt = i[H + L * 3 + 2];
            S[E++] = lt, S[E++] = ct, S[E++] = ht, S[E++] = 255;
          }
          --W;
        }
      }, this.decodeAndBlitFrameRGBA = function(T, S) {
        var u = this.frameInfo(T), J = u.width * u.height, F = new Uint8Array(J);
        Et(
          i,
          u.data_offset,
          F,
          J
        );
        var H = u.palette_offset, O = u.transparent_index;
        O === null && (O = 256);
        var B = u.width, Y = e - B, W = B, K = (u.y * e + u.x) * 4, nt = ((u.y + u.height) * e + u.x) * 4, E = K, z = Y * 4;
        u.interlaced === !0 && (z += e * 4 * 7);
        for (var V = 8, X = 0, at = F.length; X < at; ++X) {
          var L = F[X];
          if (W === 0 && (E += z, W = B, E >= nt && (z = Y * 4 + e * 4 * (V - 1), E = K + (B + Y) * (V << 1), V >>= 1)), L === O)
            E += 4;
          else {
            var ht = i[H + L * 3], ct = i[H + L * 3 + 1], lt = i[H + L * 3 + 2];
            S[E++] = ht, S[E++] = ct, S[E++] = lt, S[E++] = 255;
          }
          --W;
        }
      };
    }
    function Et(i, t, e, r) {
      for (var s = i[t++], o = 1 << s, n = o + 1, a = n + 1, c = s + 1, d = (1 << c) - 1, h = 0, m = 0, A = 0, f = i[t++], y = new Int32Array(4096), w = null; ; ) {
        for (; h < 16 && f !== 0; )
          m |= i[t++] << h, h += 8, f === 1 ? f = i[t++] : --f;
        if (h < c)
          break;
        var p = m & d;
        if (m >>= c, h -= c, p === o) {
          a = n + 1, c = s + 1, d = (1 << c) - 1, w = null;
          continue;
        } else if (p === n)
          break;
        for (var l = p < a ? p : w, b = 0, g = l; g > o; )
          g = y[g] >> 8, ++b;
        var P = g, x = A + b + (l !== p ? 1 : 0);
        if (x > r) {
          console.log("Warning, gif stream longer than expected.");
          return;
        }
        e[A++] = P, A += b;
        var D = A;
        for (l !== p && (e[A++] = P), g = l; b--; )
          g = y[g], e[--D] = g & 255, g >>= 8;
        w !== null && a < 4096 && (y[a++] = w << 8 | P, a >= d + 1 && c < 12 && (++c, d = d << 1 | 1)), w = p;
      }
      return A !== r && console.log("Warning, gif stream shorter than expected."), e;
    }
    try {
      dt.GifWriter = kt, dt.GifReader = Ft;
    } catch {
    }
  });

  // main.ts
  var It = _t(bt());

  // lib/css-animation.ts
  var Ht = (i) => `otsbCursorAnim__${i}`;
  function Ct(i, t, e) {
    e || (e = i);
    let r = Ht(e), s = t.reduce((o, n) => o + n.delay, 0);
    return `@keyframes ${r}{${t.map((o, n) => `${n * 100 / t.length}%{cursor:url(${o.image}),auto}`).join("")} 100%{cursor:url(${t[0].image}),auto}}${i}:hover{animation:${r} ${s}ms step-end infinite;}`;
  }

  // lib/otsb-cursor.ts
  var v = class {
    constructor(t) {
      this.context = null;
      this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.id = t && t.id, this.prefersReducedMotion.onchange = this.onPrefersReducedMotionChange.bind(this), this.width = window.innerWidth, this.height = window.innerHeight, this.cursor = { x: this.width / 2, y: this.height / 2 }, this.lastPos = { x: this.width / 2, y: this.height / 2 }, this.wrapperEl = t && t.element || document.body, this.hasWrapperEl = !!(t && t.element);
      let e = this;
      this.onMouseMoveHandler = function(r) {
        e.onMouseMove(r);
      }, this.onTouchMoveHandler = function(r) {
        e.onTouchMove(r);
      }, this.onWindowResizeHandler = function() {
        e.onWindowResize();
      };
    }
    /**
     * Destroy the cursor
     */
    destroy() {
      this.tickId && (cancelAnimationFrame(this.tickId), this.tickId = void 0), this.canvas && (this.canvas.remove(), this.canvas = void 0), this.wrapperEl.removeEventListener("mousemove", this.onMouseMoveHandler), this.wrapperEl.removeEventListener("touchmove", this.onTouchMoveHandler), this.wrapperEl.removeEventListener("touchstart", this.onTouchMoveHandler), window.removeEventListener("resize", this.onWindowResizeHandler);
    }
    tick() {
      this.onTick(), this.tickId = requestAnimationFrame(this.tick.bind(this));
    }
    /**
     * // Re-initialise or destroy the cursor when the prefers-reduced-motion setting changes
     * @private
     */
    onPrefersReducedMotionChange() {
      this.prefersReducedMotion.matches ? this.destroy() : this.init();
    }
    init() {
      if (this.prefersReducedMotion.matches) {
        console.log(
          "This browser has prefers reduced motion turned on, so the cursor did not init"
        );
        return;
      }
      this.initCanvas(), this.onInit(), this.bindEvents();
    }
    onWindowResize() {
      this.width = window.innerWidth, this.height = window.innerHeight, this.hasWrapperEl ? (this.canvas.width = this.wrapperEl.clientWidth, this.canvas.height = this.wrapperEl.clientHeight) : (this.canvas.width = this.width, this.canvas.height = this.height);
    }
    initCanvas() {
      if (this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context === null)
        throw new Error("Unable to get 2d context");
      this.id && this.canvas.setAttribute("id", `otsb_cursor_${this.id}_canvas`), this.canvas.style.top = "0px", this.canvas.style.left = "0px", this.canvas.style.pointerEvents = "none", this.canvas.style.zIndex = "99999", this.hasWrapperEl ? (this.canvas.style.position = "absolute", this.wrapperEl.appendChild(this.canvas), this.canvas.width = this.wrapperEl.clientWidth, this.canvas.height = this.wrapperEl.clientHeight) : (this.canvas.style.position = "fixed", this.wrapperEl.appendChild(this.canvas), this.canvas.width = this.width, this.canvas.height = this.height);
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler), this.wrapperEl.addEventListener("touchmove", this.onTouchMoveHandler, { passive: !0 }), this.wrapperEl.addEventListener("touchstart", this.onTouchMoveHandler, { passive: !0 }), window.addEventListener("resize", this.onWindowResizeHandler);
    }
    updateCursorPosition(t) {
      if (this.hasWrapperEl) {
        let e = this.wrapperEl.getBoundingClientRect();
        this.cursor.x = t.x - e.left, this.cursor.y = t.y - e.top;
      } else
        this.cursor.x = t.x, this.cursor.y = t.y;
    }
    static create(t) {
      let e = new this(t);
      return e.init(), e.tick(), e;
    }
  };

  // lib/fairyDustCursor.ts
  var pt = class {
    constructor(t, e, r) {
      this.canvasItem = r, this.lifeSpan = Math.floor(Math.random() * 30 + 60), this.initialLifeSpan = this.lifeSpan, this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: Math.random() * 0.7 + 0.9
      }, this.position = { x: t, y: e };
    }
    getLifeSpan() {
      return this.lifeSpan;
    }
    update(t) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.y += 0.02;
      let e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      t.drawImage(
        this.canvasItem,
        this.position.x - this.canvasItem.width / 2 * e,
        this.position.y - this.canvasItem.height / 2,
        this.canvasItem.width * e,
        this.canvasItem.height * e
      );
    }
  }, q = class extends v {
    constructor(e) {
      super(e);
      this.particles = [];
      this.possibleColors = e && e.colors || [
        "#D61C59",
        "#E7D84B",
        "#1B8798"
      ], this.char = "*", this.fairyDust = [];
    }
    onInit() {
      if (this.context === null)
        throw new Error("Unable to get 2d context");
      this.context.font = "21px serif", this.context.textBaseline = "middle", this.context.textAlign = "center", this.possibleColors.forEach((e) => {
        let r = this.context.measureText(this.char), s = document.createElement("canvas"), o = s.getContext("2d");
        if (o === null)
          throw new Error("Unable to get 2d context");
        s.width = r.width, s.height = r.actualBoundingBoxAscent + r.actualBoundingBoxDescent, o.fillStyle = e, o.textAlign = "center", o.font = "21px serif", o.textBaseline = "middle", o.fillText(
          this.char,
          s.width / 2,
          r.actualBoundingBoxAscent
        ), this.fairyDust.push(s);
      });
    }
    addParticle(e, r, s) {
      this.particles.push(new pt(e, r, s));
    }
    onMouseMove(e) {
      window.requestAnimationFrame(() => {
        this.updateCursorPosition({ x: e.clientX, y: e.clientY }), Math.hypot(
          this.cursor.x - this.lastPos.x,
          this.cursor.y - this.lastPos.y
        ) > 1.5 && (this.addParticle(
          this.cursor.x,
          this.cursor.y,
          this.fairyDust[Math.floor(Math.random() * this.possibleColors.length)]
        ), this.lastPos.x = this.cursor.x, this.lastPos.y = this.cursor.y);
      });
    }
    onTouchMove(e) {
      if (e.touches.length > 0)
        for (let r = 0; r < e.touches.length; r++)
          this.addParticle(
            e.touches[r].clientX,
            e.touches[r].clientY,
            this.fairyDust[Math.floor(Math.random() * this.fairyDust.length)]
          );
    }
    updateParticles() {
      if (this.particles.length != 0) {
        if (this.context === null) return !1;
        this.context.clearRect(0, 0, this.width, this.height);
        for (let e = 0; e < this.particles.length; e++)
          this.particles[e].update(this.context);
        for (let e = this.particles.length - 1; e >= 0; e--)
          this.particles[e].getLifeSpan() < 0 && this.particles.splice(e, 1);
        this.particles.length == 0 && this.context.clearRect(0, 0, this.width, this.height);
      }
    }
    onTick() {
      this.updateParticles();
    }
  };

  // lib/ghostCursor.ts
  var ut = class {
    constructor(t, e, r, s) {
      this.initialLifeSpan = s, this.lifeSpan = s, this.position = { x: t, y: e }, this.image = r;
    }
    update(t) {
      this.lifeSpan--, t.globalAlpha = Math.max(this.lifeSpan / this.initialLifeSpan, 0), t.drawImage(
        this.image,
        this.position.x,
        this.position.y
      );
    }
    getLifeSpan() {
      return this.lifeSpan;
    }
  }, $ = class extends v {
    constructor(t) {
      super(t), this.randomDelay = t && t.randomDelay, this.minDelay = t && t.minDelay || 5, this.maxDelay = t && t.maxDelay || 50, this.lifeSpan = t && t.lifeSpan || 40, this.lastTimeParticleAdded = Date.now(), this.interval = this.getDelay(), this.ghosts = [], this.baseImage = new Image(), t && t.image ? this.baseImage.src = t.image : this.baseImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==";
    }
    onInit() {
    }
    onTick() {
      this.updateParticles();
    }
    updateParticles() {
      if (this.ghosts.length !== 0 && this.context !== null) {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let t = 0; t < this.ghosts.length; t++)
          this.ghosts[t].update(this.context);
        for (let t = this.ghosts.length - 1; t >= 0; t--)
          this.ghosts[t].getLifeSpan() < 0 && this.ghosts.splice(t, 1);
      }
    }
    getDelay() {
      return Math.floor(Math.random() * (this.maxDelay - this.minDelay + 1)) + this.minDelay;
    }
    addParticle(t, e) {
      this.ghosts.push(new ut(t.x, t.y, e, this.lifeSpan));
    }
    onMouseMove(t) {
      if (this.randomDelay) {
        if (this.lastTimeParticleAdded + this.interval > Date.now()) return;
        this.lastTimeParticleAdded = Date.now(), this.interval = this.getDelay();
      }
      this.updateCursorPosition({ x: t.clientX, y: t.clientY }), this.addParticle(this.cursor, this.baseImage);
    }
    onTouchMove(t) {
      if (t.touches.length > 0)
        for (let e = 0; e < t.touches.length; e++)
          this.addParticle({ x: t.touches[e].clientX, y: t.touches[e].clientY }, this.baseImage);
    }
  };

  // lib/emojiCursor.ts
  var mt = class {
    constructor(t, e, r) {
      this.position = { x: t, y: e }, this.canvasItem = r;
      let s = Math.floor(Math.random() * 60 + 80);
      this.lifeSpan = s, this.initialLifeSpan = s, this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: Math.random() * 0.4 + 0.8
      };
    }
    update(t) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.y += 0.05;
      let e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      t.drawImage(
        this.canvasItem,
        this.position.x - this.canvasItem.width / 2 * e,
        this.position.y - this.canvasItem.height / 2,
        this.canvasItem.width * e,
        this.canvasItem.height * e
      );
    }
    getLifeSpan() {
      return this.lifeSpan;
    }
  }, C = class extends v {
    constructor(t) {
      super(t), this.possibleEmoji = t && t.emoji || ["\u{1F600}", "\u{1F602}", "\u{1F606}", "\u{1F60A}", "\u{1F60D}", "\u{1F60E}", "\u{1F61C}"], this.lastTimestamp = 0, this.emojis = [], this.emojiCanvas = [];
    }
    onInit() {
      if (this.context === null) throw new Error("otsb error");
      this.context.font = "21px serif", this.context.textBaseline = "middle", this.context.textAlign = "center", this.possibleEmoji.forEach((t) => {
        let e = this.context.measureText(t), r = document.createElement("canvas"), s = r.getContext("2d");
        if (s === null) throw new Error("otsb error");
        r.width = e.width, r.height = e.actualBoundingBoxAscent * 2, s.textAlign = "center", s.font = "21px serif", s.textBaseline = "middle", s.fillText(t, r.width / 2, e.actualBoundingBoxAscent), this.emojiCanvas.push(r);
      });
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler, { passive: !0 }), this.wrapperEl.addEventListener("touchmove", this.onTouchMoveHandler, { passive: !0 }), this.wrapperEl.addEventListener("touchstart", this.onTouchMoveHandler, { passive: !0 }), window.addEventListener("resize", this.onWindowResizeHandler);
    }
    onMouseMove(t) {
      t.timeStamp - this.lastTimestamp < 16 || window.requestAnimationFrame(() => {
        this.updateCursorPosition({ x: t.clientX, y: t.clientY }), Math.hypot(
          this.cursor.x - this.lastPos.x,
          this.cursor.y - this.lastPos.y
        ) > 1 && (this.addParticle(this.cursor, this.emojiCanvas[Math.floor(Math.random() * this.possibleEmoji.length)]), this.lastPos.x = this.cursor.x, this.lastPos.y = this.cursor.y, this.lastTimestamp = t.timeStamp);
      });
    }
    onTouchMove(t) {
      if (!(t.touches.length <= 0))
        for (let e = 0; e < t.touches.length; e++)
          this.addParticle(
            { x: t.touches[e].clientX, y: t.touches[e].clientY },
            this.emojiCanvas[Math.floor(Math.random() * this.emojiCanvas.length)]
          );
    }
    addParticle(t, e) {
      this.emojis.push(new mt(t.x, t.y, e));
    }
    onTick() {
      this.updateParticles();
    }
    updateParticles() {
      if (this.emojis.length !== 0 && this.context !== null) {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let t = 0; t < this.emojis.length; t++)
          this.emojis[t].update(this.context);
        for (let t = this.emojis.length - 1; t >= 0; t--)
          this.emojis[t].getLifeSpan() < 0 && this.emojis.splice(t, 1);
        this.emojis.length === 0 && this.context.clearRect(0, 0, this.width, this.height);
      }
    }
  };

  // lib/followingDotCursor.ts
  var vt = class {
    constructor(t, e, r, s, o) {
      this.position = { x: t, y: e }, this.width = r, this.lag = s, this.color = o;
    }
    moveTowards(t, e, r) {
      this.position.x += (t - this.position.x) / this.lag, this.position.y += (e - this.position.y) / this.lag, r.fillStyle = this.color, r.beginPath(), r.arc(this.position.x, this.position.y, this.width, 0, Math.PI * 2), r.fill(), r.closePath();
    }
  }, j = class extends v {
    constructor(t) {
      super(t), this.color = t?.color || "#f2f2f2A6", this.isUserInteracted = !1;
    }
    onInit() {
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler), window.addEventListener("resize", this.onWindowResizeHandler);
    }
    onMouseMove(t) {
      this.updateCursorPosition({ x: t.clientX, y: t.clientY }), this.dot || (this.isUserInteracted = !0, this.dot = new vt(t.clientX, t.clientY, 10, 10, this.color));
    }
    onTouchMove(t) {
    }
    onTick() {
      this.updateDot();
    }
    updateDot() {
      if (!(!this.isUserInteracted || !this.dot)) {
        if (this.context === null) throw new Error("otsb error");
        this.context.clearRect(0, 0, this.width, this.height), this.dot.moveTowards(this.cursor.x, this.cursor.y, this.context);
      }
    }
    destroy() {
      this.tickId && (window.cancelAnimationFrame(this.tickId), this.tickId = void 0), this.canvas && (this.canvas.remove(), this.canvas = void 0), this.wrapperEl.removeEventListener("mousemove", this.onMouseMoveHandler), window.removeEventListener("resize", this.onWindowResizeHandler);
    }
  };

  // lib/bubbleCursor.ts
  var At = class {
    constructor(t, e, r) {
      let s = Math.floor(Math.random() * 60 + 60);
      this.initialLifeSpan = s, this.lifeSpan = s, this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
        y: -0.4 + Math.random() * -1
      }, this.position = { x: t, y: e }, this.canvasItem = r, this.baseDimension = 4;
    }
    getLifeSpan() {
      return this.lifeSpan;
    }
    update(t) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75, this.velocity.y -= Math.random() / 600, this.lifeSpan--;
      let e = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
      t.fillStyle = "#e6f1f7", t.strokeStyle = "#3a92c5", t.beginPath(), t.arc(
        this.position.x - this.baseDimension / 2 * e,
        this.position.y - this.baseDimension / 2,
        this.baseDimension * e,
        0,
        2 * Math.PI
      ), t.stroke(), t.fill(), t.closePath();
    }
  }, tt = class extends v {
    constructor(t) {
      super(t), this.bubbles = [], this.bubbleCanvas = [];
    }
    onTick() {
      this.updateBubbles();
    }
    onInit() {
    }
    onTouchMove(t) {
      if (!(t.touches.length <= 0))
        for (let e = 0; e < t.touches.length; e++)
          this.addBubble(t.touches[e].clientX, t.touches[e].clientY);
    }
    onMouseMove(t) {
      this.updateCursorPosition({ x: t.clientX, y: t.clientY }), this.addBubble(this.cursor.x, this.cursor.y);
    }
    addBubble(t, e, r) {
      this.bubbles.push(new At(t, e, r));
    }
    updateBubbles() {
      if (this.bubbles.length !== 0 && this.context !== null) {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let t = 0; t < this.bubbles.length; t++)
          this.bubbles[t].update(this.context);
        for (let t = this.bubbles.length - 1; t >= 0; t--)
          this.bubbles[t].getLifeSpan() < 0 && this.bubbles.splice(t, 1);
        this.bubbles.length == 0 && this.context.clearRect(0, 0, this.width, this.height);
      }
    }
  };

  // lib/springyEmojiCursor.ts
  var ft = class {
    constructor(t, e, r) {
      this.canvasImage = r, this.position = { x: t, y: e }, this.velocity = { x: 0, y: 0 };
    }
    draw(t) {
      t.drawImage(
        this.canvasImage,
        this.position.x - this.canvasImage.width / 2,
        this.position.y - this.canvasImage.height / 2,
        this.canvasImage.width,
        this.canvasImage.height
      );
    }
    setPosition(t, e) {
      this.position.x = t, this.position.y = e;
    }
    setVelocity(t, e) {
      this.velocity.x = t, this.velocity.y = e;
    }
    getPosition() {
      return this.position;
    }
    getVelocity() {
      return this.velocity;
    }
  }, et = class {
    constructor(t, e) {
      this.X = t, this.Y = e;
    }
  }, N = class extends v {
    constructor(e) {
      super(e);
      this.nDots = 7;
      this.DELTAT = 0.01;
      this.SEGLEN = 10;
      this.SPRINGK = 10;
      this.MASS = 1;
      this.GRAVITY = 50;
      this.RESISTANCE = 10;
      this.STOPVEL = 0.1;
      this.STOPACC = 0.1;
      this.DOTSIZE = 11;
      this.BOUNCE = 0.7;
      this.created = !1;
      this.emoji = e?.emoji || "\u{1F92A}", this.emojies = [];
    }
    onInit() {
    }
    createSpring() {
      if (this.created) return;
      if (this.context === null) throw new Error("otsb error");
      this.created = !0, this.context.font = "16px serif", this.context.textBaseline = "middle", this.context.textAlign = "center";
      let e = this.context.measureText(this.emoji);
      this.emojiAsImage = document.createElement("canvas");
      let r = this.emojiAsImage.getContext("2d");
      if (r === null) throw new Error("otsb error");
      this.emojiAsImage.width = e.width, this.emojiAsImage.height = e.actualBoundingBoxAscent * 2, r.textAlign = "center", r.font = "16px serif", r.textBaseline = "middle", r.fillText(
        this.emoji,
        this.emojiAsImage.width / 2,
        e.actualBoundingBoxAscent
      );
      for (let s = 0; s < this.nDots; s++)
        this.emojies[s] = new ft(this.cursor.x, this.cursor.y, this.emojiAsImage);
    }
    onTouchMove(e) {
      e.touches.length <= 0 || (this.updateCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY }), this.createSpring());
    }
    onMouseMove(e) {
      this.updateCursorPosition({ x: e.clientX, y: e.clientY }), this.createSpring();
    }
    onTick() {
      this.updateEmojiParticles();
    }
    updateEmojiParticles() {
      if (!(!this.canvas || !this.context || this.emojies.length === 0)) {
        this.canvas.width *= 1, this.emojies[0].setPosition(this.cursor.x, this.cursor.y);
        for (let e = 1; e < this.nDots; e++) {
          let r = new et(0, 0);
          e > 0 && this.springForce(e - 1, e, r), e < this.nDots - 1 && this.springForce(e + 1, e, r);
          let s = new et(
            -this.emojies[e].getVelocity().x * this.RESISTANCE,
            -this.emojies[e].getVelocity().y * this.RESISTANCE
          ), o = new et(
            (r.X + s.X) / this.MASS,
            (r.Y + s.Y) / this.MASS + this.GRAVITY
          );
          this.emojies[e].setVelocity(
            this.emojies[e].getVelocity().x + this.DELTAT * o.X,
            this.emojies[e].getVelocity().y + this.DELTAT * o.Y
          ), Math.abs(this.emojies[e].getVelocity().x) < this.STOPVEL && Math.abs(this.emojies[e].getVelocity().y) < this.STOPVEL && Math.abs(o.X) < this.STOPACC && Math.abs(o.Y) < this.STOPACC && this.emojies[e].setVelocity(0, 0), this.emojies[e].setPosition(
            this.emojies[e].getPosition().x + this.emojies[e].getVelocity().x,
            this.emojies[e].getPosition().y + this.emojies[e].getVelocity().y
          );
          let n = this.canvas.width, a = this.canvas.height;
          this.emojies[e].getPosition().y >= a - this.DOTSIZE - 1 && (this.emojies[e].getVelocity().y > 0 && this.emojies[e].setVelocity(
            this.emojies[e].getVelocity().x,
            this.BOUNCE * -this.emojies[e].getVelocity().y
          ), this.emojies[e].setPosition(
            this.emojies[e].getPosition().x,
            a - this.DOTSIZE - 1
          )), this.emojies[e].getPosition().x >= n - this.DOTSIZE && (this.emojies[e].getVelocity().x > 0 && this.emojies[e].setVelocity(
            this.BOUNCE * -this.emojies[e].getVelocity().x,
            this.emojies[e].getVelocity().y
          ), this.emojies[e].setPosition(
            n - this.DOTSIZE - 1,
            this.emojies[e].getPosition().y
          )), this.emojies[e].getPosition().x < 0 && (this.emojies[e].getVelocity().x < 0 && this.emojies[e].setVelocity(
            this.BOUNCE * -this.emojies[e].getVelocity().x,
            this.emojies[e].getVelocity().y
          ), this.emojies[e].setPosition(0, this.emojies[e].getPosition().y)), this.emojies[e].draw(this.context);
        }
      }
    }
    springForce(e, r, s) {
      let o = this.emojies[e].getPosition().x - this.emojies[r].getPosition().x, n = this.emojies[e].getPosition().y - this.emojies[r].getPosition().y, a = Math.sqrt(o * o + n * n);
      if (a > this.SEGLEN) {
        let c = this.SPRINGK * (a - this.SEGLEN);
        s.X += o / a * c, s.Y += n / a * c;
      }
    }
  };

  // lib/snowflakeCursor.ts
  var gt = class {
    constructor(t, e, r) {
      let s = Math.floor(Math.random() * 60 + 80);
      this.lifeSpan = s, this.initialLifeSpan = s, this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1 + Math.random()
      }, this.position = { x: t, y: e }, this.canvasImage = r;
    }
    update(t) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75, this.velocity.y -= Math.random() / 300;
      let e = Math.max(this.lifeSpan / this.initialLifeSpan, 0), s = 2 * this.lifeSpan * 0.0174533;
      t.translate(this.position.x, this.position.y), t.rotate(s), t.drawImage(
        this.canvasImage,
        -this.canvasImage.width / 2 * e,
        -this.canvasImage.height / 2,
        this.canvasImage.width * e,
        this.canvasImage.height * e
      ), t.rotate(-s), t.translate(-this.position.x, -this.position.y);
    }
    getLifeSpan() {
      return this.lifeSpan;
    }
  }, it = class extends v {
    constructor(t) {
      super(t), this.possibleEmoji = ["\u2744\uFE0F"], this.emojies = [], this.canvImages = [];
    }
    onInit() {
      if (this.context === null) throw new Error("Context is null");
      this.context.font = "12px serif", this.context.textBaseline = "middle", this.context.textAlign = "center", this.possibleEmoji.forEach((t) => {
        let e = this.context.measureText(t), r = document.createElement("canvas"), s = r.getContext("2d");
        if (s === null) throw new Error("Unable to get 2d context");
        r.width = e.width, r.height = e.actualBoundingBoxAscent * 2, s.textAlign = "center", s.font = "12px serif", s.textBaseline = "middle", s.fillText(
          t,
          r.width / 2,
          e.actualBoundingBoxAscent
        ), this.canvImages.push(r);
      });
    }
    onTouchMove(t) {
      if (!(t.touches.length <= 0))
        for (let e = 0; e < t.touches.length; e++)
          this.addParticle(t.touches[e].clientX, t.touches[e].clientY, this.canvImages[Math.floor(Math.random() * this.canvImages.length)]);
    }
    onMouseMove(t) {
      this.updateCursorPosition({ x: t.clientX, y: t.clientY }), this.addParticle(this.cursor.x, this.cursor.y, this.canvImages[Math.floor(Math.random() * this.canvImages.length)]);
    }
    onTick() {
      this.updateSnowParticles();
    }
    updateSnowParticles() {
      if (!(!this.canvas || !this.context || this.emojies.length === 0)) {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let t = 0; t < this.emojies.length; t++)
          this.emojies[t].update(this.context);
        this.emojies = this.emojies.filter((t) => t.getLifeSpan() > 0), this.emojies.length == 0 && this.context.clearRect(0, 0, this.width, this.height);
      }
    }
    addParticle(t, e, r) {
      this.emojies.push(new gt(t, e, r));
    }
  };

  // lib/trailingCursor.ts
  var xt = class {
    constructor(t, e, r) {
      this.position = { x: t, y: e }, this.image = r;
    }
    setPosition(t, e) {
      this.position.x = t, this.position.y = e;
    }
    getPosition() {
      return this.position;
    }
    move(t) {
      t.drawImage(
        this.image,
        this.position.x,
        // - (this.canv.width / 2) * scale,
        this.position.y
        //- this.canv.height / 2,
      );
    }
  }, st = class extends v {
    constructor(t) {
      super(t), this.particles = [], this.totalParticles = t?.particles || 15, this.rate = t?.rate || 0.4, this.userInteracted = !1, this.baseImage = new Image(), this.baseImage.src = t?.baseImageSrc || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==";
    }
    onInit() {
    }
    onTouchMove(t) {
    }
    onMouseMove(t) {
      if (this.updateCursorPosition({ x: t.clientX, y: t.clientY }), !this.userInteracted) {
        this.userInteracted = !0;
        for (let e = 0; e < this.totalParticles; e++)
          this.addParticle(this.cursor.x, this.cursor.y, this.baseImage);
      }
    }
    onTick() {
      if (!this.context) return;
      this.context.clearRect(0, 0, this.width, this.height);
      let t = this.cursor.x, e = this.cursor.y;
      this.particles.forEach((r, s) => {
        let o = this.particles[s + 1] || this.particles[0];
        r.setPosition(t, e), r.move(this.context), t += (o.getPosition().x - r.getPosition().x) * this.rate, e += (o.getPosition().y - r.getPosition().y) * this.rate;
      });
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler), window.addEventListener("resize", this.onWindowResizeHandler);
    }
    destroy() {
      this.tickId && (cancelAnimationFrame(this.tickId), this.tickId = void 0), this.canvas && (this.canvas.remove(), this.canvas = void 0), this.wrapperEl.removeEventListener("mousemove", this.onMouseMoveHandler), window.removeEventListener("resize", this.onWindowResizeHandler);
    }
    addParticle(t, e, r) {
      this.particles.push(new xt(t, e, r));
    }
  };

  // lib/rainbowCursor.ts
  var yt = class {
    constructor(t, e) {
      this.position = { x: t, y: e };
    }
    getPosition() {
      return this.position;
    }
    setPosition(t, e) {
      this.position.x = t, this.position.y = e;
    }
  }, I = class extends v {
    constructor(e) {
      super(e);
      this.particles = [];
      this.userInteracted = !1;
      this.totalParticles = e?.length || 20, this.colors = e?.colors || [
        "#FE0000",
        "#FD8C00",
        "#FFE500",
        "#119F0B",
        "#0644B3",
        "#C22EDC"
      ], this.size = e?.size || 3;
    }
    onInit() {
    }
    onTouchMove(e) {
    }
    onMouseMove(e) {
      if (this.updateCursorPosition({ x: e.clientX, y: e.clientY }), !this.userInteracted) {
        this.userInteracted = !0;
        for (let r = 0; r < this.totalParticles; r++)
          this.addParticle(this.cursor.x, this.cursor.y);
      }
    }
    onTick() {
      if (!this.context || this.particles.length === 0) return;
      this.context.clearRect(0, 0, this.width, this.height), this.context.lineJoin = "round";
      let e = [], r = this.cursor.x, s = this.cursor.y;
      this.particles.forEach((o, n) => {
        let a = this.particles[n + 1] || this.particles[0];
        o.setPosition(r, s), e.push({ x: r, y: s }), r += (a.getPosition().x - o.getPosition().x) * 0.4, s += (a.getPosition().y - o.getPosition().y) * 0.4;
      }), this.colors.forEach((o, n) => {
        if (!this.context) throw new Error("Context is not defined");
        this.context.beginPath(), this.context.strokeStyle = o, e.length && this.context.moveTo(e[0].x, e[0].y + n * (this.size - 1)), e.forEach((a, c) => {
          if (!this.context) throw new Error("Context is not defined");
          c !== 0 && this.context.lineTo(a.x, a.y + n * this.size);
        }), this.context.lineWidth = this.size, this.context.lineCap = "round", this.context.stroke();
      });
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler), window.addEventListener("resize", this.onWindowResizeHandler);
    }
    addParticle(e, r) {
      this.particles.push(new yt(e, r));
    }
  };

  // lib/textFlag.ts
  var rt = class extends v {
    constructor(e) {
      super(e);
      this.userInteracted = !1;
      this.text = e?.text ? " " + e.text : " Your Text Here", this.color = e?.color || "#000";
      let r = e?.font || "monospace", s = e?.textSize || 12;
      this.fontFamily = s + "px " + r, this.gap = e?.gap || s + 2, this.angle = 0, this.radiusX = 2, this.radiusY = 5, this.charArray = [];
    }
    onInit() {
    }
    onTouchMove(e) {
    }
    onMouseMove(e) {
      if (this.updateCursorPosition({ x: e.clientX, y: e.clientY }), !this.userInteracted) {
        this.userInteracted = !0;
        for (let r = 0; r < this.text.length; r++)
          this.charArray[r] = {
            letter: this.text.charAt(r),
            x: this.width / 2,
            y: this.width / 2
          };
      }
    }
    onTick() {
      if (!this.context || this.charArray.length === 0) return;
      this.context.clearRect(0, 0, this.width, this.height), this.angle += 0.15;
      let e = this.radiusX * Math.cos(this.angle), r = this.radiusY * Math.sin(this.angle);
      for (let n = this.charArray.length - 1; n > 0; n--)
        this.charArray[n].x = this.charArray[n - 1].x + this.gap, this.charArray[n].y = this.charArray[n - 1].y, this.context.fillStyle = this.color, this.context.font = this.fontFamily, this.context.fillText(this.charArray[n].letter, this.charArray[n].x, this.charArray[n].y);
      let s = this.charArray[0].x, o = this.charArray[0].y;
      s += (this.cursor.x - s) / 5 + e + 2, o += (this.cursor.y - o) / 5 + r, this.charArray[0].x = s, this.charArray[0].y = o;
    }
    bindEvents() {
      this.wrapperEl.addEventListener("mousemove", this.onMouseMoveHandler), window.addEventListener("resize", this.onWindowResizeHandler);
    }
  };

  // main.ts
  var Ot = async (i) => {
    let r = await (await (await fetch(i)).blob()).arrayBuffer(), s = new Uint8Array(r), o = new It.GifReader(s), n = o.frameInfo(0), a = n.width, c = n.height;
    return new Array(o.numFrames()).fill(0).map((d, h) => {
      let m = new ImageData(a, c);
      return o.decodeAndBlitFrameBGRA(h, m.data), {
        data: m,
        delay: o.frameInfo(h).delay * 10
      };
    });
  }, Yt = (i) => new Promise((t, e) => {
    let r = new OffscreenCanvas(i.width, i.height), s = r.getContext("2d");
    if (s === null) {
      e("error");
      return;
    }
    s.putImageData(i, 0, 0), r.convertToBlob().then((o) => {
      let n = new FileReader();
      n.onloadend = () => t(n.result), n.onerror = e, n.readAsDataURL(o);
    }).catch(e);
  }), Mt = async (i, t, e) => {
    let r = await Ot(i), s = await Promise.all(r.map(async (o) => ({
      // @ts-ignore
      image: await Yt(o.data),
      delay: o.delay
    })));
    return t || (t = "body"), Ct(t, s, e);
  }, Wt = function(i, t, e) {
    if (window.otsb_c_cf === void 0) {
      switch (t) {
        case "fairyDustCursor":
          window.otsb_c_cf = q.create({
            colors: ["#D61C59", "#E7D84B", "#1B8798"],
            id: i
          });
          break;
        case "ghostCursor":
          let r = {
            randomDelay: !0,
            id: i,
            ...e
          };
          window.otsb_c_cf = $.create(r);
          break;
        case "emojiCursor_fun":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F600}", "\u{1F602}", "\u{1F606}", "\u{1F60A}"] });
          break;
        case "emojiCursor_fruits":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F34E}", "\u{1F34C}", "\u{1F352}", "\u{1F34A}", "\u{1F353}"] });
          break;
        case "emojiCursor_house_animals":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F63A}", "\u{1F436}", "\u{1F430}", "\u{1F42D}"] });
          break;
        case "emojiCursor_wild_animals":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F98A}", "\u{1F43C}", "\u{1F435}", "\u{1F43B}"] });
          break;
        case "emojiCursor_bats":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F987}"] });
          break;
        case "emojiCursor_unicorn":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F984}"] });
          break;
        case "emojiCursor_halloween":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F383}", "\u{1F47B}", "\u{1F987}", "\u{1F480}"] });
          break;
        case "emojiCursor_christmas":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F384}", "\u2744\uFE0F", "\u26C4\uFE0F", "\u{1F385}"] });
          break;
        case "emojiCursor_fish":
          window.otsb_c_cf = C.create({ id: i, emoji: ["\u{1F41F}", "\u{1F420}", "\u{1F421}"] });
          break;
        case "followingDotCursor_white":
          window.otsb_c_cf = j.create({ id: i, color: "#F2F2F2A6" });
          break;
        case "followingDotCursor_red":
          window.otsb_c_cf = j.create({ id: i, color: "#ff0000a6" });
          break;
        case "followingDotCursor_green":
          window.otsb_c_cf = j.create({ id: i, color: "#04ff00a6" });
          break;
        case "followingDotCursor_blue":
          window.otsb_c_cf = j.create({ id: i, color: "#0053ffa6" });
          break;
        case "followingDotCursor_pink":
          window.otsb_c_cf = j.create({ id: i, color: "#ff00a3a6" });
          break;
        case "bubbleCursor":
          window.otsb_c_cf = tt.create({ id: i });
          break;
        case "springyEmojiCursor_star":
          window.otsb_c_cf = N.create({ id: i, emoji: "\u2B50\uFE0F" });
          break;
        case "springyEmojiCursor_heart":
          window.otsb_c_cf = N.create({ id: i, emoji: "\u2764\uFE0F" });
          break;
        case "snowflakeCursor":
          window.otsb_c_cf = it.create({ id: i });
          break;
        case "trailingCursor":
          window.otsb_c_cf = st.create({
            id: i,
            baseImageSrc: e.image,
            particles: 10,
            rate: 0.7
          });
          break;
        case "rainbowCursor":
          window.otsb_c_cf = I.create({ id: i });
          break;
        case "flagCursor_poland":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#EBEAEA", "#FF0000"],
            size: 4
          });
          break;
        case "flagCursor_ukraine":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#0000FF", "#FFFF00"],
            size: 4
          });
          break;
        case "flagCursor_germany":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#000000", "#FF0000", "#F9C804"],
            size: 4
          });
          break;
        case "flagCursor_france":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#1C62D6", "#F8F8F2", "#FC0909"],
            size: 4
          });
          break;
        case "flagCursor_spain":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#D0021B", "#F5A623", "#D0021B"],
            size: 4
          });
          break;
        case "flagCursor_italy":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#2CD61C", "#FFFFFF", "#D0021B"],
            size: 4
          });
          break;
        case "flagCursor_usa":
          window.otsb_c_cf = I.create({
            id: i,
            length: 30,
            colors: ["#D0021B", "#FFFFFF", "#D0021B", "#FFFFFF", "#D0021B", "#FFFFFF", "#D0021B", "#FFFFFF", "#D0021B", "#FFFFFF", "#D0021B", "#FFFFFF", "#D0021B"],
            size: 2
          });
          break;
        case "textFlag":
          let s = e.text || "Shop Now!";
          window.otsb_c_cf = rt.create({ id: i, text: s });
          break;
      }
      return window.otsb_c_cf;
    }
  };
  requestAnimationFrame(() => {
    document.addEventListener("alpine:init", () => {
      Alpine.data("otsb_custom_cursor", ({ section_id: i, mouse_url: t, mouse_selector: e, mouse_hover_url: r, mouse_hover_selector: s, mouse_effect: o }) => {
        let n = () => {
          if (window.otsb_c_cf || !o || !o.type || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
          let c = t;
          (t === "" || t === null || t === void 0) && (c = void 0), Wt(i, o.type, { image: c, text: o?.text }), Shopify.designMode && document.addEventListener("shopify:section:unload", (d) => {
            d.detail.sectionId === i && window.otsb_c_cf && (window.otsb_c_cf.destroy(), window.otsb_c_cf = void 0);
          });
        };
        return {
          init() {
            let a = `otsb-custom-cursor-style-${i}`, c = `otsb-custom-cursor-hover-style-${i}`;
            document.querySelectorAll(`style#${a}, style#${c}`).forEach((f) => {
              f.remove();
            });
            let d = document.createElement("style");
            d.id = a, document.head.appendChild(d);
            let h = document.createElement("style");
            h.id = c, document.head.appendChild(h);
            let m = () => {
              t && Mt(t, e).then((f) => d.innerHTML = f).catch(() => {
                t && (d.innerHTML = `${e}{cursor:url('${t}'), auto !important;}`);
              });
            };
            s || (s = "body button:hover, body a[href]:hover, body .link");
            let A = () => {
              r && Mt(r, s, "Body_Button_A_Link_Hover").then((f) => h.innerHTML = f).catch(() => {
                r && (h.innerHTML = `${s}{cursor:url('${r}'), auto !important;}`);
              });
            };
            m(), A(), n();
          }
        };
      });
    });
  });
})();
}
