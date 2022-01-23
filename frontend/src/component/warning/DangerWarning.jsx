import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthWarning = (props) => {
    return(
        <div className="text-center text-xl text-pink-500 list-none font-cizel">
                {props.messages.map(eachmessage => {
                    return <li key={uuidv4()}>{eachmessage}</li>
                })}
        </div>
    );
}

export default AuthWarning;
