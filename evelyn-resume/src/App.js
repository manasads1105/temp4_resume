import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const initialSkills = [
  { name: "Service Workers", level: 7 },
  { name: "Seo Basics", level: 8 },
  { name: "Testing/debugging", level: 9 },
  { name: "Chrome Devtools", level: 10 },
  { name: "Front-end Frameworks", level: 10 },
  { name: "State Management", level: 8 },
];

const interests = ["Surfing", "Martial Arts", "Community Service", "Blogging"];
const strengthsList = ["Patience", "Perseverance", "Planning", "Positivity"];
const initialLanguages = [
  { name: "English", level: 10 },
  { name: "French", level: 7 },
  { name: "Mandarin", level: 5 },
];
const fontOptions = [
  "sans-serif",
  "serif",
  "monospace",
  "Georgia",
  "Arial",
  "Courier New",
  "Roboto",
];

export default function App() {
  const resumeRef = useRef();
  const fileInputRef = useRef(null);

  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [clickedStrengths, setClickedStrengths] = useState([]);
  const [clickedInterests, setClickedInterests] = useState([]);
  const [skillLevels, setSkillLevels] = useState([...initialSkills]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [languageLevels, setLanguageLevels] = useState([...initialLanguages]);
  const [resumeScore, setResumeScore] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [isEditing, setIsEditing] = useState(false);
  const [showAIDropdown, setShowAIDropdown] = useState(false);

  const [professionalSummary, setProfessionalSummary] = useState(
    "Detail-oriented Front End Web Developer with 5+ years of experience in creating responsive, user-friendly websites. Proficient in HTML, CSS, and JavaScript, with a strong understanding of frameworks like React and Vue.js. Passionate about performance optimization and clean code."
  );

  const [workExperience, setWorkExperience] = useState([
    {
      title: "Front End Web Developer",
      company: "ABC Corporation",
      years: "2019 - Present",
      details: [
        "Developed and maintained web applications using React and Vue.js.",
        "Collaborated with designers and backend developers.",
      ],
    },
  ]);

  const [education, setEducation] = useState([
    {
      degree: "B.Tech in Computer Science & Engineering",
      year: "2025",
      university: "PES University, Bangalore",
    },
  ]);

  const downloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: "Evelyn_White_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const shareResume = async () => {
    try {
      const blob = await html2pdf().from(resumeRef.current).outputPdf("blob");
      const file = new File([blob], "Evelyn_White_Resume.pdf", {
        type: "application/pdf",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume!",
          files: [file],
        });
      } else {
        alert("Sharing not supported on this device/browser.");
      }
    } catch (err) {
      alert("Failed to share: " + err.message);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleStrengthClick = (strength) => {
    setClickedStrengths((prev) =>
      prev.includes(strength) ? prev.filter((s) => s !== strength) : [...prev, strength]
    );
  };

  const handleInterestClick = (interest) => {
    setClickedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSkillMouseDown = (index) => {
    setIsDragging(true);
    setDraggingIndex(index);
  };

  const handleSkillMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };

  const handleSkillMouseMove = (e, index) => {
    if (!isDragging || draggingIndex !== index) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newLevel = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const level = Math.round((newLevel / rect.width) * 10);
    const updatedSkills = [...skillLevels];
    updatedSkills[index].level = level;
    setSkillLevels(updatedSkills);
  };

  const handleLanguageClick = (index) => {
    const updatedLanguages = [...languageLevels];
    updatedLanguages[index].level =
      updatedLanguages[index].level === 10 ? 1 : updatedLanguages[index].level + 1;
    setLanguageLevels(updatedLanguages);
  };

  const rateResume = () => {
    const score = Math.floor(Math.random() * 41) + 60;
    setResumeScore(score);
    alert(`Your ATS Resume Score: ${score}/100`);
  };

  const handleWorkDetailChange = (jobIdx, detailIdx, value) => {
    const updated = [...workExperience];
    updated[jobIdx].details[detailIdx] = value;
    setWorkExperience(updated);
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { title: "", company: "", years: "", details: [""] }]);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", year: "", university: "" }]);
  };

  // AI Enhancement Features
  const enhanceProfessionalSummary = () => {
    const enhancedSummary =
      "Creative and highly motivated Front End Developer with a proven track record of building dynamic, user-centric web applications. Skilled in modern front-end technologies including React, Vue.js, and performance best practices. Adept at collaborating across teams to deliver scalable, maintainable code and exceptional user experiences.";
    setProfessionalSummary(enhancedSummary);
  };

  const enhanceWorkExperience = () => {
    const enhanced = [
      {
        title: "Senior Front End Developer",
        company: "ABC Corporation",
        years: "2019 - Present",
        details: [
          "Led the front-end development of high-impact projects using React, improving performance by 30%.",
          "Mentored junior developers and conducted code reviews to uphold best practices.",
          "Worked cross-functionally with design and product teams to deliver seamless user interfaces.",
        ],
      },
    ];
    setWorkExperience(enhanced);
  };

  const enhanceEducation = () => {
    const enhanced = [
      {
        degree: "B.Tech in Computer Science & Engineering",
        year: "2025",
        university: "PES University, Bangalore - Graduated with Distinction, CGPA: 9.1/10",
      },
    ];
    setEducation(enhanced);
  };

  const toggleAIDropdown = () => setShowAIDropdown((v) => !v);

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row text-sm bg-gray-50"
      style={{ fontFamily }}
      onMouseUp={handleSkillMouseUp}
    >
      {/* Sidebar */}
      <div className="md:w-1/6 bg-black text-white p-4 flex flex-col gap-3 relative">
        <h2 className="text-lg font-bold">🎨 Resume Tools</h2>
        <label className="text-xs">Font Style:</label>
        <select
          className="mt-1 p-1 w-full text-black text-sm rounded"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {fontOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <button
          onClick={downloadPDF}
          className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold"
        >
          📄 Download
        </button>

        <button
          onClick={rateResume}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          📊 Rate
        </button>

        <button
          onClick={handleUploadClick}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          📤 Upload
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {/* AI Assist */}
        <div className="relative">
          <button
            onClick={toggleAIDropdown}
            className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-semibold w-full text-left"
          >
            🤖 AI Assist ▼
          </button>
          {showAIDropdown && (
            <div className="absolute left-0 mt-1 w-full bg-white text-black rounded shadow-lg z-10">
              <button
                onClick={() => {
                  enhanceProfessionalSummary();
                  setShowAIDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-100"
              >
                Enhance Professional Summary
              </button>
              <button
                onClick={() => {
                  enhanceWorkExperience();
                  setShowAIDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-100"
              >
                Enhance Work Experience
              </button>
              <button
                onClick={() => {
                  enhanceEducation();
                  setShowAIDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-100"
              >
                Enhance Education
              </button>
            </div>
          )}
        </div>

        <button
          onClick={downloadPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          💾 Save
        </button>

        <button
          onClick={shareResume}
          className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          🔗 Share
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-orange-400 text-black px-4 py-2 rounded text-sm font-semibold"
        >
          {isEditing ? "✅ Done Editing" : "🖊️ Edit"}
        </button>

        {resumeScore !== null && (
          <div className="text-sm mt-2">
            ATS Score: <strong>{resumeScore}/100</strong>
          </div>
        )}
      </div>

      {/* Sidebar right with profile and skills */}
      <div className="md:w-1/5 bg-pink-400 p-4 space-y-4">
        <img
          src={imageUrl}
          alt="Profile"
          className="rounded-full w-32 h-32 mx-auto object-cover"
        />
        <h3 className="text-lg font-bold">Skills</h3>
        {skillLevels.map((skill, idx) => (
          <div key={idx}>
            <p>{skill.name}</p>
            <div
              className="bg-gray-300 h-2 rounded cursor-pointer"
              onMouseDown={() => handleSkillMouseDown(idx)}
              onMouseMove={(e) => handleSkillMouseMove(e, idx)}
            >
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${(skill.level / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}

        <h3 className="text-lg font-bold">Languages</h3>
        {languageLevels.map((lang, idx) => (
          <p
            key={idx}
            onClick={() => handleLanguageClick(idx)}
            className="cursor-pointer hover:underline"
          >
            {lang.name}: {lang.level}/10
          </p>
        ))}

        <h3 className="text-lg font-bold">Strengths</h3>
        <div className="flex flex-wrap gap-2">
          {strengthsList.map((s, idx) => (
            <span
              key={idx}
              onClick={() => handleStrengthClick(s)}
              className={`px-2 py-1 rounded cursor-pointer ${
                clickedStrengths.includes(s)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((i, idx) => (
            <span
              key={idx}
              onClick={() => handleInterestClick(i)}
              className={`px-2 py-1 rounded cursor-pointer ${
                clickedInterests.includes(i)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Body */}
      <div className="md:w-3/5 p-6 bg-white" ref={resumeRef}>
        <h1 className="text-3xl font-bold mb-1">Evelyn White</h1>
        <p className="mb-4 text-gray-700">
          Frontend Developer | evelyn@example.com | +1234567890 | New York, NY
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Professional Summary</h2>
        {isEditing ? (
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={professionalSummary}
            onChange={(e) => setProfessionalSummary(e.target.value)}
          />
        ) : (
          <p className="text-gray-700">{professionalSummary}</p>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-2">Work Experience</h2>
        {workExperience.map((job, idx) => (
          <div key={idx} className="mb-3">
            {isEditing ? (
              <>
                <input
                  className="font-bold w-full mb-1 border p-1 rounded"
                  value={job.title}
                  onChange={(e) => {
                    const updated = [...workExperience];
                    updated[idx].title = e.target.value;
                    setWorkExperience(updated);
                  }}
                />
                <input
                  className="w-full mb-1 border p-1 rounded"
                  value={job.company}
                  onChange={(e) => {
                    const updated = [...workExperience];
                    updated[idx].company = e.target.value;
                    setWorkExperience(updated);
                  }}
                />
                <input
                  className="w-full mb-1 border p-1 rounded"
                  value={job.years}
                  onChange={(e) => {
                    const updated = [...workExperience];
                    updated[idx].years = e.target.value;
                    setWorkExperience(updated);
                  }}
                />
                {job.details.map((d, detailIdx) => (
                  <textarea
                    key={detailIdx}
                    className="w-full border p-1 my-1 rounded"
                    value={d}
                    onChange={(e) =>
                      handleWorkDetailChange(idx, detailIdx, e.target.value)
                    }
                  />
                ))}
              </>
            ) : (
              <>
                <p className="font-bold">{job.title}</p>
                <p>{job.company}</p>
                <p>{job.years}</p>
                <ul className="list-disc ml-6">
                  {job.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={addWorkExperience}
            className="text-blue-500 underline mb-4"
          >
            + Add Work Experience
          </button>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            {isEditing ? (
              <>
                <input
                  className="w-full mb-1 border p-1 rounded"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].degree = e.target.value;
                    setEducation(updated);
                  }}
                />
                <input
                  className="w-full mb-1 border p-1 rounded"
                  value={edu.university}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].university = e.target.value;
                    setEducation(updated);
                  }}
                />
                <input
                  className="w-full border p-1 rounded"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].year = e.target.value;
                    setEducation(updated);
                  }}
                />
              </>
            ) : (
              <>
                <p>{edu.degree}</p>
                <p>{edu.university}</p>
                <p>{edu.year}</p>
              </>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={addEducation}
            className="text-blue-500 underline"
          >
            + Add Education
          </button>
        )}
      </div>
    </div>
  );
}
