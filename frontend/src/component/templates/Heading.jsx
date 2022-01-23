import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clock from './Clock';

const Heading = (props) => {
    const sideBar = props.sidebar;

    const handelMoreThings = () => {
        props.showSideBar()
    }
    return(
        <div className="fixed top-0 w-screen border-b-2 border-gray-500 h-12 text-center flex flex-row font-cizel">
	        <button className='basis-2/12 my-auto' onClick={handelMoreThings}>{sideBar ? "Less Things" : "More Things"}</button> 
	        <h1 className='mt-2 text-xl basis-9/12'>H . T h i n g</h1>
            <Clock className='basis-1/12' />
            {console.log(sideBar)}
        </div>
    );
}

export default Heading;
