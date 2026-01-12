# ISO 27001:2022 QA Audit Tool

An AI-powered audit assessment tool for ISO 27001:2022 with granular scoring and evidence management.

## Features

### 📊 Granular Scoring System (0.25 increments)
- **Level 0-3**: Base maturity levels
- **Level 4** (+0.25 per criteria):
  - Control defined with justification
  - Policy/procedures fully implemented
  - Systematically repeatable and measurable
  - Improvement cycle with reporting
- **Level 5** (+0.25 per criteria):
  - KPIs defined
  - KPI strategy documented
  - Periodic KPI review
  - Root cause analysis

### 💾 Data Persistence
- **Auto-save**: All data automatically saved to browser localStorage
- **Export JSON**: Full backup with all assessments and evidence
- **Export CSV**: Spreadsheet-compatible format for reporting
- **Import JSON**: Restore from previous backup

### 🤖 AI-Powered Recommendations
- Connect your Anthropic API key
- Get intelligent gap analysis
- Receive specific action items
- Evidence suggestions

### 📎 Evidence Management
- Evidence notes for each control
- Evidence file references
- Auditor notes and recommendations

## Quick Start

### Option 1: Direct Use (No Installation)
1. Download `index.html`
2. Open in any modern browser
3. Start auditing!

### Option 2: GitHub Pages Deployment
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch" → main
4. Access at `https://YOUR_USERNAME.github.io/iso27001-audit-tool`

### Option 3: Vercel/Netlify
1. Import this repository
2. Deploy (no build step needed)
3. Done!

## Data Storage

| Method | Description |
|--------|-------------|
| Auto-save | Saves to browser localStorage automatically |
| Export JSON | Download complete backup file |
| Export CSV | Download for Excel/Google Sheets |
| Import JSON | Restore from backup file |

## API Integration

For AI recommendations:
1. Get API key from [console.anthropic.com](https://console.anthropic.com)
2. Enter key in Dashboard tab
3. Click "Get AI Recommendations" on any control

## File Structure

```
iso27001-audit-tool/
├── index.html      # Complete single-file application
└── README.md       # This file
```

## License

MIT License - Free to use and modify

## Support

For issues, please create a GitHub issue.
