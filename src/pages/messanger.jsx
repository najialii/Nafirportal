import { useState, useEffect, useRef } from "react";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";
import { IoIosSend } from "react-icons/io";
import { Layout, Input, Button, List, Avatar, Spin, notification } from "antd";
import Conversations from "../components/conversations";
import {useParams} from 'react-router-dom'

const { Header, Content, Sider, Footer } = Layout;

const Messanger = () => {
  const user = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const currentUser = user?.user?.userid;
  const socket = useRef(null);
  const newMessageRef = useRef(null);
  const conId = useParams();
  const hasBeenAdded = useRef(false);

//   console.log("Extracted Conversation ID:", conId.conversationId);

console.log
  const formatTimeAgo = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  useEffect(() => {
    if (!currentUser) return;
  
    if (!socket.current) {
      socket.current = io("http://localhost:4000", {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
        transports: ['websocket'],
      });
  
      socket.current.on('connect', () => {
        console.log("Socket connected:", socket.current.id);
      });
  
      socket.current.on('disconnect', () => {
        console.log("Socket disconnected. Attempting to reconnect...");
      });
    }
  
    socket.current.emit("add-user", currentUser);
    console.log(currentUser, 'here is the curetn user ')

    socket.current.on("get-messages", (data) => {
      console.log("New message receivedsssssssssssss:", data);  
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });




      const openNotification = () => {
        notification.info({
          message: 'New Message',
          description: 'You have a new message.',
          placement: 'bottomRight',
          duration: 3, // Notification will disappear after 3 seconds
        });
      };

      openNotification();
    });

    
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  
  }, [currentUser]);
  

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.some(member => member._id === arrivalMessage.sender)) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/conversation/${currentUser}`);
        setConversations(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentUser) {
      getConversations();
    }
  }, [currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const response = await axios.get(`http://localhost:4000/api/messages/${currentChat?._id}`);
          setMessages(response.data);
        console.log('lets see ', response.data)
        } catch (err) {
          console.error(err);
        }
      } else {
        setMessages([]);
      }
    };

    getMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat.members.find((member) => member._id !== currentUser);
  
    console.log("Sending message:", { senderId: currentUser, receiverId, text: newMessage });  
  
    socket.current.emit("send-message", {
      senderId: currentUser,
      receiverId,
      text: newMessage,
    });
  
    try {
      const response = await axios.post("http://localhost:4000/api/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    newMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  //thats a bad idea ik  
  const handleMsgNav = () => {
    if (conId.conversationId) {
      const chat = conversations.find((conv) => conv._id === conId.conversationId);
      if (chat) {
        setCurrentChat(chat);
      }
    }
  };
  
  useEffect(() => {
handleMsgNav()
  }, [conId, conversations]);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={320} style={{ background: "#f0f2f5" }}>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
          <h3 className="text-xl font-bold">Chats</h3>
        </Header>
        <div style={{ padding: "16px", overflowY: "auto", height: "calc(100vh - 64px)" }}>
          <List
            dataSource={conversations}
            renderItem={(item) => (
              <List.Item
                onClick={() => setCurrentChat(item)}
                style={{ cursor: "pointer", padding: "10px" }}
                actions={[
                  <span>{formatTimeAgo(item.updatedAt)}</span>,
                ]}
              >
                {/* <List.Item.Meta
                  avatar={<Avatar size="large" src="https://placehold.co/200x/221F42/ffffff.svg" />}
                  title={item.name}
                  description={item.members.filter((m) => m !== currentUser)[0]}
                /> */}
             <List.Item.Meta
                avatar={<Avatar size="large" src="https://placehold.co/200x/221F42/ffffff.svg" />}
                title={item.name}
                 description={item.members.filter((m) => m._id !== currentUser)[0]?.name || "Unknown"}
                />

              </List.Item>
            )}
          />
        </div>
      </Sider>

   
      <Layout style={{ background: "#fff" , }}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h3>{currentChat ? currentChat.name : "Select a conversation"}</h3>
        </Header>
        <Content style={{ padding: "20px"}}>
            <div  className="" style={{
              height: "calc(100vh - 200px)",
              overflowY: "auto",
              paddingRight: "10px",

            }} >
          {currentChat ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                /// ref={index === messages.length - 1 ? newMessageRef : null}
                  style={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: msg.sender === currentUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: msg.sender === currentUser ? "#e6f7ff" : "#d9f7be",
                      borderRadius: "16px",
                      padding: "10px 16px",
                      maxWidth: "60%",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                <div key={msg._id || msg.createdAt}
                   ref={index === messages.length - 1 ? newMessageRef : null}> 
    <p>{msg.text}</p>
    <small>{formatTimeAgo(msg.createdAt)}</small>
  </div>
                  </div>
                </div>
              ))
            ) : (
                <div className='flex justifiy-center'>
              <Spin size="large" />
              </div>
            )
          ) : (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Select a conversation to start chatting</p>
            </div>
          )}

            </div>
        </Content>


        <Footer style={{ background: "#fff", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1, marginRight: "10px" }}
            />
            <Button
              type="primary"
              icon={<IoIosSend />}
              onClick={sendMessageHandler}
              disabled={!newMessage}
            />
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Messanger;




    //   if (!socket.current) {
    // socket.current = io("http://localhost:4000", {
    //   reconnection: true,
    //   reconnectionAttempts: 10,
    //   reconnectionDelay: 3000,
    // });


    // socket.current.on("connect", () => {
    //     console.log("Socket connected:", socket.current.id);
    //     socket.current.emit("add-user", currentUser); 
    //   });
    
    //   socket.current.on("disconnect", () => {
    //     console.log("Socket disconnected. Attempting to reconnect...");
    //   });
    