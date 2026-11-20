"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigation } from "@/data/portfolio";

const pages = navigation.map(item => item.href);
const artwork: Record<string, string[]> = {
  "/": ["/images/backgrounds/vintage-writing-desk.png", "/images/open-letter-parchment.webp"],
  "/about": ["/design-references/02-about.webp", "/images/about-journey-portrait.webp"],
  "/skills": ["/images/toolkit/notebook.webp", "/images/toolkit/symbols.webp"],
  "/experience": ["/images/experience/journal.webp"],
  "/projects": ["/images/parchment-texture.jpg", "/images/projects/trucks.webp"],
  "/contact": ["/images/parchment-texture.jpg", "/images/contact/seal-and-pen.webp"],
};

function prepareArtwork(cache: Map<string, Promise<unknown>>, path: string) {
  let ready = cache.get(path);
  if (!ready) {
    ready = Promise.allSettled(artwork[path].map(src => {
      const image = new Image();
      image.fetchPriority = "low";
      image.src = src;
      return image.decode();
    }));
    cache.set(path, ready);
  }
  return ready;
}

function atEdge(direction: number) {
  const root = document.scrollingElement ?? document.documentElement;
  return direction < 0 ? root.scrollTop <= 2 : root.scrollTop + root.clientHeight >= root.scrollHeight - 2;
}

function canTurn(target: EventTarget | null) {
  if (document.querySelector("dialog[open]") || !window.getSelection()?.isCollapsed) return false;
  if (!(target instanceof Element)) return true;
  if (target.closest("input,textarea,select,[contenteditable=true],nav,dialog,[data-lenis-prevent]")) return false;
  for (let el: Element | null = target; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    if (el.scrollHeight > el.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(el).overflowY)) return false;
  }
  return true;
}

type Arrival = { path: string; bottom: boolean; resolve: () => void };

export function JournalController() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useRef(pathname);
  const arrival = useRef<Arrival | null>(null);
  const assets = useRef(new Map<string, Promise<unknown>>());

  useLayoutEffect(() => {
    current.current = pathname;
    const pending = arrival.current;
    if (pending?.path === pathname) {
      window.scrollTo({ top: pending.bottom ? document.documentElement.scrollHeight : 0, behavior: "instant" });
      document.querySelector<HTMLElement>("main.site-shell")?.focus({ preventScroll: true });
      pending.resolve();
    }
  }, [pathname]);

  useEffect(() => {
    const index = pages.indexOf(pathname);
    for (const path of [pages[index - 1], pages[index + 1]]) {
      if (!path) continue;
      router.prefetch(path);
      void prepareArtwork(assets.current, path);
    }
  }, [pathname, router]);

  useEffect(() => {
    let busy = false;
    let disposed = false;
    let queued: string | null = null;
    let sequence = 0;
    let transition: ViewTransition | undefined;
    let lastWheel = -Infinity;
    let consumed = false;
    let distance = 0;
    const html = document.documentElement;

    async function turn(path: string, bottom = false, fromLink = false) {
      if (busy) {
        if (fromLink) { queued = path; transition?.skipTransition(); }
        return;
      }
      const from = pages.indexOf(current.current);
      if (from < 0 || !path || path === current.current) return;
      busy = true;
      const id = ++sequence;
      const backward = pages.indexOf(path) < from;
      html.dataset.journalTurn = backward ? "backward" : "forward";
      const artReady = prepareArtwork(assets.current, path);
      let timer = 0;
      async function navigate() {
        if (disposed || sequence !== id) return;
        const committed = new Promise<void>(resolve => {
          arrival.current = { path, bottom, resolve };
          timer = window.setTimeout(resolve, 2500);
        });
        router.push(path, { scroll: false });
        await committed;
        // Do not hold the old page on screen indefinitely on a slow connection.
        await Promise.race([artReady, new Promise(resolve => setTimeout(resolve, 250))]);
      }
      try {
        if (typeof document.startViewTransition === "function") {
          transition = document.startViewTransition(navigate);
          await transition.finished;
        } else {
          const sheet = document.querySelector<HTMLElement>("main.site-shell");
          const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
          const tilt = innerWidth < 700 ? "translateY(-10px)" : `perspective(1200px) rotateY(${backward ? 7 : -7}deg)`;
          if (sheet && !reduced) await sheet.animate([{transform:"none"}, {transform:tilt, opacity:.6}], {duration:220, fill:"none"}).finished;
          await navigate();
          if (sheet) await sheet.animate([{opacity:.65}, {opacity:1}], {duration:reduced ? 90 : 250}).finished;
        }
      } finally {
        window.clearTimeout(timer);
        if (id === sequence) {
          busy = false;
          transition = undefined;
          arrival.current = null;
          delete html.dataset.journalTurn;
          const next = queued;
          queued = null;
          if (next && !disposed) void turn(next, false, true);
        }
      }
    }

    function adjacent(direction: number) {
      const i = pages.indexOf(current.current);
      return i >= 0 ? pages[i + direction] : undefined;
    }

    function wheel(event: WheelEvent) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const now = performance.now();
      if (now - lastWheel > 200) { consumed = false; distance = 0; }
      lastWheel = now;
      const direction = Math.sign(event.deltaY);
      if (!canTurn(event.target)) { distance = 0; return; }
      if (consumed) {
        if (event.cancelable) event.preventDefault();
        return;
      }
      if (busy || !atEdge(direction)) { distance = 0; return; }
      const next = adjacent(direction);
      if (!next) return;
      if (event.cancelable) event.preventDefault();
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.sign(distance) !== direction) distance = 0;
      distance += pixels;
      if (Math.abs(distance) >= 45) {
        consumed = true;
        void turn(next, direction < 0);
      }
    }

    let touch: { x: number; y: number; top: boolean; bottom: boolean } | null = null;
    function touchStart(event: TouchEvent) {
      touch = null;
      if (!busy && event.touches.length === 1 && canTurn(event.target)) {
        const point = event.touches[0];
        touch = { x: point.clientX, y: point.clientY, top: atEdge(-1), bottom: atEdge(1) };
      }
    }
    function touchEnd(event: TouchEvent) {
      const start = touch;
      touch = null;
      if (!start || !canTurn(event.target)) return;
      const point = event.changedTouches[0];
      const dy = start.y - point.clientY;
      if (Math.abs(dy) < 54 || Math.abs(dy) < Math.abs(start.x - point.clientX) * 1.4) return;
      const dir = Math.sign(dy);
      const next = adjacent(dir);
      if (next && atEdge(dir) && (dir > 0 ? start.bottom : start.top)) void turn(next, dir < 0);
    }
    function key(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || !canTurn(event.target)) return;
      if (event.target instanceof Element && event.target.closest("button,a,[role=button]") && event.key === " ") return;
      const dir = ["ArrowDown","PageDown"].includes(event.key) ? 1 : ["ArrowUp","PageUp"].includes(event.key) ? -1 : event.key === " " ? (event.shiftKey ? -1 : 1) : 0;
      const next = adjacent(dir);
      if (dir && !event.repeat && next && atEdge(dir)) { event.preventDefault(); void turn(next, dir < 0); }
    }
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      let link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      // During a native view transition the browser targets its snapshot at <html>.
      // Map pointer clicks on the visible sticky navbar back to its real links.
      if (!link && busy && event.target === html && event.detail > 0) {
        link = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header a")).find(anchor => {
          const rect = anchor.getBoundingClientRect();
          return event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom;
        }) ?? null;
      }
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.search || url.hash || !pages.includes(url.pathname) || !pages.includes(current.current)) return;
      event.preventDefault();
      void turn(url.pathname, false, true);
    }
    function cancel() {
      sequence++;
      transition?.skipTransition();
      transition = undefined;
      arrival.current?.resolve();
      arrival.current = null;
      busy = false;
      queued = null;
      touch = null;
      delete html.dataset.journalTurn;
    }
    const listeners = new AbortController();
    const passive = { passive: true, signal: listeners.signal };
    window.addEventListener("wheel", wheel, { passive: false, signal: listeners.signal });
    window.addEventListener("touchstart", touchStart, passive);
    window.addEventListener("touchend", touchEnd, passive);
    window.addEventListener("touchcancel", () => { touch = null; }, passive);
    window.addEventListener("keydown", key, { signal: listeners.signal });
    document.addEventListener("click", click, { capture:true, signal:listeners.signal });
    window.addEventListener("popstate", cancel, { signal:listeners.signal });
    return () => { disposed = true; listeners.abort(); cancel(); };
  }, [router]);
  return null;
}
