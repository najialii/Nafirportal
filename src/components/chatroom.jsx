
import {useState, useEffect, useRef} from 'react';
const ChatRoom = ({ socket, userName, room,  }) => {
const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState([])
const effectRan = useRef(false)
const sendMessage = async () => {
    if(!newMessage !== ""){
        const messageData = {room, user : userName,  message : newMessage , time : new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes() }
   await socket.emit('send-message', messageData)
    }
    
}


useEffect(()=>{
    if(!effectRan.current){
        socket.on('receive-message', (messageData)=>{
            setMessages((prevMessages) => [...prevMessages, messageData]);
        })
       effectRan.current = true
    }
},[socket])
    return (
        
        <>
        <div className='bg-gray-200 h-screen'>

        </div>

        <div>
{messages.map((message, id) => (
    <div className='bg-green-300' key={id}>
        <p>{message.user} : {message.message}</p>
    </div>
))}
        </div>
        

        <div className=' bottom-0'>
        <input type="text"
value={newMessage}
className="w-[80%]"
onChange={(e) => setNewMessage(e.target.value)}
placeholder="write a messaeg "
 />
<button className="w-[20%] bg-green-800" onClick={sendMessage} >send </button>
        </div>
        </>
    )

}

export default ChatRoom;