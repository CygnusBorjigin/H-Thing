import React, { useState } from 'react';
import axios from 'axios';
import NormalButton from '../../../buttonSection/NormalButton';
import configData from '../../../../../config/url.json';

const ChangeEmail = () => {
	const [newEmail, setNewEmail] = useState("");
	const handelChange = (event) => {
		setNewEmail(event.target.value);
	};
	const handelChangeEmail = async () => {
		var data = JSON.stringify({
			"new_email": newEmail
		});
		var config = {
			method: 'put',
			url: configData.changeEmail,
			headers: {
				'x-auth-token': localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			data : data
		};
		await axios(config);
		setNewEmail("");
	};
	return(
		<div>
			<div className="flex flex-cols justify-center mt-10">
				<input 
					type="email"
					name="email"
					placeholder="please enter your new email"
					value={newEmail}
					onChange={handelChange}
					className="h-8 w-1/2 text-center rounded-sm text-gray-500 font-raleway border-2 border-gray-300"
				/>
			</div>
			<div className="flex flex-cols justify-center mt-10">
				<NormalButton text={"Conform"} func={handelChangeEmail}/>
			</div>
		</div>
	);
};

export default ChangeEmail;
