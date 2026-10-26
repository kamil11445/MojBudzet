import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

// Read-only verification. Never reads or modifies browser/user budget data.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const json = path => JSON.parse(read(path));
const config = json('vercel.json');
assert.equal(config.framework, 'vite');
assert.equal(config.installCommand, 'npm ci');
assert.equal(config.buildCommand, 'npm run build');
assert.equal(config.outputDirectory, 'dist');
assert.ok(config.rewrites.some(r => r.source === '/(.*)' && r.destination === '/index.html'));
for (const source of ['/sw.js', '/registerSW.js', '/manifest.webmanifest', '/', '/index.html']) {
  assert.ok(config.headers.some(r => r.source === source && r.headers.some(h =>
    h.key === 'Cache-Control' && h.value.includes('max-age=0') && h.value.includes('must-revalidate')
  )), `Missing revalidation header: ${source}`);
}
const pkg = json('package.json');
const lock = json('package-lock.json');
for (const group of ['dependencies', 'devDependencies']) {
  assert.deepEqual(pkg[group], lock.packages[''][group], `Lockfile mismatch: ${group}`);
}
const manifest = json('dist/manifest.webmanifest');
assert.equal(manifest.name, 'Mój Budżet');
assert.equal(manifest.start_url, '/');
assert.equal(manifest.scope, '/');
assert.equal(manifest.display, 'standalone');
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  const bytes = readFileSync(resolve(root, 'dist', name));
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16), size);
  assert.equal(bytes.readUInt32BE(20), size);
}
for (const icon of manifest.icons) assert.ok(existsSync(resolve(root, 'dist', icon.src.slice(1))));
const html = read('dist/index.html');
assert.ok(html.includes('manifest.webmanifest'));
assert.ok(html.includes('apple-touch-icon.png'));
assert.ok(html.includes('registerSW.js'));
const registration = read('dist/registerSW.js');
assert.ok(registration.includes("register('/sw.js'"));
const worker = read('dist/sw.js');
assert.ok(worker.includes('index.html'));
assert.ok(worker.includes('NavigationRoute'));
assert.ok(worker.includes('precacheAndRoute'));
console.log('OK: Vercel config, lockfile, manifest, PNG icons, SW registration and offline navigation fallback.');
console.log('Vercel response headers and real iPhone installation still require checking after deployment.');
