# Bisolarverse — how it works & how to put it live

Hi Bisola. This folder is your whole site. Three things in it:

- **index.html** — the site itself. Your bio, your worlds, your design.
- **api/feed.js** — the little engine that pulls your latest Substack and
  Medium posts in automatically. You publish, the site updates. You never
  open this file again unless you add a third feed someday.
- **README.md** — this.

---

## Seeing it right now

Double-click **index.html** to open it in your browser. You'll see the full
design with a couple of sample posts standing in for the writing feed. The
live feed only switches on once the site is deployed, because the engine
(`api/feed.js`) needs a host to run on. Everything else you're seeing is real.

---

## Putting it live (free, ~10 minutes, once)

The site needs to live on **Vercel** so the auto-updating feed works. Vercel
is free at your scale and runs itself afterward. Easiest path:

1. Go to **vercel.com** and sign up (the free "Hobby" plan).
2. On your dashboard, click **Add New → Project**.
3. Choose **deploy without Git** / drag-and-drop, and drop this whole
   `bisolarverse` folder in. (If it asks you to connect GitHub instead,
   that works too and makes future edits easier — either is fine.)
4. Click **Deploy**. In a minute or two you'll get a live link like
   `bisolarverse.vercel.app`. Open it — the writing feed should now be live.

That's the part I said I'd walk you through. If any screen looks different
from the above, tell me what you're seeing and I'll talk you through it.

---

## Pointing your own domain at it

Once you own **bisolarverse.com** (Namecheap, Google Domains, wherever):

1. In Vercel, open your project → **Settings → Domains**.
2. Type `bisolarverse.com`, click add.
3. Vercel shows you two DNS records to paste into your domain provider.
   Paste them, save, and it goes live on your real domain within the hour.

---

## Editing it later (your favourite part — no code)

Open **index.html** and scroll to the block that says
`EDITABLE CONTENT`. Everything you'd want to change is there in plain words:

- **Your bio** — the `BIO` block.
- **The worlds** — the `WORLDS` list. Copy one `{ ... }` line, change the
  words, save. Set `soon:true` to show a "soon" badge, `soon:false` to remove it.
- **Featured interviews** — the `FEATURED` list. Add the real ones, give each
  a `url`, delete the placeholders.
- **Your links** — the `LINKS` block at the top.

Save the file, drag the folder back onto Vercel (or push to GitHub if you
connected it), and the change is live. **New Substack and Medium posts need
none of this — they appear on their own.**

---

## Your feeds, for reference

- Substack: `https://bisolaabimbola.substack.com/feed`
- Medium: `https://medium.com/feed/@bysorlah48`

Medium occasionally hiccups on its feed; if it ever does, the site quietly
shows Substack alone rather than breaking. It heals itself on the next load.
