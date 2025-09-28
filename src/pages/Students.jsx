import React from 'react';
import Table from '../components/Table';
import Button from '../components/Button';

const Students = () => {
  const columns = ['Name', 'RollNo', 'Class', 'Attendance'];
  const data = [
    { Name: 'Alice', RollNo: '101', Class: '10A', Attendance: '95%' },
    { Name: 'Bob', RollNo: '102', Class: '10B', Attendance: '90%' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button>Add Student</Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Students;
