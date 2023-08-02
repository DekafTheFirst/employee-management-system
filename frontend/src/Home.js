import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:8081')
            .then(res => {
                if(res.data.valid){
                    setName(res.data.username)
                }
                else {
                    navigate('/signin')
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
  return (
    <div>Welcome {name}</div>
  )
}

export default Home