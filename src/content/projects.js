// Featured case studies. Every claim is tracked in docs/CLAIM_LEDGER.md.
// Copy rule: no em dashes.

const gh = (repo, path) => `https://github.com/AryaanHabib/${repo}/blob/main/${path}`;

export const projects = [
  {
    slug: 'sentinel',
    index: '01',
    title: 'Sentinel',
    summary:
      'An AI code reviewer that reads a pull request, checks its own findings a second time, and posts one review with comments on the right lines.',
    card: {
      blurb:
        'A GitHub webhook comes in, a Go service verifies and queues it, and a Python agent reviews the diff in two model passes. The second pass exists to throw out the first pass’s weak findings.',
      role: 'Solo project',
      proof: 'Comments are anchored by GitHub’s diff position, not line number, and fall back to a summary review if GitHub rejects them.',
      stack: ['Go', 'Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Next.js', 'OpenAI API'],
    },
    facts: [
      { k: 'Role', v: 'Solo project, design and implementation' },
      { k: 'Published', v: 'Jul 2026' },
      { k: 'Stack', v: 'Go, Python/FastAPI, Redis, PostgreSQL, Next.js, OpenAI API, Docker Compose' },
      { k: 'Status', v: 'Runs locally with Docker Compose. Evaluation results not published yet.' },
    ],
    hero: { kind: 'diagram', id: 'sentinel-pipeline', caption: 'The review pipeline, as built. Cobalt marks the path a single pull request takes.' },
    problem: [
      'Most LLM review bots send the diff to a model and post whatever comes back. Two things go wrong fast: comments that are confidently wrong, and comments that land on the wrong line or get rejected by GitHub outright.',
      'I wanted a reviewer whose mistakes I could trace and whose quality I could measure, instead of judging it by how convincing its comments sounded.',
    ],
    built: [
      'Three services. A small Go service receives GitHub’s pull_request webhook, verifies the HMAC signature, ignores repeat deliveries, and pushes a job onto a Redis list. A Python worker pops the job, fetches the diff from GitHub, splits it into chunks, embeds them, and runs two model passes with related context retrieved from the same pull request.',
      'Reviews and findings are stored in Postgres and shown on a Next.js dashboard. An evaluation harness feeds ten seeded-bug fixtures (five Python, five JavaScript) through the same parsing and review code, without posting to GitHub, and scores precision, recall, cost, and latency.',
    ],
    hard: {
      title: 'Putting the comment on the right line',
      body: [
        'GitHub doesn’t place review comments by file line number. It uses a position in the raw diff that starts at 1 on the line under a file’s first hunk header, keeps counting straight through later hunk headers, and restarts at the next file. Get it wrong and the comment lands somewhere misleading, or the whole review is rejected with a 422.',
        'The diff parser computes that position as it reads, so every chunk the model sees already carries the address its findings need. When GitHub still refuses a position, the agent falls back to posting one summary review rather than losing the findings.',
      ],
      figure: 'diff-positions',
      figureCaption:
        'Positions the parser produced for a two-file test diff I ran it on. The second hunk header is counted (position 4), and y.py starts again at 1.',
    },
    diagram: {
      id: 'sentinel-agent',
      caption:
        'Inside one review job. Pass 1 is allowed to be generous. Pass 2 re-retrieves context for each candidate and asks the model to keep or drop it.',
    },
    decisions: [
      {
        title: 'Split noticing from confirming',
        constraint: 'A single pass over one chunk flags issues that are already handled a few lines or files away.',
        choice: 'Pass 1 flags anything plausible. Pass 2 embeds each candidate, retrieves its own context, and asks the model to argue against the finding before it can survive.',
        tradeoff: 'One extra model call per candidate, so reviews cost more and take longer. A wrong comment costs a reviewer’s trust, which is worth more.',
      },
      {
        title: 'Keep the webhook path tiny',
        constraint: 'GitHub expects a quick response, and a slow review shouldn’t block the next webhook.',
        choice: 'A dependency-free Go service with a minimal Redis client (SET NX EX, LPUSH, PING) that verifies, dedupes, queues, and returns 202. If queuing fails, it deletes the dedupe key so GitHub’s retry can get through.',
        tradeoff: 'Two languages and a hand-rolled Redis client to maintain, in exchange for an ingestion path with almost nothing in it.',
      },
    ],
    verified: [
      { text: 'Go unit tests for signature verification and the Redis client pass (go test ./...).', href: gh('sentinel', 'services/ingestion/signature_test.go') },
      { text: 'I ran the diff parser on a two-file, two-hunk diff and checked every position by hand (figure above).', href: gh('sentinel', 'services/agent/app/diffing.py') },
      { text: 'The evaluation harness reuses the production parser on synthetic new-file diffs, so fixture line numbers and diff positions line up exactly.', href: gh('sentinel', 'services/agent/eval/synth_diff.py') },
    ],
    incomplete: [
      'Evaluation results aren’t published yet. The harness and metrics exist; the final run hasn’t been done, so there are no precision or recall numbers here.',
      'The README mentions a seeded-bug demo-repo/ folder. It isn’t in the repository yet.',
      'The Python agent has no unit tests of its own yet. The diff parser is the first thing I’d cover.',
    ],
    repo: 'https://github.com/AryaanHabib/sentinel',
  },
  {
    slug: 'nba-auction',
    index: '02',
    title: 'NBA Auction Fantasy',
    summary:
      'A live auction draft for fantasy basketball. Up to ten people bid on players in real time, and the server decides every outcome.',
    card: {
      blurb:
        'Auction drafts are the best part of fantasy basketball, and most platforms bury them. This one is only the draft: leagues, live lots on a countdown, budgets, and rosters that fill as you win.',
      role: 'Solo project',
      proof: 'Two bids that read the same price can’t both succeed. The write only applies if the current bid is still the one the request saw.',
      stack: ['Next.js', 'TypeScript', 'Supabase Postgres', 'Supabase Realtime', 'Upstash Redis'],
    },
    facts: [
      { k: 'Role', v: 'Solo project, design and implementation' },
      { k: 'Published', v: 'Jul 2026' },
      { k: 'Stack', v: 'Next.js App Router, TypeScript, Server Actions, Supabase (Postgres, Auth, Realtime), Upstash Redis, Vercel Cron' },
      { k: 'Status', v: 'Runs locally against Supabase and Upstash. No public demo.' },
    ],
    hero: { kind: 'diagram', id: 'nba-cas', caption: 'Two teams bid on the same lot within milliseconds. The database row decides.' },
    problem: [
      'A live auction is a pile of races. Two people press Bid at nearly the same moment. Several open tabs all notice the timer hit zero. Someone closes their laptop mid-draft.',
      'The client can’t be trusted with anything that matters: not its clock, not its budget, not whether it won.',
    ],
    built: [
      'Leagues with six-character join codes, then a draft where players come up one at a time on a countdown and any bid resets the clock. Bids go through Next.js server actions that check the lot, the deadline, the minimum increment, and the team’s budget before writing.',
      'Supabase Realtime pushes every change to every connected client. Redis holds the live lot state and a per-team bid rate limit. Won players land on a court view of the roster.',
    ],
    hard: {
      title: 'Concurrent writes that fail silently',
      body: [
        'The first version updated the lot with “where id = this lot and status = bidding”. Two concurrent bids both matched, so the last write won. A $12 bid could overwrite a $15 bid that landed a few milliseconds earlier. Supabase doesn’t report an update that matches zero rows as an error, so there wasn’t even a signal that anything went wrong.',
        'The fix is compare-and-swap: the update also requires current_bid to equal the value the request read, then asks for the updated row back. Zero rows means someone got there first, and that bidder is told to go again. The same pattern guards closing a lot and advancing the phase, so a player can’t be sold twice or charged to the winner twice.',
      ],
    },
    diagram: {
      id: 'nba-flow',
      caption:
        'Who can trigger what. Every client and a once-a-minute cron backstop race to drive transitions. Each transition is a guarded update, so exactly one caller’s attempt applies and the rest do nothing.',
    },
    decisions: [
      {
        title: 'No host, every client drives',
        constraint: 'If the commissioner’s tab drives the auction, closing that tab stalls everyone.',
        choice: 'Every connected client tries to close expired lots and advance phases. A Vercel Cron route runs every minute and acts on any phase stalled past a 15-second grace window, for when every tab is gone.',
        tradeoff: 'Lots of redundant requests, and every transition has to be safe to attempt twice. The guarded updates are what make that true.',
      },
      {
        title: 'A reserve rule so every roster can fill',
        constraint: 'A team that spends everything early can’t fill its roster, and the draft dead-ends.',
        choice: 'A team must keep $1 for each roster slot it still needs. One function computes the maximum legal bid, and both bid enforcement and the opening price of each lot use it.',
        tradeoff: 'It limits all-in bidding late in a draft. Sharing one function means the opening price can never promise a bid that enforcement then rejects.',
      },
    ],
    verified: [
      { text: 'The three race fixes are documented at the code that fixes them, with the old behavior and the new guard side by side.', href: gh('nba-auction', 'src/lib/auction/engine.ts') },
      { text: 'The reserve rule includes a short proof in its comment that the max bid never drops below $1 while a slot is open.', href: gh('nba-auction', 'src/lib/auction/validation.ts') },
      { text: 'No automated tests yet. The documented manual check is two accounts bidding against each other from separate browser sessions.', manual: true },
    ],
    incomplete: [
      'Missing: a test that fires concurrent bids at a local Postgres and asserts exactly one winner. That’s the most important gap.',
      'Settling a sold lot (adding the player to the roster and deducting the budget) is two writes after the guarded close. A crash between them would leave them out of sync. I’d move both into one Postgres function.',
      'Compare-and-swap means the first committed bid wins, not the highest. A higher bid that loses the race has to be resubmitted, and the client tells the bidder so.',
      'Planned, not built: a simulated season that plays drafted rosters against each other.',
    ],
    repo: 'https://github.com/AryaanHabib/nba-auction',
  },
  {
    slug: 'arena',
    index: '03',
    title: 'Arena',
    summary:
      'An authoritative multiplayer arena server. Clients send inputs, the server simulates at 20 Hz, and a recorded match replays bit for bit.',
    card: {
      blurb:
        'Two to eight players move and shoot in a shared top-down world over a binary WebSocket protocol. The simulation is deterministic enough that a match can be re-run from its inputs and checked hash by hash.',
      role: 'Solo project',
      proof: 'I re-ran the checked-in recording: 615 ticks, 524 inputs, and all 525 recorded state hashes matched.',
      stack: ['Java 21', 'Spring Boot', 'WebSockets', 'Micrometer', 'JUnit'],
    },
    facts: [
      { k: 'Role', v: 'Solo project, design and implementation' },
      { k: 'Published', v: 'Aug 2026' },
      { k: 'Stack', v: 'Java 21, Spring Boot (WebSocket, Actuator, Micrometer), custom binary protocol, H2, JUnit' },
      { k: 'Status', v: 'Runs locally in one JVM. Lag compensation is designed, not built.' },
    ],
    hero: {
      kind: 'image',
      src: '/media/arena-replay.svg',
      width: 960,
      height: 470,
      alt: 'Plot of the recorded match re-simulated from inputs: a small cobalt path in the corner of a 64 by 64 unit arena, 55 grey shot rays, and an enlarged view of the path with tick markers every 100 ticks.',
      caption:
        'The match in demo/showcase.arep, re-simulated from its inputs for this page. One player, 615 ticks, 55 shots. Every position is recomputed, not read back.',
    },
    problem: [
      'In a multiplayer game the server has to be the source of truth, or the fastest cheater wins. I also wanted something stronger: if a result is ever disputed, rerun the match and get the same answer, down to the bit.',
      'That means determinism. Java gives you plenty of ways to lose it without noticing.',
    ],
    built: [
      'One platform thread owns the world and runs a fixed 20 Hz tick. Joins, leaves, and inputs from network threads go through queues drained at the top of each tick. Inputs are validated at a single boundary that drops and counts bad input instead of throwing.',
      'After each tick, players get a delta-encoded snapshot against the last tick they acknowledged, from a 64-tick history. Auth happens in the WebSocket handshake. Every match is recorded as its input stream plus per-tick state hashes, and a replay tool re-simulates it in a fresh world without starting Spring.',
    ],
    hard: {
      title: 'Making Java deterministic on purpose',
      body: [
        'Basic float arithmetic is strict in modern Java, but Math.sin and Math.sqrt are only specified to within an ulp or two, HashMap iteration order isn’t stable across runs, and any read of the wall clock makes the result depend on when the code ran. Each of those had to be designed out.',
        'Positions are Q16.16 fixed point on int, with integer square root and a precomputed sine table. Entities live in slot-indexed arrays iterated in order, and new players always take the lowest free slot. There’s one seeded xorshift RNG, touched only by the tick thread. A test scans the simulation package for banned tokens and fails the build with the file and line.',
        'One bug only showed up by recording and replaying real matches: the live world’s tick counter and RNG had already advanced before a match began, so a fresh replay started from the wrong state. Replays now record the live RNG state and absolute start tick.',
      ],
    },
    diagram: {
      id: 'arena-tick',
      caption:
        'Input to tick to snapshot. The tick thread is the only writer to the world. The recorder captures exactly what the world consumed, which is what makes replay possible.',
    },
    decisions: [
      {
        title: 'A dedicated thread for the clock',
        constraint: 'Spring’s @Scheduled shares a pool with other beans and hides how late each tick starts. A virtual thread adds scheduling jitter to work that never blocks.',
        choice: 'A platform thread with absolute deadlines. It parks for most of the wait, then spins for a small margin it calibrates at startup from measured park overshoot.',
        tradeoff: 'A little CPU spent spinning in that last margin, for steadier tick start times. Setting the margin to zero turns it off.',
      },
      {
        title: 'Reject bad tokens before the socket exists',
        constraint: 'Checking auth on the first message means an unauthenticated socket already holds a slot and can send frames.',
        choice: 'Validate the JWT in the handshake interceptor and return 401 before the upgrade. The player’s identity comes from the token, never from the name in their hello message.',
        tradeoff: 'Browsers can’t set headers on a WebSocket handshake, so the token rides in the query string, which proxies and logs record more readily. Acceptable for short-lived dev tokens.',
      },
    ],
    verified: [
      { text: 'I compiled the simulation and replay classes and replayed demo/showcase.arep five times: final hash MATCHED each run, in 1 to 10 ms.', href: 'https://github.com/AryaanHabib/arena-server/tree/main/demo' },
      { text: 'DeterminismGuardTest fails the build on banned APIs in the simulation package, and includes a case proving the scanner catches a planted violation.', href: gh('arena-server', 'src/test/java/arena/sim/DeterminismGuardTest.java') },
      { text: 'AdversarialTest drives real WebSocket clients with oversized, replayed, out-of-order, and malformed input, and checks the right drop counter fires.', href: gh('arena-server', 'src/test/java/arena/AdversarialTest.java') },
      { text: 'The suite has 159 test methods. I didn’t rerun the full suite for this page.', manual: true },
    ],
    incomplete: [
      'Lag compensation is designed, not implemented. Hits resolve against current positions. The design caps rewind at min(server-measured RTT / 2, 200 ms), and RTT is measured by server-initiated pings so a client can’t inflate it.',
      'Known issue: a player who disconnects while moving doesn’t replay cleanly, because the server zeroes their velocity with a direct call that isn’t in the input stream. The fix is recording disconnects as events.',
      'One JVM only. Scaling out would need sticky routing by room so each match keeps a single authoritative process.',
      'The browser client renders exactly what the server confirmed. Client prediction and interpolation are next.',
    ],
    repo: 'https://github.com/AryaanHabib/arena-server',
  },
  {
    slug: 'adventure-of-the-ages',
    index: '04',
    title: 'Adventure of the Ages',
    summary:
      'A 2D cyberpunk platformer in C++ and OpenGL, built by a team of four for UBC’s CPSC 427 game programming course.',
    card: {
      blurb:
        'Run, jump, shoot, and fight through three themes of levels, collecting enough fuel to unlock the next one and racing the clock for stars. Built on the course’s small ECS framework over one term.',
      role: 'Team of 4 · course project',
      proof: 'I built the save and reload system, wrote the text-file level loader, and started 10 of the 14 campaign levels.',
      stack: ['C++', 'OpenGL', 'GLFW', 'SDL2', 'ECS'],
    },
    facts: [
      { k: 'Role', v: 'Team of four. My parts: save/reload, level loader, progression, HUD, several mechanics, most campaign levels' },
      { k: 'Dates', v: 'Jan – Apr 2026' },
      { k: 'Stack', v: 'C++, OpenGL, GLFW, SDL2 audio, course-provided tinyECS, nlohmann/json' },
      { k: 'Status', v: 'Finished course project. Source is on UBC’s course GitHub and isn’t public.' },
    ],
    hero: {
      kind: 'image',
      src: '/media/aota-level-1600.webp',
      srcSet: '/media/aota-level-800.webp 800w, /media/aota-level-1600.webp 1600w',
      width: 1600,
      height: 890,
      alt: 'In-game screenshot: the red-suited player character on a platform in a blue cyberpunk city level, with hearts, ammo, a fuel pickup, three stars, and the level timer in the HUD.',
      caption: 'An early campaign level. HUD hearts, ammo, fuel, stars, and timer are all part of the progression work I did. Screenshot from the team repository.',
    },
    problem: [
      'CPSC 427 asks a team to build a real game over four milestones on a deliberately small engine: an entity-component-system, an OpenGL renderer, and not much else. Our game is a side-scroller: the player has to get through cyberpunk levels full of hazards and enemies to rescue a stranded teammate.',
      'The loop is short and replayable. Clear a level, collect at least 70% of its fuel to unlock the next, and beat the clock for up to three stars. Earn 10 of 15 stars in a theme to open the next theme.',
    ],
    built: [
      'My largest piece is save and reload: the game saves at every checkpoint, on pause, and at the end of each level, and Continue puts you back where you were. I also wrote the first version of the level loader, which turned levels into plain text files, and I started 10 of the 14 campaign levels in it.',
      'Around that: the HUD (hearts, fuel bar, stars, timer), star ratings and best times, the level-select screen, dark levels with a lamp the player carries, toxic water, linked teleport portals, pause and resume, input that clears itself when the window loses focus, and camera culling so off-screen entities aren’t drawn.',
    ],
    team: [
      { who: 'Aryaan Habib', what: 'Save/reload, level loader, campaign levels, progression and HUD, lamp and darkness, portals, toxic water, camera culling, pause and input handling' },
      { who: 'Rishavpreet Singh', what: 'Player-follow camera and cutscene zoom, parallax backgrounds, audio, levels and tutorials' },
      { who: 'Nabeel Ali', what: 'Enemy pathfinding, squad AI with an observer drone and healer, iris-wipe transition, profiling' },
      { who: 'Devin Proothi', what: 'Gravity flip, steam-vent particle system, ECS components, rendering and physics performance pass' },
    ],
    gallery: [
      { src: '/media/aota-lamp-800.webp', width: 800, height: 446, alt: 'A dark level where only a circle of lamplight around the player is visible.', caption: 'Dark level with the lamp' },
      { src: '/media/aota-portal-800.webp', width: 800, height: 447, alt: 'The player near a green-framed teleport portal in a later level.', caption: 'Linked portals' },
      { src: '/media/aota-level-select-800.webp', width: 800, height: 449, alt: 'Level select screen showing levels 6 to 10 with star ratings, best times, and fuel counts.', caption: 'Level select with stars and best times' },
    ],
    hard: {
      title: 'Putting a level back exactly as you left it',
      body: [
        'A save has to restore more than a position. Enemies may be dead or hurt, fuel may already be collected, a button may have opened a door, and the player may have reached a checkpoint, picked up the lamp, or flipped gravity.',
        'Serializing every entity would have tied the save format to every component in the engine. Instead, a save stores two sections: campaign progress (unlocked levels, stars, best times, fuel per level) and, if a level is in progress, the session. On load the game rebuilds the level from its text file, then overlays the saved state: it removes the level’s default enemies and pickups and recreates the saved ones, re-latches pressed buttons and opens their doors, restores visited checkpoints, and spawns the player at the last one.',
      ],
    },
    diagram: {
      id: 'aota-save',
      caption:
        'Save and load. The level file is the baseline. The save only holds what has changed since the level started.',
    },
    decisions: [
      {
        title: 'Rebuild, then overlay',
        constraint: 'Teammates were adding mechanics every week. A save format that mirrored every component would break constantly.',
        choice: 'Rebuild the level from its file and save only the dynamic state on top. A save with no level in progress restores campaign progress and opens level select. A malformed file is rejected instead of half-loaded.',
        tradeoff: 'Any new mechanic with state has to be added to the save code, or it quietly resets on load. Latched buttons and their doors needed exactly that.',
      },
      {
        title: 'Levels as text files',
        constraint: 'Four people needed to build and tweak levels without editing and recompiling C++.',
        choice: 'A line-based format (theme, darkness, then lines like “tile x y id” or “fuel x y”) read by a loader. Teammates later extended it with enemies, squads, and paired portals.',
        tradeoff: 'There’s no editor and no validation beyond the loader, so a typo shows up when you play the level.',
      },
    ],
    verified: [
      { text: 'The team’s written test plan covers checkpoints, save and load, portals, and gravity respawns as manual test cases.' },
      { text: 'The team checked memory with Valgrind: 0 bytes definitely or indirectly lost in the tested run, with RSS stable across a full playthrough.' },
      { text: 'Who did what is checked against git history and each milestone’s README credits. Save/reload is credited to me in Milestone 3.' },
    ],
    incomplete: [
      'No gameplay recording on this page yet. The screenshots above come from the team repository.',
    ],
    repo: null,
  },
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
