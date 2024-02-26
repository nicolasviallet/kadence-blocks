/*!
 * Jarallax v2.1.3 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define(t)
		: ((e = 'undefined' != typeof globalThis ? globalThis : e || self).jarallax = t());
})(this, function () {
	'use strict';
	function e(e) {
		'complete' === document.readyState || 'interactive' === document.readyState
			? e()
			: document.addEventListener('DOMContentLoaded', e, { capture: !0, once: !0, passive: !0 });
	}
	let t;
	t =
		'undefined' != typeof window
			? window
			: 'undefined' != typeof global
			? global
			: 'undefined' != typeof self
			? self
			: {};
	var i = t,
		o = {
			type: 'scroll',
			speed: 0.5,
			containerClass: 'jarallax-container',
			imgSrc: null,
			imgElement: '.jarallax-img',
			imgSize: 'cover',
			imgPosition: '50% 50%',
			imgRepeat: 'no-repeat',
			keepImg: !1,
			elementInViewport: null,
			zIndex: -100,
			disableParallax: !1,
			onScroll: null,
			onInit: null,
			onDestroy: null,
			onCoverImage: null,
			videoClass: 'jarallax-video',
			videoSrc: null,
			videoStartTime: 0,
			videoEndTime: 0,
			videoVolume: 0,
			videoLoop: !0,
			videoPlayOnlyVisible: !0,
			videoLazyLoading: !0,
			disableVideo: !1,
			onVideoInsert: null,
			onVideoWorkerInit: null,
		};
	const { navigator: n } = i,
		a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent);
	let s, l, r;
	function c() {
		(s = i.innerWidth || document.documentElement.clientWidth),
			a
				? (!r &&
						document.body &&
						((r = document.createElement('div')),
						(r.style.cssText = 'position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;'),
						document.body.appendChild(r)),
				  (l = (r ? r.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight))
				: (l = i.innerHeight || document.documentElement.clientHeight);
	}
	function m() {
		return { width: s, height: l };
	}
	c(),
		i.addEventListener('resize', c),
		i.addEventListener('orientationchange', c),
		i.addEventListener('load', c),
		e(() => {
			c();
		});
	const p = [];
	function d() {
		if (!p.length) return;
		const { width: e, height: t } = m();
		p.forEach((i, o) => {
			const { instance: n, oldData: a } = i;
			if (!n.isVisible()) return;
			const s = n.$item.getBoundingClientRect(),
				l = { width: s.width, height: s.height, top: s.top, bottom: s.bottom, wndW: e, wndH: t },
				r = !a || a.wndW !== l.wndW || a.wndH !== l.wndH || a.width !== l.width || a.height !== l.height,
				c = r || !a || a.top !== l.top || a.bottom !== l.bottom;
			(p[o].oldData = l), r && n.onResize(), c && n.onScroll();
		}),
			i.requestAnimationFrame(d);
	}
	const g = new i.IntersectionObserver(
		(e) => {
			e.forEach((e) => {
				e.target.jarallax.isElementInViewport = e.isIntersecting;
			});
		},
		{ rootMargin: '50px' }
	);
	const { navigator: u } = i;
	let f = 0;
	class h {
		constructor(e, t) {
			const i = this;
			(i.instanceID = f), (f += 1), (i.$item = e), (i.defaults = { ...o });
			const n = i.$item.dataset || {},
				a = {};
			if (
				(Object.keys(n).forEach((e) => {
					const t = e.substr(0, 1).toLowerCase() + e.substr(1);
					t && void 0 !== i.defaults[t] && (a[t] = n[e]);
				}),
				(i.options = i.extend({}, i.defaults, a, t)),
				(i.pureOptions = i.extend({}, i.options)),
				Object.keys(i.options).forEach((e) => {
					'true' === i.options[e] ? (i.options[e] = !0) : 'false' === i.options[e] && (i.options[e] = !1);
				}),
				(i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed)))),
				'string' == typeof i.options.disableParallax &&
					(i.options.disableParallax = new RegExp(i.options.disableParallax)),
				i.options.disableParallax instanceof RegExp)
			) {
				const e = i.options.disableParallax;
				i.options.disableParallax = () => e.test(u.userAgent);
			}
			if (
				('function' != typeof i.options.disableParallax && (i.options.disableParallax = () => !1),
				'string' == typeof i.options.disableVideo &&
					(i.options.disableVideo = new RegExp(i.options.disableVideo)),
				i.options.disableVideo instanceof RegExp)
			) {
				const e = i.options.disableVideo;
				i.options.disableVideo = () => e.test(u.userAgent);
			}
			'function' != typeof i.options.disableVideo && (i.options.disableVideo = () => !1);
			let s = i.options.elementInViewport;
			s && 'object' == typeof s && void 0 !== s.length && ([s] = s),
				s instanceof Element || (s = null),
				(i.options.elementInViewport = s),
				(i.image = { src: i.options.imgSrc || null, $container: null, useImgTag: !1, position: 'fixed' }),
				i.initImg() && i.canInitParallax() && i.init();
		}
		css(e, t) {
			return (function (e, t) {
				return 'string' == typeof t
					? i.getComputedStyle(e).getPropertyValue(t)
					: (Object.keys(t).forEach((i) => {
							e.style[i] = t[i];
					  }),
					  e);
			})(e, t);
		}
		extend(e, ...t) {
			return (function (e, ...t) {
				return (
					(e = e || {}),
					Object.keys(t).forEach((i) => {
						t[i] &&
							Object.keys(t[i]).forEach((o) => {
								e[o] = t[i][o];
							});
					}),
					e
				);
			})(e, ...t);
		}
		getWindowData() {
			const { width: e, height: t } = m();
			return { width: e, height: t, y: document.documentElement.scrollTop };
		}
		initImg() {
			const e = this;
			let t = e.options.imgElement;
			return (
				t && 'string' == typeof t && (t = e.$item.querySelector(t)),
				t instanceof Element ||
					(e.options.imgSrc ? ((t = new Image()), (t.src = e.options.imgSrc)) : (t = null)),
				t &&
					(e.options.keepImg
						? (e.image.$item = t.cloneNode(!0))
						: ((e.image.$item = t), (e.image.$itemParent = t.parentNode)),
					(e.image.useImgTag = !0)),
				!!e.image.$item ||
					(null === e.image.src &&
						((e.image.src =
							'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
						(e.image.bgImage = e.css(e.$item, 'background-image'))),
					!(!e.image.bgImage || 'none' === e.image.bgImage))
			);
		}
		canInitParallax() {
			return !this.options.disableParallax();
		}
		init() {
			const e = this,
				t = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' };
			let o = { pointerEvents: 'none', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' };
			if (!e.options.keepImg) {
				const t = e.$item.getAttribute('style');
				if ((t && e.$item.setAttribute('data-jarallax-original-styles', t), e.image.useImgTag)) {
					const t = e.image.$item.getAttribute('style');
					t && e.image.$item.setAttribute('data-jarallax-original-styles', t);
				}
			}
			if (
				('static' === e.css(e.$item, 'position') && e.css(e.$item, { position: 'relative' }),
				'auto' === e.css(e.$item, 'z-index') && e.css(e.$item, { zIndex: 0 }),
				(e.image.$container = document.createElement('div')),
				e.css(e.image.$container, t),
				e.css(e.image.$container, { 'z-index': e.options.zIndex }),
				'fixed' === this.image.position &&
					e.css(e.image.$container, {
						'-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
						'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
					}),
				e.image.$container.setAttribute('id', `jarallax-container-${e.instanceID}`),
				e.options.containerClass && e.image.$container.setAttribute('class', e.options.containerClass),
				e.$item.appendChild(e.image.$container),
				e.image.useImgTag
					? (o = e.extend(
							{
								'object-fit': e.options.imgSize,
								'object-position': e.options.imgPosition,
								'max-width': 'none',
							},
							t,
							o
					  ))
					: ((e.image.$item = document.createElement('div')),
					  e.image.src &&
							(o = e.extend(
								{
									'background-position': e.options.imgPosition,
									'background-size': e.options.imgSize,
									'background-repeat': e.options.imgRepeat,
									'background-image': e.image.bgImage || `url("${e.image.src}")`,
								},
								t,
								o
							))),
				('opacity' !== e.options.type &&
					'scale' !== e.options.type &&
					'scale-opacity' !== e.options.type &&
					1 !== e.options.speed) ||
					(e.image.position = 'absolute'),
				'fixed' === e.image.position)
			) {
				const t = (function (e) {
					const t = [];
					for (; null !== e.parentElement; ) 1 === (e = e.parentElement).nodeType && t.push(e);
					return t;
				})(e.$item).filter((e) => {
					const t = i.getComputedStyle(e),
						o = t['-webkit-transform'] || t['-moz-transform'] || t.transform;
					return (o && 'none' !== o) || /(auto|scroll)/.test(t.overflow + t['overflow-y'] + t['overflow-x']);
				});
				e.image.position = t.length ? 'absolute' : 'fixed';
			}
			var n;
			(o.position = e.image.position),
				e.css(e.image.$item, o),
				e.image.$container.appendChild(e.image.$item),
				e.onResize(),
				e.onScroll(!0),
				e.options.onInit && e.options.onInit.call(e),
				'none' !== e.css(e.$item, 'background-image') && e.css(e.$item, { 'background-image': 'none' }),
				(n = e),
				p.push({ instance: n }),
				1 === p.length && i.requestAnimationFrame(d),
				g.observe(n.options.elementInViewport || n.$item);
		}
		destroy() {
			const e = this;
			var t;
			(t = e),
				p.forEach((e, i) => {
					e.instance.instanceID === t.instanceID && p.splice(i, 1);
				}),
				g.unobserve(t.options.elementInViewport || t.$item);
			const i = e.$item.getAttribute('data-jarallax-original-styles');
			if (
				(e.$item.removeAttribute('data-jarallax-original-styles'),
				i ? e.$item.setAttribute('style', i) : e.$item.removeAttribute('style'),
				e.image.useImgTag)
			) {
				const t = e.image.$item.getAttribute('data-jarallax-original-styles');
				e.image.$item.removeAttribute('data-jarallax-original-styles'),
					t ? e.image.$item.setAttribute('style', i) : e.image.$item.removeAttribute('style'),
					e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item);
			}
			e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container),
				e.options.onDestroy && e.options.onDestroy.call(e),
				delete e.$item.jarallax;
		}
		coverImage() {
			const e = this,
				{ height: t } = m(),
				i = e.image.$container.getBoundingClientRect(),
				o = i.height,
				{ speed: n } = e.options,
				a = 'scroll' === e.options.type || 'scroll-opacity' === e.options.type;
			let s = 0,
				l = o,
				r = 0;
			return (
				a &&
					(n < 0 ? ((s = n * Math.max(o, t)), t < o && (s -= n * (o - t))) : (s = n * (o + t)),
					n > 1 ? (l = Math.abs(s - t)) : n < 0 ? (l = s / n + Math.abs(s)) : (l += (t - o) * (1 - n)),
					(s /= 2)),
				(e.parallaxScrollDistance = s),
				(r = a ? (t - l) / 2 : (o - l) / 2),
				e.css(e.image.$item, {
					height: `${l}px`,
					marginTop: `${r}px`,
					left: 'fixed' === e.image.position ? `${i.left}px` : '0',
					width: `${i.width}px`,
				}),
				e.options.onCoverImage && e.options.onCoverImage.call(e),
				{ image: { height: l, marginTop: r }, container: i }
			);
		}
		isVisible() {
			return this.isElementInViewport || !1;
		}
		onScroll(e) {
			const t = this;
			if (!e && !t.isVisible()) return;
			const { height: i } = m(),
				o = t.$item.getBoundingClientRect(),
				n = o.top,
				a = o.height,
				s = {},
				l = Math.max(0, n),
				r = Math.max(0, a + n),
				c = Math.max(0, -n),
				p = Math.max(0, n + a - i),
				d = Math.max(0, a - (n + a - i)),
				g = Math.max(0, -n + i - a),
				u = 1 - ((i - n) / (i + a)) * 2;
			let f = 1;
			if (
				(a < i ? (f = 1 - (c || p) / a) : r <= i ? (f = r / i) : d <= i && (f = d / i),
				('opacity' !== t.options.type &&
					'scale-opacity' !== t.options.type &&
					'scroll-opacity' !== t.options.type) ||
					((s.transform = 'translate3d(0,0,0)'), (s.opacity = f)),
				'scale' === t.options.type || 'scale-opacity' === t.options.type)
			) {
				let e = 1;
				t.options.speed < 0 ? (e -= t.options.speed * f) : (e += t.options.speed * (1 - f)),
					(s.transform = `scale(${e}) translate3d(0,0,0)`);
			}
			if ('scroll' === t.options.type || 'scroll-opacity' === t.options.type) {
				let e = t.parallaxScrollDistance * u;
				'absolute' === t.image.position && (e -= n), (s.transform = `translate3d(0,${e}px,0)`);
			}
			t.css(t.image.$item, s),
				t.options.onScroll &&
					t.options.onScroll.call(t, {
						section: o,
						beforeTop: l,
						beforeTopEnd: r,
						afterTop: c,
						beforeBottom: p,
						beforeBottomEnd: d,
						afterBottom: g,
						visiblePercent: f,
						fromViewportCenter: u,
					});
		}
		onResize() {
			this.coverImage();
		}
	}
	const b = function (e, t, ...i) {
		('object' == typeof HTMLElement
			? e instanceof HTMLElement
			: e && 'object' == typeof e && null !== e && 1 === e.nodeType && 'string' == typeof e.nodeName) &&
			(e = [e]);
		const o = e.length;
		let n,
			a = 0;
		for (; a < o; a += 1)
			if (
				('object' == typeof t || void 0 === t
					? e[a].jarallax || (e[a].jarallax = new h(e[a], t))
					: e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)),
				void 0 !== n)
			)
				return n;
		return e;
	};
	b.constructor = h;
	const y = i.jQuery;
	if (void 0 !== y) {
		const e = function (...e) {
			Array.prototype.unshift.call(e, this);
			const t = b.apply(i, e);
			return 'object' != typeof t ? t : this;
		};
		e.constructor = b.constructor;
		const t = y.fn.jarallax;
		(y.fn.jarallax = e),
			(y.fn.jarallax.noConflict = function () {
				return (y.fn.jarallax = t), this;
			});
	}
	return (
		e(() => {
			b(document.querySelectorAll('[data-jarallax]'));
		}),
		b
	);
});
