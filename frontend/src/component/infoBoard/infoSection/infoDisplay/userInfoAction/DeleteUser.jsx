import React, { useState } from 'react';
import axios from 'axios';
import DangerButton from '../../../buttonSection/NormalButton';
import configData from '../../../../../config/url.json';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
	const [userEmail, setUserEmail] = useState("");
	const navigate = useNavigate();
	const handelChange = (event) => {
		setUserEmail(event.target.value);
	};
	const deleteUser = async () => {
		var data = JSON.stringify({
			"email": userEmail
		});
		var config = {
			method: 'delete',
			url: configData.deleteUser,
			headers: { 
				'Content-Type': 'application/json', 
				'x-auth-token': localStorage.getItem("token")
			},
			data : data
		};
		const res = await axios(config);
		if (res.data.message == "user deleted") {
			localStorage.clear();
			navigate("/");
		} else {
			console.log("error");
		}
	};
	return(
		<div>
		<div className="flex flex-cols justify-center mt-10">
			<input 
				type="email"
				placeholder="please enter your email for comformation"
				value={userEmail}
				onChange={handelChange}
				className="h-8 w-1/2 text-center rounded-sm text-gray-500 font-raleway border-2 border-gray-300 focus:outline-none focus:border-red-400"
			/>
		</div>
		<div className="flex flex-cols justify-center mt-10">
			<DangerButton text={"Conform"} func={deleteUser} />
		</div>
		</div>
	);
};

export default DeleteUser;
