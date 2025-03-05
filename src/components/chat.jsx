import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import ChatRoom from './chatroom';

const socket = io("http://localhost:4000");

const Chat = () => {
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState("");
    const [room, setRoom] = useState("");
    const [userName , setUserName] = useState("")
    const socket = useRef()
    const { user } = useAuthContext();
    console.log(user)
    // const mssgEndRef = useRef(null)
    // console.log(user)
    // const user_id = user?.userid 
    // // userName = user.name
    
    // const { id } = useParams(); 
    
    // const receiver = id;
    // console.log(receiver)
    // console.log(user_id)

    useEffect(()=> {
   socket.current= io('http://localhost:4000')
    },[])


useEffect(()=>{
    socket.current.emit('add-user', user?.userid)
    socket.current.on('get-users', users => {
        console.log(users)
    })
})
    
    // useEffect(() => {
    //     if (user_id && receiver) {
    //         const room = user_id < receiver ? `${user_id}-${receiver}` : `${receiver}-${user_id}`;
    
    //         axios.get(`http://localhost:4000/api/chat/history`, {
    //             params: { user1: user_id, user2: receiver }
    //         })
    //         .then(response => {
    //             console.log("Chat History Response:", response.data);
    //             setMessages(response.data);
    //         })
    //         .catch(error => console.error(error));
    //     }
    // }, [user_id, receiver]);
    

//     useEffect(() => {
//         const executeScroll = () => {
//             if (mssgEndRef.current) {
//                 mssgEndRef.current.scrollIntoView({ behavior: 'smooth' });
//             }
//         };
//         executeScroll();
//     }, [messages]);

//     const sendMessage = () => {
//         const messageData = { sender: user_id, receiver, message: newMessage };
// console.log(messageData);

// if (!newMessage.trim()) {
//     console.error('Message cannot be empty!');
//     return;
// }

//         socket.emit('send-message', messageData);

//         // setMessages(prev => [...prev, messageData]);
//         setNewMessage("");

        
//         axios.post("http://localhost:4000/api/chat/sendmessage", messageData)
//             .then(response => console.log('here is the response',response))
//             .catch(error => console.error(error));
           
//     };


const joinRoom = () => {
    if(userName !== "" && room !== "") {
        console.log('ran')
        socket.emit('join-room', room)
    }
}

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h2 className='text-2xl font-bold mb-4'></h2>
            <div className='w-full max-w-lg bg-white max-h-96 overflow-y-scroll p-4 rounded-lg shadow-md mb-4'>
                {/* {messages.map((msg, index) => (
                    <div key={index} 
                         className={`p-2 rounded mb-2 max-w-[70%] ${
                            msg.sender === user_id 
                                ? 'bg-gray-200 self-end text-right'  
                                : 'bg-blue-200 self-start text-left'  
                        }`}
                         style={{ alignSelf: msg.sender === user_id ? 'flex-end' : 'flex-start' }}>
                        <strong>{msg.sender === user_id ? 'You' : msg.sender}:</strong> {msg.message}
                        <div ref={mssgEndRef}></div>
                    </div>
                ))}
         */}
            </div>
        


<div>
    <h2>
        join a chat room 
    </h2>
<div>

    <label htmlFor="text">name</label>
    <input
    type='text'
    value={userName}
    onChange={(e)=> setUserName(e.target.value)}
    className='border p-2 rounded mb-2 w-full max-w-lg'
    />
</div>


            <div className='flex flex-col gap-4 w-full'> 
            <textarea
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="room id..."
                className='border p-2 rounded mb-4 w-full max-w-lg'
                />
            <button onClick={joinRoom} className='bg-green-600 text-white p-2 rounded'>
                Send Message
            </button>
            </div>
                </div>
{/* 
                <ChatRoom socket={socket} 
                room={room}
                userName={userName}
                /> */}
        </div>
    );
};

export default Chat;