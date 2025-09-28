import clsx from "clsx";

// ... rest of your Timetable.jsx code stays the same.

import React, { useReducer, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
  FaEdit,
  FaUserAlt,
  FaBook
} from "react-icons/fa";

const CLASSES = ["LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const INITIAL_PERIODS = 5;
const DEFAULT_SECTIONS = ["A","B"];

const buildEmpty = periods =>
  Object.fromEntries(DAYS.map(day => [day, Array(periods).fill("Subject")]));

const ACTIONS = {
  INIT: "INIT",
  SELECT: "SELECT",
  EDIT: "EDIT",
  SAVE: "SAVE",
  DELETE: "DELETE",
  ADD_PERIOD: "ADD_PERIOD",
  ADD_SECTION: "ADD_SECTION",
  REMOVE_SECTION: "REMOVE_SECTION"
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.INIT: {
      const sections = Object.fromEntries(CLASSES.map(c => [c, [...DEFAULT_SECTIONS]]));
      const timetable = Object.fromEntries(
        CLASSES.map(c => [c,
          Object.fromEntries(sections[c].map(s => [s, buildEmpty(INITIAL_PERIODS)]))
        ])
      );
      return { ...state, sections, timetable, periods: INITIAL_PERIODS };
    }
    case ACTIONS.SELECT:
      return { ...state,
        currentClass: payload.cls,
        currentSection: payload.sec,
        editing: null
      };
    case ACTIONS.EDIT:
      return { ...state, editing: payload };
    case ACTIONS.SAVE: {
      const { cls, sec, day, idx, value } = payload;
      const tt = {...state.timetable};
      tt[cls][sec][day][idx] = value || "";
      return {...state, timetable: tt, editing: null};
    }
    case ACTIONS.DELETE: {
      const { cls, sec, day, idx } = payload;
      const tt = {...state.timetable};
      tt[cls][sec][day][idx] = "";
      return {...state, timetable: tt, editing: null};
    }
    case ACTIONS.ADD_PERIOD: {
      const tt = {...state.timetable};
      CLASSES.forEach(c =>
        state.sections[c].forEach(sec =>
          DAYS.forEach(day => tt[c][sec][day].push("Subject"))
        )
      );
      return {...state, timetable: tt, periods: state.periods + 1};
    }
    case ACTIONS.ADD_SECTION: {
      const { newSec } = payload;
      const { currentClass } = state;
      if (!newSec || state.sections[currentClass].includes(newSec)) return state;
      const sections = {...state.sections};
      sections[currentClass].push(newSec);
      const tt = {...state.timetable};
      tt[currentClass][newSec] = buildEmpty(state.periods);
      return {...state, sections, timetable: tt, currentSection: newSec};
    }
    case ACTIONS.REMOVE_SECTION: {
      const { currentClass, currentSection } = state;
      if (state.sections[currentClass].length === 1) return state;
      const secs = state.sections[currentClass].filter(s => s !== currentSection);
      const sections = {...state.sections, [currentClass]: secs};
      const tt = {...state.timetable};
      delete tt[currentClass][currentSection];
      return {...state, sections, timetable: tt, currentSection: secs[0]};
    }
    default:
      return state;
  }
}

const Timetable = () => {
  const [state, dispatch] = useReducer(reducer, {
    currentClass: CLASSES[0],
    currentSection: DEFAULT_SECTIONS[0],
    sections: {},
    timetable: {},
    periods: INITIAL_PERIODS,
    editing: null
  });

  const [searchPeriodName, setSearchPeriodName] = useState("");

  useEffect(() => dispatch({ type: ACTIONS.INIT }), []);

  const {
    currentClass, currentSection,
    sections, timetable,
    periods, editing
  } = state;

  const data = timetable[currentClass]?.[currentSection] || buildEmpty(periods);

  // Filter periods by name for better focus (optional feature)
  const filteredPeriods = searchPeriodName.trim()
    ? Object.fromEntries(DAYS.map(day => [
        day,
        data[day].map(subj => subj.toLowerCase().includes(searchPeriodName.toLowerCase()) ? subj : "")
      ]))
    : data;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent">
          Admin Timetable
        </h1>
        <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <FaCalendarAlt size={20} />
            <select
              value={currentClass}
              onChange={e => dispatch({ type: ACTIONS.SELECT, payload: { cls: e.target.value, sec: sections[e.target.value][0] } })}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CLASSES.map(cls => (
                <option key={cls} value={cls}>
                  {/\D/.test(cls) ? cls : `Class ${cls}`}
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex items-center space-x-2 text-gray-600">
            <FaUserAlt size={20} />
            <select
              value={currentSection}
              onChange={e => dispatch({ type: ACTIONS.SELECT, payload: { cls: currentClass, sec: e.target.value } })}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sections[currentClass]?.map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              const name = prompt("New section name:")?.trim();
              if (!name) alert("Invalid name");
              else dispatch({ type: ACTIONS.ADD_SECTION, payload: { newSec: name } });
            }}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            title="Add section"
          >
            <FaPlus className="mr-2" /> Add Section
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Remove section ${currentSection}?`)) {
                dispatch({ type: ACTIONS.REMOVE_SECTION });
              }
            }}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
            title="Remove section"
          >
            <FaTrash className="mr-2" /> Remove Section
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.ADD_PERIOD })}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            title="Add period"
          >
            <FaPlus className="mr-2" /> Add Period
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="search"
          placeholder="Filter subjects..."
          value={searchPeriodName}
          onChange={e => setSearchPeriodName(e.target.value)}
          className="w-full md:w-1/4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Filter subjects"
        />
      </div>

      {/* Timetable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DAYS.map(day => (
          <div key={day} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 border-b border-indigo-200 pb-2">{day}</h3>
            <div className="divide-y divide-gray-200 flex-grow overflow-auto" style={{ maxHeight: "400px" }}>
              {(filteredPeriods[day] || data[day]).map((subject, idx) => (
                <SubjectCard
                  key={`${day}-${idx}`}
                  day={day}
                  idx={idx}
                  subject={subject}
                  cls={currentClass}
                  sec={currentSection}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Editing Modal */}
      {state.editing && (
        <EditModal
          editing={state.editing}
          onCancel={() => dispatch({ type: ACTIONS.EDIT, payload: null })}
          onSave={value => dispatch({ type: ACTIONS.SAVE, payload: { ...state.editing, value } })}
          onDelete={() => dispatch({ type: ACTIONS.DELETE, payload: state.editing })}
        />
      )}
    </div>
  );
};

// Subject card component for each period slot
const SubjectCard = ({ day, idx, subject, cls, sec, dispatch }) => {
  return (
    <div
      onClick={() => dispatch({ type: ACTIONS.EDIT, payload: { cls, sec, day, idx, value: subject } })}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter") dispatch({ type: ACTIONS.EDIT, payload: { cls, sec, day, idx, value: subject } }) }}
      className={clsx(
        "cursor-pointer p-3 rounded-md border border-gray-300 mb-2 hover:bg-indigo-50 transition relative",
        subject ? "bg-white" : "bg-gray-100 text-gray-400 italic"
      )}
      aria-label={`Period ${idx+1} subject: ${subject || "None"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">Period {idx + 1}</span>
          <p className="truncate max-w-xs">{subject || "(No subject)"}</p>
        </div>
        <FaEdit className="text-indigo-500" />
      </div>
    </div>
  );
};

const EditModal = ({ editing, onCancel, onSave, onDelete }) => {
  const [val, setVal] = useState(editing.value);

  useEffect(() => {
    setVal(editing.value);
  }, [editing]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-5 relative">
        <h2 className="text-xl font-bold border-b border-gray-300 pb-2">
          {editing.day} • Period {editing.idx + 1}
        </h2>
        <input
          type="text"
          className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={val}
          onChange={e => setVal(e.target.value)}
          autoFocus
          aria-label="Subject name"
        />
        <div className="flex justify-between">
          <button
            onClick={() => { onDelete(); }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded flex items-center space-x-2"
          >
            <FaTrash /> <span>Delete</span>
          </button>
          <div className="space-x-3">
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(val.trim())}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close edit modal"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
};

export default Timetable;
