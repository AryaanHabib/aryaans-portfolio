import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// A tiny History API router. The site has five routes, so a dependency
// isn't worth it. Netlify's public/_redirects sends every path to index.html.

const RouterContext = createContext({ path: '/', navigate: () => {} });

function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo(0, 0);
    return false;
  }
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView();
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  return true;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.origin);
    const nextPath = url.pathname.replace(/\/+$/, '') || '/';
    const samePage = nextPath === (window.location.pathname.replace(/\/+$/, '') || '/');
    window.history.pushState({}, '', url.pathname + url.hash);
    if (samePage) {
      // Wait a frame so anything closing on click (the mobile menu) has
      // already changed the layout before we measure the target.
      requestAnimationFrame(() => scrollToHash(url.hash));
    } else {
      setPath(nextPath);
      window.__pendingHash = url.hash;
    }
  }, []);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname.replace(/\/+$/, '') || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After a route renders: jump to a pending #hash, or move focus to the
  // page's h1 so keyboard and screen-reader users land at the new content.
  const firstRender = useRef(true);
  useEffect(() => {
    const initial = firstRender.current;
    firstRender.current = false;
    const hash = window.__pendingHash ?? window.location.hash;
    window.__pendingHash = undefined;
    requestAnimationFrame(() => {
      if (hash && scrollToHash(hash)) return;
      if (initial) return;
      window.scrollTo(0, 0);
      const h1 = document.querySelector('main h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    });
  }, [path]);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ href, children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const internal = href.startsWith('/') || href.startsWith('#');
  const handle = (e) => {
    onClick?.(e);
    if (!internal || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href.startsWith('#') ? window.location.pathname + href : href);
  };
  if (!internal) {
    return (
      <a href={href} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
