# Hodgepodge Bible

The Field Journal redesign — a static site (Eleventy) with a self-serve content editor (Decap CMS) at `/admin`, deployed on Netlify.

## What you can edit yourself, once set up

Go to `yoursite.netlify.app/admin` (or `hodgepodgebible.com/admin` once the domain is connected) and log in with GitHub. From there:

- **Field Notes (Blog)** — add/edit blog posts
- **Sermon Notes** — add/edit weekly sermon breakdowns
- **Podcast Episodes** — add/edit episodes
- **Apps** — edit the two app cards
- **Site Settings** — tagline, podcast subscribe links

Every save there commits to GitHub and Netlify automatically rebuilds the live site (~30–60 seconds).

## Local development

```bash
npm install
npm start        # runs at http://localhost:8080
```

```bash
npm run build     # builds the static site into _site/
```

## Remaining one-time setup (needs your login, not mine)

### 1. Connect Netlify
1. Go to [app.netlify.com](https://app.netlify.com) and sign up / log in (free).
2. **Add new site → Import an existing project → GitHub** → select the `hodgepodge-bible-site` repo.
3. Build command: `npm run build`. Publish directory: `_site`. (Already set in `netlify.toml`, so it should autofill.)
4. Click deploy. You'll get a live `*.netlify.app` URL within a minute.

### 2. Set up GitHub login for the CMS
Decap CMS needs a GitHub OAuth App so you can log into `/admin`:
1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Homepage URL: your Netlify URL (e.g. `https://your-site.netlify.app`).
3. Authorization callback URL: `https://api.netlify.com/auth/done`.
4. Copy the **Client ID** and **Client Secret** it gives you.
5. In Netlify: **Site settings → Access control → OAuth → Install provider → GitHub**, paste in the Client ID and Secret.
6. Visit `your-site.netlify.app/admin`, click "Login with GitHub," authorize it. You're in.

### 3. Point hodgepodgebible.com at the new site
1. In Netlify: **Site settings → Domain management → Add a domain** → enter `hodgepodgebible.com`.
2. Netlify will show you DNS records to add (usually one A record + one CNAME for `www`).
3. In GoDaddy: **My Products → DNS → Manage DNS** for hodgepodgebible.com, add/update those records to match what Netlify gave you.
4. DNS changes can take a few minutes to a few hours to take effect. Your current GoDaddy site keeps working until this finishes, so there's no downtime risk — just don't unpublish the GoDaddy site until you've confirmed the new one is live.

## Project structure

```
src/
  _includes/       page layouts (base, blog-post, sermon-note, episode)
  _data/           apps.json, site.json — editable via the CMS too
  blog/            blog posts (markdown)
  sermon-notes/    sermon note breakdowns (markdown)
  podcast/         podcast episodes (markdown)
  assets/          css + images
admin/             Decap CMS config (the /admin editor)
```
