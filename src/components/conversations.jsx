import { useEffect, useState } from "react";
import axios from 'axios'
const Conversations = (({conversations , currentUser})=>{

    const [user, setUser] = useState(null)

    // console.log(conversations.members)


   
    useEffect(() => {
        const friendId = conversations.members.find(m => m !== currentUser);
        console.log('Friend ID:', friendId);

        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user/${friendId}`);
                console.log('User data:', response.data);
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (friendId) {
            getUser();
        }
    }, [conversations, currentUser]);


    return (
        <>


        <div   className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" key={user?._id}>
        <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
              </div>

            <h2>{user?.email}</h2>
        </div>
        

                {/* <div key={user._id}>
                    <h2>{user?.email}</h2>
                </div> */}

        
        </>
    )
})

export default Conversations;