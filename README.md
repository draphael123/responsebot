# Fountain Response Bot

A tool that helps your team generate empathetic, compliant patient responses with automatic escalation detection and workflow guidance.

## Features

### Web Application
- **Paste & Generate**: Paste patient messages and instantly get polished responses
- **Tone Variants**: Choose between neutral, extra empathetic, or ultra concise
- **Context Inputs**: Add program type, topic, state, and current status
- **Escalation Detection**: Automatically flags legal threats, critical symptoms, and safety concerns
- **Internal Notes**: Provides workflow guidance and next steps
- **Copy to Clipboard**: One-click copy of generated responses

### Chrome Extension
- **Right-Click Generation**: Select text and right-click to generate response
- **Side Panel**: Clean interface accessible from any page
- **One-Click Insert**: Insert generated responses directly into text fields
- **Auto-Detect Selection**: Automatically captures selected text

## Architecture

```
fountain-response-bot/
├── apps/
│   ├── web/              # Next.js web application
│   └── extension/        # Chrome extension (MV3)
├── packages/
│   └── shared/           # Shared types, rules, and utilities
└── package.json          # Monorepo root
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (or compatible LLM provider)
- Chrome browser (for extension)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fountain-response-bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cd apps/web
cp .env.example .env.local
# Edit .env.local with your OPENAI_API_KEY
```

### Development

#### Web Application

```bash
cd apps/web
npm run dev
```

The app will be available at `http://localhost:3000`

#### Chrome Extension

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

3. Update API URL in `apps/extension/src/sidepanel.ts`:
   - Change `API_URL` to your web app URL (localhost for dev, or deployed URL)

### Building for Production

```bash
# Build all packages
npm run build

# Build web app specifically
cd apps/web
npm run build
```

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional, defaults to gpt-4-turbo-preview)
   - `APP_URL` (your Vercel deployment URL)

3. Deploy:
   - Vercel will automatically detect Next.js
   - Preview deployments are created per PR
   - Production deploys from main branch

### Chrome Extension Distribution

1. Build the extension:
```bash
cd apps/extension
npm run build
```

2. Update `API_URL` in `sidepanel.ts` to production URL

3. Package for Chrome Web Store:
   - Zip the `dist` folder
   - Submit to Chrome Web Store Developer Dashboard

## Core Rules & Escalation

### Escalation Triggers

The system automatically detects and escalates:

- **Legal Threats**: Lawsuit, attorney, malpractice, legal action
- **Regulatory Complaints**: BBB, state board, regulatory complaint
- **Critical Symptoms**: Emergency, severe symptoms, life-threatening situations
- **Safety Concerns**: Threats, violence, harm

When escalated, the system returns:
- "Cease communication" guidance
- Internal ticket instructions
- Workflow-specific escalation steps

### Communication Style

Responses follow Fountain guidelines:
- Empathetic and understanding
- Solution-oriented
- Human, warm language
- Clear, actionable next steps
- Avoids corporate jargon
- No phrases that inflame situations

## API Endpoints

### POST `/api/generate`

Generate a response for a patient message.

**Request:**
```json
{
  "message": "Patient message text",
  "tone": "neutral" | "empathetic" | "concise",
  "context": {
    "program": "TRT" | "HRT" | "GLP",
    "topic": "billing" | "labs" | "refill" | ...,
    "state": "CA",
    "currentStatus": "Order shipped"
  }
}
```

**Response:**
```json
{
  "status": "ok" | "escalation" | "critical_escalation",
  "category": "billing" | "labs" | ...,
  "final_response": "Generated response text",
  "internal_notes": ["Note 1", "Note 2"],
  "confidence": 0.85,
  "workflow_citation": "Workflow Name"
}
```

### POST `/api/classify`

Classify a message for category and escalation status.

## Configuration

### Escalation Rules

Edit `packages/shared/src/escalation-rules.ts` to modify escalation patterns.

### Style Rules

Edit `packages/shared/src/style-rules.ts` to update communication guidelines.

### Workflow Mappings

Edit `packages/shared/src/style-rules.ts` to customize workflow mappings.

## Security & Compliance

- **PHI Handling**: No raw PHI is logged in request bodies
- **Redaction**: Implement log redaction for sensitive data
- **Access Control**: Add authentication for production use
- **Audit Trails**: Consider adding audit logging for HIPAA compliance

## Roadmap

### MVP (Current)
- ✅ Basic response generation
- ✅ Escalation detection
- ✅ Tone variants
- ✅ Chrome extension with side panel
- ✅ Copy to clipboard

### V1 (Next)
- [ ] User authentication
- [ ] Response history
- [ ] Saved templates
- [ ] Admin-configurable rules
- [ ] Analytics dashboard
- [ ] Per-site adapters (Intercom, Gmail)
- [ ] Hotkey support

## License

Private - Internal use only

