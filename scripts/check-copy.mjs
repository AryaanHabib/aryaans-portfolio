// Fails if site copy contains an em dash, excluded projects, or stock phrases.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src', 'index.html'];
const banned = [
  [/—/, 'em dash'],
  [/repolens/i, 'RepoLens (excluded)'],
  [/passionate|innovative solutions|building the future|where technology meets|turning ideas into reality|problem solver/i, 'stock phrase'],
  [/\+1 ?250|\bphone\b/i, 'personal phone'],
];
const files = [];
const walk = (p) => (statSync(p).isDirectory() ? readdirSync(p).forEach((f) => walk(join(p, f))) : files.push(p));
roots.forEach(walk);
let bad = 0;
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    for (const [re, why] of banned) {
      if (re.test(line)) {
        console.log(`${f}:${i + 1}  ${why}: ${line.trim().slice(0, 100)}`);
        bad++;
      }
    }
  });
}
console.log(bad ? `${bad} problem(s)` : `copy check passed (${files.length} files)`);
process.exit(bad ? 1 : 0);
