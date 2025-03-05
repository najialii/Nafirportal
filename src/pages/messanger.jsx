import { useState, useContext, useEffect, useRef } from "react"
import useAuthContext from "../hooks/useAuthContext"
import axios from "axios"
import Conversations from "../components/conversations"
import io from "socket.io-client"
import moment from 'moment';
import { IoIosSend } from "react-icons/io";




const Messanger = () => {
const user =  useAuthContext()
const [conversations, setConversations] = useState([])
const [currentChat, setCurrentChat] = useState(null)
const [messages,setMessages] = useState([])
const [newMessage, setNewMessage] = useState("")
const [arrivalMessage, setArrivalMessage] = useState(null)
const currentUser = user?.user?.userid
console.log(currentUser)
 const socket = useRef(null)
 const newMessageRef = useRef(null)
 const effectRan = useRef(false)
 //const [socket, setSocket] = useState(null);

 const formatTimeAgo = (createdAt) => {
    return moment(createdAt).fromNow();
  };


useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.on("get-messages", data => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
        });
    })

}, []);

useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev => [...prev, arrivalMessage]);
}, [arrivalMessage, currentChat]);
    


useEffect(() => {
    if (!currentUser) return;
    socket.current = io("http://localhost:4000");
    // socket.current = io("http://localhost:4000");
    socket.current.emit("add-user", currentUser);
    socket.current.on("get-users", user=> {
        console.log('ssssssssssssssssss',user)
    });
    return () => {
        socket.current.disconnect();
    };
}, [currentUser]);
     


const userId = user?.user?.userid
// console.log(userId)
const getConversations = async ()=> {
    try {

        const res = await axios.get(`http://localhost:4000/api/conversation/${userId}`)
        setConversations(res.data)
        // console.log('chat room is not showing ' ,res.data)
    } catch (err) {
        console.error(err)
    }
}



useEffect(() => {
    if (!userId) return;
    getConversations();
}, [userId]); 


useEffect(() => {
    const getMessages = async () => {
        if (currentChat?._id) {  
            try {
                const response = await axios.get(`http://localhost:4000/api/messages/${currentChat._id}`);
                setMessages(response.data);
                console.log('messages', response.data)
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
        conversationId: currentChat._id
    };
    //console.log('message', message)
    //console.log('current user' , currentUser)
const receiverId = currentChat.members.find(member => member !== currentUser)
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
}, [messages])



    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="bg-primary w-80 h-full flex-shrink-0 border-r border-gray-300">
            <header className="p-4 border-b border-gray-900 bg-primary text-white flex justify-between items-center">
                Chats
            </header>
            <div className="overflow-y-auto h-full p-3">
                {conversations.map((c) => (
                    <div 
                        onClick={() => { setCurrentChat(c); console.log('clicked', c); }}
                        key={c._id}
                        className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                    >
                        <Conversations conversations={c} currentUser={userId} />
                    </div>
                ))}
            </div>
        </aside>
    
        {/* Main Chat Area */}
        <main className="flex-1 overflow-scroll max-h-full bg-primary p-4">
        {currentChat ? (
    messages.length > 0 ? (
        messages.map((msg, index) => (
            <div
            key={index}
            ref={index === messages.length - 1 ? newMessageRef : null} 
            className={`mb-4 p-2 max-w-[70%] flex items-start gap-2.5 ${
                msg.sender === currentUser ? "ml-auto flex-row-reverse items-end" : "mr-auto items-start"
            }`}
        >
            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-6 h-6 rounded-full"/>
              
              <div className={`flex flex-col gap-2.5 w-full max-w-[320px] leading-1.5 p-4 border-gray-800 bg-gray-100 rounded-e-xl rounded-es-xl ${msg.sender === currentUser ? 'bg-gray-200 text-gray-800 self-end' : 'bg-green-500 text-black self-start'} flex`}
                          style={{ alignSelf: msg.sender === currentUser ? 'flex-end' : 'flex-start' }}
              >
              <span className="text-sm font-semibold text-gray-900 ">Bonnie Green</span>
                {/* <strong>{msg.sender}</strong>:  */}
                {msg.text}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formatTimeAgo(msg.createdAt)}</span>
              </div>
            </div>
        ))
    ) : (
        <div>

        <div className="flex w-full h-full justify-center items-center bg-amber-600">
            <p>No messages</p>
        
        </div>
        <div ref={newMessageRef}></div>
        </div>
    )
) : (
    <div className="flex w-full h-full justify-center items-center">
        <p>Select a conversation to start chatting</p>
    </div>
)}

            {/* <div>
                <input type="text" />
                <button className="bg-[#221F42] w-12 h-8 text-white">
                    send
                </button>
            </div> */}
                  <footer className="bg-white border-t border-gray-300 p-4 sticky  bottom-0 w-full">
                <div className="flex items-center">
                    <input type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                    <button onClick={sendMessageHandler} className="bg-[#221F42] text-white px-4 py-2 rounded-md ml-2">
                    <IoIosSend />
 
                       </button>
                </div>
            </footer>
        </main>
  
    </div>
    
    )
}

export default Messanger