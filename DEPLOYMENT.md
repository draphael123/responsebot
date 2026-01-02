# Deployment Guide

## Vercel Deployment (Web App)

### Prerequisites
- Vercel account
- GitHub repository connected
- OpenAI API key

### Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `apps/web` directory as the root

2. **Configure Build Settings**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && npm install && npm run build --filter=@fountain/web`
   - Output Directory: `.next` (default)

3. **Set Environment Variables**
   In Vercel project settings → Environment Variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4-turbo-preview (optional)
   APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Push to main branch for production
   - Create PR for preview deployments

### Monorepo Considerations

If using Turborepo, you may need to adjust build commands:

```json
{
  "buildCommand": "cd ../.. && npm install && npm run build --filter=@fountain/web",
  "installCommand": "cd ../.. && npm install"
}
```

Or use Vercel's monorepo support by setting:
- Root Directory: `.` (project root)
- Build Command: `npm run build --filter=@fountain/web`

## Chrome Extension Deployment

### Development Testing

1. Build the extension:
```bash
cd apps/extension
npm run build
```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `apps/extension/dist` folder

3. Update API URL:
   - Edit `apps/extension/src/sidepanel.ts`
   - Change `API_URL` to your Vercel deployment URL
   - Rebuild: `npm run build`

### Production Distribution

1. **Prepare for Chrome Web Store**
   - Build the extension with production API URL
   - Create icons (see `ICONS.md`)
   - Test thoroughly

2. **Package Extension**
   ```bash
   cd apps/extension/dist
   zip -r fountain-response-bot.zip .
   ```

3. **Submit to Chrome Web Store**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Create new item
   - Upload zip file
   - Fill in store listing details
   - Submit for review

### Updating Extension

1. Update version in `manifest.json`
2. Rebuild and test
3. Create new zip package
4. Upload to Chrome Web Store

## Environment Variables

### Web App (.env.local)

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
APP_URL=http://localhost:3000  # or your Vercel URL
```

### Extension

Update `API_URL` constant in `apps/extension/src/sidepanel.ts`:
```typescript
const API_URL = "https://your-app.vercel.app";
```

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use Vercel environment variables (not hardcoded)
- [ ] Enable CORS restrictions in API routes if needed
- [ ] Add authentication for production (optional for MVP)
- [ ] Review OpenAI API usage limits
- [ ] Implement rate limiting if needed
- [ ] Add error logging/monitoring (e.g., Sentry)

## Troubleshooting

### Build Failures

- Ensure all dependencies are installed: `npm install` at root
- Check TypeScript errors: `npm run lint`
- Verify shared package builds: `cd packages/shared && npm run build`

### Extension Not Loading

- Check browser console for errors
- Verify manifest.json is valid
- Ensure all files are in dist/ folder
- Check API URL is accessible (CORS issues)

### API Errors

- Verify OPENAI_API_KEY is set correctly
- Check API rate limits
- Review Vercel function logs
- Test API endpoint directly with curl/Postman

