// Checks every internal route and asset against a running preview server
// (npm run preview), and prints the external URLs used so they can be
// checked from a normal network.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] || 'http://localhost:4173';
const files = [];
const walk = (p) => (statSync(p).isDirectory() ? readdirSync(p).forEach((f) => walk(join(p, f))) : files.push(p));
walk('src');
const text = files.map((f) => readFileSync(f, 'utf8')).join('\n');

const internal = new Set(['/', '/work/sentinel', '/work/nba-auction', '/work/arena', '/work/adventure-of-the-ages', '/favicon.svg']);
for (const m of text.matchAll(/['"`](\/media\/[\w.-]+)/g)) internal.add(m[1]);
const external = new Set([...text.matchAll(/https:\/\/[^\s'"`)]+/g)].map((m) => m[0].replace(/[`$].*$/, '')));

let bad = 0;
for (const p of internal) {
  const r = await fetch(base + p);
  const ok = r.status === 200;
  if (!ok) bad++;
  console.log(`${ok ? 'ok ' : 'BAD'} ${r.status} ${p}`);
}
console.log('\nExternal URLs referenced:');
[...external].sort().forEach((u) => console.log('  ' + u));
process.exit(bad ? 1 : 0);
