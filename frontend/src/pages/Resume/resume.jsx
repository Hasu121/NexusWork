import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resume = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({});
  const [savedResume, setSavedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/resume/templates', { withCredentials: true })
      .then(res => setTemplates(res.data.templates))
      .catch(err => setError('Failed to load templates'));
    axios.get('http://localhost:4000/api/resume/me', { withCredentials: true })
      .then(res => {
        if (res.data.resume) {
          setSavedResume(res.data.resume);
          setSelectedTemplate(res.data.resume.template);
          setResumeData(res.data.resume.data);
        }
      })
      .catch(err => setError('Failed to load saved resume'))
      .finally(() => setLoading(false));
  }, []);

  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
    setResumeData({});
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    axios.post('http://localhost:4000/api/resume/save', {
      template: selectedTemplate,
      data: resumeData
    }, { withCredentials: true })
      .then(res => {
        setSavedResume(res.data.resume);
        alert('Resume saved!');
      })
      .catch(err => setError('Failed to save resume'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Resume Builder</h2>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}
        <div>
          <h3 className="text-xl font-semibold mb-4">Select a Template</h3>
          <div className="flex flex-wrap gap-8 justify-center mb-8">
            {templates.map(t => (
              <div key={t.id}
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-200 shadow-sm ${selectedTemplate === t.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-blue-400'}`}
                onClick={() => handleTemplateSelect(t.id)}
                style={{ width: '160px', background: selectedTemplate === t.id ? '#f0f8ff' : '#fff' }}
              >
                <img src={t.preview} alt={t.name} className="w-32 h-40 object-contain mb-2 rounded" style={{background:'#f9f9f9'}} />
                <div className="font-medium text-lg text-center">{t.name}</div>
                {selectedTemplate === t.id && <div className="mt-2 text-blue-600 text-sm font-semibold">Selected</div>}
              </div>
            ))}
          </div>
        </div>
        {selectedTemplate && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Edit Resume</h3>
            <form className="flex flex-col gap-4">
              <input name="name" placeholder="Name" value={resumeData.name || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <input name="email" placeholder="Email" value={resumeData.email || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <input name="phone" placeholder="Phone" value={resumeData.phone || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <input name="address" placeholder="Address" value={resumeData.address || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <textarea name="summary" placeholder="Professional Summary" value={resumeData.summary || ''} onChange={handleChange} className="border rounded px-3 py-2" rows={2} />
              <input name="education" placeholder="Education" value={resumeData.education || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <input name="experience" placeholder="Experience" value={resumeData.experience || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <input name="skills" placeholder="Skills (comma separated)" value={resumeData.skills || ''} onChange={handleChange} className="border rounded px-3 py-2" />
              <textarea name="projects" placeholder="Projects (describe here)" value={resumeData.projects || ''} onChange={handleChange} className="border rounded px-3 py-2" rows={2} />
              <button type="button" onClick={handleSave} disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save Resume</button>
            </form>
          </div>
        )}
        {savedResume && (
          <div className="mt-10 bg-gray-50 rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-4">Your Saved Resume</h3>
            <div className="mb-2"><span className="font-semibold">Template:</span> {savedResume.template}</div>
            <div className="mb-2"><span className="font-semibold">Name:</span> {savedResume.data.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {savedResume.data.email}</div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> {savedResume.data.phone}</div>
            <div className="mb-2"><span className="font-semibold">Address:</span> {savedResume.data.address}</div>
            <div className="mb-2"><span className="font-semibold">Summary:</span> {savedResume.data.summary}</div>
            <div className="mb-2"><span className="font-semibold">Education:</span> {savedResume.data.education}</div>
            <div className="mb-2"><span className="font-semibold">Experience:</span> {savedResume.data.experience}</div>
            <div className="mb-2"><span className="font-semibold">Skills:</span> {savedResume.data.skills}</div>
            <div className="mb-2"><span className="font-semibold">Projects:</span> {savedResume.data.projects}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
