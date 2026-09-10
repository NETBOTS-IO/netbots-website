/**
 * /api/blog — Alias for /api/blog/publish
 *
 * Both endpoints work identically so you can use either:
 *   POST https://netbots.io/api/blog/publish   (canonical)
 *   POST https://netbots.io/api/blog            (alias shorthand)
 */
import { GET, POST, OPTIONS } from './publish/route';

export { GET, POST, OPTIONS };
