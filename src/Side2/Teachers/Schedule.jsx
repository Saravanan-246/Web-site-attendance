// Side2/Teachers/Schedule.jsx
import React, { useState } from "react";

const classes = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const defaultSections = ["A", "B", "C"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5, 6, 7, 8];
const sampleSubjects = ["Math", "English", "Science", "History", "Art", "PE", "Music", "Computer"];
const sampleTeachers = ["Mr. John", "Ms. Smith", "Mr. Lee", "Ms. Jane", "Mr. Brown", "Ms. Alice"];

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [extraSectionsByClass, setExtraSectionsByClass] = useState({});

  const addNewSchedule = (cls, sec) => {
    const key = `${cls}-${sec}`;
    if (scheduleData[key]) {
      setSelectedClass(cls);
      setSelectedSection(sec);
      return;
    }

    const newSchedule = {};
    days.forEach(day => {
      newSchedule[day] = periods.map(() => ({
        subject: sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)],
        teacher: sampleTeachers[Math.floor(Math.random() * sampleTeachers.length)],
      }));
    });

    setScheduleData({ ...scheduleData, [key]: newSchedule });
    setSelectedClass(cls);
    setSelectedSection(sec);
  };

  const handleCellChange = (day, periodIndex, field, value) => {
    const key = `${selectedClass}-${selectedSection}`;
    const updated = { ...scheduleData };
    updated[key][day][periodIndex][field] = value;
    setScheduleData(updated);
  };

  const saveSchedule = () => {
    alert(`Schedule for ${selectedClass} Section ${selectedSection} saved successfully!`);
    // Backend integration can go here
  };

  const cancelSchedule = () => {
    if (window.confirm("Discard changes?")) {
      // Optional: reload logic
    }
  };

  // Add Extra Section
  const addExtraSection = () => {
    if (!selectedClass) return alert("Select a class first!");
    const sec = prompt("Enter new section name (D, E ...):")?.toUpperCase();
    if (!sec) return;
    const existingExtra = extraSectionsByClass[selectedClass] || [];
    if (defaultSections.includes(sec) || existingExtra.includes(sec)) return alert("Section already exists!");
    setExtraSectionsByClass({ ...extraSectionsByClass, [selectedClass]: [...existingExtra, sec] });
  };

  const allSections = selectedClass
    ? [...defaultSections, ...(extraSectionsByClass[selectedClass] || [])]
    : [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Teacher Schedule</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Admin can add or edit class schedules from LKG to 12 with sections.
      </p>

      {/* Class Buttons */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {classes.map(cls => (
          <button
            key={cls}
            onClick={() => { setSelectedClass(cls); setSelectedSection(""); }}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedClass === cls ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            } hover:scale-105 transition`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Section Buttons */}
      {selectedClass && (
        <div className="flex gap-2 py-2 flex-wrap">
          {allSections.map(sec => (
            <button
              key={sec}
              onClick={() => addNewSchedule(selectedClass, sec)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedSection === sec ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              } hover:scale-105 transition`}
            >
              Section {sec}
            </button>
          ))}
          <button
            onClick={addExtraSection}
            className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition"
          >
            + Add Section
          </button>
        </div>
      )}

      {/* Schedule Table */}
      {selectedClass && selectedSection && scheduleData[`${selectedClass}-${selectedSection}`] && (
        <div className="overflow-x-auto mt-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Class {selectedClass} Section {selectedSection} Schedule
          </h2>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Day / Period</th>
                {periods.map(p => (
                  <th key={p} className="px-4 py-2 text-sm font-semibold text-center">Period {p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">{day}</td>
                  {scheduleData[`${selectedClass}-${selectedSection}`][day].map((cell, idx) => (
                    <td key={idx} className="px-2 py-1 text-sm">
                      <input
                        type="text"
                        value={cell.subject}
                        onChange={e => handleCellChange(day, idx, "subject", e.target.value)}
                        className="w-full px-2 py-1 border rounded mb-1 text-center dark:bg-gray-700 dark:text-white"
                        placeholder="Subject"
                      />
                      <input
                        type="text"
                        value={cell.teacher}
                        onChange={e => handleCellChange(day, idx, "teacher", e.target.value)}
                        className="w-full px-2 py-1 border rounded text-center dark:bg-gray-700 dark:text-white"
                        placeholder="Teacher"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={cancelSchedule}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={saveSchedule}
              className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
