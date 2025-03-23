import {useState, useEffect} from 'react'
import axios from 'axios'
const { Title, Paragraph } = Typography;

import { List, Typography, Skeleton, Avatar, Space } from "antd";
import {useNavigate} from 'react-router-dom'
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
function activities() {
    const [act , setact] = useState(null)
      const [loading, setLoading] = useState(true);


const getact = async()=>{
    try{
const response =  await axios.get('http://localhost:4000/api/activity')
setact(response.data)
const data = response.data
console.log(data)
setLoading(false)
    } catch(err) {
        console.error(err.message)
    }
}

  const IconText = ({ icon, text }) => (
    <Space>
      {text}
    </Space>
  );
 

    useEffect(()=>{
        getact()
    },[])
  return (
    <div className='' style={{ maxWidth: "800px", margin: "auto", padding: "20px", backgroundColor: '#fff' }}>
          {loading ? (
            <div>
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
              dataSource={act}
              renderItem={(act) => {

    
                return (
                  <List.Item
                  key={act._id}
    
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
      avatar={<Avatar  size={20} src={act.author?.avatar || "https://www.example.com/default-avatar.png"} />}
      title={
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
                {/* {act.name || "Unknown"} */}
                username
                </span>
          </div>
          <a
             href={`/activities/${act._id}`}
            style={{ color: "#333", textDecoration: "none", fontWeight: "semi-bold", fontSize: "1.25rem" }} // Dark Gray
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            {act.name}
          </a>
        </div>
      }
    />
    <div>
{act.location}
    </div>
    <div>
{act.description}
    </div>
    <div>
{act.time}     {new Date(act.date).toLocaleString()}
    </div>


    
                      {/* <div dangerouslySetInnerHTML={{ __html: convertLexicalToHtml(parsedContent) }} /> */}
                    {/* <Paragraph style={{ fontSize: "12px", color: "gray" }}>
                      {new Date(act.date).toLocaleString()}
                    </Paragraph> */}
                  </List.Item>
                );
              }}
            />
          )}
        </div>
  )
}

export default activities