# Fountain Response Bot - Project Summary

## What Was Built

A complete monorepo application for generating empathetic, compliant patient responses with automatic escalation detection.

## Project Structure

```
fountain-response-bot/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── app/                # Next.js App Router
│   │   │   ├── api/            # API routes
│   │   │   │   ├── generate/   # Response generation endpoint
│   │   │   │   └── classify/   # Message classification endpoint
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   └── components/          # React components
│   │       ├── ResponseGenerator.tsx
│   │       ├── ResponseOutput.tsx
│   │       ├── MessageInput.tsx
│   │       ├── ContextInputs.tsx
│   │       ├── Header.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   └── extension/              # Chrome Extension (MV3)
│       ├── src/
│       │   ├── background.ts   # Service worker
│       │   ├── content.ts      # Content script
│       │   ├── sidepanel.ts    # Side panel logic
│       │   ├── sidepanel.html  # Side panel UI
│       │   └── icons/          # Extension icons (create these)
│       └── manifest.json       # Extension manifest
│
├── packages/
│   └── shared/                 # Shared package
│       └── src/
│           ├── types.ts        # TypeScript types
│           ├── escalation-rules.ts  # Escalation detection
│           ├── style-rules.ts  # Communication guidelines
│           └── classifier.ts   # Message classification
│
└── [config files]
```

## Key Features Implemented

### ✅ Web Application
- **Response Generation**: Paste patient messages → get polished responses
- **Tone Variants**: Neutral, Extra Empathetic, Ultra Concise
- **Context Inputs**: Program type, topic, state, current status
- **Escalation Detection**: Automatic flagging of legal threats, critical symptoms
- **Internal Notes**: Workflow guidance and next steps
- **Copy to Clipboard**: One-click copy functionality
- **Clean UI**: Modern, responsive design

### ✅ Chrome Extension
- **Right-Click Generation**: Select text → right-click → generate
- **Side Panel**: Clean interface accessible from any page
- **Auto-Detect Selection**: Captures selected text automatically
- **One-Click Insert**: Insert responses into active text fields
- **Context Menu Integration**: Seamless browser integration

### ✅ Core Engine
- **Escalation Rules**: Hard gate for legal threats, critical symptoms, safety concerns
- **Style Guidelines**: Enforces empathetic, solution-oriented communication
- **Workflow Routing**: Maps messages to appropriate workflows
- **LLM Integration**: Uses OpenAI GPT-4 for response generation
- **Classification**: Auto-detects message category (billing, labs, refill, etc.)

## Escalation Detection

The system automatically detects and escalates:

1. **Legal Threats**
   - Keywords: lawsuit, sue, attorney, malpractice, legal action
   - Response: "Cease communication + create critical escalation ticket"

2. **Regulatory Complaints**
   - Keywords: BBB, better business bureau, state board, regulatory complaint
   - Response: "Escalate to compliance team"

3. **Critical Symptoms**
   - Keywords: emergency, severe, can't breathe, chest pain, life threatening
   - Response: "Critical escalation workflow + immediate clinical team"

4. **Safety Concerns**
   - Keywords: threat, harm, violence, dangerous
   - Response: "Escalate to security/safety team"

## Communication Style Rules

### Do's
- Be empathetic and understanding
- Acknowledge patient concerns
- Provide clear, actionable solutions
- Use warm, human language
- Take ownership when appropriate

### Don'ts
- Use corporate jargon
- Make excuses or deflect blame
- Use phrases that inflame situations
- Be dismissive or minimize concerns

### Avoided Phrases
- "I understand your frustration, but..."
- "That's not our policy"
- "Unfortunately, we cannot..."
- "Per our records"

## API Endpoints

### POST `/api/generate`
Generates a response for a patient message.

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
Classifies a message for category and escalation status.

## Configuration Files

### Environment Variables
- `OPENAI_API_KEY`: Required for LLM generation
- `OPENAI_MODEL`: Optional, defaults to gpt-4-turbo-preview
- `APP_URL`: For CORS configuration

### Customization Points
1. **Escalation Rules**: `packages/shared/src/escalation-rules.ts`
2. **Style Guidelines**: `packages/shared/src/style-rules.ts`
3. **Workflow Mappings**: `packages/shared/src/style-rules.ts`
4. **Classification Logic**: `packages/shared/src/classifier.ts`

## Next Steps

### To Get Started
1. Follow [QUICKSTART.md](QUICKSTART.md) for local setup
2. Add your OpenAI API key
3. Test with sample messages
4. Customize rules as needed

### For Production
1. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
2. Deploy web app to Vercel
3. Build and distribute Chrome extension
4. Add authentication (optional for MVP)
5. Set up monitoring/logging

### Future Enhancements (V1)
- User authentication and history
- Saved templates and macros
- Admin-configurable rules
- Analytics dashboard
- Per-site adapters (Intercom, Gmail)
- Hotkey support

## Testing Checklist

- [ ] Web app runs locally
- [ ] API generates responses
- [ ] Escalation detection works (try "lawsuit" message)
- [ ] Tone variants produce different responses
- [ ] Chrome extension loads
- [ ] Extension captures selected text
- [ ] Extension generates responses
- [ ] Extension inserts text into fields
- [ ] All workflows mapped correctly

## Support

For issues or questions:
1. Check [README.md](README.md) for full documentation
2. Review [QUICKSTART.md](QUICKSTART.md) for setup help
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues

