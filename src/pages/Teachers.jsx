import React from 'react';
import Table from '../components/Table';
import Button from '../components/Button';

const Teachers = () => {
  const columns = ['Name', 'Email', 'Subject'];
  const data = [
    { Name: 'John Doe', Email: 'john@example.com', Subject: 'Math' },
    { Name: 'Jane Smith', Email: 'jane@example.com', Subject: 'Science' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button>Add Teacher</Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Teachers;
