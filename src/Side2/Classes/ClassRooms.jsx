import React, { useState, useEffect } from "react";

// Initial sample data for classes and sections
const initialClasses = [
  {
    id: 1,
    name: "LKG",
    sections: [
      {
        id: "a",
        name: "A",
        teacher: "Ms. Mary Johnson",
        studentsCount: 25,
        room: "A-101",
        subjects: ["Drawing", "Story"],
        lastActivity: "Art Competition",
      },
      {
        id: "b",
        name: "B",
        teacher: "Ms. Alice Green",
        studentsCount: 22,
        room: "A-102",
        subjects: ["Numbers", "Playtime"],
        lastActivity: "Music Day",
      },
    ],
  },
  {
    id: 2,
    name: "1",
    sections: [
      {
        id: "a",
        name: "A",
        teacher: "Mrs. Jennifer Davis",
        studentsCount: 28,
        room: "B-201",
        subjects: ["Math", "English"],
        lastActivity: "Math Test",
      },
    ],
  },
  // Add more classes here...
];

// Section Edit Form
const SectionEditForm = ({ section, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    teacher: section.teacher,
    studentsCount: section.studentsCount,
    room: section.room,
    subjects: section.subjects.join(", "),
    lastActivity: section.lastActivity,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...section,
      teacher: formData.teacher,
      studentsCount: parseInt(formData.studentsCount) || 0,
      room: formData.room,
      subjects: formData.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      lastActivity: formData.lastActivity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded-md bg-blue-50 mb-3">
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="text"
          placeholder="Teacher"
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          className="p-2 border rounded w-36"
        />
        <input
          type="number"
          placeholder="Students"
          value={formData.studentsCount}
          onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
          className="p-2 border rounded w-24"
        />
        <input
          type="text"
          placeholder="Room"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          className="p-2 border rounded w-24"
        />
        <input
          type="text"
          placeholder="Subjects (comma separated)"
          value={formData.subjects}
          onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
          className="p-2 border rounded w-48"
        />
        <input
          type="text"
          placeholder="Recent Activity"
          value={formData.lastActivity}
          onChange={(e) => setFormData({ ...formData, lastActivity: e.target.value })}
          className="p-2 border rounded w-36"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

const ClassManagement = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [newSections, setNewSections] = useState("A");
  const [editingSection, setEditingSection] = useState({ classId: null, sectionId: null });
  const [errors, setErrors] = useState({});

  // Toggle expand class details
  const toggleExpand = (classId) => {
    setExpandedClassId((prev) => (prev === classId ? null : classId));
  };

  // Add new class with multiple sections (with validation)
  const validateForm = () => {
    const newErrors = {};
    if (!newClassName.trim()) {
      newErrors.className = "Class name is required";
    }
    const sectionsArray = newSections.split(",").map((s) => s.trim()).filter(Boolean);
    if (sectionsArray.length === 0) {
      newErrors.sections = "At least one section is required";
    }
    const classExists = classes.some((c) => c.name.toLowerCase() === newClassName.toLowerCase());
    if (classExists) {
      newErrors.className = "Class already exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addClass = () => {
    if (!validateForm()) return;
    const sectionsArray = newSections.split(",").map((s) => s.trim()).filter(Boolean);
    const newClass = {
      id: Date.now(),
      name: newClassName.trim(),
      sections: sectionsArray.map((secName, i) => ({
        id: `${secName.toLowerCase()}${i}`,
        name: secName,
        teacher: "",
        studentsCount: 0,
        room: "",
        subjects: [],
        lastActivity: "",
      })),
    };
    setClasses((prev) => [...prev, newClass]);
    setNewClassName("");
    setNewSections("A");
    setErrors({});
  };

  // Delete entire class
  const deleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((cls) => cls.id !== classId));
      if (expandedClassId === classId) setExpandedClassId(null);
    }
  };

  // Edit section handlers
  const startEditSection = (classId, sectionId) => {
    setEditingSection({ classId, sectionId });
  };

  const saveSectionEdit = (classId, updatedSection) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              sections: cls.sections.map((section) =>
                section.id === updatedSection.id ? updatedSection : section
              ),
            }
          : cls
      )
    );
    setEditingSection({ classId: null, sectionId: null });
  };

  const cancelSectionEdit = () => {
    setEditingSection({ classId: null, sectionId: null });
  };

  // Delete section from a class
  const deleteSection = (classId, sectionId) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === classId
            ? {
                ...cls,
                sections: cls.sections.filter((section) => section.id !== sectionId),
              }
            : cls
        )
      );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-4xl font-extrabold">School Classes Management</h1>

      {/* Add New Class */}
      <section className="p-4 bg-gray-50 rounded-lg shadow space-y-3 max-w-md">
        <h2 className="font-semibold text-xl">Add New Class</h2>
        <input
          type="text"
          placeholder="Class name (e.g. 2, LKG)"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.className && <div className="text-red-500">{errors.className}</div>}
        <input
          type="text"
          placeholder="Sections (comma separated e.g. A, B)"
          value={newSections}
          onChange={(e) => setNewSections(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.sections && <div className="text-red-500">{errors.sections}</div>}
        <button
          onClick={addClass}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Class
        </button>
      </section>

      {/* Classes List */}
      <div className="space-y-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white border rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleExpand(cls.id)}
                className="text-left text-xl font-bold text-indigo-700 flex-1"
                aria-expanded={expandedClassId === cls.id}
              >
                {cls.name} ({cls.sections.length} Sections) {expandedClassId === cls.id ? "▲" : "▼"}
              </button>
              <button
                onClick={() => deleteClass(cls.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 ml-4"
              >
                Delete Class
              </button>
            </div>
            {expandedClassId === cls.id && (
              <div className="mt-4 space-y-4">
                {cls.sections.map((section) =>
                  editingSection.classId === cls.id && editingSection.sectionId === section.id ? (
                    <SectionEditForm
                      key={section.id}
                      section={section}
                      onSave={(updatedSection) => saveSectionEdit(cls.id, updatedSection)}
                      onCancel={cancelSectionEdit}
                    />
                  ) : (
                    <div key={section.id} className="p-3 border rounded-md bg-indigo-50">
                      <h3 className="text-lg font-semibold">Section {section.name}</h3>
                      <p>
                        <strong>Teacher:</strong> {section.teacher || "Not assigned"}
                      </p>
                      <p>
                        <strong>Students:</strong> {section.studentsCount}
                      </p>
                      <p>
                        <strong>Room:</strong> {section.room || "N/A"}
                      </p>
                      <p>
                        <strong>Subjects:</strong>{" "}
                        {section.subjects.length
                          ? section.subjects.join(", ")
                          : "No subjects assigned"}
                      </p>
                      <p>
                        <strong>Recent Activity:</strong> {section.lastActivity || "None"}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => startEditSection(cls.id, section.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSection(cls.id, section.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;
