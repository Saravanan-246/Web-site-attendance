import { useMemo, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import classData from './classData'; // static JSON or API import
const allClasses = Object.keys(classData);

export function useClassData({ search, sortBy, filter }) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 300);
    handler();
    return () => handler.cancel();
  }, [search]);

  const filtered = useMemo(() => {
    return allClasses.filter(cls => {
      const data = classData[cls];
      const matches =
        cls.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        data.teacher.toLowerCase().includes(debouncedSearch.toLowerCase());
      if (!matches) return false;

      switch (filter) {
        case 'with': return data.assignments > 0;
        case 'without': return data.assignments === 0;
        case 'high-performance': return data.performance >= 90;
        default: return true;
      }
    });
  }, [debouncedSearch, filter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const da = classData[a], db = classData[b];
      switch (sortBy) {
        case 'assignments': return db.assignments - da.assignments;
        case 'students': return db.students - da.students;
        case 'performance': return db.performance - da.performance;
        case 'attendance': return db.attendance - da.attendance;
        default: return a.localeCompare(b, undefined, { numeric: true });
      }
    });
  }, [filtered, sortBy]);

  const stats = useMemo(() => {
    const total = allClasses.length;
    const withAssign = allClasses.filter(c => classData[c].assignments > 0).length;
    const totalStudents = allClasses.reduce((sum, c) => sum + classData[c].students, 0);
    const totalAssignments = allClasses.reduce((sum, c) => sum + classData[c].assignments, 0);
    const avg = arr => Math.round(arr.reduce((s, c) => s + c, 0) / total);
    const avgAttendance = avg(allClasses.map(c => classData[c].attendance));
    const avgPerformance = avg(allClasses.map(c => classData[c].performance));
    return { total, withAssign, withoutAssign: total - withAssign, totalStudents, totalAssignments, avgAttendance, avgPerformance };
  }, []);

  return { classes: sorted, stats };
}
