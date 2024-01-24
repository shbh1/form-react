// FormSubmission.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setForms } from '../store/formSlice';
import axios from 'axios';

const FormSubmission: React.FC = () => {
  const forms = useSelector((state: any) => state.form.forms); // Replace 'any' with your actual form data structure
  const dispatch = useDispatch();
  const [selectedForm, setSelectedForm] = useState('');
  // Add state for form submission answers

  const submitForm = async () => {
    try {
      // Implement form submission logic, send answers to the server
      // Clear answers state after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <label>Select Form:</label>
      <select value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)}>
        {forms.map((form: any) => (
          // Replace 'any' with your actual form data structure
          <option key={form._id} value={form._id}>
            {form.title}
          </option>
        ))}
      </select>
      {/* Add input fields for form submission answers here */}
      <button onClick={submitForm}>Submit Form</button>
    </div>
  );
};

export default FormSubmission;
