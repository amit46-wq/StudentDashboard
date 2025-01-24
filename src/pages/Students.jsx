// src/pages/Students.jsx
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import app from "../firebaseConfig";
import Sidebar from "../components/Sidebar.jsx";
import AddStudentModal from "../components/AddStudentModal";
import './student.css'

const Students = () => {
  const db = getFirestore(app);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      // Delete the student document from Firestore
      await deleteDoc(doc(db, "students", studentId));

      // Update the students state to remove the deleted student from the UI
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  // Add a new student to the local state
  const addStudent = (studentData) => {
    setStudents((prevStudents) => [...prevStudents, studentData]);
  };

  // Open the modal
  const openModal = () => setShowModal(true);

  // Close the modal
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full ">
        <button
          onClick={openModal}
          className="add"
        >
          Add Student
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button className="text-blue-500">View</button>
                  <button className="text-yellow-500 mx-2">Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && <AddStudentModal closeModal={closeModal} addStudent={addStudent} />}
      </div>
    </div>
  );
};

export default Students;
