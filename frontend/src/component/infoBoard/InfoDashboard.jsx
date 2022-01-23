import React, { useState } from 'react';

import ButtonDash from './buttonSection/ButtonDash';
import UserInfo from './infoSection/infoDisplay/UserInfo';
import ReportBug from './infoSection/infoDisplay/ReportBug';

const InfoDashboard = () => {
	const [showUserInfo, setShowUserInfo] = useState(true);
	const [showReportBug, setShowReportBug] = useState(false);

	const displayUserInfo = () => {
		setShowReportBug(false);
		setShowUserInfo(true);
	};

	const displayReportBug = () => {
		setShowUserInfo(false);
		setShowReportBug(true);
	};
    return(
	    <div className="flex flex-row px-8 mt-20">
	    	<ButtonDash showUser={displayUserInfo} showReport={ displayReportBug } />
	    	{showUserInfo && <UserInfo />}
	    	{showReportBug && <ReportBug />}
	    </div>
    )
}

export default InfoDashboard;
