import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Drawer, Button ,Select} from "antd";

const MentSessions = () => {
  const [sessionsReq, setsessionsReq] = useState([]);
  const [visible, setVisible] = useState(false)
  const[selectedSes, setSelectedSes] = useState(null)
  const [newStatus, setNewStatus] = useState(""); 
  const [status , setStatus]= useState()

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/requestsession/mentor-sessions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        setsessionsReq(response.data);
        console.log("here is the data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching mentor details:", error.message);
        if (error.response) {
          console.error("Server responded with:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      });
  }, [newStatus]);

  
  const columns = [
    // {
    //   title: "Session ID",
    //   dataIndex: "sessionId",
    //   key: "sessionId",
    //   render: (sessionId) => sessionId._id, 
    // },
    {
      title: "User Name",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => userId.name, 
    },
    {
      title: "Preferred Time",
      dataIndex: "preferredTime",
      key: "preferredTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(), 
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <button
          className="border border-primary-light p-2 rounded-md text-xs hover:bg-primary-light hover:text-white"
            onClick={() => {
              setSelectedSes(record);
              setVisible(true); 
            }}
          >
            View Details
          </button>
        ),
      },
  ];

  const onClose = ()=> {
    setVisible(false)
  }


  const updateStatus = async ()=>{
    try {
        const payload = {
            requestId: selectedSes._id, 
            status: newStatus,
        }
        console.log(payload)
        const response = await  axios.patch(
            "http://localhost:4000/api/requestsession/update",
            payload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            })
            console.log(response)
      } catch (err) {
        console.error(err);
      }
  }

  return (
    <div className="h-screen">
      
      <Table
        dataSource={sessionsReq} 
        
        columns={columns} 
        rowKey="_id" 
      />

<Drawer
        title="Session Details"
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        {selectedSes && (
          <div>
            <p><strong>User Name:</strong> {selectedSes.userId.name}</p>
            <p><strong>Preferred Time:</strong> {selectedSes.preferredTime}</p>
            <p><strong>Status:</strong> {selectedSes.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedSes.createdAt).toLocaleString()}</p>
            <p className="">
              <strong>Status:</strong>
              <Select
                value={newStatus}
                onChange={setNewStatus}
                style={{ width: "100%", marginBottom: "16px"}}
              >
                <Select.Option >update status</Select.Option>
                <Select.Option value="approved">Accepted</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
              </Select>
            </p>
            <Button type="primary" onClick={updateStatus}>
              Update Status
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MentSessions;
