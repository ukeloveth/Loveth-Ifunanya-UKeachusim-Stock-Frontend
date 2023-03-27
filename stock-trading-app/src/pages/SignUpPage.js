import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const [signUpData, setSignUpData] = useState({})
    const navigate = useNavigate();
    const signUp = (e) => {
        console.log();
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/users/register', signUpData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              console.log(response);
              navigate('/login');
            })
            .catch(error => {
              console.log(error);
            //   navigate('/dashboard');
            });
    }
    
    const handleChange = (e) => {
        setSignUpData({...signUpData, [e.target.name]: e.target.value})
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <h1 style={{marginLeft:"30px"}}>Sign Up</h1>
            <div style={{margin:"30px"}}>
                <form onSubmit={(e) => signUp(e)}>
                    
                    <label htmlFor="name">Name</label>
                    <div>
                        <input type="text" name="name" onChange={(e)=>handleChange(e)} />
                    </div>
                    <label htmlFor="email">Email</label>
                    <div>
                        <input type="email" name="email" onChange={(e)=>handleChange(e)} />
                    </div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input type="password" name="password" onChange={(e)=>handleChange(e)} />
                    </div>
                    <button type="submit">Sign Up</button>
                    <p style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => navigateToLogin()}>Back to Login</p>
                </form>
            </div>
        </>
    )
}
export default SignUpPage;