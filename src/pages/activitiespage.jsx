import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'

function Activitiespage() {
    const {id} = useParams()
    const [currentAct , setcurrentAct] = useState()


const getCurrentAct = async ()=>{
    const response = await axios.get(`http://localhost:4000/api/activity/${id}`)
    console.log(response.data)
    setcurrentAct(response.log)
}

    useEffect(()=>{
getCurrentAct()
    },[])
  return (
    <div>Activitiespage</div>
  )
}

export default Activitiespage