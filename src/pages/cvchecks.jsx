import React, { useState, useEffect } from "react";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
const { Dragger } = Upload;
const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [selectedCv, setSelectedCv] = useState(null);
  const [atsScore, setAtsScore] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [missingSections, setMissingSections] = useState([]);
  const [temp , setTemp] = useState([

  ])

  const handleFileChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    setFile(info.file)
    if (info.file.status === "done" || info.file.status === "success") {
      alert(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  

  useEffect(()=>{
    console.log('use f fie',file)
  },[file])

  const handleUpload = async () => {
    if (!file) {
      alert('plz upload a file');
      return;
    }
const formData = {
  file: file,
}
    // const formData = new FormData();
    // formData.append("file", file);

    console.log(formData)
    

    setIsLoading(true);  
    try {
      const response = await axios.post("http://localhost:4000/api/cvs/upload", formData, {
        headers: { 
          "Content-type": "multipart/form-data", },
      });

      console.log(response.data);
      setAtsScore(response.data.atsScore);
      setSelectedCv(response.data.cv);
      setMessage(response.data.message);
      setMissingSections(response.data.missingSections);
      setTemp(response.data.templates)

    } catch (error) {
      console.error("Error uploading CV", error);
    } finally {
      setIsLoading(false);  
    }
  };

 
  const docs = temp.map((template) => ({
    uri: template, 
  }));

//    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
// }
// Drop your resume here or choose a file.
// PDF & DOCX only. Max 2MB file size.
  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-lg  mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Upload CV</h2>
        {/* <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
        /> */}
          <Dragger
          name="file"
          beforeUpload={() => false} 
          onChange={handleFileChange}
          multiple={false}
          accept=".pdf,.docx"
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">PDF & DOCX only. Max 2MB file size.</p>
        </Dragger>
        <Button
        type='primary'
          onClick={handleUpload}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>

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
                {/* <div>
                  {temp.map((temp)=>{
                    <div className="bg-red-200 text-2xl">
                      {temp}
                      </div>
                  })}

                  <div>
                    {temp}
                  </div>
                </div> */}
              </>
            )}
          </div>
        )}
<div>
  {/* {temp && temp.map((item, index) => (
    <div key={index} className="bg-red-200 text-2xl">
      {item}
    </div>
  ))} */}

<DocViewer 
        documents={docs} 
        pluginRenderers={DocViewerRenderers} 
      />
</div>

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
