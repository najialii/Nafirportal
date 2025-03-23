import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Upload, message as antdMessage } from "antd";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { PlusOutlined } from "@ant-design/icons";
import nafirlogo from '../assets/naflogo-01.svg';
// import {EditorState} from 'lexical'
import { ConfigProvider } from 'antd';
import useAuthContext from "../hooks/useAuthContext.js";
// import { PlusOutlined } from '@ant-design/icons';
import '../styles.css'
import LexicalEditor from '../components/lexicalEditor.jsx';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate , Link} from "react-router-dom";

// import '../components/richtext.css'
// const useEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const onEditorStateChange = (state) => setEditorState(state);
//   const getContent = () => convertToRaw(editorState.getCurrentContent());
//   return [editorState, onEditorStateChange, getContent];
// };

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // const [editorState, setEditorState ]= useState(null)  
  const [content , setContent] = useState('')
const user = useAuthContext()
const navigate = useNavigate()
const uId = user?.user?.userid
  
  
  const handleContentChange = (editorContent) => {
    setContent(editorContent);
  };

  // const userId = localStorage.getItem(userid)
  // console.log(userId)


  const token = localStorage.getItem('userToken')
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // console.log('clicked');
    if (!title || !content) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);
    const rawContent = content
    const blogData = {
      title,
      content: rawContent,
      authorId: uId
  };
  
    try {
      
      console.log(blogData);
      const response = await axios.post("http://localhost:4000/api/blogs", blogData, 
        {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      }
      );
      if (response.status === 201 ) {
        antdMessage.success("Blog created successfully!");
        console.log(response);
        setTitle("");
        setContent(null);  
      } else {
        console.error("Failed to create the blog.");
      }
    } catch (err) {
      console.error("Error creating blog: " , err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('Listening: ', content, title);
  }, [content, title]);

  // const uploadProps = {
  //   beforeUpload: (file) => {
  //     antdMessage.success(`${file.name} uploaded successfully.`);
  //     return false;
  //   },
  // };


  
const uploadProps = {
  name: 'file',
  accept: 'image/*',  // To allow only images
  action: '/upload',  // Add your upload endpoint here
  showUploadList: { showRemoveIcon: true }, // Show the remove icon after upload
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

  return (
    <ConfigProvider>
    <div className="fixed inset-0 bg-white p-6 overflow-auto">
      <nav className="flex justify-between items-center bg-primary-light p-2">
        <div className="flex gap-2 items-center  text-white font-bold p-2">
        <img src={nafirlogo} className="w-20 rounded-md" alt="" srcset="" />
<h2>
  Nafir Text Editer
</h2>
        </div>
        <div style={{ padding: '20px' }}>
          <Link to={'/'}>
      <Button 
        type="primary" 
        icon={<ArrowLeftOutlined />} 
        // onClick={() => navigate(`/`)} 
        >
        Back
      </Button>
        </Link>
    </div>
      </nav>
      <div className=""> 
        <LexicalEditor onContentChange={handleContentChange} />
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter blog title" 
          size="large" 
          className="mb-4 text-4xl font-bold border-none focus:ring-0"
        />
        <div className="flex justify-center items-center mb-4">
        <Upload
        width = {400}
  {...uploadProps}
  listType="picture-card" 
  showUploadList={{
    showRemoveIcon: true,
    showPreviewIcon: false,
  }}
  className="upload-list-style" 
  style={{
    
    border: '2px dashed #0073B1', 
    padding: '40px 20px', 
    borderRadius: '8px', 
    textAlign: 'center',
    backgroundColor: '#F4F6F9', 
  }}
>
  <div>
    <PlusOutlined style={{ fontSize: '24px', color: '#0073B1' }} />
    <div style={{ marginTop: '8px', fontSize: '14px', color: '#0073B1' }}>
      Drag & Drop Image or Click to Upload
    </div>
  </div>
</Upload>
        </div>
        <div className="flex justify-between mt-4">
        <Button type="primary" loading={loading} onClick={handleSubmit}>
            {loading ? "Submitting..." : "Publish"}
          </Button>
       
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
};

export default CreateBlog;
