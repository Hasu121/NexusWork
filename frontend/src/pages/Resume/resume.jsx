
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Example template definitions (replace preview with real images if available)
const TEMPLATE_DEFS = [
  {
    id: 'modern',
    name: 'Modern',
    preview: 'https://i.imgur.com/0y0y0y0.png',
    description: 'A clean, modern resume with bold headings and clear sections.'
  },
  {
    id: 'classic',
    name: 'Classic',
    preview: 'https://i.imgur.com/1x1x1x1.png',
    description: 'A timeless, professional resume with traditional layout.'
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: 'https://i.imgur.com/2z2z2z2.png',
    description: 'A visually engaging resume for creative professionals.'
  }
];

const defaultResumeData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  education: [{ school: '', degree: '', year: '' }],
  experience: [{ company: '', role: '', year: '', description: '' }],
  skills: '',
  projects: [{ name: '', description: '' }]
};

const Resume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [savedResume, setSavedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/resume/me', { withCredentials: true })
      .then(res => {
        if (res.data.resume) {
          setSavedResume(res.data.resume);
          setSelectedTemplate(res.data.resume.template);
          setResumeData(res.data.resume.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Template selection
  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
    setResumeData(defaultResumeData);
    setShowPreview(false);
    setEditMode(false);
  };

  // Dynamic field change
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  // Multi-entry field change
  const handleMultiChange = (type, idx, field, value) => {
    const arr = [...resumeData[type]];
    arr[idx][field] = value;
    setResumeData({ ...resumeData, [type]: arr });
  };

  // Add entry
  const handleAddEntry = (type) => {
    const newEntry = type === 'education'
      ? { school: '', degree: '', year: '' }
      : type === 'experience'
        ? { company: '', role: '', year: '', description: '' }
        : { name: '', description: '' };
    setResumeData({ ...resumeData, [type]: [...resumeData[type], newEntry] });
  };

  // Remove entry
  const handleRemoveEntry = (type, idx) => {
    const arr = [...resumeData[type]];
    arr.splice(idx, 1);
    setResumeData({ ...resumeData, [type]: arr });
  };

  // Generate preview
  const handleGenerate = () => {
    setShowPreview(true);
    setEditMode(true);
  };

  // Save resume
  const handleSave = () => {
    setLoading(true);
    axios.post('http://localhost:4000/api/resume/save', {
      template: selectedTemplate,
      data: resumeData
    }, { withCredentials: true })
      .then(res => {
        setSavedResume(res.data.resume);
        setShowPreview(false);
        setEditMode(false);
        alert('Resume saved!');
      })
      .catch(() => setError('Failed to save resume'))
      .finally(() => setLoading(false));
  };

  // Edit saved resume
  const handleEditSaved = () => {
    setResumeData(savedResume.data);
    setSelectedTemplate(savedResume.template);
    setShowPreview(true);
    setEditMode(true);
  };

  // Custom CSS templates
  const renderTemplate = () => {
    if (!selectedTemplate) return null;
    const data = resumeData;
    switch (selectedTemplate) {
      case 'modern':
        return (
          <div className="resume-modern p-10 bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto border-t-8 border-blue-600" style={{fontFamily:'Inter, Arial, sans-serif'}}>
            <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight uppercase">{data.name}</h1>
            <div className="text-gray-500 mb-4 text-lg">{data.email} | {data.phone} | {data.address}</div>
            <div className="font-bold text-xl mt-6 mb-2 text-blue-600">Professional Summary</div>
            <div className="mb-6 text-gray-700 leading-relaxed">{data.summary}</div>
            <div className="font-bold text-xl mt-6 mb-2 text-blue-600">Education</div>
            <ul className="mb-6">
              {data.education.map((e, i) => (
                <li key={i} className="mb-2 text-gray-800"><span className="font-semibold">{e.degree}</span> at <span className="font-bold">{e.school}</span> <span className="text-blue-500">({e.year})</span></li>
              ))}
            </ul>
            <div className="font-bold text-xl mt-6 mb-2 text-blue-600">Experience</div>
            <ul className="mb-6">
              {data.experience.map((ex, i) => (
                <li key={i} className="mb-2">
                  <span className="font-semibold text-blue-700">{ex.role}</span> at <span className="font-bold">{ex.company}</span> <span className="text-blue-500">({ex.year})</span><br />
                  <span className="text-gray-700">{ex.description}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold text-xl mt-6 mb-2 text-blue-600">Skills</div>
            <div className="mb-6 text-gray-800">{data.skills}</div>
            <div className="font-bold text-xl mt-6 mb-2 text-blue-600">Projects</div>
            <ul>
              {data.projects.map((p, i) => (
                <li key={i} className="mb-2"><span className="font-bold text-blue-700">{p.name}:</span> {p.description}</li>
              ))}
            </ul>
          </div>
        );
      case 'classic':
        return (
          <div className="resume-classic p-10 bg-gray-50 border border-gray-400 rounded-lg max-w-2xl mx-auto" style={{fontFamily:'Georgia, Times, serif'}}>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2 tracking-wide">{data.name}</h1>
            <div className="text-gray-700 mb-4 text-base italic">{data.email} | {data.phone} | {data.address}</div>
            <div className="font-semibold text-lg mt-4 mb-2 text-gray-800 underline">Professional Summary</div>
            <div className="mb-6 text-gray-800 italic">{data.summary}</div>
            <div className="font-semibold text-lg mt-4 mb-2 text-gray-800 underline">Education</div>
            <ul className="mb-6">
              {data.education.map((e, i) => (
                <li key={i} className="mb-2 text-gray-900"><span className="font-bold">{e.school}</span> - {e.degree} <span className="text-gray-600">({e.year})</span></li>
              ))}
            </ul>
            <div className="font-semibold text-lg mt-4 mb-2 text-gray-800 underline">Experience</div>
            <ul className="mb-6">
              {data.experience.map((ex, i) => (
                <li key={i} className="mb-2">
                  <span className="font-bold text-gray-900">{ex.role}</span>, <span className="font-bold">{ex.company}</span> <span className="text-gray-600">({ex.year})</span><br />
                  <span className="text-gray-700 italic">{ex.description}</span>
                </li>
              ))}
            </ul>
            <div className="font-semibold text-lg mt-4 mb-2 text-gray-800 underline">Skills</div>
            <div className="mb-6 text-gray-900">{data.skills}</div>
            <div className="font-semibold text-lg mt-4 mb-2 text-gray-800 underline">Projects</div>
            <ul>
              {data.projects.map((p, i) => (
                <li key={i} className="mb-2"><span className="font-bold text-gray-900">{p.name}:</span> {p.description}</li>
              ))}
            </ul>
          </div>
        );
      case 'creative':
        return (
          <div className="resume-creative p-10 bg-gradient-to-br from-pink-200 via-blue-100 to-yellow-100 rounded-2xl shadow-2xl max-w-2xl mx-auto border-l-8 border-pink-400" style={{fontFamily:'Poppins, Arial, sans-serif', position:'relative'}}>
            <div style={{position:'absolute',top:20,right:30,fontSize:'2rem',color:'#ec4899'}}>★</div>
            <h1 className="text-4xl font-extrabold text-pink-700 mb-2 tracking-tight drop-shadow-lg" style={{letterSpacing:'2px'}}>{data.name}</h1>
            <div className="text-blue-700 mb-4 text-lg font-semibold">{data.email} | {data.phone} | {data.address}</div>
            <div className="font-semibold text-xl mt-4 mb-2 text-pink-700">Summary</div>
            <div className="mb-6 italic text-blue-900">{data.summary}</div>
            <div className="font-semibold text-xl mt-4 mb-2 text-blue-700">Education</div>
            <ul className="mb-6">
              {data.education.map((e, i) => (
                <li key={i} className="mb-2 text-pink-700"><span className="font-bold">{e.degree}</span> at <span className="font-bold text-blue-700">{e.school}</span> <span className="text-yellow-600">({e.year})</span></li>
              ))}
            </ul>
            <div className="font-semibold text-xl mt-4 mb-2 text-pink-700">Experience</div>
            <ul className="mb-6">
              {data.experience.map((ex, i) => (
                <li key={i} className="mb-2">
                  <span className="font-bold text-blue-700">{ex.role}</span> at <span className="font-bold text-pink-700">{ex.company}</span> <span className="text-yellow-600">({ex.year})</span><br />
                  <span className="text-blue-700 italic">{ex.description}</span>
                </li>
              ))}
            </ul>
            <div className="font-semibold text-xl mt-4 mb-2 text-pink-700">Skills</div>
            <div className="mb-6 text-blue-900 font-semibold">{data.skills}</div>
            <div className="font-semibold text-xl mt-4 mb-2 text-blue-700">Projects</div>
            <ul>
              {data.projects.map((p, i) => (
                <li key={i} className="mb-2"><span className="font-bold text-pink-700">{p.name}:</span> {p.description}</li>
              ))}
            </ul>
            <div style={{position:'absolute',bottom:20,left:30,fontSize:'2rem',color:'#3b82f6'}}>✦</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Resume Builder</h2>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {/* If resume is saved, show only the saved resume and edit/create buttons */}
        {savedResume && !showPreview && !editMode ? (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Your Saved Resume</h3>
            {renderTemplate()}
            <div className="flex gap-4 mt-6">
              <button className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition" onClick={handleEditSaved}>Edit Resume</button>
            </div>
          </div>
        ) : (
          <>
            {/* Template selection - always show during creation/editing, but only change on confirm */}
            {((editMode || !selectedTemplate) && !showPreview) && (
              ((!editMode && !selectedTemplate) ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select a Template</h3>
                  <div className="flex flex-wrap gap-8 justify-center mb-8">
                    {TEMPLATE_DEFS.map(t => (
                      <div key={t.id}
                        className={`border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all duration-200 shadow-lg scale-100 hover:scale-105 ${selectedTemplate === t.id ? 'border-blue-600 ring-4 ring-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-white'}`}
                        onClick={() => {
                          setSelectedTemplate(t.id);
                          setEditMode(true);
                        }}
                        style={{ width: '180px', minHeight: '260px', boxShadow: selectedTemplate === t.id ? '0 0 16px #3b82f6' : '0 2px 8px #e5e7eb' }}
                      >
                        <img src={t.preview} alt={t.name} className="w-32 h-40 object-contain mb-2 rounded-lg shadow-md" style={{background:'#f9f9f9'}} />
                        <div className={`font-bold text-lg text-center mb-1 ${selectedTemplate === t.id ? 'text-blue-700' : 'text-gray-800'}`}>{t.name}</div>
                        <div className="text-sm text-gray-600 text-center mb-2 italic">{t.description}</div>
                        {selectedTemplate === t.id && <div className="mt-2 text-blue-600 text-sm font-semibold">Selected</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null)
            )}

            {/* Resume form: show if not preview, or if editing, and not in template selection */}
            {selectedTemplate && (!showPreview || editMode) && (showPreview || editMode) && (
              <div className="mt-8">
                {/* Template selection cards at top of edit page */}
                <h3 className="text-xl font-semibold mb-4">Select a Template</h3>
                <div className="flex flex-wrap gap-8 justify-center mb-8">
                  {TEMPLATE_DEFS.map(t => (
                    <div key={t.id}
                      className={`border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all duration-200 shadow-lg scale-100 hover:scale-105 ${selectedTemplate === t.id ? 'border-blue-600 ring-4 ring-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-white'}`}
                      onClick={() => setSelectedTemplate(t.id)}
                      style={{ width: '180px', minHeight: '260px', boxShadow: selectedTemplate === t.id ? '0 0 16px #3b82f6' : '0 2px 8px #e5e7eb' }}
                    >
                      <img src={t.preview} alt={t.name} className="w-32 h-40 object-contain mb-2 rounded-lg shadow-md" style={{background:'#f9f9f9'}} />
                      <div className={`font-bold text-lg text-center mb-1 ${selectedTemplate === t.id ? 'text-blue-700' : 'text-gray-800'}`}>{t.name}</div>
                      <div className="text-sm text-gray-600 text-center mb-2 italic">{t.description}</div>
                      {selectedTemplate === t.id && <div className="mt-2 text-blue-600 text-sm font-semibold">Selected</div>}
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit Resume' : 'Enter Resume Details'}</h3>
                <form className="flex flex-col gap-4">
                  <input name="name" placeholder="Name" value={resumeData.name} onChange={handleChange} className="border rounded px-3 py-2" />
                  <input name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} className="border rounded px-3 py-2" />
                  <input name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} className="border rounded px-3 py-2" />
                  <input name="address" placeholder="Address" value={resumeData.address} onChange={handleChange} className="border rounded px-3 py-2" />
                  <textarea name="summary" placeholder="Professional Summary" value={resumeData.summary} onChange={handleChange} className="border rounded px-3 py-2" rows={2} />

                  {/* Education multi-entry */}
                  <div>
                    <div className="font-semibold mb-2">Education</div>
                    {resumeData.education.map((e, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input placeholder="School" value={e.school} onChange={ev => handleMultiChange('education', idx, 'school', ev.target.value)} className="border rounded px-2 py-1" />
                        <input placeholder="Degree" value={e.degree} onChange={ev => handleMultiChange('education', idx, 'degree', ev.target.value)} className="border rounded px-2 py-1" />
                        <input placeholder="Year" value={e.year} onChange={ev => handleMultiChange('education', idx, 'year', ev.target.value)} className="border rounded px-2 py-1 w-20" />
                        {resumeData.education.length > 1 && <button type="button" className="text-red-600" onClick={() => handleRemoveEntry('education', idx)}>Remove</button>}
                      </div>
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => handleAddEntry('education')}>Add Education</button>
                  </div>

                  {/* Experience multi-entry */}
                  <div>
                    <div className="font-semibold mb-2">Experience</div>
                    {resumeData.experience.map((ex, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input placeholder="Company" value={ex.company} onChange={ev => handleMultiChange('experience', idx, 'company', ev.target.value)} className="border rounded px-2 py-1" />
                        <input placeholder="Role" value={ex.role} onChange={ev => handleMultiChange('experience', idx, 'role', ev.target.value)} className="border rounded px-2 py-1" />
                        <input placeholder="Year" value={ex.year} onChange={ev => handleMultiChange('experience', idx, 'year', ev.target.value)} className="border rounded px-2 py-1 w-20" />
                        <input placeholder="Description" value={ex.description} onChange={ev => handleMultiChange('experience', idx, 'description', ev.target.value)} className="border rounded px-2 py-1" />
                        {resumeData.experience.length > 1 && <button type="button" className="text-red-600" onClick={() => handleRemoveEntry('experience', idx)}>Remove</button>}
                      </div>
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => handleAddEntry('experience')}>Add Experience</button>
                  </div>

                  <input name="skills" placeholder="Skills (comma separated)" value={resumeData.skills} onChange={handleChange} className="border rounded px-3 py-2" />

                  {/* Projects multi-entry */}
                  <div>
                    <div className="font-semibold mb-2">Projects</div>
                    {resumeData.projects.map((p, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input placeholder="Project Name" value={p.name} onChange={ev => handleMultiChange('projects', idx, 'name', ev.target.value)} className="border rounded px-2 py-1" />
                        <input placeholder="Description" value={p.description} onChange={ev => handleMultiChange('projects', idx, 'description', ev.target.value)} className="border rounded px-2 py-1" />
                        {resumeData.projects.length > 1 && <button type="button" className="text-red-600" onClick={() => handleRemoveEntry('projects', idx)}>Remove</button>}
                      </div>
                    ))}
                    <button type="button" className="text-blue-600" onClick={() => handleAddEntry('projects')}>Add Project</button>
                  </div>
                  <div>
                    <button type="button" onClick={handleSave} disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition mt-4">Save Resume</button>
                  </div>
                </form>
              </div>
            )}

            {/* Resume preview and inline editing */}
            {showPreview && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Resume Preview ({selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)})</h3>
                {renderTemplate()}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Resume;
