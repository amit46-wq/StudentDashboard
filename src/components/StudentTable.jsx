import React from "react";

const StudentTable = ({ students, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Class</th>
            <th className="border border-gray-300 p-2">Section</th>
            <th className="border border-gray-300 p-2">Roll Number</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{student.id}</td>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.class}</td>
              <td className="border border-gray-300 p-2">{student.section}</td>
              <td className="border border-gray-300 p-2">{student.rollNumber}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-blue-500"
                  onClick={() => onView(student.id)}
                >
                  View
                </button>
                <button
                  className="text-green-500 ml-2"
                  onClick={() => onEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
