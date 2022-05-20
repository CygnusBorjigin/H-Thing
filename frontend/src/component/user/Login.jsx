import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DangerWarning from '../warning/DangerWarning';

import configData from '../../config/url.json';

const Login = () => {
    const [loginInformation, setLoginInformation] = useState({
        email: "",
        password: ""
    });

    const [warning, setWarning] = useState([]);

    let navigate = useNavigate();
    
    function handelChange (event) {
        const { name, value } = event.target;
        setLoginInformation (prev => {
            if (name === 'email') {
                return({
                    email: value,
                    password: prev.password
                });
            } else if (name === 'password') {
                return({
                    email: prev.email,
                    password: value
                })
            } else {
                return(prev);
            }
        });
    }

    async function handelSubmit (event) {
        event.preventDefault();
        try {
		var data = JSON.stringify({
			"email": loginInformation.email,
			"password": loginInformation.password
		});

		var config = {
			method: 'post',
			url: configData.authRoute,
			headers: { 
				'Content-Type': 'application/json'
			},
			data : data
		};
		const res = await axios(config);
		const token = res.data.token;
		localStorage.setItem('token', token);
            	navigate(`/things`);
        } catch (err) {
		setWarning(prev => {
			if (prev.includes("Invalid Credential")){
				return prev;
			} else {
				return [...prev, "Invalid Credential"];
			}
		});
	}
}

    return(
        <div className="w-1/2 h-content mx-auto mt-60 rounded-md bg-gray-200 drop-shadow-lg">
            <form className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 mt-4 text-2xl font-raleway">H . T h i n g</h1>
                <h1 className="text-gray-500 font-raleway">--------------------------------------</h1>
                <input type="email" 
                       name="email"
                       placeholder="Email" 
                       value={loginInformation.email}
                       onChange={handelChange}
                       className="mt-8 h-8 w-1/2 rounded-sm text-center text-gray-500 font-raleway" />
                <input type="password"
                       name="password" 
                       placeholder="Password" 
                       value={loginInformation.password}
                       onChange={handelChange}
                       className="mt-10 h-8 w-1/2 rounded-sm text-center text-gray-500 font-raleway" />
                <Link to="things">
                    <button type="submit" 
                            className="mt-10 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300 hover:bg-gray-100 duration-100 hover:text-gray-400 font-cizel"
                            onClick={handelSubmit}
                            >
                            Login
                    </button>
                </Link>
                <div className="text-gray-500 text-center font-raleway">
                    <p>------------ OR ------------</p>
                </div>
                <Link to="/register" className="mt-4 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300 hover:bg-gray-100 duration-100 hover:text-gray-400">
                    <button type="button h-10 w-20 " className="mt-1 font-cizel">Signup</button>
                </Link>
                <div>
                    {warning.length !== 0 ? <DangerWarning messages={warning} /> : null}
                </div>
            </form>
        </div>
    )
}

export default Login;
