import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, Space } from "antd";
import { createEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import "prismjs/themes/prism.css";
import dmmyimg from '../assets/151595661_d7fe0908-4a18-445f-940f-f15055e16c75-01.jpg'

export default function Blogpage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [parsedContent, setParsedContent] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        const parsedF = JSON.parse(response.data.content);
        const parsed2 = JSON.parse(parsedF);
        setParsedContent(parsed2);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err.message);
      }
    };
    getBlog();
  }, [id]);

  const convertLexicalToHtml = (lexicalJson) => {
    if (!lexicalJson) return "<p>Invalid content</p>";

    try {
      const parsedJson = typeof lexicalJson === "string" ? JSON.parse(lexicalJson) : lexicalJson;
      if (!parsedJson?.root) return "<p>Invalid content</p>";

      const editor = createEditor({ nodes: [CodeNode, HeadingNode, LinkNode, CodeHighlightNode] });
      const editorState = editor.parseEditorState(parsedJson);
      editor.setEditorState(editorState);

      let htmlContent = "";
      editor.getEditorState().read(() => {
        htmlContent = $generateHtmlFromNodes(editor);
      });

      return htmlContent;
    } catch (error) {
      console.error("Error converting Lexical to HTML:", error);
      return "<p>Failed to convert content</p>";
    }
  };

  if (!blog) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-3xl w-full px-6 md:px-10 py-10">
        
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>

        
        <div className="flex items-center mt-4 text-gray-600">
          <Avatar size={50} src={blog.author?.avatar || "https://www.example.com/default-avatar.png"} />
          <div className="ml-3">
            <p className="font-medium text-lg">{blog.author?.name || "Unknown Author"}</p>
            <p className="text-sm">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        
        <img
        //   src={blog.coverImage || "https://via.placeholder.com/800x400"}
        src={dmmyimg}
          alt="Blog Cover"
          className="mt-6 w-full rounded-lg shadow-md object-cover"
        />

        <div className="prose max-w-none mt-8 text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: convertLexicalToHtml(parsedContent) }} />
        </div>
      </div>
    </div>
  );
}
