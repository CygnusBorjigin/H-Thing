import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from '../../../../config/url.json';
import InfoStr from '../infoComponent/InfoStr';
import UserInfoAction from './userInfoAction/UserInfoAction';

const UserInfo = () => {
	const [information, setInformation] = useState({});
	const token = localStorage.getItem('token');
	const loadUserInformation = async () => {
		try {
			var config = {
				method: 'get',
				url: configData.userInfo,
				headers: { 
					'x-auth-token': token
				}
			};
			const res = await axios(config);
			const { name, email, since } = res.data;
			if (name === undefined){
				setInformation({
					userName: "Unnamed user",
					userEmail: email,
					userSince: since.substring(0, 10)
				});
			} else {
				setInformation({
					userName: name,
					userEmail: email,
					userSince: since.substring(0, 10)
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		loadUserInformation();
	}, []);

	return(
		<div className="basis-5/6">
			<div className="h-40">
				<InfoStr text={information.userName} />
				<InfoStr text={information.userEmail} />
				<InfoStr text={"user since ".concat(information.userSince)} />
			</div>
			<div>
				<UserInfoAction />				
			</div>
		</div>
	)
};

export default UserInfo;
