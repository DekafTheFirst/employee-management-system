import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ManagerPage from './ManagerPage'
import EmployeePage from './EmployeePage'
import gradient from './gradient.jpg'

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:8081')
            .then(res => {
                if(res.data.valid){
                    setUser(res.data.user)
                }
                else {
                    navigate('/signin')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const logout = () => {
        axios.get('http://localhost:8081/logout').then((res)=>{
            console.log(res.data)
            navigate('/signin')
        }
        )
        .catch(err=>console.log(err))
      }

    return (
    <section className='d-flex justify-content-center'>
        <div className="col-10 col-sm-7 container" >
            <div className='image-background'></div>
            <div className="row row-with-image">
                <img src={require(`./${user.type == "manager" ? "profile-image-manager.png" : "profile-image-employee.png"}`)} alt="profile" className='profile-image' />
                <div className="info">
                    <h5 className='name'>{user.username}</h5>
                    <p className='email'>{user.email}</p>
                    <p>Salary: <strong>{user.type == "manager" ? "$200,000" : "$150,000"}</strong>/year</p>
                </div>
                <button className="btn btn-light" onClick={logout}><img src={require('./exit.png')} alt="" /> <span>Logout</span></button>
                

            </div>
        </div>
    </section>
  )
}

export default Home