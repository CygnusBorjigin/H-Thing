import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DangerButton from './DangerButton';
import NormalButton from './NormalButton';

const ButtonDash = ( props ) => {
	const navigate = useNavigate();
	const processLogout = () => {
		localStorage.clear();
		navigate('/');
	};

	const { showUser, showReport } = props;

	
	return(
		<div className="h-screen basis-1/6 flex flex-row justify-center border-r-2 border-gray-300">
			<div className="flex flex-col">
				<NormalButton text={"User Info"} func={ showUser }/>
				<NormalButton text={"Report a bug"} func={ showReport } />
				<DangerButton text={"Logout"} func={processLogout}/>
			</div>
		</div>
	)
};

export default ButtonDash;


