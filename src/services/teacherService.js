import axios from 'axios';

const API_URL = 'https://example.com/api/teachers'; // replace with your backend URL

// Get all teachers
export const getTeachers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get teacher by ID
export const getTeacherById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new teacher
export const addTeacher = async (teacherData) => {
  const response = await axios.post(API_URL, teacherData);
  return response.data;
};

// Update teacher
export const updateTeacher = async (id, teacherData) => {
  const response = await axios.put(`${API_URL}/${id}`, teacherData);
  return response.data;
};

// Delete teacher
export const deleteTeacher = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
