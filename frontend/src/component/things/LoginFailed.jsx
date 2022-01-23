import React from 'react';
import { Link } from 'react-router-dom';

const LoginFailed = () => {
    return (
        <div className="w-1/2 h-content mx-auto mt-60 rounded-md bg-gray-200 drop-shadow-lg">
            <form className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 mt-4 text-2xl">H . T h i n g</h1>
                <h1 className="text-gray-500">--------------------------------------</h1>
                <h1 className="mt-10 h-8 w-1/2 text-2xl text-center text-gray-500">You are not loged in</h1>
                <Link to="/thing" className="mt-4 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300 hover:bg-gray-100 duration-100 hover:text-gray-400">
                    <button type="button h-10 w-20" className="mt-1">Login</button>
                </Link>
                <div className="text-gray-500 text-center">
                    <p>------------ OR ------------</p>
                </div>
                <Link to="/register" className="mt-4 mb-4 h-10 w-20 rounded-sm text-center bg-gray-300 hover:bg-gray-100 duration-100 hover:text-gray-400">
                    <button type="button h-10 w-20" className="mt-1">Signup</button>
                </Link>
            </form>
            
        </div>
    )    
}

export default LoginFailed;