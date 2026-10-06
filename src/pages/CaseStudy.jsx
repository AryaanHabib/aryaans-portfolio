import { useEffect } from 'react';
import { Link } from '../router.jsx';
import { projects } from '../content/projects.js';
import { Diagram } from '../components/Diagrams.jsx';

function HeroMedia({ hero }) {
  if (hero.kind === 'image') {
    return (
      <figure className="cs-hero-media">
        <img
          src={hero.src}
          srcSet={hero.srcSet}
          sizes={hero.srcSet ? '(min-width: 1280px) 1240px, 100vw' : undefined}
          width={hero.width}
          height={hero.height}
          alt={hero.alt}
          fetchpriority="high"
        />
        <figcaption>{hero.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="cs-hero-media cs-diagram">
      <Diagram id={hero.id} />
      <figcaption>{hero.caption}</figcaption>
    </figure>
  );
}

function Section({ n, id, title, children, wide = false }) {
  return (
    <section className={`cs-section${wide ? ' is-wide' : ''}`} aria-labelledby={id}>
      <p className="cs-num mono-label" aria-hidden="true">{n}</p>
      <div className="cs-body">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function CaseStudy({ slug }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  useEffect(() => {
    document.title = `${p.title} · Aryaan Habib`;
  }, [p.title]);

  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <article className="case-study">
      <header className="cs-head wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/#work">Work</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{p.title}</span>
        </nav>
        <p className="cs-index mono-label">Project {p.index} of {String(projects.length).padStart(2, '0')}</p>
        <h1 className="cs-title">{p.title}</h1>
        <p className="cs-summary">{p.summary}</p>
        <dl className="cs-facts">
          {p.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="wrap">
        <HeroMedia hero={p.hero} />
      </div>

      <div className="wrap cs-content">
        <Section n={num()} id="problem" title="The problem">
          {p.problem.map((t) => <p key={t}>{t}</p>)}
        </Section>

        <Section n={num()} id="built" title="What I built">
          {p.built.map((t) => <p key={t}>{t}</p>)}
          {p.team && (
            <div className="team">
              <h3>How the team split the work</h3>
              <dl>
                {p.team.map((m) => (
                  <div key={m.who} className={m.who === 'Aryaan Habib' ? 'is-me' : undefined}>
                    <dt>{m.who === 'Aryaan Habib' ? 'Me' : m.who}</dt>
                    <dd>{m.what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Section>

        {p.gallery && (
          <div className="cs-gallery">
            {p.gallery.map((g) => (
              <figure key={g.src}>
                <img src={g.src} width={g.width} height={g.height} alt={g.alt} loading="lazy" decoding="async" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <Section n={num()} id="hard" title={`The hard part: ${p.hard.title.charAt(0).toLowerCase()}${p.hard.title.slice(1)}`}>
          {p.hard.body.map((t) => <p key={t}>{t}</p>)}
          {p.hard.figure && (
            <figure className="cs-inline-figure">
              <Diagram id={p.hard.figure} />
              <figcaption>{p.hard.figureCaption}</figcaption>
            </figure>
          )}
        </Section>

        <Section n={num()} id="architecture" title="How it fits together" wide>
          <figure className="cs-diagram">
            <Diagram id={p.diagram.id} />
            <figcaption>{p.diagram.caption}</figcaption>
          </figure>
        </Section>

        <Section n={num()} id="decisions" title="Decisions">
          <div className="decisions">
            {p.decisions.map((d) => (
              <div key={d.title} className="decision">
                <h3>{d.title}</h3>
                <dl>
                  <div><dt>Constraint</dt><dd>{d.constraint}</dd></div>
                  <div><dt>Choice</dt><dd>{d.choice}</dd></div>
                  <div><dt>Tradeoff</dt><dd>{d.tradeoff}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </Section>

        <Section n={num()} id="verified" title="How I verified it">
          <ul className="checklist">
            {p.verified.map((v) => (
              <li key={v.text} className={v.manual ? 'is-note' : undefined}>
                {v.text}{' '}
                {v.href && (
                  <a href={v.href} rel="noopener noreferrer">
                    Source<span className="sr-only"> for: {v.text}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {p.incomplete?.length > 0 && (
          <Section n={num()} id="incomplete" title="What is incomplete">
            <ul className="incomplete">
              {p.incomplete.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Section>
        )}
      </div>

      <footer className="cs-foot wrap">
        <p className="cs-actions">
          {p.repo ? (
            <a href={p.repo} className="button button-primary" rel="noopener noreferrer">
              View repository
            </a>
          ) : (
            <span className="mono-label">Source is on UBC’s course GitHub and isn’t public.</span>
          )}
        </p>
        <nav className="cs-pager" aria-label="More projects">
          <Link href={`/work/${prev.slug}`} className="pager-link">
            <span className="mono-label">Previous · {prev.index}</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="pager-link is-next">
            <span className="mono-label">Next · {next.index}</span>
            <span className="pager-title">{next.title}</span>
          </Link>
        </nav>
      </footer>
    </article>
  );
}
