# Quick Start Guide

Get the Fountain Response Bot up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Step 1: Install Dependencies

```bash
npm install
```

This installs dependencies for all packages in the monorepo.

## Step 2: Build Shared Package

```bash
cd packages/shared
npm run build
cd ../..
```

## Step 3: Configure Web App

```bash
cd apps/web
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

## Step 4: Run Web App

```bash
cd apps/web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test It Out

1. Paste a patient message like:
   > "I haven't received my refill yet and it's been 2 weeks. This is unacceptable."

2. Select tone: "Extra Empathetic"
3. Click "Generate Response"
4. See the generated response with internal notes!

## Test Escalation Detection

Try a message that should trigger escalation:
> "I'm going to sue you for malpractice. This medication made me sick."

You should see an escalation warning instead of a normal response.

## Chrome Extension Setup (Optional)

1. **Create Extension Icons**
   - Create 16x16, 48x48, and 128x128 PNG icons
   - Place them in `apps/extension/src/icons/`
   - See `apps/extension/ICONS.md` for details

2. **Build Extension**
   ```bash
   cd apps/extension
   npm run build
   ```

3. **Update API URL**
   - Edit `apps/extension/src/sidepanel.ts`
   - Change `API_URL` to `"http://localhost:3000"` (for dev)
   - Rebuild: `npm run build`

4. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `apps/extension/dist` folder

5. **Test Extension**
   - Select text on any webpage
   - Right-click → "Generate Fountain Response"
   - Side panel opens with selected text
   - Generate response and try "Insert into Page"

## Troubleshooting

### "Module not found" errors
- Make sure you ran `npm install` at the root
- Rebuild shared package: `cd packages/shared && npm run build`

### API errors
- Check `.env.local` has valid `OPENAI_API_KEY`
- Verify API key has credits/quota
- Check browser console for CORS errors

### Extension not working
- Check Chrome extension console (right-click extension icon → Inspect)
- Verify API URL matches your web app URL
- Ensure web app is running when testing extension

## Next Steps

- Read [README.md](README.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize escalation rules in `packages/shared/src/escalation-rules.ts`
- Adjust style guidelines in `packages/shared/src/style-rules.ts`

