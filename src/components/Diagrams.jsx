// Architecture diagrams drawn from the inspected source of each project.
// Visual vocabulary: ink boxes = components, cobalt = the path under discussion,
// dashed = optional or fallback path, mono text = names that exist in the code.

function Node({ x, y, w, h, title, lines = [], accent = false, dashed = false }) {
  return (
    <g className={`d-node${accent ? ' is-accent' : ''}${dashed ? ' is-dashed' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx="2" />
      <text className="d-title" x={x + 12} y={y + 22}>{title}</text>
      {lines.map((l, i) => (
        <text key={i} className="d-line" x={x + 12} y={y + 44 + i * 18}>{l}</text>
      ))}
    </g>
  );
}

function Arrow({ d, accent = false, dashed = false, label, lx, ly, anchor = 'start' }) {
  return (
    <g className={`d-arrow${accent ? ' is-accent' : ''}${dashed ? ' is-dashed' : ''}`}>
      <path d={d} markerEnd={accent ? 'url(#d-head-accent)' : 'url(#d-head)'} />
      {label && (
        <text className="d-label" x={lx} y={ly} textAnchor={anchor}>{label}</text>
      )}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="d-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" className="d-head" />
      </marker>
      <marker id="d-head-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" className="d-head is-accent" />
      </marker>
    </defs>
  );
}

function Svg({ w, h, title, desc, children, compact = false }) {
  const id = title.replace(/\W+/g, '-').toLowerCase();
  return (
    <div
      className={compact ? 'diagram-fit' : 'diagram-scroll'}
      {...(compact ? {} : { tabIndex: 0, role: 'group', 'aria-label': `${title} (scrollable on small screens)` })}
    >
      <svg
        className="diagram"
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-labelledby={`${id}-t ${id}-d`}
      >
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>{desc}</desc>
        <Defs />
        {children}
      </svg>
      {!compact && <p className="scroll-hint" aria-hidden="true">Scroll sideways to see the whole diagram →</p>}
    </div>
  );
}

function SentinelPipeline({ compact }) {
  return (
    <Svg
      compact={compact}
      w={1040}
      h={420}
      title="Sentinel pipeline"
      desc="GitHub sends a signed pull_request webhook to the Go ingestion service, which verifies the signature, deduplicates the delivery in Redis, and pushes a job onto the review_jobs list. The Python agent pops the job, fetches the diff, runs two model passes, posts one review back to GitHub, and stores the review in Postgres, which the Next.js dashboard reads. An evaluation harness runs fixtures through the same agent code without GitHub."
    >
      <Node x={10} y={160} w={120} h={70} title="GitHub" lines={['pull_request']} />
      <Node x={180} y={120} w={210} h={150} title="ingestion · Go" lines={['verify HMAC-SHA256', 'dedupe: SET NX, 24h TTL', 'LPUSH review_jobs', 'return 202']} accent />
      <Node x={440} y={165} w={120} h={60} title="Redis" lines={['review_jobs']} />
      <Node x={610} y={70} w={210} h={250} title="agent · Python" lines={['BRPOP job', 'fetch PR diff', 'parse, diff positions', 'chunk, embed, top-k', 'pass 1: flag', 'pass 2: keep or drop', 'post one review', 'persist']} accent />
      <Node x={890} y={90} w={140} h={60} title="Postgres" lines={['reviews']} />
      <Node x={890} y={230} w={140} h={60} title="Next.js" lines={['dashboard']} />
      <Node x={610} y={345} w={210} h={60} title="eval harness" lines={['10 fixtures, no GitHub']} dashed />

      <Arrow d="M130,195 L176,195" accent />
      <Arrow d="M390,195 L436,195" accent />
      <Arrow d="M560,195 L606,195" accent />
      <Arrow d="M715,70 L715,40 L70,40 L70,156" accent label="POST review · on 422, summary-only review" lx={392} ly={32} anchor="middle" />
      <Arrow d="M820,120 L886,120" />
      <Arrow d="M960,150 L960,226" label="reads" lx={968} ly={194} />
      <Arrow d="M715,345 L715,324" dashed />
    </Svg>
  );
}

function SentinelAgent({ compact }) {
  return (
    <Svg
      compact={compact}
      w={1040}
      h={250}
      title="One Sentinel review job"
      desc="The diff is parsed and split into chunks, each chunk is embedded, pass 1 analyzes each chunk with its top related chunks and returns candidate findings, pass 2 embeds each candidate, retrieves its own context and keeps or drops it, and survivors are posted as one review and stored."
    >
      <Node x={10} y={60} w={150} h={90} title="diff" lines={['per-file sections', 'positions computed']} />
      <Node x={200} y={60} w={160} h={90} title="chunks" lines={['bounded size', 'embedded together']} />
      <Node x={400} y={40} w={190} h={130} title="pass 1 · flag" lines={['chunk + top-k related', 'from this PR', '→ candidate JSON', 'path, position, severity']} accent />
      <Node x={630} y={40} w={190} h={130} title="pass 2 · verify" lines={['embed candidate', 'retrieve its own context', 'argue against it', '→ keep or drop']} accent />
      <Node x={860} y={60} w={170} h={90} title="survivors" lines={['one GitHub review', 'stored in Postgres']} />
      <Node x={640} y={200} w={170} h={40} title="dropped" dashed />
      <Arrow d="M160,105 L196,105" />
      <Arrow d="M360,105 L396,105" />
      <Arrow d="M590,105 L626,105" accent />
      <Arrow d="M820,105 L856,105" accent label="keep" lx={824} ly={96} />
      <Arrow d="M725,170 L725,196" dashed label="drop" lx={732} ly={190} />
    </Svg>
  );
}

function NbaCas({ compact }) {
  const lanes = [
    { x: 110, label: 'Team A tab' },
    { x: 300, label: 'Team B tab' },
    { x: 590, label: 'placeBid · server action' },
    { x: 900, label: 'auction_lots row' },
  ];
  return (
    <Svg
      compact={compact}
      w={1040}
      h={440}
      title="Two concurrent bids resolved by compare-and-swap"
      desc="Both teams read the lot when current_bid is 12. Team A bids 15 and Team B bids 14. The server's update for A requires current_bid to still equal 12, matches one row, and sets current_bid to 15. B's update requires the same thing, now matches zero rows, and B is told to bid again. Realtime then broadcasts the new state to both clients."
    >
      {lanes.map((l) => (
        <g key={l.x} className="d-lane">
          <text className="d-title" x={l.x} y={30} textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1={44} x2={l.x} y2={420} />
        </g>
      ))}
      <g className="d-note"><rect x={820} y={62} width={160} height={28} rx="2" /><text className="d-line" x={900} y={81} textAnchor="middle">current_bid = 12</text></g>
      <Arrow d="M110,115 L586,115" label="bid $15 (saw 12)" lx={120} ly={107} />
      <Arrow d="M300,145 L586,145" label="bid $14 (saw 12)" lx={310} ly={137} />
      <Arrow d="M590,185 L896,185" accent label="UPDATE … WHERE current_bid = 12   (A, $15)" lx={600} ly={177} />
      <Arrow d="M900,210 L594,210" accent label="1 row" lx={890} ly={226} anchor="end" />
      <g className="d-note is-accent"><rect x={820} y={236} width={160} height={28} rx="2" /><text className="d-line" x={900} y={255} textAnchor="middle">current_bid = 15</text></g>
      <Arrow d="M590,290 L896,290" label="UPDATE … WHERE current_bid = 12   (B, $14)" lx={600} ly={282} />
      <Arrow d="M900,315 L594,315" dashed label="0 rows" lx={890} ly={331} anchor="end" />
      <Arrow d="M590,355 L114,355" accent label="you’re the high bidder" lx={580} ly={347} anchor="end" />
      <Arrow d="M590,390 L304,390" dashed label="someone just outbid you, go again" lx={580} ly={382} anchor="end" />
    </Svg>
  );
}

function NbaFlow({ compact }) {
  return (
    <Svg
      compact={compact}
      w={1040}
      h={330}
      title="Who drives NBA Auction transitions"
      desc="Every client tab and a once-a-minute cron route call the same three engine functions: placeBid guarded on current_bid, closeLot guarded on status equals bidding, and advanceAuction guarded on round_phase equals sold. They write to Postgres. Redis holds the live lot state and a per-team bid rate limit. Supabase Realtime pushes changes back to every client."
    >
      <Node x={20} y={40} w={200} h={90} title="client tabs × N" lines={['send intent only', 'race to drive timers']} />
      <Node x={20} y={180} w={200} h={90} title="Vercel Cron · 1 min" lines={['acts after 15 s stall', 'CRON_SECRET if set']} dashed />
      <Node x={300} y={20} w={330} h={270} title="engine.ts · guarded updates" lines={['placeBid', '  WHERE current_bid = value read', '', 'closeLot', '  WHERE status = bidding', '  winner only: roster + budget', '', 'advanceAuction', '  WHERE round_phase = sold', '', '0 rows → someone else won']} accent />
      <Node x={710} y={40} w={170} h={80} title="Postgres" lines={['lots, teams, roster']} />
      <Node x={710} y={180} w={170} h={80} title="Upstash Redis" lines={['live lot, rate limit']} />
      <Node x={920} y={40} w={110} h={80} title="Realtime" lines={['CDC + broadcast']} />
      <Arrow d="M220,85 L296,85" accent />
      <Arrow d="M220,225 L296,225" dashed />
      <Arrow d="M630,80 L706,80" accent />
      <Arrow d="M630,220 L706,220" />
      <Arrow d="M880,80 L916,80" />
      <Arrow d="M975,120 L975,310 L120,310 L120,274" label="changes pushed to every tab" lx={560} ly={302} anchor="middle" />
    </Svg>
  );
}

function ArenaTick({ compact }) {
  return (
    <Svg
      compact={compact}
      w={1040}
      h={400}
      title="Arena input, tick, and snapshot flow"
      desc="Client INPUT frames are decoded and offered to the InputQueue, which drops stale, implausible, or overflowing input and clamps movement. The MatchLoop tick thread drains the queue at 20 Hz, steps the World, and computes a state hash. Tick observers then delta-encode a snapshot per player against that player's acknowledged baseline from a 64-tick history and send STATE frames. The ReplayRecorder hands the consumed inputs and hashes to a writer thread that produces an .arep file. ReplayPlayer later steps a fresh World with the recorded inputs and compares hashes tick by tick."
    >
      <Node x={10} y={60} w={150} h={80} title="clients" lines={['INPUT, ACK', 'binary frames']} />
      <Node x={200} y={40} w={200} h={120} title="InputQueue.offer" lines={['drop: stale, jump, overflow', 'clamp movement to [-1, 1]', 'count, never throw']} />
      <Node x={440} y={20} w={220} h={160} title="MatchLoop · tick thread" lines={['20 Hz, absolute deadlines', 'drain queues', 'World.step(inputs)', 'stateHash()', 'notify observers']} accent />
      <Node x={700} y={20} w={330} h={110} title="snapshot per player" lines={['baseline = last ACKed tick', 'SnapshotHistory: 64 ticks', 'field-mask delta, or full if unknown']} />
      <Node x={700} y={170} w={330} h={70} title="ReplayRecorder" lines={['inputs + hashes → writer thread']} />
      <Node x={700} y={290} w={330} h={90} title="ReplayPlayer" lines={['fresh World, same seed + start tick', 'same inputs → compare every hash']} accent />
      <Node x={440} y={290} w={220} h={70} title=".arep file" lines={['header, ticks, footer']} />
      <Arrow d="M160,100 L196,100" label="decode" lx={164} ly={92} />
      <Arrow d="M400,100 L436,100" accent />
      <Arrow d="M660,75 L696,75" accent />
      <Arrow d="M660,150 L680,150 L680,205 L696,205" />
      <Arrow d="M865,240 L865,262 L550,262 L550,286" label="written off the tick thread" lx={705} ly={256} />
      <Arrow d="M660,325 L696,325" accent />
      <Arrow d="M865,130 L865,150 L85,150 L85,144" dashed label="STATE frames" lx={300} ly={170} />
    </Svg>
  );
}

function AotaSave({ compact }) {
  return (
    <Svg
      compact={compact}
      w={1040}
      h={380}
      title="Adventure of the Ages save and load"
      desc="Saves happen at checkpoints, on pause, and when a level ends. save_game writes meta and progress, plus a session section if a level is in progress. On load, progress is restored first. Without a session the game opens level select. With one, the world is rebuilt from the level's text file, then saved enemies and pickups replace the defaults, latched buttons reopen their doors, visited checkpoints are restored, and the player spawns at the last checkpoint."
    >
      <Node x={20} y={30} w={210} h={110} title="save triggers" lines={['checkpoint reached', 'pause', 'level finished']} />
      <Node x={280} y={20} w={250} h={130} title="save_game" lines={['meta: version, has session', 'progress: stars, best times,', '  fuel, unlocked levels', 'session: only if playing']} accent />
      <Node x={580} y={45} w={170} h={80} title="save JSON" lines={['one file on disk']} />
      <Node x={800} y={30} w={220} h={110} title="load_game" lines={['validate structure', 'restore progress', 'session? else level select']} accent />
      <Node x={800} y={200} w={220} h={150} title="1 · rebuild" lines={['clear the registry', 'read level text file', 'create player, HUD,', '  camera']} />
      <Node x={420} y={200} w={330} h={150} title="2 · overlay saved state" lines={['replace default enemies + pickups', 're-latch buttons, open doors', 'restore visited checkpoints', 'lamp, gravity, timer, fuel', 'spawn at last checkpoint']} accent />
      <Node x={20} y={225} w={290} h={100} title="level file (baseline)" lines={['theme 1 · dark 0', 'tile 13 11 44 · fuel 13 8', 'enemy, portal, button, door …']} dashed />
      <Arrow d="M230,85 L276,85" accent />
      <Arrow d="M530,85 L576,85" accent />
      <Arrow d="M750,85 L796,85" accent />
      <Arrow d="M910,140 L910,196" accent />
      <Arrow d="M800,275 L754,275" accent />
      <Arrow d="M310,275 L416,275" dashed label="baseline" lx={322} ly={266} />
    </Svg>
  );
}

export function DiffPositions() {
  const rows = [
    ['x.py', '', '@@ -1,2 +1,2 @@', 'header'],
    ['', '1', ' a', ''],
    ['', '2', '-b', 'del'],
    ['', '3', '+B', 'add'],
    ['', '4', '@@ -10,1 +10,2 @@', 'counted'],
    ['', '5', ' j', ''],
    ['', '6', '+k', 'add'],
    ['y.py', '', '@@ -1 +1 @@', 'header'],
    ['', '1', '-q', 'del'],
    ['', '2', '+Q', 'add'],
  ];
  return (
    <table className="diff-table">
      <caption className="sr-only">Diff lines with the review position GitHub expects for each</caption>
      <thead>
        <tr><th scope="col">file</th><th scope="col">position</th><th scope="col">diff line</th></tr>
      </thead>
      <tbody>
        {rows.map(([f, pos, text, kind], i) => (
          <tr key={i} className={kind ? `is-${kind}` : undefined}>
            <td>{f}</td>
            <td>{pos || '–'}</td>
            <td><code>{text}</code>{kind === 'counted' && <span className="diff-note"> still counted</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const registry = {
  'sentinel-pipeline': SentinelPipeline,
  'sentinel-agent': SentinelAgent,
  'nba-cas': NbaCas,
  'nba-flow': NbaFlow,
  'arena-tick': ArenaTick,
  'aota-save': AotaSave,
  'diff-positions': DiffPositions,
};

export function Diagram({ id, ...rest }) {
  const C = registry[id];
  return C ? <C {...rest} /> : null;
}
