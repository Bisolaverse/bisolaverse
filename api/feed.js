// ============================================================
//  /api/feed  —  pulls your latest Substack + Medium posts live
// ============================================================
//  Runs on Vercel for free. No packages to install. It fetches
//  both RSS feeds, merges them, sorts newest-first, and hands the
//  front-end clean JSON. Cached for an hour so it's fast and never
//  hammers either site.
//
//  To add or change a feed, edit the FEEDS list below.
// ============================================================

const FEEDS = [
  { source: "Substack", url: "https://bisolaabimbola.substack.com/feed" },
  { source: "Medium",   url: "https://medium.com/feed/@bysorlah48" },
];

const MAX_POSTS = 6;

// --- tiny, dependency-free helpers ---
function unwrap(s = "") {
  return s
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}
function stripTags(s = "") {
  return unwrap(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1] : "";
}
function excerpt(s, n = 150) {
  const t = stripTags(s);
  return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t;
}
function fmtDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function parseItems(xml, source) {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return items.map((it) => {
    const title = stripTags(pick(it, "title"));
    const link = unwrap(pick(it, "link")) || (it.match(/<link[^>]*>([^<]+)/i)?.[1] || "");
    const pub = unwrap(pick(it, "pubDate"));
    const body = pick(it, "content:encoded") || pick(it, "description");
    return {
      source,
      title,
      url: link.trim(),
      excerpt: excerpt(body),
      date: fmtDate(pub),
      ts: new Date(pub).getTime() || 0,
    };
  }).filter((p) => p.title && p.url);
}

async function fetchFeed(feed) {
  try {
    const r = await fetch(feed.url, {
      headers: { "User-Agent": "BisolarVerse/1.0 (+https://bisolarverse.com)" },
    });
    if (!r.ok) return [];
    const xml = await r.text();
    return parseItems(xml, feed.source);
  } catch {
    return []; // one feed failing never breaks the page
  }
}

module.exports = async (req, res) => {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const posts = results
    .flat()
    .sort((a, b) => b.ts - a.ts)
    .slice(0, MAX_POSTS)
    .map(({ ts, ...rest }) => rest);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).json({ posts });
};
