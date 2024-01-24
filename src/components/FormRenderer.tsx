// FormRenderer.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface FormRendererProps { }

const FormRenderer: React.FC<FormRendererProps> = () => {
  const { formId } = useParams<{ formId: string }>();
  const [formDetails, setFormDetails] = useState<any | null>(null);
  const [formValues, setFormValues] = useState<any | null>(null);

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/get/${formId}`);
        setFormDetails(response.data);
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const renderFormField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            onChange={(e) => setFormValues({ ...formValues, [field.label]: e.target.value })}
          />
        );
      case 'radio':
        return (
          <div>
            {field.options.map((option: string, index: number) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`radio_${index}`}
                  name={field.label}
                  value={option}
                  onChange={(e) => setFormValues({ ...formValues, [field.label]: e.target.value })}
                />
                <label htmlFor={`radio_${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div>
            {field.options.map((option: string, index: number) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`checkbox_${index}`}
                  name={field.label}
                  value={option}
                  onChange={(e) => {
                    const selectedOptions = formValues[field.label] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const indexToRemove = selectedOptions.indexOf(e.target.value);
                      if (indexToRemove !== -1) {
                        selectedOptions.splice(indexToRemove, 1);
                      }
                    }
                    setFormValues({ ...formValues, [field.label]: selectedOptions });
                  }}
                />
                <label htmlFor={`checkbox_${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <select
            onChange={(e) => setFormValues({ ...formValues, [field.label]: e.target.value })}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {field.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/forms/submit`, formValues);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Form Renderer</h2>
      {formDetails && (
        <form onSubmit={handleSubmit}>
          <h3>{formDetails.title}</h3>
          {formDetails.fields.map((field: any, index: number) => (
            <div key={index}>
              <label>{field.label}</label>
              {renderFormField(field)}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FormRenderer;
