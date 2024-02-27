import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Posts from './Posts/Posts'
import Supbar from './Supbar/Supbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const {token} = useParams();
  const [user,setUser]= useState([]);
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization:token
    }
    axios
    .get("https://instagram-server-6onu.onrender.com/auth/me",{headers})
    .then((res) => {
      setUser(res.data);
    }).catch((e) => {
      console.log(e);
    })
    axios.get('https://instagram-server-6onu.onrender.com/post',{headers})
    .then((res) => {
      setData(res.data);
      setLoading(false)
    }).catch((e) => {
      console.log(e);
    })
  },[data])


  
  return (
    <div className='d-flex p-0 bg-black' style={{alignItems:'center'}}>
        <Header user={user} token={token}/>
        <Posts  user={user}  token={token} data={data} loading={loading}/>
        <Supbar user={user} token={token}/>
    </div>
  )
}

export default Dashboard