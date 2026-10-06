# Claim ledger

Every factual claim on the site, where it came from, and whether it was checked. Updated Oct 6, 2026.

Status key: **Verified** = checked in source or reproduced. **Source-only** = present in the repo's own docs/code but not reproduced here. **Aryaan to confirm** = comes from the previous site or the build prompt, not from source.

## Identity and dates

| Claim | Source | Status | Published copy |
|---|---|---|---|
| BSc Computer Science, UBC, completed May 2026 | Build prompt (Aryaan). No transcript attached. | Aryaan to confirm | "BSc Computer Science, UBC, 2026" |
| AeroQube: Software Developer Intern, Jun–Sep 2025, remote, Vancouver | Build prompt corrects the old site's "Present" | Aryaan to confirm | Same |
| AeroQube bullets (Calio, React Native/React, GPT-4 meal assistant with retrieval) | Old live site. `AryaanHabib/Calio` is only a one-day scaffold (Expo + API setup, Jul 14 2025), so it doesn't prove the work | Aryaan to confirm | Two trimmed bullets, no inflated wording |
| UBC TA, Sep 2023 – Dec 2024, MATH 100/180, grading scripts | `src/sections/Resume.jsx` in the old repo | Aryaan to confirm | Two bullets |
| Email habibaryaan@gmail.com | Old live site, git author email | Verified | Contact |
| Phone, address, age, work authorization | n/a | Deliberately omitted | n/a |

## Sentinel (github.com/AryaanHabib/sentinel)

| Claim | Source | Status | Published copy |
|---|---|---|---|
| Go ingestion verifies HMAC-SHA256 with constant-time compare | `services/ingestion/signature.go` | Verified | Yes |
| Dedupe by `X-GitHub-Delivery` with Redis SET NX, 24h default TTL; key rolled back if enqueue fails | `services/ingestion/main.go` L17-18, L132, L168-173 | Verified | Yes |
| Hand-written minimal Redis client (SET NX EX, LPUSH, PING) | `internal/redisclient/redisclient.go` header | Verified | Yes |
| Go tests pass | Ran `go test ./...` here: both packages `ok` | Verified | "Go unit tests for signature checks and the Redis client pass" |
| Two-pass pipeline: pass 1 flags, pass 2 re-retrieves per candidate and keeps/drops | `services/agent/app/worker.py` | Verified | Yes |
| Diff position arithmetic (counts through later hunk headers, resets per file) | `app/diffing.py`; ran parser on a two-file, two-hunk diff here: positions 1-6 and 1-2 as expected | Verified | Yes |
| 422 fallback to a summary-only review | `app/github_client.py` L96-109 | Verified | Yes |
| Eval harness: 10 fixtures (5 Python, 5 JS), P/R/F1, cost, latency | `services/agent/eval/` | Verified (design only) | Design described. **No results published** |
| Precision/recall/F1/cost/latency numbers | README says pending; `db/seed/seed.sql` contains sample numbers that are seed data, not real runs | Not verified | Omitted. The dashboard isn't screenshotted because it would show seed data |
| `demo-repo/` | README references it, but it isn't in the repository | Missing | Listed under "What is incomplete" |
| Python agent unit tests | None found | n/a | Stated honestly |

## NBA Auction Fantasy (github.com/AryaanHabib/nba-auction)

| Claim | Source | Status | Published copy |
|---|---|---|---|
| Compare-and-swap on `current_bid` for bids | `src/lib/auction/engine.ts` placeBid L395-422 | Verified | Yes |
| CAS on lot close (single closer inserts roster/deducts budget) | engine.ts closeLot L469-514 | Verified | Yes |
| CAS on phase advance (`round_phase = 'sold'`) | engine.ts advanceAuction L621-690 | Verified | Yes |
| Every client races to drive transitions; Vercel Cron backstop each minute, 15s stall grace, optional CRON_SECRET | `vercel.json`, `src/app/api/auction/close-expired/route.ts` | Verified | Yes |
| $1-per-remaining-slot reserve; shared by enforcement and opening-bid cap | `src/lib/auction/validation.ts` | Verified | Yes |
| Redis per-team bid rate limit and live lot cache | engine.ts L326-331, L444 | Verified | Yes |
| README: "higher bid has to win regardless of which request is processed first" | Not what the code does: the first committed bid wins the CAS and the other bidder is told to re-bid | Overstated in README | Site describes the real behavior |
| Roster insert + budget deduction in one transaction | They're two separate writes after the CAS close | Gap | Listed under "What I would do next" |
| Automated tests | None in repo | n/a | Stated honestly |
| Live production deployment | No public URL found | Not verified | Status: "Runs locally. No public demo." |

## Arena (github.com/AryaanHabib/arena-server)

| Claim | Source | Status | Published copy |
|---|---|---|---|
| `demo/showcase.arep` replays with matching hashes | Compiled the Spring-free `arena.sim`/`arena.replay` classes with javac and ran `ReplayRunner` 5×: seed 1786352971798, 615 ticks, 524 inputs, final hash MATCHED, 1-10 ms | Verified | "615 ticks re-simulated, 525 of 525 recorded hashes matched" |
| 525 per-tick hashes compared | Custom driver re-running the same loop: checked=525 matched=525, final=true | Verified | Yes |
| Replay figure on the site | Generated from that re-simulation (`public/media/arena-replay.svg`). One player, 55 shots | Verified | Caption says one player |
| 20 Hz tick, Q16.16 fixed point, banned-token determinism guard test | `application.yml`, `sim/Fixed.java`, `DeterminismGuardTest.java`; grep of `arena/sim` finds only `DETERMINISM-EXEMPT` display helpers | Verified | Yes |
| JWT checked in the WebSocket handshake | `auth/JwtHandshakeInterceptor.java` | Source-only | Yes |
| 159 JUnit test methods | Counted `@Test`/`@ParameterizedTest`/`@RepeatedTest` | Verified count | "159 test methods". **Not run here** (Gradle plugin portal blocked in this sandbox) |
| README "399 tests, 0 failures" | Not reproduced | Not verified | Omitted |
| Tick cost 0.14 ms, 52 B/player/tick, 4.19 ms lag, ~2,560× real time | README measurements on Aryaan's machine | Source-only | Omitted, except replay time measured here |
| Lag compensation | README: designed, not implemented | Verified as unimplemented | Labeled "designed, not built" |

## Adventure of the Ages (Team11.zip, second upload)

| Claim | Source | Status | Published copy |
|---|---|---|---|
| Title, team of four, CPSC 427, Jan 14 – Apr 4 2026 | README, git history (446 commits) | Verified | Yes |
| Built on the course template and its tinyECS; not "written from scratch" | First upload's history shows the A1 template as the base | Verified | Old site's "from scratch" claim removed |
| Aryaan implemented JSON save/reload | M3 README "Implemented by: Aryaan Habib"; blame of `world_system.cpp` L684-1467 is about 80% his | Verified | Yes |
| Aryaan created the plain-text level loader | `git log --diff-filter=A src/levels/level_loader.cpp` → AryaanHabib, Feb 24 2026 (teammates extended it) | Verified | "I wrote the first version" |
| 10 of 14 campaign level files created by Aryaan | `git log --diff-filter=A` per file | Verified | Yes |
| Stars/timer, HUD hearts/fuel, level select, lamp/darkness, toxic water, portals, camera culling, pause/focus input clearing | Aryaan's commit subjects plus blame of the matching regions | Verified | Yes |
| Teammates: camera & parallax & audio (Rishavpreet), pathfinding & squad AI & iris wipe & profiler (Nabeel), gravity flip & steam-vent particles & performance pass (Devin) | Milestone README credits, commit log | Verified | Credited on the page |
| Valgrind 0 bytes definitely/indirectly lost | Team README M4 section | Source-only (team) | Attributed to the team |
| Render-cache optimization 64 ms → 9.6 ms | Team README; commits by Devin | Not Aryaan's | Not claimed |
| Screenshots | `data/assets/screenshots/` in the team repo | Real team captures | Used with credit |
| Gameplay video | Not supplied | Missing | No video on the page |
| Public repository | UBC course GitHub (github.students.cs.ubc.ca), not public | n/a | No repo link |

## Archive

| Project | Source | Status | Notes |
|---|---|---|---|
| Face Value / xPTS+ | Repo; `--synthetic --v2` run here printed `corr(per100, hidden skill) = 0.96`; live site serves `players.json` (350 players, 2025-26) | Verified | Live link included |
| MellowMate | Django backend calls OpenAI (`chat/views.py`), React front end | Verified | 2025 |
| QuantumQuest | Django REST Framework backend + Docker Compose; `frontend/` is empty in the repo | Verified | Described as an API only |
| UBC Course Finder | CPSC 310 course repo: TypeScript query engine, REST server, D3 page | Verified | Labeled course project |
| SwipeMates | `AryaanHabib/SwipeMate`: Java Swing UI, JDBC/Oracle | Verified | Labeled course project |
| TweetMods | Private repository | Not verifiable | Omitted |
| RepoLens | Excluded by Aryaan | n/a | Omitted everywhere |
