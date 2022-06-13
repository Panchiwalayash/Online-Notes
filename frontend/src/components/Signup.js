import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "../css/Signup.css"

const Signup = () => {
  // const history=useHistory();
  const [credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""})
  const handleSubmit=async(e)=>{
      e.preventDefault();
      // console.log("clicked on submit")
      // console.log(history);
       
      const {name,email,password}=credential;
          const response = await fetch(`http://localhost:5000/api/auth/createusers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            }, 
            body: JSON.stringify({name,email,password})
          });
          let json= await response.json()
        //  console.log(json)
         if (json.success) {
          localStorage.setItem('token',json.authToken)
          history.push('/');
         }
         else{
           alert("Invalid credentials")
         }
        }
        const onChange=(e)=>{
          setCredential({...credential,[e.target.name]:e.target.value});
          
      }
  return (
    <div className="center">
      <h1>Signup</h1>
      <form>
        <div className="login_Form">
          <label for="name">Name: </label>
          <input type="text" id="name" name="name" onChange={onChange} required />
        </div>

        <div className="login_Form">
          <label for="email">Email: </label>
          <input type="email" id="email" name="email" onChange={onChange} required />
        </div>

        <div className="login_Form">
          <label for="password">Password: </label>
          <input type="password" id="password" onChange={onChange} name="password" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup