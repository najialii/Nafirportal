import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { List, Typography, Skeleton, Avatar, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { $generateHtmlFromNodes } from "@lexical/html"; 
import { CodeHighlightNode } from '@lexical/code';
import { CodeNode } from "@lexical/code";
import { HeadingNode } from "@lexical/rich-text"; 
import { $createLinkNode, $isLinkNode, LinkNode } from "@lexical/link";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import {EditorState} from 'lexical'
import { createEditor } from "lexical";
import { useNavigate } from "react-router-dom";
// import { $generateHtmlFromNodes } from "@lexical/html";
import dmmyimg from '../assets/151595661_d7fe0908-4a18-445f-940f-f15055e16c75-01.jpg'
const { Title, Paragraph } = Typography;

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()



  const handleBlgNav = ()=>{
    
       navigate(`/blogpage/${mentor._id}`)
    
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blogs");
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        }

        // const parsed= JSON.parse(response.data[0].content);
        console.log("Fetched Blog Content:", JSON.stringify(response.data[0].content, null, 2));

        response.data.forEach((blog, blogIndex) => {
          if (!blog.content) {
            console.error(`Blog ${blogIndex} has no content`);
            return;
          }
        
          try {
            const parsed = JSON.parse(blog.content);
            console.log(`Blog ${blogIndex} Parsed Content:`, JSON.stringify(parsed, null, 2));
            console.log(JSON.parse(parsed))
            if (!parsed.root || !parsed.root.children) {
              console.error(`Blog ${blogIndex} has an invalid structure:`, parsed);
              return;
            }
        
            parsed.root.children.forEach((element, childIndex) => {
              console.log(`Blog ${blogIndex} - Child ${childIndex}:`, element);
            });
          } catch (parseError) {
            console.error(`Error parsing blog ${blogIndex}:`, parseError);
          }
        });
        

      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {text}
    </Space>
  );
 


  const editor = useMemo(
    () => createEditor({ nodes: [CodeNode, HeadingNode] }),
    []
  );
  
  const convertLexicalToHtml = (lexicalJson) => {
    if (!lexicalJson) return "<p>Invalid content</p>";
  
    let parsedJson;
    try {
      parsedJson = typeof lexicalJson === "string" ? JSON.parse(lexicalJson) : lexicalJson;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "<p>Invalid content</p>";
    }
  
    if (!parsedJson?.root) return "<p>Invalid content</p>";
  
    try {
      // Create an editor instance with the correct node registration
      const editor = createEditor({ nodes: [CodeNode, HeadingNode, CodeHighlightNode, LinkNode] });
  
      const editorState = editor.parseEditorState(parsedJson);
      editor.setEditorState(editorState);
  
      let htmlContent = "";
      editor.getEditorState().read(() => {
        htmlContent = $generateHtmlFromNodes(editor);
      });
      console.log(htmlContent)
      return htmlContent;
    } catch (error) {
      console.error("Error converting Lexical to HTML:", error);
      return "<p>Failed to convert content</p>";
    }
  };
  

  const getTruncatedContent = (content, length = 200) => {
    // Limit content to a specific length for preview
    return content.length > length ? `${content.substring(0, length)}...` : content;
  };

  
  
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      {loading ? (
        <div>
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={blogs}
          renderItem={(blog) => {
            const parsedContent = JSON.parse(blog.content);

            return (
              <List.Item
              key={blog._id}

              actions={[
                  <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                  <img
                    width={200}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
              <List.Item.Meta
  avatar={<Avatar size={20} src={blog.author?.avatar || "https://www.example.com/default-avatar.png"} />}
  title={
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{blog.author?.name || "Unknown"}</span>
      </div>
      <a
        href={`/blog/${blog._id}`}
        style={{ color: "#333", textDecoration: "none", fontWeight: "bold", fontSize: "1.25rem" }} // Dark Gray
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        {blog.title}
      </a>
    </div>
  }
/>
<div>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dignissimos doloribus debitis saepe minima quidem ullam quas at minus.
</div>

                  {/* <div dangerouslySetInnerHTML={{ __html: convertLexicalToHtml(parsedContent) }} /> */}
                <Paragraph style={{ fontSize: "12px", color: "gray" }}>
                  {new Date(blog.createdAt).toLocaleString()}
                </Paragraph>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default BlogPost;
