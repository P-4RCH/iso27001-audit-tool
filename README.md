# ISO 27001:2022 QA Audit Tool

An AI-Powered audit tool for ISO 27001:2022 Information Security Management System (ISMS) assessments with granular scoring system.

![ISO 27001 Audit Tool](https://img.shields.io/badge/ISO-27001:2022-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 📊 Granular Scoring System (0.25 increments)

| Level | Score | Description |
|-------|-------|-------------|
| 0 | 0.00 | Non-Existent - No control exists |
| 1 | 1.00 | Initial - Ad-hoc, undocumented |
| 2 | 2.00 | Developing - Partially documented |
| 3 | 3.00 | Defined - Documented and implemented |
| 4 | 3.25 - 4.00 | Managed - Add +0.25 for each L4 criteria |
| 5 | 4.25 - 5.00 | Optimized - Add +0.25 for each L5 criteria |

### Level 4 Criteria (+0.25 each)
- ✅ Control defined with justification of its requirements
- ✅ Policy and/or procedures fully defined, implemented, and executed
- ✅ Control systematically repeatable and measurable
- ✅ Improvement cycle with reporting and action plans

### Level 5 Criteria (+0.25 each)
- ✅ Performance and effectiveness KPIs defined
- ✅ KPIs strategy on control objective documented and validated
- ✅ Periodic review of KPIs conducted and reporting in place
- ✅ Improvement cycle with root cause analysis

### 🔒 Complete ISO 27001:2022 Coverage

- **30 ISMS Clauses** (Clauses 4-10)
- **93 Annex A Controls**:
  - A.5 Organizational Controls (37)
  - A.6 People Controls (8)
  - A.7 Physical Controls (14)
  - A.8 Technological Controls (34)

### 🤖 AI-Powered Recommendations

Connect your Anthropic API key to get:
- Gap analysis for each control
- Specific action items for improvement
- Evidence documentation suggestions
- Quick wins identification
- Risk considerations at current maturity level

### 📝 Evidence Documentation

- Evidence Notes field for observations
- Evidence Files field for document references
- Export functionality for audit reports

## Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Anthropic API key (for AI features) - get it from [console.anthropic.com](https://console.anthropic.com)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/iso27001-audit-tool.git
cd iso27001-audit-tool
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/iso27001-audit-tool",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 2: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 3: Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build` folder to [Netlify](https://app.netlify.com/drop)

## Usage Guide

### 1. Dashboard Tab
- Enter your Anthropic API key for AI features
- View overall compliance statistics
- Monitor assessment progress

### 2. Clauses Tab
- Assess ISMS requirements (Clauses 4-10)
- Select base maturity level (0-3)
- Check applicable Level 4 and 5 criteria
- Document evidence and recommendations

### 3. Annex A Tab
- Assess all 93 security controls
- Filter by theme (Organizational, People, Physical, Technological)
- Get AI-powered recommendations for improvements

### 4. Scoring Example

If a control:
- Has Base Score: **3** (Defined)
- Meets 2 Level 4 criteria: +0.50
- **Final Score: 3.50**

If all 4 Level 4 criteria are met:
- Score becomes **4.00** (Managed)
- Level 5 criteria become available
- Each L5 criteria adds +0.25 toward **5.00**

## API Integration

The tool uses the Anthropic Claude API for AI recommendations:

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': YOUR_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }]
  })
});
```

## Project Structure

```
iso27001-audit-tool/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.js         # Entry point
│   └── index.css        # Styles
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

## Security Considerations

⚠️ **Important**: 
- API keys are stored in browser memory only (not persisted)
- Never commit API keys to the repository
- For production use, consider implementing a backend proxy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- ISO/IEC 27001:2022 Information Security Management Systems
- Anthropic Claude API for AI capabilities
- React and Tailwind CSS for the frontend

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/YOUR_USERNAME/iso27001-audit-tool/issues) page.

---

Made with ❤️ for Information Security Professionals
