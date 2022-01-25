import React, { useState } from 'react';
import NormalButton from '../../../buttonSection/NormalButton';
import axios from 'axios';
import configData from '../../../../../config/url.json';
import ErrorStr from '../../infoComponent/ErrorStr';
import InfoStr from '../../infoComponent/InfoStr';

const ChangePassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const [conformPassword, setConformPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [showProblem, setShowProblem] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const handelChange = (event) => {
		const { name, value } = event.target;
		if (name === "newPassword") {
			setNewPassword(value);
		} else if (name === "oldPassword") {
			setOldPassword(value);
		} 
		else {
			setConformPassword(value);
		}
	};
	const handelChangePassword = async () => {
		if (newPassword === conformPassword) {
			try {
				var data = JSON.stringify({
					"old_password": oldPassword,
					"new_password": newPassword
				});
				
				var config = {
					method: 'put',
					url: configData.changePassword,
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': localStorage.getItem("token")
					},
					data : data
				};
				const res = await axios(config);
				const { message } = res;
				
				if (message === "password changed"){
					setShowResult(true);
					setShowProblem(false);
				} else {
					setShowProblem(true);
					setShowResult(false);
					setErrorMessage(message);
				}

			} catch (err) {
				setShowProblem(true);
				setErrorMessage("Server Error");
			}
		} else {
			setShowProblem(true);
			setErrorMessage("The two enter new passwords does not match");
		}
		setNewPassword("");
		setConformPassword("");
		setOldPassword("");
	};
	return(
		<div>
			<div className="flex flex-cols justify-center mt-10">
				<input 
					type="password"
					name="oldPassword"
					placeholder="please enter your current password"
					value={oldPassword}
					onChange={handelChange}
					className="h-8 w-1/2 text-center rounded-sm text-gray-500 font-raleway border-2 border-gray-300"
				/>
			</div>
			<div className="flex flex-cols justify-center mt-10">
				<input 
					type="password"
					name="newPassword"
					placeholder="please enter your new password"
					value={newPassword}
					onChange={handelChange}
					className="h-8 w-1/2 text-center rounded-sm text-gray-500 font-raleway border-2 border-gray-300"
				/>
			</div>
			<div className="flex flex-cols justify-center mt-10">
				<input 
					type="password"
					name="conformPassword"
					placeholder="please enter your re-enter your new password"
					value={conformPassword}
					onChange={handelChange}
					className="h-8 w-1/2 text-center rounded-sm text-gray-500 font-raleway border-2 border-gray-300"
				/>
			</div>
			<div className="flex flex-cols justify-center mt-10">
				<NormalButton text={"Conform"} func={handelChangePassword}/>
			</div>
			<div className="flex flex-cols justify-center mt-10">
				{showProblem && <ErrorStr info={ errorMessage } />}
				{showResult && <InfoStr info={"password changed"} />}
			</div>
		{ console.log(showProblem) }
		{ console.log(errorMessage) }
		{ console.log(showResult) }
		</div>
	);
};

export default ChangePassword;
