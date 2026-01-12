import React, { useState, useCallback } from 'react';

// ISO 27001:2022 Data
const clausesData = [
  { id: "4.1", name: "Understanding the organization and its context", description: "Determine external and internal issues relevant to ISMS purpose" },
  { id: "4.2", name: "Understanding needs and expectations of interested parties", description: "Determine interested parties and their requirements" },
  { id: "4.3", name: "Determining the scope of the ISMS", description: "Determine boundaries and applicability of ISMS" },
  { id: "4.4", name: "Information security management system", description: "Establish, implement, maintain and continually improve ISMS" },
  { id: "5.1", name: "Leadership and commitment", description: "Top management demonstrates leadership and commitment" },
  { id: "5.2", name: "Policy", description: "Establish information security policy" },
  { id: "5.3", name: "Organizational roles, responsibilities and authorities", description: "Assign and communicate ISMS roles" },
  { id: "6.1.1", name: "General - Actions to address risks", description: "Determine risks and opportunities" },
  { id: "6.1.2", name: "Information security risk assessment", description: "Define and apply risk assessment process" },
  { id: "6.1.3", name: "Information security risk treatment", description: "Define risk treatment process, produce SoA" },
  { id: "6.2", name: "Information security objectives", description: "Establish measurable IS objectives" },
  { id: "6.3", name: "Planning of changes", description: "Changes to ISMS carried out in planned manner" },
  { id: "7.1", name: "Resources", description: "Determine and provide resources needed" },
  { id: "7.2", name: "Competence", description: "Determine competence of persons" },
  { id: "7.3", name: "Awareness", description: "Personnel awareness of IS policy" },
  { id: "7.4", name: "Communication", description: "Determine communications relevant to ISMS" },
  { id: "7.5.1", name: "Documented information - General", description: "ISMS includes required documented information" },
  { id: "7.5.2", name: "Creating and updating", description: "Appropriate identification and format of documents" },
  { id: "7.5.3", name: "Control of documented information", description: "Control availability and protection" },
  { id: "8.1", name: "Operational planning and control", description: "Plan and control processes" },
  { id: "8.2", name: "Information security risk assessment", description: "Perform risk assessments at planned intervals" },
  { id: "8.3", name: "Information security risk treatment", description: "Implement risk treatment plan" },
  { id: "9.1", name: "Monitoring, measurement, analysis and evaluation", description: "Evaluate IS performance" },
  { id: "9.2.1", name: "Internal audit - General", description: "Conduct internal audits" },
  { id: "9.2.2", name: "Internal audit programme", description: "Plan and maintain audit programme" },
  { id: "9.3.1", name: "Management review - General", description: "Top management reviews ISMS" },
  { id: "9.3.2", name: "Management review inputs", description: "Review inputs include actions and changes" },
  { id: "9.3.3", name: "Management review results", description: "Review outputs include improvements" },
  { id: "10.1", name: "Continual improvement", description: "Continually improve ISMS" },
  { id: "10.2", name: "Nonconformity and corrective action", description: "React to nonconformities" },
];

const annexAData = [
  // A.5 Organizational controls
  { id: "A.5.1", name: "Policies for information security", theme: "Organizational" },
  { id: "A.5.2", name: "Information security roles and responsibilities", theme: "Organizational" },
  { id: "A.5.3", name: "Segregation of duties", theme: "Organizational" },
  { id: "A.5.4", name: "Management responsibilities", theme: "Organizational" },
  { id: "A.5.5", name: "Contact with authorities", theme: "Organizational" },
  { id: "A.5.6", name: "Contact with special interest groups", theme: "Organizational" },
  { id: "A.5.7", name: "Threat intelligence", theme: "Organizational" },
  { id: "A.5.8", name: "Information security in project management", theme: "Organizational" },
  { id: "A.5.9", name: "Inventory of information and associated assets", theme: "Organizational" },
  { id: "A.5.10", name: "Acceptable use of information and assets", theme: "Organizational" },
  { id: "A.5.11", name: "Return of assets", theme: "Organizational" },
  { id: "A.5.12", name: "Classification of information", theme: "Organizational" },
  { id: "A.5.13", name: "Labelling of information", theme: "Organizational" },
  { id: "A.5.14", name: "Information transfer", theme: "Organizational" },
  { id: "A.5.15", name: "Access control", theme: "Organizational" },
  { id: "A.5.16", name: "Identity management", theme: "Organizational" },
  { id: "A.5.17", name: "Authentication information", theme: "Organizational" },
  { id: "A.5.18", name: "Access rights", theme: "Organizational" },
  { id: "A.5.19", name: "Information security in supplier relationships", theme: "Organizational" },
  { id: "A.5.20", name: "Addressing IS within supplier agreements", theme: "Organizational" },
  { id: "A.5.21", name: "Managing IS in ICT supply chain", theme: "Organizational" },
  { id: "A.5.22", name: "Monitoring and review of supplier services", theme: "Organizational" },
  { id: "A.5.23", name: "Information security for cloud services", theme: "Organizational" },
  { id: "A.5.24", name: "IS incident management planning", theme: "Organizational" },
  { id: "A.5.25", name: "Assessment of IS events", theme: "Organizational" },
  { id: "A.5.26", name: "Response to IS incidents", theme: "Organizational" },
  { id: "A.5.27", name: "Learning from IS incidents", theme: "Organizational" },
  { id: "A.5.28", name: "Collection of evidence", theme: "Organizational" },
  { id: "A.5.29", name: "IS during disruption", theme: "Organizational" },
  { id: "A.5.30", name: "ICT readiness for business continuity", theme: "Organizational" },
  { id: "A.5.31", name: "Legal, statutory, regulatory requirements", theme: "Organizational" },
  { id: "A.5.32", name: "Intellectual property rights", theme: "Organizational" },
  { id: "A.5.33", name: "Protection of records", theme: "Organizational" },
  { id: "A.5.34", name: "Privacy and protection of PII", theme: "Organizational" },
  { id: "A.5.35", name: "Independent review of IS", theme: "Organizational" },
  { id: "A.5.36", name: "Compliance with policies and standards", theme: "Organizational" },
  { id: "A.5.37", name: "Documented operating procedures", theme: "Organizational" },
  // A.6 People controls
  { id: "A.6.1", name: "Screening", theme: "People" },
  { id: "A.6.2", name: "Terms and conditions of employment", theme: "People" },
  { id: "A.6.3", name: "IS awareness, education and training", theme: "People" },
  { id: "A.6.4", name: "Disciplinary process", theme: "People" },
  { id: "A.6.5", name: "Responsibilities after termination", theme: "People" },
  { id: "A.6.6", name: "Confidentiality agreements", theme: "People" },
  { id: "A.6.7", name: "Remote working", theme: "People" },
  { id: "A.6.8", name: "IS event reporting", theme: "People" },
  // A.7 Physical controls
  { id: "A.7.1", name: "Physical security perimeters", theme: "Physical" },
  { id: "A.7.2", name: "Physical entry", theme: "Physical" },
  { id: "A.7.3", name: "Securing offices, rooms and facilities", theme: "Physical" },
  { id: "A.7.4", name: "Physical security monitoring", theme: "Physical" },
  { id: "A.7.5", name: "Protecting against physical threats", theme: "Physical" },
  { id: "A.7.6", name: "Working in secure areas", theme: "Physical" },
  { id: "A.7.7", name: "Clear desk and clear screen", theme: "Physical" },
  { id: "A.7.8", name: "Equipment siting and protection", theme: "Physical" },
  { id: "A.7.9", name: "Security of assets off-premises", theme: "Physical" },
  { id: "A.7.10", name: "Storage media", theme: "Physical" },
  { id: "A.7.11", name: "Supporting utilities", theme: "Physical" },
  { id: "A.7.12", name: "Cabling security", theme: "Physical" },
  { id: "A.7.13", name: "Equipment maintenance", theme: "Physical" },
  { id: "A.7.14", name: "Secure disposal or re-use of equipment", theme: "Physical" },
  // A.8 Technological controls
  { id: "A.8.1", name: "User endpoint devices", theme: "Technological" },
  { id: "A.8.2", name: "Privileged access rights", theme: "Technological" },
  { id: "A.8.3", name: "Information access restriction", theme: "Technological" },
  { id: "A.8.4", name: "Access to source code", theme: "Technological" },
  { id: "A.8.5", name: "Secure authentication", theme: "Technological" },
  { id: "A.8.6", name: "Capacity management", theme: "Technological" },
  { id: "A.8.7", name: "Protection against malware", theme: "Technological" },
  { id: "A.8.8", name: "Management of technical vulnerabilities", theme: "Technological" },
  { id: "A.8.9", name: "Configuration management", theme: "Technological" },
  { id: "A.8.10", name: "Information deletion", theme: "Technological" },
  { id: "A.8.11", name: "Data masking", theme: "Technological" },
  { id: "A.8.12", name: "Data leakage prevention", theme: "Technological" },
  { id: "A.8.13", name: "Information backup", theme: "Technological" },
  { id: "A.8.14", name: "Redundancy of information processing", theme: "Technological" },
  { id: "A.8.15", name: "Logging", theme: "Technological" },
  { id: "A.8.16", name: "Monitoring activities", theme: "Technological" },
  { id: "A.8.17", name: "Clock synchronization", theme: "Technological" },
  { id: "A.8.18", name: "Use of privileged utility programs", theme: "Technological" },
  { id: "A.8.19", name: "Installation of software", theme: "Technological" },
  { id: "A.8.20", name: "Networks security", theme: "Technological" },
  { id: "A.8.21", name: "Security of network services", theme: "Technological" },
  { id: "A.8.22", name: "Segregation of networks", theme: "Technological" },
  { id: "A.8.23", name: "Web filtering", theme: "Technological" },
  { id: "A.8.24", name: "Use of cryptography", theme: "Technological" },
  { id: "A.8.25", name: "Secure development life cycle", theme: "Technological" },
  { id: "A.8.26", name: "Application security requirements", theme: "Technological" },
  { id: "A.8.27", name: "Secure system architecture", theme: "Technological" },
  { id: "A.8.28", name: "Secure coding", theme: "Technological" },
  { id: "A.8.29", name: "Security testing in development", theme: "Technological" },
  { id: "A.8.30", name: "Outsourced development", theme: "Technological" },
  { id: "A.8.31", name: "Separation of environments", theme: "Technological" },
  { id: "A.8.32", name: "Change management", theme: "Technological" },
  { id: "A.8.33", name: "Test information", theme: "Technological" },
  { id: "A.8.34", name: "Protection during audit testing", theme: "Technological" },
];

const level4Criteria = [
  { id: "l4_1", label: "Control defined with justification of its requirements" },
  { id: "l4_2", label: "Policy and/or procedures fully defined, implemented, and executed" },
  { id: "l4_3", label: "Control systematically repeatable and measurable" },
  { id: "l4_4", label: "Improvement cycle with reporting and action plans" },
];

const level5Criteria = [
  { id: "l5_1", label: "Performance and effectiveness KPIs defined" },
  { id: "l5_2", label: "KPIs strategy on control objective documented and validated" },
  { id: "l5_3", label: "Periodic review of KPIs conducted and reporting in place" },
  { id: "l5_4", label: "Improvement cycle with root cause analysis" },
];

const baseScoreOptions = [
  { value: 0, label: "0 - Non-Existent" },
  { value: 1, label: "1 - Initial" },
  { value: 2, label: "2 - Developing" },
  { value: 3, label: "3 - Defined" },
];

export default function ISO27001AuditTool() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [assessments, setAssessments] = useState({});
  const [selectedControl, setSelectedControl] = useState(null);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterTheme, setFilterTheme] = useState('all');

  const calculateScore = (controlId) => {
    const assessment = assessments[controlId];
    if (!assessment) return 0;
    
    let score = assessment.baseScore || 0;
    
    if (score >= 3) {
      const l4Count = level4Criteria.filter(c => assessment[c.id]).length;
      score = 3 + (l4Count * 0.25);
      
      if (l4Count === 4) {
        const l5Count = level5Criteria.filter(c => assessment[c.id]).length;
        score = 4 + (l5Count * 0.25);
      }
    }
    
    return Math.min(score, 5);
  };

  const updateAssessment = (controlId, field, value) => {
    setAssessments(prev => ({
      ...prev,
      [controlId]: {
        ...prev[controlId],
        [field]: value
      }
    }));
  };

  const getAIRecommendation = async (control) => {
    if (!apiKey) {
      alert('Please enter your Anthropic API key first');
      return;
    }

    setIsLoading(true);
    setAiRecommendation('');

    const assessment = assessments[control.id] || {};
    const currentScore = calculateScore(control.id);
    const l4Checked = level4Criteria.filter(c => assessment[c.id]).map(c => c.label);
    const l5Checked = level5Criteria.filter(c => assessment[c.id]).map(c => c.label);
    const l4Missing = level4Criteria.filter(c => !assessment[c.id]).map(c => c.label);
    const l5Missing = level5Criteria.filter(c => !assessment[c.id]).map(c => c.label);

    const prompt = `As an ISO 27001:2022 auditor assistant, analyze this control assessment and provide specific, actionable recommendations.

Control ID: ${control.id}
Control Name: ${control.name}
${control.description ? `Description: ${control.description}` : ''}
${control.theme ? `Theme: ${control.theme}` : ''}

Current Assessment:
- Base Score: ${assessment.baseScore || 0}/3
- Final Score: ${currentScore.toFixed(2)}/5
- Evidence Notes: ${assessment.evidenceNotes || 'None provided'}
- Evidence Files: ${assessment.evidenceFiles || 'None listed'}

Level 4 Criteria Met: ${l4Checked.length > 0 ? l4Checked.join(', ') : 'None'}
Level 4 Criteria Missing: ${l4Missing.length > 0 ? l4Missing.join(', ') : 'All met'}

Level 5 Criteria Met: ${l5Checked.length > 0 ? l5Checked.join(', ') : 'None'}
Level 5 Criteria Missing: ${l5Missing.length > 0 ? l5Missing.join(', ') : 'All met'}

Please provide:
1. **Gap Analysis**: What's missing to reach the next level?
2. **Specific Actions**: 3-5 concrete steps to improve this control
3. **Evidence Suggestions**: What documentation would demonstrate compliance?
4. **Quick Wins**: Any easy improvements that can be made immediately?
5. **Risk Consideration**: What risks exist at the current maturity level?

Keep recommendations practical and specific to this control.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setAiRecommendation(`Error: ${data.error.message}`);
      } else {
        setAiRecommendation(data.content[0].text);
      }
    } catch (error) {
      setAiRecommendation(`Error connecting to API: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'bg-green-600';
    if (score >= 4) return 'bg-green-500';
    if (score >= 3.5) return 'bg-lime-500';
    if (score >= 3) return 'bg-yellow-500';
    if (score >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreBadge = (score) => {
    const color = getScoreColor(score);
    return (
      <span className={`${color} text-white px-2 py-1 rounded text-sm font-bold`}>
        {score.toFixed(2)}
      </span>
    );
  };

  const calculateStats = (data) => {
    const assessed = data.filter(item => assessments[item.id]?.baseScore !== undefined);
    const scores = assessed.map(item => calculateScore(item.id));
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const level4Plus = scores.filter(s => s >= 4).length;
    const level5 = scores.filter(s => s >= 5).length;
    
    return {
      total: data.length,
      assessed: assessed.length,
      avgScore,
      level4Plus,
      level5,
      compliant: scores.filter(s => s >= 3).length
    };
  };

  const clauseStats = calculateStats(clausesData);
  const annexStats = calculateStats(annexAData);
  const overallStats = calculateStats([...clausesData, ...annexAData]);

  const filteredAnnex = filterTheme === 'all' 
    ? annexAData 
    : annexAData.filter(c => c.theme === filterTheme);

  const ControlCard = ({ control, type }) => {
    const assessment = assessments[control.id] || {};
    const score = calculateScore(control.id);
    const isSelected = selectedControl?.id === control.id;

    return (
      <div 
        className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
          isSelected ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-400 hover:shadow'
        }`}
        onClick={() => setSelectedControl(control)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{control.id}</span>
              {control.theme && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{control.theme}</span>
              )}
            </div>
            <h3 className="font-semibold mt-1">{control.name}</h3>
            {control.description && (
              <p className="text-sm text-gray-600 mt-1">{control.description}</p>
            )}
          </div>
          <div className="ml-4">
            {getScoreBadge(score)}
          </div>
        </div>
        
        {assessment.baseScore !== undefined && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {level4Criteria.map(c => assessment[c.id] && (
              <span key={c.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                L4: {c.label.substring(0, 20)}...
              </span>
            ))}
            {level5Criteria.map(c => assessment[c.id] && (
              <span key={c.id} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                L5: {c.label.substring(0, 20)}...
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AssessmentPanel = () => {
    if (!selectedControl) {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>Select a control to assess</p>
        </div>
      );
    }

    const assessment = assessments[selectedControl.id] || {};
    const score = calculateScore(selectedControl.id);
    const showLevel4 = (assessment.baseScore || 0) >= 3;
    const allLevel4Met = level4Criteria.every(c => assessment[c.id]);
    const showLevel5 = showLevel4 && allLevel4Met;

    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedControl.id}</span>
            <h2 className="text-xl font-bold mt-2">{selectedControl.name}</h2>
            {selectedControl.description && (
              <p className="text-gray-600 mt-1">{selectedControl.description}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score.toFixed(2)}</div>
            <div className="text-sm text-gray-500">/ 5.00</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className={`h-3 rounded-full transition-all ${getScoreColor(score)}`}
            style={{ width: `${(score / 5) * 100}%` }}
          />
        </div>

        {/* Base Score */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Base Maturity Level (0-3)</label>
          <div className="grid grid-cols-2 gap-2">
            {baseScoreOptions.map(opt => (
              <button
                key={opt.value}
                className={`p-3 rounded border text-left transition-all ${
                  assessment.baseScore === opt.value 
                    ? 'border-blue-500 bg-blue-50 font-semibold' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
                onClick={() => updateAssessment(selectedControl.id, 'baseScore', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level 4 Criteria */}
        {showLevel4 && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">Level 4 Criteria (+0.25 each)</h3>
            {level4Criteria.map(criteria => (
              <label key={criteria.id} className="flex items-start gap-3 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment[criteria.id] || false}
                  onChange={(e) => updateAssessment(selectedControl.id, criteria.id, e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm">{criteria.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Level 5 Criteria */}
        {showLevel5 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-3">Level 5 Criteria (+0.25 each)</h3>
            {level5Criteria.map(criteria => (
              <label key={criteria.id} className="flex items-start gap-3 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment[criteria.id] || false}
                  onChange={(e) => updateAssessment(selectedControl.id, criteria.id, e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">{criteria.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Evidence */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Evidence Notes</label>
          <textarea
            className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Document evidence observations..."
            value={assessment.evidenceNotes || ''}
            onChange={(e) => updateAssessment(selectedControl.id, 'evidenceNotes', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Evidence File Names</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Policy_v2.1.pdf, Risk_Register.xlsx"
            value={assessment.evidenceFiles || ''}
            onChange={(e) => updateAssessment(selectedControl.id, 'evidenceFiles', e.target.value)}
          />
        </div>

        {/* AI Recommendation Button */}
        <button
          onClick={() => getAIRecommendation(selectedControl)}
          disabled={isLoading || !apiKey}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            apiKey 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Get AI Recommendations
            </>
          )}
        </button>

        {!apiKey && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Enter your API key in the Dashboard tab to enable AI recommendations
          </p>
        )}

        {/* AI Recommendation Display */}
        {aiRecommendation && (
          <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Recommendations
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {aiRecommendation}
            </div>
          </div>
        )}
      </div>
    );
  };

  const StatCard = ({ title, value, subtitle, color = "blue" }) => (
    <div className={`bg-white rounded-lg border p-4 shadow-sm`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`text-3xl font-bold text-${color}-600`}>{value}</div>
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">ISO 27001:2022 QA Audit Tool</h1>
          <p className="text-blue-200">AI-Powered Assessment with Granular Scoring</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex gap-1 p-2">
          {['dashboard', 'clauses', 'annex-a'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'dashboard' ? '📊 Dashboard' : 
               tab === 'clauses' ? '📋 Clauses 4-10' : '🔒 Annex A Controls'}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* API Key Input */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Anthropic API Key
              </h2>
              <div className="flex gap-2">
                <input
                  type="password"
                  className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    apiKey ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {apiKey ? '✓ Connected' : 'Not Connected'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Get your API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Controls" value={overallStats.total} subtitle="Clauses + Annex A" />
              <StatCard title="Assessed" value={overallStats.assessed} subtitle={`${((overallStats.assessed/overallStats.total)*100).toFixed(0)}% complete`} color="green" />
              <StatCard title="Average Score" value={overallStats.avgScore.toFixed(2)} subtitle="Out of 5.00" color="purple" />
              <StatCard title="Level 4+ Controls" value={overallStats.level4Plus} subtitle={`${overallStats.level5} at Level 5`} color="blue" />
            </div>

            {/* Breakdown Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="font-semibold mb-3">📋 ISMS Clauses (4-10)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">{clauseStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessed:</span>
                    <span className="font-medium">{clauseStats.assessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Score:</span>
                    <span className="font-medium">{clauseStats.avgScore.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(clauseStats.assessed/clauseStats.total)*100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="font-semibold mb-3">🔒 Annex A Controls</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">{annexStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessed:</span>
                    <span className="font-medium">{annexStats.assessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Score:</span>
                    <span className="font-medium">{annexStats.avgScore.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(annexStats.assessed/annexStats.total)*100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring Legend */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="font-semibold mb-3">📏 Scoring System</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Base Levels (0-3)</h4>
                  <ul className="space-y-1 text-sm">
                    <li><span className="inline-block w-16 bg-red-500 text-white text-center rounded px-2 py-1 mr-2">0</span> Non-Existent</li>
                    <li><span className="inline-block w-16 bg-orange-500 text-white text-center rounded px-2 py-1 mr-2">1</span> Initial</li>
                    <li><span className="inline-block w-16 bg-yellow-500 text-white text-center rounded px-2 py-1 mr-2">2</span> Developing</li>
                    <li><span className="inline-block w-16 bg-yellow-500 text-white text-center rounded px-2 py-1 mr-2">3</span> Defined</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Advanced Levels (+0.25 per criteria)</h4>
                  <ul className="space-y-1 text-sm">
                    <li><span className="inline-block w-16 bg-lime-500 text-white text-center rounded px-2 py-1 mr-2">3.25-3.75</span> Progressing to L4</li>
                    <li><span className="inline-block w-16 bg-green-500 text-white text-center rounded px-2 py-1 mr-2">4.00</span> Managed (all L4 met)</li>
                    <li><span className="inline-block w-16 bg-green-600 text-white text-center rounded px-2 py-1 mr-2">4.25-4.75</span> Progressing to L5</li>
                    <li><span className="inline-block w-16 bg-green-600 text-white text-center rounded px-2 py-1 mr-2">5.00</span> Optimized (all L5 met)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clauses Tab */}
        {activeTab === 'clauses' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="font-semibold text-lg mb-3">ISMS Clauses 4-10 ({clausesData.length} requirements)</h2>
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {clausesData.map(control => (
                  <ControlCard key={control.id} control={control} type="clause" />
                ))}
              </div>
            </div>
            <div className="sticky top-20">
              <h2 className="font-semibold text-lg mb-3">Assessment Panel</h2>
              <AssessmentPanel />
            </div>
          </div>
        )}

        {/* Annex A Tab */}
        {activeTab === 'annex-a' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Annex A Controls ({filteredAnnex.length})</h2>
                <select
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={filterTheme}
                  onChange={(e) => setFilterTheme(e.target.value)}
                >
                  <option value="all">All Themes</option>
                  <option value="Organizational">A.5 Organizational (37)</option>
                  <option value="People">A.6 People (8)</option>
                  <option value="Physical">A.7 Physical (14)</option>
                  <option value="Technological">A.8 Technological (34)</option>
                </select>
              </div>
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {filteredAnnex.map(control => (
                  <ControlCard key={control.id} control={control} type="annex" />
                ))}
              </div>
            </div>
            <div className="sticky top-20">
              <h2 className="font-semibold text-lg mb-3">Assessment Panel</h2>
              <AssessmentPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
