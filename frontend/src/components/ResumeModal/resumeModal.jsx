import React from "react";

const ResumeModal = ({ resumeData }) => {
  if (!resumeData) return null;
  return (
    <div className="w-full">
      {/* Modern Template */}
      {resumeData.template === "modern" && (
        <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{resumeData.data.name}</h1>
          <div className="text-gray-600 mb-2">{resumeData.data.email} | {resumeData.data.phone} | {resumeData.data.address}</div>
          <div className="font-semibold text-lg mt-4 mb-2">Professional Summary</div>
          <div className="mb-4">{resumeData.data.summary}</div>
          <div className="font-semibold text-lg mt-4 mb-2">Education</div>
          <ul className="mb-4">
            {resumeData.data.education?.map((e, i) => (
              <li key={i} className="mb-1">{e.degree} at {e.school} ({e.year})</li>
            ))}
          </ul>
          <div className="font-semibold text-lg mt-4 mb-2">Experience</div>
          <ul className="mb-4">
            {resumeData.data.experience?.map((ex, i) => (
              <li key={i} className="mb-1">
                <span className="font-bold">{ex.role}</span> at {ex.company} ({ex.year})<br />
                <span className="text-gray-700">{ex.description}</span>
              </li>
            ))}
          </ul>
          <div className="font-semibold text-lg mt-4 mb-2">Skills</div>
          <div className="mb-4">{resumeData.data.skills}</div>
          <div className="font-semibold text-lg mt-4 mb-2">Projects</div>
          <ul>
            {resumeData.data.projects?.map((p, i) => (
              <li key={i} className="mb-1"><span className="font-bold">{p.name}:</span> {p.description}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Classic Template */}
      {resumeData.template === "classic" && (
        <div className="p-8 bg-gray-50 border border-gray-300 rounded max-w-2xl mx-auto">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">{resumeData.data.name}</h1>
          <div className="text-gray-700 mb-2">{resumeData.data.email} | {resumeData.data.phone} | {resumeData.data.address}</div>
          <div className="italic mb-4">{resumeData.data.summary}</div>
          <div className="font-semibold text-md mt-4 mb-2">Education</div>
          <ul className="mb-4">
            {resumeData.data.education?.map((e, i) => (
              <li key={i} className="mb-1">{e.school} - {e.degree} ({e.year})</li>
            ))}
          </ul>
          <div className="font-semibold text-md mt-4 mb-2">Experience</div>
          <ul className="mb-4">
            {resumeData.data.experience?.map((ex, i) => (
              <li key={i} className="mb-1">
                <span className="font-bold">{ex.role}</span>, {ex.company} ({ex.year})<br />
                <span className="text-gray-700">{ex.description}</span>
              </li>
            ))}
          </ul>
          <div className="font-semibold text-md mt-4 mb-2">Skills</div>
          <div className="mb-4">{resumeData.data.skills}</div>
          <div className="font-semibold text-md mt-4 mb-2">Projects</div>
          <ul>
            {resumeData.data.projects?.map((p, i) => (
              <li key={i} className="mb-1"><span className="font-bold">{p.name}:</span> {p.description}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Creative Template */}
      {resumeData.template === "creative" && (
        <div className="p-8 bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-pink-700 mb-2">{resumeData.data.name}</h1>
          <div className="text-blue-700 mb-2">{resumeData.data.email} | {resumeData.data.phone} | {resumeData.data.address}</div>
          <div className="font-semibold text-lg mt-4 mb-2 text-pink-700">Summary</div>
          <div className="mb-4 italic">{resumeData.data.summary}</div>
          <div className="font-semibold text-lg mt-4 mb-2 text-blue-700">Education</div>
          <ul className="mb-4">
            {resumeData.data.education?.map((e, i) => (
              <li key={i} className="mb-1">{e.degree} at <span className="font-bold">{e.school}</span> ({e.year})</li>
            ))}
          </ul>
          <div className="font-semibold text-lg mt-4 mb-2 text-pink-700">Experience</div>
          <ul className="mb-4">
            {resumeData.data.experience?.map((ex, i) => (
              <li key={i} className="mb-1">
                <span className="font-bold">{ex.role}</span> at <span className="font-bold">{ex.company}</span> ({ex.year})<br />
                <span className="text-blue-700">{ex.description}</span>
              </li>
            ))}
          </ul>
          <div className="font-semibold text-lg mt-4 mb-2 text-pink-700">Skills</div>
          <div className="mb-4">{resumeData.data.skills}</div>
          <div className="font-semibold text-lg mt-4 mb-2 text-blue-700">Projects</div>
          <ul>
            {resumeData.data.projects?.map((p, i) => (
              <li key={i} className="mb-1"><span className="font-bold">{p.name}:</span> {p.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeModal;
