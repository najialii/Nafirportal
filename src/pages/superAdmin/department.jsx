import react ,{ useState, useEffect} from 'react'
import axios from 'axios'
import { MdOutlineDelete } from "react-icons/md";
import { Input, Button, Modal, Typography,Avatar, Select , List} from "antd";
import { CiEdit } from "react-icons/ci";

import useApi from '../../hooks/useFetch'

const Deparmnets = ()=>{
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [department , setDepartment ] = useState([])
    const {req, loading, error, data, headers} = useApi('http://localhost:4000/api/')

const handleSubmit = (e) => {
  e.preventDefault();
  try {
    const departmentData = {
      name: name,
      description: des,
    };
    console.log(departmentData);
    const res = req("POST", `/department`, departmentData);
    console.log(res);

  } catch (error) {
    console.error(error);
  }
};
 const getDep = async () => {
          try {
            const res = await req("GET", `/department`);
            console.log('here is the response', res);
            setDepartment(res)
          } catch (error) {
            console.error(error);
          }
        }; 

      useEffect(()=>{
        getDep()
      },[])
    

if (loading){
    return <div>loadding ... </div>
}
return (
    <div className='h-full'>

    <div className=' bg-white rounded-xl'>
    <form onSubmit={handleSubmit} className='p-4 flex flex-col '>
        <div>
            <h2 className='text-2xl font-bold text-primary-light '>
                Manage Departments
            </h2>
        </div>
<lable className='mt-4 mb-2'>Department Name</lable>
<Input style={{background:  "#fff", paddingBottom : 4}} type="name" value={name} onChange={e => setName(e.target.value)} />
<lable className='mt-4 mb-2'>Department Description</lable>
<Input  style={{background:  "#fff"}}  type="name" value={des} onChange={e => setDes(e.target.value)}  />
<Button className='mt-4' type='primary' htmlType='submit'>submit</Button>
    </form>
    </div>


    <div className='bg-white mt-6 rounded-xl'>
          <List
              itemLayout="horizontal"
              dataSource={department}
              renderItem={(dep) => (
                <List.Item
                  key={dep._id}
                  actions={[
                    <div className='flex items-center gap-2'>
                    <Button type="primary" ><CiEdit /></Button>,
                    <Button danger ><MdOutlineDelete size={18} /></Button>
                    </div>
                  ]}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    background : '#fff',
                    alignItems: 'center',
                    // boxShadow : "10px 5px 5px black",
                    paddingBottom : '10px',
        maxHeight : '400px'
                  }}
                >
                  <List.Item.Meta
                  className='rounded-xl'
                    title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{dep.name || "Unknown"}</span>}
                    description={<span style={{ color: 'gray' }}>{dep.description}</span>}
                  />
                </List.Item>
              )}
            />
    </div>
    </div>
)
}


export default Deparmnets