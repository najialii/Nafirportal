import React, { useState } from "react";
import axios from "axios";

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [selectedCv, setSelectedCv] = useState(null);
  const [atsScore, setAtsScore] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [missingSections, setMissingSections] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    setIsLoading(true);  
    try {
      const response = await axios.post("http://localhost:4000/api/cvs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      setAtsScore(response.data.atsScore);
      setSelectedCv(response.data.cv);
      setMessage(response.data.message);
      setMissingSections(response.data.missingSections);

    } catch (error) {
      console.error("Error uploading CV", error);
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Upload CV</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>

        {atsScore !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold">ATS Score</h3>
            <p className="text-lg">{atsScore}</p>
            <h3 className="text-xl font-semibold mt-4">Message</h3>
            <p className="text-lg">{message}</p>
            {missingSections.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mt-4">Missing Sections</h3>
                <ul className="list-disc pl-5">
                  {missingSections.map((section, index) => (
                    <li key={index} className="text-lg">{section}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {selectedCv && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold">CV Details</h3>
            <pre className="text-sm">{JSON.stringify(selectedCv, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUpload;
