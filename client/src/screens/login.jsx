import { useState } from "react";
import axios from 'axios';
import { useUser } from '../useContext.jsx';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId } = useUser();
    const navigate = useNavigate();

    const handleSubmit = () => {
        try {
            axios.post('/user/login', { email, password })
                .then(response => {
                    if (response.status === 200) {
                        setUserId(response.data);
                        console.log("Login successful");
                        navigate("/p/userPropertyList"); 
                    } else {
                        console.log("Login Failed");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
