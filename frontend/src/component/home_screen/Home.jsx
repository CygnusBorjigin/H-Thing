import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handelThings = () => {
        navigate('thing');
    }
    return(
        <div className="fix top-0">
            <div className="text-center h-60 w-screen mt-80">
                <h1 className="mt-20 text-2xl font-raleway">Just something I build</h1>
                <h1 className="mt-4 text-xl font-raleway">I think it might be interesting</h1>
                <Link to="/thing" className="my-auto">
                    <button className="mt-8 h-16 px-5 rounded-lg my-auto hover:bg-slate-200 border-2 border-gray-600 font-cizel" onClick={handelThings}>Hacktanium.Thing</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;