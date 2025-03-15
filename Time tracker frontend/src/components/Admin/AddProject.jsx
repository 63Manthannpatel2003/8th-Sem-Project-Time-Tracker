import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import "../../css/addProject.css";
import "../../css/navbar.css";
import Navbar from "../common/Navbar"; // Adjust the path if needed

export const AddProject = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');

    const submitHandler = async (data) => {
        try {
            data.estimatedHours = parseInt(data.estimatedHours);
            data.startDate = new Date(data.startDate).toISOString();
            data.completionDate = new Date(data.completionDate).toISOString();
            console.log(data);

            const res = await axios.post("/addProject", data);
            setMessage(res.data.Message);

            // Display success toast
            toast.success("🎉 Project added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });

        } catch (error) {
            console.error("Error adding project", error);
            setMessage("Failed to add project");

            // Display error toast
            toast.error("❌ Failed to add project!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
        }
    };

    return (
      <div>
          <Navbar /> {/* Add Navbar here */}
          <ToastContainer /> {/* Toast notification container */}
          <div className="add-project-form">
              <h1>ADD PROJECT</h1>
              {/* {message && <p className="message">{message}</p>} */}
              <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-group">
                      <label>Title</label>
                      <input
                          type='text'
                          {...register("title", { required: "Title is required" })}
                      />
                      {errors.title && <p className="error-message">{errors.title.message}</p>}
                  </div>
  
                  <div className="form-group">
                      <label>Description</label>
                      <textarea
                          {...register("description", { required: "Description is required" })}
                      />
                      {errors.description && <p className="error-message">{errors.description.message}</p>}
                  </div>
  
                  <div className="form-group">
                      <label>Technology</label>
                      <input
                          type='text'
                          {...register("technology", { required: "Technology is required" })}
                      />
                      {errors.technology && <p className="error-message">{errors.technology.message}</p>}
                  </div>
  
                  <div className="form-group">
                      <label>Estimated Hours</label>
                      <input
                          type='number'
                          {...register("estimatedHours", { required: "Estimated hours is required", min: { value: 1, message: "Must be at least 1 hour" } })}
                      />
                      {errors.estimatedHours && <p className="error-message">{errors.estimatedHours.message}</p>}
                  </div>
  
                  <div className="form-group">
                      <label>Start Date</label>
                      <input
                          type='datetime-local'
                          {...register("startDate", { required: "Start date is required" })}
                      />
                      {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
                  </div>
  
                  <div className="form-group">
                      <label>Completion Date</label>
                      <input
                          type='datetime-local'
                          {...register("completionDate", { required: "Completion date is required" })}
                      />
                      {errors.completionDate && <p className="error-message">{errors.completionDate.message}</p>}
                  </div>
  
                  <button type='submit' className="submit-btn">ADD PROJECT</button>
              </form>
          </div>
      </div>
  );
};
