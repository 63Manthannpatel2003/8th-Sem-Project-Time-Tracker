import React, { useState, useEffect } from "react";
import axios from "axios";
import datetime from "react-datetime";

const Module = () => {
    const [projects, setProjects] = useState([]);  // Store projects from DB
    const [selectedProject, setSelectedProject] = useState("");  // Selected Project ID
    const [moduleName, setModuleName] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedHours, setEstimatedHours] = useState("");
    const [status, setStatus] = useState("running");  // Default status
    const [startDate, setStartDate] = useState("");

    // 📌 Fetch projects from backend
    useEffect(() => {
        axios.get("http://localhost:8000/getProjectModule")
            .then((response) => {
                setProjects(response.data);  // Set project list
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);


    // Fetch projects
    useEffect(() => {
        fetch("http://localhost:8000/getAllProjects")
            .then((response) => response.json())
            .then((data) => {
                console.log("Full API Response:", data); // Debugging
                setProjects(data); // Directly setting data since it's an array
            })
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    // 📌 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("🔹 Button Clicked: handleSubmit executed");
        console.log("Selected Project ID:", selectedProject);
        console.log("Start Date Before Formatting:", startDate);

        const formattedDate = startDate.split("/").reverse().join("-"); // Convert "23/3/2025" -> "2025-03-23"
        const isoDate = new Date(formattedDate).toISOString(); // Convert to ISO format
    
        console.log("✅ Formatted Date (ISO):", isoDate);
    
        const moduleData = {
            projectId: selectedProject.trim(), // Ensure it's a string
            moduleName: moduleName.trim(),
            description: description.trim(),
            estimatedHours: parseInt(estimatedHours, 10), // Ensure it's an integer
            status: status.trim(),
            startDate: isoDate, // Convert to ISO format
        };

        console.log("Sending Data:", moduleData); // Check final data before sending

        try {
            const response = await axios.post("http://localhost:8000/addProjectModule", moduleData, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("✅ Module Added Successfully:", response.data);
            alert("Module Added Successfully!");
    
            // Reset form fields
            setSelectedProject("");
            setModuleName("");
            setDescription("");
            setEstimatedHours("");
            setStatus("");
            setStartDate("");
        } catch (error) {
            console.error("❌ Error adding module:", error.response?.data || error);
            alert("Failed to add module!");
        }
    };
    

    return (
        <div className="container">
            <h2>Add Project Module</h2>
            <form onSubmit={handleSubmit}>
                {/* Project Dropdown */}
                <label>Select Project:</label>
                <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.title}  {/* Change 'name' to 'title' */}
                        </option>
                    ))}
                </select>


                {/* 📌 Module Name */}
                <label>Module Name:</label>
                <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />

                {/* 📌 Description */}
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                {/* 📌 Estimated Hours */}
                <label>Estimated Hours:</label>
                <input type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)} required />

                {/* 📌 Status */}
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>

                {/* 📌 Start Date */}
                <label>Start Date:</label>
                <input type="datetime" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />



                {/* 📌 Submit Button */}
                <button type="submit">Add Module</button>
            </form>
        </div>
    );
};

export default Module;
