import axios from "axios";

export const detectAnomaly = async (inputData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/detect-anomaly",
      inputData
    );
    console.log("Anomaly Class:", response.data.anomaly_class);
    return response.data.anomaly_class;
  } catch (error) {
    console.error("Error:", error);
  }
};
