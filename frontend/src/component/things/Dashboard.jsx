// import frameworks
import React, { useState } from 'react';

// import componemts
import LoginFailed from './LoginFailed';
import ProjectSection from './ProjectDashBoard';
import Heading from '../templates/Heading';
import InfoSection from '../infoBoard/InfoDashboard';


const Things = () => {
    const userToken = localStorage.getItem('token');
    const [showSideBar, setShowSideBar] = useState(false);
    const toggleSideBar = () => {
        setShowSideBar(prev => !prev)
    }

    if (!userToken) {
        return <LoginFailed />;
    } else {
        return(
                <div>
                    <Heading showSideBar={toggleSideBar} sidebar={showSideBar}/>
                    {showSideBar ? <InfoSection /> : <ProjectSection />}
                </div>
        )
    }
    
}

export default Things;
