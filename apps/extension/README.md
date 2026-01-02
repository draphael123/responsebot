# Fountain Response Bot - Chrome Extension

## Development

1. Build the extension:
```bash
npm run build
```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Building

The build process compiles TypeScript and copies static files to the `dist` directory.

Make sure to update `API_URL` in `sidepanel.ts` to point to your deployed web app URL.

