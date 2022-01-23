import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import DangerWarning from '../warning/DangerWarning';
import configData from '../../config/url.json';

const Register = () => {
    const [userInformation, setUserInformation] = useState({
        userName: "",
        email: "",
        password1: "",
        password2: ""
    });

    const [warning, setWarning] = useState([]);

    let navigate = useNavigate();

    function handelChange (event) {
        const { name, value } = event.target;
        
        setUserInformation (prev => {
            if (name === 'userName') {
                return ({
                    userName: value,
                    email: prev.email,
                    password1: prev.password1,
                    password2: prev.password2
                });
            } else if (name === 'email') {
                return ({
                    userName: prev.userName,
                    email: value,
                    password1: prev.password1,
                    password2: prev.password2
                });
            } else if (name === 'password1') {
                return({
                    userName: prev.userName,
                    email: prev.email,
                    password1: value,
                    password2: prev.password2
                });
            } else if (name === 'password2') {
                return({
                    userName: prev.userName,
                    email: prev.email,
                    password1: prev.password1,
                    password2: value
                });
            } else {
                return (prev);
            }
        });
    };

    async function handelToken (response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
    }

    async function handelSubmit (event) {
        event.preventDefault();
        if (userInformation.password1 !== userInformation.password2) {
		setWarning(prev => {
			if (prev.includes("the two entered passwords does not match") === false){
				return [...prev, 'the two entered password does not match'];
			} else {
				return prev;
			}
		});
        } else {
            try {
                const newUser = {
                    name: userInformation.name,
                    email: userInformation.email,
                    password: userInformation.password1
                };
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const body = JSON.stringify(newUser);
                const res = await axios.post(configData.registerUser, body, config);
                handelToken(res);
                navigate('/things');
            } catch (err) {
		    const newWarnings = err.response.data.errors.map(e => e.msg);
		    newWarnings.forEach(eachWarning => {
			    setWarning(prev => {
				    if (prev.includes(eachWarning) === false) {
					    return [...prev, eachWarning];
				    } else {
					    return prev;
				    }
			    });
		    });
            }
        }
    }
    

    return(
        <div className="w-1/2 h-content mx-auto mt-60 rounded-md bg-gray-200 drop-shadow-lg">
            <form className="flex flex-col justify-center items-center" onSubmit={handelSubmit}>
                <h1 className="text-gray-500 mt-4 text-2xl font-raleway">H . T h i n g</h1>
                <h1 className="text-gray-500">--------------------------------------</h1>
                <input name="userName"
                       onChange={handelChange}
                       value={userInformation.userName}
                       placeholder="User Name (Optional)" 
                       className="mt-8 h-8 w-1/2 rounded-sm text-center text-gray-500 font-raleway" 
                       />
                <input name="email"
                       placeholder="Email (Required)" 
                       onChange={handelChange}
                       value={userInformation.email} 
                       className="mt-10 h-8 w-1/2 rounded-sm text-center text-gray-500 font-raleway" 
                       />
                <input name="password1"
                       placeholder="Password (Required)" 
                       onChange={handelChange}
                       value={userInformation.password1} 
                       className="mt-10 h-8 w-1/2 rounded-sm text-center font-raleway" 
                       />
                <input name="password2"
                       placeholder="Conform Password (Required)" 
                       onChange={handelChange}
                       value={userInformation.password2} 
                       className="mt-10 h-8 w-1/2 rounded-sm text-center font-raleway"
                       />
                <button type="submit" 
                        className="mt-10 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300  hover:bg-gray-100 duration-100 hover:text-gray-400 font-cizel">Signup</button>
                <div className="text-gray-500 text-center">
                    <p className="font-raleway">------------ OR ------------</p>
                </div>
                <Link to="/thing" className="mt-4 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300 hover:bg-gray-100 duration-100 hover:text-gray-400">
                    <button type="button" className="mt-1 h-8 w-1/2 font-cizel" onClick={localStorage.removeItem('token')}>Login</button>
                </Link>
                <h1 className="text-gray-500">--------------------------------------</h1>
                <h1 className="text-gray-500 mt-4 text-md font-raleway">Beta V0.1.1</h1>
                <h1 className="text-gray-500 mt-4 text-md font-raleway">This is not a production application, please do not put any sensitive information in here</h1>
            </form>
            <div>
                {warning.length !== 0 ? <DangerWarning messages={warning}/> : null}
            </div>
        </div>
    )
}

export default Register;
