import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import './addstudenmodal.css'

const AddStudentModal = ({ closeModal, addStudent }) => {
  const db = getFirestore(app);
  
  const [formData, setFormData] = useState({
    name: "",
    mothername:"",
    class: "",
    section: "",
    rollNumber: "",
    ContactNumber:"",
    BloodGroup:"",
    height:"",
    DOB:"",
    Age:"",
    GrNo:"",
    AdmissionDate:"",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "students"), formData);
      
      // Pass new student data back to parent component to update the table
      addStudent({ id: docRef.id, ...formData });

      // Close the modal after submitting
      closeModal();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };




return (
    <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Mother's Name", name: "mothername" },
            { label: "Class", name: "class" },
            { label: "Section", name: "section" },
            { label: "Roll Number", name: "rollNumber" },
            { label: "Contact Number", name: "ContactNumber" },
            { label: "Blood Group", name: "BloodGroup" },
            { label: "Height", name: "height" },
            { label: "Date of Birth", name: "DOB", type: "date" },
            { label: "Age", name: "Age" },
            { label: "GR Number", name: "GrNo" },
            { label: "Admission Date", name: "AdmissionDate", type: "date" },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
          ))}
  
          <div className="formbtn flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <button type="button" onClick={closeModal} className="exit bg-red-500 text-white px-4 py-2 rounded-md">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
);
};
export default AddStudentModal;