import React from 'react';

const InfoButton = (props) => {
	const text = props.text;
	const func = props.func;
	return (
		<div>
		<button 
			className="mb-10 w-32 border-2 border-gray-300 h-content rounded-md hover:bg-gray-300 font-cizel"
			onClick={func}
		>
			{ text }
		</button>
		</div>
	)
};

export default InfoButton;
