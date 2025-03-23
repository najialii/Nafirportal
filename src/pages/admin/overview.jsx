import React, {useState, useEffect} from 'react'
import DashboardCards from '../../components/dashcard'
import Chart from '../../components/chartcard'
import {Table, Avatar,Card,Button} from 'antd'
import Tables from '../../components/tables'
import axios from 'axios'
function Overview() {
  const [data, setData] = useState([])
const [charData, setCharData] = useState([])
const [selectedMonth, setSelectedMonth] = useState(null)



  const getActivities = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/activity');
      const filtered = response.data.filter((activity) => new Date(activity.date) > new Date());
      
      console.log(filtered);
      setData(filtered);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  useEffect(() => {
    getActivities();
  }, []);



  const charProcess = () => {
    const countAcByMonth = {};


    data.forEach((activity) => {
      const monthYear = new Date(activity.date).toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      countAcByMonth[monthYear] = (countAcByMonth[monthYear] || 0) + 1;
    });

    const chartData = Object.entries(countAcByMonth).map(([name, value]) => ({
      name,
      value,
    }));

    setCharData(chartData);
  };

  const handleMonChange = (date, dateString) => {
    setSelectedMonth(dateString);    
  };
  useEffect(() => {
    if (data.length > 0) {
      charProcess();
    }
  }, [data]);
  // useEffect(() => {

  //     setSelectedMonth(dateString)
    
  // }, [data]);

  const columns = [
    {
      title: 'Activity Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleString(),
    },
    // {
    //   title: 'Time',
    //   dataIndex: 'time',
    //   key: 'time',
    // },

  ];  


  
  return (
    <div className=' h-full '>
    <span className='flex justify-start text-3xl mb-4 mx-8'>
              <h1 className='text font-extrabold'>Overview</h1>
            </span>
        <div className='flex justify-around  items-center'>

        <DashboardCards />
        </div>

        <div className='mt-8 grid grid-cols-7 w-full gap-4 px-8'>
          <div className='bg-white text-white col-span-3 p-4 rounded-xl h-96'>
     
            <div className='bg-gradient-to-bl from-primary-dark to-primary-light h-fit text-white col-span-3 p-2 rounded-xl '>
          <Chart type="monotone" dataKey="value" stroke="#221F42" width="100%" height={250} color="#007BFF"  strokeWidth={20} data={charData} />
          </div>
          <div className='mt-6'>
          <span className='flex flex-col justify-start  mb-4'>
              <h1 className='text-xs text-white font-medium'> Activities </h1>
              <span className='flex items-center gray-500'> <span className='text-accent-light text-xl '>+{charData.length}</span> <p className='text-gray-500'>Than Last week </p></span>
            </span>
          </div>
                    </div>
          <div className='p-4 bg-white rounded-xl col-span-4 '>
            <span className='flex justify-start  mb-4'>
              <h1 className='text-sm  text-white'>Upcoming Activities</h1>
            </span>
<Tables columns={columns} dataSource={data}  pagination={false}  rowKey="_id"/>

<div className='flex bottom-0 mt-20  justify-end my-2'>
  <button className='bg-white border border-primary-light hover:bg-primary-dark hover:text-white text-primary-dark font-bold py-2 px-4 rounded'>
    download report
  </button>
  </div>
          </div>
        </div>


<div className='bg-primaary p-4 rounded-xl mt-8 mx-8'>
<span className='flex justify-start  mb-4'>
              <h1 className='text-xs font-medium'>Users</h1>
            </span>
            <div className='flex justify-center'>

<Chart type="monotone" dataKey="value"   chartType ="line"  strokeWidth={2} data={charData} />
            </div>
</div>
    </div>
  )
}

export default Overview