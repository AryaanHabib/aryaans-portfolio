import { RouterProvider, useRouter, Link } from './router.jsx';
import { Header, Footer } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import { bySlug } from './content/projects.js';

function NotFound() {
  return (
    <section className="section wrap not-found">
      <p className="eyebrow">404</p>
      <h1>That page doesn’t exist.</h1>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </section>
  );
}

function Routes() {
  const { path } = useRouter();
  if (path === '/') return <Home />;
  const m = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (m && bySlug[m[1]]) return <CaseStudy key={m[1]} slug={m[1]} />;
  return <NotFound />;
}

export default function App() {
  return (
    <RouterProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex="-1">
        <Routes />
      </main>
      <Footer />
    </RouterProvider>
  );
}
