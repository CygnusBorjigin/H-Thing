import React from 'react';

const ErrorStr = (props) => {
	const info = props.text;
	return (
		<h1 className="text-xl text-center font-cormorant mb-4 text-red-400">
		{info}
		</h1>
	);
};

export default ErrorStr;
