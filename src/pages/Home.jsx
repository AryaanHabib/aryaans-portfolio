import { useEffect } from 'react';
import { Link } from '../router.jsx';
import { projects } from '../content/projects.js';
import { person, proof, principles, experience, archive } from '../content/site.js';
import { Diagram } from '../components/Diagrams.jsx';

function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="eyebrow">Software Engineer · Vancouver, BC</p>
        <h1 id="hero-title" className="hero-title">
          I build software where state, timing, and trust&nbsp;matter.
        </h1>
        <p className="hero-sub">
          I’m a recent UBC Computer Science graduate looking for a full-time software engineering role.
          My work spans backend systems, real-time products, applied AI, and games.
        </p>
        <div className="hero-actions">
          <Link href="/#work" className="button button-primary">Explore selected work</Link>
          <Link href="/#contact" className="button button-quiet">Get in touch</Link>
        </div>
        <p className="hero-links">
          <a href={person.github} rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true">/</span>
          <a href={person.linkedin} rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
      <figure className="evidence">
        <p className="evidence-head mono-label">Field note · Arena replay</p>
        <img
          src="/media/arena-replay.svg"
          width="960"
          height="470"
          alt="Plot of a recorded Arena match re-simulated from its inputs: the player's path in a 64 by 64 unit arena with 55 shot rays, and an enlarged view of the path."
          fetchpriority="high"
        />
        <figcaption>
          I re-ran a recorded match from its inputs alone. 615 ticks later, all 525 recorded state hashes
          matched. <Link href="/work/arena">How the replay works</Link>
        </figcaption>
      </figure>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proof wrap" aria-label="Facts from the work">
      <ul>
        {proof.map((p) => (
          <li key={p.figure}>
            <Link href={p.href} className="proof-item">
              <span className="proof-figure">{p.figure}</span>
              <span className="proof-text">{p.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkMedia({ project }) {
  if (project.slug === 'adventure-of-the-ages') {
    return (
      <div className="work-media game-media">
        <img
          src={project.hero.src}
          srcSet={project.hero.srcSet}
          sizes="(min-width: 960px) 700px, 100vw"
          width={project.hero.width}
          height={project.hero.height}
          alt={project.hero.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="game-thumbs">
          {project.gallery.slice(0, 2).map((g) => (
            <img key={g.src} src={g.src} width={g.width} height={g.height} alt={g.alt} loading="lazy" decoding="async" />
          ))}
        </div>
        <p className="media-credit">Screenshots from the team repository.</p>
      </div>
    );
  }
  if (project.hero.kind === 'image') {
    return (
      <div className="work-media">
        <img src={project.hero.src} width={project.hero.width} height={project.hero.height} alt={project.hero.alt} loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div className="work-media work-diagram">
      <Diagram id={project.hero.id} compact />
    </div>
  );
}

function WorkRow({ project, flip }) {
  const isGame = project.slug === 'adventure-of-the-ages';
  return (
    <article className={`work-row${flip ? ' is-flipped' : ''}${isGame ? ' is-game' : ''}`} aria-labelledby={`w-${project.slug}`}>
      <div className="work-rail" aria-hidden="true">{project.index}</div>
      <div className="work-text">
        <p className="mono-label">{project.card.role}</p>
        <h3 id={`w-${project.slug}`} className="work-title">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="work-blurb">{project.card.blurb}</p>
        <p className="work-proof"><span className="mono-label">Proof</span> {project.card.proof}</p>
        <p className="work-stack">{project.card.stack.join(' · ')}</p>
        <p className="work-links">
          <Link href={`/work/${project.slug}`} className="arrow-link">
            Read case study<span className="sr-only">: {project.title}</span>
          </Link>
          {project.repo && (
            <a href={project.repo} rel="noopener noreferrer">
              Repository<span className="sr-only"> for {project.title}</span>
            </a>
          )}
        </p>
      </div>
      <WorkMedia project={project} />
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Index</p>
          <h2 id="work-title">Selected work</h2>
        </header>
      </div>
      <div className="work-list">
        {projects.map((p, i) => (
          <div key={p.slug} className={p.slug === 'adventure-of-the-ages' ? 'game-band' : 'wrap'}>
            <div className={p.slug === 'adventure-of-the-ages' ? 'wrap' : undefined}>
              <WorkRow project={p} flip={i % 2 === 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="section wrap" aria-labelledby="build-title">
      <header className="section-head">
        <p className="eyebrow">Method</p>
        <h2 id="build-title">How I build</h2>
      </header>
      <ol className="principles">
        {principles.map((p, i) => (
          <li key={p.title}>
            <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <p className="principle-links">
              See{' '}
              {p.links.map((l, j) => (
                <span key={l.href}>
                  {j > 0 && ' and '}
                  <Link href={l.href}>{l.label}</Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section wrap" aria-labelledby="exp-title">
      <header className="section-head">
        <p className="eyebrow">Experience</p>
        <h2 id="exp-title">Where I’ve worked</h2>
      </header>
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.org}>
            <p className="timeline-date mono-label">{e.dates}</p>
            <div>
              <h3>
                {e.role} <span className="timeline-org">· {e.org}</span>
              </h3>
              <p className="timeline-place">{e.place}</p>
              <ul>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <header className="section-head">
        <p className="eyebrow">About</p>
        <h2 id="about-title">A little more context</h2>
      </header>
      <div className="about-grid">
        <p className="about-text">
          I finished my BSc in Computer Science at UBC in 2026. The problems I keep coming back to are the
          ones where several things happen at once and the system still has to agree on what’s true: a bid that
          lands a few milliseconds after another, a replay that has to match the original tick for tick, a save
          file that has to put a level back the way you left it. Away from that, I watch a lot of basketball and
          like arguing about it with numbers, which is how{' '}
          <a href="https://github.com/AryaanHabib/face-value" rel="noopener noreferrer">Face Value</a> started.
          I also play enough games to care how a jump feels, which helped when we built one.
        </p>
        <dl className="facts">
          <div><dt>Based in</dt><dd>Vancouver, BC</dd></div>
          <div><dt>Education</dt><dd>BSc Computer Science, University of British Columbia, 2026</dd></div>
          <div><dt>Looking for</dt><dd>Full-time, early-career software engineering roles</dd></div>
          <div><dt>Languages in this work</dt><dd>Go, Python, Java, TypeScript, C++</dd></div>
        </dl>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section className="section wrap" aria-labelledby="archive-title">
      <header className="section-head">
        <p className="eyebrow">Archive</p>
        <h2 id="archive-title">Earlier and smaller projects</h2>
      </header>
      <details className="archive">
        <summary>
          <span>Show {archive.length} projects</span>
        </summary>
        <ul>
          {archive.map((a) => (
            <li key={a.title}>
              <span className="archive-year mono-label">{a.year}</span>
              <h3>{a.title}</h3>
              <p>{a.line}</p>
              <p className="archive-links">
                {a.demo && (
                  <a href={a.demo} rel="noopener noreferrer">
                    Live demo<span className="sr-only"> for {a.title}</span>
                  </a>
                )}
                <a href={a.repo} rel="noopener noreferrer">
                  Repository<span className="sr-only"> for {a.title}</span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'Aryaan Habib · Software Engineer, Vancouver';
  }, []);
  return (
    <>
      <Hero />
      <ProofStrip />
      <Work />
      <Principles />
      <Experience />
      <About />
      <Archive />
    </>
  );
}
