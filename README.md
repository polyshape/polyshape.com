# Polyshape

Building the Intelligence that Safeguards Us!

---

## Prerequisites
Before starting, install:

1. **[Git](https://git-scm.com/downloads)**
   - Check: `git --version`

2. **[Node.js](https://nodejs.org/)** (LTS recommended, e.g. 20.x)
   - Includes **npm** (Node package manager)
   - Check: `node -v` and `npm -v`

3. **A code editor** (recommended: [VS Code](https://code.visualstudio.com/))

---

## Quick Start
```bash
# 1) Install dependencies
npm install

# 2) Start vite dev server standalone
npm run dev
```

OR start dev server and vercel functions for api/contact (for mocking the contact form).\
In order for this to work, vercel needs to login and link the local project to a vercel project.\
Run:
```bash
npm exec vercel login
npm exec vercel link
npm exec vercel env pull .env.local
```

Then start the dev server with vercel functions (api/contact).
```bash
npm run start
```