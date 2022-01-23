import React, { useState } from 'react';
import axios from 'axios';

import InfoStr from '../infoComponent/InfoStr';
import NormalButton from '../../buttonSection/NormalButton';
import configData from '../../../../config/url.json';

const ReportBug = () => {
	const [bugReport, setBugReport] = useState("");
	const token = localStorage.getItem('token');

	const handelChange = ( event ) => {
		setBugReport( event.target.value );
	};

	const reportBug = async () => {
		var data = JSON.stringify({
			"content": bugReport
		});
		var config = {
			method: 'post',
			url: configData.reportBug,
			headers: { 
				'x-auth-token':token,
				'Content-Type': 'application/json'
			},
			data : data
		};

		await axios(config)
		setBugReport('Thank you for reporting');
	};

	return (
		<div className="basis-5/6">
			<div className="flex flex-row justify-center">
				<InfoStr text={ 'Thank you for tell me about the bug' } />
			</div>
			<div className="flex flex-row justify-center">
				<textarea className="mb-10 font-cormorant border-2 border-gray-200 h-80 w-2/3" onChange={ handelChange } value={ bugReport }/>
			</div>
			<div className="flex flex-row justify-center">
				<NormalButton text={ "Report" } func={ reportBug }/>
			</div>
		</div>
	);
};

export default ReportBug;
