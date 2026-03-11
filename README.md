# Market Research Agent 🔬

AI-powered B2B market research for Power BI, Data Engineering & AI/ML sales outreach.

**Free data sources:** Jina.ai (website scraping) + DuckDuckGo (search) + Claude AI (synthesis)

---

## Deploy to Vercel in 3 Steps (no terminal needed)

### STEP 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up / log in
3. Go to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`) — save it somewhere safe

---

### STEP 2 — Upload to GitHub
1. Go to https://github.com and sign up (free)
2. Click the **+** button → **New repository**
3. Name it: `market-research-agent`
4. Set to **Private** (recommended for internal tool)
5. Click **Create repository**
6. On the next screen click **uploading an existing file**
7. Drag and drop ALL the project files/folders:
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `.env.example`
   - `src/` folder (with all contents)
8. Click **Commit changes**

---

### STEP 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Find and select `market-research-agent` from your GitHub repos
4. Click **Import**
5. BEFORE clicking Deploy, scroll down to **Environment Variables**
6. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (your key from Step 1)
7. Click **Deploy**
8. Wait ~2 minutes — Vercel gives you a live URL like:
   `https://market-research-agent.vercel.app`

**Share that URL with your sales team. Done. ✅**

---

## How it works
- Your sales team opens the URL and enters a company name + website
- The app scrapes the website (via Jina.ai) and searches DuckDuckGo — both free, no API key
- Your Anthropic API key (stored securely in Vercel, never exposed to users) powers the Claude analysis
- Research brief is displayed in ~15 seconds

## Cost estimate
- Vercel hosting: **Free** (Hobby plan covers this usage)
- Jina.ai scraping: **Free** (~200 scrapes/day free tier)
- DuckDuckGo search: **Free** (no limits)
- Anthropic Claude: ~**$0.003 per research run** (roughly ₹0.25 per research)
  - 100 researches/month ≈ ₹25/month
