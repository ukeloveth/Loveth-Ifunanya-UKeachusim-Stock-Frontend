import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [loginData, setLoginData] = useState({})
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/users/login', loginData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              localStorage.setItem('userData', JSON.stringify(response.data));
              
              navigate('/dashboard');
            })
            .catch(error => {
              console.log(error);
            });
    }
    
    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }
    const navigateToSignUp = () => {
        navigate('/signUp');
    }

    return (
        <>
            <h1 style={{marginLeft:"30px"}}>Login Page</h1>
            <div style={{margin:"30px"}}>
                <form onSubmit={(e)=>submit(e)}>
                    <label htmlFor="email">email</label>
                    <div>
                        <input type="text" name="email" onChange={(e)=>handleChange(e)} />
                    </div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type="password" name="password" onChange={(e)=>handleChange(e)} />
                    </div>
                    <button type="submit">Submit</button>
                    <p style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => navigateToSignUp()}>Sign Up</p>
                </form>
            </div>
        
        </>
    )
}
export default LoginPage;