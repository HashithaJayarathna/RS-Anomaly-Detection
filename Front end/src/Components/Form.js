import React, { useState } from "react";
import { detectAnomaly } from "./api"; // Import the function from your api.js file

const Form = () => {
  // Initialize state for form data and anomaly result
  const [formData, setFormData] = useState({
    container_fs_usage_bytes: "",
    container_memory_rss: "",
    container_cpu_system_seconds_total: "",
    container_network_receive_bytes_total: "",
    container_network_receive_errors_total: "",
    container_memory_failures_total: "",
  });

  const [anomalyClass, setAnomalyClass] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission and send data to the anomaly detection model
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anomalyClass = await detectAnomaly(formData);
    setAnomalyClass(anomalyClass); // Set the anomaly class result
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Enter Your Test Data
        </h1>

        {/* Input fields for the form */}
        <input
          type="text"
          name="container_fs_usage_bytes"
          placeholder="Container FS Usage Bytes"
          value={formData.container_fs_usage_bytes}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />
        <input
          type="text"
          name="container_memory_rss"
          placeholder="Container Memory RSS"
          value={formData.container_memory_rss}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />
        <input
          type="text"
          name="container_cpu_system_seconds_total"
          placeholder="Container CPU System Seconds Total"
          value={formData.container_cpu_system_seconds_total}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />
        <input
          type="text"
          name="container_network_receive_bytes_total"
          placeholder="Container Network Receive Bytes Total"
          value={formData.container_network_receive_bytes_total}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />
        <input
          type="text"
          name="container_network_receive_errors_total"
          placeholder="Container Network Receive Errors Total"
          value={formData.container_network_receive_errors_total}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />
        <input
          type="text"
          name="container_memory_failures_total"
          placeholder="Container Memory Failures Total"
          value={formData.container_memory_failures_total}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="\d*"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Submit
        </button>

        {/* Display message after submission */}
        {submitted && (
          <p className="text-green-600 text-center mt-4">
            Anomaly Class:{" "}
            {anomalyClass !== null ? anomalyClass : "Calculating..."}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
