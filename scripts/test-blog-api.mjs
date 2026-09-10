/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NetBots Blog API — Live Endpoint Test Script
 * Run this from ANYWHERE outside the app (e.g. Desktop, any other folder)
 *
 *   node test-blog-api.mjs
 *
 * Tests:
 *   1. OPTIONS preflight (CORS check)
 *   2. GET  — documentation endpoint
 *   3. POST — actual blog publish with E-E-A-T fields
 *   4. POST with WRONG KEY — verifies 401 + CORS on error responses
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = 'http://localhost:3000';   // <-- HTTP, no HTTPS, no special config
const ENDPOINT = `${BASE_URL}/api/blog/publish`;
const API_KEY  = 'netbots_blog_publish_api_secret_2026';

// ── ANSI colors ───────────────────────────────────────────────────────────────
const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  blue:   (s) => `\x1b[34m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
  dim:    (s) => `\x1b[2m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
};

function header(title) {
  console.log('\n' + c.bold(c.cyan('━'.repeat(62))));
  console.log(c.bold(`  ${title}`));
  console.log(c.bold(c.cyan('━'.repeat(62))));
}
const pass = (label, value = '') => console.log(`  ${c.green('✅ PASS')}  ${c.bold(label)} ${c.dim(value)}`);
const fail = (label, value = '') => console.log(`  ${c.red('❌ FAIL')}  ${c.bold(label)} ${c.dim(value)}`);
const info = (label, value = '') => console.log(`  ${c.yellow('ℹ')}       ${label} ${c.dim(value)}`);

// ─────────────────────────────────────────────────────────────────────────────
// TEST 1: OPTIONS Preflight — CORS Check
// ─────────────────────────────────────────────────────────────────────────────
async function testCORSPreflight() {
  header('TEST 1 — OPTIONS Preflight (CORS Check)');
  console.log(c.dim(`  Simulating browser cross-origin preflight to:\n  ${ENDPOINT}\n`));

  try {
    const res = await fetch(ENDPOINT, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:8080',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'x-api-key, content-type',
      },
    });

    info('HTTP Status', `${res.status} ${res.statusText}`);

    const acao = res.headers.get('access-control-allow-origin');
    const acam = res.headers.get('access-control-allow-methods');
    const acah = res.headers.get('access-control-allow-headers');
    const acma = res.headers.get('access-control-max-age');

    info('Access-Control-Allow-Origin',  acao || '(missing)');
    info('Access-Control-Allow-Methods', acam || '(missing)');
    info('Access-Control-Allow-Headers', acah || '(missing)');
    info('Access-Control-Max-Age',       acma || '(missing)');
    console.log('');

    acao === '*' ? pass('Allow-Origin is *', '→ Any origin, no CORS block') : fail('Allow-Origin not *', `Got: ${acao}`);
    acam?.includes('POST') ? pass('Allow-Methods includes POST') : fail('Allow-Methods missing POST', `Got: ${acam}`);
    acah?.toLowerCase().includes('x-api-key') ? pass('Allow-Headers includes x-api-key') : fail('Allow-Headers missing x-api-key', `Got: ${acah}`);
    res.status === 204 ? pass('Status 204 No Content', '→ Correct preflight response') : fail('Unexpected preflight status', `${res.status}`);

  } catch (err) {
    fail('OPTIONS request failed', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 2: GET — Self-Documenting Endpoint
// ─────────────────────────────────────────────────────────────────────────────
async function testGET() {
  header('TEST 2 — GET /api/blog/publish (Documentation Endpoint)');
  console.log(c.dim(`  Fetching field reference schema via plain HTTP GET\n`));

  try {
    const res = await fetch(`${ENDPOINT}?apiKey=${API_KEY}`, {
      headers: { 'Origin': 'http://localhost:9999' },
    });

    info('HTTP Status', `${res.status}`);
    const acao = res.headers.get('access-control-allow-origin');
    info('CORS Header', acao || '(missing)');
    console.log('');

    acao === '*' ? pass('CORS header on GET response') : fail('CORS missing on GET', `Got: ${acao}`);

    if (!res.ok) { fail('GET failed', `HTTP ${res.status}`); return; }
    const data = await res.json();

    data.endpoint            ? pass('Response has endpoint',    data.endpoint) : fail('Missing endpoint field');
    data.fields?.required    ? pass('Required fields documented')               : fail('Missing required fields schema');
    data.examplePayload?.eeat ? pass('E-E-A-T example payload present')          : fail('Missing E-E-A-T example');
  } catch (err) {
    fail('GET request failed', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 3: POST — Full Blog Publish with E-E-A-T Fields
// ─────────────────────────────────────────────────────────────────────────────
async function testPOST() {
  header('TEST 3 — POST /api/blog/publish (Full E-E-A-T Blog Publish)');
  console.log(c.dim(`  Sending complete blog article over plain HTTP\n`));

  const testArticle = {
    title: `[TEST] Blog API Verification — ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`,
    excerpt: 'Automated test article published via the NetBots Blog API to verify CORS, HTTP, and E-E-A-T functionality. Safe to delete from Sanity Studio.',
    category: 'AI & Automation',
    paragraphs: [
      '## Test Section: API Verification',
      'This paragraph was published via an automated local PC script running over plain HTTP — proving no CORS issues and no HTTPS requirement.',
      '> Published from outside the Next.js app — pure Node.js fetch() with x-api-key header.',
      '## What This Test Proves',
      '- HTTP works without any CORS block',
      '- x-api-key header auth is functional',
      '- Markdown is converted to Sanity PortableText correctly',
      '- All E-E-A-T fields are processed and stored in Sanity',
    ],
    tags: ['Test', 'API', 'CORS', 'NetBots'],
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    eeat: {
      keyTakeaways: [
        'API endpoint accessible over plain HTTP from any local script.',
        'No CORS errors — x-api-key header auth works cross-origin.',
        'All E-E-A-T fields (keyTakeaways, reviewedBy, citations, faqs) are processed.',
      ],
      experienceHighlight: 'Published successfully from Desktop/any folder via automated script — 0 CORS errors, 0 HTTP protocol blocks.',
      reviewedBy: {
        name: 'Saqlain Shah',
        role: 'Founder & CEO, NetBots',
        credentials: 'Full-Stack Engineer · AI Systems Architect',
        linkedIn: 'https://www.linkedin.com/in/syedsaqlainabbas110',
      },
      citations: [
        { title: 'NetBots Blog API Docs', url: 'http://localhost:3000/api/blog/publish', publisher: 'NetBots', year: '2026' },
      ],
      faqs: [
        { question: 'Does the Blog API work from local scripts without CORS?', answer: 'Yes — Access-Control-Allow-Origin: * is set on every response including errors.' },
        { question: 'Is HTTPS required?', answer: 'No — HTTP works fine for local scripts. Use HTTPS for production (https://netbots.io).' },
      ],
    },
  };

  try {
    const t0 = Date.now();
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'Origin': 'http://my-local-automation-script',
      },
      body: JSON.stringify(testArticle),  // draft: true by default
    });
    const elapsed = Date.now() - t0;
    const data = await res.json();

    const acao = res.headers.get('access-control-allow-origin');
    info('HTTP Status',    `${res.status}`);
    info('Response Time',  `${elapsed}ms`);
    info('CORS Header',    acao || '(missing)');
    console.log('');

    acao === '*' ? pass('CORS header on POST response') : fail('CORS missing on POST', `Got: ${acao}`);

    if (res.status === 200 && data.success) {
      pass('HTTP 200 OK', '→ Saved successfully');
      data.data?.draft !== undefined && (
        data.data.draft
          ? pass('Saved as DRAFT', '→ Invisible on live site until published from Studio')
          : pass('Saved as PUBLISHED', '→ Immediately live on the blog')
      );
      data.data?.slug           && pass('Slug generated',       data.data.slug);
      data.data?.studioLocalUrl && pass('Studio URL (local)',   data.data.studioLocalUrl);
      data.data?.studioUrl      && pass('Studio URL (live)',    data.data.studioUrl);

      console.log('\n' + c.bold('  📊 E-E-A-T Fields Written to Sanity:'));
      const eeat = data.data?.eeatFields || {};
      eeat.keyTakeaways        ? pass('keyTakeaways')        : fail('keyTakeaways NOT stored');
      eeat.experienceHighlight ? pass('experienceHighlight') : fail('experienceHighlight NOT stored');
      eeat.reviewedBy          ? pass('reviewedBy')          : fail('reviewedBy NOT stored');
      eeat.citations > 0       ? pass(`citations (${eeat.citations})`) : fail('citations NOT stored');
      eeat.faqs > 0            ? pass(`faqs (${eeat.faqs})`)           : fail('faqs NOT stored');

      console.log('\n' + c.bold(c.green('  🎉 Draft saved! Open Studio to review & publish:')));
      console.log(`     ${c.blue(data.data?.studioLocalUrl)}`);
      console.log(c.dim(`     (After publishing from Studio → live at: ${data.data?.localUrl})`));

    } else if (res.status === 401) {
      fail('401 Unauthorized — check API key in script matches BLOG_API_KEY in .env');
    } else {
      fail(`HTTP ${res.status}`, JSON.stringify(data));
    }

  } catch (err) {
    fail('POST request failed', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST 4: Auth Guard — Wrong Key Should Get 401 + CORS on Error Response
// ─────────────────────────────────────────────────────────────────────────────
async function testAuthRejection() {
  header('TEST 4 — Auth Guard (Wrong API Key → 401 with CORS headers)');
  console.log(c.dim(`  Sending wrong API key — should be rejected with 401\n`));

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': 'wrong-key-test' },
      body: JSON.stringify({ title: 't', excerpt: 'e', category: 'AI & Automation', paragraphs: ['p'] }),
    });

    const acao = res.headers.get('access-control-allow-origin');
    info('HTTP Status', `${res.status}`);
    info('CORS Header', acao || '(missing)');
    console.log('');

    res.status === 401 ? pass('401 Unauthorized', '→ Auth guard working') : fail('Expected 401 but got', `${res.status}`);
    acao === '*' ? pass('CORS header present on 401', '→ Browser can read error, not an opaque block') : fail('CORS missing on 401', 'Browser scripts cannot see the error message');

  } catch (err) {
    fail('Auth test failed', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n' + c.bold(c.green('╔══════════════════════════════════════════════════════════════╗')));
  console.log(c.bold(c.green('║   NetBots Blog Automation API — Live Test Suite              ║')));
  console.log(c.bold(c.green('╚══════════════════════════════════════════════════════════════╝')));
  console.log(c.dim(`  Endpoint : ${ENDPOINT}`));
  console.log(c.dim(`  Protocol : HTTP (plain — no HTTPS required)`));
  console.log(c.dim(`  Auth     : x-api-key header`));
  console.log(c.dim(`  Location : Running from OUTSIDE the Next.js app`));

  await testCORSPreflight();
  await testGET();
  await testPOST();
  await testAuthRejection();

  console.log('\n' + c.bold(c.cyan('━'.repeat(62))));
  console.log(c.bold(c.green('  ✅ Test suite complete!')));
  console.log(c.dim('  ❌ marks = something needs fixing | ✅ marks = working\n'));
}

main().catch(console.error);
