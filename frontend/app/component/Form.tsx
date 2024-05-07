"use client";
import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [formdata, setFormdata] = useState({ employee_id: '', name: '', position: '', salary: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  }

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formdata.employee_id.trim()) {
      errors.employee_id = "Employee ID is required";
      isValid = false;
    }

    if (!formdata.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formdata.position.trim()) {
      errors.position = "Position is required";
      isValid = false;
    }

    if (!formdata.salary.trim()) {
      errors.salary = "Salary is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/employees/', formdata);
        console.log(response.data); // Log the response if you need
        // Reset form after successful submission
        setFormdata({ employee_id: '', name: '', position: '', salary: '' });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <>
      <div className="flex py-14">
        <form onSubmit={handleSubmit} className="mx-auto text-center">
          <h1 className="pb-10 text-5xl font-serif font-semibold">
            Employee details
          </h1>
          <div className="text-left space-y-5 w-[410px]">
            <div>
              <label htmlFor="employee_id" className="text-xl">
                Employee_id:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={formdata.employee_id}
                className="border-2 w-full h-10 border-gray-300"
                type="text"
                id="employee_id"
                name="employee_id"
              />
              {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
            </div>
            <div>
              <label htmlFor="name" className="text-xl">
                Name:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={formdata.name}
                className="border-2 h-10 w-full border-gray-300"
                type="text"
                id="name"
                name="name"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="position" className="text-xl">
                Position:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={formdata.position}
                className="border-2 h-10 w-full border-gray-300"
                type="text"
                id="position"
                name="position"
              />
              {errors.position && <p className="text-red-500">{errors.position}</p>}
            </div>
            <div>
              <label htmlFor="salary" className="text-xl">
                Salary:
              </label>
              <br />
              <input
                onChange={handleChange}
                value={formdata.salary}
                className="border-2 h-10 w-full border-gray-300"
                type="text"
                id="Salary"
                name="salary"
              />
              {errors.salary && <p className="text-red-500">{errors.salary}</p>}
            </div>
            <div className='pt-5'>
              <button className='text-2xl w-full text-white bg-black py-3 ' type='submit'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
