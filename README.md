# Feng Chen — Academic CV

A minimal, read.cv-inspired static academic CV website with dark/light mode toggle. Built for deployment on Cloudflare Pages.

## Features

- Pure static HTML/CSS/JS (no build step)
- Dark/light theme toggle with localStorage persistence
- Responsive, mobile-first layout
- Clean typography (DM Serif Display + Inter)
- Glassmorphism accents on cards and toggle button

## Local Preview

```bash
# Using Python
python3 -m http.server 8080

# Or using npx
npx serve .
```

Then open http://localhost:8080

## Deploy to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. Push this repo to GitHub/GitLab
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create project
3. Connect your repository
4. Build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)
5. Deploy

### Option 2: Direct Upload (Wrangler)

```bash
npx wrangler pages deploy . --project-name=fengchen-cv
```

First-time setup: `npx wrangler login` to authenticate.

### Option 3: Manual Upload

1. Create a new Pages project in Cloudflare Dashboard
2. Choose "Direct Upload"
3. Zip the project folder (index.html, styles.css, script.js) and upload

## Project Structure

```
.
├── index.html      # Main CV content
├── styles.css      # Styles + theme variables
├── script.js       # Theme toggle logic
├── wrangler.toml   # Cloudflare config (optional)
└── README.md
```

## Custom Domain

After deployment, add a custom domain in Cloudflare Pages project settings (e.g. `cv.yourdomain.com`).
