'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

export default function Admin() {
  const [formdata, setFormdata] = useState({
    obj_id:'',
    employee_id: '',
    name: '',
    position: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});
  const [hidden, sethidden] = useState('hidden');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formdata.employee_id.trim()) {
      errors.employee_id = 'Employee ID is required';
      isValid = false;
    }

    if (!formdata.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formdata.position.trim()) {
      errors.position = 'Position is required';
      isValid = false;
    }

    if (!formdata.salary.trim()) {
      errors.salary = 'Salary is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(
          `http://127.0.0.1:5000/employees/${formdata.obj_id}`,
          formdata
        );
        console.log(formdata.obj_id);
        setFormdata({obj_id:'', employee_id: '', name: '', position: '', salary: '' });
        sethidden('hidden');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const Edit = (_id,id, name, position, salary) => {
    setFormdata({
      ...formdata,
      obj_id:_id,
      employee_id: id.toString(),
      name: name,
      position: position,
      salary: salary,
    });
    sethidden('');
  };

  const Delete = async (id) => {
    try {
      
      await axios.delete(`http://127.0.0.1:5000/employees/${id}`);
      console.log(id);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'employee_id',
      headerName: 'ID',
      type: 'number',
      sortable: false,
      width: 70,
    },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'position',
      headerName: 'Position',
      sortable: false,
      width: 160,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      width: 120,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/employees/');
        setData(response.data.employee);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="w-[50%] h-[500px]  px-14 py-14">
        <h1 className="text-4xl text-center font-semibold py-3">
          Employee Details
        </h1>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.employee_id}
        />
      </div>
      <div className="py-20 pr-10">
        <h1 className="text-4xl text-center font-semibold pb-3">
          Employee CURD Opration
        </h1>
        <table className=" border-2 border-black ">
          <thead>
            <tr className="px-3">
              <th className="px-5 py-2 border-2 border-black ">ID</th>
              <th className="px-5 py-2 border-2 border-black ">Name</th>
              <th className="px-5 py-2 border-2 border-black ">Position</th>
              <th className="px-5 py-2 border-2 border-black ">Salary</th>
              <th className="px-5 py-2 border-2 border-black ">Update</th>
              <th className="px-5 py-2 border-2 border-black ">Delete</th>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {data.map((e) => (
              <tr className="" key={e.employee_id}>
                <td className="px-5 border-2 border-black ">{e.employee_id}</td>
                <td className="px-5 border-2 border-black ">{e.name}</td>
                <td className="px-5 border-2 border-black ">{e.position}</td>
                <td className="px-5 border-2 border-black ">{e.salary}</td>
                <td className="py-1 border-2 border-black  ">
                  <button
                    className="w-full h-full py-2 bg-blue-200 rounded-lg"
                    onClick={() =>
                      Edit(e._id,e.employee_id, e.name, e.position, e.salary)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td className="py-1 border-2 border-black ">
                  <button 
                    className="w-full h-full py-2   bg-red-200 rounded-lg"
                    onClick={() => Delete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${hidden}`}>
        <div
          className={`fixed left-0 top-0 z-10 backdrop-blur-lg w-full h-full`}
        >
          <button
            className="float-right text-2xl px-10 opacity-50"
            onClick={() => {
              sethidden('hidden');
            }}
          >
            X
          </button>
          <div className="flex py-14 ">
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
                  {errors.employee_id && (
                    <p className="text-red-500">{errors.employee_id}</p>
                  )}
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
                  {errors.position && (
                    <p className="text-red-500">{errors.position}</p>
                  )}
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
                  {errors.salary && (
                    <p className="text-red-500">{errors.salary}</p>
                  )}
                </div>
                <div className="pt-5">
                  <button
                    className="text-2xl w-full text-white bg-black py-3 "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
