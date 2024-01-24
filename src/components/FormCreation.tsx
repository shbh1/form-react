// FormCreation.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setForms } from '../store/formSlice';
import { FormDetail, FormRequest } from '../AppStore.type';

const FormCreation: React.FC = () => {
     const dispatch = useDispatch();

     const createForm = async (values: FormRequest) => {
          try {
               const { title, fields } = values;

               const updatedData = {
                    title, fields: fields.map(field => {
                         return ({
                              label: field.label,
                              type: field.type,
                              required: field.required,
                              options: ['radio', 'checkbox', 'dropdown'].includes(field.type) ? field.options?.split(',') : []
                         })
                    })
               } as FormDetail
               const response = await axios.post('http://localhost:5000/api/forms/create', updatedData);
          } catch (error) {
               console.error('Error creating form:', error);
          }
     };

     const validationSchema = Yup.object().shape({
          title: Yup.string().required('Title is required'),
          fields: Yup.array().of(
               Yup.object().shape({
                    label: Yup.string().required('Label is required'),
                    type: Yup.string().required('Type is required'),
                    required: Yup.boolean(),
               })
          ),
     });

     const initialValues: FormRequest = {
          title: '',
          fields: [],
     };

     return (
          <div>
               <h2>Create Form</h2>
               <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => createForm(values)}
               >
                    <Form>
                         <label>Title:</label>
                         <Field type="text" name="title" />
                         <ErrorMessage name="title" component="div" className="error" />

                         <FieldArray name="fields">
                              {(arrayHelpers) => (
                                   <div>
                                        {arrayHelpers.form.values.fields.map((field: any, index: number) => (
                                             <div key={index}>
                                                  <label>{`Field ${index + 1} Label:`}</label>
                                                  <Field type="text" name={`fields[${index}].label`} />
                                                  <ErrorMessage name={`fields[${index}].label`} component="div" className="error" />

                                                  <label>{`Field ${index + 1} Type:`}</label>
                                                  <Field as="select" name={`fields[${index}].type`}>
                                                       <option value="text">Text</option>
                                                       <option value="radio">Radio</option>
                                                       <option value="checkbox">Checkbox</option>
                                                       <option value="dropdown">Dropdown</option>
                                                  </Field>
                                                  <ErrorMessage name={`fields[${index}].type`} component="div" className="error" />

                                                  {['radio', 'checkbox', 'dropdown'].includes(field.type) && (
                                                       <div>
                                                            <label>{`Field ${index + 1} Options (comma separated):`}</label>
                                                            <Field type="text" name={`fields[${index}].options`} />
                                                            <ErrorMessage
                                                                 name={`fields[${index}].options`}
                                                                 component="div"
                                                                 className="error"
                                                            />
                                                       </div>
                                                  )}

                                                  <label>{`Field ${index + 1} Required:`}</label>
                                                  <Field type="checkbox" name={`fields[${index}].required`} />

                                                  <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                                       Remove Field
                                                  </button>
                                             </div>
                                        ))}

                                        <div>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       arrayHelpers.push({
                                                            label: '',
                                                            type: 'text',
                                                            options: [],
                                                            required: false,
                                                       })
                                                  }
                                             >
                                                  Add Text Field
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       arrayHelpers.push({
                                                            label: '',
                                                            type: 'radio',
                                                            options: [],
                                                            required: false,
                                                       })
                                                  }
                                             >
                                                  Add Radio Field
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       arrayHelpers.push({
                                                            label: '',
                                                            type: 'checkbox',
                                                            options: [],
                                                            required: false,
                                                       })
                                                  }
                                             >
                                                  Add Checkbox Field
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() =>
                                                       arrayHelpers.push({
                                                            label: '',
                                                            type: 'dropdown',
                                                            options: [],
                                                            required: false,
                                                       })
                                                  }
                                             >
                                                  Add Dropdown Field
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </FieldArray>
                         <button type="submit">Create Form</button>
                    </Form>
               </Formik>
          </div>
     );
};

export default FormCreation;
